import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, Smartphone } from 'lucide-react'

export default function Login() {
  const [showPw, setShowPw] = useState(false)
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !pw.trim()) {
      alert('이메일과 비밀번호를 입력해주세요.')
      return
    }
    alert('로그인 기능은 곧 제공될 예정입니다.')
  }

  return (
    <section className="min-h-[80vh] flex items-center justify-center px-6 py-12 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 w-full max-w-md shadow-xl border border-slate-200">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">로그인</h1>
          <p className="text-slate-600">AI 부동산 스터디 그룹에 오신 것을 환영합니다</p>
        </div>

        <div className="mb-8">
          <h2 className="text-sm font-semibold text-slate-700 mb-4 text-center">간편 로그인</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: '카카오', bg: 'bg-yellow-300 hover:bg-yellow-400 text-black' },
              { name: '네이버', bg: 'bg-green-500 hover:bg-green-600 text-white' },
              { name: '구글', bg: 'bg-white hover:bg-slate-50 text-slate-900 border border-slate-300' },
              { name: '휴대폰', bg: 'bg-primary hover:bg-blue-600 text-white' },
            ].map(s => (
              <button
                key={s.name}
                onClick={() => alert(`${s.name} 로그인은 준비 중입니다.`)}
                className={`p-3 rounded-button font-medium text-sm transition ${s.bg}`}
              >
                {s.name === '휴대폰' && <Smartphone size={16} className="inline mr-1" />}
                {s.name}으로 시작
              </button>
            ))}
          </div>
        </div>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
          <div className="relative flex justify-center text-sm"><span className="bg-white px-3 text-slate-500">또는</span></div>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">이메일 또는 아이디</label>
            <input
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-button focus:border-primary focus:outline-none text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">비밀번호</label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={pw}
                onChange={e => setPw(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                className="w-full px-4 py-3 pr-12 border-2 border-slate-200 rounded-button focus:border-primary focus:outline-none text-sm"
              />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-primary" />
              <span className="text-slate-700">로그인 상태 유지</span>
            </label>
            <a href="#" className="text-primary hover:underline">비밀번호 찾기</a>
          </div>
          <button type="submit" className="w-full bg-primary hover:bg-blue-600 text-white py-3 rounded-button font-semibold transition">
            로그인
          </button>
        </form>

        <div className="text-center mt-6 text-sm">
          <span className="text-slate-600">아직 회원이 아니신가요?</span>{' '}
          <Link to="/signup" className="text-primary hover:underline font-semibold">회원가입</Link>
        </div>
      </div>
    </section>
  )
}
