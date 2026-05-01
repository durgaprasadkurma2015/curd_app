package com.example.service;

import java.util.List;
import java.util.Map;
import java.lang.reflect.Field;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.entity.User;
import com.example.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository repo;

    public User save(User user) {
        return repo.save(user);
    }

    public List<User> getAll() {
        return repo.findAll();
    }

    public User update(Long id, User user) {
        user.setId(id);
        return repo.save(user);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

//	public User patchUpdate(Long id, Map<String, Object> updates) {return null;}
    
    

    public User patchUpdate(Long id, Map<String, Object> updates) {

        User user = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id " + id));

        updates.forEach((key, value) -> {
            try {
                Field field = User.class.getDeclaredField(key);
                field.setAccessible(true);
                field.set(user, value);
            } catch (NoSuchFieldException | IllegalAccessException e) {
                throw new RuntimeException("Invalid field: " + key);
            }
        });

        return repo.save(user);
    }


}