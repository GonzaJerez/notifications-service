# NOTIFICATIONS SERVICE

#### Variables de entorno

- REDIS_REAL_TIME_CONNECTIONS= string de conexion a base de datos de conexiones de Redis
- API_WS_URL= url de la Api Gateway de Web Sockets para enviarle mensajes

#### Permisos

**Invocar API Gateway (web sockets)**

Crearle un permiso para que esta lambda pueda invocar Api Gateway de websockets para enviarle eventos a los clientes conectados.

Para esto tengo que entrar al rol de la lambda ("Configuration" -> "Execution role") y agregarle una politica.

Esta politica tiene que tener el permiso _execute-api:ManageConnections_ y apuntar al Api Gateway
