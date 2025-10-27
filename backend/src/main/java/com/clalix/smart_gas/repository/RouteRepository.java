package com.clalix.smart_gas.repository;

import com.clalix.smart_gas.entities.Route;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RouteRepository extends JpaRepository<Route, Long> {
    Optional<Route> findByDeviceId(String deviceId);
}

