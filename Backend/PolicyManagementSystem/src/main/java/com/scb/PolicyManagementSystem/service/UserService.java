package com.scb.PolicyManagementSystem.service;

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
        return userRepository.findAll();
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

}
