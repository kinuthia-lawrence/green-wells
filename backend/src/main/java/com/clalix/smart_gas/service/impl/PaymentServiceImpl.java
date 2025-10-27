package com.clalix.smart_gas.service.impl;

import com.clalix.smart_gas.dto.PaymentDto;
import com.clalix.smart_gas.entities.Payment;
import com.clalix.smart_gas.entities.User;
import com.clalix.smart_gas.repository.PaymentRepository;
import com.clalix.smart_gas.repository.UserRepository;
import com.clalix.smart_gas.service.interfaces.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
    public List<PaymentDto> getAll() {
        return paymentRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
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
}

