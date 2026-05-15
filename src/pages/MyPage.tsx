import { useState } from 'react'
import {
  FileText,
  MessageCircle,
  ThumbsUp,
  Trophy,
  Edit,
  Settings,
  Bookmark,
  Bell,
  Crown,
  Eye,
  Calendar,
  Sparkles,
  CheckCircle2,
  X,
} from 'lucide-react'

type Tab = 'posts' | 'comments' | 'bookmarks' | 'settings'

type Post = {
  id: number
  title: string
  excerpt: string
  category: string
  hot: boolean
  date: string
  views: number
  comments: number
  likes: number
}

type Comment = {
  id: number
  text: string
  parent: string
  date: string
}

type BookmarkItem = {
  id: number
  title: string
  author: string
  category: string
  views: number
  comments: number
  date: string
  gradient: string
}

type NotiKey = 'comment' | 'like' | 'system' | 'marketing'
type Channel = 'email' | 'push'

type Activity = {
  id: number
  title: string
  description: string
  time: string
  color: string
}

const POSTS: Post[] = [
  {
    id: 1,
    title: '경매 물건 권리분석 시 반드시 확인해야 할 7가지 포인트',
    excerpt:
      '경매 입찰 전 등기부등본, 임차인 현황, 유치권 신고 여부, 토지 별도등기, 법정지상권 등 권리분석에서 놓치면 안 되는 항목들을 사례와 함께 자세히 정리했습니다.',
    category: '경매분석',
    hot: true,
    date: '2026.05.14',
    views: 2847,
    comments: 47,
    likes: 312,
  },
  {
    id: 2,
    title: 'AI 분석으로 발견한 강남권 재개발 후보지 TOP 5',
    excerpt:
      'GPT-4와 자체 개발한 입지 분석 모델을 활용해 향후 5년 내 재개발 가능성이 높은 강남권 노후 단지를 선별했습니다. 데이터와 함께 근거를 공개합니다.',
    category: '재개발',
    hot: true,
    date: '2026.05.10',
    views: 5234,
    comments: 89,
    likes: 624,
  },
  {
    id: 3,
    title: '5월 부동산 정책 변화 한눈에 정리 — DSR·LTV·세제 개편',
    excerpt:
      '정부가 발표한 부동산 정책 변경 사항을 투자자 관점에서 핵심만 모았습니다. DSR 규제 완화, LTV 상향, 양도세 일부 감면 등 주요 변경 포인트를 살펴봅니다.',
    category: '정책',
    hot: false,
    date: '2026.05.08',
    views: 1923,
    comments: 34,
    likes: 198,
  },
  {
    id: 4,
    title: '소형 오피스텔 투자, 지금 들어가도 늦지 않을까?',
    excerpt:
      '금리 인하 사이클 진입에 따른 임대 수익률 변화와 1인 가구 증가 추세를 데이터로 분석했습니다. 서울 주요 권역별 투자 전략을 비교합니다.',
    category: '오피스텔',
    hot: false,
    date: '2026.05.03',
    views: 1456,
    comments: 28,
    likes: 145,
  },
  {
    id: 5,
    title: '경기도 신도시 분양권 양도, 절세 전략 정리',
    excerpt:
      '분양권 보유 기간별 세율 변화, 일시적 1가구 2주택 활용법, 증여·양도 비교 시뮬레이션까지 실제 사례 중심으로 풀어드립니다.',
    category: '세금',
    hot: false,
    date: '2026.04.28',
    views: 987,
    comments: 19,
    likes: 87,
  },
]

const COMMENTS: Comment[] = [
  {
    id: 1,
    text: '권리분석 부분 너무 잘 정리해주셨네요. 특히 유치권 신고 케이스는 실제로 놓치기 쉬운 포인트라 도움이 많이 되었습니다. 추가 사례 공유 부탁드려요!',
    parent: '경매 물건 권리분석 시 반드시 확인해야 할 7가지 포인트',
    date: '2026.05.13',
  },
  {
    id: 2,
    text: 'AI 분석 모델 자세히 공유 가능하실까요? 어떤 변수를 가중치 높게 두셨는지 궁금합니다. 저도 비슷한 모델을 만들어보고 있어서요.',
    parent: 'AI 분석으로 발견한 강남권 재개발 후보지 TOP 5',
    date: '2026.05.11',
  },
  {
    id: 3,
    text: '정책 정리 감사합니다. DSR 규제 완화 부분은 실제 한도 계산이 어떻게 바뀌는지 표로 보면 더 좋을 것 같아요.',
    parent: '5월 부동산 정책 변화 한눈에 정리',
    date: '2026.05.09',
  },
  {
    id: 4,
    text: '오피스텔은 지역별 편차가 워낙 커서 일반화하기 어려운데, 권역별로 나눠서 보여주신 점이 인상적이었습니다.',
    parent: '소형 오피스텔 투자, 지금 들어가도 늦지 않을까?',
    date: '2026.05.04',
  },
  {
    id: 5,
    text: '시뮬레이션 표 정말 유용합니다. 저희 가족 케이스랑 거의 비슷해서 바로 적용해볼 수 있을 것 같아요.',
    parent: '경기도 신도시 분양권 양도, 절세 전략 정리',
    date: '2026.04.29',
  },
]

const BOOKMARKS: BookmarkItem[] = [
  {
    id: 1,
    title: '재개발 정비구역 지정 절차 완전 정복',
    author: '박정비',
    category: '재개발',
    views: 4521,
    comments: 67,
    date: '2026.05.12',
    gradient: 'from-blue-400 to-blue-600',
  },
  {
    id: 2,
    title: 'GPT를 활용한 임장 보고서 자동화 워크플로우',
    author: '이에이아이',
    category: 'AI도구',
    views: 3287,
    comments: 52,
    date: '2026.05.10',
    gradient: 'from-purple-400 to-purple-600',
  },
  {
    id: 3,
    title: '서울 외곽 토지 투자, 어디까지 봐야 할까',
    author: '김토지',
    category: '토지',
    views: 2153,
    comments: 41,
    date: '2026.05.07',
    gradient: 'from-green-400 to-green-600',
  },
  {
    id: 4,
    title: '갭투자 리스크 관리 — 2026년판 체크리스트',
    author: '최갭투',
    category: '갭투자',
    views: 5891,
    comments: 124,
    date: '2026.05.03',
    gradient: 'from-orange-400 to-orange-600',
  },
  {
    id: 5,
    title: '상가 임대 수익률 산정의 함정 5가지',
    author: '윤상가',
    category: '상가',
    views: 1872,
    comments: 33,
    date: '2026.04.28',
    gradient: 'from-pink-400 to-pink-600',
  },
  {
    id: 6,
    title: '재건축 안전진단 통과 단지 분석 리포트',
    author: '강재건',
    category: '재건축',
    views: 6428,
    comments: 98,
    date: '2026.04.20',
    gradient: 'from-teal-400 to-teal-600',
  },
]

const ACTIVITIES: Activity[] = [
  { id: 1, title: '새 게시글 작성', description: '"경매 물건 권리분석 시 반드시 확인해야 할 7가지 포인트" 발행', time: '2시간 전', color: 'bg-primary' },
  { id: 2, title: '댓글 작성', description: '"재개발 정비구역 지정 절차 완전 정복" 글에 댓글을 남겼습니다', time: '5시간 전', color: 'bg-emerald-500' },
  { id: 3, title: '게시글 북마크', description: '"GPT를 활용한 임장 보고서 자동화 워크플로우" 북마크에 저장', time: '1일 전', color: 'bg-amber-500' },
  { id: 4, title: '좋아요 받음', description: '내 게시글에 24개의 좋아요가 추가되었습니다', time: '2일 전', color: 'bg-pink-500' },
  { id: 5, title: '레벨업 — Silver → Gold 🎉', description: '활동 점수 1,000P를 달성하여 Gold 등급으로 승급했습니다', time: '3일 전', color: 'bg-yellow-500' },
  { id: 6, title: '스터디 모임 참여', description: '"AI 임장 워크숍 7기" 정기 모임에 참여하셨습니다', time: '5일 전', color: 'bg-purple-500' },
]

export default function MyPage() {
  const [tab, setTab] = useState<Tab>('posts')
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(BOOKMARKS)
  const [notifications, setNotifications] = useState<Record<NotiKey, Record<Channel, boolean>>>({
    comment: { email: true, push: true },
    like: { email: false, push: true },
    system: { email: true, push: true },
    marketing: { email: false, push: false },
  })

  const toggleNoti = (key: NotiKey, channel: Channel) =>
    setNotifications(prev => ({
      ...prev,
      [key]: { ...prev[key], [channel]: !prev[key][channel] },
    }))

  const removeBookmark = (id: number) => setBookmarks(prev => prev.filter(b => b.id !== id))

  const points = 1247
  const nextLevel = 2000
  const progress = Math.round((points / nextLevel) * 100)
  const levels = [
    { name: 'Bronze', min: 0 },
    { name: 'Silver', min: 500 },
    { name: 'Gold', min: 1000 },
    { name: 'Platinum', min: 2000 },
  ]
  const currentLevelIdx = 2

  const notiCategories: { key: NotiKey; title: string; desc: string }[] = [
    { key: 'comment', title: '댓글 알림', desc: '내 게시글에 새 댓글이 달리거나 답글이 등록될 때' },
    { key: 'like', title: '좋아요 알림', desc: '내 게시글이나 댓글에 좋아요가 추가될 때' },
    { key: 'system', title: '시스템 알림', desc: '점검 안내, 약관 변경, 보안 관련 등 중요 알림' },
    { key: 'marketing', title: '마케팅 알림', desc: '신규 강의, 이벤트, 프로모션 정보 수신' },
  ]

  return (
    <>
      {/* Profile hero */}
      <section className="bg-gradient-to-br from-primary via-blue-600 to-secondary py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-300 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 -mb-24">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/40">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-5xl font-bold shadow-2xl">
                  김
                </div>
                <div className="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full p-2 shadow-lg">
                  <Crown size={20} className="text-white" />
                </div>
              </div>
              <div className="flex-1 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-slate-900">김부동산</h1>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">Gold 등급</span>
                </div>
                <p className="text-slate-600 mb-4">AI 부동산 투자 전문가 · 가입일 2024.08.15 · 활동 기수 5기</p>
                <p className="text-slate-700 leading-relaxed max-w-2xl">
                  부동산 투자 10년차로 AI 기술을 활용한 데이터 분석에 관심이 많습니다.
                  특히 경매와 재개발 분야에서 다양한 성공 경험을 쌓아왔으며, 스터디 멤버들과 인사이트를 나누는 것을 좋아합니다.
                </p>
              </div>
              <div className="flex flex-col gap-3 w-full lg:w-auto">
                <button className="bg-primary hover:bg-secondary text-white px-6 py-3 rounded-button font-semibold inline-flex items-center justify-center gap-2 transition shadow-md">
                  <Edit size={18} /> 프로필 수정
                </button>
                <button className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-6 py-3 rounded-button font-semibold inline-flex items-center justify-center gap-2 transition">
                  <Settings size={18} /> 계정 설정
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer for overlap */}
      <div className="h-24" />

      {/* Level & Points */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-br from-yellow-50 via-white to-amber-50 rounded-3xl p-8 border border-yellow-200 shadow-sm">
            <div className="flex flex-col lg:flex-row gap-8 items-stretch">
              <div className="flex items-center gap-4 lg:border-r lg:border-yellow-200 lg:pr-8">
                <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-lg">
                  <Trophy className="text-white" size={32} />
                </div>
                <div>
                  <div className="text-xs text-yellow-700 font-semibold mb-1">현재 레벨</div>
                  <div className="text-2xl font-bold text-slate-900">Gold</div>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-end mb-3">
                  <div>
                    <div className="text-xs text-slate-500 font-semibold mb-1">현재 포인트</div>
                    <div className="text-3xl font-bold text-slate-900">{points.toLocaleString()}<span className="text-lg text-slate-500 ml-1">P</span></div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-500 mb-1">다음 레벨까지</div>
                    <div className="text-lg font-bold text-primary">{(nextLevel - points).toLocaleString()}P 남음</div>
                  </div>
                </div>
                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between mt-6">
                  {levels.map((lv, i) => (
                    <div key={lv.name} className="flex flex-col items-center flex-1 relative">
                      {i < levels.length - 1 && (
                        <div className={`absolute top-4 left-1/2 w-full h-0.5 ${i < currentLevelIdx ? 'bg-primary' : 'bg-slate-200'}`} />
                      )}
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold relative z-10 transition ${
                          i === currentLevelIdx
                            ? 'bg-yellow-400 text-white ring-4 ring-yellow-200 scale-125'
                            : i < currentLevelIdx
                            ? 'bg-primary text-white'
                            : 'bg-slate-200 text-slate-500'
                        }`}
                      >
                        {i < currentLevelIdx ? <CheckCircle2 size={16} /> : i + 1}
                      </div>
                      <div className={`text-xs mt-2 font-semibold ${i === currentLevelIdx ? 'text-yellow-700' : 'text-slate-500'}`}>
                        {lv.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stat cards */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: FileText, label: '작성한 게시글', value: 47, color: 'bg-blue-100 text-blue-600' },
            { icon: MessageCircle, label: '작성한 댓글', value: 234, color: 'bg-emerald-100 text-emerald-600' },
            { icon: ThumbsUp, label: '받은 좋아요', value: 892, color: 'bg-rose-100 text-rose-600' },
            { icon: Trophy, label: '활동 점수', value: 1247, color: 'bg-purple-100 text-purple-600' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl p-6 text-center border border-slate-200 hover:shadow-lg transition">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 ${s.color}`}>
                <s.icon size={26} />
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">{s.value.toLocaleString()}</div>
              <div className="text-slate-600 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Tabs */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
            <div className="border-b border-slate-200 flex overflow-x-auto">
              {[
                { key: 'posts' as Tab, label: '내 게시글', icon: FileText, count: POSTS.length },
                { key: 'comments' as Tab, label: '내 댓글', icon: MessageCircle, count: COMMENTS.length },
                { key: 'bookmarks' as Tab, label: '북마크', icon: Bookmark, count: bookmarks.length },
                { key: 'settings' as Tab, label: '알림설정', icon: Bell, count: 0 },
              ].map(t => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`px-6 py-4 font-semibold whitespace-nowrap inline-flex items-center gap-2 transition border-b-2 ${
                    tab === t.key ? 'text-primary border-primary' : 'text-slate-600 border-transparent hover:text-slate-900'
                  }`}
                >
                  <t.icon size={18} /> {t.label}
                  {t.count > 0 && (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${tab === t.key ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'}`}>
                      {t.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="p-8">
              {tab === 'posts' && (
                <div className="space-y-4">
                  {POSTS.map(p => (
                    <article key={p.id} className="border border-slate-200 rounded-xl p-6 hover:shadow-md transition">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2.5 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">{p.category}</span>
                        {p.hot && (
                          <span className="px-2.5 py-1 bg-red-100 text-red-600 rounded-full text-xs font-semibold inline-flex items-center gap-1">
                            <Sparkles size={10} /> HOT
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2 hover:text-primary transition cursor-pointer">{p.title}</h3>
                      <p className="text-slate-600 text-sm mb-4 line-clamp-2">{p.excerpt}</p>
                      <div className="flex items-center justify-between flex-wrap gap-2 text-sm">
                        <div className="flex items-center gap-4 text-slate-500">
                          <span className="inline-flex items-center gap-1">
                            <Calendar size={14} /> {p.date}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Eye size={14} /> {p.views.toLocaleString()}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <MessageCircle size={14} /> {p.comments}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <ThumbsUp size={14} /> {p.likes}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <button className="px-3 py-1.5 text-primary hover:bg-primary/10 rounded-lg text-sm font-semibold transition">수정</button>
                          <button className="px-3 py-1.5 text-red-500 hover:bg-red-50 rounded-lg text-sm font-semibold transition">삭제</button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {tab === 'comments' && (
                <div className="space-y-4">
                  {COMMENTS.map(c => (
                    <div key={c.id} className="border border-slate-200 rounded-xl p-6 hover:shadow-md transition">
                      <p className="text-slate-800 mb-3 line-clamp-2 leading-relaxed">{c.text}</p>
                      <div className="flex items-center justify-between flex-wrap gap-2 text-sm">
                        <div className="flex items-center gap-3 text-slate-500">
                          <a href="#" className="text-primary hover:underline truncate max-w-md">{c.parent}</a>
                          <span className="inline-flex items-center gap-1">
                            <Calendar size={14} /> {c.date}
                          </span>
                        </div>
                        <button className="px-3 py-1.5 text-red-500 hover:bg-red-50 rounded-lg text-sm font-semibold transition inline-flex items-center gap-1">
                          <X size={14} /> 삭제
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {tab === 'bookmarks' && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {bookmarks.map(b => (
                    <div key={b.id} className="border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition group">
                      <div className={`h-32 bg-gradient-to-br ${b.gradient} relative flex items-end p-4`}>
                        <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/30 backdrop-blur text-white rounded-full text-xs font-semibold">
                          {b.category}
                        </span>
                        <button
                          onClick={() => removeBookmark(b.id)}
                          className="absolute top-3 right-3 w-9 h-9 bg-white/30 backdrop-blur hover:bg-white/50 rounded-full flex items-center justify-center transition"
                          title="북마크 해제"
                        >
                          <Bookmark size={16} className="text-white fill-white" />
                        </button>
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-primary transition">{b.title}</h4>
                        <div className="text-sm text-slate-500 mb-3">by {b.author}</div>
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <div className="flex gap-3">
                            <span className="inline-flex items-center gap-1"><Eye size={12} /> {b.views.toLocaleString()}</span>
                            <span className="inline-flex items-center gap-1"><MessageCircle size={12} /> {b.comments}</span>
                          </div>
                          <span>{b.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {bookmarks.length === 0 && (
                    <div className="col-span-full text-center py-12 text-slate-500">북마크한 글이 없습니다.</div>
                  )}
                </div>
              )}

              {tab === 'settings' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-12 gap-4 px-5 py-3 bg-slate-50 rounded-lg text-xs font-semibold text-slate-600">
                    <div className="col-span-8">알림 종류</div>
                    <div className="col-span-2 text-center">이메일</div>
                    <div className="col-span-2 text-center">푸시</div>
                  </div>
                  {notiCategories.map(n => (
                    <div key={n.key} className="grid grid-cols-12 gap-4 items-center p-5 border border-slate-200 rounded-xl hover:bg-slate-50 transition">
                      <div className="col-span-8">
                        <div className="font-semibold text-slate-900 mb-1">{n.title}</div>
                        <div className="text-sm text-slate-500">{n.desc}</div>
                      </div>
                      <div className="col-span-2 flex justify-center">
                        <Toggle on={notifications[n.key].email} onClick={() => toggleNoti(n.key, 'email')} />
                      </div>
                      <div className="col-span-2 flex justify-center">
                        <Toggle on={notifications[n.key].push} onClick={() => toggleNoti(n.key, 'push')} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Activity Timeline */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-primary rounded-full" />
            <h2 className="text-2xl font-bold text-slate-900">최근 활동 내역</h2>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <ol className="relative">
              {ACTIVITIES.map((a, i) => (
                <li key={a.id} className="relative pl-12 pb-8 last:pb-0">
                  {i < ACTIVITIES.length - 1 && (
                    <div className="absolute left-[14px] top-8 bottom-0 w-0.5 bg-slate-200" />
                  )}
                  <div className={`absolute left-0 top-1 w-7 h-7 rounded-full ${a.color} ring-4 ring-white shadow-md flex items-center justify-center`}>
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <div className="font-semibold text-slate-900">{a.title}</div>
                    <div className="text-xs text-slate-500">{a.time}</div>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">{a.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  )
}

function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`relative w-12 h-6 rounded-full transition ${on ? 'bg-primary' : 'bg-slate-300'}`}
      aria-pressed={on}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
          on ? 'translate-x-6' : ''
        }`}
      />
    </button>
  )
}
