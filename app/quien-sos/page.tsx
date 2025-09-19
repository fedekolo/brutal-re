"use client"
import { GeistMono } from "geist/font/mono"
import { useFormState } from "react-dom"
import { useFormStatus } from "react-dom"
import { submitContactForm } from "./actions"
import Link from "next/link"

function WhatsAppIcon({ size = 48, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
    </svg>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="border-2 border-neutral-500 bg-neutral-700 px-4 py-1 text-xs md:text-sm font-bold uppercase text-white shadow-[2px_2px_0px_0px_rgba(255,255,255,0.5)] transition-all hover:bg-neutral-600 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:cursor-not-allowed disabled:bg-neutral-800 disabled:text-neutral-500"
    >
      {pending ? "Enviando..." : "Enviar"}
    </button>
  )
}

export default function QuienSosPage() {
  const initialState = { message: null, error: null }
  const [state, dispatch] = useFormState(submitContactForm, initialState)

  return (
    <main
      className={`${GeistMono.className} custom-cursor flex h-screen w-full flex-col justify-center items-center bg-black p-4 text-neutral-200 overflow-hidden`}
    >
      <div className="w-[95%] h-[95%] max-w-none rounded-sm border-2 border-t-neutral-200 border-l-neutral-200 border-b-neutral-700 border-r-neutral-700 bg-neutral-800 shadow-2xl flex flex-col">
        {/* Window Title Bar */}
        <div className="flex items-center justify-between bg-[#FFD700] p-1 flex-shrink-0">
          <h1 className="px-2 text-xs md:text-sm font-bold uppercase text-black">NUEVO MENSAJE</h1>
          <Link
            href="/"
            className="flex h-4 w-4 items-center justify-center border-2 border-t-neutral-200 border-l-neutral-200 border-b-neutral-700 border-r-neutral-700 bg-neutral-800 text-xs md:text-sm font-bold text-white hover:bg-neutral-700 transition-colors"
          >
            ×
          </Link>
        </div>

        {/* Email Form */}
        <div className="p-3 flex-1 flex flex-col">
          <form action={dispatch} className="space-y-2 flex-1 flex flex-col">
            <div className="flex items-center border-b border-neutral-700 pb-1">
              <label htmlFor="to" className="w-16 text-xs md:text-sm font-bold uppercase text-neutral-400">
                PARA:
              </label>
              <p className="flex-1 text-xs md:text-sm text-white">BRUTAL</p>
            </div>
            <div className="flex items-center border-b border-neutral-700 pb-1">
              <label htmlFor="email" className="w-16 text-xs md:text-sm font-bold uppercase text-neutral-400">
                DE:
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full flex-1 bg-transparent text-xs md:text-sm text-white placeholder-neutral-500 focus:outline-none"
                placeholder="tu@email.com"
              />
            </div>
            <div className="flex items-center border-b border-neutral-700 pb-1">
              <label htmlFor="subject" className="w-16 text-xs md:text-sm font-bold uppercase text-neutral-400">
                ASUNTO:
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                className="w-full flex-1 bg-transparent text-xs md:text-sm text-white placeholder-neutral-500 focus:outline-none"
                placeholder="..."
              />
            </div>
            <textarea
              id="message"
              name="message"
              required
              className="w-full flex-1 bg-neutral-900 p-2 text-xs md:text-sm text-white placeholder-neutral-500 focus:outline-none resize-none"
              placeholder="TE INVITAMOS A ESCRIBIRNOS LO QUE QUIERAS, O A COMUNICARTE CON NOSOTROS USANDO EL LOGO DE WHATSAPP"
            />
            <div className="flex items-center justify-between pt-2">
              <SubmitButton />
              <a
                href="https://wa.me/5491173665149"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-full bg-transparent p-2 text-white transition-all duration-300 hover:bg-white/10 hover:scale-110"
              >
                <WhatsAppIcon size={32} className="text-white" />
              </a>
            </div>
            {state?.message && <p className="text-center text-xs md:text-sm text-[#FFD700]">{state.message}</p>}
            {state?.error && <p className="text-center text-xs md:text-sm text-red-500">{state.error}</p>}
          </form>
        </div>
      </div>
    </main>
  )
}
