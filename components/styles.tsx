"use client"

import { useTheme } from "next-themes"

export function BackgroundGrid() {
  const { theme } = useTheme()

  return (
    <>
      <style jsx global>{`
        .background-grid {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: radial-gradient(${theme === "dark" ? "#333" : "#b5b5b5"} 1px, ${theme === "dark" ? "#000" : "#fff"} 1px);
          background-size: 2rem 2rem;
          z-index: -1;
          animation: moveGrid 4s linear infinite;
          transition: background-position-x 400ms, background-image 300ms;
        }

        @keyframes moveGrid {
          0% {
            background-position: 0 0;
          }

          100% {
            background-position: 2rem 2rem;
          }
        }

        .background-grid:hover {
          background-position-x: 2rem;
        }
      `}</style>
      <div className="background-grid" />
    </>
  )
}

