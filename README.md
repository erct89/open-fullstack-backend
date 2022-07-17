# Open Fullstack Backend

Implementación de los ejercicios y ejemplos realizados durante el curso openfullstack 2022.

## URL App

Fronted: [emi-open-fullstack.herokuapp.com](https://emi-open-fullstack.herokuapp.com)

APIs Root Path: [emi-open-fullstack.herokuapp.com](https://emi-open-fullstack.herokuapp.com/api)

## API Routes

**Contacts:**

* [GET /api/contacts](#apis-get-contacts)
* [GET /api/contacts/:id](#apis-get-contacts-id)
* [POST /api/contacts/:id](#apis-post-contacts-id)
* [DELETE /api/contacts/:id](#apis-delete-contacts-id)
* [PUT /api/contacts/:id](#apis-put-contacts-id)
* [PATCH /api/contacts/:id](#apis-patch-contacts-id)

**Notes:**

* [GET /api/notes](#apis-get-notes)
* [GET /api/notes/:id](#apis-get-notes-id)
* [POST /api/notes/:id](#apis-post-notes-id)
* [DELETE /api/notes/:id](#apis-delete-notes-id)
* [PUT /api/notes/:id](#apis-put-notes-id)
* [PATCH /api/notes/:id](#apis-patch-notes-id)

### GET /api/notes <a id="#apis-get-notes"></a>

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

### GET /api/notes/:id {#apis-get-notes-id}

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

### POST /api/notes {#apis-post-notes-id}

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

### PUT /api/notes/:id {#apis-put-notes-id}

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

### PATCH /api/notes/:id {#apis-patch-notes-id}

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

### DELETE /api/notes/:id {#apis-delete-notes-id}

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

## Heroku Cmd

| Command | Descripcion |
|---------|-------------|
| heroku logs -t | Ver el log de salida del servidor |
