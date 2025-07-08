package com.example.jewerlyProducts.Services;

import com.example.jewerlyProducts.Entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductServices {
    @Autowired
    GoldPriceFetcher fetcher;
    public  ProductServices(GoldPriceFetcher fetcher){
        this.fetcher=fetcher;
    }
    public String getProducts(Product[] products) {
        double goldPrice = fetcher.getGoldPrice();
        System.out.println("=== ALTIN FİYATI: " + goldPrice + " ===");
        
        for (Product product : products) {
            double calculatedPrice = getPrice(product);
            System.out.println("calculatedPrice: " + calculatedPrice);
            product.setCalculatedPrice(calculatedPrice);
            
            System.out.println("=== ÜRÜN DETAYI ===");
            System.out.println("Ürün Adı: " + product.getName());
            System.out.println("Popülerlik Skoru: " + product.getPopularityScore());
            System.out.println("Ağırlık: " + product.getWeight() + " gram");
            System.out.println("Hesaplanan Fiyat: " + String.format("%.2f", calculatedPrice) + " TL");
            System.out.println("Hesaplama: (" + product.getPopularityScore() + " + 1) * " + product.getWeight() + " * " + goldPrice + " = " + String.format("%.2f", calculatedPrice));
            System.out.println("==================");
        }
        return null;
    }
    public double getPrice (Product product)
    {
        double goldPrice=fetcher.getGoldPrice();
        return  (product.getPopularityScore()+1)*product.getWeight()*goldPrice ;
    }
}
