package com.clalix.smart_gas.enums;

public enum CylinderStatus {
    AVAILABLE,
    RESERVED,
    ASSIGNED,
    IN_TRANSIT,
    DELIVERED,
    IN_USE,
    EMPTY,
    NEEDS_REFILL,
    UNDER_MAINTENANCE,
    LOST,
    DISPOSED;

    public boolean isAvailable() {
        return this == AVAILABLE;
    }

    public boolean needsRefillOrEmpty() {
        return this == EMPTY || this == NEEDS_REFILL;
    }
}
