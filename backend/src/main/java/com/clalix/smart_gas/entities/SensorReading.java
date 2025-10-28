package com.clalix.smart_gas.entities;

import com.clalix.smart_gas.enums.GasStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "sensor_readings")
public class SensorReading {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String deviceId;
    private double gasValue;
    private LocalDateTime timestamp;
    private GasStatus status;
    private boolean leakDetected;
    private LocalDateTime leakTimestamp;
    private double totalGasUsed;
    private double allowedGasVolume;
    private String paymentStatus;
    private double latitude;
    private double longitude;
}
