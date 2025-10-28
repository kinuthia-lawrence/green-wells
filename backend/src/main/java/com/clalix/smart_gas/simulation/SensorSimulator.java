package com.clalix.smart_gas.simulation;

import com.clalix.smart_gas.entities.Alert;
import com.clalix.smart_gas.entities.Device;
import com.clalix.smart_gas.entities.SensorReading;
import com.clalix.smart_gas.entities.User;
import com.clalix.smart_gas.enums.AlertSeverity;
import com.clalix.smart_gas.enums.AlertType;
import com.clalix.smart_gas.enums.GasStatus;
import com.clalix.smart_gas.repository.AlertRepository;
import com.clalix.smart_gas.repository.DeviceRepository;
import com.clalix.smart_gas.repository.SensorReadingRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Component
@Slf4j
public class SensorSimulator {

    private final Random random = new Random();
    private final SensorReadingRepository sensorRepo;
    private final AlertRepository alertRepository;
    private final DeviceRepository deviceRepository;

    public SensorSimulator(SensorReadingRepository sensorRepo, AlertRepository alertRepository, DeviceRepository deviceRepository) {
        this.sensorRepo = sensorRepo;
        this.alertRepository = alertRepository;
        this.deviceRepository = deviceRepository;
    }

    @Scheduled(fixedRate = 60000)
    void simulateSensorReadings() {
        for (int i = 1; i <= 10; i++) {
            String deviceId = String.format("simulated-meter-%03d", i);
            double gasValue = 100 + (400 * random.nextDouble());
            boolean leakDetected = random.nextInt(10) == 0;
            double latitude = -1.2921 + (random.nextDouble() * 0.01);
            double longitude = 36.8219 + (random.nextDouble() * 0.01);
            LocalDateTime timestamp = LocalDateTime.now();
            GasStatus status = leakDetected ? GasStatus.LEAK : GasStatus.OK;

            SensorReading reading = new SensorReading();
            reading.setDeviceId(deviceId);
            reading.setGasValue(gasValue);
            reading.setTimestamp(timestamp);
            reading.setStatus(status);
            reading.setLeakDetected(leakDetected);
            reading.setTotalGasUsed(100 + (random.nextDouble() * 200));
            reading.setAllowedGasVolume(500.0);
            reading.setPaymentStatus("PAID");
            reading.setLatitude(latitude);
            reading.setLongitude(longitude);
            sensorRepo.save(reading);

            log.info(
                    "Simulated Reading: deviceId={}, gasValue={}, status={}, leakDetected={}, lat={}, lon={}, time={}",
                    deviceId, gasValue, status, leakDetected, latitude, longitude, timestamp
            );

            Device device = deviceRepository.findByDeviceId(deviceId).orElse(null);
            User user = device != null ? device.getUser() : null;
            if (leakDetected) {
                Alert alert = Alert.builder()
                        .deviceId(deviceId)
                        .message("Gas leak detected!")
                        .type(AlertType.GAS_LEAK)
                        .severity(AlertSeverity.HIGH)
                        .isActive(true)
                        .timestamp(timestamp)
                        .user(user)
                        .userId(user != null ? user.getId() : null)
                        .build();
                alertRepository.save(alert);

                log.warn("ALERT: Gas leak detected for device {}", deviceId);
            }
        }
    }
}