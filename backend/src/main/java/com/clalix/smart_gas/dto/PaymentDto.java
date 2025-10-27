package com.clalix.smart_gas.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class PaymentDto {
    private Long id;
    private String transactionId;
    private Double amount;
    private LocalDateTime paymentTime;
    private String status;
    private String method;
    private Long userId;
}