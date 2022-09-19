package com.mtld.backend.repository.user;

import com.mtld.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import java.util.Optional;

/**
 * created by seongmin on 2022/09/08
 * updated by myeongseok on 2022/09/15
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByOauthId(String oauthId);

    Optional<User> findById(Long id);

}
