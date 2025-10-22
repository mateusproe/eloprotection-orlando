import { useState } from 'react'
import { X, Phone, MessageCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import installationImage from '../assets/images/installation-process.jpg'

const QuoteModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    metragem: '',
    email: '',
    cidade: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  const contactUrl = 'https://eloprotection.com/contact'
  const webhookUrl = 'https://n8n.unadigital.dev/webhook/eloprotectionorlando'

  const formatPhoneNumber = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 10)
    if (!digits) return ''

    if (digits.length < 4) {
      return `(${digits}`
    }

    const area = digits.slice(0, 3)
    const prefix = digits.slice(3, 6)
    const line = digits.slice(6, 10)

    if (!prefix) {
      return `(${area}`
    }

    if (!line) {
      return `(${area}) ${prefix}`
    }

    return `(${area}) ${prefix}-${line}`
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target

    if (name === 'telefone') {
      const formatted = formatPhoneNumber(value)
      setFormData(prev => ({
        ...prev,
        telefone: formatted
      }))
      return
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    const phoneDigits = formData.telefone.replace(/\D/g, '')

    if (!formData.nome || !phoneDigits || !formData.metragem || !formData.cidade) {
      setError('Please fill in all required fields.')
      setIsSubmitting(false)
      return
    }

    if (phoneDigits.length !== 10) {
      setError('Invalid phone number. Use (407) 555-0123 format.')
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.nome,
          phone: phoneDigits,
          phoneFormatted: formData.telefone,
          email: formData.email || null,
          areaSquareFeet: formData.metragem,
          city: formData.cidade,
          timestamp: new Date().toISOString(),
          source: 'website_eloprotection_orlando'
        })
      })

      if (!response.ok) {
        throw new Error(`Webhook responded with ${response.status}`)
      }

      setIsSubmitted(true)
    } catch (err) {
      console.error('Error submitting quote form:', err)
      setError('We could not send your request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleContact = () => {
    window.open(contactUrl, '_blank', 'noopener,noreferrer')
  }

  const handleCall = () => {
    window.open('tel:+15595133708', '_blank', 'noopener,noreferrer')
  }

  const resetForm = () => {
    setFormData({ nome: '', telefone: '', metragem: '', email: '', cidade: '' })
    setIsSubmitted(false)
    setError('')
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-background border border-border rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden transform animate-in fade-in zoom-in duration-300">
        <div className="grid md:grid-cols-[1.2fr_1fr]">
          <div className="p-6 sm:p-10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-primary mb-2">Request a Quote</h2>
                <p className="text-muted-foreground">
                  Share a few details and the Orlando specialists will craft a tailored protection plan.
                </p>
              </div>
              <button
                onClick={handleClose}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close quote modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="nome" className="block text-sm font-semibold text-brand-navy mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    className="form-input w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="telefone" className="block text-sm font-semibold text-brand-navy mb-2">
                    Phone (with area code) *
                  </label>
                  <input
                    type="tel"
                    id="telefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleInputChange}
                    className="form-input w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="(407) 555-0123"
                    inputMode="numeric"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-brand-navy mb-2">
                    Email (optional)
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="cidade" className="block text-sm font-semibold text-brand-navy mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    id="cidade"
                    name="cidade"
                    value={formData.cidade}
                    onChange={handleInputChange}
                    className="form-input w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Which Central Florida city is the project in?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="metragem" className="block text-sm font-semibold text-brand-navy mb-2">
                    Area (sq ft) *
                  </label>
                  <input
                    type="number"
                    id="metragem"
                    name="metragem"
                    value={formData.metragem}
                    onChange={handleInputChange}
                    className="form-input w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="e.g. 100"
                    min="1"
                    required
                  />
                </div>

                {error && (
                  <div className="text-green-600 text-sm bg-green-100 dark:bg-white/10 p-3 rounded-lg">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 hover:bg-green-700 text-white dark:text-primary font-semibold py-3 rounded-lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Request'
                  )}
                </Button>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-brand-red-soft rounded-full flex items-center justify-center mx-auto">
                  <MessageCircle className="w-8 h-8 text-secondary" />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Quote request logged!
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Our Orlando team will review your details and follow up shortly.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <Button
                    onClick={handleCall}
                    className="w-full bg-green-600 hover:bg-green-700 text-white dark:text-primary font-semibold py-3 rounded-lg"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call +1 (559) 513-3708
                  </Button>

                  <Button
                    variant="outline"
                    onClick={handleContact}
                    className="w-full"
                  >
                    Visit eloprotection.com/contact
                  </Button>

                  <Button
                    variant="outline"
                    onClick={handleClose}
                    className="w-full sm:col-span-2"
                  >
                    Close
                  </Button>
                </div>

              </div>
            )}
          </div>

          <div className="hidden md:block bg-gradient-to-br from-black/80 via-black/60 to-black/80 text-white relative">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30"
              style={{ backgroundImage: `url(${installationImage})` }}
            />
            <div className="relative z-10 h-full flex flex-col justify-between p-10 space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-brand-navy">What to expect next</h3>
                <ul className="space-y-3 text-sm text-brand-navy opacity-90">
                  <li>- A specialist will contact you within one business day.</li>
                  <li>- We schedule a site visit to evaluate your protection needs.</li>
                  <li>- You receive a tailored proposal from the Orlando team with detailed coverage.</li>
                </ul>
              </div>
              <div>
                <p className="text-sm text-brand-navy">
                  Elo Protection covers floors, stairs, countertops, and other finishes with reusable panels that resist water, impact, heavy loads, and flame.
                </p>
              </div>
            </div>
          </div>
        </div>

        {!isSubmitted && (
          <div className="px-6 pb-6">
            <p className="text-xs text-muted-foreground text-center">
              Your information is secure and will only be used to contact you about this quote.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default QuoteModal









