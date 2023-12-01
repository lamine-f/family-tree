package com.fayefamily.persistance.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class CrossConfig {

    @Bean
    public UrlBasedCorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("*"); // Autoriser toutes les origines
        configuration.addAllowedMethod("*"); // Autoriser toutes les méthodes HTTP
        configuration.addAllowedHeader("*"); // Autoriser tous les en-têtes HTTP

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source; // Retourne UrlBasedCorsConfigurationSource
    }
}
