package us.cryptomaven.controllers;

import us.cryptomaven.commands.BlogCommand;
import us.cryptomaven.commands.LoginCommand;
import us.cryptomaven.domain.Post;
import us.cryptomaven.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/blog")
public class IndexBlogController {

    private PostService postService;

    @Autowired
    public void setPostService(PostService postService) {
        this.postService = postService;
    }


    @RequestMapping({"", "indexBlog"})
    public String getIndexBlog(Model model){
        model.addAttribute("posts", postService.getAllPosts());

        return "indexBlog";
    }
//    @RequestMapping({"/new", "indexBlog"})
//    public String setIndexBlog(Model model){
//        Post apost = new Post();
//        model.addAttribute("post", apost);
////        model.addAttribute("posts", postService.getAllPosts());
//
//        return "indexBlog";
//    }
    @RequestMapping("/login")
    public String showLoginForm(Model model){

        model.addAttribute("blogCommand", new BlogCommand());

        return "blogform";
    }

}
