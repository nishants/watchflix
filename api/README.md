[![Build Status](https://travis-ci.org/nishants/node-playground.svg?branch=master)](https://travis-ci.org/nishants/node-playground)

TODO : 
- fix docker build
- update boilerplate form Ikgai
- update node to 11
- Use async for all controller functions
- Add elastic search
- Add redis
- Add kafka
- Add workers
- add full data to .gitignore 
- add jwt auth

# todo 
- use redis for session
- use worker for user preferences 

# DB Setup
### 1. Setup movies seed
```bash
yarn seed -- --movies=path/to/file.csv
```

### 2. Setup credits seed
```bash
yarn seed -- --credits=path/to/file.csv
```

### 3. Seed users
```
yarn seed -- --users=resources/user-preference.js
yarn seed -- --users=path/to/file.json
```

Running with docker
Run development server with docker
```bash
bash bin/development.sh
```

### Running withour docker :

```shell
# Setup db
docker run -p 27017:27017 "mongo:4.0.5"
export  MONGODB_URI="mongodb://localhost:27017/watchflix

# setup seed data
yarn seed -- --users=resources/user-preference.js
yarn seed -- --movies=resources/movie-data.csv
yarn seed -- --credits=resources/credits-data.csv

yarn start
```

- Load testing with Javascript : https://artillery.io/docs/basic-concepts/
- Hosted elastic search : https://bonsai.io/pricing
