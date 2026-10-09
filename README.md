# Interview Practice Tracker

A personal interview preparation tracker that helps you organize your practice, track your progress, and stay consistent while preparing for technical interviews.

From DSA problems and technical interview questions to machine-coding challenges, it brings your preparation into one simple, organized dashboard.

---

## Features

- **Progress Dashboard** — Get an overview of your interview preparation, completed questions, and overall progress.
- **Question Management** — Add and organize practice questions with a title, category, type, difficulty, and status.
- **Search Questions** — Quickly find questions by their titles.
- **Status Tracking** — Track questions as Pending, In Progress, or Completed.
- **Categorization** — Organize questions across DSA, JavaScript, React, Backend, and HR.
- **Multiple Practice Types** — Track DSA problems, interview questions, and machine-coding challenges.
- **Persistent Storage** — Save questions in browser LocalStorage so your data remains available after refreshing the page.
- **Responsive Interface** — A responsive dashboard and modal designed for desktop and mobile screens.
- **Form Validation** — Validate question titles using React Hook Form.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | Component-based UI |
| Tailwind CSS | Responsive styling |
| React Hook Form | Form handling and validation |
| JavaScript (ES6+) | Application logic |
| LocalStorage | Client-side data persistence |
| Vite | Development server and build tooling |

## 📂 Project Structure

```text
interview-practice-tracker/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── StatCard.jsx
│   │   ├── QuestionCard.jsx
│   │   └── QuestionForm.jsx
│   ├── pages/
│   │   └── Dashboard.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── README.md
```


## Getting Started

### Prerequisites

- Node.js and npm installed on your system.
- Git installed to clone the repository.

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/Pratyush2312/interview-practice-tracker
```

**2. Navigate to the project directory**

```bash
cd interview-practice-tracker
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm run dev
```

**5. Open the application**

Visit the local URL displayed in your terminal, usually:

```text
http://localhost:5173
```

## How It Works

### 1. Add a Question

Use the Add Question button to open the form. Enter a title and select the category, practice type, difficulty, and status.

### 2. Organize Your Preparation

Assign each question a practice type:

- **DSA** — Data structures and algorithms.
- **Interview** — Technical and behavioral interview preparation.
- **Machine Coding** — Practical coding challenges.

Use categories to further organize your questions by subject.

### 3. Search and Filter

Search for questions by title and filter the list by status to focus on the questions that need attention.

### 4. Track Progress

The dashboard can summarize completed questions and calculate overall preparation progress based on tracked questions.

### 5. Keep Your Data

Uses browser LocalStorage to persist question data between sessions on the same browser.

