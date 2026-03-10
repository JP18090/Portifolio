# Estágio 1: Build
FROM maven:3.9-eclipse-temurin-17 AS builder

WORKDIR /app

# Copiar arquivos de dependências
COPY pom.xml .

# Download de dependências
RUN mvn dependency:go-offline -B

# Copiar código-fonte
COPY src ./src

# Build da aplicação
RUN mvn clean package -DskipTests

# Estágio 2: Runtime
FROM eclipse-temurin:17-jre-jammy

WORKDIR /app

# Criar diretório para certificados
RUN mkdir -p /app/certificados

# Copiar JAR do estágio anterior
COPY --from=builder /app/target/*.jar app.jar

# Copiar certificados para o container
COPY src/main/resources/certificados/ /app/certificados/

# Render usa a variável PORT
ENV JAVA_OPTS="-Xmx512m -Xms256m"
ENV SPRING_PROFILES_ACTIVE=render

# Expor porta (Render define PORT dinamicamente)
EXPOSE 8080

# Comando de inicialização
CMD ["sh", "-c", "java $JAVA_OPTS -jar app.jar --server.port=${PORT:-8080}"]
