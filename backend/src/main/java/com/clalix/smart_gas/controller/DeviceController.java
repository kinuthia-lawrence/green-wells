package com.clalix.smart_gas.controller;

import com.clalix.smart_gas.entities.Device;
import com.clalix.smart_gas.responses.ApiResponse;
import com.clalix.smart_gas.service.interfaces.DeviceService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/devices")
@Tag(name = "Devices", description = "Devices API's")
public class DeviceController {

    @Autowired
    private DeviceService deviceService;

    @GetMapping("device")
    public ResponseEntity<ApiResponse<Device>> findByDeviceId(@RequestParam String deviceId) {
        Device devices = deviceService.findByDeviceId(deviceId);
        return ResponseEntity.ok(new ApiResponse<>(true, "All devices retrieved", devices));
    }
}