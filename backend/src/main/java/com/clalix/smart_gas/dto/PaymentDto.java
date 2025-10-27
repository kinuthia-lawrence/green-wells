package com.clalix.smart_gas.dto;

import com.clalix.smart_gas.enums.PaymentStatus;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class PaymentDto {
    private Long id;
    private String transactionId;
    private Double amount;
    private LocalDateTime paymentTime;
    private PaymentStatus status;
    private String method;
    private Long userId;
}