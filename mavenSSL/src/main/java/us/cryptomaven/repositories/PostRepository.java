package us.cryptomaven.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import us.cryptomaven.domain.Post;

import java.util.List;
import java.util.Optional;

@Repository
//public interface PostRepository extends JpaRepository<PostEntity, Long> {
public interface PostRepository extends CrudRepository<Post, Long> {
	List<Post> findByUsername(String username);
	Post save(Post post);

	Optional<Post> findByCat3(String cat3);
	Optional<Post> findByDid(String did);
}
