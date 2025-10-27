package com.clalix.smart_gas.repository;

import com.clalix.smart_gas.entities.SensorReading;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;
import  java.util.List;

@Repository
public interface SensorReadingRepository extends JpaRepository<SensorReading, Long> {
    Optional<SensorReading> findFirstByDeviceIdOrderByTimestampDesc(String deviceId);
    List<SensorReading> findByDeviceId(String deviceId, PageRequest pageRequest);
    List<SensorReading> findByTimestampBetween(LocalDateTime start, LocalDateTime end);
    long countByTimestampBetween(LocalDateTime start, LocalDateTime end);

    @Query("select count(distinct s.deviceId) from SensorReading s where s.timestamp between :start and :end")
    Integer countDistinctCylindersByTimestampBetween(LocalDateTime start, LocalDateTime end);
}
