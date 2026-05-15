import { useState, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  Trophy,
  Clock,
  ChevronRight,
  RotateCcw,
  Sparkles,
  Check,
  X,
  ArrowLeft,
  Target,
  TrendingUp,
  Award,
  Share2,
} from 'lucide-react'

// ---------- Types ----------
type QType = 'mcq' | 'ox' | 'price'

type BaseQ = {
  id: number
  type: QType
  category: string
  difficulty: '기초' | '중급' | '고급'
  question: string
  explanation: string
  points: number
}

type MCQ = BaseQ & {
  type: 'mcq'
  options: string[]
  correct: number
}

type OX = BaseQ & {
  type: 'ox'
  options: ['O', 'X']
  correct: 0 | 1
}

type Price = BaseQ & {
  type: 'price'
  unit: string
  min: number
  max: number
  step: number
  target: number
  tolerance: number // percentage, ±N%
}

type Question = MCQ | OX | Price

// ---------- Question pool ----------
const QUESTIONS: Question[] = [
  {
    id: 1,
    type: 'mcq',
    category: '경매',
    difficulty: '중급',
    question: '경매에서 "말소기준권리"는 무엇을 의미할까요?',
    options: [
      '임차인의 전입신고일',
      '등기부상 가장 먼저 설정된 근저당·가압류·담보가등기 등',
      '낙찰일자 기준',
      '소유권 이전등기일',
    ],
    correct: 1,
    explanation:
      '말소기준권리는 등기부에 가장 먼저 설정된 근저당·가압류·압류·담보가등기·경매개시결정등기 중 가장 빠른 것입니다. 이 기준 이후의 모든 권리는 경매로 인해 소멸됩니다. 권리분석의 출발점이에요.',
    points: 100,
  },
  {
    id: 2,
    type: 'mcq',
    category: '정책',
    difficulty: '기초',
    question: 'DSR(총부채원리금상환비율)은 연소득의 몇 %까지 가능할까요? (2026년 시중은행 기준)',
    options: ['30%', '40%', '50%', '60%'],
    correct: 1,
    explanation:
      'DSR은 연소득 대비 모든 부채의 연간 원리금 상환액 비율입니다. 2026년 현재 시중은행 40%, 비은행권 50%로 적용됩니다. 주택담보대출 한도를 결정하는 핵심 지표예요.',
    points: 100,
  },
  {
    id: 3,
    type: 'mcq',
    category: '재개발',
    difficulty: '중급',
    question: '재개발 정비사업의 일반적인 진행 단계 중 가장 먼저 이뤄지는 것은?',
    options: [
      '조합설립 인가',
      '정비기본계획 수립 / 정비구역 지정',
      '관리처분계획 인가',
      '준공·이전고시',
    ],
    correct: 1,
    explanation:
      '재개발 단계 순서: ① 정비기본계획 수립 → ② 정비구역 지정 → ③ 추진위 → ④ 조합설립 → ⑤ 사업시행 인가 → ⑥ 관리처분 → ⑦ 착공·준공·이전고시. 단계마다 수년이 걸리므로 진행 단계 파악이 투자 수익 결정의 핵심입니다.',
    points: 100,
  },
  {
    id: 4,
    type: 'mcq',
    category: 'AI',
    difficulty: '고급',
    question: 'AI 가격 예측 모델에서 "Overfitting(과적합)"이란 어떤 현상일까요?',
    options: [
      '데이터가 부족함',
      '학습 데이터에만 잘 맞고 새 데이터에서 성능이 떨어짐',
      '모델 구조가 너무 단순함',
      '학습 시간이 너무 길어짐',
    ],
    correct: 1,
    explanation:
      '과적합은 모델이 학습 데이터의 잡음까지 외워서 일반화 능력을 잃는 현상입니다. 부동산 가격 예측에서도 과거 데이터에만 맞춰진 모델은 정책 변화·시장 충격에 취약해요. 정규화·교차검증으로 방지합니다.',
    points: 150,
  },
  {
    id: 5,
    type: 'ox',
    category: '권리분석',
    difficulty: '고급',
    question:
      '말소기준권리(예: 1순위 근저당)보다 먼저 전입신고한 대항력 있는 임차인은, 낙찰자가 임차보증금을 인수해야 한다.',
    options: ['O', 'X'],
    correct: 0,
    explanation:
      '맞습니다. 말소기준권리보다 빠른 대항력 있는 임차인의 보증금은 낙찰자가 인수합니다. 따라서 입찰가는 "예상 낙찰가 - 인수 보증금"으로 산정해야 손실을 막을 수 있어요.',
    points: 150,
  },
  {
    id: 6,
    type: 'ox',
    category: '재개발',
    difficulty: '중급',
    question: '재개발 조합 설립을 위해서는 토지 등 소유자의 4분의 3(75%) 이상 동의가 필요하다.',
    options: ['O', 'X'],
    correct: 0,
    explanation:
      '맞습니다. 도시정비법 제35조에 따라 재개발 조합 설립 동의율은 토지 등 소유자의 3/4 이상, 토지 면적 1/2 이상이 필요합니다. 동의율 확보가 사업 속도를 좌우합니다.',
    points: 100,
  },
  {
    id: 7,
    type: 'price',
    category: '시세',
    difficulty: '중급',
    question: '2026년 5월 기준, 서울 강남구 30평형 아파트 평균 거래가는 얼마일까요?',
    explanation:
      '2026년 5월 기준 강남구 30평형 아파트 평균 거래가는 약 22억 원입니다. 단지·층·향에 따라 18~28억 원 사이에서 거래됩니다. ±15% 오차 범위 내 정답 인정.',
    unit: '억원',
    min: 10,
    max: 40,
    step: 0.5,
    target: 22,
    tolerance: 15,
    points: 150,
  },
  {
    id: 8,
    type: 'price',
    category: '시세',
    difficulty: '기초',
    question: '서울 1룸 오피스텔(전용 6평 내외) 평균 월세는? (보증금 1,000만원 기준)',
    explanation:
      '서울 1룸 오피스텔 평균 월세는 약 70~80만 원입니다. 강남·서초 등 핵심 지역은 100만 원 이상, 외곽은 50만 원대도 있습니다. ±20% 오차 범위 내 정답 인정.',
    unit: '만원',
    min: 30,
    max: 150,
    step: 5,
    target: 75,
    tolerance: 20,
    points: 100,
  },
]

// ---------- Challenge title resolver ----------
const CHALLENGE_TITLES: Record<string, string> = {
  '1': '12월 경매 분석 챌린지',
  '2': '재개발 후보지 발굴 챌린지',
  '3': '토지 개발 사업성 분석',
  '4': '시장 트렌드 예측 챌린지',
  '5': '주간 시장 분석',
  '6': 'AI 도구 활용',
  '7': '경매 물건 분석',
  '8': '데이터 수집',
  '9': '투자 계산기 개발',
  '10': '지역 분석',
  '11': '실제 경매 챌린지',
  '12': '재개발 펀드',
  '13': '토지 개발 100억 프로젝트',
  '14': 'AI 알고리즘 대회',
  '15': '지역별 분석 팀',
  '16': 'AI 도구 해커톤',
  '17': '투자 전략 발표 대회',
  '18': '빅데이터 분석',
}

// ---------- Component ----------
type Stage = 'intro' | 'playing' | 'result'

export default function ChallengePlay() {
  const { id = '1' } = useParams<{ id: string }>()
  const challengeTitle = CHALLENGE_TITLES[id] ?? '부동산 챌린지'

  const [stage, setStage] = useState<Stage>('intro')
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(() => Array(QUESTIONS.length).fill(null))
  const [selected, setSelected] = useState<number | null>(null)
  const [priceVal, setPriceVal] = useState<number>(0)
  const [submitted, setSubmitted] = useState(false)

  const totalPoints = useMemo(() => QUESTIONS.reduce((s, q) => s + q.points, 0), [])

  const score = useMemo(() => {
    return answers.reduce<number>((sum, ans, i) => {
      if (ans === null) return sum
      const q = QUESTIONS[i]
      if (q.type === 'price') {
        // tolerance check, ans is the value submitted
        const diff = Math.abs(ans - q.target)
        const allowed = (q.target * q.tolerance) / 100
        return diff <= allowed ? sum + q.points : sum
      }
      return ans === q.correct ? sum + q.points : sum
    }, 0)
  }, [answers])

  const correctCount = useMemo(() => {
    return answers.reduce<number>((c, ans, i) => {
      if (ans === null) return c
      const q = QUESTIONS[i]
      if (q.type === 'price') {
        const diff = Math.abs(ans - q.target)
        const allowed = (q.target * q.tolerance) / 100
        return diff <= allowed ? c + 1 : c
      }
      return ans === q.correct ? c + 1 : c
    }, 0)
  }, [answers])

  // ---------- Intro ----------
  if (stage === 'intro') {
    return (
      <section className="max-w-3xl mx-auto px-6 py-16 lg:py-20">
        <Link
          to="/challenge"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-primary mb-6 text-sm font-medium"
        >
          <ArrowLeft size={16} /> 챌린지 목록으로
        </Link>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 lg:p-12 text-center">
          <div className="inline-flex w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl items-center justify-center mb-6 shadow-lg">
            <Trophy className="text-white" size={40} />
          </div>
          <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            챌린지 #{id}
          </span>
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3">{challengeTitle}</h1>
          <p className="text-slate-600 mb-8 leading-relaxed">
            부동산 실력을 게임으로 검증하세요. 객관식·OX·시세 맞히기 8문제로 구성됩니다.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { icon: Target, label: '문제 수', value: '8문제' },
              { icon: Clock, label: '예상 시간', value: '약 5분' },
              { icon: Sparkles, label: '총 배점', value: `${totalPoints}점` },
              { icon: Award, label: '카테고리', value: '경매·재개발·AI·시세' },
            ].map(s => (
              <div key={s.label} className="bg-slate-50 rounded-xl p-4">
                <s.icon className="text-primary mx-auto mb-2" size={22} />
                <div className="text-xs text-slate-500 mb-1">{s.label}</div>
                <div className="text-sm font-bold text-slate-900">{s.value}</div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 rounded-2xl p-6 mb-8 text-left">
            <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-primary">📋</span> 게임 규칙
            </h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>• 객관식 4문제, OX 2문제, 시세 슬라이더 2문제</li>
              <li>• 정답마다 100~150점 적립 (난이도별)</li>
              <li>• 시세 문제는 ±15~20% 오차 범위 내 정답 인정</li>
              <li>• 답을 제출하면 즉시 해설을 확인할 수 있습니다</li>
              <li>• 모든 문제 완료 후 점수와 순위가 표시됩니다</li>
            </ul>
          </div>

          <button
            onClick={() => setStage('playing')}
            className="bg-primary hover:bg-blue-600 text-white px-12 py-4 rounded-button text-lg font-bold transition shadow-lg hover:shadow-xl inline-flex items-center gap-2"
          >
            도전 시작 <ChevronRight size={20} />
          </button>
        </div>
      </section>
    )
  }

  // ---------- Result ----------
  if (stage === 'result') {
    const accuracy = Math.round((correctCount / QUESTIONS.length) * 100)
    const percentile = score >= totalPoints * 0.9 ? 5 : score >= totalPoints * 0.7 ? 18 : score >= totalPoints * 0.5 ? 45 : 78

    // breakdown by type
    const byType = (['mcq', 'ox', 'price'] as QType[]).map(t => {
      const qs = QUESTIONS.map((q, i) => ({ q, i })).filter(({ q }) => q.type === t)
      const correctIn = qs.filter(({ q, i }) => {
        const ans = answers[i]
        if (ans === null) return false
        if (q.type === 'price') {
          const diff = Math.abs(ans - q.target)
          return diff <= (q.target * q.tolerance) / 100
        }
        return ans === q.correct
      }).length
      const labels: Record<QType, string> = { mcq: '객관식', ox: 'OX 퀴즈', price: '시세 맞히기' }
      return { type: t, label: labels[t], correct: correctIn, total: qs.length }
    })

    const grade = score >= totalPoints * 0.9 ? '🏆 최우수' : score >= totalPoints * 0.7 ? '🥇 우수' : score >= totalPoints * 0.5 ? '🥈 보통' : '🥉 입문'

    return (
      <section className="max-w-3xl mx-auto px-6 py-16 lg:py-20">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 lg:p-12">
          <div className="text-center mb-8">
            <div className="inline-flex w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl items-center justify-center mb-6 shadow-lg">
              <Trophy className="text-white" size={40} />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">도전 완료! 🎉</h1>
            <p className="text-slate-600">{challengeTitle}</p>
          </div>

          {/* Score */}
          <div className="bg-gradient-to-br from-primary to-secondary rounded-3xl p-8 text-center text-white mb-8">
            <p className="text-blue-100 text-sm mb-2">최종 점수</p>
            <div className="text-6xl lg:text-7xl font-bold mb-2 tabular-nums">
              {score}
              <span className="text-2xl lg:text-3xl text-blue-200">/{totalPoints}</span>
            </div>
            <div className="text-2xl font-bold mb-4">{grade}</div>
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/20">
              <div>
                <div className="text-2xl font-bold tabular-nums">{correctCount}/{QUESTIONS.length}</div>
                <div className="text-xs text-blue-200 mt-1">정답 수</div>
              </div>
              <div>
                <div className="text-2xl font-bold tabular-nums">{accuracy}%</div>
                <div className="text-xs text-blue-200 mt-1">정답률</div>
              </div>
              <div>
                <div className="text-2xl font-bold tabular-nums">상위 {percentile}%</div>
                <div className="text-xs text-blue-200 mt-1">예상 순위</div>
              </div>
            </div>
          </div>

          {/* Breakdown */}
          <div className="mb-8">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <TrendingUp size={20} className="text-primary" /> 부문별 성적
            </h3>
            <div className="space-y-3">
              {byType.map(b => (
                <div key={b.type} className="flex items-center gap-4 bg-slate-50 rounded-xl p-4">
                  <div className="flex-1">
                    <div className="font-semibold text-slate-900 mb-1">{b.label}</div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                        style={{ width: `${(b.correct / b.total) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-slate-900 tabular-nums">{b.correct}/{b.total}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mock Leaderboard */}
          <div className="mb-8">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Award size={20} className="text-primary" /> 리더보드 (예상 순위)
            </h3>
            <div className="bg-slate-50 rounded-xl p-4 space-y-2">
              {[
                { rank: 1, name: '박데이터', score: Math.max(900, score + 80) },
                { rank: 2, name: '최정책', score: Math.max(820, score + 30) },
                { rank: 3, name: '땅고수', score: Math.max(750, score + 10) },
                { rank: percentile, name: '🏃 나의 점수', score, isMe: true },
              ].map((r, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg ${r.isMe ? 'bg-primary text-white font-bold' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-7 text-center text-sm font-bold ${r.isMe ? 'text-white' : 'text-slate-500'}`}>{r.rank}위</span>
                    <span className={r.isMe ? 'text-white' : 'text-slate-900'}>{r.name}</span>
                  </div>
                  <span className="tabular-nums">{r.score}점</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                setStage('intro')
                setCurrentIdx(0)
                setAnswers(Array(QUESTIONS.length).fill(null))
                setSelected(null)
                setPriceVal(0)
                setSubmitted(false)
              }}
              className="flex-1 bg-primary hover:bg-blue-600 text-white px-6 py-3 rounded-button font-semibold transition inline-flex items-center justify-center gap-2"
            >
              <RotateCcw size={18} /> 다시 도전
            </button>
            <Link
              to="/challenge"
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-button font-semibold transition inline-flex items-center justify-center gap-2"
            >
              다른 챌린지 보기
            </Link>
            <button
              onClick={() => alert('공유 기능은 준비 중입니다.')}
              className="flex-1 sm:flex-initial bg-white border-2 border-slate-200 hover:border-primary hover:text-primary text-slate-700 px-6 py-3 rounded-button font-semibold transition inline-flex items-center justify-center gap-2"
            >
              <Share2 size={18} /> 결과 공유
            </button>
          </div>
        </div>
      </section>
    )
  }

  // ---------- Playing ----------
  const q = QUESTIONS[currentIdx]
  const progress = ((currentIdx + 1) / QUESTIONS.length) * 100

  const onSubmit = () => {
    if (q.type === 'price') {
      setAnswers(prev => {
        const copy = [...prev]
        copy[currentIdx] = priceVal || q.min
        return copy
      })
    } else {
      if (selected === null) return
      setAnswers(prev => {
        const copy = [...prev]
        copy[currentIdx] = selected
        return copy
      })
    }
    setSubmitted(true)
  }

  const onNext = () => {
    if (currentIdx + 1 >= QUESTIONS.length) {
      setStage('result')
    } else {
      setCurrentIdx(currentIdx + 1)
      setSelected(null)
      setPriceVal(0)
      setSubmitted(false)
    }
  }

  const isCorrect =
    q.type === 'price'
      ? Math.abs((answers[currentIdx] ?? priceVal) - q.target) <= (q.target * q.tolerance) / 100
      : answers[currentIdx] === q.correct

  const diffColor: Record<string, string> = {
    기초: 'bg-emerald-100 text-emerald-700',
    중급: 'bg-amber-100 text-amber-700',
    고급: 'bg-rose-100 text-rose-700',
  }

  return (
    <section className="max-w-3xl mx-auto px-6 py-12">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-slate-700">
            진행 {currentIdx + 1} / {QUESTIONS.length}
          </span>
          <span className="text-sm font-bold text-primary tabular-nums">
            현재 점수: {score}점
          </span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 lg:p-8">
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">
            {q.category}
          </span>
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${diffColor[q.difficulty]}`}>
            {q.difficulty}
          </span>
          <span className="bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1 rounded-full ml-auto">
            +{q.points}점
          </span>
        </div>

        <h2 className="text-xl lg:text-2xl font-bold text-slate-900 mb-6 leading-relaxed">
          Q{currentIdx + 1}. {q.question}
        </h2>

        {/* MCQ / OX */}
        {(q.type === 'mcq' || q.type === 'ox') && (
          <div className={`grid gap-3 ${q.type === 'ox' ? 'grid-cols-2' : 'grid-cols-1'}`}>
            {q.options.map((opt, i) => {
              const isSelected = selected === i
              const isAnswer = i === q.correct
              const showResult = submitted
              const cls = showResult
                ? isAnswer
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                  : isSelected
                  ? 'border-rose-500 bg-rose-50 text-rose-900'
                  : 'border-slate-200 bg-white text-slate-500'
                : isSelected
                ? 'border-primary bg-primary/5 text-slate-900'
                : 'border-slate-200 hover:border-primary/50 bg-white text-slate-900'

              return (
                <button
                  key={i}
                  onClick={() => !submitted && setSelected(i)}
                  disabled={submitted}
                  className={`text-left border-2 rounded-xl px-5 py-4 font-medium transition ${cls} ${q.type === 'ox' ? 'text-2xl text-center font-bold' : ''}`}
                >
                  {q.type !== 'ox' && (
                    <span className="inline-block w-7 h-7 mr-3 rounded-full bg-slate-100 text-slate-700 text-sm font-bold leading-7 text-center align-middle">
                      {String.fromCharCode(65 + i)}
                    </span>
                  )}
                  {opt}
                </button>
              )
            })}
          </div>
        )}

        {/* Price slider */}
        {q.type === 'price' && (
          <div>
            <div className="bg-slate-50 rounded-2xl p-6 mb-4 text-center">
              <div className="text-sm text-slate-500 mb-2">당신의 추측</div>
              <div className="text-4xl font-bold text-primary tabular-nums">
                {(priceVal || q.min).toLocaleString()}
                <span className="text-xl text-slate-500 ml-2">{q.unit}</span>
              </div>
            </div>
            <input
              type="range"
              min={q.min}
              max={q.max}
              step={q.step}
              value={priceVal || q.min}
              onChange={e => !submitted && setPriceVal(parseFloat(e.target.value))}
              disabled={submitted}
              className="w-full accent-primary cursor-pointer"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-2">
              <span>{q.min.toLocaleString()} {q.unit}</span>
              <span>{q.max.toLocaleString()} {q.unit}</span>
            </div>
            {submitted && (
              <div className="mt-4 bg-slate-50 rounded-xl p-4 text-center">
                <div className="text-sm text-slate-500 mb-1">실제 정답</div>
                <div className="text-2xl font-bold text-slate-900 tabular-nums">
                  {q.target.toLocaleString()} {q.unit}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  허용 오차: ±{q.tolerance}% (±{((q.target * q.tolerance) / 100).toFixed(1)} {q.unit})
                </div>
              </div>
            )}
          </div>
        )}

        {/* Submit / Next + Explanation */}
        <div className="mt-8">
          {!submitted ? (
            <button
              onClick={onSubmit}
              disabled={q.type !== 'price' && selected === null}
              className="w-full bg-primary hover:bg-blue-600 disabled:bg-slate-200 disabled:text-slate-500 text-white py-3 rounded-button font-bold transition inline-flex items-center justify-center gap-2"
            >
              제출하기
            </button>
          ) : (
            <>
              <div
                className={`rounded-2xl p-5 mb-4 ${
                  isCorrect ? 'bg-emerald-50 border border-emerald-200' : 'bg-rose-50 border border-rose-200'
                }`}
              >
                <div
                  className={`flex items-center gap-2 font-bold mb-2 ${
                    isCorrect ? 'text-emerald-700' : 'text-rose-700'
                  }`}
                >
                  {isCorrect ? (
                    <>
                      <Check size={20} /> 정답입니다! +{q.points}점
                    </>
                  ) : (
                    <>
                      <X size={20} /> 아쉬워요!
                    </>
                  )}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{q.explanation}</p>
              </div>
              <button
                onClick={onNext}
                className="w-full bg-primary hover:bg-blue-600 text-white py-3 rounded-button font-bold transition inline-flex items-center justify-center gap-2"
              >
                {currentIdx + 1 >= QUESTIONS.length ? '결과 확인하기' : '다음 문제'} <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Quit */}
      <div className="text-center mt-6">
        <Link to="/challenge" className="text-sm text-slate-500 hover:text-slate-700">
          중간에 그만두기
        </Link>
      </div>
    </section>
  )
}
