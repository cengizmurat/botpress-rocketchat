FROM node:8
# Папка приложения
ARG APP_DIR=/app
RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}

# Install dependencies
COPY package*.json ./
RUN npm install --production

# Copy Project files
COPY . .

CMD ["node", "index.js"]
