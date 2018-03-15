[![Build Status](https://travis-ci.org/nishants/node-playground.svg?branch=master)](https://travis-ci.org/nishants/node-playground)

# DB Setup
### 1. Setup movies seed
```bash
yarn seed -- --movies=path/to/file.csv'
```

### 2. Setup credits seed
```bash
yarn seed -- --credits=path/to/file.csv'
```

### 3. Seed users
```
yarn seed -- --users=path/to/file.json'
```

Running with docker
Run development server with docker
```bash
bash bin/development.sh
```

Running withour docker :
  - Set the mongo db uri
  ``` export  MONGODB_URI="mongodb://localhost:27017/watchflix" ```
