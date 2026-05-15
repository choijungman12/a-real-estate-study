import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, Smartphone, X, MessageCircle, Check, Bell } from 'lucide-react'

type SocialPlatform = 'kakao' | 'naver' | null

export default function Login() {
  const [showPw, setShowPw] = useState(false)
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [modalPlatform, setModalPlatform] = useState<SocialPlatform>(null)
  const [phoneOpen, setPhoneOpen] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState('')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !pw.trim()) {
      alert('이메일과 비밀번호를 입력해주세요.')
      return
    }
    alert('로그인 기능은 곧 제공될 예정입니다.')
  }

  const handleSocial = (name: string) => {
    if (name === '카카오') setModalPlatform('kakao')
    else if (name === '네이버') setModalPlatform('naver')
    else if (name === '휴대폰') {
      setPhoneOpen(prev => !prev)
      setOtpSent(false)
      setPhoneNumber('')
      setOtp('')
    } else alert(`${name} 로그인은 준비 중입니다.`)
  }

  const sendOtp = () => {
    if (!phoneNumber.trim()) {
      alert('휴대폰 번호를 입력해주세요.')
      return
    }
    setOtpSent(true)
  }

  const verifyOtp = () => {
    if (otp.length !== 6) {
      alert('6자리 인증번호를 입력해주세요.')
      return
    }
    alert('인증이 완료되었습니다. (데모)')
  }

  const modalCopy =
    modalPlatform === 'kakao'
      ? { title: '카카오 로그인', name: '카카오', color: 'bg-yellow-300 text-yellow-900', accent: 'bg-yellow-400' }
      : modalPlatform === 'naver'
      ? { title: '네이버 로그인', name: '네이버', color: 'bg-green-500 text-white', accent: 'bg-green-600' }
      : null

  return (
    <section className="min-h-[80vh] flex items-center justify-center px-6 py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 lg:p-10 w-full max-w-md shadow-xl border border-slate-200">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-2xl mb-4">
            <span className="text-2xl">🏠</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">로그인</h1>
          <p className="text-slate-600 text-sm">AI 부동산 스터디 그룹에 오신 것을 환영합니다</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xs font-semibold text-slate-500 mb-3 text-center uppercase tracking-wider">간편 로그인</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: '카카오', bg: 'bg-yellow-300 hover:bg-yellow-400 text-black' },
              { name: '네이버', bg: 'bg-green-500 hover:bg-green-600 text-white' },
              { name: '구글', bg: 'bg-white hover:bg-slate-50 text-slate-900 border border-slate-300' },
              { name: '휴대폰', bg: 'bg-primary hover:bg-secondary text-white' },
            ].map(s => (
              <button
                key={s.name}
                type="button"
                onClick={() => handleSocial(s.name)}
                className={`p-3 rounded-button font-medium text-sm transition inline-flex items-center justify-center gap-1.5 ${s.bg}`}
              >
                {s.name === '휴대폰' && <Smartphone size={16} />}
                {s.name === '카카오' && <span>💬</span>}
                {s.name === '네이버' && <span className="font-black">N</span>}
                {s.name === '구글' && <span className="font-bold text-lg">G</span>}
                <span>{s.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Phone collapsible */}
        {phoneOpen && (
          <div className="mb-6 bg-blue-50 rounded-xl p-4 border border-blue-200">
            <div className="flex items-center gap-2 mb-3">
              <Smartphone size={16} className="text-primary" />
              <span className="text-sm font-semibold text-slate-900">휴대폰 인증</span>
            </div>
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                  placeholder="010-1234-5678"
                  className="flex-1 px-3 py-2 border-2 border-slate-200 rounded-button focus:border-primary focus:outline-none text-sm"
                />
                <button
                  type="button"
                  onClick={sendOtp}
                  className="bg-primary hover:bg-secondary text-white px-4 rounded-button font-semibold text-sm transition whitespace-nowrap"
                >
                  {otpSent ? '재전송' : '인증번호 받기'}
                </button>
              </div>
              {otpSent && (
                <div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      maxLength={6}
                      value={otp}
                      onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                      placeholder="6자리 인증번호"
                      className="flex-1 px-3 py-2 border-2 border-slate-200 rounded-button focus:border-primary focus:outline-none text-sm tracking-widest text-center"
                    />
                    <button
                      type="button"
                      onClick={verifyOtp}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 rounded-button font-semibold text-sm transition whitespace-nowrap inline-flex items-center gap-1"
                    >
                      <Check size={14} /> 인증 완료
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={sendOtp}
                    className="text-xs text-primary hover:underline mt-2 inline-block"
                  >
                    인증번호 재전송
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-3 text-slate-500">또는 이메일로 로그인</span>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
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
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label={showPw ? '비밀번호 숨기기' : '비밀번호 보기'}
              >
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-primary w-4 h-4" />
              <span className="text-slate-700">로그인 상태 유지</span>
            </label>
            <a href="#" className="text-primary hover:underline">비밀번호 찾기</a>
          </div>
          <button
            type="submit"
            className="w-full bg-primary hover:bg-secondary text-white py-3 rounded-button font-semibold transition shadow-md"
          >
            로그인
          </button>
        </form>

        <div className="text-center mt-6 text-sm">
          <span className="text-slate-600">아직 회원이 아니신가요?</span>{' '}
          <Link to="/signup" className="text-primary hover:underline font-semibold">
            회원가입
          </Link>
        </div>
      </div>

      {/* Social modal */}
      {modalPlatform && modalCopy && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setModalPlatform(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className={`p-8 text-center relative ${modalCopy.color}`}>
              <button
                onClick={() => setModalPlatform(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center transition"
                aria-label="닫기"
              >
                <X size={18} />
              </button>
              <div className={`w-16 h-16 rounded-2xl ${modalCopy.accent} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                <MessageCircle size={32} />
              </div>
              <h3 className="text-xl font-bold">{modalCopy.title}</h3>
            </div>
            <div className="p-6 text-center">
              <p className="text-slate-700 leading-relaxed mb-6">
                OAuth 인증 연동이 진행 중입니다. 곧 {modalCopy.name} 계정으로 간편하게 로그인하실 수 있습니다.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setModalPlatform(null)}
                  className="flex-1 py-2.5 border-2 border-slate-200 hover:bg-slate-50 text-slate-700 rounded-button font-semibold transition"
                >
                  닫기
                </button>
                <button
                  onClick={() => {
                    alert(`${modalCopy.name} 로그인 오픈 시 알림을 보내드립니다.`)
                    setModalPlatform(null)
                  }}
                  className="flex-1 py-2.5 bg-primary hover:bg-secondary text-white rounded-button font-semibold transition inline-flex items-center justify-center gap-1"
                >
                  <Bell size={16} /> 알림 받기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
