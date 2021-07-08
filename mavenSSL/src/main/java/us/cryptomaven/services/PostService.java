package us.cryptomaven.services;

import us.cryptomaven.domain.Post;

import java.util.List;

public interface PostService {
	Post createPost(Post post);
	Post getPostById(Long id);
	Post getPostByDid(String did);
	List<Post> findByCat3(String category);
	List<Post> findByUsernames(String username);

	List<Post> getAllPosts();
	List<Post> findAll();
	Post updatesPost(Post change);
	boolean deletePost(Post post);
	boolean deleteById(Long id);
	 Post updatePostById(Post post);
}
