import type { Metadata } from 'next'
import './globals.css'
import { createClient } from '@/lib/supabase-server'

export const metadata: Metadata = {
  title: 'Architect Build Challenge — by Lyzr',
  description: 'One week to build a socket-based, real-time web app builder powered by E2B. Win cash prizes and a Founding Product Engineer role at Lyzr Architect.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <html lang="en">
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
