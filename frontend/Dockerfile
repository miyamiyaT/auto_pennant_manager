# ベースイメージを指定
FROM node:20-slim

# 作業ディレクトリを設定
WORKDIR /app

# package.json と package-lock.json をコピー
COPY package.json package-lock.json ./

# 再現性のため npm ci（ロックファイルに忠実）
RUN npm ci

# アプリケーションのソースコードをコピー
COPY . .

EXPOSE 3002

# ポート番号を指定してアプリケーションを起動
CMD ["npm", "run", "dev"]
