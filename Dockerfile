# 1. Brug officiel Node base image
FROM node:20

# 2. Sæt working directory i containeren
WORKDIR /app

# 3. Kopiér package.json og lock først for bedre cache ved build
COPY package*.json ./

# 4. Installer dependencies
RUN npm install

# 5. Kopiér resten af din backend kode
COPY . .

# 6. Eksponer porten som din backend lytter på (Apollo server = 4000)
EXPOSE 4000

# 7. Startkommando – brug din dev script (eller skift til prod hvis nødvendigt)
CMD ["npm", "run", "dev"]
