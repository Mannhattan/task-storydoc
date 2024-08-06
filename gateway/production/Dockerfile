FROM nginx:1.25.3-alpine

RUN rm /etc/nginx/nginx.conf
RUN rm /etc/nginx/conf.d/*

COPY ./* /etc/nginx/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]