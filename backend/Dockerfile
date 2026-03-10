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
RUN mkdir -p src/main/resources/certificados

# Copiar JAR do estágio anterior
COPY --from=builder /app/target/*.jar app.jar

# Expor porta
EXPOSE 8080

# Variáveis de ambiente
ENV JAVA_OPTS="-Xmx512m -Xms256m"

# Comando de inicialização
CMD ["java", "-jar", "app.jar"]
