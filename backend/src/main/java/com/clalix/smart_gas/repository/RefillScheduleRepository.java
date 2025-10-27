package com.clalix.smart_gas.repository;

import com.clalix.smart_gas.entities.RefillSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RefillScheduleRepository extends JpaRepository<RefillSchedule, Long> {
}

