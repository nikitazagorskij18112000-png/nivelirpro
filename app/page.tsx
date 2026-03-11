'use client'

import { createClient } from '@/lib/supabase'

export default function AppPage() {
  const supabase = createClient()

  async function handleLogout() {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100vh', overflow:'hidden' }}>
      <div style={{ background:'#0f172a', borderBottom:'1px solid #1e293b', padding:'4px 16px', display:'flex', justifyContent:'flex-end', alignItems:'center', gap:12, height:32, flexShrink:0 }}>
        <span style={{ color:'#475569', fontSize:11 }}>НИВЕЛИР ПРО 3.0</span>
        <button onClick={handleLogout} style={{ padding:'3px 10px', background:'#1e293b', border:'1px solid #334155', borderRadius:4, color:'#94a3b8', fontSize:11, cursor:'pointer' }}>
          Выйти
        </button>
      </div>
      <iframe src="/app.html" style={{ flex:1, border:'none', width:'100%', height:'100%' }} title="НИВЕЛИР ПРО" />
    </div>
  )
}