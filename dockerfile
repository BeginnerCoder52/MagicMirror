# Dùng image NodeJS
FROM node:20-bullseye

# Tạo thư mục làm việc trong container
WORKDIR /opt/magic_mirror

# Cài các gói cần thiết cho MagicMirror
RUN apt-get update && apt-get install -y \
    build-essential \
    libx11-dev \
    libxext-dev \
    libxrender-dev \
    libxtst-dev \
    libxi-dev \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Copy toàn bộ source từ thư mục hiện tại (local) vào container
COPY . .

# Cài module nodejs
RUN npm install

# Lắng nghe cổng 8080 (mặc định của MagicMirror)
EXPOSE 8080

# Chạy app
CMD ["npm", "start"]
