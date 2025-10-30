package com.clalix.smart_gas.controller;

import com.clalix.smart_gas.entities.Device;
import com.clalix.smart_gas.responses.ApiResponse;
import com.clalix.smart_gas.service.interfaces.DeviceService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/devices")
@Tag(name = "Devices", description = "Devices API's")
public class DeviceController {

    private final DeviceService deviceService;

    public DeviceController(DeviceService deviceService) {
        this.deviceService = deviceService;
    }

    @GetMapping("/device")
    public ResponseEntity<ApiResponse<Device>> findByDeviceId(@RequestParam String deviceId) {
        Device devices = deviceService.findByDeviceId(deviceId);
        return ResponseEntity.ok(ApiResponse.success("Device retrieved", devices));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Device>>> findAll() {
        List<Device> devices = deviceService.findAll();
        return ResponseEntity.ok(ApiResponse.success("Devices retrieved", devices));
    }
}