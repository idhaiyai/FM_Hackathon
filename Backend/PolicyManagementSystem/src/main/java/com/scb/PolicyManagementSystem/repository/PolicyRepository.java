package com.scb.PolicyManagementSystem.repository;


import com.scb.PolicyManagementSystem.model.Policy;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PolicyRepository extends MongoRepository<Policy, String> {
}