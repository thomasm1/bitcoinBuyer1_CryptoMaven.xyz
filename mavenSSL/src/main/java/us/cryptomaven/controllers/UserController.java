package us.cryptomaven.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import us.cryptomaven.domain.Product;
import us.cryptomaven.domain.User;
import us.cryptomaven.repositories.UserRepository;
import us.cryptomaven.services.UserService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    UserService us;

    @Autowired
    UserRepository userRepository;

    @RequestMapping(value = "", method = RequestMethod.GET )
    public Iterable<User> getUsers() {
        return us.getUsers();
    }


    @RequestMapping(value="/add", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity<Product> addProduct(@RequestBody User user) {
        try {
            us.getUserById(user.getId()).equals(null);
        }catch(Exception e) {
            us.addUser(user);

            return new ResponseEntity<Product>( HttpStatus.CREATED);
        }
        return new ResponseEntity<Product>(HttpStatus.BAD_REQUEST);
    }
    // 2. Update a user by id 	WORKING BOTH STATUSES
    @RequestMapping(value="/{id}", consumes="application/json", method=RequestMethod.PUT)
    public ResponseEntity<Product> updateProductById(@PathVariable("id") Long id, @RequestBody User user) {
        try {
            us.getUserById(id).equals(null);
        }catch(Exception e) {
            return new ResponseEntity<Product>(HttpStatus.BAD_REQUEST);
        }
        if (us.getUserById(id).getId().equals(user.getId())) {
            us.updateUserById(user);
            return new ResponseEntity<Product>( HttpStatus.OK);
        }else {
            return new ResponseEntity<Product>(HttpStatus.BAD_REQUEST);
        }
    }
}


