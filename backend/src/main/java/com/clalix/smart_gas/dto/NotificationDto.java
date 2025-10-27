package com.clalix.smart_gas.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class NotificationDto {
    private Long id;
    private String message;
    private boolean read;
    private LocalDateTime timestamp;
    private Long userId;
}

