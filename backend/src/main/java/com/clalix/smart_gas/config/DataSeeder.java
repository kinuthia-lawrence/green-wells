package com.clalix.smart_gas.config;

import com.clalix.smart_gas.entities.*;
import com.clalix.smart_gas.enums.PaymentStatus;
import com.clalix.smart_gas.enums.UserRole;
import com.clalix.smart_gas.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.Random;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedData(
            UserRepository userRepo,
            DeviceRepository deviceRepo,
            NotificationRepository notificationRepo,
            RouteRepository routeRepo,
            PaymentRepository paymentRepo,
            PasswordEncoder encoder
    ) {
        return args -> {
            Random random = new Random();
            if (userRepo.count() == 0) {
                // Create admin separately
                User adminUser = User.builder()
                        .username("Admin")
                        .email("admin@smartgas.com")
                        .phoneNumber("0700000000")
                        .password(encoder.encode("password"))
                        .role(UserRole.ADMIN)
                        .build();
                userRepo.save(adminUser);

                // Create regular users and their devices/payments/etc.
                for (int i = 1; i <= 10; i++) {
                    User user = User.builder()
                            .username("user" + i)
                            .email("user" + i + "@smartgas.com")
                            .phoneNumber("07000000" + String.format("%02d", i))
                            .password(encoder.encode("password" + i))
                            .role(UserRole.USER)
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
                    for (int p = 0; p < 3; p++) {
                        PaymentStatus status = (p == 0) ? PaymentStatus.PAID : (p == 1) ? PaymentStatus.PENDING : PaymentStatus.FAILED;
                        double amount = 100 + (random.nextDouble() * 400); // 100 - 500
                        Payment payment = Payment.builder()
                                .transactionId(java.util.UUID.randomUUID().toString())
                                .amount(amount)
                                .status(status)
                                .paymentTime(LocalDateTime.now().minusDays(random.nextInt(30)))
                                .method("CARD")
                                .user(user)
                                .build();
                        paymentRepo.save(payment);
                    }
                }
            }
        };
    }
}