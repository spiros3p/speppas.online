FROM nginx:latest

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./docs/* /usr/share/nginx/html/

EXPOSE 80
