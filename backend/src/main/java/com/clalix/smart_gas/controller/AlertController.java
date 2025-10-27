package com.clalix.smart_gas.controller;

import com.clalix.smart_gas.dto.AlertDto;
import com.clalix.smart_gas.responses.ApiResponse;
import com.clalix.smart_gas.service.interfaces.AlertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alerts")
@CrossOrigin(origins = "*")
public class AlertController {

    @Autowired
    private AlertService alertService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<AlertDto>>> getActiveAlerts(@RequestParam(required = false) String deviceId) {
        List<AlertDto> alerts = alertService.getActiveAlerts(deviceId);
        return ResponseEntity.ok(new ApiResponse<>(true, "Active alerts retrieved", alerts));
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<AlertDto>>> getAllAlerts() {
        List<AlertDto> alerts = alertService.getAll();
        return ResponseEntity.ok(new ApiResponse<>(true, "All alerts retrieved", alerts));
    }
}