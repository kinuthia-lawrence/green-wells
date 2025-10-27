package com.clalix.smart_gas.controller;

import com.clalix.smart_gas.dto.RouteDto;
import com.clalix.smart_gas.responses.ApiResponse;
import com.clalix.smart_gas.service.interfaces.RouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/routes")
@CrossOrigin(origins = "*")
public class RouteController {

    @Autowired
    private RouteService routeService;

    @GetMapping("/device")
    public ResponseEntity<ApiResponse<RouteDto>> getOptimizedRoute(@RequestParam String deviceId) {
        RouteDto route = routeService.getOptimizedRoute(deviceId);
        return ResponseEntity.ok(new ApiResponse<>(true, "Optimized routes retrieved", route));
    }
}