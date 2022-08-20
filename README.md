# Open Fullstack Backend

Implementación de los ejercicios y ejemplos realizados durante el curso openfullstack 2022.

## URL App

Fronted: [emi-open-fullstack.herokuapp.com](https://emi-open-fullstack.herokuapp.com)

APIs Root Path: [emi-open-fullstack.herokuapp.com](https://emi-open-fullstack.herokuapp.com/api)

## API Routes

**Contacts:**

* [GET /api/contacts](#get-apicontacts)
* [GET /api/contacts/:id](#get-apiapicontactsid)
* [POST /api/contacts/:id](#post-apicontactsid)
* [DELETE /api/contacts/:id](#delete-apicontactsid)
* [PUT /api/contacts/:id](#put-apicontactsid)
* [PATCH /api/contacts/:id](#patch-apicontactsid)

**Notes:**

* [GET /api/notes](#get-apinotes)
* [GET /api/notes/:id](#get-apinotesid)
* [POST /api/notes/:id](#post-apinotesid)
* [DELETE /api/notes/:id](#delete-apinotesid)
* [PUT /api/notes/:id](#put-apinotesid)
* [PATCH /api/notes/:id](#patch-apinotesid)

**Blogs:**

* [GET /api/blogs](#get-apinotes)
* [GET /api/blogs/:id](#get-apinotesid)
* [POST /api/blogs/:id](#post-apinotesid)
* [DELETE /api/blogs/:id](#delete-apinotesid)
* [PUT /api/blogs/:id](#put-apinotesid)
* [PATCH /api/blogs/:id](#patch-apinotesid)

### GET /api/notes

Obtener todas las notas

#### Ejemplo

```javascrip
http://emi-open-fullstack.herokuapp.com/api/notes
```

#### Params

Ninguno

#### QueryParams

Ninguno

#### Request Body

Ninguno

#### Return

```javascript
[{"id":3,"content":"GET and POST are the most important methods of HTTP protocol","date":"2019-05-30T19:20:14.298Z","important":true,"delete":false},{"content":"Sacar pasta","date":"2022-06-18T05:52:37.167Z","important":false,"id":4},{"content":"Se ha terminado la boda ya no se puede cagar","date":"2022-06-18T06:30:57.264Z","important":true,"id":5},{"content":"pastel de carne","date":"2022-06-26T19:47:58.160Z","important":false,"id":6},{"content":"Esta es una tarea de prueba","date":"2022-06-27T14:45:11.555Z","important":false,"id":7,"delete":true},{"id":"54d80147-75c2-45a5-af6c-6c39974b017c","name":"Nueva Nueva Nota","date":"2022-07-04T21:11:40.635Z","important":false},{"id":"fa0508af-3167-4f51-8d58-18ad1bc64f67","name":"Nueva Nueva Nota","date":"2022-07-04T21:11:48.490Z","important":false}]
```

### GET /api/notes/:id

Obtener la nota cuyo :id corresponde

#### Ejemplo

```javascript
http://emi-open-fullstack.herokuapp.com/api/notes/3
```

#### Params

_:id_ Identificador de la nota.

#### QueryParams

Ninguno

#### Request Body

Ninguno

#### Return

```javascript
{"data":{"id":3,"content":"GET and POST are the most important methods of HTTP protocol","date":"2019-05-30T19:20:14.298Z","important":true,"delete":false}}
```

### POST /api/notes

Crear una nueva nota.

#### Ejemplo

```javascrip
http://emi-open-fullstack.herokuapp.com/api/notes
```

#### Params

```javascript
{}
```

#### QueryParams

Ninguno

#### Request Body

```javascript
{}
```

#### Return

```javascript
{}
```

### PUT /api/notes/:id

Crear una nueva nota.

#### Ejemplo

```javascrip
http://emi-open-fullstack.herokuapp.com/api/notes
```

#### Params

_id:_ Identificador de la nota.

#### QueryParams

Ninguno

#### Request Body

```javascript
{}
```

#### Return

```javascript
{}
```

### PATCH /api/notes/:id

Modificar una parte de una nota.

#### Ejemplo

```javascrip
http://emi-open-fullstack.herokuapp.com/api/notes
```

#### Params

_id:_ Identificador de la nota.

#### QueryParams

Ninguno

#### Request Body

```javascript
{}
```

#### Return

```javascript
{}
```

### DELETE /api/notes/:id

Borrar la nota cuyo :id es el indicado en el parametro.

#### Ejemplo

```javascrip
http://emi-open-fullstack.herokuapp.com/api/notes
```

#### Params

_id:_ Identificador de la nota.

#### QueryParams

Ninguno

#### Request Body

```javascript
{}
```

#### Return

```javascript
{}
```

### GET /api/contacts

Obtener todas las contacto

#### Ejemplo

```javascrip
http://emi-open-fullstack.herokuapp.com/api/notes
```

#### Params

Ninguno

#### QueryParams

Ninguno

#### Request Body

Ninguno

#### Return

```javascript
[{"id":3,"content":"GET and POST are the most important methods of HTTP protocol","date":"2019-05-30T19:20:14.298Z","important":true,"delete":false},{"content":"Sacar pasta","date":"2022-06-18T05:52:37.167Z","important":false,"id":4},{"content":"Se ha terminado la boda ya no se puede cagar","date":"2022-06-18T06:30:57.264Z","important":true,"id":5},{"content":"pastel de carne","date":"2022-06-26T19:47:58.160Z","important":false,"id":6},{"content":"Esta es una tarea de prueba","date":"2022-06-27T14:45:11.555Z","important":false,"id":7,"delete":true},{"id":"54d80147-75c2-45a5-af6c-6c39974b017c","name":"Nueva Nueva Nota","date":"2022-07-04T21:11:40.635Z","important":false},{"id":"fa0508af-3167-4f51-8d58-18ad1bc64f67","name":"Nueva Nueva Nota","date":"2022-07-04T21:11:48.490Z","important":false}]
```

### GET /api/contacts/:id

Obtener el contacto cuyo :id corresponde

#### Ejemplo

```javascript
http://emi-open-fullstack.herokuapp.com/api/notes/3
```

#### Params

_:id_ Identificador de la nota.

#### QueryParams

Ninguno

#### Request Body

Ninguno

#### Return

```javascript
{"data":{"id":3,"content":"GET and POST are the most important methods of HTTP protocol","date":"2019-05-30T19:20:14.298Z","important":true,"delete":false}}
```

### POST /api/contacts

Crear una nuevo contacto.

#### Ejemplo

```javascrip
http://emi-open-fullstack.herokuapp.com/api/notes
```

#### Params

```javascript
{}
```

#### QueryParams

Ninguno

#### Request Body

```javascript
{}
```

#### Return

```javascript
{}
```

### PUT /api/contacts/:id

Crear una nuevo contacto.

#### Ejemplo

```javascrip
http://emi-open-fullstack.herokuapp.com/api/notes
```

#### Params

_id:_ Identificador de la nota.

#### QueryParams

Ninguno

#### Request Body

```javascript
{}
```

#### Return

```javascript
{}
```

### PATCH /api/contacts/:id

Modificar una parte de un contacto.

#### Ejemplo

```javascrip
http://emi-open-fullstack.herokuapp.com/api/notes
```

#### Params

_id:_ Identificador de la nota.

#### QueryParams

Ninguno

#### Request Body

```javascript
{}
```

#### Return

```javascript
{}
```

### DELETE /api/contacts/:id

Borrar el contacto cuyo :id es el indicado en el parametro.

#### Ejemplo

```javascrip
http://emi-open-fullstack.herokuapp.com/api/contacts
```

#### Params

_id:_ Identificador de la nota.

#### QueryParams

Ninguno

#### Request Body

```javascript
{}
```

#### Return

```javascript
{}
```

## Heroku Cmd

| Command | Descripcion |
|---------|-------------|
| heroku logs -t | Ver el log de salida del servidor |

## Notes Windows

Si pruebas esta app en windows puede fallar porque le falta:

`npm install --save-dev cross-env`
