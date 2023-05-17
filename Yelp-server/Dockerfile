FROM public.ecr.aws/docker/library/node:18.16.0-alpine
WORKDIR /app
COPY package.json .

ARG NODE_ENV
RUN npm install
RUN npm install pg


COPY . ./
ENV PORT 3001
EXPOSE $PORT
CMD ["npm","run","dev"]