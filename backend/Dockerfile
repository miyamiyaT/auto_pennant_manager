FROM ruby:2.7.6
RUN apt-get update -qq 

# 必要なパッケージのインストール
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs

# 作業ディレクトリを設定
WORKDIR /myapp

# GemfileとGemfile.lockをコピー
COPY Gemfile /myapp/Gemfile
COPY Gemfile.lock /myapp/Gemfile.lock

# Bundlerをインストール
RUN gem install bundler:2.3.26 && bundle install

# アプリケーションのソースコードをコピー
COPY . /myapp

# ポートを指定
EXPOSE 3000

# サーバーを起動
CMD ["rails", "server", "-b", "0.0.0.0"]