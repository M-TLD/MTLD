package com.mtld.backend.jwt;

import com.mtld.backend.entity.User;
import com.mtld.backend.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

/**
 * created by seongmin on 2022/09/14
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String oauthId) throws UsernameNotFoundException {
        log.info("로그 UserDetailServiceImpl 시작");

        return userRepository.findByOauthId(oauthId)
                .map(this::createUserDetails)
                .orElseThrow(() -> new UsernameNotFoundException(oauthId + " 을 DB에서 찾을 수 없습니다"));
    }

    private UserDetails createUserDetails(User user) {
        GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(user.getRoleType().toString());

        return new org.springframework.security.core.userdetails.User(
                String.valueOf(user.getId()),
                null,
                Collections.singleton(grantedAuthority)
        );
    }

}
