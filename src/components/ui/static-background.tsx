'use client'

interface StaticBackgroundProps {
  children?: React.ReactNode
}

export function StaticBackground({ children }: StaticBackgroundProps) {
  return (
    <div className="relative min-h-screen">
      {/* Logo estática no fundo */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <div className="central-logo-global">
          <div className="logo-glow-subtle opacity-30">
            <svg
              width="200"
              height="200"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-cyan-400/20"
            >
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="currentColor"
                className="opacity-60"
              />
              <circle
                cx="100"
                cy="100"
                r="50"
                fill="currentColor"
                className="opacity-80"
              />
              <circle
                cx="100"
                cy="100"
                r="25"
                fill="currentColor"
                className="opacity-100"
              />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Conteúdo principal */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
} 