package com.clalix.smart_gas.controller;

import com.clalix.smart_gas.dto.NotificationDto;
import com.clalix.smart_gas.responses.ApiResponse;
import com.clalix.smart_gas.service.interfaces.NotificationService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@Tag(name = "Notifications", description = "Notifications API's")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<NotificationDto>>> getUserNotifications(@RequestParam(required = false) Long userId) {
        List<NotificationDto> notifications = notificationService.getByUserId(userId);
        return ResponseEntity.ok(ApiResponse.success("Notifications retrieved", notifications));
    }
}