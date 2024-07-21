
package com.scb.PolicyManagementSystem.repository;
import com.scb.PolicyManagementSystem.model.Data;
import org.springframework.data.mongodb.repository.MongoRepository;



public interface DataRepository extends MongoRepository<Data, String> {
}