import { useMemo, useState, type FormEvent, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  User,
  Heart,
  Calendar,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Check,
  Phone,
  Mail,
  MessageCircle,
  Sparkles,
  ArrowRight,
} from 'lucide-react'

const STEPS = [
  { id: 1, label: '개인정보 입력' },
  { id: 2, label: '참여 동기 작성' },
  { id: 3, label: '시작 시기 선택' },
  { id: 4, label: '결제 정보' },
]

export default function SignUp() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    job: '',
    experience: '',
    motivation: '',
    startTime: '',
    payment: '',
    agreeTerms: false,
    agreePrivacy: false,
    agreeRefund: false,
    agreeMarketing: false,
  })
  const [submitted, setSubmitted] = useState(false)

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm(prev => ({ ...prev, [k]: v }))

  const currentStep = useMemo(() => {
    const step1Done = form.name.trim() && form.phone.trim() && form.email.trim()
    const step2Done = form.motivation.trim().length > 0
    const step3Done = form.startTime.length > 0
    const step4Done = form.payment.length > 0
    if (step1Done && step2Done && step3Done && step4Done) return 4
    if (step1Done && step2Done && step3Done) return 4
    if (step1Done && step2Done) return 3
    if (step1Done) return 2
    return 1
  }, [form])

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
      <section className="min-h-[80vh] py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white rounded-3xl p-12 shadow-xl border border-slate-200 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="text-green-500" size={56} />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3">스터디 가입 신청이 완료되었습니다!</h1>
            <p className="text-slate-600 mb-10">
              {form.name || '회원'}님의 신청서가 정상적으로 접수되었습니다.
              담당 매니저가 빠른 시일 내에 연락드리겠습니다.
            </p>

            <div className="text-left bg-slate-50 rounded-2xl p-8 mb-10">
              <h2 className="text-lg font-bold text-slate-900 mb-6 inline-flex items-center gap-2">
                <Sparkles className="text-primary" size={20} /> 다음 단계 안내
              </h2>
              <ol className="relative">
                {[
                  { title: '신청서 검토', desc: '제출하신 신청서를 영업일 1-2일 내 검토합니다', time: '1-2일' },
                  { title: '1:1 상담 안내', desc: '검토 완료 후 이메일로 상담 일정을 보내드립니다', time: '이메일 안내' },
                  { title: '합격 통보', desc: '상담 후 최종 합격 여부를 안내드립니다', time: '3-5일' },
                  { title: '수강료 결제 + 스터디 시작', desc: '결제 완료 시 정식 멤버 자격이 부여됩니다', time: '시작' },
                ].map((step, i, arr) => (
                  <li key={step.title} className="relative pl-12 pb-6 last:pb-0">
                    {i < arr.length - 1 && <div className="absolute left-[14px] top-8 bottom-0 w-0.5 bg-primary/30" />}
                    <div className="absolute left-0 top-1 w-7 h-7 bg-primary rounded-full ring-4 ring-white shadow flex items-center justify-center text-white text-xs font-bold">
                      {i + 1}
                    </div>
                    <div className="flex justify-between items-center mb-1">
                      <div className="font-semibold text-slate-900">{step.title}</div>
                      <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full font-semibold">{step.time}</span>
                    </div>
                    <p className="text-sm text-slate-600">{step.desc}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/"
                className="bg-white border-2 border-slate-200 hover:bg-slate-50 text-slate-700 px-8 py-3 rounded-button font-semibold transition"
              >
                홈으로 돌아가기
              </Link>
              <Link
                to="/mypage"
                className="bg-primary hover:bg-secondary text-white px-8 py-3 rounded-button font-semibold transition inline-flex items-center justify-center gap-2"
              >
                마이페이지 <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-blue-600 to-secondary py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-200 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur text-white rounded-full text-sm font-medium mb-4">
            <Sparkles size={14} /> 5기 모집 중 · 잔여 4석
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">스터디 가입 신청</h1>
          <p className="text-lg text-blue-50">AI 부동산 스터디 그룹과 함께 부동산 전문가로 성장하세요</p>
        </div>
      </section>

      {/* Step indicator */}
      <section className="py-10 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex-1 flex items-center last:flex-none">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition ${
                      currentStep > s.id
                        ? 'bg-primary text-white'
                        : currentStep === s.id
                        ? 'bg-primary text-white ring-4 ring-primary/20 scale-110'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {currentStep > s.id ? <Check size={18} /> : s.id}
                  </div>
                  <div className={`text-xs mt-2 font-semibold whitespace-nowrap ${currentStep >= s.id ? 'text-primary' : 'text-slate-500'}`}>
                    {s.label}
                  </div>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 lg:mx-4 -mt-6 transition ${currentStep > s.id ? 'bg-primary' : 'bg-slate-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Sidebar */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-8">
          {/* Left form */}
          <form onSubmit={onSubmit} className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 mb-6 inline-flex items-center gap-3">
                <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <User className="text-primary" size={18} />
                </span>
                개인정보 입력
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Field label="이름 *">
                  <input
                    required
                    value={form.name}
                    onChange={e => set('name', e.target.value)}
                    className="input"
                    placeholder="홍길동"
                  />
                </Field>
                <Field label="연락처 *">
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={e => set('phone', e.target.value)}
                    className="input"
                    placeholder="010-1234-5678"
                  />
                </Field>
                <Field label="이메일 *" full>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={e => set('email', e.target.value)}
                    className="input"
                    placeholder="example@email.com"
                  />
                </Field>
                <Field label="직업">
                  <select value={form.job} onChange={e => set('job', e.target.value)} className="input">
                    <option value="">선택하세요</option>
                    <option>회사원</option>
                    <option>사업자</option>
                    <option>프리랜서</option>
                    <option>학생</option>
                    <option>부동산업</option>
                    <option>기타</option>
                  </select>
                </Field>
                <Field label="투자 경험">
                  <select value={form.experience} onChange={e => set('experience', e.target.value)} className="input">
                    <option value="">선택하세요</option>
                    <option>초보 (경험 없음)</option>
                    <option>1-3년</option>
                    <option>3-5년</option>
                    <option>5년 이상</option>
                  </select>
                </Field>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 mb-6 inline-flex items-center gap-3">
                <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Heart className="text-primary" size={18} />
                </span>
                참여 동기 및 목표
              </h2>
              <textarea
                required
                value={form.motivation}
                onChange={e => set('motivation', e.target.value)}
                rows={6}
                className="input resize-none"
                placeholder="스터디 참여를 통해 달성하고 싶은 목표나 동기를 자세히 적어주세요. (예: 6개월 내 첫 투자, AI 도구 활용 능력 향상 등)"
              />
              <p className="text-xs text-slate-500 mt-2">최소 50자 이상 작성을 권장합니다. ({form.motivation.length}자)</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 mb-6 inline-flex items-center gap-3">
                <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Calendar className="text-primary" size={18} />
                </span>
                희망 시작 시기
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {['2026년 6월 (마감 임박)', '2026년 7월 (여석 충분)', '2026년 8월 (여석 충분)', '2026년 9월 (신규 개강)'].map(t => (
                  <label
                    key={t}
                    className={`flex items-center gap-3 p-4 border-2 rounded-button cursor-pointer transition ${
                      form.startTime === t ? 'border-primary bg-primary/5' : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="start"
                      value={t}
                      required
                      onChange={() => set('startTime', t)}
                      className="accent-primary"
                    />
                    <span className="text-slate-900 font-medium">{t}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 mb-6 inline-flex items-center gap-3">
                <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <CreditCard className="text-primary" size={18} />
                </span>
                결제 방법
              </h2>
              <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6 mb-6 flex items-center justify-between border border-primary/20">
                <div>
                  <div className="text-xs text-slate-500 mb-1">총 수강료 (24주)</div>
                  <span className="text-lg font-semibold text-slate-900">스터디 풀패키지</span>
                </div>
                <span className="text-3xl font-bold text-primary">1,200,000<span className="text-base ml-1">원</span></span>
              </div>
              <div className="space-y-3">
                {['신용/체크 카드', '계좌 이체', '3개월 분할 결제'].map(t => (
                  <label
                    key={t}
                    className={`flex items-center gap-3 p-4 border-2 rounded-button cursor-pointer transition ${
                      form.payment === t ? 'border-primary bg-primary/5' : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="pay"
                      required
                      onChange={() => set('payment', t)}
                      className="accent-primary"
                    />
                    <span className="text-slate-900 font-medium">{t}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 mb-6 inline-flex items-center gap-3">
                <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <ShieldCheck className="text-primary" size={18} />
                </span>
                약관 동의
              </h2>
              <div className="space-y-3">
                {[
                  { k: 'agreeTerms' as const, l: '[필수] 이용약관 동의' },
                  { k: 'agreePrivacy' as const, l: '[필수] 개인정보 처리방침 동의' },
                  { k: 'agreeRefund' as const, l: '[필수] 환불 정책 동의' },
                  { k: 'agreeMarketing' as const, l: '[선택] 마케팅 정보 수신 동의' },
                ].map(c => (
                  <label key={c.k} className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition">
                    <input
                      type="checkbox"
                      checked={form[c.k]}
                      onChange={e => set(c.k, e.target.checked)}
                      className="w-5 h-5 accent-primary"
                    />
                    <span className="text-slate-700 flex-1">{c.l}</span>
                    <a href="#" className="text-xs text-primary hover:underline">약관 보기</a>
                  </label>
                ))}
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-primary hover:bg-secondary text-white px-12 py-4 rounded-button text-lg font-semibold transition shadow-lg inline-flex items-center gap-2"
              >
                가입 신청하기 <ArrowRight size={20} />
              </button>
              <p className="text-sm text-slate-500 mt-4">신청서 제출 후 2-3일 내 담당자가 연락드립니다.</p>
            </div>
          </form>

          {/* Right sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="lg:sticky lg:top-24 space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-4 inline-flex items-center gap-2">
                  <Sparkles className="text-primary" size={18} /> 스터디 요약 정보
                </h3>
                <ul className="space-y-3 text-sm">
                  {[
                    { label: '수강 기간', value: '24주 (6개월)' },
                    { label: '수강료', value: '1,200,000원' },
                    { label: '정기 모임', value: '주 1회' },
                    { label: '멘토링', value: '월 2회' },
                    { label: '정원', value: '20명' },
                  ].map(it => (
                    <li key={it.label} className="flex justify-between border-b border-slate-100 pb-2 last:border-b-0 last:pb-0">
                      <span className="text-slate-500">{it.label}</span>
                      <span className="font-semibold text-slate-900">{it.value}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-4 inline-flex items-center gap-2">
                  <Heart className="text-rose-500" size={18} /> 주요 혜택
                </h3>
                <ul className="space-y-3 text-sm">
                  {[
                    'AI 도구 무료 사용 (GPT-4, Claude 등)',
                    '실제 투자 기회 우선 제공',
                    '전문가·동기 멤버 네트워킹',
                    '평생 커뮤니티 멤버십 자격',
                  ].map(b => (
                    <li key={b} className="flex items-start gap-2">
                      <Check className="text-green-500 mt-0.5 shrink-0" size={16} />
                      <span className="text-slate-700">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-6 text-white shadow-lg">
                <MessageCircle size={24} className="mb-3" />
                <h3 className="font-bold mb-2">궁금한 점이 있으신가요?</h3>
                <p className="text-sm text-blue-50 mb-4">신청 전 1:1 상담을 통해 자세한 안내를 받으실 수 있습니다.</p>
                <button className="w-full bg-white text-primary py-2.5 rounded-button font-semibold text-sm hover:bg-blue-50 transition">
                  상담 신청
                </button>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-4">연락처</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-3">
                    <Phone size={16} className="text-primary" />
                    <span className="text-slate-700">02-1234-5678</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail size={16} className="text-primary" />
                    <span className="text-slate-700">info@aireal-estate.com</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Calendar size={16} className="text-primary" />
                    <span className="text-slate-700">평일 09:00 - 18:00</span>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <style>{`
        .input { width: 100%; padding: 0.75rem 1rem; border: 2px solid #e2e8f0; border-radius: 0.5rem; transition: all 0.2s; background: white; font-size: 0.875rem; }
        .input:focus { outline: none; border-color: #1E90FF; box-shadow: 0 0 0 3px rgba(30,144,255,0.1); }
      `}</style>
    </>
  )
}

function Field({ label, children, full }: { label: string; children: ReactNode; full?: boolean }) {
  return (
    <div className={full ? 'md:col-span-2' : ''}>
      <label className="block text-sm font-semibold text-slate-700 mb-2">{label}</label>
      {children}
    </div>
  )
}
