import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'

import beforeAfterImage from '../assets/images/before-after-protection.jpg'
import galleryNewImage from '../assets/images/gallery-new-1.png'
import heroNewImage from '../assets/images/hero-new-image.png'
import banner3Video from '../assets/videos/banner3.mp4'

const HeroCarousel = ({ onRequestQuote }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [viewportHeight, setViewportHeight] = useState(() => (
    typeof window !== 'undefined' ? window.innerHeight : 0
  ))

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const updateViewportHeight = () => {
      setViewportHeight(window.innerHeight)
    }

    updateViewportHeight()

    window.addEventListener('resize', updateViewportHeight)
    window.addEventListener('orientationchange', updateViewportHeight)

    return () => {
      window.removeEventListener('resize', updateViewportHeight)
      window.removeEventListener('orientationchange', updateViewportHeight)
    }
  }, [])

  const allSlides = [
    {
      type: 'image',
      src: beforeAfterImage,
      alt: 'Before and after with Elo Protection floor covering',
      title: 'Elo Protection Orlando',
      subtitle: 'Premium surface protection that keeps every finish pristine across Central Florida.'
    },
    {
      type: 'image',
      src: heroNewImage,
      alt: 'Floor protection installed during construction',
      title: 'Professional Surface Protection',
      subtitle: 'Patented technology, rapid installation, proven performance.'
    },
    {
      type: 'video',
      src: banner3Video,
      alt: 'Complete protection system in action',
      title: 'Comprehensive Coverage',
      subtitle: 'From light traffic to heavy equipment — even flame-resistant.'
    },
    {
      type: 'image',
      src: galleryNewImage,
      alt: 'Protection in a commercial environment',
      title: 'Smart Investment',
      subtitle: 'Deliver flawless handovers and reduce punch-list repairs.'
    }
  ]

  const slides = isMobile ? allSlides.filter(slide => slide.type !== 'video') : allSlides

  useEffect(() => {
    if (currentSlide >= slides.length) {
      setCurrentSlide(0)
    }
  }, [slides.length, currentSlide])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 10000)

    return () => clearInterval(timer)
  }, [slides.length, currentSlide])

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
    <div
      className="relative w-full min-h-screen min-h-[100svh] md:h-screen overflow-hidden"
      style={{
        height: viewportHeight ? `${viewportHeight}px` : undefined,
        minHeight: viewportHeight ? `${viewportHeight}px` : undefined
      }}
    >
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

            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center text-white px-4 max-w-4xl">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            {slides[currentSlide].title}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 animate-fade-in-delay">
            {slides[currentSlide].subtitle}
          </p>
          <Button
            onClick={onRequestQuote}
            className="bg-green-600 hover:bg-green-700 text-white dark:text-primary font-bold px-6 py-3 sm:px-8 sm:py-4 rounded-full text-base sm:text-lg hover:scale-105 transition-transform duration-200"
          >
            REQUEST A QUOTE
          </Button>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

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
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide ? 'true' : 'false'}
          />
        ))}
      </div>
    </div>
  )
}

export default HeroCarousel
