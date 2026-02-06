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

**BrillX** is a **Software-as-a-Service (SaaS)** learning platform designed to solve the "one-size-fits-all" problem in traditional education.  
Unlike standard LMS platforms, BrillX uses **Artificial Intelligence** to deliver personalized learning pathways, real-time mentorship, and intelligent document interaction.

The system follows a **hybrid backend architecture**:
- **Node.js/Express** for scalable core application logic
- **Python/FastAPI** microservice for high-performance AI inference and RAG pipelines

---

## 🚀 Key Features

### 🧠 1. Intelligent AI Mentor (Virtual Classroom)
- **Real-time Interaction:** A conversational AI agent that acts as a personal tutor.
- **Text-to-Speech (TTS):** Integrated **Kokoro TTS pipeline** (ONNX-based) to convert AI responses into lifelike speech.
- **Digital Whiteboard:** The AI can "draw" and highlight concepts on a virtual whiteboard for visual learning.

### 📄 2. RAG-Based PDF Chatbot
- **Document Intelligence:** Retrieval-Augmented Generation (RAG) for textbook/notes interaction.
- **Semantic Search:** Uses `SentenceTransformer (all-MiniLM-L6-v2)` embeddings.
- **Precision:** Cosine similarity retrieval reduces hallucinations and improves answer accuracy.

### 📊 3. Adaptive Quiz System
- **Dynamic Generation:** Instantly generates 10–30 question quizzes for any topic.
- **Performance Analysis:** Detects weak areas and produces a personalized **Weakness Report**.

### 🔐 4. Enterprise-Grade Security
- **Authentication:** Powered by **Clerk** (OAuth, sessions, RBAC).
- **Data Integrity:** Strong validation using Mongoose schemas.

---

## 🧰 Tech Stack

| Layer | Technology |
|------|------------|
| Frontend | Vite + React (UI Dashboard) |
| Backend | Node.js + Express |
| AI Service | Python + FastAPI |
| Database | MongoDB Atlas |
| Auth | Clerk |
| AI/NLP | SentenceTransformers + Torch |
| RAG | Chunking + Embeddings + Similarity Search |

---

## 🏗️ System Architecture

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React + Vite | Responsive UI, dashboards, chatbot & mentor interface. |
| **Core Backend** | Node.js + Express | APIs, user management, courses, quiz logic, DB operations. |
| **AI Microservice** | Python + FastAPI | RAG pipelines, embeddings, LLM inference, AI mentor engine. |
| **Database** | MongoDB | Stores users, progress, quizzes, and PDF metadata. |
| **Auth** | Clerk | Identity, sessions, OAuth login, RBAC middleware. |

### 🔄 Data Flow (RAG Pipeline)
1. User uploads a PDF from the frontend
2. Python service chunks the PDF text
3. Chunks are embedded using SentenceTransformers
4. Similarity search retrieves best chunks for the query
5. LLM generates answers grounded in retrieved chunks

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)
- MongoDB Atlas Account
- Clerk API Keys

### 1. Clone the Repository
```bash
git clone https://github.com/Priyanshu2773/BrillX-Saas-Learning-Platform.git
cd BrillX-Saas-Learning-Platform
```
### 2. Backend Setup (Node.js)
```Bash
cd backend

Create a .env file in the /backend folder:

PORT=5000
DATABASE_URL=your_mongodb_connection_string
CLERK_SECRET_KEY=your_clerk_secret_key
JWT_SECRET=your_jwt_secret
Run the server:

npm run server
```
 
### 3. Frontend Setup
```Bash
cd frontend
npm install

Create a .env file in the /frontend folder:

VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
Run the client:

npm run dev
```
### 4. AI Service Setup (Python) 
- Navigate to the AI service directory
```Bash
pip install fastapi uvicorn sentence-transformers torch

- Start the FastAPI server:
uvicorn main:app --reload  
```
### 📸 Screenshots

<table>
  <tr>
    <td align="center"><b>Dashboard</b></td>
    <td align="center"><b>AI Mentor</b></td>
  </tr>
  <tr>
    <td>
      <img src="https://github.com/user-attachments/assets/YOUR_DASHBOARD_IMAGE_LINK" width="400">
      <br><i>Real-time progress tracking</i>
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/YOUR_MENTOR_IMAGE_LINK" width="400">
      <br><i>Interactive AI Tutor with Whiteboard</i>
    </td>
  </tr>

  <tr>
    <td align="center"><b>PDF Chatbot</b></td>
    <td align="center"><b>Quiz Analysis</b></td>
  </tr>
  <tr>
    <td>
      <img src="https://github.com/user-attachments/assets/YOUR_CHATBOT_IMAGE_LINK" width="400">
      <br><i>RAG-based document interaction</i>
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/YOUR_QUIZ_IMAGE_LINK" width="400">
      <br><i>Automated weakness detection</i>
    </td>
  </tr>
</table>


### 👥 Contributors

- **Ishan Srivastav** – *Backend Lead & Researcher* (Node.js, API Architecture)  
- **Priyanshu Kumar Singh** – *Frontend & QA* (UI/UX, Integration)  
- **Aditya Jaswal** – *AI Engineer & DBA* (ML Models, MongoDB)  

---

Developed as a **Capstone Project** for **Bachelor of Engineering in Computer Science (Big Data Analytics)** at **Chandigarh University**.
