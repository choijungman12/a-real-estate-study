import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { User, Heart, Calendar, CreditCard, ShieldCheck, CheckCircle2 } from 'lucide-react'

export default function SignUp() {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', job: '', experience: '',
    motivation: '', startTime: '', payment: '',
    agreeTerms: false, agreePrivacy: false, agreeRefund: false, agreeMarketing: false,
  })
  const [submitted, setSubmitted] = useState(false)

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm(prev => ({ ...prev, [k]: v }))

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!form.agreeTerms || !form.agreePrivacy || !form.agreeRefund) {
      alert('필수 약관에 동의해주세요.')
      return
    }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section className="max-w-2xl mx-auto px-6 py-32 text-center">
        <CheckCircle2 className="text-green-500 mx-auto mb-4" size={64} />
        <h1 className="text-3xl font-bold text-slate-900 mb-4">신청이 완료되었습니다!</h1>
        <p className="text-slate-600 mb-8">담당자가 2-3일 내에 연락드리겠습니다.</p>
        <Link to="/" className="bg-primary hover:bg-blue-600 text-white px-6 py-3 rounded-button font-semibold inline-block transition">
          홈으로 돌아가기
        </Link>
      </section>
    )
  }

  return (
    <>
      <section className="bg-gradient-to-r from-slate-50 to-blue-50 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">스터디 가입 신청</h1>
          <p className="text-lg text-slate-600">AI 부동산 스터디 그룹과 함께 전문가로 성장하세요</p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <form onSubmit={onSubmit} className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-6 inline-flex items-center gap-3">
                <User className="text-primary" /> 개인정보 입력
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Field label="이름 *">
                  <input required value={form.name} onChange={e => set('name', e.target.value)} className="input" placeholder="홍길동" />
                </Field>
                <Field label="연락처 *">
                  <input required type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} className="input" placeholder="010-1234-5678" />
                </Field>
                <Field label="이메일 *" full>
                  <input required type="email" value={form.email} onChange={e => set('email', e.target.value)} className="input" placeholder="example@email.com" />
                </Field>
                <Field label="직업">
                  <select value={form.job} onChange={e => set('job', e.target.value)} className="input">
                    <option value="">선택하세요</option>
                    <option>회사원</option><option>사업자</option><option>프리랜서</option>
                    <option>학생</option><option>부동산업</option><option>기타</option>
                  </select>
                </Field>
                <Field label="투자 경험">
                  <select value={form.experience} onChange={e => set('experience', e.target.value)} className="input">
                    <option value="">선택하세요</option>
                    <option>초보 (경험 없음)</option><option>1-3년</option>
                    <option>3-5년</option><option>5년 이상</option>
                  </select>
                </Field>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-6 inline-flex items-center gap-3">
                <Heart className="text-primary" /> 참여 동기 및 목표
              </h2>
              <textarea
                required
                value={form.motivation}
                onChange={e => set('motivation', e.target.value)}
                rows={6}
                className="input resize-none"
                placeholder="스터디 참여를 통해 달성하고 싶은 목표나 동기를 자세히 적어주세요."
              />
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-6 inline-flex items-center gap-3">
                <Calendar className="text-primary" /> 희망 시작 시기
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {['2026년 6월 (마감 임박)', '2026년 7월 (여석 충분)', '2026년 8월 (여석 충분)', '2026년 9월 (신규 개강)'].map(t => (
                  <label key={t} className="flex items-center gap-3 p-4 border-2 rounded-button cursor-pointer hover:bg-slate-50 transition">
                    <input type="radio" name="start" value={t} required onChange={() => set('startTime', t)} className="accent-primary" />
                    <span className="text-slate-900 font-medium">{t}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-6 inline-flex items-center gap-3">
                <CreditCard className="text-primary" /> 결제 방법
              </h2>
              <div className="bg-slate-50 rounded-lg p-6 mb-6 flex items-center justify-between">
                <span className="text-lg font-semibold text-slate-900">총 수강료</span>
                <span className="text-2xl font-bold text-primary">1,200,000원</span>
              </div>
              <div className="space-y-3">
                {['신용/체크 카드', '계좌 이체', '3개월 분할 결제'].map(t => (
                  <label key={t} className="flex items-center gap-3 p-4 border-2 rounded-button cursor-pointer hover:bg-slate-50 transition">
                    <input type="radio" name="pay" required onChange={() => set('payment', t)} className="accent-primary" />
                    <span className="text-slate-900 font-medium">{t}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-6 inline-flex items-center gap-3">
                <ShieldCheck className="text-primary" /> 약관 동의
              </h2>
              <div className="space-y-3">
                {[
                  { k: 'agreeTerms' as const, l: '[필수] 이용약관 동의' },
                  { k: 'agreePrivacy' as const, l: '[필수] 개인정보 처리방침 동의' },
                  { k: 'agreeRefund' as const, l: '[필수] 환불 정책 동의' },
                  { k: 'agreeMarketing' as const, l: '[선택] 마케팅 정보 수신 동의' },
                ].map(c => (
                  <label key={c.k} className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={form[c.k]} onChange={e => set(c.k, e.target.checked)} className="w-5 h-5 accent-primary" />
                    <span className="text-slate-700">{c.l}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="text-center">
              <button type="submit" className="bg-primary hover:bg-blue-600 text-white px-12 py-4 rounded-button text-lg font-semibold transition shadow-lg">
                가입 신청하기
              </button>
              <p className="text-sm text-slate-500 mt-4">신청서 제출 후 2-3일 내 담당자가 연락드립니다.</p>
            </div>
          </form>
        </div>
      </section>

      <style>{`
        .input { width: 100%; padding: 0.75rem 1rem; border: 2px solid #e2e8f0; border-radius: 0.5rem; transition: all 0.2s; background: white; font-size: 0.875rem; }
        .input:focus { outline: none; border-color: #1E90FF; box-shadow: 0 0 0 3px rgba(30,144,255,0.1); }
      `}</style>
    </>
  )
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <div className={full ? 'md:col-span-2' : ''}>
      <label className="block text-sm font-semibold text-slate-700 mb-2">{label}</label>
      {children}
    </div>
  )
}
