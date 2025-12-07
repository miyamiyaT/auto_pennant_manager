# ベースイメージを指定
FROM node:16

# 作業ディレクトリを設定
WORKDIR /app

# package.json と package-lock.json をコピー
COPY package.json package-lock.json ./

# 依存関係をインストール
RUN npm install

# アプリケーションのソースコードをコピー
COPY . .

EXPOSE 3002

# ポート番号を指定してアプリケーションを起動
CMD ["npm", "run", "dev"]
