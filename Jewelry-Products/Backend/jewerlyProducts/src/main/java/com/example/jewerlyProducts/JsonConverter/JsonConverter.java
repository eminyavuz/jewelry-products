package com.example.jewerlyProducts.JsonConverter;

import com.example.jewerlyProducts.Entity.Images;
import com.example.jewerlyProducts.Entity.Product;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.InputStream;
import java.util.List;

@Service
public class JsonConverter {
    public Product[] convertProducts()
    {
        Product[] products = null;
        try {
            ObjectMapper om = new ObjectMapper();
            InputStream is = getClass().getClassLoader().getResourceAsStream("products.json");
            if (is != null) {
                products = om.readValue(is, Product[].class);
            } else {
                System.out.println("products.json bulunamadı!");
                products = new Product[0];
            }
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            products = new Product[0];
        }
        return products;
    }
}
