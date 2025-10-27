package com.clalix.smart_gas.controller;

import com.clalix.smart_gas.responses.ApiResponse;
import com.clalix.smart_gas.service.interfaces.RouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/routes")
@CrossOrigin(origins = "*")
public class RouteController {

    @Autowired
    private RouteService routeService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Object>>> getOptimizedRoutes() {
        List<Object> routes = routeService.getOptimizedRoutes();
        return ResponseEntity.ok(new ApiResponse<>(true, "Optimized routes retrieved", routes));
    }
}