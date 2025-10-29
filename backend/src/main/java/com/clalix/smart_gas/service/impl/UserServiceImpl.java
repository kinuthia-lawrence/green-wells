package com.clalix.smart_gas.service.impl;

import com.clalix.smart_gas.dto.UserDto;
import com.clalix.smart_gas.entities.User;
import com.clalix.smart_gas.enums.UserRole;
import com.clalix.smart_gas.repository.UserRepository;
import com.clalix.smart_gas.requests.LoginRequest;
import com.clalix.smart_gas.requests.RegisterRequest;
import com.clalix.smart_gas.responses.AuthResponse;
import com.clalix.smart_gas.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    AuthenticationManager authenticationManager;

    private UserDto toDto(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setPhoneNumber(user.getPhoneNumber());
        dto.setRole(user.getRole());
        return dto;
    }

    private User toEntity(UserDto dto) {
        User user = new User();
        user.setId(dto.getId());
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setPhoneNumber(dto.getPhoneNumber());
        user.setRole(dto.getRole());
        return user;
    }

    @Override
    public UserDto create(UserDto userDto) {
        User user = toEntity(userDto);
        return toDto(userRepository.save(user));
    }

    @Override
    public UserDto getById(Long id) {
        return userRepository.findById(id).map(this::toDto).orElse(null);
    }

    @Override
    public List<UserDto> findAll() {
        return userRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public UserDto update(Long id, UserDto userDto) {
        if (!userRepository.existsById(id)) return null;
        userDto.setId(id);
        User user = toEntity(userDto);
        return toDto(userRepository.save(user));
    }

    @Override
    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public AuthResponse login(LoginRequest req) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(req.getUsername(), req.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);

            User user = userRepository.findByUsernameOrEmail(req.getUsername())
                    .orElse(null);

            return new AuthResponse("Login successful", user);
        } catch (org.springframework.security.core.AuthenticationException ex) {
            throw new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }
    }

    @Override
    public AuthResponse register(RegisterRequest req) {
        if (userRepository.findByUsernameOrEmail(req.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Username or email already in use");
        }
        User user = new User();
        user.setUsername(req.getUsername());
        user.setEmail(req.getEmail());
        user.setPhoneNumber(req.getPhoneNumber());
        UserRole role = UserRole.USER;
        if (req.getRole() != null && !req.getRole().isBlank()) {
            try {
                role = UserRole.valueOf(req.getRole());
            } catch (IllegalArgumentException e) {
                role = UserRole.USER;
            }
        }
        user.setRole(role);
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        userRepository.save(user);
        return new AuthResponse("User registered", user);
    }
}

