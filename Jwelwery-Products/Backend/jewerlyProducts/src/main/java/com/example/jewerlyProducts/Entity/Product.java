package com.example.jewerlyProducts.Entity;

import lombok.Data;



@Data


public class Product {
    public String name;
    public double popularityScore;
    public double weight;
    public Images images;
    public double calculatedPrice;

    public String getName() {
        return name;
    }

    public double getPopularityScore() {
        return popularityScore;
    }

    public double getWeight() {
        return weight;
    }

    public Images getImages() {
        return images;
    }

    public double getCalculatedPrice() {
        return calculatedPrice;
    }

    public void setCalculatedPrice(double calculatedPrice) {
        this.calculatedPrice = calculatedPrice;
    }

    @Override
    public String toString() {
        return "Product{" +
                "name='" + name + '\'' +
                ", popularityScore=" + popularityScore +
                ", weight=" + weight +
                ", images=" + images +
                ", calculatedPrice=" + calculatedPrice +
                '}';
    }
}

