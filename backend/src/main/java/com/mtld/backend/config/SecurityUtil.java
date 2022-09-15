package com.mtld.backend.config;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

/**
 * created by seongmin on 2022/09/14
 */
public class SecurityUtil {
    private SecurityUtil() { }

    public static String getCurrentOauthId() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || authentication.getName() == null) {
            throw new RuntimeException("Security Context 에 인증 정보가 없습니다.");
        }

        return authentication.getName();
    }
}
