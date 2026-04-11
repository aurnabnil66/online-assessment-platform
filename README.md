# AKIJ Resource - Online Test Platform

An online examination platform built with Next.js, Redux Toolkit, and Tailwind CSS. This application allows employers to create and manage online tests with various question types including MCQ, Checkbox, and Text-based questions.

## 🚀 Live Demo

[View Live Demo](https://online-assessment-platform-brown.vercel.app/)

## ✨ Features

- **Exam Management**: Create and manage online tests with basic information
- **Question Types**: Support for Multiple Choice (Radio), Checkbox, and Text questions
- **Rich Text Editor**: Format questions and answers with bold, italic, and lists
- **Dynamic Options**: Add/remove answer options dynamically
- **Redux Persist**: Data persistence using localStorage (no backend required)
- **Responsive Design**: Fully responsive UI built with Tailwind CSS
- **Stepped Progress**: Visual progress indicator for exam creation flow
- **Offline Support**: Automatic draft saving and recovery

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **State Management**: Redux Toolkit with Redux Persist
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Type Safety**: TypeScript
- **Data Persistence**: localStorage (via Redux Persist)

## 📦 Installation

### Prerequisites

- Node.js 18.x or higher
- npm or yarn or pnpm

### Steps

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/akij-resource.git
cd akij-resource
```

# Question Answers

## MCP Integration

I have not directly worked with MCP (Model Context Protocol) yet, but I see strong potential in this project.

A practical use case would be integrating:

- **Figma MCP** for converting design systems, components, spacing, and typography into frontend-ready UI structures
- **Supabase MCP** for syncing exam progress, autosave states, and session recovery data

This would reduce manual development effort, improve UI consistency, and speed up backend-connected workflows.

---

## AI Tools for Development

To speed up frontend development, I commonly use:

- **ChatGPT** → architecture planning, debugging, Redux/GraphQL patterns, and edge-case handling
- **GitHub Copilot** → boilerplate generation, React hooks, API calls, and repetitive component logic
- **Claude / Claude Code** → large codebase understanding and refactoring support

Recommended process:

- Use AI for **boilerplate, test cases, and refactoring**
- Keep **business logic, exam rules, and security-sensitive flows** under manual review

This improves development speed while maintaining code quality.

---

## Offline Mode

To handle internet loss during an exam:

- Autosave answers in **IndexedDB or localStorage**
- Save progress on every answer change
- Detect disconnects using browser **online/offline events**
- Keep the exam timer running locally
- Automatically sync saved answers when internet reconnects
- Restore the exact exam state after refresh or re-login

This ensures candidates never lose progress during connectivity issues.
