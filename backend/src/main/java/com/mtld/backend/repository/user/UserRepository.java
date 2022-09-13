package com.mtld.backend.repository.user;

import com.mtld.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * created by seongmin on 2022/09/08
 * updated by seongmin on 2022/09/13
 */
public interface UserRepository extends JpaRepository<User, Long> {
}
