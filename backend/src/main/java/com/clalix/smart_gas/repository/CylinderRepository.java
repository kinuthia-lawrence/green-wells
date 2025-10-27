package com.clalix.smart_gas.repository;

import com.clalix.smart_gas.entities.Cylinder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CylinderRepository extends JpaRepository<Cylinder, Long> {
}

