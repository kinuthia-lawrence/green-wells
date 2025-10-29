package com.clalix.smart_gas.service.interfaces;

import com.clalix.smart_gas.dto.PaymentDto;
import com.clalix.smart_gas.requests.PaymentRequest;
import com.clalix.smart_gas.responses.PaymentResponse;
import com.clalix.smart_gas.responses.PaymentSummary;

import java.util.List;

public interface PaymentService {
    PaymentDto create(PaymentDto paymentDto);
    PaymentDto getById(Long id);
    List<PaymentDto> getAll();
    PaymentDto update(Long id, PaymentDto paymentDto);
    void delete(Long id);
    PaymentResponse initiatePayment(PaymentRequest request);
    PaymentResponse getPaymentStatus(String transactionId);
    PaymentSummary getPaymentSummary(Long userId);
}