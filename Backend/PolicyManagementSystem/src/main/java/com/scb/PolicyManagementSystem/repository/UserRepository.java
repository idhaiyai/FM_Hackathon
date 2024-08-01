package com.scb.PolicyManagementSystem.repository;

import com.scb.PolicyManagementSystem.model.User;
import java.lang.String;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;


public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUsername(String username);
}