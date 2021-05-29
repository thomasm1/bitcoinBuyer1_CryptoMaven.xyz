package us.cryptomaven.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import us.cryptomaven.domain.Post;
import us.cryptomaven.repositories.PostRepository;
import us.cryptomaven.services.PostService;

import java.net.URI;
import java.util.List;


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

	@RequestMapping(path="/{username}/posts", method=RequestMethod.GET)
	public List<Post> getPostsByName(@PathVariable String username){
//		return postRepository.findByUsername(username);
		return postService.findAll(); 
	}

	@RequestMapping(value="/{username}/posts",method=RequestMethod.POST)
	public ResponseEntity<Void> createPost(
			@PathVariable String username, 
		    @RequestBody Post post
			){
		 
		post.setUsername(username);
		Post postCreated = postRepository.save(post);
//		 Post postCreated = postService.save(post); 
 
		 URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
				 .path("/{id}").buildAndExpand(postCreated.getId()).toUri();
		 
		 return ResponseEntity.created(uri).build();
 
	}
			@RequestMapping(value="/{username}/posts/{id}",method=RequestMethod.GET)
			public Post getPost(@PathVariable String username, @PathVariable long id){
//				return postRepository.findById(id).get();
				return postRepository.findOne(id);

				//		return postService.findById(id); 
			}


			@RequestMapping(value="/api/{username}/posts/{id}",method=RequestMethod.DELETE)
			public ResponseEntity<Void> deletePost(
					@PathVariable String username, @PathVariable long id){
				
//				postRepository.deleteById(id);
				postRepository.delete(id);

				return ResponseEntity.noContent().build();
		//		Post post = postService.deleteById(id);
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
