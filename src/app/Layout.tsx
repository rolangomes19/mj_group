import { Suspense, useEffect } from 'react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router'
import { Footer } from '../components/Footer'
import { Header, TopStrip } from '../components/Header'
import { BasketDrawer, WhatsAppDialog, WhatsAppFab } from '../components/Overlays'
import { PresenterBar } from '../components/PresenterBar'
import { useDemo } from '../state/demo'

/** Scrolls to #hash after route changes (e.g. /#industries from another page). */
function HashScroll() {
  const { hash, pathname } = useLocation()
  useEffect(() => {
    if (!hash) return
    const id = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 60)
    return () => clearTimeout(id)
  }, [hash, pathname])
  return null
}

export function Layout() {
  const presenter = useDemo((s) => s.presenter)
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[70] focus:bg-ember focus:px-4 focus:py-2 focus:text-cream">
        Skip to content
      </a>
      <TopStrip />
      <Header />
      <main id="main" className={presenter ? 'pb-12' : ''}>
        <Suspense fallback={<div className="min-h-screen" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <BasketDrawer />
      <WhatsAppDialog />
      <WhatsAppFab />
      <PresenterBar />
      <ScrollRestoration getKey={(l) => (l.key === 'default' ? l.pathname : l.key)} />
      <HashScroll />
    </>
  )
}
