package com.mtld.backend.jwt;

import com.mtld.backend.entity.User;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

/**
 * created by seongmin on 2022/09/14
 */
@Getter
@Slf4j
public class UserDetailsImpl implements UserDetails {
    private Long id;
    private String oauthId;
    private String name;
    private String nickname;

    public UserDetailsImpl(Long id, String oauthId, String name, String nickname) {
        this.id = id;
        this.oauthId = oauthId;
        this.name = name;
        this.nickname = nickname;
    }

    public static UserDetailsImpl build(User user) {
        return new UserDetailsImpl(
                user.getId(),
                user.getOauthId(),
                user.getName(),
                user.getNickname()
        );
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() { // pwd 없음
        return null;
    }

    @Override
    public String getUsername() {
        return oauthId;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
