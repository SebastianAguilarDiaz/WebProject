# ScholarFind — Especificación técnica: autenticación, usuarios y votos por usuario

**Estado:** Fase 1 completada
**Última actualización:** 2026-10-22
**Stack:** Node.js + Express 5 + EJS + MongoDB/Mongoose + express-session
**Alcance:** cuentas de usuario, sesiones, contribuciones autenticadas, votos por usuario y estadísticas dinámicas.

---

## 1. Objetivo

Incorporar cuentas de usuario a ScholarFind para que:

- Cada oportunidad registre quién la creó (`createdBy`).
- Solo los usuarios autenticados puedan contribuir y votar.
- Cada usuario tenga un único voto por oportunidad, con posibilidad de cambiarlo.
- El perfil y las estadísticas se calculen a partir de datos reales.
- La autenticación se base en sesiones de servidor con cookie, sin JWT, sin API REST y sin JavaScript en el cliente.
- Las vistas EJS actuales se mantengan y sigan renderizando en el servidor.
- La interfaz use formularios `POST` y redirecciones, igual que el resto del proyecto.

Este documento es la especificación oficial del sistema y la fuente de verdad para continuar el trabajo. Describe la arquitectura objetivo, el estado de cada paquete de implementación, los modelos, los flujos, los criterios de aceptación y las convenciones del proyecto.

---

## 2. Principios de diseño

| Tema | Decisión |
|---|---|
| Autenticación | Sesión de servidor con `express-session` y cookie firmada |
| Persistencia de sesión | `MemoryStore` (memoria del proceso); las sesiones se pierden al reiniciar el servidor |
| Transporte | Cookie `sid` manejada automáticamente por el navegador |
| Almacenamiento en el cliente | Únicamente la cookie de sesión; nunca contraseñas ni tokens |
| Hash de contraseñas | `bcryptjs` con 10 rondas |
| Duración de la sesión | 24 horas (`maxAge`) |
| Comunicación | Formularios HTML `POST` + redirecciones del servidor |
| Renderizado | EJS en el servidor; sin `fetch`, sin JSON, sin `localStorage` |
| Protección de páginas | Middleware `requireLogin` en el servidor |
| Voto por usuario | Un documento `Vote` por usuario y oportunidad, con índice único |
| Cambio de voto | Permitido mediante un nuevo `POST`, sin crear otro documento |
| Estado visual del voto | Decidido por el servidor al renderizar la vista |
| Trust score del perfil | Promedio de `trustScore` de las oportunidades creadas con votos |
| Rango de verificador | `min(5, 1 + floor(votesCast / 10))` |
| Leaderboard de Verify | Estático por ahora; dinámico en Fase 3 |
| Saved Opportunities y Recent Activity | Estáticos por ahora |
| `location` en `User` | No se incluye |
| `createdBy` | Opcional hasta la limpieza de base de datos (Fase 2) |
| Estado al crear | Siempre `Pending`, sin importar lo que envíe el cliente |

### 2.1 Por qué sesiones y no JWT

La autenticación por sesión mantiene el modelo mental del proyecto: formularios que envían datos, un servidor que decide y una redirección. El servidor guarda el identificador del usuario en la sesión y lo consulta en cada petición.

Consecuencias directas:

- No existe un token que transportar ni que almacenar en el navegador.
- No existe el encabezado `Authorization`.
- Las páginas protegidas se resuelven en el servidor antes de renderizar, no con comprobaciones de JavaScript.
- La aplicación no necesita una API REST ni respuestas JSON.
- El estado visual de los votos se conoce en el servidor y se refleja directamente en EJS.

---

## 3. Estado de implementación

La Fase 1 se divide en siete paquetes. Cada paquete es un cambio coherente que deja la aplicación en un estado funcional y verificable.

| Paquete | Contenido | Estado |
|---|---|---|
| **P0** | Fundación: dependencias, `SESSION_SECRET`, middleware de sesión, `requireLogin`, router de autenticación, `PLAN.md` | Completado |
| **P1** | Modelos: `User`, `Vote` y `createdBy` en `Opportunity` | Completado |
| **P2** | Autenticación: registro, login, logout y vistas `login` y `register` | Completado |
| **P3** | Contribución autenticada: `POST /contribute` con `createdBy` y sincronización de `createdOpportunities` | Completado |
| **P4** | Votos por usuario: voto único cambiable, regla de 100 y borrado en cascada | Completado |
| **P5** | Perfil y estadísticas: `MyProfile` dinámico y estadísticas de `Verify` | Completado |
| **P6** | Cierre: limpieza de base de datos, pruebas completas y registro en bitácoras | Completado |

### 3.1 Dependencias entre paquetes

```
P0 (fundación)
 └─> P1 (modelos)
      └─> P2 (autenticación)
           ├─> P3 (contribución)
           └─> P4 (votos)
                └─> P5 (perfil y estadísticas)
                     └─> P6 (cierre)
```

P3 y P4 pueden desarrollarse en paralelo una vez completado P2. P5 requiere P4 porque las estadísticas dependen de `votesCast` y de los votos registrados. P6 requiere que todos los anteriores estén completos.

---

## 4. Stack y estructura del proyecto

### 4.1 Stack

- **Backend:** Node.js, Express 5, ES Modules (`"type": "module"`).
- **Vistas:** EJS en `views/`, fuera de `routes/`.
- **Base de datos:** MongoDB Atlas con Mongoose.
- **Sesiones:** `express-session`.
- **Contraseñas:** `bcryptjs`.
- **Estáticos:** `public/css`, `public/js`, `public/images`, cada uno con su propio `express.static`.

### 4.2 Estructura de carpetas

```
server.js
config/
  db.js
models/
  Opportunity.js
  User.js              (nuevo, P1)
  Vote.js              (nuevo, P1)
services/
  opportunity-service.js
  auth-service.js      (nuevo, P2)
  vote-service.js      (nuevo, P4)
  user-service.js      (nuevo, P5)
src/
  middleware/
    parseExploreFilters.js
    parseOpportunity.js
    requireLogin.js    (nuevo, P0)
  routes/
    principalRoutes.js
    opportunityRoutes.js
    authRoutes.js      (nuevo, P0)
views/
  index.ejs
  explore.ejs
  verify.ejs
  contribute.ejs
  opportunity.ejs
  myProfile.ejs
  login.ejs            (nuevo, P2)
  register.ejs         (nuevo, P2)
  about.ejs
  404.ejs
public/
  css/
  js/
  images/
PLAN.md
DEV_LOG.md
PROMPT_LOG.md
```

### 4.3 Scripts

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

Servidor local en `http://localhost:3000`.

---

## 5. Estado funcional previo a la Fase 1

Las siguientes capacidades ya existen y deben conservarse:

- **Home (`/`):** muestra las 3 oportunidades `Verified` con más votos totales (`validVotes + invalidVotes`) mediante una agregación de Mongo.
- **Explore (`/explore`):** filtros por área, nivel, tipo y búsqueda por texto.
- **Verify (`/verify`):** cola de oportunidades `Pending`.
- **Contribute (`/contribute`):** formulario de creación de oportunidades.
- **Opportunity (`/opportunity/:id`):** detalle de una oportunidad.
- **MyProfile (`/myProfile`):** página de perfil, actualmente estática.
- **About (`/about`):** página informativa.

Sistema de votos previo:

- Los votos son anónimos y solo actualizan contadores globales (`validVotes`, `invalidVotes`, `trustScore`, `status`).
- Regla de 100 votos: con 100 o más votos totales, una oportunidad con menos de 70% de votos válidos se elimina; con 70% o más pasa a `Verified`.
- Los votos sobre oportunidades `Verified` también cuentan y pueden provocar su eliminación.
- Si `imageUrl` está vacío, se genera un avatar con UI Avatars.
- La sección "Community Verification Trends" fue eliminada de Explore.

---

## 6. Arquitectura

### 6.1 Capas

```
server.js
├── session middleware (express-session)
├── /        → authRoutes.js          (login, registro, logout)
├── /        → principalRoutes.js     (páginas GET)
├── /        → opportunityRoutes.js   (acciones POST de oportunidades y votos)
└── 404 handler
```

- **Modelos:** `User`, `Vote`, `Opportunity`.
- **Servicios:** `auth-service.js`, `vote-service.js`, `user-service.js`, `opportunity-service.js`.
- **Middleware:** `requireLogin.js`, además de los existentes `parseOpportunity.js` y `parseExploreFilters.js`.
- **Rutas:** `authRoutes.js`, `principalRoutes.js`, `opportunityRoutes.js`.

### 6.2 Flujo general

1. El visitante abre `/login` o `/register`.
2. Envía el formulario por `POST`.
3. El servidor valida, verifica la contraseña con bcrypt y guarda `req.session.userId`.
4. El servidor redirige a la página de origen (`redirect`) o a `/myProfile`.
5. En cada petición posterior, el middleware de sesión reconstruye `req.session`.
6. `requireLogin` bloquea las páginas y acciones que exigen sesión.
7. Las vistas se renderizan con los datos del usuario y de la base de datos.

### 6.3 Protección de páginas

| Ruta | Protección |
|---|---|
| `/` | Pública |
| `/explore` | Pública |
| `/about` | Pública |
| `/verify` | Pública para ver; votar requiere sesión |
| `/opportunity/:id` | Pública para ver; votar requiere sesión |
| `/contribute` | Requiere sesión (`requireLogin`) |
| `/myProfile` | Requiere sesión (`requireLogin`) |
| `/login` | Pública; con sesión activa redirige a `/myProfile` |
| `/register` | Pública; con sesión activa redirige a `/myProfile` |

---

## 7. Modelos de datos

### 7.1 `User`

```js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    passwordHash: { type: String, required: true },
    votesCast: { type: Number, min: 0 },
    createdOpportunities: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Opportunity" }
    ]
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
```

Reglas:

- Sin `location`.
- Sin valores `default` en el esquema.
- En el registro se crea explícitamente con `votesCast: 0`.
- `createdOpportunities` se actualiza con `$addToSet` y se depura con `$pull`.
- `passwordHash` nunca se envía a la vista ni a una respuesta.

### 7.2 `Vote`

```js
import mongoose from "mongoose";

const VoteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    opportunity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Opportunity",
      required: true
    },
    value: {
      type: String,
      enum: ["valid", "invalid"],
      required: true
    }
  },
  { timestamps: true }
);

VoteSchema.index({ user: 1, opportunity: 1 }, { unique: true });

export const Vote = mongoose.model("Vote", VoteSchema);
```

El índice único garantiza un solo voto por usuario y oportunidad. Cambiar el voto actualiza el documento existente.

### 7.3 `Opportunity`

Se agrega el campo del creador y un índice para las consultas de estadísticas:

```js
createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
```

```js
OpportunitySchema.index({ createdBy: 1 });
```

`createdBy` permanece opcional hasta la limpieza de base de datos (Fase 2), para tolerar documentos antiguos. Es la fuente de verdad de "oportunidades creadas por el usuario"; `createdOpportunities` en `User` es una copia desnormalizada de conveniencia.

### 7.4 Sincronización entre `User` y `Opportunity`

Al crear una oportunidad:

```js
const opportunity = await Opportunity.create({
  ...data,
  createdBy: userId,
  status: "Pending"
});

await User.updateOne(
  { _id: userId },
  { $addToSet: { createdOpportunities: opportunity._id } }
);
```

Al eliminar una oportunidad por rechazo:

```js
if (opportunity.createdBy) {
  await User.updateOne(
    { _id: opportunity.createdBy },
    { $pull: { createdOpportunities: opportunity._id } }
  );
}
```

Si hay inconsistencias, `createdBy` manda. La limpieza de la Fase 2 reconstruye `createdOpportunities`.

### 7.5 `votesCast`

| Acción | `votesCast` |
|---|---|
| Primer voto del usuario | `+1` |
| Votar lo mismo otra vez | Sin cambio |
| Cambiar de válido a inválido (o viceversa) | Sin cambio |
| Se elimina la oportunidad y con ella el voto | `-1` por cada usuario afectado |

El contador se mantiene sincronizado con los documentos `Vote` existentes.

---

## 8. Autenticación y sesiones

### 8.1 Configuración del servidor

```js
import session from "express-session";

loadEnvFile();

app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 }
}));
```

Notas:

- `loadEnvFile()` debe ejecutarse antes de crear el middleware de sesión.
- `cookie.httpOnly` impide que JavaScript lea la cookie.
- No se usa `secure` porque el desarrollo es sobre HTTP local.
- `saveUninitialized: false` evita crear sesiones para visitantes anónimos.
- `MemoryStore` emite una advertencia en consola; es aceptable en desarrollo.
- La variable `SESSION_SECRET` se genera con `crypto.randomBytes(48).toString("base64url")` y vive en `.env`.

### 8.2 Contraseñas

- Se almacenan únicamente como hash con `bcryptjs` y 10 rondas.
- Nunca se muestran, registran ni almacenan en el navegador.
- El registro exige una contraseña de al menos 6 caracteres.

### 8.3 Registro

Ruta: `POST /register`

Entrada: `name`, `email`, `password`, `confirmPassword`.

Validaciones:

- `name` obligatorio, con `trim`.
- `email` obligatorio, único y normalizado a minúsculas.
- `password` de al menos 6 caracteres.
- `password` y `confirmPassword` deben coincidir.

Al validar:

1. Se comprueba si el correo ya existe; si existe, se vuelve a renderizar `register` con un mensaje.
2. Se genera el hash con bcrypt.
3. Se crea el usuario con `votesCast: 0`.
4. Se guarda `req.session.userId`.
5. Se redirige al destino de `redirect` o a `/myProfile`.

### 8.4 Login

Ruta: `POST /login`

Entrada: `email`, `password`.

Al validar:

1. Se busca el usuario por correo normalizado.
2. Se compara la contraseña con `bcrypt.compare`.
3. Si el correo no existe o la contraseña no coincide, se renderiza `login` con un mensaje genérico.
4. Si coincide, se guarda `req.session.userId`.
5. Se redirige al destino de `redirect` o a `/myProfile`.

El mensaje de error es genérico: no revela si el correo existe.

### 8.5 Logout

Ruta: `POST /logout`

```js
req.session.destroy(() => {
  res.redirect("/");
});
```

Como no hay JWT ni token en el cliente, destruir la sesión es suficiente.

### 8.6 Protección de rutas

`src/middleware/requireLogin.js`:

```js
export const requireLogin = (req, res, next) => {
  if (!req.session.userId) {
    // Para acciones de formulario, returnTo apunta a la página dueña del formulario.
    const target = (req.body && req.body.returnTo) || req.originalUrl;
    return res.redirect(`/login?redirect=${encodeURIComponent(target)}`);
  }
  next();
};
```

Se aplica a `/myProfile`, `/contribute` y a la acción de voto. En las acciones de voto, `returnTo` evita redirigir al usuario, tras el login, a una URL que solo acepta `POST`.

### 8.7 Redirecciones seguras

El parámetro `redirect` solo acepta rutas internas:

```js
export const safeRedirect = (target, fallback = "/myProfile") => {
  if (!target || !target.startsWith("/") || target.startsWith("//")) {
    return fallback;
  }
  return target;
};
```

Esto impide redirecciones a dominios externos.

---

## 9. Rutas y vistas

### 9.1 Rutas

| Método | Ruta | Protección | Acción |
|---|---|---|---|
| GET | `/login` | Pública | Renderiza el formulario de login |
| POST | `/login` | Pública | Valida credenciales y crea la sesión |
| GET | `/register` | Pública | Renderiza el formulario de registro |
| POST | `/register` | Pública | Crea la cuenta y la sesión |
| POST | `/logout` | Sesión | Destruye la sesión |
| GET | `/myProfile` | `requireLogin` | Renderiza el perfil con estadísticas |
| GET | `/contribute` | `requireLogin` | Renderiza el formulario de creación |
| POST | `/contribute` | `requireLogin` | Crea la oportunidad con `createdBy` |
| GET | `/verify` | Pública | Renderiza la cola y las estadísticas del usuario |
| GET | `/opportunity/:id` | Pública | Renderiza el detalle y el voto del usuario |
| POST | `/opportunity/:id/vote` | `requireLogin` | Registra o cambia el voto |
| GET | `/` | Pública | Home con destacadas |
| GET | `/explore` | Pública | Listado con filtros |
| GET | `/about` | Pública | Página informativa |

### 9.2 `views/login.ejs`

- Formulario de login con campos `email` y `password`.
- Enlace al formulario de registro.
- Mensaje de error opcional.
- Un usuario con sesión activa es redirigido a `/myProfile`.

### 9.3 `views/register.ejs`

- Campos `name`, `email`, `password` y `confirmPassword`.
- Enlace al formulario de login.
- Mensajes de error de validación.

### 9.4 `views/myProfile.ejs`

Se eliminan los datos fijos y se renderizan desde el servidor:

- Nombre y correo del usuario.
- Oportunidades compartidas y verificadas.
- Trust score (texto y barra de progreso).
- Rango de verificador.
- Formulario `POST /logout`.
- "Saved Opportunities" y "Recent Activity" permanecen estáticos.

### 9.5 `views/contribute.ejs`

- El formulario conserva su marcado y sus valores de menú desplegable.
- El `POST /contribute` exige sesión y asigna el autor en el servidor.
- El estado se fuerza a `Pending`.

### 9.6 `views/verify.ejs`

- La cola de oportunidades `Pending` se mantiene.
- Las estadísticas del verificador se renderizan desde el servidor.
- Cada tarjeta recibe el voto del usuario (`myVotes`) para marcar el botón correspondiente.
- El leaderboard de 5 posiciones permanece estático.

### 9.7 `views/opportunity.ejs`

- La barra de trust se renderiza con el valor actual.
- Los botones de voto reflejan el voto del usuario.

### 9.8 Estado visual de los botones

El servidor decide qué botón está activo. Ejemplo:

```ejs
<% if (myVote === 'valid') { %>
    <button type="button" disabled class="btn btn-success btn-vote is-selected">Vote: Valid</button>
<% } else { %>
    <button type="submit" name="vote" value="valid" class="btn btn-success btn-vote">Vote: Valid</button>
<% } %>
```

El botón seleccionado se deshabilita; el contrario permanece habilitado para permitir el cambio.

Estilos:

```css
.btn-vote:disabled {
  opacity: 1;
}
.btn-vote.is-selected {
  filter: brightness(0.85);
  box-shadow: inset 0 0 0 2px #fff;
}
```

---

## 10. Servicios

### 10.1 `services/auth-service.js`

- `registerUser({ name, email, password })`: valida, comprueba duplicados, genera el hash y crea el usuario.
- `loginUser(email, password)`: busca el usuario y compara la contraseña.
- `safeRedirect(target, fallback)`: valida destinos de redirección.
- Nunca devuelve `passwordHash`.

### 10.2 `services/opportunity-service.js`

- `createOpportunity(data)`: crea una oportunidad con `createdBy` y `status: "Pending"`.
- `findOpportunity(id)`, `findOpportunities(filter)`, `findFeaturedOpportunities()`.
- `buildOpportunityFilter(filters)`.
- La creación aplica lista blanca de campos; no acepta `req.body` completo.

### 10.3 `services/vote-service.js`

- `castVote(userId, opportunityId, value)`: crea, conserva o cambia el voto.
- Recalcula `trustScore`.
- Aplica la regla de 100 votos.
- Ejecuta el borrado en cascada cuando corresponde.

### 10.4 `services/user-service.js`

- `getUserStats(userId)`: oportunidades compartidas, verificadas, trust score promedio, `votesCast`, rango y conteos de votos válidos e inválidos.
- `getUserById(userId)`: datos públicos del usuario (nombre, correo y `votesCast`), sin `passwordHash`.
- `getMyVotes(userId, opportunityIds)`: mapa de votos del usuario para una lista de oportunidades.

---

## 11. Votos

### 11.1 Reglas

- Un voto por usuario y oportunidad.
- El voto puede cambiarse; el documento `Vote` se actualiza, no se duplica.
- El creador puede votar su propia oportunidad.
- Se puede votar sobre oportunidades `Verified`; sus votos también cuentan.
- Un valor distinto de `valid` o `invalid` se rechaza.

### 11.2 Flujo de `POST /opportunity/:id/vote`

1. `requireLogin` exige sesión.
2. Se valida el valor del voto.
3. Se busca la oportunidad; si no existe, se renderiza `404`.
4. Se busca el voto existente del usuario para esa oportunidad.
   - Sin voto previo: se crea, se incrementa el contador correspondiente y `votesCast` aumenta en 1.
   - Mismo valor: no cambia nada.
   - Valor contrario: se actualiza el documento, se mueve un voto de un contador al otro y `votesCast` no cambia.
5. Se recalcula `trustScore`.
6. Se aplica la regla de 100 votos.
7. Se redirige:
   - Si la oportunidad fue eliminada y antes era `Verified`: `/explore`.
   - Si fue eliminada y antes era `Pending` u otro: `/verify`.
   - Si no fue eliminada: a la página de origen (`returnTo`), validada con `safeRedirect`.

### 11.3 Regla de 100 votos

```js
const total = (opportunity.validVotes || 0) + (opportunity.invalidVotes || 0);
opportunity.trustScore = total
  ? Math.round(((opportunity.validVotes || 0) / total) * 100)
  : 0;

if (total >= 100) {
  if (opportunity.trustScore < 70) {
    // eliminar
  } else {
    opportunity.status = "Verified";
  }
}
```

- Exactamente 70% verifica.
- Un cambio de voto puede hacer caer una oportunidad `Verified` por debajo de 70% y provocar su eliminación.

### 11.4 Borrado en cascada

Cuando una oportunidad se elimina por rechazo:

1. Obtener todos los `Vote` de la oportunidad.
2. Decrementar `votesCast` de cada votante.
3. `Vote.deleteMany({ opportunity: id })`.
4. `User.updateOne({ _id: createdBy }, { $pull: { createdOpportunities: id } })`, si `createdBy` existe.
5. `Opportunity.findByIdAndDelete(id)`.

El borrado de votos ocurre antes de eliminar la oportunidad para no perder la referencia de los votantes.

---

## 12. Estadísticas

### 12.1 MyProfile

| Estadística | Fórmula |
|---|---|
| Opportunities Shared | `Opportunity.countDocuments({ createdBy: user })` |
| Opportunities Verified | `Opportunity.countDocuments({ createdBy: user, status: "Verified" })` |
| Community Trust Score | promedio de `trustScore` de las oportunidades creadas con al menos un voto; `0` si no hay |
| Verifier Rank | `min(5, 1 + floor(votesCast / 10))` |
| Saved Opportunities | Estático |
| Recent Activity | Estático |

### 12.2 Verify

| Estadística | Fórmula |
|---|---|
| Contributions you've verified (valid) | `Vote.countDocuments({ user, value: "valid" })` |
| Contributions you've flagged (invalid) | `Vote.countDocuments({ user, value: "invalid" })` |
| Your verifier rank | `min(5, 1 + floor(votesCast / 10))` |
| Leaderboard | Estático (Fase 3) |

### 12.3 Trust score promedio

```js
const created = await Opportunity.find({
  createdBy: userId,
  trustScore: { $exists: true, $ne: null }
}).select("trustScore");

const trustScore = created.length
  ? Math.round(
      created.reduce((sum, o) => sum + (o.trustScore || 0), 0) /
        created.length
    )
  : 0;
```

Solo entran las oportunidades que ya tienen al menos un voto, para que una oportunidad nueva no baje artificialmente el promedio.

---

## 13. Seguridad

| Riesgo | Mitigación |
|---|---|
| Contraseñas en texto plano | Hash con `bcryptjs`, 10 rondas |
| Fuga de `passwordHash` | No se selecciona ni se renderiza |
| Sesión secuestrada por XSS | Cookie `httpOnly`; EJS escapa con `<%=` |
| Fijación de sesión | La sesión se crea al autenticarse; el identificador lo genera el servidor |
| Open redirect | `safeRedirect` solo acepta rutas internas |
| Duplicados de voto | Índice único `{ user, opportunity }` |
| Condiciones de carrera | Flujo secuencial; una transacción de Mongo es una mejora opcional |
| CSRF | La cookie `httpOnly` sin `sameSite` explícito se apoya en el comportamiento por defecto del navegador; para producción se recomienda `sameSite: "lax"` |
| Fuerza bruta | Opcional: limitación de intentos; no requerido para el alcance |
| Sesiones en memoria | Aceptable en desarrollo; en producción usar `connect-mongo` |

---

## 14. Criterios de aceptación

### 14.1 Autenticación

- Registro válido crea el usuario y la sesión.
- Correo duplicado muestra un error y no crea la cuenta.
- Contraseña de menos de 6 caracteres muestra un error.
- Contraseñas que no coinciden muestran un error.
- Login correcto crea la sesión y redirige.
- Login incorrecto muestra un mensaje genérico.
- Logout destruye la sesión y redirige a `/`.
- `/myProfile` sin sesión redirige a `/login?redirect=/myProfile`.
- `/contribute` sin sesión redirige a `/login?redirect=/contribute`.
- Tras el login se vuelve a la página de origen.
- `redirect` no permite destinos externos.
- `passwordHash` nunca aparece en la vista ni en la bitácora.

### 14.2 Contribución

- `/contribute` sin sesión redirige al login.
- Con sesión, la oportunidad se crea con `createdBy` correcto.
- `status` siempre es `Pending`, aunque el cliente envíe otro valor.
- Se genera el avatar si `imageUrl` está vacío.
- `createdOpportunities` se actualiza.
- Un título duplicado se informa como error.

### 14.3 Votos

- Sin sesión, votar redirige al login.
- Primer voto válido incrementa `validVotes` y `votesCast`.
- Primer voto inválido incrementa `invalidVotes` y `votesCast`.
- Votar lo mismo otra vez no cambia nada.
- Cambiar de válido a inválido mueve un voto de un contador al otro; `votesCast` no cambia.
- Cambiar de inválido a válido es equivalente.
- El creador puede votar su propia oportunidad.
- Votar sobre una oportunidad `Verified` está permitido.
- Una oportunidad inexistente responde con la página 404.
- Si la oportunidad se elimina, se borran sus votos, baja `votesCast` de cada votante y se retira de `createdOpportunities`.

### 14.4 Regla de 100

- 99 votos: no se aplica.
- 100 votos con 70% válidos: `Verified`.
- 100 votos con 69% válidos: eliminada.
- Cambio de voto que baja de 70% con 100 votos: eliminada.
- Cambio de voto que sube a 70% con 100 votos: `Verified`.

### 14.5 Interfaz

- `/verify` y `/opportunity/:id` son visibles sin sesión.
- El botón del voto ya emitido aparece con el color activo y deshabilitado.
- El botón contrario permanece habilitado para cambiar el voto.
- La barra de trust muestra el valor actualizado tras la redirección.
- Las estadísticas de MyProfile y Verify reflejan los datos reales.
- Todas las páginas responden con estado `200` cuando corresponda.

### 14.6 Seguridad

- La contraseña no se almacena en el navegador.
- El texto se renderiza con `<%=` (EJS escapa).
- No se usa `innerHTML` con datos no confiables.
- El parámetro `redirect` no permite URLs externas.

---

## 15. Limpieza de base de datos (Fase 2)

Se ejecuta después de completar la Fase 1:

1. Revisar que cada oportunidad tenga `createdBy`.
2. Reconstruir `User.createdOpportunities` desde `Opportunity.createdBy`.
3. Eliminar `Vote` huérfanos (sin usuario u oportunidad existente).
4. Recalcular `votesCast` desde `Vote`:

```js
const counts = await Vote.aggregate([
  { $group: { _id: "$user", total: { $sum: 1 } } }
]);
```

5. Reiniciar contadores si solo deben contar votos de usuarios registrados.
6. Crear índices definitivos:
   - `User.email` único.
   - `Vote.{user, opportunity}` único.
   - `Opportunity.createdBy`.
7. Verificar que no queden documentos sin `createdBy`.
8. Opcional: volver `createdBy` obligatorio en el esquema.
9. Los scripts temporales no se agregan al repositorio.
10. No se modifican los archivos CSV ni `.gitignore`.

---

## 16. Trabajo futuro (Fase 3)

- Leaderboard de verificación dinámico basado en `votesCast`.
- "Saved Opportunities" dinámico.
- "Recent Activity" dinámico.
- Migración opcional de Explore, Verify, Detalle y Destacadas a JSON + JavaScript.
- Edición de perfil.
- Fotos de perfil.
- Roles y administración.
- Recuperación de contraseña.
- Verificación de correo electrónico.
- Paginación.
- Pruebas automatizadas.
- Sesiones persistentes con `connect-mongo`.

### 16.1 Leaderboard dinámico (diseño previsto)

- Fuente principal: `User.votesCast`.
- Solo usuarios con `votesCast > 0`.
- Orden: `votesCast` descendente; desempate por votos válidos y fecha de registro.
- Límite: 5 posiciones.
- No se exponen correos ni datos sensibles.
- Se renderiza en el servidor o mediante una ruta dedicada; se decide al implementarlo.

---

## 17. Convenciones de desarrollo

- Comentarios en inglés en JavaScript y en los bloques dinámicos de EJS.
- Código simple y legible.
- No usar `default` en los esquemas.
- No usar hooks de normalización.
- `views/` fuera de `routes/`.
- Un `express.static` por carpeta.
- Usar `res.render` para páginas.
- Mantener el handler 404.
- No importar `path`.
- No agregar redirecciones para URLs antiguas.
- No leer `.env` con herramientas; los secretos se agregan sin exponer el contenido.
- No agregar scripts temporales ni archivos CSV al repositorio.
- No modificar `.gitignore`.
- `gradeLevels` se almacena como cadenas.
- Nombres de programas en español; descripciones en inglés.
- No pasar `req.body` directamente a `createOpportunity`; usar lista blanca.
- No cambiar el marcado ni los valores de los menús desplegables de Contribute.
- Los scripts temporales van en la raíz como `*.tmp.mjs`, usan `loadEnvFile()` y se eliminan al terminar.
- Los cambios se confirman en Git solo cuando se solicite explícitamente.

### 17.1 Operación local

```powershell
npm install
npm run dev
```

Servidor disponible en `http://localhost:3000`.

### 17.2 Verificación manual

```powershell
$job = Start-Job { Set-Location "C:\ruta\al\WebProject"; & node server.js }
Start-Sleep -Seconds 3
Invoke-WebRequest -Uri "http://localhost:3000/" -UseBasicParsing
Stop-Job $job
Remove-Job $job
```
