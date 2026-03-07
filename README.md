# FinSight - Local Setup Guide

This project is a Real-time Quantitative Analysis & Market Intelligence Platform built with React, Tailwind CSS, and Google's Gemini AI.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [VS Code](https://code.visualstudio.com/)


## Project Structure

- `src/App.tsx`: Main dashboard UI and logic.
- `src/services/gemini.ts`: Integration with Google Gemini AI for market intelligence.
- `src/constants/mockData.ts`: Initial stock and news data.
- `src/index.css`: Custom Tailwind CSS themes and styles.

## Troubleshooting

- **API Key Errors**: Ensure your `.env` file is correctly named and contains a valid key.
- **Node Version**: If you encounter errors during `npm install`, check your Node version with `node -v`.
- **Port Conflict**: If port 3000 is in use, Vite will automatically try another port. Check the terminal output for the correct URL.
