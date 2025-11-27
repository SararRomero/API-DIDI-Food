---
title: Usuarios
description: Documentación del microservicio de gestión de usuarios.
---

# Microservicio de Usuarios

Este servicio permite a los administradores gestionar la base de datos de usuarios.

**Nota de Seguridad:** Todos los endpoints de gestión ``(GET /users, PUT, DELETE)`` están restringidos al rol administrador.

---
### Endpoints
* **GET /users** -  _Listar usuarios (solo admin)_
* **POST/users** - _Crear usuario_
* **GET /users/{id}** - _Obtener usuario por ID_
* **PUT /users/{id}** - _Actualizar usuario_
* **DELETE /users/{id}** - _Eliminar usuario_
* **GET/me** - _Obtener información de usuario actual_
---

## Listar Usuarios
`GET`


| Descripción | Obtiene una lista de todos los usuarios registrados.                              |
|:----------|:----------------------------------------------------------------------------------|
| Autorización     | Requerida (Rol: Administrador)                                                    |

### Request (Headers)
```
Authorization: <JWT_TOKEN_ADMIN>
```
### Response
**Códigos de estado posibles:** 200, 401, 403, 500.

`200 OK`
```json
[
  {
    "id": 1,
    "email": "admin@didi.com",
    "role": "admin"
  },
  {
    "id": 2,
    "email": "Sarar@h.com",
    "role": "admin"
  },
  {
    "id": 3,
    "email": "Luisaa@g.com",
    "role": "admin"
  }
]
```
`401 Unauthorized`
```json
{
  "detail": "Token inválido o expirado"
}
```
`403 Forbidden`
```json
{
  "detail": "Not authenticated"
}
```
`500 Internal Server Error`
```json
{
  "detail": "Internal Server Error"
}
```

---
## Crear Usuario
`POST`

| Descripción | Crea un nuevo usuario como administrador. |
|:----------|:------------------------------------------|
| Autorización     | Requerida (Rol: Administrador)            |

### Request

```json
{
  "email": "luisametienecansada@gmail.com",
  "role": "cliente"
}
```

### Response
**Códigos de estado posibles:** 200, 400, 401, 403, 404, 500.

`200 OK`
```json
{
  "id": 18,
  "email": "luisametienecansada@gmail.com",
  "role": "cliente"
}
```
`400 Bad Request`
```json
{
  "detail": "El usuario ya existe"
}
```

`422 Unprocessable Content`
```json
{
  "detail": [
    {
      "type": "json_invalid",
      "loc": [
        "body",
        47
      ],
      "msg": "JSON decode error",
      "input": {},
      "ctx": {
        "error": "Expecting ',' delimiter"
      }
    }
  ]
}
```

`403 Forbidden`
```json
{
"detail": "Not authenticated"
}
```
`500 Internal Server Error`
```json
{
  "detail": "Internal Server Error"
}
```
---


## Obtener Usuario por ID
`GET`

| Descripción | Obtiene los detalles de un usuario específico por su ID.                              |
|:----------|:--------------------------------------------------------------------------------------|
| Autorización     | Requerida (Rol: Administrador)                                                        |

### Request

```json
{
  "user_id": 6
}
```

### Response
**Códigos de estado posibles:** 200, 401, 403, 404, 500.

`200 OK`
```json
{
  "id": 6,
  "email": "anna@nn.com",
  "role": "cliente"
}
```
`401 Unauthorized`
```json
{
  "detail": "Token inválido o expirado"
}
```

`403 Forbidden`
```json
{
  "detail": "Not authenticated"
}
```

`404 Not Found`
```json
{
  "detail": "Usuario no encontrado"
}
```
`500 Internal Server Error`
```json
{
  "detail": "Internal Server Error"
}
```
---

## Actualizar Usuario

`PUT`

| Descripción | Actualiza parcialmente la información de un usuario (ej. email o rol).                              |
|:----------|:--------------------------------------------------------------------------------------|
| Autorización     | Requerida (Rol: Administrador)                                                        |

### Request

```json
{
  "user_id": 14
}
```
### Response
**Códigos de estado posibles:** 200, 400, 401, 403, 404, 422, 500.

`200 OK`
```json
{
  "id": 14,
  "email": "funciona@gmail.com",
  "role": "cliente"
}
```

`400 Bad Request`
```json
{

}
```

`401 Unauthorized`
```json
{
  "detail": "Token inválido o expirado"
}
```

`403 Forbidden`
```json
{
  "detail": "Not authenticated"
}
```

`404 Not Found`
```json
{
  "detail": "Usuario no encontrado"
}
```
`422 Unprocessable Content`
```json
{
  "detail": [
    {
      "type": "json_invalid",
      "loc": [
        "body",
        53
      ],
      "msg": "JSON decode error",
      "input": {},
      "ctx": {
        "error": "Invalid control character at"
      }
    }
  ]
}
```
`500 Internal Server Error`
```json
{
  "detail": "Internal Server Error"
}
```
---

## Eliminar Usuario
`DELETE`

| Descripción | Elimina permanentemente a un usuario por su ID.                                      |
|:----------|:-------------------------------------------------------------------------------------|
| Autorización     | Requerida (Rol: Administrador)                                                       |

### Request

```json
{
  "user_id": 1
}
```

### Response
**Códigos de estado posibles:** 200, 401, 403, 404, 500.

`200 OK`
```json
{
  "message": "Usuario 'string' eliminado correctamente"
}
```
`401 Unauthorized`
```json
{
  "detail": "Token inválido o expirado"
}
```

`403 Forbidden`
```json
{
  "detail": "Not authenticated"
}
```

`404 Not Found`
```json
{
  "detail": "Usuario no encontrado"
}
```
`500 Internal Server Error`
```json
{
  "detail": "Internal Server Error"
}
```
--- 


## Obtener información de usuario actual
`GET`


| Descripción | Sirve para que el usuario con un token JWT válido pueda consultar quién es él mismo, sin tener que enviar su email o su ID directamente..        |
|:----------|:-------------------------------|
| Autorización     | Requerida (Rol: Administrador) |

### Request (Headers)
```
Authorization: <JWT_TOKEN_ADMIN>
```
### Response
**Códigos de estado posibles:** 200, 401, 403, 500.

`200 OK`
```json
{
  "email": "prueba10@gmail.com",
  "role": "admin",
  "id": "N/A (desde token JWT)"
}
```
`401 Unauthorized`
```json
{
  "detail": "Token inválido o expirado"
}
```
`403 Forbidden`
```json
{
  "detail": "Not authenticated"
}
```
`500 Internal Server Error`
```json
{
  "detail": "Internal Server Error"
}
```