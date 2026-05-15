import { useState } from 'react'
import { FileText, Video, FileSpreadsheet, Code, Database, BookOpen, Download } from 'lucide-react'

type CatKey = 'learning' | 'tools' | 'templates' | 'datasets'

const CATEGORIES: { key: CatKey; label: string }[] = [
  { key: 'learning', label: '학습 자료' },
  { key: 'tools', label: 'AI 도구 가이드' },
  { key: 'templates', label: '분석 템플릿' },
  { key: 'datasets', label: '데이터셋' },
]

type Resource = {
  title: string
  desc: string
  type: 'PDF' | '동영상' | 'Excel' | 'Code' | 'CSV'
  level: '기초' | '중급' | '고급'
  rating: number
  downloads: number
}

const ITEMS: Record<CatKey, Resource[]> = {
  learning: [
    { title: '부동산 투자 기초 가이드', desc: '부동산 투자의 기본 개념과 원리를 다룬 입문 가이드', type: 'PDF', level: '기초', rating: 4.8, downloads: 1247 },
    { title: '경매 물건 분석 실전 강의', desc: '실제 경매 사례로 배우는 분석법 (영상 3.5시간)', type: '동영상', level: '중급', rating: 4.9, downloads: 892 },
    { title: '재개발 사업성 분석 매뉴얼', desc: '재개발 투자 전 필독 체크리스트와 분석법', type: 'PDF', level: '고급', rating: 4.7, downloads: 567 },
  ],
  tools: [
    { title: 'Python 부동산 분석 라이브러리', desc: 'Pandas, NumPy 활용 가이드와 예제 코드', type: 'Code', level: '중급', rating: 4.7, downloads: 678 },
    { title: 'QGIS 지도 분석 가이드', desc: 'GIS 도구 활용 예제와 실전 사례', type: 'PDF', level: '중급', rating: 4.6, downloads: 534 },
    { title: 'TensorFlow 가격 예측 튜토리얼', desc: '딥러닝 모델 구축 단계별 안내', type: '동영상', level: '고급', rating: 4.8, downloads: 456 },
  ],
  templates: [
    { title: '경매 물건 분석 템플릿', desc: '권리분석부터 수익성까지 한번에 (Excel)', type: 'Excel', level: '중급', rating: 4.9, downloads: 1234 },
    { title: '투자 수익률 계산기', desc: 'IRR, NPV 자동 계산 도구', type: 'Excel', level: '기초', rating: 4.9, downloads: 1567 },
    { title: 'Python 시세 분석 스크립트', desc: '자동 시세 수집·분석 도구', type: 'Code', level: '고급', rating: 4.7, downloads: 567 },
  ],
  datasets: [
    { title: '서울 아파트 실거래가 데이터', desc: '2020-2026 전체 거래 내역 (1.2M건)', type: 'CSV', level: '중급', rating: 4.8, downloads: 892 },
    { title: '전국 경매 물건 데이터', desc: '2023-2026 진행 물건 89,456건', type: 'CSV', level: '중급', rating: 4.7, downloads: 645 },
    { title: '재개발 추진 현황 데이터', desc: '전국 재개발 사업지구 1,567개', type: 'Excel', level: '기초', rating: 4.6, downloads: 412 },
  ],
}

const typeIcon: Record<Resource['type'], React.ComponentType<{ size?: number; className?: string }>> = {
  PDF: FileText, '동영상': Video, Excel: FileSpreadsheet, Code: Code, CSV: Database,
}

const typeColor: Record<Resource['type'], string> = {
  PDF: 'bg-red-100 text-red-700', '동영상': 'bg-blue-100 text-blue-700',
  Excel: 'bg-green-100 text-green-700', Code: 'bg-purple-100 text-purple-700',
  CSV: 'bg-orange-100 text-orange-700',
}

export default function Resources() {
  const [active, setActive] = useState<CatKey>('learning')

  return (
    <>
      <section className="bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block bg-primary text-white text-sm font-semibold px-4 py-2 rounded-full mb-6">
            📚 학습 자료의 보물창고
          </span>
          <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6">
            전문가가 만든<br />
            <span className="accent-text">학습 자료실</span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto">
            챌린지 성공을 위한 모든 학습 자료, AI 도구 가이드, 분석 템플릿을 한 곳에서 만나보세요
          </p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {CATEGORIES.map(c => (
              <button
                key={c.key}
                onClick={() => setActive(c.key)}
                className={`px-6 py-3 rounded-button font-semibold transition ${active === c.key ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {ITEMS[active].map(r => {
              const Icon = typeIcon[r.type]
              return (
                <div key={r.title} className="bg-white border rounded-2xl p-6 hover:shadow-lg transition">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                      <Icon className="text-slate-700" size={24} />
                    </div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${typeColor[r.type]}`}>{r.type}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{r.title}</h3>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">{r.desc}</p>
                  <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                    <span>난이도: {r.level}</span>
                    <span>⭐ {r.rating}</span>
                    <span>📥 {r.downloads.toLocaleString()}</span>
                  </div>
                  <button className="w-full bg-primary hover:bg-blue-600 text-white py-2 rounded-button text-sm font-semibold transition inline-flex items-center justify-center gap-2">
                    <Download size={16} /> 다운로드
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <BookOpen className="mx-auto text-primary mb-4" size={48} />
          <h2 className="text-3xl font-bold text-slate-900 mb-4">자료 업로드 & 기여</h2>
          <p className="text-slate-600 mb-8">유용한 학습 자료를 공유하고 포인트를 적립하세요</p>
          <button className="bg-primary hover:bg-blue-600 text-white px-8 py-3 rounded-button font-semibold transition">
            자료 업로드하기
          </button>
        </div>
      </section>
    </>
  )
}
