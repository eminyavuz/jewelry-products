package com.example.jewerlyProducts.Services;

import com.example.jewerlyProducts.api.GoldPriceResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class GoldPriceFetcher {

    @Value("${api.key}")
    private String apiKey;

    public double getGoldPrice() {
        try {
            String url = "https://api.twelvedata.com/price?symbol=XAU/USD&apikey=" + apiKey;
            RestTemplate restTemplate = new RestTemplate();
            GoldPriceResponse response = restTemplate.getForObject(url, GoldPriceResponse.class);

            if (response != null && response.getPrice() != null && !response.getPrice().isEmpty()) {
                System.out.println("Price value from API: " + response.getPrice());
                double price = Double.parseDouble(response.getPrice().trim())/31.1035;
                return price;
            } else {
                System.out.println("API boş ya da geçersiz veri döndü.");
                return 0;
            }
        } catch (Exception e) {
            System.out.println("Altın fiyatı alınamadı: " + e.getMessage());
            return 0;
        }
    }
}
