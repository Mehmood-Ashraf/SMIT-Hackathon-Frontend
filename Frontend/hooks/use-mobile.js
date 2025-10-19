"use client"

import { useEffect, useState } from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(undefined)

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = (e) => {
      setIsMobile(e.matches)
    }
    mq.addEventListener("change", onChange)
    setIsMobile(mq.matches)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
