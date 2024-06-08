FROM node:20.14.0
# nodemon pozwala na zaktualizowanie; rerun serwer po zmianie
RUN npm install -g nodemon        

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8080

CMD [ "npm", "run", "dev" ]