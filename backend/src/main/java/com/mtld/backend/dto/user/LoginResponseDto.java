package com.mtld.backend.dto.user;

import com.mtld.backend.entity.User;
import com.mtld.backend.dto.token.TokenDto;
import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * created by seongmin on 2022/09/14
 * updated by seongmin on 2022/09/15
 */
@Data
@AllArgsConstructor
public class LoginResponseDto {

    private Long id;
    private String oauthId;
    private String name;
    private TokenDto tokenDto;

    public static LoginResponseDto of(User user, TokenDto tokenDto) {
        return new LoginResponseDto(user.getId(), user.getOauthId(), user.getName(), tokenDto);
    }
}
