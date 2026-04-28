import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import SubmitPageClient from './SubmitPageClient'

export default async function SubmitPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/?auth_required=1')
  }

  return <SubmitPageClient user={user} />
}
