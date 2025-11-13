---
title: Microservicio de Pedidos
description: Documentación del microservicio encargado de la gestión de pedidos en DidiFood.
---

# Microservicio de Pedidos

Este microservicio se encarga de gestionar el ciclo completo de los pedidos realizados por los usuarios, desde su creación hasta la entrega. Es fundamental su regla de negocio: al crear un pedido, copia la información actual del producto.

### Regla de Negocio

El endpoint `POST /orders` realiza una solicitud interna (HTTP con JWT) al Microservicio de Productos para obtener el nombre, precio y descripcion del producto_id antes de guardar el pedido en su base de datos local.

---

### Endpoints
* **GET /orders** - _Listar pedidos del usuario autenticado_
* **POST /orders** - _Crear pedido (copia datos del producto)_
* **GET /orders/{id}** - _Ver detalle del pedido_

---

## Listar Pedidos del Usuario
`GET`

| Descripción | Lista todos los pedidos creados por el usuario autenticado. |
|:----------|:--------------------------------------------------|
| Autorización     | Requerida (Rol: Cliente)                          |

### Request (Headers)
```
Authorization: <JWT_TOKEN_CLIENTE>
```
### Response
**Códigos de estado posibles:** 200, 403, 500.

`200 OK`
```json
{
    "user_email": "prueba10@gmail.com",
    "producto_nombre": "helado",
    "producto_descripcion": "bomba de azucar que te da una diabetes intensa",
    "total": 12000,
    "id": 3,
    "producto_precio": 3000,
    "cantidad": 4
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


## Crear Pedido
`POST`

| Descripción | Crea un nuevo pedido para el usuario autenticado. |
|:----------|:--------------------------------------------------|
| Autorización     | Requerida (Rol: Cliente)                          |

### Request
```json
{
  "producto_id": 6,
  "cantidad": 4
}
```
### Response (Muestra los datos del producto copiados)
**Códigos de estado posibles:** 201, 401, 404, 422, 500.

`201 Created`
```json
{
  "user_email": "prueba10@gmail.com",
  "producto_nombre": "helado",
  "producto_descripcion": "bomba de azucar que te da una diabetes intensa",
  "total": 12000,
  "id": 3,
  "producto_precio": 3000,
  "cantidad": 4
}
```

`401 Unauthorized`
```json
{
  "detail": "Token inválido o expirado"
}
```
`404 Not Found`
```json
{
  "detail": "Producto no encontrado"
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
        23
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
`500 Internal Server Error`
```json
{
  "detail": "Internal Server Error"
}
```

---
## Ver Detalle del Pedido
`GET`

| Descripción | Obtiene el detalle de un pedido específico del usuario autenticado. |
|:----------|:--------------------------------------------------|
| Autorización     | Requerida (Rol: Cliente)                          |

### Request
```json
{
  "order_id": 6
}
```
### Response
**Códigos de estado posibles:** 200, 401, 404, 500.

`200 OK`
```json
{
  "user_email": "prueba10@gmail.com",
  "producto_nombre": "Salchipapa",
  "producto_descripcion": "Mas papa que salchicha y una cantidad de maiz",
  "total": 6000000,
  "id": 4,
  "producto_precio": 60000,
  "cantidad": 100
}
```

`401 Unauthorized`
```json
{
  "detail": "Token inválido o expirado"
}
```

`404 Not Found`
```json
{
  "detail": "Pedido no encontrado"
}
```
`500 Internal Server Error`
```json
{
  "detail": "Internal Server Error"
}
```