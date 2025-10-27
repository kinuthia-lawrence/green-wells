package com.clalix.smart_gas.service.impl;

import com.clalix.smart_gas.dto.RefillScheduleDto;
import com.clalix.smart_gas.entities.RefillSchedule;
import com.clalix.smart_gas.entities.Cylinder;
import com.clalix.smart_gas.entities.Route;
import com.clalix.smart_gas.repository.RefillScheduleRepository;
import com.clalix.smart_gas.repository.CylinderRepository;
import com.clalix.smart_gas.repository.RouteRepository;
import com.clalix.smart_gas.service.interfaces.RefillScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RefillScheduleServiceImpl implements RefillScheduleService {
    @Autowired
    private RefillScheduleRepository refillScheduleRepository;
    @Autowired
    private CylinderRepository cylinderRepository;
    @Autowired
    private RouteRepository routeRepository;

    private RefillScheduleDto toDto(RefillSchedule refillSchedule) {
        RefillScheduleDto dto = new RefillScheduleDto();
        dto.setId(refillSchedule.getId());
        dto.setScheduledTime(refillSchedule.getScheduledTime());
        dto.setStatus(refillSchedule.getStatus());
        if (refillSchedule.getCylinder() != null) dto.setCylinderId(refillSchedule.getCylinder().getId());
        if (refillSchedule.getRoute() != null) dto.setRouteId(refillSchedule.getRoute().getId());
        return dto;
    }

    private RefillSchedule toEntity(RefillScheduleDto dto) {
        RefillSchedule refillSchedule = new RefillSchedule();
        refillSchedule.setId(dto.getId());
        refillSchedule.setScheduledTime(dto.getScheduledTime());
        refillSchedule.setStatus(dto.getStatus());
        if (dto.getCylinderId() != null) {
            Optional<Cylinder> cylinder = cylinderRepository.findById(dto.getCylinderId());
            cylinder.ifPresent(refillSchedule::setCylinder);
        }
        if (dto.getRouteId() != null) {
            Optional<Route> route = routeRepository.findById(dto.getRouteId());
            route.ifPresent(refillSchedule::setRoute);
        }
        return refillSchedule;
    }

    @Override
    public RefillScheduleDto create(RefillScheduleDto refillScheduleDto) {
        RefillSchedule refillSchedule = toEntity(refillScheduleDto);
        return toDto(refillScheduleRepository.save(refillSchedule));
    }

    @Override
    public RefillScheduleDto getById(Long id) {
        return refillScheduleRepository.findById(id).map(this::toDto).orElse(null);
    }

    @Override
    public List<RefillScheduleDto> getAll() {
        return refillScheduleRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public RefillScheduleDto update(Long id, RefillScheduleDto refillScheduleDto) {
        if (!refillScheduleRepository.existsById(id)) return null;
        refillScheduleDto.setId(id);
        RefillSchedule refillSchedule = toEntity(refillScheduleDto);
        return toDto(refillScheduleRepository.save(refillSchedule));
    }

    @Override
    public void delete(Long id) {
        refillScheduleRepository.deleteById(id);
    }
}

