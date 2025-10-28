package com.clalix.smart_gas.controller;

import com.clalix.smart_gas.dto.UserDto;
import com.clalix.smart_gas.requests.LoginRequest;
import com.clalix.smart_gas.requests.RegisterRequest;
import com.clalix.smart_gas.responses.ApiResponse;
import com.clalix.smart_gas.responses.AuthResponse;
import com.clalix.smart_gas.service.interfaces.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@Tag(name = "Users", description = "Users API's")
public class UserController {

    @Autowired
    private UserService userService;


    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@RequestBody RegisterRequest req) {
        AuthResponse resp = userService.register(req);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(resp.getMessage(), resp));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@RequestBody LoginRequest req) {
        AuthResponse resp = userService.login(req);
        return ResponseEntity.ok(ApiResponse.success(resp.getMessage(), resp));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<UserDto>>> findAll() {
        return ResponseEntity.ok(ApiResponse.success("Users retrieved", userService.findAll()));
    }
}