import { useState } from 'react'
import {
  MessageCircle,
  Eye,
  ThumbsUp,
  Plus,
  Search,
  Crown,
  Tag,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

type Cat = 'all' | 'free' | 'qna' | 'recruit' | 'success' | 'info'

const CATEGORIES: { key: Cat; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'free', label: '자유게시판' },
  { key: 'qna', label: 'Q&A' },
  { key: 'recruit', label: '스터디 모집' },
  { key: 'success', label: '성공사례' },
  { key: 'info', label: '정보교환' },
]

type Post = {
  id: number
  cat: Exclude<Cat, 'all'>
  title: string
  excerpt: string
  author: string
  date: string
  views: number
  comments: number
  likes: number
  tags: string[]
  hot?: boolean
  isNew?: boolean
  cta?: string
}

const POSTS: Post[] = [
  {
    id: 1,
    cat: 'qna',
    title: '경매 물건 권리분석 시 주의해야 할 포인트가 있을까요?',
    excerpt:
      '말소기준권리 이전 임차인이 있는 물건을 검토 중인데, 대항력 판단 기준과 명도 가능성을 어떻게 평가해야 할지 조언 부탁드립니다.',
    author: '김부동산',
    date: '2026.05.12',
    views: 247,
    comments: 18,
    likes: 23,
    hot: true,
    tags: ['경매', '권리분석', '임차인', '명도'],
    cta: '답변하기',
  },
  {
    id: 2,
    cat: 'success',
    title: 'AI 분석으로 강남 재개발 후보지 발굴 성공 후기',
    excerpt:
      'Python과 공공데이터를 결합한 모델로 6개월 전 후보지를 정확히 예측했습니다. 사용한 지표와 모델 구조를 자세히 공유합니다.',
    author: '박데이터',
    date: '2026.05.10',
    views: 156,
    comments: 12,
    likes: 34,
    isNew: true,
    tags: ['재개발', 'AI', '강남', '성공사례'],
    cta: '자세히 보기',
  },
  {
    id: 3,
    cat: 'recruit',
    title: '경기 남부 지역 오프라인 스터디 모임 멤버 모집합니다',
    excerpt:
      '월 2회 토요일 오후 수원역 인근에서 진행 예정입니다. 경매·재개발·세무 3개 트랙을 운영하며 4-6인 규모로 모집합니다.',
    author: '이스터디',
    date: '2026.05.09',
    views: 89,
    comments: 7,
    likes: 12,
    tags: ['오프라인', '경기남부', '수원', '모집'],
    cta: '참여하기',
  },
  {
    id: 4,
    cat: 'info',
    title: '5월 부동산 정책 변화 정리 및 투자 전략 조정 방안',
    excerpt:
      'DSR 규제 완화안과 양도세 한시 감면 발표 이후 시장 반응을 정리했습니다. 단기·중기 전략 조정 포인트를 함께 공유합니다.',
    author: '최정책',
    date: '2026.05.08',
    views: 312,
    comments: 25,
    likes: 45,
    tags: ['정책', 'DSR', '양도세', '전략'],
    cta: '자세히 보기',
  },
  {
    id: 5,
    cat: 'free',
    title: '부동산 투자 초보를 위한 추천 도서 및 학습 순서',
    excerpt:
      '입문서부터 실전서까지 7권을 단계별로 추천합니다. 각 책의 핵심 챕터와 함께 봐야 할 보조 자료도 정리했습니다.',
    author: '신입멤버',
    date: '2026.05.07',
    views: 198,
    comments: 16,
    likes: 28,
    tags: ['초보', '추천도서', '학습', '입문'],
    cta: '자세히 보기',
  },
  {
    id: 6,
    cat: 'qna',
    title: '재개발 분담금 계산이 너무 어려운데 도와주세요',
    excerpt:
      '권리가액과 종전·종후자산을 어떻게 산출해야 하는지, 분담금 시뮬레이션 도구가 있는지 궁금합니다.',
    author: '재개발왕',
    date: '2026.05.06',
    views: 178,
    comments: 14,
    likes: 19,
    tags: ['재개발', '분담금', '시뮬레이션'],
    cta: '답변하기',
  },
  {
    id: 7,
    cat: 'success',
    title: '6개월 만에 토지 인허가 완료한 실전 노하우',
    excerpt:
      '관리지역 농지를 매입해 인허가까지 6개월 만에 완료한 실전기를 공유합니다. 행정 절차별 소요 기간과 비용을 상세히 정리.',
    author: '땅고수',
    date: '2026.05.05',
    views: 412,
    comments: 32,
    likes: 67,
    hot: true,
    tags: ['토지', '인허가', '개발', '실전'],
    cta: '자세히 보기',
  },
  {
    id: 8,
    cat: 'info',
    title: 'GTX-A 개통 이후 인근 지역 가격 변동 데이터 정리',
    excerpt:
      'GTX-A 정거장 5km 반경 아파트 단지의 개통 전후 6개월 가격 변동을 데이터로 정리했습니다.',
    author: '교통분석가',
    date: '2026.05.04',
    views: 289,
    comments: 21,
    likes: 38,
    tags: ['GTX', '교통호재', '가격변동', '데이터'],
    cta: '자세히 보기',
  },
  {
    id: 9,
    cat: 'free',
    title: '챌린지 처음 도전하는데 어디서부터 시작해야 할까요?',
    excerpt:
      '주별 챌린지부터 가볍게 시작해보고 싶은데 추천 챌린지와 학습 순서를 알려주시면 감사하겠습니다.',
    author: '도전자123',
    date: '2026.05.03',
    views: 134,
    comments: 19,
    likes: 17,
    isNew: true,
    tags: ['챌린지', '입문', '추천', '도전'],
    cta: '답변하기',
  },
  {
    id: 10,
    cat: 'recruit',
    title: 'AI 알고리즘 대회 팀원 1명 추가 모집 (4인 → 5인)',
    excerpt:
      '실거래가 예측 모델 개발 팀에서 데이터 엔지니어 1명을 추가 모집합니다. Python·SQL 가능자 우대.',
    author: '알고리즘팀장',
    date: '2026.05.02',
    views: 98,
    comments: 9,
    likes: 14,
    tags: ['AI대회', '팀원모집', 'Python', '데이터'],
    cta: '참여하기',
  },
]

const NOTICES = [
  {
    type: 'urgent',
    badge: '중요',
    title: '5월 정기 점검 안내 (5/20 02:00 ~ 04:00)',
    date: '2026.05.13',
  },
  {
    type: 'notice',
    badge: '공지',
    title: '커뮤니티 운영 정책 일부 개정 안내',
    date: '2026.05.10',
  },
  {
    type: 'event',
    badge: '이벤트',
    title: '글쓰기 챌린지: 5월 한 달간 누적 추천 시 상품권 지급',
    date: '2026.05.01',
  },
]

const noticeStyle: Record<string, string> = {
  urgent: 'bg-red-100 text-red-700',
  notice: 'bg-blue-100 text-blue-700',
  event: 'bg-green-100 text-green-700',
}

const TOP_POSTS = [
  { rank: 1, title: '6개월 만에 토지 인허가 완료한 실전 노하우', views: 412, comments: 32 },
  { rank: 2, title: '5월 부동산 정책 변화 정리 및 투자 전략 조정', views: 312, comments: 25 },
  { rank: 3, title: 'GTX-A 개통 이후 인근 지역 가격 변동 데이터', views: 289, comments: 21 },
  { rank: 4, title: '경매 물건 권리분석 시 주의해야 할 포인트', views: 247, comments: 18 },
  { rank: 5, title: '부동산 투자 초보를 위한 추천 도서', views: 198, comments: 16 },
]

const TOP_USERS = [
  { rank: 1, name: '박데이터', posts: 87, comments: 312, score: 4820 },
  { rank: 2, name: '최정책', posts: 64, comments: 287, score: 4310 },
  { rank: 3, name: '땅고수', posts: 52, comments: 198, score: 3890 },
  { rank: 4, name: '김부동산', posts: 48, comments: 256, score: 3650 },
  { rank: 5, name: '교통분석가', posts: 41, comments: 178, score: 3210 },
]

const POPULAR_TAGS = [
  { name: '경매', count: 234 },
  { name: '재개발', count: 198 },
  { name: 'AI분석', count: 167 },
  { name: 'Python', count: 145 },
  { name: '강남', count: 132 },
  { name: '정책', count: 128 },
  { name: '토지', count: 117 },
  { name: '권리분석', count: 102 },
  { name: '분담금', count: 95 },
  { name: 'GTX', count: 87 },
  { name: '입문', count: 78 },
  { name: '데이터', count: 156 },
]

const catColor: Record<string, string> = {
  free: 'bg-blue-100 text-blue-700',
  qna: 'bg-green-100 text-green-700',
  recruit: 'bg-yellow-100 text-yellow-700',
  success: 'bg-purple-100 text-purple-700',
  info: 'bg-red-100 text-red-700',
}
const catLabel: Record<string, string> = {
  free: '자유',
  qna: 'Q&A',
  recruit: '모집',
  success: '성공사례',
  info: '정보',
}

const PAGE_SIZE = 5

export default function Community() {
  const [active, setActive] = useState<Cat>('all')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const filtered = POSTS.filter(
    p =>
      (active === 'all' || p.cat === active) &&
      (query === '' ||
        p.title.includes(query) ||
        p.author.includes(query) ||
        p.tags.some(t => t.includes(query))),
  )

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block bg-primary text-white text-sm font-semibold px-4 py-2 rounded-full mb-6">
            함께 성장하는 소통의 장
          </span>
          <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6">
            함께 성장하는<br />
            <span className="accent-text">스터디 커뮤니티</span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto">
            지식 공유, 질문 답변, 성공 경험을 나누는 활발한 소통의 장
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
            {[
              { v: '1,247명', l: '활성 회원' },
              { v: '3,892', l: '총 게시글' },
              { v: '567', l: '활동 작가' },
              { v: '98%', l: '답변률' },
            ].map(s => (
              <div key={s.l} className="bg-white/80 rounded-lg p-6">
                <div className="text-2xl font-bold text-primary mb-2">{s.v}</div>
                <div className="text-slate-600 text-sm">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search + write */}
      <section className="py-10 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-4 items-stretch">
          <div className="flex-1 relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              value={query}
              onChange={e => {
                setQuery(e.target.value)
                setPage(1)
              }}
              placeholder="게시글 제목, 작성자, 태그로 검색..."
              className="w-full pl-12 pr-4 py-3 rounded-button border-2 border-slate-200 focus:border-primary focus:outline-none text-sm"
            />
          </div>
          <button className="bg-primary hover:bg-secondary text-white px-6 py-3 rounded-button font-semibold transition inline-flex items-center justify-center gap-2">
            <Plus size={18} /> 글쓰기
          </button>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map(c => (
            <button
              key={c.key}
              onClick={() => {
                setActive(c.key)
                setPage(1)
              }}
              className={`px-5 py-2 rounded-button font-medium text-sm transition ${
                active === c.key
                  ? 'bg-primary text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </section>

      {/* Notices */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-r from-blue-50 to-slate-50 border border-blue-100 rounded-2xl p-5 lg:p-6">
            <h3 className="text-sm font-bold text-slate-900 mb-3">공지사항</h3>
            <ul className="space-y-2">
              {NOTICES.map(n => (
                <li
                  key={n.title}
                  className="flex items-center gap-3 text-sm hover:bg-white/60 p-2 rounded-lg transition cursor-pointer"
                >
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded ${noticeStyle[n.type]}`}
                  >
                    {n.badge}
                  </span>
                  <span className="flex-1 text-slate-800 truncate">{n.title}</span>
                  <span className="text-xs text-slate-500">{n.date}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Main + Sidebar */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-8">
          {/* Main posts */}
          <div className="lg:col-span-2 space-y-4">
            {paged.length === 0 && (
              <div className="text-center text-slate-500 py-16 bg-white rounded-2xl">
                검색 결과가 없습니다.
              </div>
            )}
            {paged.map(p => (
              <article
                key={p.id}
                className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition"
              >
                <div className="flex items-start gap-4">
                  <div className="hidden sm:flex w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary text-white font-bold items-center justify-center flex-shrink-0">
                    {p.author[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full ${catColor[p.cat]}`}
                        >
                          {catLabel[p.cat]}
                        </span>
                        {p.hot && (
                          <span className="text-xs font-semibold bg-red-500 text-white px-2 py-0.5 rounded">
                            HOT
                          </span>
                        )}
                        {p.isNew && (
                          <span className="text-xs font-semibold bg-green-500 text-white px-2 py-0.5 rounded">
                            NEW
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-500">{p.date}</span>
                    </div>
                    <h3 className="text-lg lg:text-xl font-bold text-slate-900 mb-2 cursor-pointer hover:text-primary transition">
                      {p.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">
                      {p.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {p.tags.map(t => (
                        <span
                          key={t}
                          className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full hover:bg-slate-200 cursor-pointer transition"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="font-semibold text-slate-700">{p.author}</span>
                        <span className="inline-flex items-center gap-1">
                          <Eye size={13} /> {p.views}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MessageCircle size={13} /> {p.comments}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <ThumbsUp size={13} /> {p.likes}
                        </span>
                      </div>
                      <button className="text-xs bg-primary/10 text-primary hover:bg-primary hover:text-white font-semibold px-4 py-1.5 rounded-button transition">
                        {p.cta ?? '자세히 보기'}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}

            {/* Pagination */}
            {filtered.length > 0 && (
              <div className="flex items-center justify-center gap-2 pt-6">
                <button
                  onClick={() => setPage(Math.max(1, safePage - 1))}
                  disabled={safePage === 1}
                  className="w-9 h-9 rounded-button border border-slate-200 inline-flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-40"
                  aria-label="이전 페이지"
                >
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                  const p = i + 1
                  return (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-9 h-9 rounded-button text-sm font-semibold transition ${
                        safePage === p
                          ? 'bg-primary text-white'
                          : 'border border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {p}
                    </button>
                  )
                })}
                <button
                  onClick={() => setPage(Math.min(totalPages, safePage + 1))}
                  disabled={safePage === totalPages}
                  className="w-9 h-9 rounded-button border border-slate-200 inline-flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-40"
                  aria-label="다음 페이지"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span>이번 주 인기 게시글</span>
              </h3>
              <ul className="space-y-3">
                {TOP_POSTS.map(p => (
                  <li
                    key={p.rank}
                    className="flex gap-3 items-start hover:bg-slate-50 p-2 -mx-2 rounded-lg transition cursor-pointer"
                  >
                    <span
                      className={`flex-shrink-0 w-6 h-6 rounded text-xs font-bold flex items-center justify-center ${
                        p.rank <= 3
                          ? 'bg-primary text-white'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {p.rank}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-slate-800 font-medium line-clamp-2">
                        {p.title}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5 inline-flex items-center gap-3">
                        <span className="inline-flex items-center gap-1">
                          <Eye size={11} /> {p.views}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MessageCircle size={11} /> {p.comments}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h3 className="font-bold text-slate-900 mb-4">활동 우수 회원</h3>
              <ul className="space-y-3">
                {TOP_USERS.map(u => (
                  <li key={u.rank} className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary text-white font-bold flex items-center justify-center">
                        {u.name[0]}
                      </div>
                      {u.rank === 1 && (
                        <Crown
                          className="absolute -top-2 -right-1 text-yellow-500"
                          size={14}
                          fill="currentColor"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-slate-900 truncate">
                        {u.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        글 {u.posts} · 댓글 {u.comments}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-primary">
                        {u.score.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-slate-500">활동점수</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Tag size={16} /> 인기 태그
              </h3>
              <div className="flex flex-wrap gap-2">
                {POPULAR_TAGS.map(t => (
                  <button
                    key={t.name}
                    onClick={() => setQuery(t.name)}
                    className="text-xs bg-slate-100 hover:bg-primary hover:text-white text-slate-600 px-3 py-1.5 rounded-full transition"
                  >
                    #{t.name} <span className="opacity-60">{t.count}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Community guide */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">커뮤니티 가이드</h2>
            <p className="text-slate-600">건강한 소통을 위한 가이드를 확인하세요</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: '커뮤니티 규칙',
                desc: '서로 존중하고 건강한 토론 문화를 만들기 위한 8가지 기본 규칙',
                cta: '규칙 보기',
                color: 'from-blue-50 to-blue-100',
                btn: 'bg-primary hover:bg-secondary',
              },
              {
                title: '게시글 작성 가이드',
                desc: '카테고리·제목·태그·본문 작성 팁과 추천 양식 정리',
                cta: '가이드 열기',
                color: 'from-emerald-50 to-emerald-100',
                btn: 'bg-emerald-500 hover:bg-emerald-600',
              },
              {
                title: '신고하기',
                desc: '광고·욕설·허위정보 등 부적절한 게시물을 빠르게 신고하세요',
                cta: '신고 안내',
                color: 'from-rose-50 to-rose-100',
                btn: 'bg-rose-500 hover:bg-rose-600',
              },
            ].map(g => (
              <div
                key={g.title}
                className={`bg-gradient-to-br ${g.color} rounded-2xl p-6 lg:p-8`}
              >
                <h3 className="text-xl font-bold text-slate-900 mb-3">{g.title}</h3>
                <p className="text-sm text-slate-600 mb-6 leading-relaxed">{g.desc}</p>
                <button
                  className={`${g.btn} text-white px-5 py-2.5 rounded-button text-sm font-semibold transition`}
                >
                  {g.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating write button */}
      <button
        className="fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary text-white shadow-2xl flex items-center justify-center hover:scale-110 transition"
        aria-label="글쓰기"
      >
        <Plus size={24} />
      </button>
    </>
  )
}
