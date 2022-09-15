package com.mtld.backend.dto.token;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * created by seongmin on 2022/09/15
 */
@AllArgsConstructor
@Getter
public class ReissueDto {
    private String accessToken;
    private String refreshToken;
}
