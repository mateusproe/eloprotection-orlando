import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'

// Import assets
import beforeAfterImage from '../assets/images/before-after-protection.png'
import galleryNewImage from '../assets/images/gallery-new-1.png'
import heroNewImage from '../assets/images/hero-new-image.png'
import banner3Video from '../assets/videos/banner3.mp4'

const HeroCarousel = ({ onRequestQuote }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const allSlides = [
    {
      type: 'image',
      src: beforeAfterImage,
      alt: 'Antes e depois da proteção Protege Piso',
      title: 'Protege Piso chegou em Indaiatuba e Região',
      subtitle: 'A proteção inovadora para sua obra.'
    },
    {
      type: 'image',
      src: heroNewImage,
      alt: 'Proteção de piso em obra',
      title: 'Proteção Profissional',
      subtitle: 'Tecnologia patenteada, rápida instalação e efetividade na proteção.'
    },
    {
      type: 'video',
      src: banner3Video,
      alt: 'Proteção completa em ação',
      title: 'A proteção completa:',
      subtitle: 'De leve a pesado – resistente a chamas.'
    },
    {
      type: 'image',
      src: galleryNewImage,
      alt: 'Proteção em ambiente comercial',
      title: 'Investimento inteligente:',
      subtitle: 'Pisos perfeitos ao final da sua obra.'
    }
  ]

  // Filter out video on mobile
  const slides = isMobile ? allSlides.filter(slide => slide.type !== 'video') : allSlides

  // Reset current slide when slides array changes (mobile/desktop switch)
  useEffect(() => {
    if (currentSlide >= slides.length) {
      setCurrentSlide(0)
    }
  }, [slides.length, currentSlide])

  // Auto-advance slides every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 10000)

    return () => clearInterval(timer)
  }, [slides.length, currentSlide]) // Reset timer when currentSlide changes

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {slide.type === 'image' ? (
              <img
                src={slide.src}
                alt={slide.alt}
                className="w-full h-full object-cover"
              />
            ) : (
              <video
                src={slide.src}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            )}
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center text-white px-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            {slides[currentSlide].title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-fade-in-delay">
            {slides[currentSlide].subtitle}
          </p>
          <Button 
            onClick={onRequestQuote}
            className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-full text-lg hover:scale-105 transition-transform duration-200"
          >
            Solicitar Orçamento
          </Button>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide 
                ? 'bg-white' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default HeroCarousel



