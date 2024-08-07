
package com.scb.PolicyManagementSystem.repository;
import com.scb.PolicyManagementSystem.model.Data;

import com.scb.PolicyManagementSystem.model.Status;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;


public interface DataRepository extends MongoRepository<Data, String> {


    @Query("{ 'ReporterName' : { '$regex' : ?0, '$options' : 'i' } }")
    List<Data> findByReporterName(String location);
}