package com.clalix.smart_gas.controller;

import com.clalix.smart_gas.responses.ApiResponse;
import com.clalix.smart_gas.dto.UsageAnalytics;
import com.clalix.smart_gas.service.interfaces.UsageAnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "*")
public class AnalyticsController {

    @Autowired
    private UsageAnalyticsService analyticsService;

    @GetMapping
    public ResponseEntity<ApiResponse<UsageAnalytics>> getAnalytics() {
        UsageAnalytics analytics = analyticsService.getUsageAnalytics();
        return ResponseEntity.ok(new ApiResponse<>(true, "Analytics retrieved", analytics));
    }
}