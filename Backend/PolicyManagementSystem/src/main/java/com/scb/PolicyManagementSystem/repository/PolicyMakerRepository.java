

package com.scb.PolicyManagementSystem.repository;

import com.scb.PolicyManagementSystem.model.PolicyMaker;

import org.springframework.data.mongodb.repository.MongoRepository;



public interface PolicyMakerRepository extends MongoRepository<PolicyMaker, String> {
}