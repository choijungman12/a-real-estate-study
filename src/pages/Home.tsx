import { Link } from 'react-router-dom'
import {
  Brain,
  Users,
  ArrowRight,
  Sparkles,
  Gavel,
  Building2,
  Map,
  Trees,
  GraduationCap,
  Rocket,
  Award,
  Trophy,
  Star,
  CheckCircle2,
  BookOpen,
  Calendar,
} from 'lucide-react'

const HERO_STATS = [
  { label: '누적 참여자', value: '1,247명', accent: 'text-primary' },
  { label: '투자 성공률', value: '87%', accent: 'accent-text' },
  { label: '평균 수익률', value: '+24%', accent: 'text-green-600' },
  { label: '회원 만족도', value: '4.8 / 5', accent: 'text-amber-500' },
]

const SERVICES = [
  {
    icon: Brain,
    title: 'AI 분석 활용',
    desc: '시세 예측·입지 분석·권리 분석을 자동화하는 AI 도구를 직접 다루며, 데이터 기반 투자 의사결정 능력을 키웁니다.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: Gavel,
    title: '공경매 실전',
    desc: '권리분석부터 명도까지, 공·사경매의 전 과정을 모의 입찰과 실전 사례로 학습합니다.',
    color: 'bg-amber-100 text-amber-600',
  },
  {
    icon: Building2,
    title: '재개발·재건축',
    desc: '도시정비법과 조합 설립 절차를 이해하고, AI로 사업성 분석과 권리가액을 시뮬레이션합니다.',
    color: 'bg-emerald-100 text-emerald-600',
  },
  {
    icon: Map,
    title: '도시개발 공부',
    desc: '도시계획·지구단위계획·역세권 개발까지, 대형 개발사업의 흐름과 투자 포인트를 학습합니다.',
    color: 'bg-violet-100 text-violet-600',
  },
  {
    icon: Trees,
    title: '토지·산지 개발',
    desc: '농지·임야 분석, 개발행위허가, 형질변경 절차 등 토지 투자 실전 노하우를 배웁니다.',
    color: 'bg-lime-100 text-lime-700',
  },
  {
    icon: Users,
    title: '함께 성장하는 커뮤니티',
    desc: '동료·멘토와 함께하는 스터디, 투자 클럽, 분기별 네트워킹으로 평생 자산을 만듭니다.',
    color: 'bg-rose-100 text-rose-600',
  },
]

const STEPS = [
  { num: '01', title: '이론 학습', desc: '부동산 법규, 시장 구조, AI 분석 도구의 핵심 개념을 강의와 교재로 마스터합니다.' },
  { num: '02', title: 'AI 실습', desc: '실제 데이터로 가격 예측 모델, GIS 분석, 권리분석 자동화를 직접 구현합니다.' },
  { num: '03', title: '실전 분석', desc: '경매·재개발·토지 등 실제 매물을 팀 단위로 분석하고 멘토 피드백을 받습니다.' },
  { num: '04', title: '투자 연결', desc: '우수 수료생에게는 검증된 투자 프로젝트와 공동투자 기회를 우선 제공합니다.' },
]

const REVIEWS = [
  {
    name: '김재훈',
    role: 'IT 회사 대리 / 32세',
    quote: '데이터 분석은 자신 있었지만 부동산은 전혀 몰랐는데, 24주 만에 첫 경매 낙찰까지 성공했습니다. AI 분석 툴 덕분에 권리분석이 두렵지 않아졌어요.',
    metric: '+35% 수익률',
    metricLabel: '첫 경매 투자',
  },
  {
    name: '이수민',
    role: '주부 / 41세',
    quote: '재개발 지역 분석을 체계적으로 배운 덕분에 우리 동네 재건축 추진 단계에서 매수 타이밍을 정확히 잡을 수 있었습니다.',
    metric: '+58% 수익률',
    metricLabel: '재건축 투자',
  },
  {
    name: '박정우',
    role: '자영업자 / 47세',
    quote: '토지 투자는 어렵다고만 생각했는데, 멘토와 함께 분석한 임야 한 필지가 도로 개설 호재로 큰 시세 차익을 가져다줬습니다.',
    metric: '+72% 수익률',
    metricLabel: '토지 투자',
  },
]

const NUMBERS = [
  { icon: GraduationCap, value: '1,500+', label: '누적 수강생' },
  { icon: Trophy, value: '+35%', label: '평균 투자 수익' },
  { icon: Users, value: '30+', label: '전문 멘토' },
  { icon: Award, value: '5년', label: '운영 경력' },
]

export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <section className="relative bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100 py-24 lg:py-32 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 bg-primary text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg mb-6">
              <Sparkles size={16} /> AI × 부동산 실전 스터디
            </span>
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-slate-900 mb-6">
              AI로 부동산을 분석하고<br />
              <span className="accent-text">미래를 선점하라</span>
            </h1>
            <p className="text-lg lg:text-xl text-slate-700 leading-relaxed mb-8">
              공경매·재개발·재건축·도시개발·토지 개발까지,<br />
              AI와 함께 누구보다 빠르게 기회를 찾는 스터디 그룹
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/signup"
                className="bg-primary hover:bg-blue-600 text-white px-8 py-4 rounded-button text-lg font-semibold transition shadow-lg hover:shadow-xl text-center"
              >
                스터디 가입하기
              </Link>
              <Link
                to="/about"
                className="border-2 border-slate-300 hover:border-primary bg-white text-slate-900 px-8 py-4 rounded-button text-lg font-semibold transition text-center inline-flex items-center justify-center gap-2"
              >
                스터디 소개 <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {HERO_STATS.map((s, idx) => (
                <div
                  key={s.label}
                  className={`glass-card rounded-2xl p-6 ${idx % 2 === 1 ? 'mt-8' : ''}`}
                >
                  <p className="text-sm text-slate-600 mb-2">{s.label}</p>
                  <p className={`text-3xl font-bold ${s.accent}`}>{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. 6 services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              우리가 제공하는 6가지
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              부동산 투자, <span className="accent-text">A부터 Z까지</span>
            </h2>
            <p className="text-lg text-slate-600">
              이론과 실전, AI 도구와 인간 네트워크가 결합된 종합 학습 경험
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((s) => (
              <div key={s.title} className="glass-card rounded-2xl p-8 group">
                <div
                  className={`w-14 h-14 ${s.color} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition`}
                >
                  <s.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{s.title}</h3>
                <p className="text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. How it works */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              어떻게 진행되나요?
            </h2>
            <p className="text-lg text-slate-600">검증된 4단계 학습 프로세스</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 items-stretch">
            {STEPS.map((step, idx) => (
              <div key={step.num} className="relative flex">
                <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition flex-1">
                  <div className="text-5xl font-extrabold accent-text mb-4">{step.num}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
                {idx < STEPS.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-4 -translate-y-1/2 w-8 h-8 bg-primary text-white rounded-full items-center justify-center z-10 shadow">
                    <ArrowRight size={16} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Reviews */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-amber-100 text-amber-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              REAL STORIES
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              수강생들의 <span className="accent-text">진짜 성공 사례</span>
            </h2>
            <p className="text-lg text-slate-600">
              평범한 직장인·주부·자영업자가 AI 부동산 전문가로 성장한 이야기
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {REVIEWS.map((r) => (
              <div
                key={r.name}
                className="glass-card rounded-2xl p-8 flex flex-col"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 leading-relaxed mb-6 flex-1">"{r.quote}"</p>
                <div className="border-t border-slate-200 pt-5">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-bold text-slate-900">{r.name}</p>
                      <p className="text-sm text-slate-500">{r.role}</p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-3">
                    <p className="text-xs text-slate-600">{r.metricLabel}</p>
                    <p className="text-xl font-bold text-green-600">{r.metric}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Numbers */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              숫자로 보는 우리
            </h2>
            <p className="text-lg text-blue-100">5년간 쌓아온 신뢰의 숫자</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {NUMBERS.map((n) => (
              <div
                key={n.label}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center"
              >
                <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <n.icon className="text-blue-200" size={28} />
                </div>
                <div className="text-4xl lg:text-5xl font-extrabold text-white mb-2">
                  {n.value}
                </div>
                <div className="text-blue-100 text-sm">{n.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bonus 보너스: Featured highlights */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-gradient-to-br from-blue-50 to-slate-50 rounded-3xl p-10">
              <BookOpen className="text-primary mb-4" size={36} />
              <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
                24주 체계적 커리큘럼
              </h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                기초 → 경매 → 재개발·재건축 → 도시·토지 개발의 4단계 모듈로
                구성된 96시간의 깊이 있는 학습 과정. 매주 실습 과제와 1:1 멘토링이 함께 합니다.
              </p>
              <Link
                to="/curriculum"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
              >
                전체 커리큘럼 보기 <ArrowRight size={18} />
              </Link>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-3xl p-10">
              <Calendar className="text-emerald-600 mb-4" size={36} />
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                다음 기수 모집
              </h3>
              <p className="text-slate-600 mb-6">매 분기 신규 기수 모집. 정원 30명 한정.</p>
              <ul className="space-y-2 mb-6">
                {['정원 30명 한정', '서류·인터뷰 심사', '4월 / 7월 / 10월 / 1월 개강'].map(
                  (t) => (
                    <li key={t} className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle2 size={16} className="text-emerald-600" />
                      {t}
                    </li>
                  ),
                )}
              </ul>
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-button font-semibold transition"
              >
                지원하기 <Rocket size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Final CTA */}
      <section className="py-24 bg-gradient-to-r from-primary to-secondary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_20%,white_0%,transparent_40%)]" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <Sparkles className="text-white/80 mx-auto mb-6" size={48} />
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            지금 시작하세요
          </h2>
          <p className="text-lg lg:text-xl text-blue-100 mb-10 leading-relaxed">
            1,247명의 동료들이 이미 AI 부동산 전문가로 성장하고 있습니다.<br />
            오늘의 한 걸음이 6개월 후 당신의 인생을 바꿉니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-white hover:bg-slate-100 text-primary px-10 py-4 rounded-button text-lg font-bold transition shadow-xl"
            >
              지금 가입하기
            </Link>
            <Link
              to="/curriculum"
              className="border-2 border-white/60 hover:bg-white/10 text-white px-10 py-4 rounded-button text-lg font-bold transition inline-flex items-center justify-center gap-2"
            >
              커리큘럼 먼저 보기 <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
