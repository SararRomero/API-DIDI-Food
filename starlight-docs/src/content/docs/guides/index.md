---
title:  Guía Rápida para Integradores
description: Pasos esenciales para autenticarse y realizar el primer pedido en Didi Food
---

Esta guía está diseñada para partners o integradores externos que necesitan consumir la API de Didi Food, cubriendo el flujo completo desde la autenticación hasta la creación de un pedido.

### 1. Autenticación (Obtener el Token JWT)

El primer paso es obtener un token de acceso (JWT) para poder interactuar con los microservicios protegidos.

#### Endpoint de Login

| Método | Endpoint | Descripción |
|:-------|:----------- |:--------|
| POST   | /auth/login | Inicia sesión y genera el token de acceso |

### Request
```json
{
  "email": "cliente@ejemplo.com",
  "password": "contraseña_segura"
}
```
### Response (200 OK):
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

**Guardar el Token:** El valor de `access_token` debe guardarse y utilizarse en el encabezado de todas las solicitudes subsiguientes que lo requieran.

### 2. Consumo de Endpoints Protegidos
Para consumir cualquier endpoint que requiera autenticación (la mayoría de ellos), debes incluir el token JWT en el **encabezado Authorization**.

#### Encabezado de la solicitud (Header):
```
Authorization: Bearer <access_token>
```

Reemplaza `<access_token>` con el token que obtuviste en el paso 1.

### 3. Flujo Completo: Login → Productos → Crear Pedido
Este es un ejemplo de un flujo típico para un cliente.

#### Paso A: Listar Productos Disponibles
Se consulta el catálogo para que el cliente seleccione qué pedir.

| Método  | Endpoint  | Autorización |
|:--------|:----------|:--------|
| `GET`   | /products | Opcional/Cliente |

**Ejemplo de Solicitud:**

```
GET /products HTTP/1.1
Host: api.didifood.com
Authorization: Bearer <token_del_cliente>
```
**Ejemplo de Respuesta (200 OK):**
```json
[
  { "id": 1, "nombre": "Pizza Hawaiana", "precio": 25000, "descripcion": "Clásica con piña" },
  { "id": 2, "nombre": "Hamburguesa Doble", "precio": 18000, "descripcion": "Carne x2" }
]
```

#### Paso B: Crear un Pedido
El cliente decide comprar 2 unidades del Producto con `id: 1`. El servicio de Pedidos consultará internamente al servicio de Productos para obtener el nombre, precio y descripción en ese momento y guardará una copia de esos datos.

| Método   | Endpoint | Autorización |
|:---------|:---------|:--------|
| `POST`   | /orders  | Requerida (Cliente) |

**Ejemplo de Solicitud (JSON Body):**

```json
{
  "producto_id": 1,
  "cantidad": 2
}
```
**Ejemplo de Respuesta (Status 201 Created):**
```json
{
  "id": 101,
  "producto": "Pizza Hawaiana",
  "precio": 25000,
  "cantidad": 2,
  "total": 50000,
  "estado": "pendiente"
}
```
### Códigos de Estado Comunes

| Código                      | Significado              | Descripción                                                                                               |
|:----------------------------|:-------------------------|:----------------------------------------------------------------------------------------------------------|
| `200 OK`                    | Éxito                    | La solicitud ha tenido éxito.                                                                             |
| `201 Created`               | Creación exitosa         | Se creó un nuevo recurso.                                                                                 |
| `400 Bad Request`           | Petición inválida        | Error en los datos enviados (ej. JSON mal formado, campos faltantes).                                     |
| `401 Unauthorized`          | No autorizado            | Falta el token JWT o es inválido/expirado.                                                                |
| `403 Forbidden`             | Prohibido                | El usuario tiene token, pero no tiene el rol necesario (ej. Cliente intenta eliminar un Producto).        |
| `404 Not Found`             | No encontrado            | El recurso solicitado no existe.                                                                          |
| `422 Unprocessable Content` | Contenido no procesable  | El servidor entendió la solicitud pero no pudo procesarla debido a un problema semántico en el contenido. |
| `500 Internal Server Error` | Error del servidor       | Algo salió mal en el backend.                                                                             |