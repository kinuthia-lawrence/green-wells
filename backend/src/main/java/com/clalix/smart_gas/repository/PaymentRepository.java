package com.clalix.smart_gas.repository;

import com.clalix.smart_gas.entities.Payment;
import com.clalix.smart_gas.enums.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    @Query("select sum(p.amount) from Payment p")
    Double getTotalRevenue();


    long countByStatus(PaymentStatus status);

    @Query("select sum(p.amount) from Payment p where p.paymentTime between :start and :end")
    Double getTotalRevenueByDateRange(LocalDateTime start, LocalDateTime end);



    long countByStatusAndPaymentTimeBetween(PaymentStatus status, LocalDateTime start, LocalDateTime end);
}