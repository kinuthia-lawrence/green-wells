package com.clalix.smart_gas.controller;

import com.clalix.smart_gas.responses.ApiResponse;
import com.clalix.smart_gas.service.interfaces.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "*")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Object>>> getUserNotifications(@RequestParam(required = false) Long userId) {
        List<Object> notifications = notificationService.getUserNotifications(userId);
        return ResponseEntity.ok(new ApiResponse<>(true, "Notifications retrieved", notifications));
    }
}