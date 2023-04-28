FROM wordpress
WORKDIR /var/www/html/
COPY wp-config.php ./
COPY wp-content ./wp-content
RUN chown -R www-data:www-data wp-content