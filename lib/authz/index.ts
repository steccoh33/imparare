/**
 * Capa de autorización de imparando.
 *
 * Regla arquitectónica #2:
 *  - Toda regla de autorización vive acá, con tests unitarios.
 *  - Se evalúa UNA sola vez por request en `proxy.ts`, que propaga el
 *    resultado a las páginas vía un header interno no falsificable.
 *  - Las Server Actions NO están cubiertas por el proxy: siempre repiten
 *    su propio chequeo completo e independiente.
 */
export * from "./roles";

/**
 * Nombre del header interno que `proxy.ts` inyecta con el contexto de auth
 * ya resuelto. El proxy lo *borra* de la request entrante antes de
 * setearlo, así el cliente no puede falsificarlo.
 */
export const INTERNAL_AUTH_CONTEXT_HEADER = "x-imparando-auth-context";
