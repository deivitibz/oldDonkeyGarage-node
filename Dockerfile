FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

ENV PORT=3000

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
EXPOSE 3000
# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "node", "./bin/www" ]
