---
title: Autenticación
description: Endpoints para registro, inicio de sesión y validación de tokens.
---

# Microservicio de Autenticación

Este servicio es la puerta de entrada a la plataforma. Su única responsabilidad es manejar la identidad y emitir los tokens necesarios para la comunicación entre microservicios y con las aplicaciones cliente.

---

### Endpoints
* **POST /register** - _Registrar usuario_
* **POST /login** - _Iniciar sesión_
* **GET /me** - _Validar token y obtener usuario actual_


---

## Registrar Usuarios

#### `POST` 

| Descripción | Crea un nuevo usuario (cliente o administrador).                          |
|:----------|:--------------------------------------------------------------------------|
| Autorización     | Pública (No requerida)                                                    |
| Rol por defecto     | Cliente                                                                   |

###  Request

```json
{
  "email": "prueba9@gmail.com",
  "password": "333",
  "role": "cliente"

}
```
### Response 
**Códigos de estado posibles:** 201, 400, 422.


`201 Created`

```json
{
  "id": 16,
  "email": "prueba9@gmail.com",
  "role": "cliente"
}
```


`400 Bad Request`
```json
{
  "detail": "Email ya registrado"
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
        73
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
---
    
## Iniciar Sesión
#### `POST`

| Descripción | Valida credenciales y emite un token JWT para acceso.                          |
|:----------|:-------------------------------------------------------------------------------|
| Autorización     | Pública (No requerida)                                                         |

### Request

```json
{
  "email": "prueba9@gmail.com",
  "password": "333"
}
```
### Response 
**Códigos de estado posibles:** 200, 401, 400.

`200 OK`
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwcnVlYmE5QGdtYWlsLmNvbSIsInJvbGUiOiJjbGllbnRlIn0.VeISE3k6g8sOD_0Jf6b_PfNqe6h113tfvpXADVvGfa4",
  "token_type": "bearer"
}
```
`401 Unauthorized`
```json
{
  "detail": "Credenciales incorrectas"
}
```
`400 Bad Request`
```json
{
  "detail": "Debe enviar 'email' y 'password'."
}
```

---
## Validar Token y Obtener Usuario Actual
#### `GET`

| Descripción | Verifica la validez del token JWT y devuelve la información del usuario asociado.                          |
|:----------|:-------------------------------------------------------------------------------|
| Autorización     | Requerida (Cualquier rol)                                                         |

### Request (Headers)
```
Authorization: <JWT_TOKEN>
```
### Response 
**Códigos de estado posibles:** 200, 401, 403.

`200 OK`

```json
{
  "id": 16,
  "email": "prueba9@gmail.com",
  "role": "cliente"
}
```
`401 Unauthorized`
```json
{
  "detail": "Token inválido"
}
```
`403 Forbidden`
```json
{
  "detail": "Not authenticated"
}
```