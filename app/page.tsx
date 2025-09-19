"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { GeistMono } from "geist/font/mono"
import Link from "next/link"

export default function BrutalPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const videoElement = videoRef.current
    if (videoElement) {
      const playFromRandomPoint = async () => {
        try {
          if (videoElement.duration && videoElement.isConnected) {
            // Establecer un punto aleatorio de inicio
            videoElement.currentTime = Math.random() * videoElement.duration
            await videoElement.play()
          }
        } catch (error) {
          console.error("Error al intentar reproducir el video:", error)
        }
      }

      if (videoElement.readyState >= 2) {
        // HAVE_CURRENT_DATA
        playFromRandomPoint()
      } else {
        videoElement.onloadeddata = playFromRandomPoint
      }

      // Cleanup function
      return () => {
        if (videoElement && videoElement.isConnected) {
          videoElement.onloadeddata = null
        }
      }
    }
  }, [])

  return (
    <main className={`${GeistMono.className} custom-cursor relative h-screen w-full overflow-hidden bg-black`}>
      {/* Video de fondo único */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9_17_1-LGHrEO0AeRAWy8LpQPi4o3DWDolORV.mp4"
          loop
          muted
          playsInline
          className="absolute h-full w-full object-cover"
        />
      </div>

      {/* Logo pegado al borde superior */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-10">
        <Image
          src="/assets/brutal-logo-nuevo.png"
          alt="Logo de BRUTAL"
          width={96}
          height={96}
          className="h-auto w-auto max-w-[96px]"
          priority
        />
      </div>

      {/* Botones pegados a la parte inferior */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex gap-2">
        <Link
          href="/quienes-somos"
          className="border-2 border-[#FFD700] bg-[#FFD700] px-4 py-2 text-center text-xs font-bold uppercase text-black transition-colors duration-150 hover:bg-black hover:text-[#FFD700] whitespace-nowrap sm:text-sm"
        >
          Quiénes somos
        </Link>
        <Link
          href="/quien-sos"
          className="border-2 border-[#FFD700] bg-black px-4 py-2 text-center text-xs font-bold uppercase text-[#FFD700] transition-colors duration-150 hover:bg-[#FFD700] hover:text-black whitespace-nowrap sm:text-sm"
        >
          Contacto
        </Link>
      </div>
    </main>
  )
}
