package com.clalix.smart_gas.service.impl;

import com.clalix.smart_gas.dto.AlertDto;
import com.clalix.smart_gas.entities.Alert;
import com.clalix.smart_gas.entities.User;
import com.clalix.smart_gas.repository.AlertRepository;
import com.clalix.smart_gas.repository.UserRepository;
import com.clalix.smart_gas.service.interfaces.AlertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AlertServiceImpl implements AlertService {
    @Autowired
    private AlertRepository alertRepository;
    @Autowired
    private UserRepository userRepository;

    private AlertDto toDto(Alert alert) {
        AlertDto dto = new AlertDto();
        dto.setId(alert.getId());
        dto.setMessage(alert.getMessage());
        dto.setType(alert.getType());
        dto.setSeverity(alert.getSeverity());
        dto.setActive(alert.isActive());
        dto.setTimestamp(alert.getTimestamp());
        dto.setResolvedAt(alert.getResolvedAt());
        dto.setDeviceId(alert.getDeviceId());
        dto.setUserId(alert.getUserId());

        if (alert.getUser() != null) {
            dto.setUserEmail(alert.getUser().getEmail());
        }

        if (alert.getCylinder() != null) {
            dto.setCylinderId(alert.getCylinder().getId().toString());
        }

        return dto;
    }

    private Alert toEntity(AlertDto dto) {
        Alert alert = new Alert();
        alert.setId(dto.getId());
        alert.setMessage(dto.getMessage());
        alert.setType(dto.getType());
        alert.setSeverity(dto.getSeverity());
        alert.setActive(dto.isActive());
        alert.setTimestamp(dto.getTimestamp());
        alert.setResolvedAt(dto.getResolvedAt());
        alert.setUserId(dto.getUserId());
        alert.setDeviceId(dto.getDeviceId());

        if (dto.getUserId() != null) {
            Optional<User> user = userRepository.findById(dto.getUserId());
            user.ifPresent(alert::setUser);
        }
        return alert;
    }

    @Override
    public AlertDto create(AlertDto alertDto) {
        Alert alert = toEntity(alertDto);
        return toDto(alertRepository.save(alert));
    }

    @Override
    public AlertDto getById(Long id) {
        return alertRepository.findById(id).map(this::toDto).orElse(null);
    }

    @Override
    public List<AlertDto> getActiveAlerts(Long userId) {
        return alertRepository.findByUserId(userId).stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public List<AlertDto> getActiveAlerts(String deviceId) {
        return alertRepository.findByDeviceId(deviceId).stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public List<AlertDto> getAll() {
        return alertRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public AlertDto update(Long id, AlertDto alertDto) {
        if (!alertRepository.existsById(id)) return null;
        alertDto.setId(id);
        Alert alert = toEntity(alertDto);
        return toDto(alertRepository.save(alert));
    }

    @Override
    public void delete(Long id) {
        alertRepository.deleteById(id);
    }
}
