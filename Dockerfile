# Usar una imagen base de Node.js
FROM node:14

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . .

# Instalar nodemon globalmente
RUN npm install -g nodemon

# Exponer el puerto de la aplicación
EXPOSE 9090

# Comando para iniciar la aplicación
CMD ["npm", "run", "dev"]
