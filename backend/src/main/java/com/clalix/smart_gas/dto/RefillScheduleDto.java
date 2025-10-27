package com.clalix.smart_gas.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class RefillScheduleDto {
    private Long id;
    private LocalDateTime scheduledTime;
    private String status;
    private Long cylinderId;
    private Long routeId;
}

