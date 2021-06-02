package us.cryptomaven.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import us.cryptomaven.domain.Post;
import us.cryptomaven.domain.Product;
import us.cryptomaven.domain.User;
import us.cryptomaven.repositories.PostRepository;
import us.cryptomaven.services.PostService;

import java.net.URI;
import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/posts/")
public class PostController {
	
	@Autowired
	private PostService postService;
	
	@Autowired
	private PostRepository postRepository;

	@RequestMapping(path="", method=RequestMethod.GET)
	public List<Post> getPosts(){
//		return postRepository.findByUsername(username);
		return postService.findAll();
	}
@RequestMapping(path="/{category}",method=RequestMethod.GET)
	public List<Post> getPostsByCategory(@PathVariable String category ){
		return postRepository.findByCat3(category);
}
	@RequestMapping(path="/user/{username}", method=RequestMethod.GET)
	public List<Post> findByUsername(@PathVariable String username){
		return postService.findByUsernames(username);
	}

	// 1. Add a new Product   	WORKING BOTH STATUSES
	@RequestMapping(value="/add", method = RequestMethod.POST)
	public ResponseEntity<Post> addPost(@RequestBody Post post) {
		try {
			postService.getPostById(post.getId()).equals(null);
		}catch(Exception e) {
			postService.createPost(post);
			return new ResponseEntity<Post>( HttpStatus.CREATED);
		}
		return new ResponseEntity<Post>(HttpStatus.BAD_REQUEST);
	}

//	@RequestMapping(value="/{username}/posts",method=RequestMethod.POST)
//	public ResponseEntity<Void> createPost(
//			@PathVariable String username, 
//		    @RequestBody Post post
//			){ 
//		post.setUsername(username);
//		Post postCreated = postRepository.save(post);
////		 Post postCreated = postService.save(post);  
//		 URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
//				 .path("/{id}").buildAndExpand(postCreated.getId()).toUri(); 
//		 return ResponseEntity.created(uri).build(); 
//	}
// 2. Update a user by id 	WORKING BOTH STATUSES
@RequestMapping(value="/{id}", consumes="application/json", method=RequestMethod.PUT)
public ResponseEntity<Post> updatePostById(@PathVariable("id") Long id, @RequestBody Post post) {
	try {
		postService.getPostById(id).equals(null);
	}catch(Exception e) {
		return new ResponseEntity<Post>(HttpStatus.BAD_REQUEST);
	}
	if (postService.getPostById(id).getId().equals(post.getId())) {
		postService.updatePostById(post);
		return new ResponseEntity<Post>( HttpStatus.OK);
	}else {
		return new ResponseEntity<Post>(HttpStatus.BAD_REQUEST);
	}
}


			@RequestMapping(value="/{username}/posts/{id}",method=RequestMethod.GET)
			public Post getPost(@PathVariable String username, @PathVariable long id){
//				return postRepository.findById(id).get();
				return postRepository.findOne(id);

				//		return postService.findById(id); 
			}


			@RequestMapping(value="/{id}",method=RequestMethod.DELETE)
			public boolean deletePost( @PathVariable Long id){
				
//				postRepository.deleteById(id);
//				postRepository.delete(id);
//				return ResponseEntity.noContent().build();
				try {
					return postService.deleteById(id);
				} catch (IllegalArgumentException e) {
					return false;
				}

// 		Post post = postService.deleteById(id);
		//		if(post!=null) {
		//			return ResponseEntity.noContent().build();
		//		}
		//		return ResponseEntity.notFound().build();
			}

			@RequestMapping(method=RequestMethod.PUT, value ="/{username}/posts/{id}" )
			public ResponseEntity<Post> updatePost(
					@PathVariable String username, 
					@PathVariable long id, @RequestBody Post post){

				Post postUpdated = postRepository.save(post);
				 return new ResponseEntity<Post>(post, HttpStatus.OK);
				
		//		 Post postUpdated = postService.save(post); 
		//		 return new ResponseEntity<Post>(post, HttpStatus.OK);
			}
			

	
}
