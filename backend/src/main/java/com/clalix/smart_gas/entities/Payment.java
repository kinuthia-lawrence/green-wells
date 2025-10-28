package com.clalix.smart_gas.entities;

import com.clalix.smart_gas.enums.PaymentStatus;
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
@Access(AccessType.FIELD)
@Table(name = "payments")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String transactionId;
    private Double amount;
    private LocalDateTime paymentTime;
    private PaymentStatus status;
    private String method;
    @Column(name = "user_id", insertable = false, updatable = false)
    private Long userId;
    @ManyToOne
    private User user;
}
