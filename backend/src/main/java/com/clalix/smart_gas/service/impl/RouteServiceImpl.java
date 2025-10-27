package com.clalix.smart_gas.service.impl;

import com.clalix.smart_gas.dto.RouteDto;
import com.clalix.smart_gas.entities.Route;
import com.clalix.smart_gas.repository.RouteRepository;
import com.clalix.smart_gas.service.interfaces.RouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RouteServiceImpl implements RouteService {
    @Autowired
    private RouteRepository routeRepository;

    private RouteDto toDto(Route route) {
        RouteDto dto = new RouteDto();
        dto.setId(route.getId());
        dto.setName(route.getName());
        dto.setDescription(route.getDescription());
        dto.setDeviceId(route.getDeviceId());
        return dto;
    }

    private Route toEntity(RouteDto dto) {
        Route route = new Route();
        route.setId(dto.getId());
        route.setName(dto.getName());
        route.setDescription(dto.getDescription());
        route.setDeviceId(dto.getDeviceId());
        return route;
    }

    @Override
    public RouteDto create(RouteDto routeDto) {
        Route route = toEntity(routeDto);
        return toDto(routeRepository.save(route));
    }

    @Override
    public RouteDto getById(Long id) {
        return routeRepository.findById(id).map(this::toDto).orElse(null);
    }

    @Override
    public List<RouteDto> getAll() {
        return routeRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public RouteDto update(Long id, RouteDto routeDto) {
        if (!routeRepository.existsById(id)) return null;
        routeDto.setId(id);
        Route route = toEntity(routeDto);
        return toDto(routeRepository.save(route));
    }

    @Override
    public void delete(Long id) {
        routeRepository.deleteById(id);
    }

    @Override
    public RouteDto getOptimizedRoute(String deviceId) {
        return routeRepository.findByDeviceId(deviceId).map(this::toDto).orElse(null);
    }
}

