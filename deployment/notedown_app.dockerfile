# Serve all application parts using NGINX
FROM nginx:1.17.1-alpine
COPY ./deployment/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]