
package com.clalix.smart_gas.config;

import com.clalix.smart_gas.entities.Device;
import com.clalix.smart_gas.entities.Notification;
import com.clalix.smart_gas.entities.Route;
import com.clalix.smart_gas.entities.User;
import com.clalix.smart_gas.enums.UserRole;
import com.clalix.smart_gas.repository.DeviceRepository;
import com.clalix.smart_gas.repository.NotificationRepository;
import com.clalix.smart_gas.repository.RouteRepository;
import com.clalix.smart_gas.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedData(
            UserRepository userRepo,
            DeviceRepository deviceRepo,
            NotificationRepository notificationRepo,
            RouteRepository routeRepo,
            PasswordEncoder encoder
    ) {
        return args -> {
            if (userRepo.count() == 0) {
                for (int i = 1; i <= 10; i++) {
                    User user = User.builder()
                            .username("user" + i)
                            .email("user" + i + "@smartgas.com")
                            .phoneNumber("07000000" + String.format("%02d", i))
                            .password(encoder.encode("password" + i))
                            .role(i == 1 ? UserRole.ADMIN : UserRole.USER)
                            .build();
                    userRepo.save(user);

                    Device device = Device.builder()
                            .deviceId("simulated-meter-" + String.format("%03d", i))
                            .name(user.getUsername() + "'s Meter")
                            .model("SG-100" + i)
                            .createdAt(LocalDateTime.now())
                            .lastSeen(LocalDateTime.now())
                            .user(user)
                            .build();
                    deviceRepo.save(device);

                    Notification notification = Notification.builder()
                            .message("Welcome " + user.getUsername() + ", your payment was successful")
                            .read(false)
                            .timestamp(LocalDateTime.now())
                            .user(user)
                            .build();
                    notificationRepo.save(notification);

                    Route route = Route.builder()
                            .name(user.getUsername() + "'s Delivery Route")
                            .deviceId(device.getDeviceId())
                            .description("Route for " + user.getUsername() + "'s cylinder refill")
                            .build();
                    routeRepo.save(route);
                }
            }
        };
    }
}