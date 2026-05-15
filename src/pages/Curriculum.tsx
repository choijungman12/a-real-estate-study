import { Link } from 'react-router-dom'

const MODULES = [
  { num: 1, title: 'AI 부동산 분석 기초', weeks: '4주', level: '기초', desc: 'AI 도구 활용법과 부동산 시장 이해를 바탕으로 데이터 분석의 기초를 다집니다.' },
  { num: 2, title: '공경매 및 경매 분석', weeks: '6주', level: '중급', desc: '경매 시장의 이해와 AI를 활용한 물건 평가, 권리분석을 통한 실전 경매 투자 전략을 학습합니다.' },
  { num: 3, title: '재개발·재건축 분석', weeks: '6주', level: '고급', desc: '정비사업 전 과정을 이해하고 AI 기반 사업성 분석을 통해 재개발 투자 기회를 발굴합니다.' },
  { num: 4, title: '도시개발 및 토지 개발', weeks: '8주', level: '전문가', desc: '도시계획과 토지 개발 사업의 이해를 바탕으로 대규모 개발 프로젝트 분석 능력을 키웁니다.' },
]

const levelColor: Record<string, string> = {
  '기초': 'bg-green-100 text-green-700',
  '중급': 'bg-yellow-100 text-yellow-700',
  '고급': 'bg-orange-100 text-orange-700',
  '전문가': 'bg-red-100 text-red-700',
}

export default function Curriculum() {
  return (
    <>
      <section className="bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block bg-primary text-white text-sm font-semibold px-4 py-2 rounded-full mb-6">
            📚 체계적인 24주 커리큘럼
          </span>
          <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6">
            전문가가 되는<br />
            <span className="accent-text">24주 학습 여정</span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto">
            AI 부동산 분석부터 실전 투자까지, 단계별로 체계적으로 배우는 마스터 코스
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
            {[
              { v: '24주', l: '총 학습 기간' },
              { v: '4개', l: '전문 모듈' },
              { v: '96시간', l: '실습 시간' },
              { v: '12개', l: '프로젝트' },
            ].map(s => (
              <div key={s.l} className="bg-white/80 rounded-lg p-6">
                <div className="text-3xl font-bold text-primary mb-2">{s.v}</div>
                <div className="text-slate-600 text-sm">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">4개 모듈 구성</h2>
            <p className="text-lg text-slate-600">단계별 체계적인 학습 과정</p>
          </div>
          <div className="space-y-6">
            {MODULES.map(m => (
              <div key={m.num} className="glass-card rounded-2xl p-8">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    {m.num}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold text-slate-900">{m.title}</h3>
                      <span className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">{m.weeks}</span>
                      <span className={`text-sm font-medium px-3 py-1 rounded-full ${levelColor[m.level]}`}>{m.level}</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">학습 방법</h2>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="bg-white rounded-2xl p-6">
              <h3 className="font-bold text-slate-900 mb-2">오프라인 강의 (70%)</h3>
              <p className="text-slate-600 text-sm">강남구 소재 전용 강의실에서 진행되는 대면 수업으로 실습과 토론 중심</p>
            </div>
            <div className="bg-white rounded-2xl p-6">
              <h3 className="font-bold text-slate-900 mb-2">온라인 세션 (30%)</h3>
              <p className="text-slate-600 text-sm">Zoom을 활용한 보충 수업과 개별 멘토링, 과제 피드백</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">지금 시작하세요</h2>
          <p className="text-lg text-blue-100 mb-8">24주 후, 당신은 AI 부동산 분석 전문가가 되어 있을 것입니다</p>
          <Link to="/signup" className="bg-white hover:bg-slate-100 text-primary px-8 py-4 rounded-button text-lg font-semibold inline-block transition shadow-lg">
            스터디 신청하기
          </Link>
        </div>
      </section>
    </>
  )
}
