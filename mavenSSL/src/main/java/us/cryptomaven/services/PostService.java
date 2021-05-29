package us.cryptomaven.services;

import us.cryptomaven.domain.Post;

import java.util.List;

public interface PostService {
	public Post createPost(Post post);
	public Post getPostById(Long id); 
	public Post getPostByDid(String did);
 
	
	public List<Post> getAllPosts();
	public List<Post> findAll();
	public Post updatesPost(Post change);
	public boolean deletePost(Post post);
}
