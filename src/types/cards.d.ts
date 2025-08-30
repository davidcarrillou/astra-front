export type cardData = {
  id_card: number;
  titulo: string;
  categoria: string | null;
  modelo: string;
  color: string | null;
  tipo_insignia: string | null;
  valor_insignia: string | null;
  precio_original: number;
  precio_anterior: number | null;
  url_imagen: string | null;
  fecha: string;
  activo: boolean;
  fecha_creacion: string | null;
};
