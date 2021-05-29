package us.cryptomaven.restControllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import us.cryptomaven.domain.Product;
import us.cryptomaven.services.ProductService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/products")
public class ProductRestController {

    private static Map<Long, Product> productRepo = new HashMap<>();

    @Autowired
    public ProductService prServ;

    @RequestMapping("/list")
    public List<Object> listProducts() {
        return null;
    }

    @RequestMapping("/test")
    public String products() {
        return "products test";
    }

    //  All products  SHOWING THE CORRECT STATUS, RETURN ITEMS IN ASC ORDER
    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<Product> getProducts(){
        return prServ.getProducts();

    }
    // 1. Add a new Product   	WORKING BOTH STATUSES
    @RequestMapping(value="/add", method = RequestMethod.GET)
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {

        try {

            prServ.getProductById(product.getId()).equals(null);

        }catch(Exception e) {

            productRepo.put(product.getId(), product);
            prServ.addProduct(product);

            return new ResponseEntity<Product>( HttpStatus.CREATED);

        }

        return new ResponseEntity<Product>(HttpStatus.BAD_REQUEST);

    }

    // 2. Update a product by id 	WORKING BOTH STATUSES
    @RequestMapping(value="/{id}", consumes="application/json", method=RequestMethod.GET)
    public ResponseEntity<Product> updateProductById(@PathVariable("id") Long id, @RequestBody Product product) {
        try {
            prServ.getProductById(id).equals(null);

        }catch(Exception e) {

            return new ResponseEntity<Product>(HttpStatus.BAD_REQUEST);

        }
        if (prServ.getProductById(id).getId().equals(product.getId())) {
            prServ.updateProductById(product);
            return new ResponseEntity<Product>( HttpStatus.OK);
        }else {
            return new ResponseEntity<Product>(HttpStatus.BAD_REQUEST);
        }


    }


    // 3. Return a product by id 	WORKING BOTH STATUSES
//    @RequestMapping(value = "/{id}")
//    public ResponseEntity<Product> getProductById(@PathVariable("id") Long id) {
//
//        try {
//
//            prServ.getProductById(id).equals(null);
//
//        }catch(ProductNotFoundException e) {
//
//            return new ResponseEntity<Product>(HttpStatus.NOT_FOUND);
//
//        }
//
//        return new ResponseEntity<Product>( HttpStatus.OK);
//    }


    // 4. Return products by category
    // it is working, no response type yet
//    @RequestMapping(value="/category/{category}", method = RequestMethod.GET)
//    public List<Product> getProductsByCategory(@PathVariable("category") String category){
//        return prServ.getProductsByCategory(category);
//    }

//     5. Return products by category and volume
//     it is working, no response type yet
//    @RequestMapping(value="/category_volume/{category}/{volume}", method = RequestMethod.GET)
//    public List<Product> getProductsByCategoryAndVolume(@PathVariable("category") String category,
//                                                        @PathVariable("volume") Double volume){
//        return prServ.getProductsByCategoryAndVolume(category, volume);
//    }



    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> delete(@PathVariable("id") Long id) {
        productRepo.remove(id);
        return new ResponseEntity<Object>("Product deleted successfully", HttpStatus.OK);
    }

}
