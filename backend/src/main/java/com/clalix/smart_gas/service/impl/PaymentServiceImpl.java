package com.clalix.smart_gas.service.impl;

import com.clalix.smart_gas.dto.PaymentDto;
import com.clalix.smart_gas.entities.Payment;
import com.clalix.smart_gas.entities.User;
import com.clalix.smart_gas.enums.PaymentStatus;
import com.clalix.smart_gas.repository.PaymentRepository;
import com.clalix.smart_gas.repository.UserRepository;
import com.clalix.smart_gas.requests.PaymentRequest;
import com.clalix.smart_gas.responses.ApiResponse;
import com.clalix.smart_gas.responses.PaymentResponse;
import com.clalix.smart_gas.responses.PaymentSummary;
import com.clalix.smart_gas.service.interfaces.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class PaymentServiceImpl implements PaymentService {
    @Autowired
    private PaymentRepository paymentRepository;
    @Autowired
    private UserRepository userRepository;

    private PaymentDto toDto(Payment payment) {
        PaymentDto dto = new PaymentDto();
        dto.setId(payment.getId());
        dto.setTransactionId(payment.getTransactionId());
        dto.setAmount(payment.getAmount());
        dto.setPaymentTime(payment.getPaymentTime());
        dto.setStatus(payment.getStatus());
        dto.setMethod(payment.getMethod());
        dto.setUserId(payment.getUserId());
        if (payment.getUser() != null) dto.setUserId(payment.getUser().getId());
        return dto;
    }

    private Payment toEntity(PaymentDto dto) {
        Payment payment = new Payment();
        payment.setId(dto.getId());
        payment.setTransactionId(dto.getTransactionId());
        payment.setAmount(dto.getAmount());
        payment.setPaymentTime(dto.getPaymentTime());
        payment.setStatus(dto.getStatus());
        payment.setMethod(dto.getMethod());
        payment.setUserId(dto.getUserId());
        if (dto.getUserId() != null) {
            Optional<User> user = userRepository.findById(dto.getUserId());
            user.ifPresent(payment::setUser);
        }
        return payment;
    }

    @Override
    public PaymentDto create(PaymentDto paymentDto) {
        Payment payment = toEntity(paymentDto);
        return toDto(paymentRepository.save(payment));
    }

    @Override
    public PaymentDto getById(Long id) {
        return paymentRepository.findById(id).map(this::toDto).orElse(null);
    }

    @Override
    public ApiResponse<List<PaymentDto>> getAll() {
        try {

            return ApiResponse.success("All payments retrieved", paymentRepository.findAll().stream().map(this::toDto).collect(Collectors.toList()));
        } catch (Exception e) {
            return ApiResponse.error(e.getMessage());
        }
    }

    @Override
    public PaymentDto update(Long id, PaymentDto paymentDto) {
        if (!paymentRepository.existsById(id)) return null;
        paymentDto.setId(id);
        Payment payment = toEntity(paymentDto);
        return toDto(paymentRepository.save(payment));
    }

    @Override
    public void delete(Long id) {
        paymentRepository.deleteById(id);
    }

    @Override
    public PaymentResponse initiatePayment(PaymentRequest request) {
        if (request == null) return null;

        Payment payment = new Payment();
        payment.setTransactionId(UUID.randomUUID().toString());
        payment.setAmount(request.getAmount());
        payment.setMethod(request.getMethod());
        payment.setPaymentTime(LocalDateTime.now());
        payment.setStatus(PaymentStatus.PENDING);
        if (request.getUserId() != null) {
            payment.setUserId(request.getUserId());
            Optional<User> userOpt = userRepository.findById(request.getUserId());
            userOpt.ifPresent(payment::setUser);
        }

        Payment saved = paymentRepository.save(payment);

        PaymentResponse resp = new PaymentResponse();
        resp.setTransactionId(saved.getTransactionId());
        resp.setStatus(saved.getStatus());
        resp.setAmount(saved.getAmount());
        resp.setPaymentTime(saved.getPaymentTime());
        resp.setUserId(saved.getUserId());
        resp.setMessage("Payment initiated");
        return resp;
    }

    @Override
    public PaymentResponse getPaymentStatus(String transactionId) {
        if (transactionId == null || transactionId.isBlank()) return null;

        Optional<Payment> opt = paymentRepository.findAll().stream()
                .filter(p -> transactionId.equals(p.getTransactionId()))
                .findFirst();

        if (opt.isEmpty()) {
            PaymentResponse notFound = new PaymentResponse();
            notFound.setTransactionId(transactionId);
            notFound.setStatus(PaymentStatus.NOT_FOUND);
            notFound.setMessage("No payment found for transaction id");
            return notFound;
        }

        Payment p = opt.get();
        PaymentResponse resp = new PaymentResponse();
        resp.setTransactionId(p.getTransactionId());
        resp.setStatus(p.getStatus());
        resp.setAmount(p.getAmount());
        resp.setPaymentTime(p.getPaymentTime());
        resp.setUserId(p.getUserId());
        resp.setMessage("Payment retrieved");
        return resp;
    }

    @Override
    public PaymentSummary getPaymentSummary(Long userId) {
        Stream<Payment> stream = paymentRepository.findAll().stream();
        if (userId != null) {
            stream = stream.filter(p -> Objects.equals(userId, p.getUserId()));
        }
        List<Payment> payments = stream.collect(Collectors.toList());

        double totalRevenue = payments.stream()
                .filter(p -> p.getAmount() != null)
                .mapToDouble(p -> ((Number) p.getAmount()).doubleValue())
                .sum();

        long totalPayments = payments.size();
        long pending = payments.stream().filter(p -> PaymentStatus.PENDING.equals(p.getStatus())).count();
        long success = payments.stream().filter(p -> PaymentStatus.SUCCESS.equals(p.getStatus()) || PaymentStatus.PAID.equals(p.getStatus())).count();
        long failed = payments.stream().filter(p -> PaymentStatus.FAILED.equals(p.getStatus())).count();

        PaymentSummary paymentSummary = PaymentSummary.builder()
                .userId(userId)
                .totalRevenue(totalRevenue)
                .totalPayments(totalPayments)
                .successfulPayments(success)
                .failedPayments(failed)
                .pendingPayments(pending)
                .build();

        return paymentSummary;
    }
}