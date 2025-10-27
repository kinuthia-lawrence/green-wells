package com.clalix.smart_gas.service.impl;

import com.clalix.smart_gas.dto.NotificationDto;
import com.clalix.smart_gas.entities.Notification;
import com.clalix.smart_gas.entities.User;
import com.clalix.smart_gas.repository.NotificationRepository;
import com.clalix.smart_gas.repository.UserRepository;
import com.clalix.smart_gas.service.interfaces.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class NotificationServiceImpl implements NotificationService {
    @Autowired
    private NotificationRepository notificationRepository;
    @Autowired
    private UserRepository userRepository;

    private NotificationDto toDto(Notification notification) {
        NotificationDto dto = new NotificationDto();
        dto.setId(notification.getId());
        dto.setMessage(notification.getMessage());
        dto.setRead(notification.isRead());
        dto.setTimestamp(notification.getTimestamp());
        dto.setUserId(notification.getUserId());
        if (notification.getUser() != null) dto.setUserId(notification.getUser().getId());
        return dto;
    }

    private Notification toEntity(NotificationDto dto) {
        Notification notification = new Notification();
        notification.setId(dto.getId());
        notification.setMessage(dto.getMessage());
        notification.setRead(dto.isRead());
        notification.setTimestamp(dto.getTimestamp());
        notification.setUserId(notification.getUserId());
        if (dto.getUserId() != null) {
            Optional<User> user = userRepository.findById(dto.getUserId());
            user.ifPresent(notification::setUser);
        }
        return notification;
    }

    @Override
    public NotificationDto create(NotificationDto notificationDto) {
        Notification notification = toEntity(notificationDto);
        return toDto(notificationRepository.save(notification));
    }

    @Override
    public NotificationDto getById(Long id) {
        return notificationRepository.findById(id).map(this::toDto).orElse(null);
    }

    @Override
    public List<NotificationDto> getByUserId(Long id) {
        return notificationRepository.findByUserId(id).stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public List<NotificationDto> getAll() {
        return notificationRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public NotificationDto update(Long id, NotificationDto notificationDto) {
        if (!notificationRepository.existsById(id)) return null;
        notificationDto.setId(id);
        Notification notification = toEntity(notificationDto);
        return toDto(notificationRepository.save(notification));
    }

    @Override
    public void delete(Long id) {
        notificationRepository.deleteById(id);
    }
}

