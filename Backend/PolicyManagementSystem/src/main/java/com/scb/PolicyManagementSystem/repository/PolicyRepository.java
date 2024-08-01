package com.scb.PolicyManagementSystem.repository;


import com.scb.PolicyManagementSystem.model.Policy;
import com.scb.PolicyManagementSystem.model.Status;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import java.util.Date;
import java.util.List;
import java.util.Optional;


public interface PolicyRepository extends MongoRepository<Policy, String> {

    List<Policy> findByDataPolicyId(int dataPolicyId);
    Optional<Policy> findByDataPolicyIdAndDataPolicyStatus(int dataPolicyId, String status);

    List<Policy> findByDataPolicyStatus(Status status);
    List<Policy> findByDataPolicyCreator(String creator);
    List<Policy> findByDataPolicyExaminer(String examiner);

    @Query("{'dataPolicyLastModified': { $lt: ?0 }}")
    List<Policy> findPoliciesOlderThan(Date date);
}