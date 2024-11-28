package org.ryukonz.esdminiproject.repo;

import org.apache.catalina.User;
import org.ryukonz.esdminiproject.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<Users, Integer> {
    Optional<Users> findByEmail(String email);
    Optional<Users> findByUsername(String username);
}
