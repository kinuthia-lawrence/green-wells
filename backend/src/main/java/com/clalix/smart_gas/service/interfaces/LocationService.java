package com.clalix.smart_gas.service.interfaces;

import com.clalix.smart_gas.dto.LocationDto;
import java.util.List;

public interface LocationService {
    LocationDto create(LocationDto locationDto);
    LocationDto getById(Long id);
    List<LocationDto> getAll();
    LocationDto update(Long id, LocationDto locationDto);
    void delete(Long id);
}


