package us.cryptomaven.services;

import us.cryptomaven.domain.Product;
import us.cryptomaven.domain.User;

import java.util.List;

public interface UserService {

    User getUser(Long id);

    List<User> getUsers();

    List<User> listUsers();

    public User addUser(User u);

    public User updateUserById(User u);

    public User getUserById(Long id);

    public List<User> getUsersByEmail(String email);

    public List<User> getUsersByEmailAndPassword(String email, String password);

    public boolean deleteUserById(Long id);
}
