# 🎯 Aplicativo de Portfólio Full-Stack

Um aplicativo web moderno e completo para exibir seu portifolio. Desenvolvido com **React**, **Spring Boot** e **Banco de Dados H2**.

## 🚀 Início Rápido (30 segundos!)

### Usuários do Windows:
Basta clicar duas vezes em: **`start.bat`**

### Usuários de Mac/Linux:
```bash
chmod +x start.sh
./start.sh
```

Em seguida, abra: **http://localhost:3000**

---

## 📖 Documentação

- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Instalação detalhada e solução de problemas
- **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** - Organização e arquitetura de arquivos
- **[backend/README.md](backend/README.md)** - Documentação da API do backend
- **[frontend/README.md](frontend/README.md)** - Guia de desenvolvimento do frontend

---

## ✨ Funcionalidades

- ✅ **Interface de usuário bonita**: Design responsivo com fundos gradientes e animações suaves
- ✅ **Gerenciamento de projetos**: Adicione, edite, visualize e exclua projetos
- ✅ **Sincronização em tempo real**: O frontend se comunica perfeitamente com o backend
- ✅ **Tecnologia moderna**: Versões mais recentes do React, Spring Boot 3.2 e Java 17
- ✅ **Banco de dados**: Banco de dados H2 em memória com opções de persistência
- ✅ **API REST**: API RESTful completa com suporte a CORS
- ✅ **Painel de administração**: Console H2 para gerenciamento do banco de dados

## 🏗️ Arquitetura

```
┌─────────────────────┐
│   React Frontend    │ (Port 3000)
│   (Vite + Axios)    │
└──────────┬──────────┘
           │ HTTP/REST
           ▼
┌─────────────────────┐
│  Spring Boot API    │ (Port 8080)
│  (REST Controller)  │
└──────────┬──────────┘
           │ JPA
           ▼
┌─────────────────────┐
│   H2 Database       │
│ (In-Memory/File)    │
└─────────────────────┘
```


## 📂 Estrutura do Projeto

```
Portfólio/
├── backend/ # Aplicação Spring Boot
│ ├── src/
│ │ ├── main/java/com/portfolio/
│ │ │ ├── controller/ # Controladores REST
│ │ │ ├── model/ # Entidades de dados
│ │ │ ├── repository/ # Camada de acesso a dados
│ │ │ ├── service/ # Lógica de negócios
│ │ │ └── PortfolioApplication.java
│ │ └── resources/
│ │ └── application.properties # Configuração
│ ├── pom.xml # Dependências do Maven
│ └── README.md # Documentação do backend
│
├── frontend/ # Aplicativo React
│ ├── src/
│ │ ├── App.jsx # Componente principal
│ │ ├── api.js # Cliente da API
│ │ ├── index.css # Estilos globais
│ │ └── main.jsx # Entrada React
│ ├── index.html # Modelo HTML
│ ├── package.json # Dependências NPM
│ ├── vite.config.js # Configuração do Vite
│ └── README.md # Frontend Documentação
│
└── README.md # Este arquivo
```

## Pré-requisitos

### Requer instalação prévia:
- **Java 17 ou superior** - [Baixe da Oracle](https://www.oracle.com/java/technologies/downloads/#java17) ou [OpenJDK](https://openjdk.org/)
- **Node.js 16+** - [Baixe de nodejs.org](https://nodejs.org/)

### Opcional (o Maven baixa automaticamente via wrapper):
- Maven 3.6+ (será baixado automaticamente na primeira compilação)

## 🚀 Início Rápido

### Verificação de Pré-requisitos
Verifique as instalações:
```bash
java --version # Deve mostrar Java 17+
node --version # Deve mostrar v16+
npm --version # Deve mostrar 8+
```

### 1️⃣ Iniciar o Backend

```bash
cd backend
mvn spring-boot:run
```
✅ A API será executada em `http://localhost:8080/api`

### 2️⃣ Iniciar o Frontend

```bash
cd frontend
npm install
npm run dev
```
✅ O aplicativo será executado em `http://localhost:3000`

### 3️⃣ Abrir no Navegador
```
http://localhost:3000
```

## 📡 Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/projects` | Obter todos os projetos |
| GET | `/api/projects/{id}` | Obter projeto por ID |
| POST | `/api/projects` | Criar novo projeto |
| PUT | `/api/projects/{id}` | Atualizar projeto |
| DELETE | `/api/projects/{id}` | Excluir projeto |

## 💾 Console do Banco de Dados H2

Acesse em: `http://localhost:8080/api/h2-console`
- **URL JDBC**: `jdbc:h2:mem:portfoliodb`
- **Nome de usuário**: `sa`
- **Senha**: (vazia)

## 🔧 Configuração

### Backend (`application.properties`)
```properties
server.port=8080
spring.datasource.url=jdbc:h2:mem:portfoliodb
spring.jpa.hibernate.ddl-auto=create-drop
```

### Frontend (vite.config.js)
```javascript
proxy: {

'/api': {

target: 'http://localhost:8080',

changeOrigin: true

}
}
```

## 📦 Tecnologias Utilizadas

### Frontend
- **React** 18.2 - Framework de UI
- **Vite** 5.0 - Ferramenta de build
- **Axios** - Cliente HTTP
- **CSS3** - Estilização

### Backend
- **Spring Boot** 3.2 - Framework
- **Spring Data JPA** - ORM
- **H2** - Banco de dados
- **Lombok** - Redução de boilerplate
- **Maven** - Ferramenta de build

## 🎨 Demonstração de Recursos

### Adicionar Projeto
Preencha o formulário com:
- Título do projeto
- Descrição
- URL da imagem
-Tecnologias utilizadas
- Links para o repositório e demonstração ao vivo

### Visualizar Projetos
Navegue por todos os projetos em um layout de grade responsivo com:
- Imagem do projeto
- Descrição
- Tags de tecnologia
- Links para o repositório e demonstração ao vivo

### Excluir Projeto
Remova os projetos que você não deseja mais exibir

## 📝 Projeto de Exemplo

```json
{
"title": "Plataforma de E-commerce",

"description": "E-commerce full-stack com integração de pagamento",

"imageUrl": "https://example.com/ecommerce.jpg",

"repositoryUrl": "https://github.com/yourname/ecommerce",

"deployedUrl": "https://ecommerce-demo.com",

"technologies": "React, Spring Boot, PostgreSQL, Stripe"
}
```

## 🚀 Versão de Produção

### Backend
```bash
cd backend
mvn clean package
java -jar target/portfolio-api-1.0.0.jar
```

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

## 🔐 Configuração CORS

O backend permite requisições do frontend:
```java
@CrossOrigin(origins = "http://localhost:3000")
```

Modifique em `ProjectController.java` para URLs diferentes.

## 📚 Documentação

- **Backend**: Consulte [backend/README.md](backend/README.md)
- **Frontend**: Consulte [frontend/README.md](frontend/README.md)

## 🐛 Solução de problemas

### O backend não inicia
- Certifique-se de que o Java 17+ esteja instalado: `java -version`
- Verifique se a porta 8080 está disponível
- Execute `mvn clean install`

### O frontend não inicia
- Exclua `node_modules/` e execute `npm install`
- Certifique-se de que o Node.js 16+ esteja instalado
- Verifique se a porta 3000 está disponível

### As chamadas à API falham
- Certifique-se de que o backend esteja em execução em `http://localhost:8080`
- Verifique o console do navegador em busca de erros de CORS
- Verifique a configuração do proxy em `vite.config.js`

## 🎓 Recursos de Aprendizagem

- [Documentação do Spring Boot](https://spring.io/projects/spring-boot)
- [Documentação do React](https://react.dev)
- [Banco de Dados H2](https://www.h2database.com)
- [Guia do Vite](https://vitejs.dev/guide/)
---

**Criado com ❤️ para desenvolvedores que desejam mostrar seu trabalho**
