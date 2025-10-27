package com.clalix.smart_gas.repository;

import com.clalix.smart_gas.entities.SensorReading;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import  java.util.List;

@Repository
public interface SensorReadingRepository extends JpaRepository<SensorReading, Long> {
    Optional<SensorReading> findFirstByDeviceIdOrderByTimestampDesc(String deviceId);

    List<SensorReading> findByDeviceId(String deviceId, PageRequest pageRequest);
}
