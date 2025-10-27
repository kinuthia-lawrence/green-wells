package com.clalix.smart_gas.repository;

import com.clalix.smart_gas.entities.Cylinder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CylinderRepository extends JpaRepository<Cylinder, Long> {
}

