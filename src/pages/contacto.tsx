"use client"

import { useState, type FormEvent } from "react"
import "./contacto.css"

interface FormData {
  name: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export default function Contacto() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Por favor ingresa tu nombre"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Por favor ingresa tu correo electrónico"
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Por favor ingresa un correo electrónico válido"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Por favor ingresa tu mensaje"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "El mensaje debe tener al menos 10 caracteres"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Limpiar error cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    console.log("✅ Formulario válido, Enviando datos...", formData)

    // Simular envío
    setTimeout(() => {
      setIsSubmitting(false)
      setFormData({ name: "", email: "", message: "" })
      setShowSuccess(true)

      setTimeout(() => {
        setShowSuccess(false)
      }, 5000)
    }, 1500)
  }

  return (
    <section className="form_container">
      <div className="form_contact">
        <div className="form_header">
          <h1>Contáctanos</h1>
          <p>Quejas, Sugerencias, Cotizaciones, etc...</p>
        </div>

        <form onSubmit={handleSubmit} id="form_contact">
          <div className={`form_item ${errors.name ? "has-error" : ""}`} data-input_name>
            <label htmlFor="name">
              Nombre<i>*</i>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Marcus Shima"
              autoComplete="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={errors.name ? "error" : ""}
            />
            {errors.name && (
              <div className="error__message">
                <p>{errors.name}</p>
              </div>
            )}
          </div>

          <div className={`form_item ${errors.email ? "has-error" : ""}`} data-input_email>
            <label htmlFor="mailto">
              Correo Electrónico<i>*</i>
            </label>
            <input
              type="email"
              name="email"
              id="mailto"
              placeholder="mshima@astra.cctv"
              autoComplete="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={errors.email ? "error" : ""}
            />
            {errors.email && (
              <div className="error__message">
                <p>{errors.email}</p>
              </div>
            )}
          </div>

          <div className={`form_item textarea ${errors.message ? "has-error" : ""}`} data-textarea>
            <label htmlFor="msjto">
              Mensaje<i>*</i>
            </label>
            <textarea
              id="msjto"
              name="message"
              rows={8}
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              className={errors.message ? "error" : ""}
            />
            {errors.message && (
              <div className="error__message">
                <p>{errors.message}</p>
              </div>
            )}
          </div>

          <button type="submit" id="btn_submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                Enviando
                <div className="dds__loading-indicator" aria-hidden="true">
                  <div className="dds__loading-indicator__spinner"></div>
                </div>
              </>
            ) : (
              <>
                Enviar
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g className="artboard">
                    <rect width="28" height="6" fill="currentColor"></rect>
                    <rect
                      x="22"
                      y="28"
                      width="28"
                      height="6"
                      transform="rotate(-90 22 28)"
                      fill="currentColor"
                    ></rect>
                    <path d="M0 23.5L23.5 -6.70769e-07L28 4.5L4.5 28L0 23.5Z" fill="currentColor"></path>
                  </g>
                </svg>
              </>
            )}
          </button>

          {showSuccess && (
            <div className="success-message">
              <p>¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.</p>
            </div>
          )}
        </form>
      </div>

      <div className="aside_container">
        <div className="brands">
          <h3>Fabricantes</h3>
          <div className="qxigfptd">
            <div className="slider_cont">
              <div className="infinite-slider">
                <div className="brand-logos">
                  <span>Samsung</span>
                  <span>Apple</span>
                  <span>Xiaomi</span>
                  <span>Huawei</span>
                  <span>OnePlus</span>
                  <span>Google</span>
                  <span>Sony</span>
                  <span>LG</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="address">
          <h3>Dirección</h3>
          <div className="g_map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d10537.240658835812!2d-89.64816964029195!3d20.97350156302275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2smx!4v1748828674112!5m2!1ses!2smx"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
