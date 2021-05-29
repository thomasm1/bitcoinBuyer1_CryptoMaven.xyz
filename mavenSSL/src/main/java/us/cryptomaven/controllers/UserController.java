package us.cryptomaven.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import us.cryptomaven.domain.User;
import us.cryptomaven.repositories.UserRepository;
import us.cryptomaven.services.UserService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/")
public class UserController {
    @Autowired
    UserService us;

    @Autowired
    UserRepository userRepository;

    @RequestMapping(value = "/users", method = RequestMethod.GET )
    public Iterable<User> getUsers() {
        return us.getUsers();
    }

    @RequestMapping(value = "/users", method = RequestMethod.POST, consumes = "application/json")
    public User createUser(@RequestBody User user) {
        return us.addUser(user);
    }

}


