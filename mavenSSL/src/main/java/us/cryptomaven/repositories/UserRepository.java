package us.cryptomaven.repositories;

import org.springframework.data.domain.Sort;
import us.cryptomaven.domain.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {
    User findByEmail(String value);

    User save(User user);
    boolean deleteUserById(User one);

//    Object findAll(Sort sort);
}
