import { Link } from 'react-router-dom'
import { GraduationCap, Users, Trophy, Rocket } from 'lucide-react'

const PURPOSES = [
  { icon: GraduationCap, title: '혁신적 학습', desc: 'AI 기술을 활용한 새로운 부동산 분석 방법론으로 기존 투자 방식의 한계를 극복합니다.' },
  { icon: Users, title: '전문가 네트워크', desc: '부동산·법률·금융·개발 업계 전문가들과의 네트워크로 실무 인사이트를 공유합니다.' },
  { icon: Trophy, title: '실제 성과', desc: '이론에서 그치지 않고 실제 투자 성과를 창출할 수 있는 실전 능력을 배양합니다.' },
  { icon: Rocket, title: '미래 준비', desc: '급변하는 부동산 시장에서 AI 기술로 미래 트렌드를 선점하는 역량을 키웁니다.' },
]

export default function About() {
  return (
    <>
      <section className="bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block bg-primary text-white text-sm font-semibold px-4 py-2 rounded-full mb-6">
            🎓 AI × 부동산 전문 교육
          </span>
          <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6">
            함께 배우고 함께 성장하는<br />
            <span className="accent-text">AI 부동산 스터디</span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto">
            전문가와 함께하는 체계적 학습 과정으로 AI 기반 부동산 투자 전문가가 되어보세요
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">설립 목적</h2>
            <p className="text-lg text-slate-600">AI 기술과 부동산 전문 지식의 결합</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PURPOSES.map(p => (
              <div key={p.title} className="text-center space-y-4">
                <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                  <p.icon className="text-primary" size={36} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{p.title}</h3>
                <p className="text-slate-600 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">이사진 소개</h2>
            <p className="text-lg text-slate-600">부동산과 AI 분야 전문가들이 함께합니다</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: '김성호', role: '대표 / AI 부동산 분석 전문가', desc: '15년간 부동산 개발·투자 경험, AI 기반 분석 시스템 개발자' },
              { name: '이미선', role: '교육이사 / 부동산 투자 컨설턴트', desc: '공인중개사, 1,000건 이상 투자 자문, 재개발·재건축 전문가' },
              { name: '박준혁', role: '기술이사 / 데이터 사이언티스트', desc: 'KAIST 출신, 빅데이터 및 머신러닝, 부동산 데이터 플랫폼 개발' },
              { name: '정유진', role: '법무이사 / 부동산 전문 변호사', desc: '부동산 관련 법무 전문, 경매·개발 법률 자문 다수 경험' },
              { name: '최동현', role: '투자이사 / 부동산 펀드 매니저', desc: '대형 부동산 펀드 운용 경험, 기관 투자자 대상 자문' },
              { name: '한지영', role: '개발이사 / 도시계획 전문가', desc: '도시계획 및 개발 사업 전문, 지자체 도시계획 수립 다수 참여' },
            ].map(p => (
              <div key={p.name} className="glass-card rounded-2xl p-8 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                  {p.name[0]}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{p.name}</h3>
                <p className="text-primary font-semibold text-sm mb-3">{p.role}</p>
                <p className="text-slate-600 text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">AI 부동산 전문가로 성장하세요</h2>
          <p className="text-lg text-blue-100 mb-8">지금 시작하면 미래 부동산 시장의 리더가 될 수 있습니다</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="bg-white hover:bg-slate-100 text-primary px-8 py-4 rounded-button text-lg font-semibold transition shadow-lg">
              스터디 가입 신청
            </Link>
            <Link to="/curriculum" className="border-2 border-white hover:bg-white hover:text-primary text-white px-8 py-4 rounded-button text-lg font-semibold transition">
              커리큘럼 보기
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
