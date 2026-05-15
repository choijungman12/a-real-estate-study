import { useState, type ComponentType } from 'react'
import { Link } from 'react-router-dom'
import {
  FileText,
  Video,
  FileSpreadsheet,
  Code,
  Database,
  BookOpen,
  Download,
  Search,
  Filter,
  Star,
  Award,
  UserCheck,
} from 'lucide-react'

type CatKey = 'learning' | 'tools' | 'templates' | 'cases' | 'datasets' | 'references'
type FileType = 'PDF' | '동영상' | 'Excel' | 'Code' | 'CSV' | 'JSON'
type Level = '기초' | '중급' | '고급'

const CATEGORIES: { key: CatKey; label: string }[] = [
  { key: 'learning', label: '학습 자료' },
  { key: 'tools', label: 'AI 도구 가이드' },
  { key: 'templates', label: '분석 템플릿' },
  { key: 'cases', label: '우수 사례' },
  { key: 'datasets', label: '데이터셋' },
  { key: 'references', label: '참고 문헌' },
]

type Resource = {
  title: string
  desc: string
  type: FileType
  level: Level
  rating: number
  reviews: number
  downloads: number
}

const ITEMS: Record<CatKey, Resource[]> = {
  learning: [
    { title: '부동산 투자 기초 가이드', desc: '부동산 투자의 기본 개념과 원리를 다룬 입문 가이드 (PDF 120쪽)', type: 'PDF', level: '기초', rating: 4.8, reviews: 312, downloads: 1247 },
    { title: '경매 물건 분석 실전 강의', desc: '실제 경매 사례 5건으로 배우는 권리분석법과 입찰가 산정 (영상 3.5시간)', type: '동영상', level: '중급', rating: 4.9, reviews: 218, downloads: 892 },
    { title: '재개발 사업성 분석 매뉴얼', desc: '정비사업 단계별 체크리스트와 분담금 시뮬레이션 방법론', type: 'PDF', level: '고급', rating: 4.7, reviews: 156, downloads: 567 },
    { title: '부동산 세금 종합 정리 2026', desc: '취득세·보유세·양도세 최신 개정 반영 한 권 정리집', type: 'PDF', level: '중급', rating: 4.6, reviews: 189, downloads: 723 },
    { title: '레버리지 투자 영상 강의', desc: '전세 레버리지·DSR·DTI를 활용한 자본 효율 극대화 전략', type: '동영상', level: '중급', rating: 4.8, reviews: 142, downloads: 612 },
    { title: '입지 분석 30일 챌린지 워크북', desc: '하루 한 챕터씩 따라하는 자기주도 입지 분석 학습서', type: 'PDF', level: '기초', rating: 4.5, reviews: 98, downloads: 478 },
  ],
  tools: [
    { title: 'Python 부동산 분석 라이브러리', desc: 'Pandas, NumPy 활용한 데이터 처리 가이드와 예제 코드 50선', type: 'Code', level: '중급', rating: 4.7, reviews: 234, downloads: 678 },
    { title: 'QGIS 지도 분석 가이드', desc: 'GIS 도구로 입지·상권·인구 분석하는 단계별 튜토리얼', type: 'PDF', level: '중급', rating: 4.6, reviews: 167, downloads: 534 },
    { title: 'TensorFlow 가격 예측 튜토리얼', desc: '딥러닝 회귀 모델로 실거래가 예측 모델 만들기', type: '동영상', level: '고급', rating: 4.8, reviews: 189, downloads: 456 },
    { title: 'ChatGPT 부동산 프롬프트 모음', desc: '실무에서 바로 쓰는 100개 프롬프트 + 결과 비교', type: 'PDF', level: '기초', rating: 4.9, reviews: 421, downloads: 1893 },
    { title: 'Claude API 자동화 워크플로우', desc: '권리분석·시세 비교를 LLM으로 자동화하는 코드', type: 'Code', level: '고급', rating: 4.7, reviews: 102, downloads: 389 },
    { title: 'Tableau 부동산 대시보드 템플릿', desc: '실거래가·거래량을 시각화하는 즉시 사용 가능한 대시보드', type: 'Code', level: '중급', rating: 4.5, reviews: 87, downloads: 312 },
  ],
  templates: [
    { title: '경매 물건 분석 템플릿', desc: '권리분석부터 수익성까지 한 번에 산출하는 Excel', type: 'Excel', level: '중급', rating: 4.9, reviews: 287, downloads: 1234 },
    { title: '투자 수익률 계산기', desc: 'IRR, NPV, ROI 자동 계산되는 종합 도구', type: 'Excel', level: '기초', rating: 4.9, reviews: 356, downloads: 1567 },
    { title: 'Python 시세 분석 스크립트', desc: '국토부 API에서 실거래가 자동 수집·분석하는 스크립트', type: 'Code', level: '고급', rating: 4.7, reviews: 134, downloads: 567 },
    { title: '재개발 분담금 시뮬레이터', desc: '권리가액·종전자산·종후자산을 한 번에 계산', type: 'Excel', level: '중급', rating: 4.8, reviews: 178, downloads: 845 },
    { title: '월세 / 매매 비교 분석 템플릿', desc: '동일 자본금 기준 월세·매매 수익률 비교', type: 'Excel', level: '기초', rating: 4.6, reviews: 145, downloads: 689 },
  ],
  cases: [
    { title: '강남 재개발 후보지 적중 사례', desc: 'AI 모델로 6개월 전 후보지를 정확히 예측한 분석 보고서', type: 'PDF', level: '고급', rating: 4.9, reviews: 198, downloads: 723 },
    { title: '경기 외곽 토지 개발 성공기', desc: '관리지역 토지를 매입해 인허가 후 개발한 실제 사례', type: 'PDF', level: '중급', rating: 4.7, reviews: 142, downloads: 512 },
    { title: '경매 낙찰 후 명도 협상 사례', desc: '난이도 상 물건을 합리적으로 명도 처리한 실전기', type: '동영상', level: '중급', rating: 4.8, reviews: 167, downloads: 489 },
    { title: 'AI 알고리즘 우승작 코드 공개', desc: '실거래가 예측 대회 1위팀의 모델 구조와 학습 코드', type: 'Code', level: '고급', rating: 4.9, reviews: 256, downloads: 678 },
  ],
  datasets: [
    { title: '서울 아파트 실거래가 데이터', desc: '2020-2026 전체 거래 내역 1,247,892건 정리본', type: 'CSV', level: '중급', rating: 4.8, reviews: 234, downloads: 892 },
    { title: '전국 경매 물건 데이터', desc: '2023-2026 진행된 경매 물건 89,456건 종합 데이터', type: 'CSV', level: '중급', rating: 4.7, reviews: 189, downloads: 645 },
    { title: '재개발 추진 현황 데이터', desc: '전국 재개발·재건축 사업지구 1,567개 단계별 정보', type: 'Excel', level: '기초', rating: 4.6, reviews: 145, downloads: 412 },
    { title: '국토부 표준지 공시지가 (전국)', desc: '2024-2026 표준지 50만 필지 공시지가 시계열', type: 'CSV', level: '중급', rating: 4.7, reviews: 112, downloads: 378 },
    { title: '인구·세대수 동 단위 통계', desc: '전국 3,500여 개 행정동의 5년 인구 변동 데이터', type: 'JSON', level: '고급', rating: 4.6, reviews: 89, downloads: 256 },
  ],
  references: [
    { title: 'KDI 부동산 시장 분석 리포트 모음', desc: '한국개발연구원의 분기별 부동산 시장 분석 12편', type: 'PDF', level: '중급', rating: 4.7, reviews: 156, downloads: 489 },
    { title: '국토연구원 정책 보고서 셀렉션', desc: '주거·정비·토지 분야 핵심 정책 보고서 30편 큐레이션', type: 'PDF', level: '고급', rating: 4.6, reviews: 98, downloads: 312 },
    { title: '도시 및 주거환경정비법 해설', desc: '도정법 조문별 해설과 최근 판례 정리', type: 'PDF', level: '고급', rating: 4.8, reviews: 134, downloads: 423 },
    { title: '해외 도시 재생 사례 비교', desc: '일본·영국·독일의 도시 재생 정책과 한국에의 시사점', type: 'PDF', level: '중급', rating: 4.5, reviews: 76, downloads: 234 },
  ],
}

const typeIcon: Record<FileType, ComponentType<{ size?: number; className?: string }>> = {
  PDF: FileText,
  '동영상': Video,
  Excel: FileSpreadsheet,
  Code: Code,
  CSV: Database,
  JSON: BookOpen,
}

const typeColor: Record<FileType, string> = {
  PDF: 'bg-red-100 text-red-700',
  '동영상': 'bg-blue-100 text-blue-700',
  Excel: 'bg-green-100 text-green-700',
  Code: 'bg-purple-100 text-purple-700',
  CSV: 'bg-orange-100 text-orange-700',
  JSON: 'bg-yellow-100 text-yellow-700',
}

const levelDot: Record<Level, string> = {
  기초: 'bg-emerald-500',
  중급: 'bg-amber-500',
  고급: 'bg-rose-500',
}

const HOT_THIS_WEEK = [
  { rank: 1, title: 'ChatGPT 부동산 프롬프트 모음', type: 'PDF', downloads: 1893, hot: true },
  { rank: 2, title: '투자 수익률 계산기', type: 'Excel', downloads: 1567 },
  { rank: 3, title: '경매 물건 분석 템플릿', type: 'Excel', downloads: 1234 },
  { rank: 4, title: '부동산 투자 기초 가이드', type: 'PDF', downloads: 1247 },
  { rank: 5, title: '경매 물건 분석 실전 강의', type: '동영상', downloads: 892 },
]

const TOP_RATED = [
  { rank: 1, title: 'ChatGPT 부동산 프롬프트 모음', rating: 4.9, hot: true },
  { rank: 2, title: '강남 재개발 후보지 적중 사례', rating: 4.9 },
  { rank: 3, title: 'AI 알고리즘 우승작 코드 공개', rating: 4.9 },
  { rank: 4, title: '투자 수익률 계산기', rating: 4.9 },
  { rank: 5, title: '경매 물건 분석 실전 강의', rating: 4.9 },
]

export default function Resources() {
  const [active, setActive] = useState<CatKey>('learning')
  const [query, setQuery] = useState('')
  const [filterCat, setFilterCat] = useState('all')
  const [filterLevel, setFilterLevel] = useState<'all' | Level>('all')
  const [sort, setSort] = useState<'latest' | 'popular' | 'rating' | 'downloads'>('latest')

  const list = ITEMS[active]
    .filter(r => (filterLevel === 'all' ? true : r.level === filterLevel))
    .filter(r => (query === '' ? true : r.title.includes(query) || r.desc.includes(query)))
  const sorted = [...list].sort((a, b) => {
    if (sort === 'rating') return b.rating - a.rating
    if (sort === 'downloads') return b.downloads - a.downloads
    if (sort === 'popular') return b.reviews - a.reviews
    return 0
  })

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block bg-primary text-white text-sm font-semibold px-4 py-2 rounded-full mb-6">
            학습 자료의 보물창고
          </span>
          <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6">
            전문가가 만든<br />
            <span className="accent-text">학습 자료실</span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto">
            챌린지 성공을 위한 모든 학습 자료, AI 도구 가이드, 분석 템플릿, 실전 데이터셋을 한 곳에서 만나보세요
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
            {[
              { v: '2,847', l: '전체 자료' },
              { v: '156개', l: 'AI 도구' },
              { v: '89개', l: '분석 템플릿' },
              { v: '234건', l: '실전 사례' },
            ].map(s => (
              <div key={s.l} className="bg-white/80 rounded-lg p-6">
                <div className="text-2xl font-bold text-primary mb-2">{s.v}</div>
                <div className="text-slate-600 text-sm">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search + filters */}
      <section className="py-10 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-3 items-stretch">
            <div className="flex-1 relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="자료 제목 또는 설명으로 검색..."
                className="w-full pl-12 pr-4 py-3 rounded-button border-2 border-slate-200 focus:border-primary focus:outline-none text-sm"
              />
            </div>
            <div className="flex gap-3 flex-wrap lg:flex-nowrap">
              <div className="flex-1 lg:flex-none flex items-center gap-2 px-3 py-2 border-2 border-slate-200 rounded-button">
                <Filter size={16} className="text-slate-400" />
                <select
                  value={filterCat}
                  onChange={e => setFilterCat(e.target.value)}
                  className="bg-transparent text-sm focus:outline-none flex-1"
                >
                  <option value="all">전체 카테고리</option>
                  <option value="invest">투자 분석</option>
                  <option value="auction">경매</option>
                  <option value="redev">재개발</option>
                  <option value="ai">AI 도구</option>
                </select>
              </div>
              <div className="flex-1 lg:flex-none px-3 py-2 border-2 border-slate-200 rounded-button">
                <select
                  value={filterLevel}
                  onChange={e => setFilterLevel(e.target.value as 'all' | Level)}
                  className="bg-transparent text-sm focus:outline-none w-full"
                >
                  <option value="all">전체 난이도</option>
                  <option value="기초">기초</option>
                  <option value="중급">중급</option>
                  <option value="고급">고급</option>
                </select>
              </div>
              <div className="flex-1 lg:flex-none px-3 py-2 border-2 border-slate-200 rounded-button">
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value as typeof sort)}
                  className="bg-transparent text-sm focus:outline-none w-full"
                >
                  <option value="latest">최신순</option>
                  <option value="popular">인기순</option>
                  <option value="rating">평점순</option>
                  <option value="downloads">다운로드순</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category tabs + cards */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {CATEGORIES.map(c => (
              <button
                key={c.key}
                onClick={() => setActive(c.key)}
                className={`px-6 py-3 rounded-button font-semibold transition ${
                  active === c.key
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {sorted.length === 0 ? (
            <div className="text-center text-slate-500 py-16">검색 결과가 없습니다.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sorted.map(r => {
                const Icon = typeIcon[r.type]
                return (
                  <Link
                    key={r.title}
                    to={`/resources/${active}/${encodeURIComponent(r.title)}`}
                    className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition block group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                        <Icon className="text-slate-700" size={24} />
                      </div>
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded ${typeColor[r.type]}`}
                      >
                        {r.type}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{r.title}</h3>
                    <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">
                      {r.desc}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mb-4 flex-wrap">
                      <span className="inline-flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${levelDot[r.level]}`} />
                        {r.level}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Star size={12} className="text-amber-400 fill-amber-400" />
                        {r.rating} ({r.reviews})
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Download size={12} />
                        {r.downloads.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-primary group-hover:bg-secondary text-white py-2.5 rounded-button text-sm font-semibold transition inline-flex items-center justify-center gap-2">
                      <BookOpen size={16} />
                      강의 보기
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Top 10 popular */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              인기 자료 TOP 10
            </h2>
            <p className="text-slate-600">이번 주 가장 많이 활용된 자료를 확인하세요</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-6">이번 주 인기</h3>
              <ul className="space-y-3">
                {HOT_THIS_WEEK.map(r => (
                  <li
                    key={r.rank}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition"
                  >
                    <div className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center">
                      {r.rank}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-slate-900 truncate flex items-center gap-2">
                        {r.title}
                        {r.hot && (
                          <span className="text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded font-bold">
                            HOT
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500">{r.type}</div>
                    </div>
                    <div className="text-right text-sm">
                      <div className="font-semibold text-slate-900">
                        {r.downloads.toLocaleString()}
                      </div>
                      <div className="text-xs text-slate-500">다운로드</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-6">최고 평점</h3>
              <ul className="space-y-3">
                {TOP_RATED.map(r => (
                  <li
                    key={r.rank}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition"
                  >
                    <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-600 font-bold flex items-center justify-center">
                      {r.rank}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-slate-900 truncate flex items-center gap-2">
                        {r.title}
                        {r.hot && (
                          <span className="text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded font-bold">
                            HOT
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 inline-flex items-center gap-1">
                        <Star size={11} className="text-amber-400 fill-amber-400" /> 평점
                      </div>
                    </div>
                    <div className="text-right text-sm">
                      <div className="font-semibold text-slate-900">{r.rating} / 5.0</div>
                      <div className="text-xs text-slate-500">평점</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Upload & contribute */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              자료 업로드 & 기여
            </h2>
            <p className="text-slate-600">유용한 자료를 공유하고 커뮤니티 기여자가 되어보세요</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
              <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mb-5">
                <FileText className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">자료 업로드</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                PDF, Excel, 영상, 코드, CSV, JSON 등 다양한 포맷의 자료를 업로드할 수 있습니다.
                업로드한 자료는 운영진 검수 후 공개되며 다운로드 수에 따라 보상 포인트가 적립됩니다.
              </p>
              <ul className="space-y-2 text-sm text-slate-700 mb-6">
                <li>· 최대 500MB · 6가지 포맷 지원</li>
                <li>· 평균 24시간 이내 검수 완료</li>
                <li>· 다운로드 1건당 10P 적립</li>
              </ul>
              <button className="bg-primary hover:bg-secondary text-white px-6 py-3 rounded-button font-semibold transition">
                자료 업로드하기
              </button>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-8">
              <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center mb-5">
                <Award className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">기여자 혜택</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                꾸준히 양질의 자료를 공유한 기여자에게는 등급 배지, 프리미엄 자료 무료 이용권,
                멘토링 우선 선발권 등 다양한 혜택이 제공됩니다.
              </p>
              <ul className="space-y-2 text-sm text-slate-700 mb-6">
                <li>· 브론즈 / 실버 / 골드 / 다이아 4단계 배지</li>
                <li>· 골드 이상 모든 유료 자료 무료 이용</li>
                <li>· 1:1 멘토링 우선 매칭권</li>
              </ul>
              <button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-button font-semibold transition inline-flex items-center gap-2">
                <UserCheck size={18} /> 기여자 프로그램 보기
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary via-secondary to-primary text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <BookOpen className="mx-auto mb-6 text-white" size={48} />
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            방대한 자료실에서<br />
            나에게 필요한 자료를 찾아보세요
          </h2>
          <p className="text-lg lg:text-xl text-white/90 mb-8">
            2,847개 자료 · 156개 AI 도구 · 매일 업데이트
          </p>
          <button
            onClick={() => setActive('learning')}
            className="bg-white text-primary px-8 py-4 rounded-button font-bold text-lg hover:bg-slate-100 transition"
          >
            지금 자료실 둘러보기
          </button>
        </div>
      </section>
    </>
  )
}
