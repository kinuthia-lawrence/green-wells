package com.clalix.smart_gas.controller;

import com.clalix.smart_gas.responses.ApiResponse;
import com.clalix.smart_gas.service.interfaces.CylinderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/devices")
@CrossOrigin(origins = "*")
public class DeviceController {

    @Autowired
    private CylinderService cylinderService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Object>>> getAllDevices() {
        List<Object> devices = cylinderService.getAllDevices();
        return ResponseEntity.ok(new ApiResponse<>(true, "All devices retrieved", devices));
    }
}