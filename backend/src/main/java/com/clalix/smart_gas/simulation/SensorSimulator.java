package com.clalix.smart_gas.simulation;

import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Random;

@Component
@Slf4j
public class SensorSimulator {
    private final Random random = new Random();

    @Scheduled(fixedRate = 5000)
    void simulateSensorReading() {
        String deviceId = "simulated-meter-001";
        double gasValue = 100 + (400 * random.nextDouble());
        boolean leakDetected = random.nextInt(10) == 0; // 10% chance of leak
        double latitude = -1.2921;
        double longitude = 36.8219;
        LocalDateTime timestamp = LocalDateTime.now();
        String status = leakDetected ? "LEAK" : "OK";

        // Todo: implement rest template

        log.info(
                "Simulated Reading: deviceId={}, gasValue={}, status={}, leakDetected={}, lat={}, lon={}, time={}",
                deviceId, gasValue, status, leakDetected, latitude, longitude, timestamp
        );
    }
}
