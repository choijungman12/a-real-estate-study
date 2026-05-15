import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Brain,
  Gavel,
  Building2,
  Map,
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Award,
  Trophy,
  Star,
  Sparkles,
} from 'lucide-react'

type ModuleId = 'm1' | 'm2' | 'm3' | 'm4'
type Difficulty = 'easy' | 'medium' | 'hard'

const MODULES = [
  {
    id: 'm1' as ModuleId,
    num: 1,
    title: 'AI 부동산 분석 기초',
    weeks: '4주',
    range: '1-4주',
    level: '기초',
    icon: Brain,
    desc: 'AI 도구 활용법과 부동산 시장 이해를 바탕으로 데이터 분석의 기초를 다집니다.',
    color: 'bg-emerald-100 text-emerald-700',
  },
  {
    id: 'm2' as ModuleId,
    num: 2,
    title: '공경매 및 경매 분석',
    weeks: '6주',
    range: '5-10주',
    level: '중급',
    icon: Gavel,
    desc: '경매 시장의 이해와 AI를 활용한 물건 평가, 권리분석을 통한 실전 경매 투자 전략을 학습합니다.',
    color: 'bg-amber-100 text-amber-700',
  },
  {
    id: 'm3' as ModuleId,
    num: 3,
    title: '재개발·재건축 분석',
    weeks: '6주',
    range: '11-16주',
    level: '고급',
    icon: Building2,
    desc: '정비사업 전 과정을 이해하고 AI 기반 사업성 분석을 통해 재개발 투자 기회를 발굴합니다.',
    color: 'bg-orange-100 text-orange-700',
  },
  {
    id: 'm4' as ModuleId,
    num: 4,
    title: '도시개발 및 토지 개발',
    weeks: '8주',
    range: '17-24주',
    level: '전문가',
    icon: Map,
    desc: '도시계획과 토지 개발 사업의 이해를 바탕으로 대규모 개발 프로젝트 분석 능력을 키웁니다.',
    color: 'bg-rose-100 text-rose-700',
  },
] as const

const levelColor: Record<string, string> = {
  기초: 'bg-green-100 text-green-700',
  중급: 'bg-yellow-100 text-yellow-700',
  고급: 'bg-orange-100 text-orange-700',
  전문가: 'bg-red-100 text-red-700',
}

const difficultyDot: Record<Difficulty, string> = {
  easy: 'bg-emerald-500',
  medium: 'bg-amber-500',
  hard: 'bg-rose-500',
}

const difficultyLabel: Record<Difficulty, string> = {
  easy: '쉬움',
  medium: '보통',
  hard: '도전',
}

type Week = {
  week: number
  module: ModuleId
  title: string
  difficulty: Difficulty
  goals: string[]
  contents: string[]
  tasks: string[]
}

const WEEKS: Week[] = [
  // ===== 모듈 1: 1-4주 =====
  {
    week: 1,
    module: 'm1',
    title: 'AI 도구 소개 및 기초 설정',
    difficulty: 'easy',
    goals: ['AI 분석 도구 이해', '실습 환경 구축', '기본 데이터 수집 방법 습득'],
    contents: ['Python·Jupyter 기초', '부동산 공공데이터 API', 'GIS 도구 소개'],
    tasks: ['개발 환경 설정', '샘플 데이터 수집', '기초 데이터 시각화'],
  },
  {
    week: 2,
    module: 'm1',
    title: '부동산 시장 데이터 이해',
    difficulty: 'easy',
    goals: ['주요 데이터 출처 파악', '데이터 구조 이해', '품질 평가 능력 배양'],
    contents: ['국토부 실거래가 데이터', '한국부동산원 통계', 'KB·R114 시세 자료'],
    tasks: ['지역별 실거래가 수집', '데이터 정제 실습', '데이터 품질 보고서 작성'],
  },
  {
    week: 3,
    module: 'm1',
    title: 'AI 모델 기초 및 가격 예측 입문',
    difficulty: 'medium',
    goals: ['머신러닝 기본 개념 이해', '회귀 모델 활용', '예측 정확도 평가'],
    contents: ['지도학습 vs 비지도학습', '선형·다항 회귀', '평균제곱오차·결정계수'],
    tasks: ['아파트 가격 예측 모델 구축', '모델 성능 비교', '결과 시각화 보고서'],
  },
  {
    week: 4,
    module: 'm1',
    title: '입지 분석과 GIS 시각화',
    difficulty: 'medium',
    goals: ['공간 데이터 이해', 'GIS 기반 분석 수행', '입지 점수화 모델 설계'],
    contents: ['지오코딩과 좌표계', 'QGIS·Folium 기초', '교통·학군·생활 인프라 분석'],
    tasks: ['관심 지역 GIS 지도 제작', '입지 점수 모델 구현', '모듈 1 종합 프로젝트 발표'],
  },

  // ===== 모듈 2: 5-10주 =====
  {
    week: 5,
    module: 'm2',
    title: '경매 시장의 이해와 절차',
    difficulty: 'easy',
    goals: ['공·사경매 차이 이해', '경매 절차 숙지', '주요 용어 마스터'],
    contents: ['민사집행법 기초', '경매 진행 단계', '입찰부터 배당까지'],
    tasks: ['경매 사이트 회원가입 및 검색', '관심 물건 10건 수집', '진행 단계별 정리'],
  },
  {
    week: 6,
    module: 'm2',
    title: '권리분석의 핵심',
    difficulty: 'medium',
    goals: ['등기부 해석', '말소기준권리 판단', '인수·소멸 권리 구분'],
    contents: ['등기부등본 구조', '근저당·가압류·임차권', '대항력과 우선변제권'],
    tasks: ['등기부 10건 분석', '말소기준권리 판단 연습', '권리분석 보고서 작성'],
  },
  {
    week: 7,
    module: 'm2',
    title: 'AI 기반 권리분석 자동화',
    difficulty: 'hard',
    goals: ['OCR로 등기부 자동 추출', 'AI 권리분석 모델 활용', '리스크 자동 평가'],
    contents: ['문서 OCR 기초', '자연어 처리 입문', '권리분석 자동화 워크플로'],
    tasks: ['등기부 OCR 파이프라인 구축', '리스크 점수화 모델 구현', '자동 보고서 생성'],
  },
  {
    week: 8,
    module: 'm2',
    title: '경매 물건 시세 분석과 입찰가 산정',
    difficulty: 'medium',
    goals: ['적정 시세 추정', '낙찰가율 분석', '안전 입찰가 산정'],
    contents: ['감정가 vs 시세', '낙찰 통계 데이터 활용', '입찰가 산정 공식'],
    tasks: ['관심 물건 시세 분석', '예상 낙찰가 시뮬레이션', '입찰 전략 보고서'],
  },
  {
    week: 9,
    module: 'm2',
    title: '명도와 인수 후 관리',
    difficulty: 'medium',
    goals: ['명도 협상 전략 이해', '인도명령·강제집행 절차', '인수 후 운영 계획'],
    contents: ['임차인·점유자 유형별 대응', '명도확인서·이사비 협상', '리모델링과 임대'],
    tasks: ['명도 시나리오 작성', '예상 비용 산출표 작성', '인수 후 6개월 계획'],
  },
  {
    week: 10,
    module: 'm2',
    title: '모의 입찰 프로젝트',
    difficulty: 'hard',
    goals: ['전 과정 통합 적용', '팀 단위 의사결정', '발표 및 피드백 수용'],
    contents: ['실제 진행 중인 경매 물건 선정', '권리·시세·명도 종합 분석', '입찰 의사결정 시뮬레이션'],
    tasks: ['팀별 모의 입찰서 작성', '입찰 시뮬레이션 발표', '멘토 1:1 피드백 세션'],
  },

  // ===== 모듈 3: 11-16주 =====
  {
    week: 11,
    module: 'm3',
    title: '도시정비법과 정비사업 개요',
    difficulty: 'easy',
    goals: ['정비사업 종류 이해', '도시정비법 핵심 조항 숙지', '단계별 절차 파악'],
    contents: ['재개발·재건축·소규모 재건축 차이', '도정법 제13조 외 핵심 조항', '정비구역 지정부터 준공까지'],
    tasks: ['관심 정비구역 1곳 선정', '진행 단계 정리', '관련 법령 발췌 노트'],
  },
  {
    week: 12,
    module: 'm3',
    title: '조합 설립과 추진위원회',
    difficulty: 'medium',
    goals: ['추진위·조합 구조 이해', '동의율 요건 숙지', '조합 정관 분석'],
    contents: ['추진위원회 구성과 역할', '토지등소유자 동의율', '조합 정관·운영 규정'],
    tasks: ['관심 사업장 동의율 조사', '조합 정관 분석 보고서', '추진 단계 체크리스트'],
  },
  {
    week: 13,
    module: 'm3',
    title: '사업시행계획과 관리처분계획',
    difficulty: 'hard',
    goals: ['사업시행계획 핵심 이해', '관리처분계획의 의미', '권리가액 산정 원리'],
    contents: ['사업시행인가 절차', '감정평가와 권리가액', '분담금 계산 구조'],
    tasks: ['사업시행계획 사례 분석', '권리가액 시뮬레이션', '분담금 계산 실습'],
  },
  {
    week: 14,
    module: 'm3',
    title: 'AI 사업성 분석 모델',
    difficulty: 'hard',
    goals: ['사업성 분석 지표 이해', 'AI 기반 시뮬레이션', '민감도 분석 수행'],
    contents: ['총사업비·일반분양가·조합원 분담금', 'NPV·IRR 기초', '민감도 분석 기법'],
    tasks: ['사업성 분석 스프레드시트 구축', 'AI 시뮬레이터 활용', '시나리오별 분석 보고서'],
  },
  {
    week: 15,
    module: 'm3',
    title: '재건축 안전진단과 추진 전략',
    difficulty: 'medium',
    goals: ['안전진단 절차 이해', '재건축 부담금 계산', '단계별 투자 타이밍 파악'],
    contents: ['예비안전진단 vs 정밀안전진단', '재건축초과이익환수제', '단계별 시세 변동 패턴'],
    tasks: ['안전진단 단계 사례 조사', '부담금 시뮬레이션', '진입 타이밍 분석 보고서'],
  },
  {
    week: 16,
    module: 'm3',
    title: '정비사업 종합 프로젝트',
    difficulty: 'hard',
    goals: ['실제 사업장 종합 분석', '투자 의사결정 보고서 작성', '동료 피드백 수용'],
    contents: ['관심 정비사업 1곳 깊이 분석', '권리·사업성·리스크 통합 평가', '동료 피드 리뷰 세션'],
    tasks: ['종합 분석 보고서 30쪽 작성', '발표 자료 제작 및 발표', '멘토·동료 피드백 정리'],
  },

  // ===== 모듈 4: 17-24주 =====
  {
    week: 17,
    module: 'm4',
    title: '도시계획의 이해',
    difficulty: 'medium',
    goals: ['도시기본계획 구조 이해', '용도지역·지구 파악', '주요 도시계획 흐름 분석'],
    contents: ['국토종합계획부터 도시기본계획까지', '용도지역 분류', '도시계획 변경 사례'],
    tasks: ['관심 도시 도시기본계획 정독', '용도지역 지도 제작', '변경 사례 정리'],
  },
  {
    week: 18,
    module: 'm4',
    title: '지구단위계획과 역세권 개발',
    difficulty: 'hard',
    goals: ['지구단위계획의 의미 이해', '역세권 개발 메커니즘 파악', '용적률 인센티브 분석'],
    contents: ['지구단위계획 수립 절차', '역세권 활성화 사업', '용도용적제·결합건축'],
    tasks: ['관심 역세권 지구단위계획 분석', '인센티브 시뮬레이션', '투자 포인트 정리'],
  },
  {
    week: 19,
    module: 'm4',
    title: '도시개발사업의 구조',
    difficulty: 'hard',
    goals: ['도시개발법 이해', '환지·수용 방식 차이', '시행자별 사업 구조 파악'],
    contents: ['도시개발법 핵심 조항', '환지방식 vs 수용·사용방식', '공공·민간·민관합동'],
    tasks: ['진행 중 도시개발사업 1곳 조사', '환지계획 사례 분석', '시행자 구조 정리'],
  },
  {
    week: 20,
    module: 'm4',
    title: '토지·산지 분석 입문',
    difficulty: 'medium',
    goals: ['지목과 용도지역 구분', '농지·임야 규제 이해', '개발 가능성 평가'],
    contents: ['토지이용계획확인서 해석', '농지법·산지관리법', '개발행위허가 기초'],
    tasks: ['관심 토지 5필지 분석', '토지이용계획 정리', '개발 가능성 점수 산정'],
  },
  {
    week: 21,
    module: 'm4',
    title: '개발행위허가와 형질변경',
    difficulty: 'hard',
    goals: ['개발행위허가 절차 숙지', '형질변경의 종류 이해', '부담금·기부채납 계산'],
    contents: ['개발행위허가 6가지 유형', '농지전용·산지전용 절차', '기반시설부담금'],
    tasks: ['관심 토지 개발 시나리오 작성', '인허가 비용 산출표', '리스크 분석 보고서'],
  },
  {
    week: 22,
    module: 'm4',
    title: 'AI 기반 토지 가치 평가',
    difficulty: 'hard',
    goals: ['토지 시세 데이터 활용', 'AI 가치 평가 모델 구축', '호재 영향 정량화'],
    contents: ['공시지가·실거래가·표준지', '토지 가치 평가 모델링', '도로·역사 호재 영향 분석'],
    tasks: ['지역별 토지 가치 모델 구축', '호재 시나리오 시뮬레이션', '평가 보고서 작성'],
  },
  {
    week: 23,
    module: 'm4',
    title: '대규모 개발 프로젝트 분석',
    difficulty: 'hard',
    goals: ['공공주택지구·신도시 흐름 이해', '주변 토지 가치 변동 예측', '투자 타이밍 판단'],
    contents: ['3기 신도시·공공주택지구', '광역교통계획과 토지 가치', '국가산단·복합개발 사례'],
    tasks: ['신도시 인근 토지 영향 분석', '광역교통 호재 정리', '시나리오별 가치 시뮬레이션'],
  },
  {
    week: 24,
    module: 'm4',
    title: '최종 종합 프로젝트 및 수료',
    difficulty: 'hard',
    goals: ['전 과정 학습 통합', '실전 투자 보고서 완성', '평생 학습 계획 수립'],
    contents: ['개인 관심 분야 심화 프로젝트', '발표·디펜스 세션', '수료식과 동문 네트워킹'],
    tasks: ['최종 프로젝트 50쪽 보고서', '15분 발표 및 Q&A', '수료증 수령·동문 등록'],
  },
]

const SCHEDULE = [
  { day: '토요일 오전', time: '10:00 - 13:00', mode: '오프라인 이론 강의', desc: '핵심 개념과 법규를 강의 형식으로 학습합니다.' },
  { day: '토요일 오후', time: '14:00 - 17:00', mode: '오프라인 실습', desc: 'AI 도구·실제 데이터를 활용한 팀 단위 실습을 진행합니다.' },
  { day: '화요일 저녁', time: '20:00 - 21:30', mode: '온라인 보충 세션', desc: 'Zoom으로 한 주 복습과 멘토링·과제 피드백을 진행합니다.' },
]

const EVALUATION = [
  { label: '출석률', value: 20, color: 'bg-emerald-500' },
  { label: '주간 과제', value: 30, color: 'bg-blue-500' },
  { label: '프로젝트', value: 30, color: 'bg-violet-500' },
  { label: '시험·디펜스', value: 20, color: 'bg-rose-500' },
]

const GRADES = [
  { grade: '최우수', range: '90점 이상', color: 'bg-amber-100 text-amber-700 border-amber-300', icon: Trophy, desc: '실제 투자 프로젝트 우선 참여 + 명예 멘토 자격' },
  { grade: '우수', range: '80 ~ 89점', color: 'bg-blue-100 text-blue-700 border-blue-300', icon: Award, desc: '동문 네트워크 평생 이용 + 추후 강의 50% 할인' },
  { grade: '일반', range: '70 ~ 79점', color: 'bg-slate-100 text-slate-700 border-slate-300', icon: Star, desc: '공식 수료증 발급 + 학습 자료 영구 제공' },
]

const FAQ = [
  {
    q: '24주 일정이 너무 길지 않을까요?',
    a: '주 1회 토요일 + 화요일 저녁의 부담스럽지 않은 일정입니다. 매주 4시간의 자습 시간만 확보하시면 충분히 따라오실 수 있도록 설계되었습니다.',
  },
  {
    q: '중간에 결석하면 어떻게 되나요?',
    a: '모든 강의는 영상으로 녹화되어 수강생 전용 페이지에 업로드됩니다. 사정상 결석한 경우 영상으로 보충 학습이 가능하며, 출석률 80% 미만 시 수료가 불가능하니 주의해 주세요.',
  },
  {
    q: '실습용 노트북이나 장비를 제공하나요?',
    a: '개인 노트북 지참이 원칙이며, 운영체제는 Windows·macOS 모두 지원합니다. 강의실에는 모니터·인터넷이 완비되어 있고, 추천 사양은 가입 후 안내드립니다.',
  },
  {
    q: '매 모듈마다 별도 신청이 가능한가요?',
    a: '죄송합니다. 24주 통합 과정으로만 운영됩니다. 모듈이 누적적으로 설계되어 있어 중간 진입 시 학습 효과가 크게 떨어지기 때문입니다.',
  },
  {
    q: '수료 후 추가 학습 기회가 있나요?',
    a: '심화 과정(공경매 마스터, 재개발 컨설턴트, 토지 분석 전문가)이 별도 운영되며, 수료생은 50% 할인된 가격으로 수강하실 수 있습니다.',
  },
]

export default function Curriculum() {
  const [tab, setTab] = useState<ModuleId>('m1')
  const [openFAQ, setOpenFAQ] = useState<number | null>(0)

  const activeWeeks = WEEKS.filter((w) => w.module === tab)
  const totalWeeks = WEEKS.length

  return (
    <>
      {/* 1. Hero */}
      <section className="relative bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100 py-20 lg:py-28 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 bg-primary text-white text-sm font-semibold px-4 py-2 rounded-full mb-6 shadow-lg">
            <BookOpen size={16} /> 체계적인 24주 커리큘럼
          </span>
          <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            전문가가 되는<br />
            <span className="accent-text">24주 학습 여정</span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            AI 부동산 분석부터 실전 투자까지, 단계별로 체계적으로 배우는 마스터 코스
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
            {[
              { v: '24주', l: '총 학습 기간' },
              { v: '4개', l: '전문 모듈' },
              { v: '96시간', l: '실습 시간' },
              { v: '12개', l: '프로젝트' },
            ].map((s) => (
              <div key={s.l} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
                <div className="text-3xl font-bold accent-text mb-2">{s.v}</div>
                <div className="text-slate-600 text-sm">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Module timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">4개 모듈 구성</h2>
            <p className="text-lg text-slate-600">단계별 체계적인 학습 과정</p>
          </div>
          <div className="relative">
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary -translate-x-1/2" />
            <div className="space-y-8 lg:space-y-16">
              {MODULES.map((m, idx) => {
                const isLeft = idx % 2 === 0
                return (
                  <div key={m.num} className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
                    {isLeft ? (
                      <>
                        <div className="lg:pr-8">
                          <div className="glass-card rounded-2xl p-8 relative">
                            <div className="flex items-center gap-4 mb-4">
                              <div className="w-14 h-14 bg-primary text-white rounded-xl flex items-center justify-center flex-shrink-0">
                                <m.icon size={26} />
                              </div>
                              <div>
                                <div className="text-sm text-slate-500">모듈 {m.num} · {m.range}</div>
                                <h3 className="text-2xl font-bold text-slate-900">{m.title}</h3>
                              </div>
                            </div>
                            <p className="text-slate-600 leading-relaxed mb-4">{m.desc}</p>
                            <div className="flex flex-wrap gap-2">
                              <span className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">{m.weeks}</span>
                              <span className={`text-sm font-medium px-3 py-1 rounded-full ${levelColor[m.level]}`}>{m.level}</span>
                            </div>
                          </div>
                        </div>
                        <div className="hidden lg:block" />
                      </>
                    ) : (
                      <>
                        <div className="hidden lg:block" />
                        <div className="lg:pl-8">
                          <div className="glass-card rounded-2xl p-8 relative">
                            <div className="flex items-center gap-4 mb-4">
                              <div className="w-14 h-14 bg-primary text-white rounded-xl flex items-center justify-center flex-shrink-0">
                                <m.icon size={26} />
                              </div>
                              <div>
                                <div className="text-sm text-slate-500">모듈 {m.num} · {m.range}</div>
                                <h3 className="text-2xl font-bold text-slate-900">{m.title}</h3>
                              </div>
                            </div>
                            <p className="text-slate-600 leading-relaxed mb-4">{m.desc}</p>
                            <div className="flex flex-wrap gap-2">
                              <span className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">{m.weeks}</span>
                              <span className={`text-sm font-medium px-3 py-1 rounded-full ${levelColor[m.level]}`}>{m.level}</span>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. 24-week detail */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              DETAILED CURRICULUM
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              24주 <span className="accent-text">상세 커리큘럼</span>
            </h2>
            <p className="text-lg text-slate-600">매주 어떤 내용을 배우게 될까요?</p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {MODULES.map((m) => {
              const active = tab === m.id
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setTab(m.id)}
                  className={`px-5 py-3 rounded-button font-semibold transition flex items-center gap-2 ${
                    active
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-white text-slate-700 hover:bg-blue-50 border border-slate-200'
                  }`}
                >
                  <m.icon size={18} />
                  <span className="text-sm lg:text-base">
                    모듈 {m.num} <span className="hidden md:inline">· {m.range}</span>
                  </span>
                </button>
              )
            })}
          </div>

          {/* Week cards */}
          <div className="space-y-6">
            {activeWeeks.map((w) => {
              const progressPct = Math.round((w.week / totalWeeks) * 100)
              return (
                <div key={w.week} className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-md transition">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="bg-primary text-white text-sm font-bold px-3 py-1 rounded-full">
                      {w.week}주차
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 flex-1 min-w-0">{w.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${difficultyDot[w.difficulty]}`} />
                      <span className="text-sm text-slate-600">{difficultyLabel[w.difficulty]}</span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                      <span>전체 진행률</span>
                      <span className="font-semibold text-primary">{progressPct}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>

                  {/* 3 columns */}
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                        학습 목표
                      </h4>
                      <ul className="space-y-2">
                        {w.goals.map((g) => (
                          <li key={g} className="text-sm text-slate-600 flex gap-2">
                            <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                            {g}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                        주요 내용
                      </h4>
                      <ul className="space-y-2">
                        {w.contents.map((c) => (
                          <li key={c} className="text-sm text-slate-600 flex gap-2">
                            <BookOpen size={14} className="text-blue-500 flex-shrink-0 mt-0.5" />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                        실습 과제
                      </h4>
                      <ul className="space-y-2">
                        {w.tasks.map((t) => (
                          <li key={t} className="text-sm text-slate-600 flex gap-2">
                            <Sparkles size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 4. Schedule */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">학습 시간표 · 진행 방식</h2>
            <p className="text-lg text-slate-600">오프라인 70%, 온라인 30%의 하이브리드 운영</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {SCHEDULE.map((s) => (
              <div key={s.day} className="glass-card rounded-2xl p-6">
                <Calendar className="text-primary mb-4" size={28} />
                <div className="text-sm font-semibold text-primary mb-1">{s.day}</div>
                <div className="text-2xl font-bold text-slate-900 mb-2">{s.time}</div>
                <div className="text-base font-semibold text-slate-700 mb-2">{s.mode}</div>
                <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl p-6 flex items-center gap-4">
              <div className="text-5xl font-extrabold accent-text">70%</div>
              <div>
                <p className="font-bold text-slate-900">오프라인 강의</p>
                <p className="text-sm text-slate-600">강남구 소재 전용 강의실에서 실습·토론 중심</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-6 flex items-center gap-4">
              <div className="text-5xl font-extrabold text-emerald-600">30%</div>
              <div>
                <p className="font-bold text-slate-900">온라인 세션</p>
                <p className="text-sm text-slate-600">Zoom 활용 보충 수업과 1:1 멘토링·피드백</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Evaluation */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">평가 방법</h2>
            <p className="text-lg text-slate-600">100점 만점, 4가지 항목으로 평가합니다</p>
          </div>
          <div className="bg-white rounded-2xl p-8 space-y-6">
            {EVALUATION.map((e) => (
              <div key={e.label}>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-slate-900">{e.label}</span>
                  <span className="font-bold text-primary">{e.value}%</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${e.color} rounded-full transition-all`}
                    style={{ width: `${e.value * 2.5}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Grades */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">수료 등급</h2>
            <p className="text-lg text-slate-600">총점에 따라 차등 혜택을 제공합니다</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {GRADES.map((g) => (
              <div
                key={g.grade}
                className={`rounded-2xl p-8 border-2 ${g.color} text-center`}
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow">
                  <g.icon size={32} className="text-current" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{g.grade}</h3>
                <p className="text-lg font-semibold mb-4">{g.range}</p>
                <p className="text-sm leading-relaxed text-slate-700">{g.desc}</p>
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
            <p className="text-lg text-slate-600">커리큘럼에 대한 궁금증을 해결해 드립니다</p>
          </div>
          <div className="space-y-4">
            {FAQ.map((item, idx) => {
              const open = openFAQ === idx
              return (
                <div key={item.q} className="bg-white rounded-2xl shadow-sm overflow-hidden">
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
                    <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100">
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
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_70%,white_0%,transparent_40%)]" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <Sparkles className="text-white/80 mx-auto mb-6" size={48} />
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">지금 시작하세요</h2>
          <p className="text-lg lg:text-xl text-blue-100 mb-10 leading-relaxed">
            24주 후, 당신은 AI 부동산 분석 전문가가 되어 있을 것입니다.<br />
            함께할 동료들이 당신을 기다리고 있습니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-white hover:bg-slate-100 text-primary px-10 py-4 rounded-button text-lg font-bold transition shadow-xl"
            >
              스터디 신청하기
            </Link>
            <Link
              to="/about"
              className="border-2 border-white hover:bg-white hover:text-primary text-white px-10 py-4 rounded-button text-lg font-bold transition inline-flex items-center justify-center gap-2"
            >
              스터디 소개 보기 <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
