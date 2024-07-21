package com.scb.PolicyManagementSystem.service;

import com.scb.PolicyManagementSystem.model.Policy;
import com.scb.PolicyManagementSystem.model.Status;
import com.scb.PolicyManagementSystem.repository.PolicyRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PolicyService {

    @Autowired
     private  PolicyRepository policyRepository;

    public List<Policy> getAllPolices(){

        return policyRepository.findAll();

    }

    public Policy getPolicy(ObjectId id){

        return policyRepository.findById(id).get();



    }

    public List<Policy> getAllPolicesByDataPolicyID(int dataPolicyId){

        return policyRepository.findByDataPolicyId(dataPolicyId);

    }

    public List<Policy> getPolicesByStatus(Status status){

        return policyRepository.findByDataPolicyStatus(status);



    }

    public List<Policy> getArchivePolices(){
        return policyRepository.findByDataPolicyStatus(Status.ARCHIVED);
    }




    public Policy createPolicy(Policy policy , ObjectId userId){

        policy.setDataPolicyVersion(1);
        policy.setDataPolicyStatus(Status.WIP);
        policy.setDataPolicyCreator(userId);

        policy.setDataPolicyLastModified(new Date());
        return policyRepository.save(policy);



    }

    public Policy updatePolicy(Policy policy  , ObjectId userId) {

        List<Policy> old_policies = policyRepository.findByDataPolicyId(policy.getDataPolicyId());
        if(!old_policies.isEmpty()){
            Optional<Policy> highestVersionPolicy = old_policies.stream().max((p1, p2) -> Integer.compare(p1.getDataPolicyVersion(), p2.getDataPolicyVersion()));

            policy.setDataPolicyVersion( highestVersionPolicy.get().getDataPolicyVersion()+ 1);
            policy.setDataPolicyLastModified(new Date());
            policy.setDataPolicyCreator(userId);
            policy.setDataPolicy(policy.getDataPolicy());
            policy.setDataPolicyName(policy.getDataPolicyName());
            policy.setDataPolicyStatus(Status.WIP);
            return policyRepository.save(policy);
        }else{

            return null;
        }


    }

    public Policy approvePolicy(ObjectId Id , ObjectId userId , Boolean approve){

        Optional<Policy> optional_policy = policyRepository.findById(Id);

        if(optional_policy.isPresent()){
            Policy policy = optional_policy.get();
            policy.setDataPolicyLastModified(new Date());
            policy.setDataPolicyExaminer(userId);
            if(approve){
                // remove previously accepted policy
                System.out.println(policy.getDataPolicyId());
                Optional<Policy> previous_approved_policy = policyRepository.findByDataPolicyIdAndDataPolicyStatus(policy.getDataPolicyId() , "approved");
                if(previous_approved_policy.isPresent()) {
                    previous_approved_policy.get().setDataPolicyStatus(Status.REJECTED);
                    policyRepository.save(previous_approved_policy.get());
                }
                policy.setDataPolicyStatus( Status.APPROVED);

            }else{
                policy.setDataPolicyStatus( Status.REJECTED);

            }
            return policyRepository.save(policy);

        }
        return null;

    }
    public void archivePolicy(){

        LocalDate date = LocalDate.now().minusMonths(1);
        Date oneMonthAgo =  Date.from(date.atStartOfDay(ZoneId.systemDefault()).toInstant());
        List<Policy> oldPolicies = policyRepository.findPoliciesOlderThan(oneMonthAgo);

        for (Policy policy : oldPolicies) {
            policy.setDataPolicyStatus(Status.ARCHIVED);
        }

        policyRepository.saveAll(oldPolicies);

    }
}
