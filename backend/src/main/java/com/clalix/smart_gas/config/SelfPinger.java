package com.clalix.smart_gas.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
@Slf4j
public class SelfPinger {

    private final RestTemplate restTemplate = new RestTemplate();

    @Scheduled(fixedRate = 300000)
    public void ping() {
        try {
            restTemplate.getForObject("https://smart-gas.onrender.com/actuator/health", String.class);
            log.info("Self-ping successful");
        } catch (Exception e) {
            log.error("Self-ping failed", e);
        }
    }
}