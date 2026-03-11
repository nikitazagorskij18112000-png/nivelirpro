'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [step, setStep] = useState<'email' | 'code'>('email')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const supabase = createClient()

  async function sendCode() {
    setLoading(true); setError('')
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) setError('Ошибка: ' + error.message)
    else setStep('code')
    setLoading(false)
  }

  async function verifyCode() {
    setLoading(true); setError('')
    const { error } = await supabase.auth.verifyOtp({ email, token: code, type: 'email' })
    if (error) setError('Неверный код. Попробуйте ещё раз.')
    else window.location.href = '/'
    setLoading(false)
  }

  return (
    <div style={{ minHeight:'100vh', background:'#0f172a', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Segoe UI',system-ui,sans-serif" }}>
      <div style={{ background:'#1e293b', border:'1px solid #334155', borderRadius:12, padding:'40px 36px', width:360 }}>
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <div style={{ fontSize:28, fontWeight:800, color:'#f8fafc' }}>
            <span style={{ color:'#2563eb' }}>◆</span> НИВЕЛИР ПРО
          </div>
          <div style={{ color:'#64748b', fontSize:13, marginTop:4 }}>Геодезическая платформа 3.0</div>
        </div>

        {step === 'email' ? (
          <>
            <div style={{ marginBottom:8, color:'#94a3b8', fontSize:13 }}>Введите ваш email для входа</div>
            <input type="email" placeholder="example@mail.ru" value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendCode()}
              style={{ width:'100%', padding:'10px 12px', marginBottom:12, background:'#0f172a', border:'1px solid #334155', borderRadius:6, color:'#f8fafc', fontSize:14, outline:'none', boxSizing:'border-box' }} />
            <button onClick={sendCode} disabled={loading || !email}
              style={{ width:'100%', padding:11, background:'#2563eb', border:'none', borderRadius:6, color:'#fff', fontSize:14, fontWeight:600, cursor:'pointer', opacity: loading || !email ? 0.6 : 1 }}>
              {loading ? 'Отправка...' : 'Получить код →'}
            </button>
          </>
        ) : (
          <>
            <div style={{ marginBottom:4, color:'#94a3b8', fontSize:13 }}>Код отправлен на <b style={{ color:'#e2e8f0' }}>{email}</b></div>
            <div style={{ color:'#64748b', fontSize:12, marginBottom:12 }}>Проверьте папку «Спам» если не видите письмо</div>
            <input type="text" placeholder="Введите 6-значный код" value={code} maxLength={6}
              onChange={e => setCode(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && verifyCode()}
              style={{ width:'100%', padding:'10px 12px', marginBottom:12, background:'#0f172a', border:'1px solid #334155', borderRadius:6, color:'#f8fafc', fontSize:18, letterSpacing:8, textAlign:'center', outline:'none', boxSizing:'border-box' }} />
            <button onClick={verifyCode} disabled={loading || code.length < 6}
              style={{ width:'100%', padding:11, background:'#10b981', border:'none', borderRadius:6, color:'#fff', fontSize:14, fontWeight:600, cursor:'pointer', opacity: loading || code.length < 6 ? 0.6 : 1, marginBottom:8 }}>
              {loading ? 'Проверка...' : '✓ Войти'}
            </button>
            <button onClick={() => { setStep('email'); setCode(''); setError('') }}
              style={{ width:'100%', padding:8, background:'transparent', border:'1px solid #334155', borderRadius:6, color:'#64748b', fontSize:13, cursor:'pointer' }}>
              ← Изменить email
            </button>
          </>
        )}

        {error && <div style={{ marginTop:12, padding:'8px 12px', background:'#7f1d1d', border:'1px solid #ef4444', borderRadius:6, color:'#fca5a5', fontSize:13 }}>{error}</div>}
      </div>
    </div>
  )
}