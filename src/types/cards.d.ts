export type itemProducto = {
  id_catalogo: number;
  nombre_producto: string;
  categoria: string | null;
  descripcion: string | null;
  modelo: string | null;
  color: string | null;
  estado: 'Nuevo' | 'Reacondicionado' | 'Usado' | null;
  descuento: string | null; // Ej: "DESC50 (50%)"
  precio: number;
  activo: boolean;
  fecha_creacion: string | null; // ISO timestamp
  url_imagen: string[]; // Array de URLs
};
