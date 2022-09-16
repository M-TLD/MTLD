package com.mtld.backend.dto.token;

import lombok.*;

/**
 * created by seongmin on 2022/09/14
 * updated by seongmin on 2022/09/15
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TokenDto {
    private String grantType;
    private String accessToken;
    private Long tokenExpiresIn;
    private String refreshToken;
    private Long refreshTokenExpiresIn;
}
