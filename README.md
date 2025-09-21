# "smart-contract-aggregator" 


This is a backend API built with NestJS and MongoDB for a content aggregator service. It implements the core requirements and Stretch Goal B: AI-Powered Summary Generation (using a mocked OpenAI integration to avoid costs and a real OpenAI API key for production).

## Technical Choices
- **Framework**: NestJS - Chosen for its modular structure, dependency injection, and built-in support for TypeScript, which promotes clean, maintainable code.
- **Database**: MongoDB with Mongoose - A NoSQL database suitable for flexible schemas like articles and user interests. Mongoose provides schema validation and easy integration with NestJS.
- **AI Integration**: OpenAI (mocked) - For generating article summaries. In development, a mock API is used to simulate integration and avoid costs, while in production, a real OpenAI API key is utilized for authentic summary generation.
- **Other Libraries**: Class-validator and class-transformer for DTO validation; Reflect-metadata for NestJS decorators.
- **Why NoSQL**: Flexible for handling varying article content and user interests without rigid schemas.
- **Stretch Goal**: Option B - AI-Powered Summary Generation. If summary is null/empty in POST /articles, a mock AI function generates a basic summary by extracting the first few sentences (simulating an abstractive summary). In production, this would call OpenAI's GPT model.

## Setup Instructions
1. **Prerequisites**:
   - Node.js (v18+)
   - MongoDB (local or cloud, e.g., MongoDB Atlas)
   - Yarn or npm

2. **Installation**:
   ```bash
   yarn  # or npm install

3. Environment Variables:
   Create a .env file in the root:   
  # Application port
  PORT=3000

  # MongoDB connection URI (replace with your MongoDB connection string, e.g., local or MongoDB Atlas)
  MONGODB_URI=mongodb://localhost:27017/content-aggregator

 # OpenAI API key (required for production; leave empty or comment out for development to use mock)
 # OPENAI_API_KEY=your-openai-api-key-here

 # Enable mock OpenAI API for development (set to false in production with a real API key)
 MOCK_OPENAI=true

 # Environment (set to 'development' for local testing, 'production' for deployment)
 NODE_ENV=development

4. Run the Application:
   bash 
   yarn start:dev  # or npm run start:dev for development mode
   The API will run on http://localhost:3000.
  
  
5. Testing:
   Use tools like Postman or curl to test endpoints.

   Example: POST /articles with body { "title": "Test", "content": "Long content here", "author": "Me" } (summary will be auto-generated if missing).



    API Endpoints

    POST /articles: Create article. Body: { title: string, content: string, author: string, summary?: string }. If summary is missing, auto-generate (mocked).
    GET /articles?limit=10&offset=0: Paginated articles.
    GET /articles/:id: Get article by ID.
    POST /users: Create user. Body: { username: string, interests?: string[] }.
    POST /interactions: Record interaction. Body: { user_id: string, article_id: string, interaction_type: string }.

    Approach to Stretch Goal B

    In the ArticlesService, when creating an article, check if summary is falsy. If so, call a generateSummary method.
    generateSummary simulates OpenAI by extracting key sentences (first 100 words or so). In real code, it would use openai.chat.completions.create with a prompt like "Summarize this article: [content]".
    Mocked to avoid API calls/costs, as per task instructions. 

    What I Would Do Next

    Add unit/integration tests using Jest.
    Implement authentication (e.g., JWT) for users.
    Improve error handling with global exception filters.
    Add rate limiting and caching for scalability.
    Containerize with Docker for deployment.
    Expand AI to use real endpoints with API keys securely managed.   