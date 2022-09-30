package com.mtld.backend.config;

import com.mtld.backend.jwt.AuthAccessDeniedHandler;
import com.mtld.backend.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.stereotype.Component;

/**
 * created by seongmin on 2022/09/07
 * updated by seongmin on 2022/09/15
 */

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
@Component
public class SecurityConfig {

    private final JwtTokenProvider jwtTokenProvider;
    private final AuthAccessDeniedHandler authAccessDeniedHandler;
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .httpBasic().disable()
                .cors().and().csrf().disable()
                .formLogin().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                .and()
                .exceptionHandling()
                .accessDeniedHandler(authAccessDeniedHandler)

                .and()
                .authorizeRequests()
                .antMatchers("/login/**","/swagger*/**", "/webjars/**", "/swagger-ui.html", "/swagger-resources/**","/v2/api-docs").permitAll()
                .anyRequest().authenticated()

                .and()
                .apply(new JwtSecurityConfig(jwtTokenProvider));

        return http.build();
    }




}
