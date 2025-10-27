package com.clalix.smart_gas.service.impl;

import com.clalix.smart_gas.dto.UsageAnalytics;
import com.clalix.smart_gas.repository.*;
import com.clalix.smart_gas.service.interfaces.UsageAnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class UsageAnalyticsServiceImpl implements UsageAnalyticsService {

    @Autowired
    private SensorReadingRepository sensorReadingRepository;

    @Autowired
    private CylinderRepository cylinderRepository;

    @Autowired
    private AlertRepository alertRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Override
    public UsageAnalytics getUsageAnalytics() {
        UsageAnalytics analytics = new UsageAnalytics();

        // Calculate total usage from all sensor readings
        Double totalUsage = sensorReadingRepository.findAll().stream()
                .mapToDouble(reading -> reading.getGasLevel())
                .sum();

        // Calculate average usage
        Long totalReadings = sensorReadingRepository.count();
        Double averageUsage = totalReadings > 0 ? totalUsage / totalReadings : 0.0;

        // Count active devices (cylinders with recent readings)
        LocalDateTime last24Hours = LocalDateTime.now().minusHours(24);
        Integer activeDevices = cylinderRepository.countActiveCylinders(last24Hours);

        // Count total alerts
        Integer totalAlerts = Math.toIntExact(alertRepository.count());

        // Payment statistics
        BigDecimal totalRevenue = paymentRepository.getTotalRevenue();
        Integer pendingPayments = Math.toIntExact(paymentRepository.countByStatus("PENDING"));
        Integer failedPayments = Math.toIntExact(paymentRepository.countByStatus("FAILED"));

        analytics.setTotalUsage(totalUsage);
        analytics.setAverageUsage(averageUsage);
        analytics.setActiveDevices(activeDevices);
        analytics.setTotalAlerts(totalAlerts);
        analytics.setTotalRevenue(totalRevenue != null ? totalRevenue : BigDecimal.ZERO);
        analytics.setPendingPayments(pendingPayments);
        analytics.setFailedPayments(failedPayments);
        analytics.setLastUpdated(LocalDateTime.now());

        return analytics;
    }

    @Override
    public UsageAnalytics getUsageAnalyticsForDevice(String deviceId) {
        UsageAnalytics analytics = new UsageAnalytics();

        // Calculate usage for specific device
        Double totalUsage = sensorReadingRepository.findByCylinderDeviceId(deviceId).stream()
                .mapToDouble(reading -> reading.getGasLevel())
                .sum();

        Long readingsCount = sensorReadingRepository.countByCylinderDeviceId(deviceId);
        Double averageUsage = readingsCount > 0 ? totalUsage / readingsCount : 0.0;

        // Check if device is active
        LocalDateTime last24Hours = LocalDateTime.now().minusHours(24);
        Integer activeDevices = sensorReadingRepository.existsByCylinderDeviceIdAndTimestampAfter(deviceId, last24Hours) ? 1 : 0;

        // Count alerts for this device
        Integer totalAlerts = Math.toIntExact(alertRepository.countByCylinderDeviceId(deviceId));

        analytics.setTotalUsage(totalUsage);
        analytics.setAverageUsage(averageUsage);
        analytics.setActiveDevices(activeDevices);
        analytics.setTotalAlerts(totalAlerts);
        analytics.setLastUpdated(LocalDateTime.now());

        return analytics;
    }

    @Override
    public UsageAnalytics getUsageAnalyticsForDateRange(String startDate, String endDate) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDateTime start = LocalDateTime.parse(startDate + "T00:00:00");
        LocalDateTime end = LocalDateTime.parse(endDate + "T23:59:59");

        UsageAnalytics analytics = new UsageAnalytics();

        // Calculate usage within date range
        Double totalUsage = sensorReadingRepository.findByTimestampBetween(start, end).stream()
                .mapToDouble(reading -> reading.getGasLevel())
                .sum();

        Long readingsCount = sensorReadingRepository.countByTimestampBetween(start, end);
        Double averageUsage = readingsCount > 0 ? totalUsage / readingsCount : 0.0;

        // Count active devices in date range
        Integer activeDevices = sensorReadingRepository.countDistinctCylindersByTimestampBetween(start, end);

        // Count alerts in date range
        Integer totalAlerts = Math.toIntExact(alertRepository.countByTimestampBetween(start, end));

        // Payment statistics for date range
        BigDecimal totalRevenue = paymentRepository.getTotalRevenueByDateRange(start, end);
        Integer pendingPayments = Math.toIntExact(paymentRepository.countByStatusAndTimestampBetween("PENDING", start, end));
        Integer failedPayments = Math.toIntExact(paymentRepository.countByStatusAndTimestampBetween("FAILED", start, end));

        analytics.setTotalUsage(totalUsage);
        analytics.setAverageUsage(averageUsage);
        analytics.setActiveDevices(activeDevices);
        analytics.setTotalAlerts(totalAlerts);
        analytics.setTotalRevenue(totalRevenue != null ? totalRevenue : BigDecimal.ZERO);
        analytics.setPendingPayments(pendingPayments);
        analytics.setFailedPayments(failedPayments);
        analytics.setLastUpdated(LocalDateTime.now());

        return analytics;
    }
}