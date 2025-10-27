package com.clalix.smart_gas.controller;

import com.clalix.smart_gas.entities.Device;
import com.clalix.smart_gas.responses.ApiResponse;
import com.clalix.smart_gas.service.interfaces.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/devices")
@CrossOrigin(origins = "*")
public class DeviceController {

    @Autowired
    private DeviceService deviceService;

    @GetMapping("device")
    public ResponseEntity<ApiResponse<Device>> findByDeviceId(@RequestParam String deviceId) {
        Device devices = deviceService.findByDeviceId(deviceId);
        return ResponseEntity.ok(new ApiResponse<>(true, "All devices retrieved", devices));
    }
}