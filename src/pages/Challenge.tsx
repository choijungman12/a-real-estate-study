import { Trophy, Users, DollarSign, Target } from 'lucide-react'

const CHALLENGES = [
  { title: '12월 경매 분석 챌린지', desc: '실제 경매 물건 10개 분석 및 수익성 예측', prize: '500만원', participants: 156, difficulty: '고급', deadline: '2026-12-31', status: '모집 중' },
  { title: '재개발 후보지 발굴 챌린지', desc: 'AI 기반 재개발 가능성 분석 및 시점 예측', prize: '300만원', participants: 89, difficulty: '중급', deadline: '2026-01-15', status: '진행 중' },
  { title: '토지 개발 사업성 분석', desc: '농지 및 산지의 개발 가능성과 수익성 평가', prize: '800만원', participants: 23, difficulty: '고급', deadline: '2026-02-28', status: '모집 중' },
  { title: '시장 트렌드 예측 챌린지', desc: '2026년 1분기 부동산 시장 동향 예측', prize: '200만원', participants: 234, difficulty: '기초', deadline: '2025-11-30', status: '완료' },
]

const statusColor: Record<string, string> = {
  '모집 중': 'bg-blue-100 text-blue-700',
  '진행 중': 'bg-green-100 text-green-700',
  '완료': 'bg-slate-100 text-slate-600',
}

export default function Challenge() {
  return (
    <>
      <section className="bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block bg-primary text-white text-sm font-semibold px-4 py-2 rounded-full mb-6">
            🏆 실력을 검증하고 보상을 받으세요
          </span>
          <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6">
            실전 투자 능력을<br />
            <span className="accent-text">검증하는 챌린지</span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto">
            AI 부동산 분석 실력을 겨루고, 실제 투자 기회를 얻을 수 있는 다양한 챌린지에 참여해보세요
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
            {[
              { v: '1,247명', l: '참여자 수' },
              { v: '15개', l: '진행 중 챌린지' },
              { v: '5,000만원', l: '총 상금 규모' },
              { v: '89%', l: '완주율' },
            ].map(s => (
              <div key={s.l} className="bg-white/80 rounded-lg p-6">
                <div className="text-2xl font-bold text-primary mb-2">{s.v}</div>
                <div className="text-slate-600 text-sm">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 text-center mb-12">진행 중인 챌린지</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {CHALLENGES.map(c => (
              <div key={c.title} className="glass-card rounded-2xl p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <Trophy className="text-primary" size={28} />
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColor[c.status]}`}>{c.status}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{c.title}</h3>
                <p className="text-slate-600 mb-6">{c.desc}</p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-slate-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-slate-900">{c.prize}</div>
                    <div className="text-xs text-slate-600">1등 상금</div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-slate-900">{c.participants}명</div>
                    <div className="text-xs text-slate-600">참여자</div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
                  <span>난이도: <span className="font-semibold text-slate-900">{c.difficulty}</span></span>
                  <span>마감: {c.deadline}</span>
                </div>
                <button
                  disabled={c.status === '완료'}
                  className={`w-full py-3 rounded-button font-semibold transition ${c.status === '완료' ? 'bg-slate-200 text-slate-500 cursor-not-allowed' : 'bg-primary hover:bg-blue-600 text-white'}`}
                >
                  {c.status === '완료' ? '종료된 챌린지' : '참여하기'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">보상 시스템</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: DollarSign, title: '현금 상금', desc: '최대 1,000만원까지의 현금 보상' },
              { icon: Trophy, title: '투자 기회', desc: '우수자에게 실제 투자 프로젝트 우선 참여 기회' },
              { icon: Users, title: '전문가 멘토링', desc: '업계 최고 전문가들과의 1:1 멘토링' },
              { icon: Target, title: '수료증 & 인증', desc: '공식 수료증과 전문가 인증서 발급' },
            ].map(r => (
              <div key={r.title} className="bg-white rounded-2xl p-6 text-center">
                <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <r.icon className="text-white" size={28} />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{r.title}</h3>
                <p className="text-sm text-slate-600">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
