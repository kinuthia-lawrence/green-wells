package com.clalix.smart_gas.service.interfaces;

import com.clalix.smart_gas.dto.UsageAnalytics;


public interface UsageAnalyticsService {
    UsageAnalytics getUsageAnalytics();
    UsageAnalytics getUsageAnalyticsForDevice(String deviceId);
    UsageAnalytics getUsageAnalyticsForDateRange(String startDate, String endDate);
}