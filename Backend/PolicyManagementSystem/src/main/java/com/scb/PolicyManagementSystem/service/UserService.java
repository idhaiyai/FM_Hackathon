package com.scb.PolicyManagementSystem.service;

import com.scb.PolicyManagementSystem.model.Policy;
import com.scb.PolicyManagementSystem.model.User;
import com.scb.PolicyManagementSystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return (List<User>) userRepository.findAll();
    }

    public Optional<User> verifyUser(String username, String password){
        Optional<User> user = userRepository.findByUsername(username);
        if(user.isPresent() && user.get().getPassword().equals(password)){
            return user;
        }
        else{
            return Optional.empty();
        }
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public  void addDataPolicy(Policy policy){

        String region = policy.getDataPolicyRegion().toUpperCase();
        System.out.println(region);
        List<User> usersBasedOnLocation = userRepository.findByLocation(region);

        for(User user:usersBasedOnLocation){
            System.out.println("changing for"+ user.getUsername());
            List<String> policies = user.getDataPolicyApplied();
            policies.add(policy.getId());
            System.out.println("adding " +policy.getId());
            user.setDataPolicyApplied(policies);
            userRepository.save(user);
        }

    }

    public  void removeDataPolicy(Policy policy){

        String region = policy.getDataPolicyRegion().toUpperCase();
        System.out.println(region);
        List<User> usersBasedOnLocation = userRepository.findByLocation(region);

        for(User user:usersBasedOnLocation){
            System.out.println("changing for"+ user.getUsername());
            List<String> policies = user.getDataPolicyApplied();
            policies.remove(policy.getId());
            System.out.println("removing " +policy.getId());
            user.setDataPolicyApplied(policies);
            userRepository.save(user);
        }


    }

}
