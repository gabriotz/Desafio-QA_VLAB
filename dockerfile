FROM cypress/browsers:node-22.14.0-chrome-133.0.6943.126-1-ff-135.0.1-edge-133.0.3065.82-1

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npx cypress verify

ENTRYPOINT ["tail", "-f", "/dev/null"]