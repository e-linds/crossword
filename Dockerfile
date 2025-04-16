# Use an official Python runtime as the base image
FROM python:3.9-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install system dependencies
RUN apt-get update && apt-get install -y \
    nginx \
    nodejs \
    npm \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
RUN pip install --no-cache-dir flask sqlalchemy psycopg2-binary

# Create directory structure
WORKDIR /app

# Copy application files
COPY . .

# Install Vite dependencies
RUN npm install -g vite @vitejs/plugin-react

# Build React app
# RUN vite build client/src/App.jsx

# Configure Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Expose ports
EXPOSE 8000 3000

# Run Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "app:app"]
