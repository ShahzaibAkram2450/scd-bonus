FROM httpd:2.4
COPY apache-reverse-proxy.conf /usr/local/apache2/conf/extra/
RUN echo "Include conf/extra/apache-reverse-proxy.conf" >> /usr/local/apache2/conf/httpd.conf
RUN a2enmod proxy
RUN a2enmod proxy_http
EXPOSE 80
