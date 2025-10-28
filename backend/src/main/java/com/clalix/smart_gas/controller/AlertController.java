package com.clalix.smart_gas.controller;

import com.clalix.smart_gas.dto.AlertDto;
import com.clalix.smart_gas.responses.ApiResponse;
import com.clalix.smart_gas.service.interfaces.AlertService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/alerts")
@Tag(name = "Alerts", description = "Alerts API's")
public class AlertController {

    private final AlertService alertService;

    public AlertController(AlertService alertService) {
        this.alertService = alertService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<AlertDto>>> getActiveAlerts(@RequestParam(required = false) String deviceId) {
        List<AlertDto> alerts = alertService.getActiveAlerts(deviceId);
        return ResponseEntity.ok(ApiResponse.success("Active alerts retrieved", alerts));
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<AlertDto>>> getAllAlerts() {
        List<AlertDto> alerts = alertService.getAll();
        return ResponseEntity.ok(ApiResponse.success("All alerts retrieved", alerts));
    }
}