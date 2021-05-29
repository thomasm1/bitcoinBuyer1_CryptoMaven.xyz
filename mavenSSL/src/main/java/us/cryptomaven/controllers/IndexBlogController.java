package us.cryptomaven.controllers;

import us.cryptomaven.commands.BlogCommand;
import us.cryptomaven.commands.LoginCommand;
import us.cryptomaven.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class IndexBlogController {

    private PostService postService;


    @RequestMapping("/blog-login")
    public String showLoginForm(Model model){

        model.addAttribute("blogCommand", new BlogCommand());

        return "blogform";
    }


    @Autowired
    public void setPostService(PostService postService) {
        this.postService = postService;
    }

    @RequestMapping({"/blog", "indexBlog"})
    public String getIndexBlog(Model model){

        model.addAttribute("posts", postService.getAllPosts());

        return "indexBlog";
    }

}
