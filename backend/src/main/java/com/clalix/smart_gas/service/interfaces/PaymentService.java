package com.clalix.smart_gas.service.interfaces;

import com.clalix.smart_gas.dto.PaymentDto;
import java.util.List;

public interface PaymentService {
    PaymentDto create(PaymentDto paymentDto);
    PaymentDto getById(Long id);
    List<PaymentDto> getAll();
    PaymentDto update(Long id, PaymentDto paymentDto);
    void delete(Long id);
}