package com.clalix.smart_gas.dto;

import com.clalix.smart_gas.enums.AlertSeverity;
import com.clalix.smart_gas.enums.AlertType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AlertDto {
    private Long id;
    private String message;
    private AlertType type;
    private AlertSeverity severity;
    private boolean isActive;
    private LocalDateTime timestamp;
    private LocalDateTime resolvedAt;
    private Long userId;
    private String deviceId;
    private String cylinderId;
    private String userEmail;
}