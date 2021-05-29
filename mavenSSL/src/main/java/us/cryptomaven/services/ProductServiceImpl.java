package us.cryptomaven.services;

import org.springframework.data.domain.Sort;
import us.cryptomaven.domain.Product;
import us.cryptomaven.repositories.ProductRepository;
import us.cryptomaven.services.jms.JmsTextMessageService;
import org.apache.commons.collections4.IteratorUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    
    @Autowired
    private ProductRepository productRepository;
    private JmsTextMessageService jmsTextMessageService;

    @Autowired
    public void setProductRepository(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Autowired
    public void setJmsTextMessageService(JmsTextMessageService jmsTextMessageService) {
        this.jmsTextMessageService = jmsTextMessageService;
    }

    @Override
    public Product getProduct(Long id) {
        jmsTextMessageService.sendTextMessage("Fetching Product ID: " + id );
//        return productRepository.findById(id).orElse(null);
        return productRepository.findOne(id);
    }

    @Override
    public List<Product> listProducts() {
        jmsTextMessageService.sendTextMessage("Listing Products");
        return IteratorUtils.toList(productRepository.findAll().iterator());
    }
    @Override
    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Product updateProductById(Product product) {
        return productRepository.save(product);
    }

    public Product getProductById(Long id) {
        return productRepository.findOne(id); //.get();
    }

    @Override
    public List<Product> getProductsByCategory(String category) {
        return productRepository.findAllByCategory(category);
    }

    @Override
    public List<Product> getProductsByCategoryAndVolume(String category, Double volume) {

        return productRepository.findAllByCategoryAndVolume(category, volume);
    }

    @Override
    public List<Product> getProducts() {
        Sort sort = new Sort(Sort.Direction.ASC, "id");
        return (List<Product>) productRepository.findAll(sort);

    }

    public boolean deleteProductById(Long id) {
        return productRepository.deleteProductById(productRepository.findOne(id));// .get());
    }
}
