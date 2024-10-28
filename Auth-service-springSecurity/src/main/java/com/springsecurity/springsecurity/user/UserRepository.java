package com.springsecurity.springsecurity.user;

import org.hibernate.id.IntegralDataTypeHolder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.OptionalInt;

public interface UserRepository extends JpaRepository<User , Integer> {

    Optional<User> findByEmail(String email);
}
