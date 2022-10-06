package com.mtld.backend.dto.token;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

/**
 * created by seongmin on 2022/09/15
 */
@AllArgsConstructor
@Getter
@ToString
public class ReissueDto {
    private String accessToken;
    private String refreshToken;
}
