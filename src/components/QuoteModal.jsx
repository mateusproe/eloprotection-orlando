import { useState } from 'react'
import { X, Phone, MessageCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'

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
  const whatsappMessage = 'Olá, vim pelo site da Protege Piso Indaiatuba'
  const whatsappLink = `https://wa.me/5519999340914?text=${encodeURIComponent(whatsappMessage)}`

  const formatPhoneNumber = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 11)
    if (!digits) return ''

    if (digits.length <= 2) {
      return `(${digits}`
    }

    const ddd = digits.slice(0, 2)
    const rest = digits.slice(2)
    let formatted = `(${ddd}) `

    if (digits.length <= 10) {
      if (rest.length <= 4) {
        return formatted + rest
      }
      const middle = rest.slice(0, rest.length - 4)
      const last = rest.slice(-4)
      return middle ? `${formatted}${middle}-${last}` : `${formatted}${last}`
    }

    const first = rest.slice(0, 1)
    const middle = rest.slice(1, 5)
    const last = rest.slice(5, 9)
    return `${formatted}${first} ${middle}-${last}`.trim()
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
      setError('Por favor, preencha todos os campos obrigatórios.')
      setIsSubmitting(false)
      return
    }

    if (phoneDigits.length !== 10 && phoneDigits.length !== 11) {
      setError('Telefone em formato incorreto. Use (DDD) 9 XXXX-XXXX. O 9 adicional pode ser informado ou não.')
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('https://n8n.unadigital.dev/webhook/protegeindaiatuba', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: formData.nome,
          telefone: phoneDigits,
          telefoneFormatado: formData.telefone,
          email: formData.email || null,
          metragem: formData.metragem,
          cidade: formData.cidade,
          timestamp: new Date().toISOString(),
          source: 'website_protege_piso_indaiatuba'
        })
      })

      if (response.ok) {
        window.open(whatsappLink, '_blank')
        setIsSubmitted(true)
      } else {
        throw new Error('Erro ao enviar formulário')
      }
    } catch (err) {
      setError('Erro ao enviar formulário. Tente novamente.')
      console.error('Erro ao enviar formulário:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleWhatsApp = () => {
    window.open(whatsappLink, '_blank')
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

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-primary">
            {isSubmitted ? 'Orçamento Enviado!' : 'Solicitar Orçamento'}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-foreground mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-background text-foreground"
                  placeholder="Seu nome completo"
                  required
                />
              </div>

              <div>
                <label htmlFor="telefone" className="block text-sm font-medium text-foreground mb-2">
                  Telefone/WhatsApp *
                </label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-background text-foreground"
                  placeholder="(16) 9 9999-9999"
                  inputMode="numeric"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  E-mail (opcional)
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-background text-foreground"
                  placeholder="seuemail@exemplo.com"
                />
              </div>

              <div>
                <label htmlFor="cidade" className="block text-sm font-medium text-foreground mb-2">
                  Cidade *
                </label>
                <input
                  type="text"
                  id="cidade"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-background text-foreground"
                  placeholder="Informe sua cidade"
                  required
                />
              </div>

              <div>
                <label htmlFor="metragem" className="block text-sm font-medium text-foreground mb-2">
                  Metragem (m²) *
                </label>
                <input
                  type="number"
                  id="metragem"
                  name="metragem"
                  value={formData.metragem}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-background text-foreground"
                  placeholder="Ex: 100"
                  min="1"
                  required
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  'Solicitar Orçamento'
                )}
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
                <MessageCircle className="w-8 h-8 text-green-600" />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Orçamento enviado com sucesso!
                </h3>
                <p className="text-muted-foreground mb-4">
                  Recebemos sua solicitação e entraremos em contato em breve.
                </p>
              </div>

              <Button
                onClick={handleWhatsApp}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg"
              >
                <Phone className="w-4 h-4 mr-2" />
                Falar no WhatsApp
              </Button>

              <Button
                variant="outline"
                onClick={handleClose}
                className="w-full"
              >
                Fechar
              </Button>
            </div>
          )}
        </div>

        {/* Footer */}
        {!isSubmitted && (
          <div className="px-6 pb-6">
            <p className="text-xs text-muted-foreground text-center">
              Seus dados estão seguros e serão usados apenas para contato sobre o orçamento.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default QuoteModal





