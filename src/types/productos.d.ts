export type ProductoDetalle = {
  id_producto: number
  nombre_producto: string
  modelo: string
  descripcion_corta: string
  precio: string
  marca: string
  nombre_color: string
  valor_color: string
  categoria: string
  fecha: string
  precio_final: string
  descuento_porcentaje: string
  cantidad_disponible: number
  url_imagen: string[]
  especificaciones: Especificacion[]
  tags: string[]
}

export type Especificacion = {
  clave: string
  valor: string
}

export type itemCatalogo = {
  id_catalogo: number
  nombre_producto: string
  modelo: string
  marca: string
  color: string
  memoria: string
  categoria: string
  ram: string
  precio: number
  precio_final: number
  descuento_porcentaje: number | null
  cantidad_disponible: number
  imagen_principal: string
  tags: string[]
}

export interface EstadoFiltros {
  marcas: string[]
  rangosPrecio: string[]
  precioMinimo: string
  precioMaximo: string
  destacados: string[]         // ahora basado en tags: ["nuevo", "en-promocion", "reacondicionado"]
  colores: string[]
  almacenamiento: string[]
  ram: string[]
  accesibilidad: string[]      // ej: ["disponible"]
  caracteristicas: string[]    // ej: ["gaming", "pantalla 120Hz"]
  ordenarPor: string
  categorias: string[]
  tags: string[]
}
