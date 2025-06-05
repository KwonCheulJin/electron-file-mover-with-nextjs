"use client"

import { useState, useEffect } from "react"
import type { ElectronAPI } from "@/lib/types"

export function useElectron() {
  const [electronAPI, setElectronAPI] = useState<ElectronAPI | null>(null)
  const [isElectron, setIsElectron] = useState(false)

  useEffect(() => {
    // Electron 환경인지 확인
    if (typeof window !== "undefined" && window.electronAPI) {
      setElectronAPI(window.electronAPI)
      setIsElectron(true)
    }
  }, [])

  return { electronAPI, isElectron }
}
