package com.mtld.backend.dto.user;

import com.mtld.backend.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * created by seongmin on 2022/09/15
 */
@AllArgsConstructor
@Getter
public class UserInfoDto {
    private Long id;
    private String oauthId;
    private String name;

    public static UserInfoDto of(User user) {
        return new UserInfoDto(user.getId(), user.getOauthId(), user.getName());
    }
}
