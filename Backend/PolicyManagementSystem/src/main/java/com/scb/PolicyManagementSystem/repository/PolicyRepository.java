package com.scb.PolicyManagementSystem.repository;


import com.scb.PolicyManagementSystem.model.Policy;
import com.scb.PolicyManagementSystem.model.Status;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;


public interface PolicyRepository extends CrudRepository<Policy, String> {

    List<Policy> findByDataPolicyId(int dataPolicyId);
    Optional<Policy> findByDataPolicyIdAndDataPolicyStatus(int dataPolicyId, String status);

    List<Policy> findByDataPolicyStatus(Status status);
    List<Policy> findByDataPolicyCreator(String creator);
    List<Policy> findByDataPolicyExaminer(String examiner);

    @Query("{'dataPolicyLastModified': { $lt: ?0 }}")
    List<Policy> findPoliciesOlderThan(Date date);


    List<Policy> findByDataPolicyStatusNot(String status);
}