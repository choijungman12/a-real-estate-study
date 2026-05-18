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
  { key: 'learning', label: '부동산 실전 학습' },
  { key: 'tools', label: '부동산 사이트 활용' },
  { key: 'templates', label: '수지분석 템플릿' },
  { key: 'cases', label: '실전 사례' },
  { key: 'datasets', label: '공공 데이터 활용' },
  { key: 'references', label: '법령·정책 가이드' },
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
    { title: '부동산 투자 기초 가이드', desc: '부동산 투자의 5가지 종류, 핵심 지표(IRR·NPV), 위험관리 원칙까지 기초를 한 권에', type: 'PDF', level: '기초', rating: 4.8, reviews: 312, downloads: 1247 },
    { title: '경매 물건 권리분석 실전', desc: '말소기준권리·대항력·인수보증금까지 실제 등기부 8개 사례로 익히는 권리분석', type: '동영상', level: '중급', rating: 4.9, reviews: 218, downloads: 892 },
    { title: '재개발 사업성 분석 매뉴얼', desc: '정비기본계획부터 관리처분까지 단계별 체크리스트와 분담금 시뮬레이션', type: 'PDF', level: '고급', rating: 4.7, reviews: 156, downloads: 567 },
    { title: '재건축 사업 단계별 가이드', desc: '안전진단 → 정비구역 → 조합설립 → 관리처분 → 준공의 전 과정 실무 가이드', type: 'PDF', level: '고급', rating: 4.8, reviews: 134, downloads: 489 },
    { title: '도시개발사업 종합 이해', desc: '도시개발법 기반 도시개발·산업단지·택지개발 사업의 차이와 투자 포인트', type: 'PDF', level: '중급', rating: 4.6, reviews: 102, downloads: 378 },
    { title: '농지 개발행위허가 실전 (펜션·단독주택)', desc: '농지전용·개발행위허가 절차와 농어촌숙박업 운영까지의 실전 가이드', type: '동영상', level: '중급', rating: 4.7, reviews: 178, downloads: 612 },
    { title: '산지 개발 가이드 (야영장·창고)', desc: '산지전용·산지일시사용 허가와 야영장·창고 개발 사업성 분석', type: 'PDF', level: '고급', rating: 4.5, reviews: 89, downloads: 342 },
    { title: '부동산 세금 종합 정리 2026', desc: '취득세·종부세·양도세 최신 개정과 다주택자 중과·일시적 2주택 특례 정리', type: 'PDF', level: '중급', rating: 4.9, reviews: 287, downloads: 1098 },
  ],
  tools: [
    { title: '국토부 실거래가 공개시스템 활용법', desc: 'rt.molit.go.kr에서 아파트·오피스텔·연립·단독·토지 실거래가 조회와 분석', type: '동영상', level: '기초', rating: 4.9, reviews: 421, downloads: 1893 },
    { title: '호갱노노 — 실거래가·시세·학군 분석', desc: '단지별 실거래 추이, 호가, 학군, 입주민 평가까지 한눈에 보는 활용법', type: 'PDF', level: '기초', rating: 4.8, reviews: 312, downloads: 1456 },
    { title: '온비드 공매 정보 시스템 가이드', desc: '한국자산관리공사 onbid.co.kr에서 공매 물건 검색·입찰까지의 전 과정', type: 'PDF', level: '중급', rating: 4.7, reviews: 234, downloads: 723 },
    { title: '대법원 경매정보 사이트 활용', desc: 'courtauction.go.kr 입찰 정보·매각물건명세서·감정평가서 조회 노하우', type: '동영상', level: '중급', rating: 4.8, reviews: 198, downloads: 678 },
    { title: '토지이음 — 토지이용계획 확인서', desc: 'eum.go.kr에서 용도지역·지구·구역과 행위제한을 확인하는 실전 가이드', type: 'PDF', level: '중급', rating: 4.7, reviews: 167, downloads: 534 },
    { title: '부동산114 / 직방 / 다방 비교 활용', desc: '매물 검색 플랫폼별 강점과 함정, 검증된 매물 거르는 노하우', type: 'PDF', level: '기초', rating: 4.5, reviews: 145, downloads: 478 },
  ],
  templates: [
    { title: '경매 물건 수지분석 템플릿', desc: '권리분석·시세비교·수익률을 4시트로 자동 계산하는 Excel 수지분석 도구', type: 'Excel', level: '중급', rating: 4.9, reviews: 287, downloads: 1234 },
    { title: '재개발 분담금/수익 분석 시트', desc: '권리가액·종전자산·종후자산·비례율로 분담금과 예상 수익을 자동 산정', type: 'Excel', level: '중급', rating: 4.8, reviews: 178, downloads: 845 },
    { title: '재건축 사업성 분석 모델', desc: '단계별 IRR·NPV 산정과 시나리오 분석으로 재건축 수익성 평가', type: 'Excel', level: '고급', rating: 4.7, reviews: 134, downloads: 567 },
    { title: '빌딩 수지분석 (매입~매각)', desc: '월세 수익률·대출이자·세금·시세차익을 종합한 빌딩 투자 수지분석', type: 'Excel', level: '고급', rating: 4.8, reviews: 156, downloads: 489 },
    { title: '펜션·야영장 사업성 분석', desc: '농어촌숙박업·야영장의 객실 가동률·운영비·순수익 시나리오 분석', type: 'Excel', level: '중급', rating: 4.6, reviews: 112, downloads: 378 },
    { title: '물류단지/창고 수지분석', desc: '대지 매입~건축~임대까지 산업 부동산 투자 수지분석 모델', type: 'Excel', level: '고급', rating: 4.7, reviews: 89, downloads: 312 },
  ],
  cases: [
    { title: '강남 재개발 후보지 발굴 사례', desc: '준공 30년 노후 단지 33개를 7가지 정량 지표로 분석한 실제 케이스', type: 'PDF', level: '고급', rating: 4.9, reviews: 198, downloads: 723 },
    { title: '경기 외곽 농지 → 펜션 개발 성공기', desc: '관리지역 농지 매입 → 농지전용 → 농어촌숙박업 인허가까지 6개월 실전기', type: 'PDF', level: '중급', rating: 4.7, reviews: 142, downloads: 512 },
    { title: '경매 명도 협상 실전기', desc: '대항력 임차인 협상부터 이사 합의서 작성까지 사례 중심 영상 강의', type: '동영상', level: '중급', rating: 4.8, reviews: 167, downloads: 489 },
    { title: '산지 → 야영장 개발 사례', desc: '준보전산지를 매입해 산지전용허가 후 야영장으로 개발한 ROI 분석', type: 'PDF', level: '고급', rating: 4.6, reviews: 102, downloads: 312 },
    { title: '물류창고 개발·임대 사례', desc: '용인 외곽 토지 매입 → 창고 신축 → 대형 물류사 임대 체결까지의 과정', type: 'PDF', level: '고급', rating: 4.7, reviews: 87, downloads: 234 },
  ],
  datasets: [
    { title: '서울 아파트 실거래가 활용법', desc: '국토부 실거래가 데이터 다운로드·정제·비교 분석까지 단계별 안내', type: '동영상', level: '중급', rating: 4.8, reviews: 234, downloads: 892 },
    { title: '전국 경매 물건 정보 활용', desc: '대법원·온비드 경매 정보를 체계적으로 모니터링하는 방법', type: 'PDF', level: '중급', rating: 4.7, reviews: 189, downloads: 645 },
    { title: '재개발·재건축 추진 현황 확인', desc: '전국 1,567개 사업지구의 단계별 추진 현황 조회와 활용', type: 'Excel', level: '기초', rating: 4.6, reviews: 145, downloads: 412 },
    { title: '공시지가 / 토지이음 활용', desc: '표준지 공시지가 시계열과 토지이용계획을 연계 분석하는 방법', type: 'PDF', level: '중급', rating: 4.7, reviews: 112, downloads: 378 },
    { title: '국토종합개발계획 / 지자체 계획 추적', desc: '국토부·지자체 발표 개발계획을 사전 감지하여 투자에 활용', type: 'PDF', level: '고급', rating: 4.6, reviews: 89, downloads: 256 },
  ],
  references: [
    { title: 'KDI 부동산 시장 분석 리포트', desc: '한국개발연구원의 분기별 부동산 시장 분석 12편 큐레이션', type: 'PDF', level: '중급', rating: 4.7, reviews: 156, downloads: 489 },
    { title: '도시 및 주거환경정비법 해설', desc: '도정법 조문별 해설과 최근 5년 핵심 판례 정리', type: 'PDF', level: '고급', rating: 4.8, reviews: 134, downloads: 423 },
    { title: '농지법 / 산지관리법 / 개발행위허가', desc: '농지·산지 개발 인허가 관련 핵심 법령과 운영지침 종합', type: 'PDF', level: '고급', rating: 4.7, reviews: 112, downloads: 367 },
    { title: '국토종합개발계획 / 지자체 개발계획', desc: '제5차 국토종합계획과 광역·기초 지자체 개발계획 분석법', type: 'PDF', level: '중급', rating: 4.6, reviews: 98, downloads: 312 },
    { title: '부동산 정책 변화 추적법', desc: 'DSR·LTV·세제 등 정책 변경을 사전 감지하는 정보 채널 가이드', type: 'PDF', level: '기초', rating: 4.5, reviews: 76, downloads: 234 },
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
