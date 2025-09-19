"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { GeistMono } from "geist/font/mono"
import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"

// Array de medios de fondo (mismo que en index)
const backgroundMedia = [
  { type: "video", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202025-07-14%20at%2020.33.29-3eQWRnbirU7QTwmau7VL5ZbOEEi9RL.mp4", alt: "Video en primer plano de una boca" },
  { type: "video", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/migue-UTf23fixdtZoLm1x89DAYNE0XF1qQW.mp4", alt: "Video de Migue" },
  { type: "video", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202025-07-14%20at%2020.33.11-KCFqWCqO51get0tMcOOETD7Etlfjsb.mp4", alt: "Video en primer plano de una oreja" },
  { type: "video", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sequence%2002_1-SBaFel5R0bw1RuQoWeIPoKQWYliR51.mp4", alt: "Video de secuencia 02" },
  { type: "video", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Artifact%20Outro%20Final%20%28Vertical%29%20-%20Brutal0001-0196-D8QrMREet5RgVDKN9VmUEpp0ms9roS.mp4", alt: "Animación de outro de BRUTAL" },
]

// Array de perfiles falsos para mostrar
const fakeProfiles = [
  { src: "/assets/fake-profiles/supermasivo.jpeg", alt: "Perfil falso supermasivo" },
  { src: "/assets/fake-profiles/miedo-morgan.jpeg", alt: "Perfil falso miedo_morgan" },
  { src: "/assets/fake-profiles/neonpunk.jpeg", alt: "Perfil falso neonpunk_" },
  { src: "/assets/fake-profiles/lalo-tv.jpeg", alt: "Perfil falso lalo.tv" },
  { src: "/assets/fake-profiles/magdalaga.jpeg", alt: "Perfil falso magdalaga" },
  { src: "/assets/fake-profiles/sexi-lucila.jpeg", alt: "Perfil falso Sexi_Lucila" },
]

function NarrativeSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 40 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`relative flex min-h-screen w-full items-center justify-center p-8 ${className}`}
    >
      {children}
    </motion.div>
  )
}

function VideoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % backgroundMedia.length)
    }, 1500)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const videoElement = videoRefs.current[currentIndex]
    if (videoElement) {
      const playFromRandomPoint = async () => {
        try {
          if (videoElement.duration && videoElement.isConnected) {
            videoElement.currentTime = Math.random() * videoElement.duration
            await videoElement.play()
          }
        } catch (error) {
          if (error.name !== "AbortError" && error.name !== "NotAllowedError") {
            console.error("Error al intentar reproducir:", error)
          }
        }
      }

      if (videoElement.readyState >= 2) {
        playFromRandomPoint()
      } else {
        videoElement.onloadeddata = playFromRandomPoint
      }

      return () => {
        if (videoElement && videoElement.isConnected) {
          videoElement.pause()
          videoElement.onloadeddata = null
        }
      }
    }
  }, [currentIndex])

  return (
    <div className="absolute inset-0 z-0">
      {backgroundMedia.map((media, index) => {
        const isActive = index === currentIndex
        return (
          <video
            key={media.src}
            ref={(el) => (videoRefs.current[index] = el)}
            src={media.src}
            loop
            muted
            playsInline
            className={`absolute h-full w-full object-cover transition-opacity duration-500 ease-in-out ${
              isActive ? "opacity-40" : "opacity-0"
            }`}
          />
        )
      })}
    </div>
  )
}

function ScrollingProfilesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  return (
    <div ref={ref} className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black">
      {/* Texto centrado con efecto de titileo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="z-20 flex w-full items-center justify-center p-8"
      >
        <div className="text-center">
          <p className="text-3xl font-bold uppercase leading-tight md:text-6xl animate-flicker text-white">
            VIVIMOS RODEADOS DE CONTENIDO
            <br />
            PREFABRICADO. PLÁSTICO DIGITAL.
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default function QuienesSomosNolanPage() {
  return (
    <main className={`${GeistMono.className} custom-cursor w-full bg-black text-neutral-300`}>
      {/* --- BOOT SEQUENCE CON TEXTO EN EL PISO --- */}
      <div className="relative flex h-screen w-full items-center justify-center overflow-hidden">
        <Image
          src="/assets/luz-produccion.jpeg"
          alt="Luz de producción cinematográfica"
          fill
          className="absolute left-0 top-0 h-full w-full object-cover opacity-60"
        />

        {/* Texto en la parte inferior */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 max-w-4xl p-8 text-center"
        >
          <p className="text-2xl uppercase leading-relaxed md:text-4xl color-difference-text">
            <span className="hidden md:inline">
              TRANSFORMAMOS IDEAS
              <br />
              EN PRODUCCIONES DE IMPACTO
            </span>
            <span className="md:hidden">
              TRANSFORMAMOS
              <br />
              IDEAS EN
              <br />
              PRODUCCIONES DE IMPACTO
            </span>
          </p>
        </motion.div>
      </div>

      {/* --- PROTOCOL OVERRIDE --- */}
      <NarrativeSection className="bg-black">
        <div className="text-center">
          <Image
            src="/assets/logo-brutal-sin-fondo.png"
            alt="Logo de BRUTAL"
            width={450}
            height={178}
            className="mx-auto my-8 h-auto w-full max-w-md"
          />
        </div>
      </NarrativeSection>

      {/* --- EVIDENCE TRIPTYCH --- */}
      <div className="flex h-screen w-full">
        <div className="relative w-1/2 border-r-2 border-[#FFD700]/20">
          <Image src="/assets/equipo-rodaje.jpeg" alt="Equipo de BRUTAL en rodaje" fill className="object-cover" />
        </div>
        <div className="relative w-1/2 border-r-2 border-[#FFD700]/20">
          <Image
            src="/assets/camiseta-brutal.jpeg"
            alt="Miembro del equipo con camiseta de BRUTAL"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* --- SCROLLING PROFILES SECTION --- */}
      <ScrollingProfilesSection />

      {/* --- INITIATE IMPACT --- */}
      <div className="relative flex h-screen w-full items-center justify-center overflow-hidden">
        <VideoCarousel />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="z-20 w-full max-w-6xl p-4 text-center"
        >
          <p className="text-lg uppercase leading-tight sm:text-2xl md:text-4xl lg:whitespace-nowrap">
            NOS NEGAMOS A ACEPTAR ESA REALIDAD
          </p>
        </motion.div>
      </div>

      {/* --- FINAL SECTION CON BOTÓN VOLVER --- */}
      <div className="flex min-h-screen w-full items-center justify-center bg-black p-8">
        <Link
          href="/"
          className="border-2 border-[#FFD700] bg-black px-6 py-2 font-bold uppercase text-[#FFD700] transition-colors duration-150 hover:bg-[#FFD700] hover:text-black"
        >
          Volver
        </Link>
      </div>
    </main>
  )
}
