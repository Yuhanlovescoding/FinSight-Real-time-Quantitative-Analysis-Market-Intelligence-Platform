# FinSight - Local Setup Guide

This project is a Real-time Quantitative Analysis & Market Intelligence Platform built with React, Tailwind CSS, and Google's Gemini AI.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [VS Code](https://code.visualstudio.com/)

## Getting Started

1. **Download and Extract**
   Download the project ZIP and extract it to a folder on your computer.

2. **Open in VS Code**
   Open VS Code, then go to `File > Open Folder...` and select the extracted project folder.

3. **Install Dependencies**
   Open the terminal in VS Code (`Ctrl + ` ` or `View > Terminal`) and run:
   ```bash
   npm install
   ```

4. **Configure Environment Variables**
   Create a file named `.env` in the root directory (same level as `package.json`) and add your Gemini API Key:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```
   *Note: You can get an API key for free at [aistudio.google.com](https://aistudio.google.com/).*

5. **Run the Application**
   In the VS Code terminal, start the development server:
   ```bash
   npm run dev
   ```

6. **View the App**
   The terminal will show a URL (usually `http://localhost:3000` or `http://localhost:5173`). Open this URL in your browser.

## Project Structure

- `src/App.tsx`: Main dashboard UI and logic.
- `src/services/gemini.ts`: Integration with Google Gemini AI for market intelligence.
- `src/constants/mockData.ts`: Initial stock and news data.
- `src/index.css`: Custom Tailwind CSS themes and styles.

## Troubleshooting

- **API Key Errors**: Ensure your `.env` file is correctly named and contains a valid key.
- **Node Version**: If you encounter errors during `npm install`, check your Node version with `node -v`.
- **Port Conflict**: If port 3000 is in use, Vite will automatically try another port. Check the terminal output for the correct URL.
