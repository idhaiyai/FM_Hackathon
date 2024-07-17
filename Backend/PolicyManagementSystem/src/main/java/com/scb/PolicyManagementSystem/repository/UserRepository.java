package com.scb.PolicyManagementSystem.repository;

import com.scb.PolicyManagementSystem.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;



public interface UserRepository extends MongoRepository<User, String> {
}