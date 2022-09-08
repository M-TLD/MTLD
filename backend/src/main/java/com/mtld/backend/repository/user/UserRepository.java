package com.mtld.backend.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.User;

/**
 * created by seongmin on 2022/09/08
 */
public interface UserRepository extends JpaRepository<User, Long> {
}
