package com.clalix.smart_gas.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UsageAnalytics {
    private Double totalUsage;
    private Double averageUsage;
    private Integer activeDevices;
    private Integer totalAlerts;
    private Double totalRevenue;
    private Integer pendingPayments;
    private Integer failedPayments;
    private LocalDateTime lastUpdated;


}