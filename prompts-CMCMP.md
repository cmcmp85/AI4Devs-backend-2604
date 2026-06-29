# Registro de prompts — Ejercicio ATS LTI (Kanban de candidatos)

Documento reproducible del proceso seguido durante el ejercicio del Módulo 9.  
Los prompts están en el **orden de ejecución**. Cada entrada indica la herramienta usada y si el resultado difirió del prompt original.

**Herramienta principal:** Cursor (agente Auto)  
**Proyecto:** `AI4Devs-backend-2604` — backend Express + Prisma + frontend React

---

## 1. Auditoría del README

**Contexto:** Cursor (agente Auto). Resultado entregado como diagnóstico en markdown (tabla de estado + texto a añadir por sección). No se modificó ningún fichero en esta fase.

```
Eres un experto arquitecto de sistemas con experiencia en ATS.

Lee el README existente del proyecto @README.md y evalúa si cubre
los siguientes puntos. Para cada uno, indica si está completo, incompleto o ausente:

- Propósito de negocio de LTI
- Estructura de carpetas del proyecto
- Tecnologías usadas (runtime, ORM, framework)
- Arquitectura de backend y frontend
- Pasos completos para levantar el entorno, incluida la base de datos

Devuelve un diagnóstico en formato markdown con una tabla de estado y, para cada punto
incompleto o ausente, el texto exacto que habría que añadir o corregir.
No reescribas lo que ya esté bien.
```

---

## 2. Actualización del README (solo secciones incompletas)

**Contexto:** Cursor (agente Auto). Se actualizó `README.md` en bloques EN y ES: propósito de negocio, stack tecnológico, directorios ampliados, arquitectura, primeros pasos reordenados y correcciones menores en Docker/Prisma. Las secciones ya correctas no se tocaron.

```
Basándote en el diagnóstico anterior, actualiza únicamente las secciones del @README.md 
que estaban incompletas o ausentes. Mantén el estilo, tono e idioma del documento original.
No toques las secciones que ya estaban correctas.
```

---

## 3. Historia de usuario enriquecida — GET /positions/:id/candidates

**Contexto:** Cursor (agente Auto). Resultado: historia de usuario técnica en markdown (sin implementación de código). Se exploró `schema.prisma` y la arquitectura existente para alinearla al proyecto.

```
Eres un experto en producto y backend con experiencia en ATS.

A continuación te doy una historia de usuario incompleta. Tu misión es enriquecerla con
todo el detalle técnico necesario para que un desarrollador pueda implementarla de forma
autónoma, siguiendo las mejores prácticas del proyecto ).

Historia original:
---
Endpoint: GET /positions/:id/candidates
Descripción: Devuelve todos los candidatos en proceso para una posición dada.
Debe incluir: nombre completo del candidato (tabla candidate), current_interview_step
(tabla application) y la puntuación media del candidato calculada a partir de los scores
de sus interviews.
---

Proporciona una historia mejorada en formato markdown que incluya:
- Descripción completa de la funcionalidad
- Estructura exacta de la URL y parámetros
- Esquema del body de respuesta (JSON con tipos)
- Tablas y relaciones de BD que se deben consultar
- Archivos del proyecto que hay que crear o modificar, siguiendo la arquitectura existente
  (router → controller → service → repository/Prisma)
- Casos de error a manejar (posición no encontrada, sin candidatos, etc.)
- Criterios de aceptación (definition of done)
- Requisitos no funcionales: validación de entrada, manejo de errores HTTP correctos
```

---

## 4. Historia de usuario enriquecida — PUT /candidates/:id/stage

**Contexto:** Cursor (agente Auto). Resultado: historia de usuario técnica en markdown. Se añadió `positionId` en el body como requisito de desambiguación (un candidato puede tener varias aplicaciones), aunque el prompt original no lo mencionaba explícitamente.

```
Enriquece la siguiente historia de usuario con detalle técnico suficiente para que
un desarrollador pueda implementarla de forma autónoma.

Historia original:
---
Endpoint: PUT /candidates/:id/stage
Descripción: Actualiza la etapa actual del proceso de entrevista de un candidato específico.
Permite mover al candidato a una fase diferente del proceso (como en un tablero kanban).
---

Proporciona en formato markdown:
- Descripción completa de la funcionalidad
- URL, método HTTP y parámetros (path params + body)
- Esquema del body de request y response (JSON con tipos)
- Tablas y campos de BD afectados
- Archivos a crear o modificar siguiendo la arquitectura del proyecto
- Validaciones requeridas (¿qué pasa si el candidato no existe? ¿si la etapa no existe?)
- Criterios de aceptación
- Requisitos no funcionales: idempotencia, códigos HTTP correctos
```

---

## 5. Implementación del service — GET /positions/:id/candidates

**Contexto:** Cursor (agente Auto). Se crearon `backend/src/application/services/positionService.ts` y métodos en `Application.ts` (`findByPositionId`). El DTO de respuesta se simplificó a array plano `[{ fullName, currentInterviewStep, averageScore }]` según el prompt, no el wrapper con `positionId`/`total` de la historia de usuario.

```
Eres un experto en Node.js y TypeScript con conocimiento de arquitectura en capas.

Implementa la función del service para el endpoint GET /positions/:id/candidates.

Requisitos:
- El service debe llamar a Prisma (o al repositorio) con la consulta del paso anterior
- Debe transformar el resultado al DTO de respuesta con esta forma:
  {
    fullName: string,         // firstName + " " + lastName
    currentInterviewStep: string,
    averageScore: number | null
  }[]
- Debe lanzar un error claro si la posición no existe
- Usa TypeScript con tipos explícitos

Sigue la estructura de servicios existente en el proyecto. Adjunta o referencia
los archivos de servicio actuales para que uses el mismo estilo.
```

---

## 6. Implementación del controller y ruta — GET /positions/:id/candidates

**Contexto:** Cursor (agente Auto). Respuesta afirmativa al ofrecimiento del agente tras el prompt 5. Se crearon `positionController.ts`, `positionRoutes.ts` y se registró `/positions` en `index.ts`.

```
si por favor
```

> **Nota:** Este prompt fue la confirmación explícita para implementar controller y ruta tras la pregunta del agente: *«¿Quieres que implemente también el controller y la ruta?»*

---

## 7. Controller y ruta GET (especificación completa)

**Contexto:** Cursor (agente Auto). Mismo entregable que el prompt 6, con requisitos HTTP detallados. El controller valida `id <= 0` (más estricto que `getCandidateById` existente).

```
Implementa el controller y registra la ruta para:
  GET /positions/:id/candidates

Requisitos:
- El controller debe validar que :id es un número entero válido
- Llamar al service correspondiente
- Responder con 200 y el array de candidatos si todo va bien
- Responder con 404 si la posición no existe
- Responder con 400 si el id no es válido
- Responder con 500 para errores inesperados

Sigue el patrón de controllers existentes en el proyecto. Registra la ruta en el
archivo de rutas correcto. Adjunta los archivos de rutas y controllers actuales.
```

---

## 8. Operación Prisma y service — PUT /candidates/:id/stage

**Contexto:** Cursor (agente Auto). El prompt pedía «mostrar el código»; el agente lo implementó además en ficheros (`updateCandidateStage` en `candidateService.ts`, métodos en `Application.ts`). **Ajuste respecto al prompt 4:** no se incluyó `positionId` en el body; se usa `findByCandidateId` (aplicación más reciente), lo que deja deuda técnica con candidatos multi-posición.

```
Escribe la operación Prisma necesaria para actualizar el campo currentInterviewStep
de un registro Application, dado el candidateId.

Consideraciones:
- El :id del endpoint hace referencia al candidateId (tabla Candidate)
- Debes encontrar la Application activa asociada a ese candidate
- Actualizar el campo currentInterviewStep con el nuevo valor recibido en el body
- Si el candidato no existe, debe lanzarse un error apropiado
- Si la etapa de entrevista enviada no existe en la tabla InterviewStep, también error

Muestra el código listo para el service, con tipos TypeScript.
```

---

## 9. Implementación completa — PUT /candidates/:id/stage

**Contexto:** Cursor (agente Auto). Se añadieron controller (`updateCandidateStage`) y ruta `PUT /:id/stage` en `candidateRoutes.ts`. El service ya existía del prompt 8. No se validó que la etapa pertenezca al flujo de la posición (pendiente de deuda técnica).

```
Implementa de forma completa el endpoint PUT /candidates/:id/stage:

1. SERVICE: función que recibe candidateId y el nuevo interviewStepId, valida que ambos
   existen en la BD y actualiza el campo currentInterviewStep de la Application.

2. CONTROLLER: valida que :id es número entero, valida que el body contiene
   interviewStepId (número entero), llama al service y responde:
   - 200 con la application actualizada si todo va bien
   - 400 si los parámetros no son válidos
   - 404 si el candidato o la etapa no existen
   - 500 para errores inesperados

3. ROUTER: registra la ruta en el archivo correcto del proyecto.

Sigue la estructura y estilo del código existente. Adjunta los archivos relevantes
del proyecto para que uses el mismo patrón.
```

---

## 10. Colección de pruebas HTTP (curl / REST Client)

**Contexto:** Cursor (agente Auto). Resultado en markdown con bloques `.http` y curl. Se documentaron IDs del seed y la necesidad de crear una posición sin candidatos manualmente (el seed no incluye ninguna).

```
Genera una colección de comandos curl (o equivalente en formato HTTP para REST Client
de VS Code) para probar los dos endpoints implementados:

1. GET /positions/:id/candidates
   - Caso feliz: posición con candidatos y entrevistas
   - Caso sin candidatos
   - Caso posición inexistente (404)
   - Caso id inválido (400)

2. PUT /candidates/:id/stage
   - Caso feliz: actualización correcta
   - Caso candidato inexistente (404)
   - Caso etapa inexistente (404)
   - Caso body inválido (400)

Usa IDs reales del seed de la base de datos del proyecto si están disponibles,
o indica qué valores de prueba usar.
```

---

## 11. Revisión de código SOLID y CUPID

**Contexto:** Cursor (agente Auto). Análisis en markdown sin aplicar refactors. Se identificaron deuda técnica prioritaria: errores por string, `findByCandidateId` ambiguo, lógica de aplicación en `candidateService`, falta validación de flujo de entrevista.

```
Eres un senior developer experto en TypeScript, Node.js y Clean Code.

Revisa el código de los dos endpoints que acabas de implementar aplicando los principios
SOLID y CUPID. Para cada archivo, señala exactamente:
- Qué viola SRP, DIP u otro principio, si aplica
- Si hay lógica que debería extraerse (Extract Method / Extract Service)
- Si los nombres de variables y funciones son suficientemente descriptivos del dominio
  (candidato, etapa, puntuación media — no genéricos como "data", "result", "item")
- Si el manejo de errores es consistente con el resto del proyecto

Propón los refactors mínimos necesarios. Empieza por los que harían que un agente de IA
se confunda al modificar este código en el futuro.
```

---

## 12. Descripción del Pull Request

**Contexto:** Cursor (agente Auto). Resultado: texto de PR en markdown listo para pegar en GitHub. No se creó el PR ni commit en el repositorio.

```
Eres un desarrollador senior que acaba de implementar dos endpoints para una interfaz
kanban de candidatos en un ATS.

Escribe la descripción del Pull Request en markdown que incluya:
- Resumen del cambio (qué hace y por qué)
- Los dos endpoints implementados con su contrato (URL, método, request, response)
- Archivos creados o modificados
- Cómo probarlo localmente (pasos + comandos curl de ejemplo)
- Decisiones técnicas relevantes tomadas durante la implementación
- Cualquier deuda técnica conocida o mejoras futuras

El PR debe ser claro para un revisor que no conoce el contexto del ejercicio.
```

---

## 13. Registro de prompts (este documento)

**Contexto:** Cursor (agente Auto). Genera el fichero `prompts-CMCMP.md` en la raíz del proyecto.

```
Crea un fichero llamado prompts-CMCMP.md en la raíz del proyecto con todos los prompts
que hemos utilizado durante este ejercicio, en el orden en que fueron ejecutados.

Para cada prompt incluye:
- Un título descriptivo (ej: "Auditoría del README", "Query Prisma GET candidates")
- El prompt exacto tal como fue enviado, en un bloque de código
- Una línea de contexto indicando qué herramienta se usó (Cursor, Claude Code, etc.)
  y si el resultado requirió ajustes respecto al prompt original

El fichero debe servir como registro reproducible del proceso: otra persona debería
poder repetir el ejercicio desde cero siguiendo solo este documento.

Formato markdown.
```

---

## Resumen del flujo reproducible

| Fase | Prompts | Entregable principal |
|------|---------|----------------------|
| Documentación | 1 → 2 | `README.md` actualizado |
| Diseño | 3 → 4 | Historias de usuario técnicas (GET y PUT) |
| Implementación GET | 5 → 6 → 7 | `positionService`, `positionController`, `positionRoutes` |
| Implementación PUT | 8 → 9 | `updateCandidateStage`, controller, ruta en `candidateRoutes` |
| Calidad y cierre | 10 → 11 → 12 → 13 | Pruebas HTTP, revisión SOLID, descripción PR, este registro |

### Ficheros de código tocados durante el ejercicio

```
backend/src/application/services/positionService.ts          (nuevo)
backend/src/application/services/candidateService.ts         (modificado)
backend/src/presentation/controllers/positionController.ts   (nuevo)
backend/src/presentation/controllers/candidateController.ts (modificado)
backend/src/routes/positionRoutes.ts                         (nuevo)
backend/src/routes/candidateRoutes.ts                        (modificado)
backend/src/domain/models/Application.ts                     (modificado)
backend/src/index.ts                                         (modificado)
README.md                                                    (modificado)
prompts-CMCMP.md                                             (este fichero)
```

### Ajustes globales respecto a los prompts originales

1. **PUT sin `positionId`:** Las historias de usuario (prompt 4) recomendaban `positionId` en el body; la implementación (prompts 8–9) no lo incluyó.
2. **DTO GET simplificado:** El prompt 5 fijó un array plano de candidatos; la historia del prompt 3 proponía un wrapper con metadatos de posición.
3. **Refactors SOLID (prompt 11):** Identificados pero no aplicados en código.
4. **Prompt 6 vs 7:** Ambos cubren el controller GET; el 6 fue confirmación breve tras el 5, el 7 es la especificación formal.
