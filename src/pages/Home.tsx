import { Link } from 'react-router-dom'
import { Brain, Users, ArrowRight, Sparkles } from 'lucide-react'

export default function Home() {
  return (
    <>
      <section className="relative bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100 py-24 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 bg-primary text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg mb-6">
              <Sparkles size={16} /> AI × 부동산 실전 스터디
            </span>
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-slate-900 mb-6">
              AI로 부동산을 분석하고<br />
              <span className="accent-text">미래를 선점하라</span>
            </h1>
            <p className="text-lg lg:text-xl text-slate-700 leading-relaxed mb-8">
              공경매·재개발·재건축·도시개발·토지 개발까지,<br />
              AI와 함께 누구보다 빠르게 기회를 찾는 스터디 그룹
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup" className="bg-primary hover:bg-blue-600 text-white px-8 py-4 rounded-button text-lg font-semibold transition shadow-lg hover:shadow-xl text-center">
                스터디 가입하기
              </Link>
              <Link to="/about" className="border-2 border-slate-300 hover:border-primary bg-white text-slate-900 px-8 py-4 rounded-button text-lg font-semibold transition text-center inline-flex items-center justify-center gap-2">
                스터디 소개 <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card rounded-2xl p-6">
                <Brain className="text-primary mb-3" size={32} />
                <h3 className="font-bold text-slate-900 mb-1">AI 분석</h3>
                <p className="text-sm text-slate-600">데이터 기반 투자 의사결정</p>
              </div>
              <div className="glass-card rounded-2xl p-6 mt-8">
                <Users className="text-primary mb-3" size={32} />
                <h3 className="font-bold text-slate-900 mb-1">실전 스터디</h3>
                <p className="text-sm text-slate-600">전문가와 함께 성장</p>
              </div>
              <div className="glass-card rounded-2xl p-6 col-span-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">평균 투자 성공률</p>
                    <p className="text-3xl font-bold accent-text">87%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-600">평균 수익률</p>
                    <p className="text-3xl font-bold text-green-600">+24%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">왜 우리 스터디인가</h2>
            <p className="text-lg text-slate-600">기술과 실전이 결합된 단 하나의 부동산 학습 경험</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'AI 도구 실전 활용', desc: 'GIS 지도, 가격 예측 모델, 권리 분석 자동화 등 최신 도구를 직접 다룹니다.' },
              { title: '체계적 24주 커리큘럼', desc: '기초 → 경매 → 재개발 → 도시개발까지 단계별 마스터 코스.' },
              { title: '실제 투자 기회 연결', desc: '우수 수료생에게 실제 투자 프로젝트 우선 참여 기회 제공.' },
            ].map(f => (
              <div key={f.title} className="glass-card rounded-2xl p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
                <p className="text-slate-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/curriculum" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
              전체 커리큘럼 보기 <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">지금 바로 시작하세요</h2>
          <p className="text-lg text-blue-100 mb-8">324명의 동료들이 이미 AI 부동산 전문가로 성장하고 있습니다.</p>
          <Link to="/signup" className="bg-white hover:bg-slate-100 text-primary px-8 py-4 rounded-button text-lg font-semibold inline-block transition shadow-lg">
            지금 가입하기
          </Link>
        </div>
      </section>
    </>
  )
}
