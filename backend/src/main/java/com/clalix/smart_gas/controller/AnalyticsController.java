package com.clalix.smart_gas.controller;

import com.clalix.smart_gas.dto.UsageAnalytics;
import com.clalix.smart_gas.responses.ApiResponse;
import com.clalix.smart_gas.service.interfaces.UsageAnalyticsService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/analytics")
@Tag(name = "Analytics", description = "Analytics API's")
public class AnalyticsController {

    @Autowired
    private UsageAnalyticsService analyticsService;

    @GetMapping
    public ResponseEntity<ApiResponse<UsageAnalytics>> getAnalytics() {
        UsageAnalytics analytics = analyticsService.getUsageAnalytics();
        return ResponseEntity.ok(new ApiResponse<>(true, "Analytics retrieved", analytics));
    }
}