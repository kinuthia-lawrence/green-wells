package com.clalix.smart_gas.service.impl;

import com.clalix.smart_gas.dto.UsageAnalytics;
import com.clalix.smart_gas.entities.SensorReading;
import com.clalix.smart_gas.enums.PaymentStatus;
import com.clalix.smart_gas.repository.AlertRepository;
import com.clalix.smart_gas.repository.CylinderRepository;
import com.clalix.smart_gas.repository.PaymentRepository;
import com.clalix.smart_gas.repository.SensorReadingRepository;
import com.clalix.smart_gas.service.interfaces.UsageAnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Objects;

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

        // Calculate total usage from all sensor readings (use existing getter 'getGasValue')
        double totalUsage = sensorReadingRepository.findAll().stream()
                .mapToDouble(SensorReading::getGasValue)
                .sum();

        // Calculate average usage
        long totalReadings = sensorReadingRepository.count();
        Double averageUsage = totalReadings > 0 ? totalUsage / totalReadings : 0.0;

        // Count active devices (cylinders with recent readings) using sensor readings in last 24 hours
        LocalDateTime last24Hours = LocalDateTime.now().minusHours(24);
        long activeDevicesCount = sensorReadingRepository.findAll().stream()
                .filter(r -> r.getTimestamp() != null && r.getTimestamp().isAfter(last24Hours))
                .map(SensorReading::getDeviceId)
                .filter(Objects::nonNull)
                .distinct()
                .count();
        Integer activeDevices = (int) activeDevicesCount;

        // Count total alerts
        Integer totalAlerts = Math.toIntExact(alertRepository.count());

        // Payment statistics
        Double totalRevenue = paymentRepository.getTotalRevenue();
        Integer pendingPayments = Math.toIntExact(paymentRepository.countByStatus(PaymentStatus.PENDING));
        Integer failedPayments = Math.toIntExact(paymentRepository.countByStatus(PaymentStatus.FAILED));

        analytics.setTotalUsage(totalUsage);
        analytics.setAverageUsage(averageUsage);
        analytics.setActiveDevices(activeDevices);
        analytics.setTotalAlerts(totalAlerts);
        analytics.setTotalRevenue(totalRevenue != null ? totalRevenue : 0);
        analytics.setPendingPayments(pendingPayments);
        analytics.setFailedPayments(failedPayments);
        analytics.setLastUpdated(LocalDateTime.now());

        return analytics;
    }

    @Override
    public UsageAnalytics getUsageAnalyticsForDevice(String deviceId) {
        UsageAnalytics analytics = new UsageAnalytics();

        // Calculate usage for specific device (use getGasValue)
        Double totalUsage = sensorReadingRepository.findAll().stream()
                .filter(r -> deviceId != null && deviceId.equals(r.getDeviceId()))
                .mapToDouble(SensorReading::getGasValue)
                .sum();

        long readingsCount = sensorReadingRepository.findAll().stream()
                .filter(r -> deviceId != null && deviceId.equals(r.getDeviceId()))
                .count();
        Double averageUsage = readingsCount > 0 ? totalUsage / readingsCount : 0.0;

        LocalDateTime last24Hours = LocalDateTime.now().minusHours(24);
        Integer activeDevices = sensorReadingRepository.findAll().stream()
                .filter(r -> deviceId != null && deviceId.equals(r.getDeviceId()))
                .anyMatch(r -> r.getTimestamp() != null && r.getTimestamp().isAfter(last24Hours)) ? 1 : 0;

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

        // Calculate usage within date range (use getGasValue)
        Double totalUsage = sensorReadingRepository.findByTimestampBetween(start, end).stream()
                .mapToDouble(SensorReading::getGasValue)
                .sum();

        long readingsCount = sensorReadingRepository.countByTimestampBetween(start, end);
        Double averageUsage = readingsCount > 0 ? totalUsage / readingsCount : 0.0;

        // Count active devices in date range
        Integer activeDevices = sensorReadingRepository.countDistinctCylindersByTimestampBetween(start, end);

        // Count alerts in date range
        Integer totalAlerts = Math.toIntExact(alertRepository.countByTimestampBetween(start, end));

        // Payment statistics for date range
        Double totalRevenue = paymentRepository.getTotalRevenueByDateRange(start, end);
        Integer pendingPayments = Math.toIntExact(paymentRepository.countByStatusAndPaymentTimeBetween(PaymentStatus.PENDING, start, end));
        Integer failedPayments = Math.toIntExact(paymentRepository.countByStatusAndPaymentTimeBetween(PaymentStatus.FAILED, start, end));

        analytics.setTotalUsage(totalUsage);
        analytics.setAverageUsage(averageUsage);
        analytics.setActiveDevices(activeDevices);
        analytics.setTotalAlerts(totalAlerts);
        analytics.setTotalRevenue(totalRevenue != null ? totalRevenue : 0);
        analytics.setPendingPayments(pendingPayments);
        analytics.setFailedPayments(failedPayments);
        analytics.setLastUpdated(LocalDateTime.now());

        return analytics;
    }
}