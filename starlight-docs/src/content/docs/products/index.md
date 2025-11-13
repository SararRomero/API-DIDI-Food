---
title: Servicios de Productos
description: Documentación del microservicio encargado de la gestión de productos en DidiFood
---

# Microservicio de Productos

Este microservicio maneja toda la lógica relacionada con los productos del sistema.

---
### Endpoints
* **GET /products** - _Listar productos_
* **POST /products** - _Crear producto_
* **PUT /products/{id}** - _Actualizar producto_
* **DELETE /products/{id}** - _Eliminar producto_
---
## Listar Productos
```
Nota: para usar este endpoint no se necesita autenticación JWT 
```
`GET`

| Descripción | Lista todos los productos disponibles en el catálogo.                                            |
|:----------|:-------------------------------------------------------------------------------------------------|
| Autorización     | Opcional (Accesible por Clientes y partners)                                                     |

### Request(Sin body o parámetros de consulta)

### Response
**Códigos de estado posibles:** 200, 500.

`200 OK`
```json
[
  {
    "id": 1,
    "nombre": "Pepsi",
    "precio": 3000,
    "descripcion": "bebida con gas, no la tomes :)"
  },
  {
    "id": 3,
    "nombre": "Salchipapa",
    "precio": 60000,
    "descripcion": "Mas papa que salchicha y una cantidad de maiz"
  },
  {
    "id": 4,
    "nombre": "Salchichon",
    "precio": 6000,
    "descripcion": "jamón o embutido "
  },
  {
    "id": 5,
    "nombre": "Agua",
    "precio": 2000,
    "descripcion": "Bebida"
  }
]
```

`500 Internal Server Error`
```json
{
  "detail": "Internal Server Error"
}
```

---

## Crear Producto
`POST`

| Descripción | Agrega un nuevo producto al catálogo. |
|:----------|:--------------------------------------|
| Autorización     | Requerida (Rol: Administrador)        |

### Request
```json
{
  "nombre": "chocolatina",
  "descripcion": "chocolate falso",
  "precio": 2000
}
```
### Response
**Códigos de estado posibles:** 201, 401, 403, 500.

`201 Created`
```json
{
  "nombre": "chocolatina",
  "descripcion": "chocolate falso",
  "id": 7,
  "precio": 2000
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
---

## Actualizar Producto
`PUT`

| Descripción | Modifica la información de un producto existente por su ID. |
|:----------|:------------------------------------------------------------|
| Autorización     | Requerida (Rol: Administrador)                              |

### Request
```json
{
  "nombre": "chocolatina jet",
  "descripcion": "es azul y trae un stiker",
  "precio": 2500
}
```
### Response
**Códigos de estado posibles:** 200, 401, 403, 404, 500.

`200 OK`
```json
{
  "nombre": "chocolatina jet",
  "descripcion": "es azul y trae un stiker",
  "id": 7,
  "precio": 2500
}
```
`400 Bad Request`
```json
{
  "detail": "Es necesario llenar todos los datos del producto"
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
  "detail": "Producto no encontrado"
}
```
`500 Internal Server Error`
```json
{
  "detail": "Internal Server Error"
}
```
---

## Eliminar Producto
`DELETE`

| Descripción | Elimina un producto del catálogo por su ID. |
|:----------|:------------------------------------------------------------|
| Autorización     | Requerida (Rol: Administrador)                              |

###  Request

```json
{
  "product_id": 4
}
```

### Response
**Códigos de estado posibles:** 200, 401, 403, 404, 500.

`200 OK`
```json
{
  "message": "Producto 'Salchichon' eliminado correctamente"
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
  "detail": "Producto no encontrado"
}
```
`500 Internal Server Error`
```json
{
  "detail": "Internal Server Error"
}
```