FROM php:7.3-fpm

WORKDIR /application

ARG DEBIAN_FRONTEND=noninteractive

RUN usermod -u 1000 www-data; \
    groupmod -g 1000 www-data

RUN set -eux; \
    apt-get update ; \
    apt-get install -y zip git ; \
    curl -sS https://getcomposer.org/installer | php ; \
    mv composer.phar /usr/local/bin/composer ; \
    docker-php-ext-install pdo pdo_mysql

RUN set -eux; \
    chown -R www-data:www-data .; \
    mkdir /var/www/.composer ; \
    mkdir /var/www/.composer/cache ; \
    mkdir /var/www/.composer/cache/files; \
    mkdir /var/www/.composer/cache/repo; \
    mkdir /var/www/.composer/cache/repo/https---repo.packagist.org; \
    chown -R www-data:www-data /var/www/.composer; \
    sync