package com.clalix.smart_gas.service.impl;

import com.clalix.smart_gas.dto.SensorReadingDto;
import com.clalix.smart_gas.entities.SensorReading;
import com.clalix.smart_gas.repository.SensorReadingRepository;
import com.clalix.smart_gas.service.interfaces.SensorService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class SensorServiceImpl implements SensorService {

    private final SensorReadingRepository sensorReadingRepository;

    @Override
    public SensorReadingDto getLatestReading(String deviceId) {
        log.info("Fetching latest reading for device: {}", deviceId);

        return sensorReadingRepository
                .findFirstByDeviceIdOrderByTimestampDesc(deviceId)
                .map(this::convertToDto)
                .orElse(null);
    }

    @Override
    public List<SensorReadingDto> getReadingHistory(String deviceId) {
        log.info("Fetching reading history for device: {}", deviceId);
        // Get last 100 readings ordered by timestamp descending
        PageRequest pageRequest = PageRequest.of(0, 100,
                Sort.by(Sort.Direction.DESC, "timestamp"));

        return sensorReadingRepository
                .findByDeviceId(deviceId, pageRequest)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<SensorReadingDto> getAllReadings() {
        log.info("Fetching all sensor readings");

        return sensorReadingRepository
                .findAll(Sort.by(Sort.Direction.DESC, "timestamp"))
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private SensorReadingDto convertToDto(SensorReading reading) {
        return SensorReadingDto.builder()
                .id(reading.getId())
                .deviceId(reading.getDeviceId())
                .gasValue(reading.getGasValue())
                .leakDetected(reading.isLeakDetected())
                .latitude(reading.getLatitude())
                .longitude(reading.getLongitude())
                .timestamp(reading.getTimestamp())
                .status(reading.getStatus())
                .build();
    }
}