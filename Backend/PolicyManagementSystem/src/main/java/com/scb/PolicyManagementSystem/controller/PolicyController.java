package com.scb.PolicyManagementSystem.controller;

import com.scb.PolicyManagementSystem.model.Policy;
import com.scb.PolicyManagementSystem.model.Status;
import com.scb.PolicyManagementSystem.service.PolicyService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/policies")
@CrossOrigin(origins = "http://localhost:3000")
public class PolicyController {

    @Autowired
    private PolicyService policyService;

    @GetMapping("/all")
    public List<Policy> getAllPolices(){
        return policyService.getAllPolices();
    }

    @GetMapping("/unique/{Id}")
    public Policy getPolicyById(@PathVariable String Id) {
        System.out.println(Id);
        return policyService.getPolicy(new String(String.valueOf(Id)));
    }
    @GetMapping("/ByCreator")
    public List<Policy> getAllPolicesByCreator(@RequestParam("creator") String creator){

        return policyService.getPolicesByCreator(creator);

    }

    @GetMapping("/ByExaminer")
    public List<Policy> getAllPolicesByExaminer(@RequestParam("examiner") String examiner){

        return policyService.getPolicesByExaminer(examiner);

    }

    @GetMapping("/ByStatus")
    public List<Policy> getAllPolicesByStatus(@RequestParam("status") String status){

        return policyService.getPolicesByStatus(Status.valueOf(status));

    }



    @GetMapping("/{policyId}")
    public List<Policy> getAllPolices(@PathVariable int policyId){
        return policyService.getAllPolicesByDataPolicyID(policyId);

    }
    @GetMapping("/archive")
    public  List<Policy> getAllArchive(){
        return policyService.getArchivePolices();
    }

    @PostMapping("/create/{userId}")
    public Policy createPolicy(@RequestBody Policy policy , @PathVariable String userId) {
        System.out.println(userId);
        return policyService.createPolicy( policy , userId);
    }

    @PostMapping("/update/{userId}")
    public Policy updatePolicy(@RequestBody Policy policy , @PathVariable String userId) {
        return policyService.updatePolicy( policy , userId);
    }

    @PostMapping("/approve/{Id}/{userId}")
    public Policy approvePolicy(@RequestParam("approve") boolean approve , @PathVariable("Id") String Id,
                                @PathVariable("userId") String userId) {
        System.out.println("here");
        return policyService.approvePolicy(new String(String.valueOf(Id)), userId , approve);
    }


}
