package com.clalix.smart_gas.service.interfaces;

import com.clalix.smart_gas.dto.NotificationDto;
import java.util.List;

public interface NotificationService {
    NotificationDto create(NotificationDto notificationDto);
    NotificationDto getById(Long id);
    List<NotificationDto> getAll();
    NotificationDto update(Long id, NotificationDto notificationDto);
    void delete(Long id);
}

