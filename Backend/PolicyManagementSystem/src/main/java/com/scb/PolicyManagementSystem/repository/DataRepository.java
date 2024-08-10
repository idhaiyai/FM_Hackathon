
package com.scb.PolicyManagementSystem.repository;
import com.scb.PolicyManagementSystem.model.CountryData;


import com.scb.PolicyManagementSystem.model.Status;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;


public interface DataRepository extends CrudRepository<CountryData, String> {


    @Query("{ 'ReporterName' : { '$regex' : ?0, '$options' : 'i' } }")
    List<CountryData> findByReporterName(String location);
}