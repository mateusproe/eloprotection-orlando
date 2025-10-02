import { useState, useRef, useEffect } from 'react'
import { Play, Pause, CloudRain, Truck, Flame, HardHat } from 'lucide-react'

// Import resistance videos
import rainVideo from '../assets/videos/rain-resistance-1920x1080.mp4'
import heavyMachineryVideo from '../assets/videos/heavy-machinery-1920x1080.mp4'
import fireVideo from '../assets/videos/fire-resistance-1920x1080.mp4'
import heavyWorkVideo from '../assets/videos/heavy-work-1920x1080.mp4'

const ResistanceSection = () => {
  const [currentVideo, setCurrentVideo] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const videoRefs = useRef([])

  const resistanceTests = [
    {
      video: rainVideo,
      title: 'Resistência à Chuva',
      description: '100% impermeável',
      icon: CloudRain
    },
    {
      video: heavyMachineryVideo,
      title: 'Maquinário Pesado',
      description: 'Suporta equipamentos industriais',
      icon: Truck
    },
    {
      video: fireVideo,
      title: 'Resistência ao Fogo',
      description: 'Material ignífugo',
      icon: Flame
    },
    {
      video: heavyWorkVideo,
      title: 'Obra Pesada',
      description: 'Resistente a impactos',
      icon: HardHat
    }
  ]

  // Auto-advance videos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % resistanceTests.length)
    }, 8000)

    return () => clearInterval(timer)
  }, [resistanceTests.length])

  // Handle video play/pause
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentVideo) {
          video.play()
          setIsPlaying(true)
        } else {
          video.pause()
        }
      }
    })
  }, [currentVideo])

  const togglePlayPause = () => {
    const currentVideoElement = videoRefs.current[currentVideo]
    if (currentVideoElement) {
      if (isPlaying) {
        currentVideoElement.pause()
        setIsPlaying(false)
      } else {
        currentVideoElement.play()
        setIsPlaying(true)
      }
    }
  }

  return (
    <section id="resistencia" className="py-20 bg-background relative overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        {resistanceTests.map((test, index) => (
          <video
            key={index}
            ref={(el) => (videoRefs.current[index] = el)}
            src={test.video}
            muted
            loop
            autoPlay
            playsInline
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentVideo ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ pointerEvents: 'none' }}
          />
        ))}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Desafios da Obra
          </h2>
          <div className="text-xl md:text-2xl text-white font-semibold mb-8">
            <p className="mb-2">Os desafios de sua obra que impactam no seu piso, a gente protege!</p>
          </div>
        </div>

        {/* Video controls - Hidden on mobile */}
        <div className="hidden md:flex justify-center mb-8">
          <button
            onClick={togglePlayPause}
            className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>
        </div>

        {/* Resistance cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 max-w-3xl mx-auto">
          {resistanceTests.map((test, index) => {
            const Icon = test.icon
            return (
              <div
                key={index}
                onClick={() => setCurrentVideo(index)}
                className={`bg-black/30 backdrop-blur-sm p-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-black/40 ${
                  index === currentVideo
                    ? 'ring-2 ring-green-400 bg-black/45'
                    : ''
                }`}
              >
                <div className="text-center">
                  <div className="mb-2">
                    <Icon className="w-8 h-8 text-green-400 mx-auto" />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1">
                    {test.title}
                  </h3>
                  <p className="text-xs text-gray-300">
                    {test.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {resistanceTests.map((_, index) => (
            <div
              key={index}
              className={`h-1 w-12 rounded-full transition-all duration-300 ${
                index === currentVideo 
                  ? 'bg-green-400' 
                  : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ResistanceSection

