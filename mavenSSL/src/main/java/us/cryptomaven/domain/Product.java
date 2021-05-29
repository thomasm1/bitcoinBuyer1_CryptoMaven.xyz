package us.cryptomaven.domain;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Version
    private Integer version;

    private Date dateCreated;
    private Date lastUpdated;
    private String coinName;

    @Column(length = 2000)
    private String coinDescription;

    @ManyToOne
    private User user;

    private BigDecimal price;

    @ManyToMany
    private List<ProductCategory> productCategories = new ArrayList<>();

    private String imageUrl;

    @Column(name="symbol")
    private String symbol;

    @Column(name = "category")
    private String category;

    @Column(name = "retail_price")
    private Double retailPrice;

    @Column(name = "discounted_price")
    private Double discountedPrice;

    @Column(name = "volume")
    private Double volume;

    public Product() {};

    public Product(Integer version, Date dateCreated, Date lastUpdated, String coinName, String coinDescription, String symbol, String category, Double retailPrice, Double discountedPrice, Double volume, User user, BigDecimal price, List<ProductCategory> productCategories, String imageUrl) {
        this.version = version;
        this.dateCreated = dateCreated;
        this.lastUpdated = lastUpdated;
        this.coinName = coinName;

        this.coinDescription = coinDescription;
        this.symbol = symbol;
        this.category = category;
        this.retailPrice = retailPrice;

        this.discountedPrice = discountedPrice;
        this.volume = volume;
        this.user = user;
        this.price = price;
        this.productCategories = productCategories;

        this.imageUrl = imageUrl;
    }




    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    public void setLastUpdated(Date lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Double getRetailPrice() {
        return retailPrice;
    }

    public void setRetailPrice(Double retailPrice) {
        this.retailPrice = retailPrice;
    }

    public Double getDiscountedPrice() {
        return discountedPrice;
    }

    public void setDiscountedPrice(Double discountedPrice) {
        this.discountedPrice = discountedPrice;
    }

    public Double getVolume() {
        return volume;
    }

    public void setVolume(Double volume) {
        this.volume = volume;
    }



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCoinName() {
        return coinName;
    }

    public void setCoinName(String coinName) {
        this.coinName = coinName;
    }

    public String getCoinDescription() {
        return coinDescription;
    }

    public void setCoinDescription(String coinDescription) {
        this.coinDescription = coinDescription;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public List<ProductCategory> getProductCategories() {
        return productCategories;
    }

    public void setProductCategories(List<ProductCategory> productCategories) {
        this.productCategories = productCategories;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public Date getLastUpdated() {
        return lastUpdated;
    }

    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }

    @PreUpdate
    @PrePersist
    public void updateTimeStamps() {
        lastUpdated = new Date();
        if (dateCreated==null) {
            dateCreated = new Date();
        }
    }
}
