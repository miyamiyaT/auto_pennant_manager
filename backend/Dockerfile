FROM ruby:3.2.7-bullseye

# 必要なパッケージのインストール
RUN apt-get update -qq && \
    apt-get install -y \
      build-essential \
      libpq-dev \
      nodejs \
      npm \
      git \
    && rm -rf /var/lib/apt/lists/*
# 作業ディレクトリを設定
WORKDIR /myapp

# GemfileとGemfile.lockをコピー
COPY Gemfile Gemfile.lock ./

# Bundlerをインストール
RUN gem update --system && \
    gem install bundler && \
    bundle install

# アプリケーションのソースコードをコピー
COPY . /myapp

# ポートを指定
EXPOSE 3000

# サーバーを起動
CMD ["rails", "server", "-b", "0.0.0.0"]