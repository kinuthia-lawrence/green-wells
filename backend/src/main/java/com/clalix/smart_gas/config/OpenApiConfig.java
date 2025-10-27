package com.clalix.smart_gas.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.servers.Server;

@OpenAPIDefinition(
        info = @Info(
                contact = @Contact(
                        name = "Clalix",
                        email = "kinuthialawrence343@gmail.com",
                        url = "https://larrykin343.vercel.app/"
                ),
                description = "OpenAPI documentation for SmartGas",
                title = "OpenApi specification - Clalix",
                version = "1.0",
                license = @License(
                        name = "......",
                        url = "......."
                ),
                termsOfService = "Terms of Service"
        ),
        servers = {
                @Server(
                        description = "Local ENV",
                        url = "http://localhost:8080"
                ),
                @Server(
                        description = "Production ENV",
                        url = "http://localhost:8080"
                )

        }
)
public class OpenApiConfig {
}
