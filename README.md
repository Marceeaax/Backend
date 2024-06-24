# Sistemas de Reservas

Proyecto Backend Implementado en Node.js con Docker

# Integrantes:

- Marcelo Aguayo
- Amilcar Gimenez

## Descripción del Proyecto

Este proyecto es un backend de un sistema de reservacion que contempla la administracion de clientes, restaurantes, mesas, reservacionesetc, implementado en Node.js que se ejecuta dentro de un contenedor Docker.

El proyecto utiliza Node.js como lenguaje de programación y Express como framework web. Además, se utiliza Docker para empaquetar la aplicación y sus dependencias en un contenedor, lo que facilita la implementación y la portabilidad del proyecto.

## Requisitos Previos

Asegúrese de tener instalados los siguientes componentes antes de levantar el proyecto:

- Docker: [https://www.docker.com/](https://www.docker.com/)

## Instrucciones de Uso

Siga los pasos a continuación para levantar el proyecto en su entorno local:

1. Clone el repositorio del proyecto:
   - git clone git@github.com:LuisAlbertoCB/BackEnd-Reserva.git
2. Navegue hasta el directorio del proyecto:
    - cd BackEnd-Reserva
3. Para construir y ejecutar el proyecto, ejecute el siguiente comando:
    - docker-compose up
4. El proyecto se ejecutará en el puerto 9090, por lo que puede acceder a él en la siguiente URL:
    - http://localhost:9090

Para acceder a la base de datos postgres, se debe colocar los siguientes comandos

docker ps

Luego debes ver cual es el contenedor que corresponde a la imagen del postgres, en este caso seria

docker exec -it backend-reserva-main-postgresdb-1 bash

Luego debes ingresar al CLI de PostgreSQL

su - postgres
psql -d bdpwb

Ver todas las tablas
Para listar todas las tablas en la base de datos, puedes usar el comando:

sql
Copier le code
\dt
Ver el esquema de una tabla
Para ver el esquema de una tabla específica, usa el comando \d seguido del nombre de la tabla. Por ejemplo, para ver el esquema de la tabla Reservacions, usa:

sql
Copier le code
\d "Reservacions"
Consultar datos de una tabla
Para consultar datos de una tabla, usa el comando SELECT. Por ejemplo, para ver todas las reservaciones, usa:

sql
Copier le code
SELECT * FROM "Reservacions";
Salir de la CLI de PostgreSQL
Para salir de la CLI de PostgreSQL, simplemente escribe:

sql
Copier le code
\q


Se utilizara Axios para popular la base de datos
Colocar node popularbase.js

DEPURAR BASE DE DATOS

-- reset.sql

ALTER TABLE "Reservacions" DISABLE TRIGGER ALL;
ALTER TABLE "Mesas" DISABLE TRIGGER ALL;
ALTER TABLE "Clientes" DISABLE TRIGGER ALL;
ALTER TABLE "Restaurantes" DISABLE TRIGGER ALL;

TRUNCATE TABLE "Reservacions" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "Mesas" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "Clientes" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "Restaurantes" RESTART IDENTITY CASCADE;

ALTER TABLE "Reservacions" ENABLE TRIGGER ALL;
ALTER TABLE "Mesas" ENABLE TRIGGER ALL;
ALTER TABLE "Clientes" ENABLE TRIGGER ALL;
ALTER TABLE "Restaurantes" ENABLE TRIGGER ALL;
