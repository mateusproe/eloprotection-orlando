import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Menu, X, Sun, Moon, Phone, MessageCircle, Settings, Wrench, Shield, Hammer, Instagram, Linkedin } from 'lucide-react'
import './App.css'

import HeroCarousel from './components/HeroCarousel'
import ResistanceSection from './components/ResistanceSection'
import Gallery from './components/Gallery'
import QuoteModal from './components/QuoteModal'
import ChatWidget from './components/ChatWidget'

import { useScrollAnimation, useStaggerAnimation } from './hooks/useScrollAnimation'

import logoMain from './assets/images/logo_protegepiso-1(1).png'
import logoWithSite from './assets/images/logo+site.png'
import comoFuncionaVideo from './assets/videos/comofunciona.mp4'

function App() {
  const [isDark, setIsDark] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)

  const [aboutRef, aboutVisible] = useScrollAnimation(0.2)
  const [howItWorksRef, howItWorksVisible] = useScrollAnimation(0.2)
  const [benefitsRef] = useScrollAnimation(0.2)
  const [setStaggerRef, visibleStaggerItems] = useStaggerAnimation(4, 150)

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDark(prefersDark)
    document.documentElement.classList.toggle('dark', prefersDark)
  }, [])

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
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'site-challenges', label: 'Jobsite Challenges' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'quote', label: 'Request a Quote' }
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className={`fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border transition-transform duration-300 ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img
              src={logoMain}
              alt="Elo Protection"
              className="h-10 w-auto"
            />
            <span className="font-bold text-xl hidden sm:block title-orlando">
              Orlando
            </span>
          </div>

          <nav className="hidden lg:flex items-center space-x-6" aria-label="Primary navigation">
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

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <Button
              onClick={handleRequestQuote}
              className="bg-green-600 hover:bg-green-700 text-white dark:text-primary font-semibold px-6 py-2 rounded-full hidden sm:flex btn-interactive ripple magnetic glow-effect"
            >
              REQUEST A QUOTE
            </Button>

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

        {isMenuOpen && (
          <div className="lg:hidden bg-background border-t border-border">
            <nav className="container mx-auto px-4 py-4 space-y-4" aria-label="Mobile primary navigation">
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
                className="w-full bg-green-600 hover:bg-green-700 text-white dark:text-primary font-semibold py-3 rounded-full mt-4"
              >
                REQUEST A QUOTE
              </Button>
            </nav>
          </div>
        )}
      </header>

      <main className="pt-0">
        <section id="home">
          <HeroCarousel onRequestQuote={handleRequestQuote} />
        </section>

        <section id="about" className="py-20 bg-background">
          <div className="container mx-auto px-4 text-center">
            <div
              ref={aboutRef}
              className={`transition-all duration-1000 ${
                aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">
                About Elo Protection Orlando
              </h2>
              <div className="max-w-4xl mx-auto">
                <p className="text-lg text-muted-foreground mb-6">
                  Elo Protection Orlando safeguards floors, stairs, countertops, and vertical finishes during construction and remodeling across Central Florida. Backed by the national Elo Protection network, our local specialists deploy the patented panel system that keeps every sensitive surface flawless from day one to turn-over.
                </p>

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
                    <h3 className="font-semibold mb-2">Patented Solution</h3>
                    <p className="text-sm text-muted-foreground">Exclusive technology with no direct competitor.</p>
                  </div>
                  <div
                    ref={setStaggerRef(1)}
                    className={`bg-muted/50 p-6 rounded-lg card-hover transition-all duration-700 ${
                      visibleStaggerItems.has(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                  >
                    <Hammer className="w-12 h-12 text-green-600 mx-auto mb-4 float-animation" style={{ animationDelay: '0.3s' }} />
                    <h3 className="font-semibold mb-2">Fast Installation</h3>
                    <p className="text-sm text-muted-foreground">Immediate protection for any type of surface.</p>
                  </div>
                  <div
                    ref={setStaggerRef(2)}
                    className={`bg-muted/50 p-6 rounded-lg card-hover transition-all duration-700 ${
                      visibleStaggerItems.has(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                  >
                    <Settings className="w-12 h-12 text-green-600 mx-auto mb-4 float-animation" style={{ animationDelay: '0.6s' }} />
                    <h3 className="font-semibold mb-2">Heavy-Duty Performance</h3>
                    <p className="text-sm text-muted-foreground">Durable, reusable panels engineered for intense projects.</p>
                  </div>
                  <div
                    ref={setStaggerRef(3)}
                    className={`bg-muted/50 p-6 rounded-lg card-hover transition-all duration-700 ${
                      visibleStaggerItems.has(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                  >
                    <Wrench className="w-12 h-12 text-green-600 mx-auto mb-4 float-animation" style={{ animationDelay: '0.9s' }} />
                    <h3 className="font-semibold mb-2">Local Support</h3>
                    <p className="text-sm text-muted-foreground">Orlando-based crew ready for residential, commercial, and themed environments.</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div
              ref={howItWorksRef}
              className={`text-center mb-12 transition-all duration-1000 ${
                howItWorksVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">
                How It Works
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                A complete, professional process that keeps your project protected from the first visit to the final delivery.
              </p>
            </div>

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

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className={`text-center transition-all duration-700 delay-100 ${
                howItWorksVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 glow-effect">
                  <span className="text-white dark:text-primary font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-primary">Technical Site Visit</h3>
                <p className="text-muted-foreground">
                  We walk your site to map every finish and design the ideal protection plan.
                </p>
              </div>

              <div className={`text-center transition-all duration-700 delay-200 ${
                howItWorksVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 glow-effect">
                  <span className="text-white dark:text-primary font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-primary">Professional Installation</h3>
                <p className="text-muted-foreground">
                  Our trained crew installs the full protection system quickly and efficiently.
                </p>
              </div>

              <div className={`text-center transition-all duration-700 delay-300 ${
                howItWorksVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 glow-effect">
                  <span className="text-white dark:text-primary font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-primary">Ongoing Support</h3>
                <p className="text-muted-foreground">
                  We schedule follow-up visits to confirm the surfaces remain protected throughout the work.
                </p>
              </div>

              <div className={`text-center transition-all duration-700 delay-400 ${
                howItWorksVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 glow-effect">
                  <span className="text-white dark:text-primary font-bold text-xl">4</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-primary">Clean Removal</h3>
                <p className="text-muted-foreground">
                  When the project is complete, we remove the system and hand over immaculate surfaces.
                </p>
              </div>
            </div>

            <div className={`text-center mt-12 transition-all duration-700 delay-500 ${
              howItWorksVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <Button
                onClick={handleRequestQuote}
                className="bg-green-600 hover:bg-green-700 text-white dark:text-primary font-bold px-8 py-6 sm:py-5 md:py-4 rounded-full text-lg leading-snug btn-pulse btn-interactive ripple magnetic glow-effect flex-col sm:flex-row sm:items-center sm:space-x-2"
              >
                <span className="block sm:inline">Book a Free Site Assessment</span>
                <span className="block sm:inline">with the Elo Protection Orlando team</span>
              </Button>
            </div>
          </div>
        </section>

        <ResistanceSection />

        <Gallery />

        <section id="quote" className="py-20 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">
              Request Your Quote
            </h2>
            <div className="max-w-2xl mx-auto mb-8">
              <p className="text-lg text-muted-foreground mb-4">
                Protect your investment and avoid costly rework during construction.
              </p>
              <p className="text-green-600 font-semibold">
                Partner with Elo Protection Orlando to deliver immaculate handovers across Central Florida.
              </p>
            </div>
            <Button
              onClick={handleRequestQuote}
              className="bg-green-600 hover:bg-green-700 text-white dark:text-primary font-bold px-8 py-4 rounded-full text-lg btn-pulse btn-interactive ripple magnetic glow-effect"
            >
              REQUEST A QUOTE
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4 text-center">
          <img
            src={logoWithSite}
            alt="Elo Protection"
            className="h-16 w-auto mx-auto mb-6"
          />

          <div className="flex justify-center space-x-4 mb-6">
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:text-secondary btn-interactive"
              onClick={() => window.open('https://eloprotection.com/contact', '_blank')}
              title="Contact"
            >
              <MessageCircle className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:text-secondary btn-interactive"
              onClick={() => window.open('tel:+15595133708')}
              title="Call Elo Protection Orlando"
            >
              <Phone className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:text-secondary btn-interactive"
              onClick={() => window.open('https://www.instagram.com/eloprotection', '_blank')}
              title="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:text-secondary btn-interactive"
              onClick={() => window.open('https://linkedin.com/company/108671925', '_blank')}
              title="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </Button>
          </div>

          <div className="mb-4">
            <p className="text-sm opacity-90 mb-2">
              Authorized location within the Elo Protection network
            </p>
            <a
              href="https://eloprotection.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary font-semibold transition-opacity hover:opacity-80"
            >
              eloprotection.com
            </a>
          </div>

          <p className="text-sm opacity-80">
            Copyright 2024 Elo Protection Orlando. All rights reserved.
          </p>
        </div>
      </footer>

      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />

      <ChatWidget />
    </div>
  )
}

export default App
