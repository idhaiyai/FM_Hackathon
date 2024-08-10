package com.scb.PolicyManagementSystem.repository;

import com.scb.PolicyManagementSystem.model.User;
import java.lang.String;


import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;


public interface UserRepository extends CrudRepository<User, String> {
    Optional<User> findByUsername(String username);

    List<User> findByLocation(String location);
}