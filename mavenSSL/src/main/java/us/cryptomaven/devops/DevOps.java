package us.cryptomaven.devops;

import us.cryptomaven.domain.Post;
import us.cryptomaven.domain.User;
import us.cryptomaven.domain.Product;
import us.cryptomaven.domain.ProductCategory;
import us.cryptomaven.repositories.PostRepository;
import us.cryptomaven.repositories.UserRepository;
import us.cryptomaven.repositories.ProductCategoryRepository;
import us.cryptomaven.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;
import java.math.BigDecimal;

@Component
public class DevOps implements ApplicationListener<ContextRefreshedEvent> {

    private PostRepository postRepository;
    private UserRepository userRepository;
    private ProductCategoryRepository productCategoryRepository;
    private ProductRepository productRepository;

    @Autowired
    public void setPostRepository(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Autowired
    public void setProductCategoryRepository(ProductCategoryRepository productCategoryRepository) {
        this.productCategoryRepository = productCategoryRepository;
    }

    @Autowired
    public void setProductRepository(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {

//        User user = new User(3L,  "firstName",   "lastName",  "email@gmail.com", "passwordx", "http://tmm.net/images");
//        user = userRepository.save(user);
        //  public Post(   "date",   "author", "monthOrder", "cat3", "title", "post", "blogcite", "username")
        Post p = new Post();
        p.setId(1040L);
        p.setDid("setDid");
        p.setDate("setDate");
        p.setAuthor("setAuthor");
        p.setMonthOrder("setMonthOrder");
        p.setCat3("setCat3");
        p.setTitle("setTitle");
        p.setPost("setPost");
        p.setUsername("setUsername");
        p = postRepository.save(p);

        Post p1 = new Post();
        p1.setId(1041L);
        p1.setDid("setDid1");
        p1.setDate("setDate1");
        p1.setAuthor("setAuthor1");
        p1.setMonthOrder("setMonthOrder1");
        p1.setCat3("setCat31");
        p1.setTitle("setTitle1");
        p1.setPost("setPost1");
        p1.setUsername("setUsername1");
        p1 = postRepository.save(p1);

        User tm = new User();
        tm.setFirstName("Thomas");
        tm.setLastName("Maestas");
        tm.setEmail("thomas@gmail.com");
        tm.setPassword("xyzPW");
        tm.setId(1L);
        tm.setImage("profile.jpg");

        tm = userRepository.save(tm);

        User tm2 = new User();
        tm2.setFirstName("Thomas2");
        tm2.setLastName("Maestas2");
        tm2.setEmail("thomas2@gmail.com");
        tm2.setPassword("xyzPW2");
        tm2.setId(2L);
        tm2.setImage("profile2.jpg");

        tm2 = userRepository.save(tm2);

        ProductCategory categorySecurity = new ProductCategory();
        categorySecurity.setId(1L);
        categorySecurity.setCategory("Security Tokens");

        categorySecurity = productCategoryRepository.save(categorySecurity);

        ProductCategory categoryPlatform = new ProductCategory();
        categoryPlatform.setId(2L);
        categoryPlatform.setCategory("Platform Tokens");

        categoryPlatform = productCategoryRepository.save(categoryPlatform);

        ProductCategory categoryTransactional = new ProductCategory();
        categoryTransactional.setId(3L);
        categoryTransactional.setCategory("Transactional Tokens");

        categoryTransactional = productCategoryRepository.save(categoryTransactional);

        ProductCategory categoryUtility = new ProductCategory();
        categoryUtility.setId(4L);
        categoryUtility.setCategory("Utility Tokens");

        categoryUtility = productCategoryRepository.save(categoryUtility);

        ProductCategory categoryGovernance = new ProductCategory();
        categoryGovernance.setId(5L);
        categoryGovernance.setCategory("Governance Tokens");

        categoryGovernance = productCategoryRepository.save(categoryGovernance);

//        PRODUCTS
        Product coinETH = new Product();
        coinETH.setId(1L);
        coinETH.setCoinName("Ethereum");
        coinETH.setSymbol("ETH");
        coinETH.setUser(tm2);
        coinETH.setCoinDescription("https://towardsdatascience.com/creating-bitcoin-trading-bots-that-dont-lose-money-2e7165fb0b29\n");

        coinETH.setPrice(new BigDecimal("0"));
        coinETH.setImageUrl("TMMmoonscape_450.jpg");
        coinETH.getProductCategories().add(categoryGovernance);
        coinETH.getProductCategories().add(categoryTransactional);

        coinETH = productRepository.save(coinETH);

        Product coinBTC = new Product();
        coinBTC.setId(2L);
        coinBTC.setCoinName("Bitcoin");
        coinBTC.setSymbol("BTC");
        coinBTC.setUser(tm2);
        coinBTC.setCoinDescription("https://towardsdatascience.com/creating-bitcoin-trading-bots-that-dont-lose-money-2e7165fb0b29\n");

        coinBTC.setPrice(new BigDecimal("199"));
        coinBTC.setImageUrl("tmm2.png");
        coinBTC.getProductCategories().add(categoryGovernance);
        coinBTC.getProductCategories().add(categoryTransactional);

        coinBTC = productRepository.save(coinBTC);

        Product coinHex = new Product();
        coinHex.setId(3L);
        coinHex.setCoinName("Hex");
        coinHex.setSymbol("HEX");
        coinHex.setUser(tm);
        coinHex.setCoinDescription("https://www.coindesk.com/set-protocol-launches-momentum-trading-strategy\n" +
                "\n" +
                ".\n" +
                "\n");
        coinHex.setPrice(new BigDecimal("199"));
        coinHex.setImageUrl("dailytech.png");
        coinHex.getProductCategories().add(categoryUtility);

        coinHex = productRepository.save(coinHex);

        Product coinLink = new Product();
        coinLink.setId(4L);
        coinLink.setCoinName("ChainLink");
        coinLink.setSymbol("LINK");
        coinLink.setUser(tm);
        coinLink.setCoinDescription("https://www.coindesk.com/set-protocol-launches-momentum-trading-strategy\n" +
                "\n" +
                "" +
                "Java\n");
        coinLink.setPrice(new BigDecimal("199"));
        coinLink.setImageUrl("tmm4.png");
        coinLink.getProductCategories().add(categoryGovernance);
        coinLink.getProductCategories().add(categoryUtility);

        coinLink = productRepository.save(coinLink);

        Product coinMatic = new Product();
        coinMatic.setId(5L);
        coinMatic.setCoinName("Polygon");
        coinMatic.setSymbol("MATIC");
        coinMatic.setUser(tm);
        coinMatic.setCoinDescription("https://www.coindesk.com/set-protocol-launches-momentum-trading-strategy\n");

        coinMatic.setPrice(new BigDecimal("199"));
        coinMatic.setImageUrl("tmm3.png");
        coinMatic.getProductCategories().add(categoryGovernance);
        coinMatic.getProductCategories().add(categoryPlatform);

        coinMatic = productRepository.save(coinMatic);

        Product coinCompound = new Product();
        coinCompound.setId(6L);
        coinCompound.setCoinName("Compound");
        coinCompound.setSymbol("COMP");
        coinCompound.setUser(tm);
        coinCompound.setCoinDescription("https://towardsdatascience.com/creating-bitcoin-trading-bots-that-dont-lose-money-2e7165fb0b29\n");
        coinCompound.setPrice(new BigDecimal("199"));
        coinCompound.setImageUrl("shadowbox.png");
        coinCompound.getProductCategories().add(categorySecurity);
        coinCompound.getProductCategories().add(categoryPlatform);

        coinCompound = productRepository.save(coinCompound);
    }
}
