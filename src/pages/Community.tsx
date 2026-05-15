import { useState } from 'react'
import { MessageCircle, Eye, ThumbsUp, Plus, Search } from 'lucide-react'

type Cat = 'all' | 'free' | 'qna' | 'recruit' | 'success' | 'info'
const CATEGORIES: { key: Cat; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'free', label: '자유게시판' },
  { key: 'qna', label: 'Q&A' },
  { key: 'recruit', label: '스터디 모집' },
  { key: 'success', label: '성공사례' },
  { key: 'info', label: '정보교환' },
]

const POSTS = [
  { id: 1, cat: 'qna', title: '경매 물건 권리분석 시 주의해야 할 포인트가 있을까요?', author: '김부동산', date: '2026.05.12', views: 247, comments: 18, likes: 23, hot: true },
  { id: 2, cat: 'success', title: 'AI 분석으로 강남 재개발 후보지 발굴 성공 후기', author: '박데이터', date: '2026.05.10', views: 156, comments: 12, likes: 34, hot: false, isNew: true },
  { id: 3, cat: 'recruit', title: '경기 남부 지역 오프라인 스터디 모임 멤버 모집합니다', author: '이스터디', date: '2026.05.09', views: 89, comments: 7, likes: 12 },
  { id: 4, cat: 'info', title: '5월 부동산 정책 변화 정리 및 투자 전략 조정 방안', author: '최정책', date: '2026.05.08', views: 312, comments: 25, likes: 45 },
  { id: 5, cat: 'free', title: '부동산 투자 초보를 위한 추천 도서 및 학습 순서', author: '신입멤버', date: '2026.05.07', views: 198, comments: 16, likes: 28 },
]

const catColor: Record<string, string> = {
  free: 'bg-blue-100 text-blue-700', qna: 'bg-green-100 text-green-700',
  recruit: 'bg-yellow-100 text-yellow-700', success: 'bg-purple-100 text-purple-700',
  info: 'bg-red-100 text-red-700',
}
const catLabel: Record<string, string> = {
  free: '자유', qna: 'Q&A', recruit: '모집', success: '성공사례', info: '정보',
}

export default function Community() {
  const [active, setActive] = useState<Cat>('all')
  const [query, setQuery] = useState('')

  const filtered = POSTS.filter(p =>
    (active === 'all' || p.cat === active) &&
    (query === '' || p.title.includes(query) || p.author.includes(query))
  )

  return (
    <>
      <section className="bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block bg-primary text-white text-sm font-semibold px-4 py-2 rounded-full mb-6">
            💬 함께 성장하는 소통의 장
          </span>
          <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6">
            함께 성장하는<br />
            <span className="accent-text">스터디 커뮤니티</span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto">
            지식 공유, 질문 답변, 성공 경험을 나누는 소통의 장
          </p>
        </div>
      </section>

      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-4 items-stretch">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="게시글 제목, 작성자로 검색..."
              className="w-full pl-12 pr-4 py-3 rounded-button border-2 border-slate-200 focus:border-primary focus:outline-none text-sm"
            />
          </div>
          <button className="bg-primary hover:bg-blue-600 text-white px-6 py-3 rounded-button font-semibold transition inline-flex items-center justify-center gap-2">
            <Plus size={18} /> 글쓰기
          </button>
        </div>
      </section>

      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map(c => (
            <button
              key={c.key}
              onClick={() => setActive(c.key)}
              className={`px-5 py-2 rounded-button font-medium text-sm transition ${active === c.key ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </section>

      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 space-y-4">
          {filtered.length === 0 && (
            <div className="text-center text-slate-500 py-12">검색 결과가 없습니다.</div>
          )}
          {filtered.map(p => (
            <article key={p.id} className="bg-white border rounded-2xl p-6 hover:shadow-md transition cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${catColor[p.cat]}`}>{catLabel[p.cat]}</span>
                  {p.hot && <span className="text-xs font-semibold bg-red-500 text-white px-2 py-1 rounded">HOT</span>}
                  {p.isNew && <span className="text-xs font-semibold bg-green-500 text-white px-2 py-1 rounded">NEW</span>}
                </div>
                <span className="text-xs text-slate-500">{p.date}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{p.title}</h3>
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span>{p.author}</span>
                <div className="flex gap-4">
                  <span className="inline-flex items-center gap-1"><Eye size={14} /> {p.views}</span>
                  <span className="inline-flex items-center gap-1"><MessageCircle size={14} /> {p.comments}</span>
                  <span className="inline-flex items-center gap-1"><ThumbsUp size={14} /> {p.likes}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
