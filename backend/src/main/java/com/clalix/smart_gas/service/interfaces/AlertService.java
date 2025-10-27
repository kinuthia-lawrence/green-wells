package com.clalix.smart_gas.service.interfaces;

import com.clalix.smart_gas.dto.AlertDto;

import java.util.List;

public interface AlertService {
    AlertDto create(AlertDto alertDto);

    AlertDto getById(Long id);

    List<AlertDto> getActiveAlerts(Long userId);

    List<AlertDto> getActiveAlerts(String deviceId);

    List<AlertDto> getAll();

    AlertDto update(Long id, AlertDto alertDto);

    void delete(Long id);
}

