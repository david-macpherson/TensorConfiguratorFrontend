FROM timbru31/node-alpine-git:18 as builder

ADD ./dist/ /

FROM nginx:1.21.6

RUN mkdir www
WORKDIR /www

COPY --from=builder www ./

RUN rm /etc/nginx/nginx.conf
RUN ln -s /etc/nginx/sps/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80