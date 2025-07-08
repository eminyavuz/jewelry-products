# OpenJDK 17 tabanlı hafif bir imaj kullan
FROM openjdk:17-jdk-slim

# Çalışma dizinini ayarla
WORKDIR /app

# Proje dosyalarını konteynıra kopyala
COPY . /app

# Maven wrapper ile jar dosyasını üret (testleri atla)
RUN ./mvnw clean package -DskipTests

# Uygulamayı başlat
CMD ["java", "-jar", "target/jewerlyProducts-0.0.1-SNAPSHOT.jar"] 