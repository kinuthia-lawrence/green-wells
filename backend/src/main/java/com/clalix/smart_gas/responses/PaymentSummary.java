package com.clalix.smart_gas.responses;


import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Builder
@RequiredArgsConstructor
public class PaymentSummary {
    private final Long userId;
    private final Double totalRevenue;
    private final Long totalPayments;
    private final Long successfulPayments;
    private final Long failedPayments;
    private final Long pendingPayments;
}