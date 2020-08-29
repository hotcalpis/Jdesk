FROM ruby:2.6.5

ENV DB_HOST db
WORKDIR /myapp/server

RUN apt-get update -qq && \
    apt-get install -y build-essential libpq-dev nodejs --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

RUN gem install bundler
COPY Gemfile /myapp/server/Gemfile
COPY Gemfile.lock /myapp/server/Gemfile.lock

RUN \
  echo 'gem: --no-document' >> ~/.gemrc && \
  cp ~/.gemrc /etc/gemrc && \
  chmod ugo+r /etc/gemrc && \
  bundle config --global jobs 4 && \
	bundle config set without 'production' && \
  bundle install && \
  rm -rf ~/.gem

COPY . /myapp/server
