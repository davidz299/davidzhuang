import { useState, useEffect } from 'react'
import { useKBar } from 'kbar'
import { ButtonPrimary } from '../components/ButtonPrimary'
import Image from 'next/image'

export default function ShortcutHome() {
  const { query } = useKBar()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (mounted) {
    const isMac = /(Mac)/i.test(navigator.userAgent)
    const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent)

    if (isMobile) {
      return (
        <ButtonPrimary as="button" onClick={query.toggle}>
          {/* <Image src="/static/images/searchbar.webp" width='560' height='37.7' alt="Searchbar" /> */}
          Tap to start →
        </ButtonPrimary>
      )
    } else if (isMac) {
      return (
        <div>
        <ButtonPrimary as="button" onClick={query.toggle}>
          <Image src="/static/images/searchbar.webp" width='560' height='37.7' alt="Searchbar" />
        </ButtonPrimary>
        </div>
      )
    } else {
      return (
        <div>
        <ButtonPrimary as="button" onClick={query.toggle}>
          <Image src="/static/images/searchbar.webp" width='560' height='37.7' alt="Searchbar" />
        </ButtonPrimary>
        </div>
      )
    }
  }

  return <div />
}
