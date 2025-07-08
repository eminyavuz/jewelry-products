package com.example.jewerlyProducts.Web;

import com.example.jewerlyProducts.JsonConverter.JsonConverter;
import com.example.jewerlyProducts.Services.ProductServices;
import com.example.jewerlyProducts.Entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
public class MainController {

    @Autowired
    ProductServices services;
    @Autowired
    JsonConverter converter;

    @GetMapping("/api/products")
    public Product[] getProducts(
            @RequestParam(value = "minPrice", required = false) Double minPrice,
            @RequestParam(value = "maxPrice", required = false) Double maxPrice,
            @RequestParam(value = "minPopularity", required = false) Double minPopularity,
            @RequestParam(value = "maxPopularity", required = false) Double maxPopularity
    ) {
        Product[] allProducts = converter.convertProducts();
        List<Product> filtered = new ArrayList<>();
        
        System.out.println("=== API ÇAĞRISI BAŞLADI ===");
        
        for (Product p : allProducts) {
            double price = services.getPrice(p);
            p.setCalculatedPrice(price);
            double popularity = p.getPopularityScore() * 5;
            
            System.out.println("Ürün: " + p.getName() + " - Hesaplanan Fiyat: " + String.format("%.2f", price) + " TL");
            
            if (minPrice != null && price < minPrice) continue;
            if (maxPrice != null && price > maxPrice) continue;
            if (minPopularity != null && popularity < minPopularity) continue;
            if (maxPopularity != null && popularity > maxPopularity) continue;
            filtered.add(p);
        }
        
        System.out.println("=== API ÇAĞRISI TAMAMLANDI ===");
        System.out.println("Toplam " + filtered.size() + " ürün döndürüldü.");
        
        return filtered.toArray(new Product[0]);
    }
}
