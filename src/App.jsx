import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Menu, X, Sun, Moon, Phone, MessageCircle, Settings, Wrench, Shield, Hammer, Instagram, Facebook } from 'lucide-react'
import './App.css'

// Import components
import HeroCarousel from './components/HeroCarousel'
import ResistanceSection from './components/ResistanceSection'
import Gallery from './components/Gallery'
import QuoteModal from './components/QuoteModal'
import ChatWidget from './components/ChatWidget'

// Import hooks
import { useScrollAnimation, useStaggerAnimation } from './hooks/useScrollAnimation'

// Import assets
import logoMain from './assets/images/logo_protegepiso-1(1).png'
import logoWithSite from './assets/images/logo+site.png'
import installationImage from './assets/images/installation-process.JPG'
import modularImage from './assets/images/modular-system-detail.jpg'
import comoFuncionaVideo from './assets/videos/comofunciona.mp4'

function App() {
  const [isDark, setIsDark] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)

  // Animation hooks
  const [aboutRef, aboutVisible] = useScrollAnimation(0.2)
  const [howItWorksRef, howItWorksVisible] = useScrollAnimation(0.2)
  const [benefitsRef, benefitsVisible] = useScrollAnimation(0.2)
  const [setStaggerRef, visibleStaggerItems] = useStaggerAnimation(4, 150)

  // Theme detection and management
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDark(prefersDark)
    document.documentElement.classList.toggle('dark', prefersDark)
  }, [])

  // Header scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false)
      } else {
        setIsHeaderVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    document.documentElement.classList.toggle('dark', newTheme)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const handleRequestQuote = () => {
    setIsQuoteModalOpen(true)
  }

  const menuItems = [
    { id: 'home', label: 'Início' },
    { id: 'sobre', label: 'Sobre' },
    { id: 'como-funciona', label: 'Como Funciona' },
    { id: 'resistencia', label: 'Desafios da Obra' },
    { id: 'galeria', label: 'Galeria' },
    { id: 'orcamento', label: 'Orçamento' }
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border transition-transform duration-300 ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img 
              src={logoMain} 
              alt="Protege Piso" 
              className="h-10 w-auto"
            />
            <span className="font-bold text-xl text-primary hidden sm:block">
              Indaiatuba-SP
            </span>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center space-x-6">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center space-x-2">
            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {/* CTA Button */}
            <Button 
              onClick={handleRequestQuote}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-full hidden sm:flex btn-interactive ripple magnetic glow-effect"
            >
              SOLICITAR ORÇAMENTO
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="lg:hidden rounded-full"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-background border-t border-border">
            <nav className="container mx-auto px-4 py-4 space-y-4">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left text-foreground hover:text-primary transition-colors duration-200 font-medium py-2"
                >
                  {item.label}
                </button>
              ))}
              <Button 
                onClick={handleRequestQuote}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-full mt-4"
              >
                SOLICITAR ORÇAMENTO
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-0">
        {/* Hero Section with Carousel */}
        <section id="home">
          <HeroCarousel onRequestQuote={handleRequestQuote} />
        </section>

        {/* Sobre Section */}
        <section id="sobre" className="py-20 bg-background">
          <div className="container mx-auto px-4 text-center">
            <div 
              ref={aboutRef}
              className={`transition-all duration-1000 ${
                aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">
                Sobre Nós
              </h2>
              <div className="max-w-4xl mx-auto">
                <p className="text-lg text-muted-foreground mb-6">
                  A Protege Piso é líder nacional em proteção de pisos, escadas, bancadas durante obras. Agora, Indaiatuba e região Sul de Campinas contam com uma unidade exclusiva para atender o dinâmico mercado da construção civil. Oferecemos uma solução patenteada, sem concorrência direta, de alta resistência, que garante proteção mecânica ao seu piso.
                </p>
                
                {/* Key benefits */}

                <div 
                  ref={benefitsRef}
                  className="grid gap-6 mt-12 md:grid-cols-2 lg:grid-cols-4"
                >
                  <div 
                    ref={setStaggerRef(0)}
                    className={`bg-muted/50 p-6 rounded-lg card-hover transition-all duration-700 ${
                      visibleStaggerItems.has(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                  >
                    <Shield className="w-12 h-12 text-green-600 mx-auto mb-4 float-animation" />
                    <h3 className="font-semibold mb-2">Produto Patenteado</h3>
                    <p className="text-sm text-muted-foreground">Tecnologia exclusiva sem concorrência direta</p>
                  </div>
                  <div 
                    ref={setStaggerRef(1)}
                    className={`bg-muted/50 p-6 rounded-lg card-hover transition-all duration-700 ${
                      visibleStaggerItems.has(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                  >
                    <Hammer className="w-12 h-12 text-green-600 mx-auto mb-4 float-animation" style={{ animationDelay: '0.3s' }} />
                    <h3 className="font-semibold mb-2">Fácil Instalação</h3>
                    <p className="text-sm text-muted-foreground">Instalação simples com proteção imediata para todos os tipos de piso.</p>
                  </div>
                  <div 
                    ref={setStaggerRef(2)}
                    className={`bg-muted/50 p-6 rounded-lg card-hover transition-all duration-700 ${
                      visibleStaggerItems.has(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                  >
                    <Settings className="w-12 h-12 text-green-600 mx-auto mb-4 float-animation" style={{ animationDelay: '0.6s' }} />
                    <h3 className="font-semibold mb-2">Alta Resistência</h3>
                    <p className="text-sm text-muted-foreground">– Material durável e reutilizável</p>
                  </div>
                  <div 
                    ref={setStaggerRef(3)}
                    className={`bg-muted/50 p-6 rounded-lg card-hover transition-all duration-700 ${
                      visibleStaggerItems.has(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                  >
                    <Wrench className="w-12 h-12 text-green-600 mx-auto mb-4 float-animation" style={{ animationDelay: '0.9s' }} />
                    <h3 className="font-semibold mb-2">Atendimento Local</h3>
                    <p className="text-sm text-muted-foreground">Unidade exclusiva em Indaiatuba</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Como Funciona Section */}
        <section id="como-funciona" className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div 
              ref={howItWorksRef}
              className={`text-center mb-12 transition-all duration-1000 ${
                howItWorksVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">
                Como Funciona
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Um processo completo e profissional para garantir a proteção total da sua obra
              </p>
            </div>
            
            {/* Video */}
            <div className={`max-w-4xl mx-auto mb-16 transition-all duration-1000 ${
              howItWorksVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}>
              <div className="relative rounded-lg overflow-hidden shadow-2xl">
                <video
                  src={comoFuncionaVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Process Steps */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className={`text-center transition-all duration-700 delay-100 ${
                howItWorksVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 glow-effect">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-primary">Visita Técnica</h3>
                <p className="text-muted-foreground">
                  Vamos até a sua obra para avaliar as necessidades específicas e planejar a melhor solução de proteção
                </p>
              </div>

              <div className={`text-center transition-all duration-700 delay-200 ${
                howItWorksVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 glow-effect">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-primary">Instalação Profissional</h3>
                <p className="text-muted-foreground">
                  Nossa equipe especializada realiza a instalação completa do sistema de proteção de forma rápida e eficiente
                </p>
              </div>

              <div className={`text-center transition-all duration-700 delay-300 ${
                howItWorksVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 glow-effect">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-primary">Acompanhamento</h3>
                <p className="text-muted-foreground">
                  Realizamos visitas periódicas para verificar o estado da proteção e garantir que tudo esteja funcionando perfeitamente
                </p>
              </div>

              <div className={`text-center transition-all duration-700 delay-400 ${
                howItWorksVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 glow-effect">
                  <span className="text-white font-bold text-xl">4</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-primary">Retirada Limpa</h3>
                <p className="text-muted-foreground">
                  Ao final da obra, removemos todo o sistema de proteção, deixando seu piso preservado.
                </p>
              </div>
            </div>

            <div className={`text-center mt-12 transition-all duration-700 delay-500 ${
              howItWorksVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <Button 
                onClick={handleRequestQuote}
                className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-full text-lg btn-pulse btn-interactive ripple magnetic glow-effect"
              >
                Solicite uma Visita Técnica Gratuita em Indaiatuba
              </Button>
            </div>
          </div>
        </section>

        {/* O que Resiste Section */}
        <ResistanceSection />

        {/* Galeria Section */}
        <Gallery />

        {/* Orçamento Section */}
        <section id="orcamento" className="py-20 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">
              Solicite seu Orçamento
            </h2>
            <div className="max-w-2xl mx-auto mb-8">
              <p className="text-lg text-muted-foreground mb-4">
                Proteja seu investimento e evite prejuízos durante a obra
              </p>
              <p className="text-green-600 font-semibold">
                Atendimento exclusivo na cidade. Garanta sua obra protegida agora.
              </p>
            </div>
            <Button 
              onClick={handleRequestQuote}
              className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-full text-lg btn-pulse btn-interactive ripple magnetic glow-effect"
            >
              SOLICITAR ORÇAMENTO
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4 text-center">
          <img 
            src={logoWithSite} 
            alt="Protege Piso" 
            className="h-16 w-auto mx-auto mb-6"
          />
          
          {/* Social Media Buttons */}
          <div className="flex justify-center space-x-4 mb-6">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-primary-foreground hover:text-green-200 btn-interactive"
              onClick={() => window.open('https://wa.me/5519999340914', '_blank')}
              title="WhatsApp"
            >
              <MessageCircle className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-primary-foreground hover:text-green-200 btn-interactive"
              onClick={() => window.open('tel:+5519999340914', '_blank')}
              title="Telefone"
            >
              <Phone className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-primary-foreground hover:text-green-200 btn-interactive"
              onClick={() => window.open('https://instagram.com/protegepisoindaiatuba', '_blank')}
              title="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-primary-foreground hover:text-green-200 btn-interactive"
              onClick={() => window.open('https://facebook.com/protegepisoindaiatuba', '_blank')}
              title="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Franchise Information */}
          <div className="mb-4">
            <p className="text-sm opacity-90 mb-2">
              Franquia autorizada da rede nacional
            </p>
            <a 
              href="https://www.protegepiso.com.br" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-green-200 hover:text-green-100 font-semibold transition-colors"
            >
              www.protegepiso.com.br
            </a>
          </div>
          
          <p className="text-sm opacity-80">
            © 2024 Protege Piso Indaiatuba. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      {/* Quote Modal */}
      <QuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
      />

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  )
}

export default App


