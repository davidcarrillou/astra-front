/**
 * Representa los datos de un elemento del carrusel.
 *
 * @property id_carrusel - Identificador único del carrusel.
 * @property titulo - Título principal del carrusel.
 * @property descripcion - Descripción corta del carrusel (puede ser nula).
 * @property descripcion_larga - Descripción larga del carrusel (puede ser nula).
 * @property texto_boton - Texto que aparece en el botón del carrusel (puede ser nulo).
 * @property redireccion - URL de redirección al hacer clic en el botón (puede ser nula).
 * @property url_imagen - URL de la imagen asociada al carrusel (puede ser nula).
 * @property activo - Indica si el carrusel está activo.
 * @property fecha - Fecha de creación o modificación del carrusel.
 */
export type carruselData = {
  id_carrusel: number;
  titulo: string;
  descripcion: string | null;
  descripcion_larga: string | null;
  texto_boton: string | null;
  redireccion: string | null;
  url_imagen: string | null;
  activo: boolean;   // 👈 más claro que usar 0/1
  fecha: string;     // o Date si prefieres
};
