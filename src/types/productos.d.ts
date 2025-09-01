export type productosData = {
  id_producto: number
  nombre: string
  descripcion: string
  precio: number
  marca: string
  color: string
  categoria: string
  memoria: string
  ram: string
  destacado: boolean
  nuevo: boolean
  reacondicionado: boolean
  activo: boolean
  fecha: string
}

export type itemCatalogo = {
  activo: boolean 
  categoria: string 
  color: string 
  descripcion: string
  descuento: string
  estado: string
  memoria: string
  ram: string
  fecha_creacion: string
  id_catalogo: number
  modelo: string
  nombre_producto: string
  precio: number
  url_imagen: string[]
}
export interface EstadoFiltros {
  marcas: string[]
  rangosPrecio: string[]
  precioMinimo: string
  precioMaximo: string
  destacados: string[]
  colores: string[]
  almacenamiento: string[]
  ram: string[]
  accesibilidad: string[]
  ordenarPor: string
}