import { useState } from 'react'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'

// Import gallery images
import constructionSite from '../assets/images/construction-site-protection.jpeg'
import heavyMachinery from '../assets/images/heavy-machinery-protection.jpeg'
import stairway from '../assets/images/stairway-protection.png'
import poolProtection from '../assets/images/pool-protection.png'
import rainTest from '../assets/images/rain-protection-test.jpeg'
import installationProcess from '../assets/images/installation-process.JPG'
import modularDetail from '../assets/images/modular-system-detail.jpg'
import galleryNew1 from '../assets/images/gallery-new-1.png'
import galleryNew2 from '../assets/images/gallery-new-2.jpg'

const Gallery = () => {
  const [currentImage, setCurrentImage] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const galleryImages = [
    {
      src: constructionSite,
      alt: 'Proteção em canteiro de obras'
    },
    {
      src: heavyMachinery,
      alt: 'Proteção durante uso de maquinário pesado'
    },
    {
      src: stairway,
      alt: 'Proteção em escadas'
    },
    {
      src: poolProtection,
      alt: 'Proteção em área de piscina'
    },
    {
      src: rainTest,
      alt: 'Teste de resistência à chuva'
    },
    {
      src: installationProcess,
      alt: 'Processo de instalação'
    },
    {
      src: modularDetail,
      alt: 'Detalhe do sistema modular'
    },
    {
      src: galleryNew1,
      alt: 'Proteção em ambiente residencial'
    },
    {
      src: galleryNew2,
      alt: 'Proteção em ambiente comercial'
    }
  ]

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  const openModal = (index) => {
    setCurrentImage(index)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <section id="galeria" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">
            Galeria
          </h2>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative bg-background rounded-lg shadow-lg overflow-hidden cursor-pointer hover-lift"
              onClick={() => openModal(index)}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Carousel for mobile */}
        <div className="md:hidden mt-8">
          <div className="relative">
            <div className="aspect-video rounded-lg overflow-hidden">
              <img
                src={galleryImages[currentImage].src}
                alt={galleryImages[currentImage].alt}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Mobile navigation */}
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            
            {/* Mobile dots */}
            <div className="flex justify-center mt-4 space-x-2">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentImage 
                      ? 'bg-primary' 
                      : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            
            {/* Image */}
            <div className="relative">
              <img
                src={galleryImages[currentImage].src}
                alt={galleryImages[currentImage].alt}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
              
              {/* Navigation */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Gallery

