# Dockerfile
FROM node:14
WORKDIR /app
COPY . .
RUN echo "console.log('Hello, World!')" > index.js
CMD ["node", "index.js"]

