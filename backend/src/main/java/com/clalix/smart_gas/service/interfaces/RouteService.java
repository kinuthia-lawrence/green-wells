package com.clalix.smart_gas.service.interfaces;

import com.clalix.smart_gas.dto.RouteDto;
import java.util.List;

public interface RouteService {
    RouteDto create(RouteDto routeDto);
    RouteDto getById(Long id);
    List<RouteDto> getAll();
    RouteDto update(Long id, RouteDto routeDto);
    void delete(Long id);
    RouteDto getOptimizedRoute(String deviceId);
}

