# Eventfy
Proyecto de final de grado Eventfy.

Eventfy es una plataforma para crear mapas interactivos para eventos. El proyecto cuenta con un panel de administrador donde los admins podrán crear y administrar eventos, y para cada evento, diferentes actividades. Estas actividades aparecerán en el mapa para que los asistentes puedan orientarse de forma sencilla sin la necesidad de la confusión que generan los mapas físicos.

[Demo](https://eventfy-project.herokuapp.com/)

Manager: susana@hotmail.com | 123456
Admin: nacho@hotmail.com | 123456
User: maria@hotmail.com | 123456

## Installation

What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running.

    npm install
    
Hay que añadir las variables ENV para el backend:
- MONGO_URL
- JWT_SECRET
- JWT_LIFETIME

Además hay que añadir las ENV del frontend dentro de la carpeta ./client:
- REACT_APP_MAPS_API_KEY
