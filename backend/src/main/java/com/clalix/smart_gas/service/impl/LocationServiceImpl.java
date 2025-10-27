package com.clalix.smart_gas.service.impl;

import com.clalix.smart_gas.dto.LocationDto;
import com.clalix.smart_gas.entities.Location;
import com.clalix.smart_gas.repository.LocationRepository;
import com.clalix.smart_gas.service.interfaces.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LocationServiceImpl implements LocationService {
    @Autowired
    private LocationRepository locationRepository;

    private LocationDto toDto(Location location) {
        LocationDto dto = new LocationDto();
        dto.setId(location.getId());
        dto.setLatitude(location.getLatitude());
        dto.setLongitude(location.getLongitude());
        dto.setAddress(location.getAddress());
        return dto;
    }

    private Location toEntity(LocationDto dto) {
        Location location = new Location();
        location.setId(dto.getId());
        location.setLatitude(dto.getLatitude());
        location.setLongitude(dto.getLongitude());
        location.setAddress(dto.getAddress());
        return location;
    }

    @Override
    public LocationDto create(LocationDto locationDto) {
        Location location = toEntity(locationDto);
        return toDto(locationRepository.save(location));
    }

    @Override
    public LocationDto getById(Long id) {
        return locationRepository.findById(id).map(this::toDto).orElse(null);
    }

    @Override
    public List<LocationDto> getAll() {
        return locationRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public LocationDto update(Long id, LocationDto locationDto) {
        if (!locationRepository.existsById(id)) return null;
        locationDto.setId(id);
        Location location = toEntity(locationDto);
        return toDto(locationRepository.save(location));
    }

    @Override
    public void delete(Long id) {
        locationRepository.deleteById(id);
    }
}

