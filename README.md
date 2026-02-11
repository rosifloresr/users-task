# users-task
Aca voy a dejar una breve descripción de como esta estructurado el proyecto,
explicando un poco la funcionalidad de cada archivo, ya que este proyecto tiene fines educativos.

Separé la aplicación en módulos por dominio (User, Tasks, Auth) siguiendo la arquitectura modular de NestJS.
Utilicé entidades con TypeORM para modelar la persistencia, DTOs para definir contratos de entrada y ValidationPipe para garantizar integridad de datos.
El frontend en Next.js consume la API mediente fetch, implemenntando autenticación JWT y visualización de relaciones entre entidades.

*** Backend: NestJS + TypeORM ***
1) main.ys - Punto de entrada de la aplicación.
Para qué sirve? Es el archivo que arranca NestJS. Aqui configuramos cosas globales:
    * ValidationPipe -> valida DTOs
    * CORS -> permite que next.js consuma la API
    * Puerto del servidor.
Por qué es importante? Porque centraliza reglas globales:
    - Seguridad (validación)
    - Limpieza de datos
    - Comunicación con frontend
main.ts configura el boostrap de la app y las politicas globales de validación y comunicación.

2) app.module.ts - Módulo raíz.
Para qué sirve? Es el módulo principal que:
    * Configura typeORM (conexión a Postgres)
    * Registra modulos: Auth, Users, Task
    * Registra entidades: User, Task.
Por qué es importante? NestJS funciona por modulos. Este archivo es el "mapa"
de la aplicación.
app.module.ts define la arquitectura del backend y la conexión con la BD.

*** MODULO USER ***
3) user.entity.ts - Modelado de datos (Entidad)
Para qué sirve? Representa la tabla user en la BD.
Define: columnas (username, password) y relaciones (OneToMany con Task)
Por qué es importante? TypeORM usa entidades para mapear objetos <-> tablas
La entidad define el modelo persistente del dominio y sus relaciones.

4) create-user.dto.ts - DTO Data Transfer Object.
Para qué sirve? Define cómo se debe ser el input cuando se crea el usuario.
Ej.: username debe ser string, password mínimo 4 caracteres.
Por qué es importante? Separar ≠  (x) entidad ≠ input, (yes) DTO = contrato de la API.
Además: 
    - válida datos.
    - mejora seguridad.
    - evita que el cliente envié campos no permitidos.
Los DTOs definen el contrato de entrada de la API y permiten validación automática.

5) users.service.ts - Lógica de negocio.
Para qué sirve? Contiene la lógica de usuarios:
    * crear usuario
    * buscar por username
    * listar usuarios
Por qué es importante? Separar: 
    - controller -> recibe request
    - service -> lógica de negocio
    - repository -> base de datos
El servicio encapsula la lógica de dominio y evita que el controller tenga lógica de negocio.

6) user.controller.ts - API REST usuarios.
Para qué sirve? Define endpointd HTTP:
    * POST /users -> crear usuario
    * GET /users -> listar usuarios
Por qué es importante? Es la capa de exposición de la API.
El controller expone la funcionalidad del dominio mediante endpoints REST.

7) users.module.ts - Modulo de usuarios.
Para qué sirve? Agrupa todo lo relacionado a usuarios:
    * entidad
    * service
    * controller
y exporta UserService para AuthModule.
Para qué es importante? NestJS es modular -> cada dominio tiene su módulo.
El módulo garantiza el dominio de usuarios y permite reutilizar servicios entre módulos.

*** MODULO TASK ***
8) task.entity.ts - Entidad task.
Para qué sirve? Representa la tabla task, tiene relación ManyToOne con User.
Por qué es importante? Define el modelo de tareas y su relación con usuarios.
Modela la relación entre usuarios y tareas a nivel de base de datos.

9) create-task.dto.ts - DTO de task.
Para qué sirve? Valida el input al crear una tarea.
Por qué es importante? Evita datos inválidos o maliciosos.
Garantiza la integridad de los datos que ingresan por la API.

10) task.controller.ts - API de tareas.
Para que sirve? Endpoints protegidos.
    * GET /task
    * PORT /task
usa JWT guard.
Porque es importante? Aplica seguridad y expone la funcionalidad.
El controller protege los endpoints mediante guards delega la lógica al service.

11) task.service.ts - Lógica de negocio.
Para qué sirve? listar tareas, crear todas asociados a un usuario.
Por qué es importante? Centraliza lógica de negociode task.
El service implementa la lógica de dominio relacionada con tareas.

*** MODULO AUTH ***
12) auth.service.ts - Autenticación.
Para qué sirve? valida usuario, generea JWT.
Por qué es importante? Centraliza la lógica de autenticación.
Implementa el proceso de autenticación y generación de tokens JWT.

13) auth.controller.ts - Login endpoint.
Para qué sirve? Endpoint: POST /auth/login
Por qué es importante: Es el punto de entrada al login
Expone el mecanismo de autenticación via API REST. 

14) jwt.guard.ts - Protección de rutas.
Pará que sirve? Verifica el token JWT en cada request protegido.
Por qué es importante? Controla el acceso a endpoints.
Implementa autorización basada en JWT medisnte Guards de NestJS.

*** Frontend: Next.JS ***
El frontend : hace el login, guarda el token, consume API NestJS y muestra usuarios y tareas.

15) login/page.tsx - Página de login
Para qué sirve?: 
    * Formulario de login *
    * Llama a /auth/login 
    * Guarda JWT en localStorage.
Por qué es importante? Es el puente entre usuario y backend.
Implemente el flujo de autenticación desde el cliente.

16) users/page.tsx - Página de usuarios.
Para qué sirve? 
    * Consume GET /users 
    * Muestra usuarios y cantidad de tareas.
Por qué es importante? Demuestra consumo de API y relaciones.
Visualiza datos agregafos provenientes del backend.

17) tasks/page.tsx - Página de tareas.
Para qué sirve? 
    * Consume GET /task (con JWT)
    * crea tareas POST /tasks
    * Muestra usuario asociado
Por qué es importante? Demuestra:
    - Autenticación
    - CRUD
    - Relación User -> Task
Implementación interacción completa con la API protegida.