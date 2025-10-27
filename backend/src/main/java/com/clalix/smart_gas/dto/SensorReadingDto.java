package com.clalix.smart_gas.dto;

import com.clalix.smart_gas.enums.GasStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SensorReadingDto {
    private  Long id;
    private String deviceId;
    private Double gasValue;
    private GasStatus status;
    private Boolean leakDetected;
    private Double latitude;
    private Double longitude;
    private LocalDateTime timestamp;
    private Double gasLevel;
    private String location;
}