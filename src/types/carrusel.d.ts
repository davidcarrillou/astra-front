export type CarruselData = {
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
