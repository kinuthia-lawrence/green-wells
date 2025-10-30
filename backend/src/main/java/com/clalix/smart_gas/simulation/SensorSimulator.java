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
            double latitude = -1.2921 + (random.nextDouble() * 0.01);
            double longitude = 36.8219 + (random.nextDouble() * 0.01);
            LocalDateTime timestamp = LocalDateTime.now();
            // use leak flag for status but other alerts can be generated too
            boolean leakDetected = random.nextInt(10) == 0;
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

            // additional randomized conditions
            boolean lowLevel = gasValue < 150;                     // threshold for low gas
            boolean offline = random.nextInt(100) < 3;             // ~3% chance device offline
            boolean sensorError = random.nextInt(100) < 2;         // ~2% chance sensor error
            boolean highTemp = random.nextInt(100) < 5;            // ~5% chance high temp

            // helper resolvers (fall back to a random enum value if specific name missing)
            java.util.function.Function<String, AlertType> resolveType = (name) -> {
                try {
                    return AlertType.valueOf(name);
                } catch (Exception e) {
                    AlertType[] vals = AlertType.values();
                    return vals[random.nextInt(vals.length)];
                }
            };
            java.util.function.Function<String, AlertSeverity> resolveSeverity = (name) -> {
                try {
                    return AlertSeverity.valueOf(name);
                } catch (Exception e) {
                    AlertSeverity[] vals = AlertSeverity.values();
                    return vals[random.nextInt(vals.length)];
                }
            };

            // produce alerts based on conditions
            if (leakDetected) {
                Alert alert = Alert.builder()
                        .deviceId(deviceId)
                        .message("Gas leak detected!")
                        .type(resolveType.apply("GAS_LEAK"))
                        .severity(resolveSeverity.apply("HIGH"))
                        .isActive(true)
                        .timestamp(timestamp)
                        .user(user)
                        .userId(user != null ? user.getId() : null)
                        .build();
                alertRepository.save(alert);
                log.warn("ALERT: Gas leak detected for device {}", deviceId);
            }

            if (lowLevel) {
                Alert alert = Alert.builder()
                        .deviceId(deviceId)
                        .message("Low gas level detected")
                        .type(resolveType.apply("LOW_GAS"))
                        .severity(resolveSeverity.apply("MEDIUM"))
                        .isActive(true)
                        .timestamp(timestamp)
                        .user(user)
                        .userId(user != null ? user.getId() : null)
                        .build();
                alertRepository.save(alert);
                log.info("ALERT: Low gas level for device {}", deviceId);
            }

            if (offline) {
                Alert alert = Alert.builder()
                        .deviceId(deviceId)
                        .message("Device offline")
                        .type(resolveType.apply("DEVICE_OFFLINE"))
                        .severity(resolveSeverity.apply("HIGH"))
                        .isActive(true)
                        .timestamp(timestamp)
                        .user(user)
                        .userId(user != null ? user.getId() : null)
                        .build();
                alertRepository.save(alert);
                log.warn("ALERT: Device offline for {}", deviceId);
            }

            if (sensorError) {
                Alert alert = Alert.builder()
                        .deviceId(deviceId)
                        .message("Sensor malfunction detected")
                        .type(resolveType.apply("SENSOR_MALFUNCTION"))
                        .severity(resolveSeverity.apply("LOW"))
                        .isActive(true)
                        .timestamp(timestamp)
                        .user(user)
                        .userId(user != null ? user.getId() : null)
                        .build();
                alertRepository.save(alert);
                log.warn("ALERT: Sensor malfunction for {}", deviceId);
            }

            if (highTemp) {
                Alert alert = Alert.builder()
                        .deviceId(deviceId)
                        .message("High temperature detected near device")
                        .type(resolveType.apply("HIGH_TEMPERATURE"))
                        .severity(resolveSeverity.apply("MEDIUM"))
                        .isActive(true)
                        .timestamp(timestamp)
                        .user(user)
                        .userId(user != null ? user.getId() : null)
                        .build();
                alertRepository.save(alert);
                log.warn("ALERT: High temperature for device {}", deviceId);
            }
        }
    }
}