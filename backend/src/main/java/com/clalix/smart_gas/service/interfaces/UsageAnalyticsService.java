package com.clalix.smart_gas.service.interfaces;

import com.clalix.smart_gas.dto.UsageAnalytics;
import com.clalix.smart_gas.responses.ApiResponse;


public interface UsageAnalyticsService {
    ApiResponse<UsageAnalytics> getUsageAnalytics();
    UsageAnalytics getUsageAnalyticsForDevice(String deviceId);
    UsageAnalytics getUsageAnalyticsForDateRange(String startDate, String endDate);
}