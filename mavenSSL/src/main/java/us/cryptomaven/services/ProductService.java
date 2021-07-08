package us.cryptomaven.services;

import us.cryptomaven.domain.Product;

import java.util.List;

public interface ProductService {


    Product getProduct(Long id);

    List<Product> getProducts();

    List<Product> listProducts();

    public Product addProduct(Product product);

    public Product updateProductById(Product product);

    public Product getProductById(Long id);

    public List<Product> getProductsByCategory(String category);

    public List<Product> getProductsByCategoryAndVolume(String category, Double volume);

    public boolean deleteProductById(Long id);
}
