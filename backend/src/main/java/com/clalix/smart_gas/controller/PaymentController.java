package com.clalix.smart_gas.controller;

import com.clalix.smart_gas.responses.ApiResponse;
import com.clalix.smart_gas.requests.PaymentRequest;
import com.clalix.smart_gas.responses.PaymentResponse;
import com.clalix.smart_gas.service.interfaces.PaymentService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
@Tag(name = "Payment", description = "Payment API's")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/initiate")
    public ResponseEntity<ApiResponse<PaymentResponse>> initiatePayment(@RequestBody PaymentRequest request) {
        PaymentResponse response = paymentService.initiatePayment(request);
        return ResponseEntity.ok(new ApiResponse<>(true, "Payment initiated", response));
    }

    @GetMapping("/status/{transactionId}")
    public ResponseEntity<ApiResponse<PaymentResponse>> getPaymentStatus(@PathVariable String transactionId) {
        PaymentResponse response = paymentService.getPaymentStatus(transactionId);
        return ResponseEntity.ok(new ApiResponse<>(true, "Payment status retrieved", response));
    }

    @GetMapping("/summary")
    public ResponseEntity<ApiResponse<Object>> getPaymentSummary(Long userId) {
        Object summary = paymentService.getPaymentSummary(userId);
        return ResponseEntity.ok(new ApiResponse<>(true, "Payment summary retrieved", summary));
    }
}