export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      cards: {
        Row: {
          activo: boolean
          fecha: string
          fecha_creacion: string | null
          id_card: number
          modelo: string
          precio_anterior: number | null
          precio_original: number
          tipo_insignia: string | null
          titulo: string
          url_imagen: string | null
          valor_insignia: string | null
        }
        Insert: {
          activo?: boolean
          fecha: string
          fecha_creacion?: string | null
          id_card?: number
          modelo: string
          precio_anterior?: number | null
          precio_original: number
          tipo_insignia?: string | null
          titulo: string
          url_imagen?: string | null
          valor_insignia?: string | null
        }
        Update: {
          activo?: boolean
          fecha?: string
          fecha_creacion?: string | null
          id_card?: number
          modelo?: string
          precio_anterior?: number | null
          precio_original?: number
          tipo_insignia?: string | null
          titulo?: string
          url_imagen?: string | null
          valor_insignia?: string | null
        }
        Relationships: []
      }
      carrusel: {
        Row: {
          activo: boolean | null
          descripcion: string | null
          descripcion_larga: string | null
          fecha: string | null
          id_carrusel: number
          redireccion: string | null
          texto_boton: string | null
          titulo: string
          url_imagen: string
        }
        Insert: {
          activo?: boolean | null
          descripcion?: string | null
          descripcion_larga?: string | null
          fecha?: string | null
          id_carrusel?: number
          redireccion?: string | null
          texto_boton?: string | null
          titulo: string
          url_imagen: string
        }
        Update: {
          activo?: boolean | null
          descripcion?: string | null
          descripcion_larga?: string | null
          fecha?: string | null
          id_carrusel?: number
          redireccion?: string | null
          texto_boton?: string | null
          titulo?: string
          url_imagen?: string
        }
        Relationships: []
      }
      categoria: {
        Row: {
          activo: boolean | null
          descripcion: string | null
          fecha_creacion: string | null
          id_categoria: number
          nombre: string | null
        }
        Insert: {
          activo?: boolean | null
          descripcion?: string | null
          fecha_creacion?: string | null
          id_categoria?: never
          nombre?: string | null
        }
        Update: {
          activo?: boolean | null
          descripcion?: string | null
          fecha_creacion?: string | null
          id_categoria?: never
          nombre?: string | null
        }
        Relationships: []
      }
      color: {
        Row: {
          activo: boolean | null
          descripcion: string | null
          fecha_creacion: string | null
          id_color: number
          nombre: string | null
          valor: string | null
        }
        Insert: {
          activo?: boolean | null
          descripcion?: string | null
          fecha_creacion?: string | null
          id_color?: never
          nombre?: string | null
          valor?: string | null
        }
        Update: {
          activo?: boolean | null
          descripcion?: string | null
          fecha_creacion?: string | null
          id_color?: never
          nombre?: string | null
          valor?: string | null
        }
        Relationships: []
      }
      descuento_promocional: {
        Row: {
          activo: boolean | null
          aplica_a_todos: boolean | null
          codigo_cupon: string | null
          fecha_fin: string | null
          fecha_inicio: string | null
          id_descuento: number
          nombre: string | null
          porcentaje: number | null
        }
        Insert: {
          activo?: boolean | null
          aplica_a_todos?: boolean | null
          codigo_cupon?: string | null
          fecha_fin?: string | null
          fecha_inicio?: string | null
          id_descuento?: never
          nombre?: string | null
          porcentaje?: number | null
        }
        Update: {
          activo?: boolean | null
          aplica_a_todos?: boolean | null
          codigo_cupon?: string | null
          fecha_fin?: string | null
          fecha_inicio?: string | null
          id_descuento?: never
          nombre?: string | null
          porcentaje?: number | null
        }
        Relationships: []
      }
      diapositivas: {
        Row: {
          id: number
          imagen: string
          texto_boton: string | null
          texto1: string | null
          texto2: string | null
          titulo: string | null
        }
        Insert: {
          id?: number
          imagen: string
          texto_boton?: string | null
          texto1?: string | null
          texto2?: string | null
          titulo?: string | null
        }
        Update: {
          id?: number
          imagen?: string
          texto_boton?: string | null
          texto1?: string | null
          texto2?: string | null
          titulo?: string | null
        }
        Relationships: []
      }
      imagen_producto: {
        Row: {
          descripcion: string | null
          fecha_creacion: string | null
          id_imagen: number
          id_producto: number | null
          principal: boolean | null
          url: string
        }
        Insert: {
          descripcion?: string | null
          fecha_creacion?: string | null
          id_imagen?: never
          id_producto?: number | null
          principal?: boolean | null
          url: string
        }
        Update: {
          descripcion?: string | null
          fecha_creacion?: string | null
          id_imagen?: never
          id_producto?: number | null
          principal?: boolean | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "imagen_producto_id_producto_fkey"
            columns: ["id_producto"]
            isOneToOne: false
            referencedRelation: "producto"
            referencedColumns: ["id_producto"]
          },
          {
            foreignKeyName: "imagen_producto_id_producto_fkey"
            columns: ["id_producto"]
            isOneToOne: false
            referencedRelation: "vista_catalogo"
            referencedColumns: ["id_catalogo"]
          },
        ]
      }
      marca: {
        Row: {
          activo: boolean | null
          descripcion: string | null
          fecha_creacion: string | null
          id_marca: number
          nombre: string | null
        }
        Insert: {
          activo?: boolean | null
          descripcion?: string | null
          fecha_creacion?: string | null
          id_marca?: never
          nombre?: string | null
        }
        Update: {
          activo?: boolean | null
          descripcion?: string | null
          fecha_creacion?: string | null
          id_marca?: never
          nombre?: string | null
        }
        Relationships: []
      }
      producto: {
        Row: {
          activo: boolean | null
          descripcion: string | null
          destacado: boolean | null
          fecha: string | null
          id_categoria: number
          id_color: number
          id_marca: number
          id_producto: number
          memoria: string | null
          modelo: string | null
          nombre: string
          nuevo: boolean | null
          precio: number | null
          ram: string | null
          reacondicionado: boolean | null
        }
        Insert: {
          activo?: boolean | null
          descripcion?: string | null
          destacado?: boolean | null
          fecha?: string | null
          id_categoria: number
          id_color: number
          id_marca: number
          id_producto?: never
          memoria?: string | null
          modelo?: string | null
          nombre: string
          nuevo?: boolean | null
          precio?: number | null
          ram?: string | null
          reacondicionado?: boolean | null
        }
        Update: {
          activo?: boolean | null
          descripcion?: string | null
          destacado?: boolean | null
          fecha?: string | null
          id_categoria?: number
          id_color?: number
          id_marca?: number
          id_producto?: never
          memoria?: string | null
          modelo?: string | null
          nombre?: string
          nuevo?: boolean | null
          precio?: number | null
          ram?: string | null
          reacondicionado?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "producto_id_categoria_fkey"
            columns: ["id_categoria"]
            isOneToOne: false
            referencedRelation: "categoria"
            referencedColumns: ["id_categoria"]
          },
          {
            foreignKeyName: "producto_id_color_fkey"
            columns: ["id_color"]
            isOneToOne: false
            referencedRelation: "color"
            referencedColumns: ["id_color"]
          },
          {
            foreignKeyName: "producto_id_marca_fkey"
            columns: ["id_marca"]
            isOneToOne: false
            referencedRelation: "marca"
            referencedColumns: ["id_marca"]
          },
        ]
      }
      producto_descuento: {
        Row: {
          id_descuento: number
          id_producto: number
        }
        Insert: {
          id_descuento: number
          id_producto: number
        }
        Update: {
          id_descuento?: number
          id_producto?: number
        }
        Relationships: [
          {
            foreignKeyName: "producto_descuento_id_descuento_fkey"
            columns: ["id_descuento"]
            isOneToOne: false
            referencedRelation: "descuento_promocional"
            referencedColumns: ["id_descuento"]
          },
          {
            foreignKeyName: "producto_descuento_id_producto_fkey"
            columns: ["id_producto"]
            isOneToOne: false
            referencedRelation: "producto"
            referencedColumns: ["id_producto"]
          },
          {
            foreignKeyName: "producto_descuento_id_producto_fkey"
            columns: ["id_producto"]
            isOneToOne: false
            referencedRelation: "vista_catalogo"
            referencedColumns: ["id_catalogo"]
          },
        ]
      }
      usuario: {
        Row: {
          email: string | null
          id_usuario: number
          nombre: string | null
        }
        Insert: {
          email?: string | null
          id_usuario?: never
          nombre?: string | null
        }
        Update: {
          email?: string | null
          id_usuario?: never
          nombre?: string | null
        }
        Relationships: []
      }
      usuario_descuento: {
        Row: {
          canjeado: boolean | null
          fecha_canje: string | null
          id_descuento: number | null
          id_usuario: number | null
        }
        Insert: {
          canjeado?: boolean | null
          fecha_canje?: string | null
          id_descuento?: number | null
          id_usuario?: number | null
        }
        Update: {
          canjeado?: boolean | null
          fecha_canje?: string | null
          id_descuento?: number | null
          id_usuario?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "usuario_descuento_id_descuento_fkey"
            columns: ["id_descuento"]
            isOneToOne: false
            referencedRelation: "descuento_promocional"
            referencedColumns: ["id_descuento"]
          },
          {
            foreignKeyName: "usuario_descuento_id_usuario_fkey"
            columns: ["id_usuario"]
            isOneToOne: false
            referencedRelation: "usuario"
            referencedColumns: ["id_usuario"]
          },
        ]
      }
    }
    Views: {
      vista_catalogo: {
        Row: {
          activo: boolean | null
          categoria: string | null
          color: string | null
          descripcion: string | null
          descuento: string | null
          estado: string | null
          fecha_creacion: string | null
          id_catalogo: number | null
          modelo: string | null
          nombre_producto: string | null
          precio: number | null
          url_imagen: string[] | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
