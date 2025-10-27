package com.clalix.smart_gas.service.interfaces;

import com.clalix.smart_gas.dto.UserDto;
import com.clalix.smart_gas.requests.LoginRequest;
import com.clalix.smart_gas.requests.RegisterRequest;
import com.clalix.smart_gas.responses.AuthResponse;

import java.util.List;

public interface UserService {
    UserDto create(UserDto userDto);

    UserDto getById(Long id);

    List<UserDto> findAll();

    UserDto update(Long id, UserDto userDto);

    void delete(Long id);

    AuthResponse login(LoginRequest loginRequest);

    AuthResponse register(RegisterRequest registerRequest);
}

