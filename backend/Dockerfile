# Build stage
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /build
COPY pom.xml .
# Download dependencies first for better caching
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn package -DskipTests

# Runtime stage
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Create a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
RUN chown -R appuser:appgroup /app

# Copy JAR from build stage
COPY --from=build /build/target/*.jar app.jar

# Expose port for Spring Boot
EXPOSE 8080

# Switch to non-root user
USER appuser

# Set container-aware JVM options
ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-jar", "/app/app.jar"]

# Add health check
HEALTHCHECK --interval=30s --timeout=3s CMD wget --quiet --tries=1 --spider http://localhost:8080/actuator/health || exit 1