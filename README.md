<div align="center">

# 🎓 BrillX - AI-Powered SaaS Learning Platform

### A Scalable, Cloud-Native Education Platform featuring an AI Mentor, RAG-based PDF Chatbot, and Adaptive Quizzes.

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Python](https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue)
![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)

</div>

---

## 📖 Overview
**BrillX** is a **Software-as-a-Service (SaaS)** learning platform designed to solve the "one-size-fits-all" problem in traditional education. Unlike standard LMS platforms, BrillX uses **Artificial Intelligence** to deliver personalized learning pathways, real-time mentorship, and intelligent document interaction.

The system utilizes a **hybrid backend architecture**: a **Node.js/Express** core for scalable application logic and a **Python/FastAPI** microservice for high-performance AI inference.

---

## 🚀 Key Features

### 🧠 1. Intelligent AI Mentor (Virtual Classroom)
* **Real-time Interaction:** A conversational AI agent that acts as a personal tutor.
* **Text-to-Speech (TTS):** Integrated **Kokoro TTS pipeline** (ONNX-based) to convert AI responses into lifelike speech with adjustable speed and voice settings.
* **Digital Whiteboard:** The AI can "draw" and "highlight" concepts on a virtual whiteboard to explain complex topics visually.

### 📄 2. RAG-Based PDF Chatbot
* **Document Intelligence:** Uses **Retrieval-Augmented Generation (RAG)** to allow students to "chat" with their textbooks and lecture notes.
* **Semantic Search:** Implements **SentenceTransformers (`all-MiniLM-L6-v2`)** to create vector embeddings of uploaded PDFs.
* **Precision:** Uses cosine similarity to retrieve specific paragraph chunks, reducing hallucinations and citing specific page numbers for every answer.

### 📊 3. Adaptive Quiz System
* **Dynamic Generation:** Leverages LLMs to generate custom quizzes (10-30 questions) on any topic instantly.
* **Performance Analysis:** Post-quiz algorithms analyze user mistakes and generate a personalized "Weakness Report" to guide future study.

### 🔐 4. Enterprise-Grade Security
* **Authentication:** Powered by **Clerk** for secure, token-based session management, OAuth (Google) login, and Role-Based Access Control (RBAC).
* **Data Integrity:** Mongoose schemas ensure structured data validation for users, courses, and assessment results.

---

## 🏗️ System Architecture

BrillX operates on a **decoupled architecture** to ensure scalability and separation of concerns:

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | HTML5, CSS3, JS | Component-based UI with responsive design and interactive dashboards. |
| **Core Backend** | **Node.js & Express** | Handles API routing, user management, course logic, and DB communication. |
| **AI Microservice** | **Python & FastAPI** | Asynchronous service for LLM inference, TTS processing, and RAG pipelines. |
| **Database** | **MongoDB** | NoSQL database for flexible storage of user profiles, logs, and unstructured PDF metadata. |
| **Auth** | **Clerk** | Manages identity, sessions, and security middleware. |

### 🔄 Data Flow (The "RAG" Pipeline)
1.  **Ingest:** User uploads a PDF via the Frontend.
2.  **Chunking:** The Python service segments text into paragraphs and sentences.
3.  **Embedding:** Text chunks are converted into vector embeddings using `SentenceTransformer`.
4.  **Retrieval:** When a student asks a question, the system performs a **Cosine Similarity Search** to find the most relevant chunks.
5.  **Generation:** The LLM generates an answer based *only* on those chunks to ensure accuracy.

---

## 🛠️ Installation & Setup

### Prerequisites
* Node.js (v18+)
* Python (v3.10+)
* MongoDB Atlas Account
* Clerk API Keys

### 1. Clone the Repository
```bash
git clone [https://github.com/Priyanshu2773/BrillX-Saas-Learning-Platform.git](https://github.com/Priyanshu2773/BrillX-Saas-Learning-Platform.git)
cd BrillX-Saas-Learning-Platform
