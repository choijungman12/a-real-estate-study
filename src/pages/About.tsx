import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  GraduationCap,
  Users,
  Trophy,
  Rocket,
  Brain,
  ArrowRight,
  Award,
  BookOpen,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Building2,
  Star,
} from 'lucide-react'

const PURPOSES = [
  {
    icon: GraduationCap,
    title: '혁신적 학습',
    desc: 'AI 기술을 활용한 새로운 부동산 분석 방법론으로 기존 투자 방식의 한계를 극복합니다.',
  },
  {
    icon: Users,
    title: '전문가 네트워크',
    desc: '부동산·법률·금융·개발 업계 전문가들과의 네트워크로 실무 인사이트를 공유합니다.',
  },
  {
    icon: Trophy,
    title: '실제 성과',
    desc: '이론에서 그치지 않고 실제 투자 성과를 창출할 수 있는 실전 능력을 배양합니다.',
  },
  {
    icon: Rocket,
    title: '미래 준비',
    desc: '급변하는 부동산 시장에서 AI 기술로 미래 트렌드를 선점하는 역량을 키웁니다.',
  },
]

const BOARD = [
  {
    name: '김성호',
    role: '대표 / AI 부동산 분석 전문가',
    desc: '15년간 부동산 개발·투자에 참여한 베테랑 실무가입니다. 수년간 자체 AI 기반 부동산 분석 시스템을 구축해 왔으며, 데이터로 의사결정하는 투자 문화를 만드는 것이 목표입니다.',
    tags: ['부동산 개발', 'AI 시스템', '투자 전략'],
  },
  {
    name: '이미선',
    role: '교육이사 / 부동산 투자 컨설턴트',
    desc: '공인중개사 자격을 보유하고 1,000건 이상의 투자 자문을 진행한 재개발·재건축 분야 전문가입니다. 초보자도 이해할 수 있는 단계별 학습 설계가 강점입니다.',
    tags: ['공인중개사', '재개발·재건축', '투자 컨설팅'],
  },
  {
    name: '박준혁',
    role: '기술이사 / 데이터 사이언티스트',
    desc: 'KAIST 출신의 머신러닝 엔지니어로, 빅데이터 처리와 부동산 가격 예측 모델링을 담당합니다. 자체 부동산 데이터 플랫폼의 핵심 알고리즘을 설계했습니다.',
    tags: ['머신러닝', '빅데이터', 'GIS'],
  },
  {
    name: '정유진',
    role: '법무이사 / 부동산 전문 변호사',
    desc: '부동산 관련 법무를 전문으로 하는 변호사로, 경매·도시정비·개발사업 법률 자문 다수 경험을 보유했습니다. 모든 학습 과정의 법적 검토를 책임집니다.',
    tags: ['부동산 법무', '경매·공매', '도시정비법'],
  },
  {
    name: '최동현',
    role: '투자이사 / 부동산 펀드 매니저',
    desc: '대형 부동산 펀드 운용 경험을 바탕으로 기관 투자자 대상 자문을 수행해 왔습니다. 우수 수료생을 위한 실제 투자 프로젝트 발굴과 연결을 담당합니다.',
    tags: ['펀드 운용', '기관 투자', '리스크 관리'],
  },
  {
    name: '한지영',
    role: '개발이사 / 도시계획 전문가',
    desc: '도시계획·개발사업 전문가로, 다수 지자체의 도시계획 수립과 지구단위계획 자문에 참여했습니다. 거시적 도시 흐름과 미시적 입지 분석을 모두 강의합니다.',
    tags: ['도시계획', '지구단위계획', '입지 분석'],
  },
]

const METHOD_STEPS = [
  {
    num: '01',
    icon: Brain,
    title: 'AI 도구 학습',
    desc: '데이터 수집·전처리·시각화 등 AI 분석에 필요한 기본 도구와 환경을 익힙니다.',
  },
  {
    num: '02',
    icon: BookOpen,
    title: '이론과 실습',
    desc: '도시정비법·경매·개발 등 핵심 이론을 강의로 배우고 실습 과제로 즉시 체화합니다.',
  },
  {
    num: '03',
    icon: Building2,
    title: '프로젝트 수행',
    desc: '실제 매물·지역을 팀 단위로 분석하고 보고서를 작성하며 실전 감각을 키웁니다.',
  },
  {
    num: '04',
    icon: Users,
    title: '멘토링·네트워킹',
    desc: '1:1 멘토링과 정기 네트워킹으로 평생 활용할 인적 자산을 구축합니다.',
  },
]

const BENEFITS = [
  { icon: Award, title: '공식 수료증', desc: '24주 과정 수료 시 공식 수료증을 발급해 드립니다.' },
  { icon: Brain, title: 'AI 도구 무료 사용', desc: '교육 기간 내 자체 AI 분석 플랫폼을 무료로 이용할 수 있습니다.' },
  { icon: Users, title: '1:1 멘토링', desc: '매월 1회 이상 전문가 멘토와 일대일 상담을 진행합니다.' },
  { icon: Trophy, title: '실제 투자 기회', desc: '우수 수료생에게는 검증된 공동투자 프로젝트를 우선 제공합니다.' },
  { icon: Sparkles, title: '동문 네트워크', desc: '분기별 네트워킹과 동문 클럽으로 평생 인적 자산을 형성합니다.' },
  { icon: BookOpen, title: '학습 자료 제공', desc: '교재·법령집·실전 분석 템플릿 등 모든 자료를 영구 제공합니다.' },
]

const SUCCESS = [
  {
    name: '강민호',
    before: '제조업 영업사원',
    after: '경매 투자 전업가',
    quote: '24주 과정 후 첫 경매 낙찰부터 명도까지 혼자 해냈습니다. 지금은 월 4건 이상 분석합니다.',
    metric: '연 +1.2억 수익',
  },
  {
    name: '박서윤',
    before: '대기업 마케팅 6년차',
    after: '재개발 컨설턴트',
    quote: '재개발 분석법을 배운 뒤 본업과 병행하며 부동산 컨설팅을 시작, 현재는 독립했습니다.',
    metric: '월 컨설팅 8건+',
  },
  {
    name: '윤태경',
    before: '주부 / 두 자녀 어머니',
    after: '토지 투자가',
    quote: '집안일과 병행하며 토지 분석 노하우를 익혔고, 가족 자금으로 임야 투자에 성공했습니다.',
    metric: '+87% 수익률',
  },
]

const FAQ = [
  {
    q: '사전 지식이 없어도 참여 가능한가요?',
    a: '네, 가능합니다. 1주차부터 AI 도구 기초와 부동산 기본 개념을 함께 다루기 때문에 비전공자·초보자도 충분히 따라올 수 있습니다. 다만 매주 4시간 이상의 자습 시간 확보를 권장합니다.',
  },
  {
    q: '교육 일정은 어떻게 되나요?',
    a: '매주 토요일 오전 10:00~13:00 이론 강의, 오후 14:00~17:00 실습으로 진행되며, 화요일 저녁에는 온라인 보충 세션이 있습니다. 총 24주, 96시간의 정규 학습 시간이 제공됩니다.',
  },
  {
    q: '비용은 얼마인가요?',
    a: '24주 정규 과정 기준 480만 원이며, 교재·AI 도구 사용료·멘토링 비용이 모두 포함되어 있습니다. 분할 납부 및 조기 신청 할인이 가능하며, 자세한 내용은 가입 페이지에서 안내드립니다.',
  },
  {
    q: '환불 규정이 어떻게 되나요?',
    a: '개강 전 100% 환불, 1주차 이내 80% 환불, 2~4주차 50% 환불이 가능합니다. 5주차 이후에는 환불이 어려우며, 부득이한 사유 발생 시 다음 기수 이월이 가능합니다.',
  },
  {
    q: '수료 후에는 어떤 지원이 있나요?',
    a: '수료생에게는 동문 네트워크 평생 이용권, AI 분석 도구 50% 할인, 분기별 네트워킹 무료 참여, 실제 투자 프로젝트 우선 제안 등의 혜택이 제공됩니다.',
  },
]

export default function About() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0)

  return (
    <>
      {/* 1. Hero */}
      <section className="relative bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100 py-20 lg:py-28 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 bg-primary text-white text-sm font-semibold px-4 py-2 rounded-full mb-6 shadow-lg">
            <GraduationCap size={16} /> AI × 부동산 전문 교육
          </span>
          <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            함께 배우고 함께 성장하는<br />
            <span className="accent-text">AI 부동산 스터디</span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            전문가와 함께하는 체계적 학습 과정으로 AI 기반 부동산 투자 전문가가 되어보세요.<br />
            5년의 운영 경험, 1,500명의 수강생, 30명의 멘토가 함께합니다.
          </p>
        </div>
      </section>

      {/* 2. Purposes */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              MISSION
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">설립 목적</h2>
            <p className="text-lg text-slate-600">AI 기술과 부동산 전문 지식의 결합</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PURPOSES.map((p) => (
              <div key={p.title} className="text-center space-y-4">
                <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                  <p.icon className="text-primary" size={36} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{p.title}</h3>
                <p className="text-slate-600 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Board members */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-emerald-100 text-emerald-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              LEADERSHIP
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">이사진 소개</h2>
            <p className="text-lg text-slate-600">부동산과 AI 분야의 검증된 전문가들이 함께합니다</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BOARD.map((p) => (
              <div key={p.name} className="glass-card rounded-2xl p-8 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  {p.name[0]}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{p.name}</h3>
                <p className="text-primary font-semibold text-sm mb-4">{p.role}</p>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{p.desc}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-1 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Methodology */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-violet-100 text-violet-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              METHOD
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">학습 방법론</h2>
            <p className="text-lg text-slate-600">검증된 4단계 학습 프로세스</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 items-stretch">
            {METHOD_STEPS.map((step, idx) => (
              <div key={step.num} className="relative flex">
                <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl p-8 flex-1 hover:shadow-lg transition">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center">
                      <step.icon size={22} />
                    </div>
                    <div className="text-3xl font-extrabold accent-text">{step.num}</div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">{step.desc}</p>
                </div>
                {idx < METHOD_STEPS.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-4 -translate-y-1/2 w-8 h-8 bg-primary text-white rounded-full items-center justify-center z-10 shadow">
                    <ArrowRight size={16} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Benefits */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-amber-100 text-amber-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              BENEFITS
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">참여 혜택</h2>
            <p className="text-lg text-slate-600">참여만 해도 받을 수 있는 6가지 핵심 혜택</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((b) => (
              <div
                key={b.title}
                className="bg-white rounded-2xl p-6 hover:shadow-lg transition flex gap-4"
              >
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center flex-shrink-0">
                  <b.icon size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">{b.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Success stories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-rose-100 text-rose-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              SUCCESS STORIES
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              수강생 <span className="accent-text">성공 사례</span>
            </h2>
            <p className="text-lg text-slate-600">실제로 인생이 바뀐 동문들의 이야기</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {SUCCESS.map((s) => (
              <div key={s.name} className="glass-card rounded-2xl p-8 flex flex-col">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 leading-relaxed mb-6 flex-1">"{s.quote}"</p>
                <div className="border-t border-slate-200 pt-5">
                  <p className="font-bold text-slate-900 mb-2">{s.name}</p>
                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-4">
                    <span>{s.before}</span>
                    <ArrowRight size={14} className="text-primary" />
                    <span className="font-semibold text-primary">{s.after}</span>
                  </div>
                  <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-3 text-center">
                    <p className="text-xl font-bold text-emerald-600">{s.metric}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              FAQ
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">자주 묻는 질문</h2>
            <p className="text-lg text-slate-600">궁금한 점을 미리 확인하세요</p>
          </div>
          <div className="space-y-4">
            {FAQ.map((item, idx) => {
              const open = openFAQ === idx
              return (
                <div
                  key={item.q}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFAQ(open ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition"
                  >
                    <span className="font-semibold text-slate-900 flex items-center gap-3">
                      <CheckCircle2 size={20} className="text-primary flex-shrink-0" />
                      {item.q}
                    </span>
                    {open ? (
                      <ChevronUp size={20} className="text-slate-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown size={20} className="text-slate-500 flex-shrink-0" />
                    )}
                  </button>
                  {open && (
                    <div className="px-6 pb-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-100">
                      <p className="pt-4">{item.a}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 8. Final CTA */}
      <section className="py-24 bg-gradient-to-r from-primary to-secondary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_70%_30%,white_0%,transparent_40%)]" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            AI 부동산 전문가로 성장하세요
          </h2>
          <p className="text-lg text-blue-100 mb-10 leading-relaxed">
            지금 시작하면 미래 부동산 시장의 리더가 될 수 있습니다.<br />
            우리와 함께 데이터로 부동산을 분석하는 새로운 세대가 되세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-white hover:bg-slate-100 text-primary px-10 py-4 rounded-button text-lg font-bold transition shadow-xl"
            >
              스터디 가입 신청
            </Link>
            <Link
              to="/curriculum"
              className="border-2 border-white hover:bg-white hover:text-primary text-white px-10 py-4 rounded-button text-lg font-bold transition"
            >
              커리큘럼 보기
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
