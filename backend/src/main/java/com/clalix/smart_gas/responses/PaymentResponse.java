package com.clalix.smart_gas.responses;

import com.clalix.smart_gas.enums.PaymentStatus;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@RequiredArgsConstructor
public class PaymentResponse {
    private String transactionId;
    private PaymentStatus status;
    private Double amount;
    private String phoneNumber;
    private String mpesaReceiptNumber;
    private String resultDesc;
    private LocalDateTime paymentTime;
    private String message;
    private Long userId;
}
