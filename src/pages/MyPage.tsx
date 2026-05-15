import { useState } from 'react'
import { FileText, MessageCircle, ThumbsUp, Trophy, Edit, Settings } from 'lucide-react'

type Tab = 'posts' | 'comments' | 'bookmarks' | 'settings'

export default function MyPage() {
  const [tab, setTab] = useState<Tab>('posts')

  return (
    <>
      <section className="bg-gradient-to-br from-primary via-blue-600 to-secondary py-16 relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-2xl">
                김
              </div>
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">김부동산</h1>
                <p className="text-slate-600 mb-4">AI 부동산 투자 전문가 · 가입일: 2024.08.15</p>
                <p className="text-slate-700 leading-relaxed max-w-2xl">
                  부동산 투자 10년차로 AI 기술을 활용한 데이터 분석에 관심이 많습니다.
                  특히 경매와 재개발 분야에서 다양한 성공 경험을 쌓아왔습니다.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <button className="bg-primary hover:bg-blue-600 text-white px-6 py-3 rounded-button font-semibold inline-flex items-center justify-center gap-2 transition">
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

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: FileText, label: '작성한 게시글', value: 47, color: 'blue' },
            { icon: MessageCircle, label: '작성한 댓글', value: 234, color: 'green' },
            { icon: ThumbsUp, label: '받은 좋아요', value: 892, color: 'red' },
            { icon: Trophy, label: '활동 점수', value: 1247, color: 'purple' },
          ].map(s => (
            <div key={s.label} className="bg-slate-50 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-4">
                <s.icon className={`text-${s.color}-600`} size={24} />
              </div>
              <div className="text-2xl font-bold text-slate-900 mb-1">{s.value.toLocaleString()}</div>
              <div className="text-slate-600 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-8 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-sm border">
            <div className="border-b border-slate-200 flex overflow-x-auto">
              {[
                { key: 'posts' as Tab, label: '내 게시글', icon: FileText },
                { key: 'comments' as Tab, label: '내 댓글', icon: MessageCircle },
                { key: 'bookmarks' as Tab, label: '북마크', icon: ThumbsUp },
                { key: 'settings' as Tab, label: '알림설정', icon: Settings },
              ].map(t => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`px-6 py-4 font-semibold whitespace-nowrap inline-flex items-center gap-2 transition border-b-2 ${tab === t.key ? 'text-primary border-primary' : 'text-slate-600 border-transparent hover:text-slate-900'}`}
                >
                  <t.icon size={18} /> {t.label}
                </button>
              ))}
            </div>
            <div className="p-8">
              {tab === 'posts' && (
                <div className="space-y-4">
                  {['경매 물건 권리분석 시 주의해야 할 포인트', 'AI 분석으로 강남 재개발 후보지 발굴 성공', '5월 부동산 정책 변화 정리'].map(t => (
                    <div key={t} className="border rounded-xl p-6">
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{t}</h3>
                      <p className="text-slate-600 text-sm mb-3 line-clamp-2">관련 본문 미리보기 텍스트가 들어가는 영역입니다.</p>
                      <div className="flex justify-between text-sm text-slate-500">
                        <span>2026.05.12</span>
                        <div className="flex gap-2">
                          <button className="text-primary hover:underline">수정</button>
                          <button className="text-red-500 hover:underline">삭제</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {tab === 'comments' && <div className="text-center text-slate-500 py-12">작성한 댓글이 없습니다.</div>}
              {tab === 'bookmarks' && <div className="text-center text-slate-500 py-12">북마크한 글이 없습니다.</div>}
              {tab === 'settings' && (
                <div className="space-y-4">
                  {['댓글 알림', '좋아요 알림', '시스템 알림', '마케팅 알림'].map(s => (
                    <div key={s} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <span className="font-medium text-slate-900">{s}</span>
                      <button className="bg-primary text-white px-4 py-2 rounded text-sm">활성</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
