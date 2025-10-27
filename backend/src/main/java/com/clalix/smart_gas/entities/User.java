package com.clalix.smart_gas.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String email;
    private String phoneNumber;
    private String password;
    private String role;
    @OneToMany(mappedBy = "user")
    private List<Payment> payments;
    @OneToMany(mappedBy = "user")
    private List<Alert> alerts;
    @OneToMany(mappedBy = "user")
    private List<Notification> notifications;
    @OneToMany(mappedBy = "owner")
    private List<Cylinder> cylinders;
}

