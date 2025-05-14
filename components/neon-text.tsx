import type React from "react"
interface NeonTextProps {
  children: React.ReactNode
  color?: string
  className?: string
}

export function NeonText({ children, color = "#ff00ff", className = "" }: NeonTextProps) {
  return (
    <span
      className={`font-bold ${className}`}
      style={{
        color: color,
        textShadow: `0 0 5px ${color}, 0 0 10px ${color}, 0 0 20px ${color}, 0 0 30px ${color}`,
      }}
    >
      {children}
    </span>
  )
}
