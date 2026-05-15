import { useState } from 'react'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'
import {
  MapPin,
  TrendingUp,
  Map as MapIcon,
  Brain,
  Sparkles,
  Star,
  ArrowRight,
  RotateCcw,
} from 'lucide-react'

// Fix default marker icon issue with bundlers
L.Icon.Default.mergeOptions({ iconUrl, iconRetinaUrl, shadowUrl })

type MapMarker = {
  id: number
  name: string
  lat: number
  lng: number
  type: '아파트' | '오피스텔' | '상가' | '토지'
  price: string
  score: number
  address: string
  nearbyPrice: string
  monthlyVolume: number
  goodNews: number
  rating: string
}

const MARKERS: MapMarker[] = [
  { id: 1, name: '강남 래미안', lat: 37.4985, lng: 127.0282, type: '아파트', price: '25억', score: 87, address: '서울 강남구 대치동', nearbyPrice: '24.5억', monthlyVolume: 12, goodNews: 8, rating: 'A+' },
  { id: 2, name: '송파 헬리오시티', lat: 37.5145, lng: 127.1066, type: '아파트', price: '22억', score: 82, address: '서울 송파구 가락동', nearbyPrice: '21.8억', monthlyVolume: 28, goodNews: 7, rating: 'A' },
  { id: 3, name: '마포 트라팰리스', lat: 37.5535, lng: 126.9265, type: '오피스텔', price: '8억', score: 79, address: '서울 마포구 공덕동', nearbyPrice: '7.9억', monthlyVolume: 18, goodNews: 6, rating: 'A' },
  { id: 4, name: '용산 한남더힐', lat: 37.5310, lng: 126.9979, type: '아파트', price: '45억', score: 91, address: '서울 용산구 한남동', nearbyPrice: '44억', monthlyVolume: 5, goodNews: 9, rating: 'A+' },
  { id: 5, name: '강서 마곡엠밸리', lat: 37.5634, lng: 126.8284, type: '아파트', price: '12억', score: 75, address: '서울 강서구 마곡동', nearbyPrice: '11.7억', monthlyVolume: 22, goodNews: 7, rating: 'B+' },
  { id: 6, name: '성수 트리마제', lat: 37.5481, lng: 127.0471, type: '아파트', price: '30억', score: 88, address: '서울 성동구 성수동', nearbyPrice: '29.5억', monthlyVolume: 9, goodNews: 8, rating: 'A+' },
  { id: 7, name: '잠실 리센츠', lat: 37.5132, lng: 127.0825, type: '아파트', price: '28억', score: 85, address: '서울 송파구 잠실동', nearbyPrice: '27.6억', monthlyVolume: 15, goodNews: 7, rating: 'A' },
  { id: 8, name: '여의도 파크원', lat: 37.5260, lng: 126.9258, type: '오피스텔', price: '15억', score: 80, address: '서울 영등포구 여의도동', nearbyPrice: '14.8억', monthlyVolume: 11, goodNews: 6, rating: 'A' },
]

const REGIONS = ['서울 전체', '강남구', '송파구', '마포구', '용산구', '강서구', '성동구', '영등포구']
const PROPERTY_TYPES = ['아파트', '오피스텔', '상가', '토지']
const AI_OPTIONS = ['수익성 분석', '재개발 가능성', '거래량 추이', '입지 점수']

export default function MapPage() {
  const [selected, setSelected] = useState<MapMarker | null>(null)
  const [region, setRegion] = useState('서울 전체')
  const [types, setTypes] = useState<string[]>(['아파트', '오피스텔'])
  const [priceMin, setPriceMin] = useState('')
  const [priceMax, setPriceMax] = useState('')
  const [aiOptions, setAiOptions] = useState<string[]>(['입지 점수', '수익성 분석'])

  const toggleType = (t: string) =>
    setTypes(prev => (prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]))
  const toggleAi = (o: string) =>
    setAiOptions(prev => (prev.includes(o) ? prev.filter(x => x !== o) : [...prev, o]))

  const reset = () => {
    setRegion('서울 전체')
    setTypes(['아파트', '오피스텔'])
    setPriceMin('')
    setPriceMax('')
    setAiOptions(['입지 점수', '수익성 분석'])
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-blue-600 to-secondary py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-white rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur text-white rounded-full text-sm font-medium mb-3">
              <Sparkles size={14} /> Powered by OpenStreetMap + AI
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">AI 부동산 지도</h1>
            <p className="text-blue-50">실시간 매물 데이터 + AI 분석을 지도에서 한 눈에</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: '등록 매물', value: '12,847', unit: '개' },
              { label: 'AI 분석 완료', value: '9,234', unit: '개' },
              { label: '활성 사용자', value: '1,247', unit: '명' },
              { label: '일일 검색', value: '5,623', unit: '건' },
            ].map(m => (
              <div key={m.label} className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
                <div className="text-xs text-blue-100 mb-1">{m.label}</div>
                <div className="text-2xl font-bold text-white">
                  {m.value}<span className="text-sm font-normal ml-0.5">{m.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map + filters + detail */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-6">
          {/* Filter panel */}
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-24 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <MapPin size={18} className="text-primary" />
                <h3 className="font-bold text-slate-900">필터</h3>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-2">지역</label>
                <select
                  value={region}
                  onChange={e => setRegion(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg text-sm focus:border-primary focus:outline-none"
                >
                  {REGIONS.map(r => <option key={r}>{r}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-2">부동산 유형</label>
                <div className="space-y-2">
                  {PROPERTY_TYPES.map(t => (
                    <label key={t} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={types.includes(t)}
                        onChange={() => toggleType(t)}
                        className="w-4 h-4 accent-primary"
                      />
                      <span className="text-sm text-slate-700">{t}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-2">가격대 (만원)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="최소"
                    value={priceMin}
                    onChange={e => setPriceMin(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg text-sm focus:border-primary focus:outline-none"
                  />
                  <span className="text-slate-400">~</span>
                  <input
                    type="number"
                    placeholder="최대"
                    value={priceMax}
                    onChange={e => setPriceMax(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg text-sm focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-2">AI 분석 옵션</label>
                <div className="space-y-2">
                  {AI_OPTIONS.map(o => (
                    <label key={o} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg cursor-pointer">
                      <span className="text-sm text-slate-700">{o}</span>
                      <button
                        type="button"
                        onClick={() => toggleAi(o)}
                        className={`relative w-9 h-5 rounded-full transition ${aiOptions.includes(o) ? 'bg-primary' : 'bg-slate-300'}`}
                        aria-pressed={aiOptions.includes(o)}
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                            aiOptions.includes(o) ? 'translate-x-4' : ''
                          }`}
                        />
                      </button>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  className="flex-1 bg-primary hover:bg-secondary text-white py-2.5 rounded-button font-semibold text-sm transition"
                >
                  적용
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="px-3 border-2 border-slate-200 hover:bg-slate-50 text-slate-700 rounded-button font-semibold text-sm transition inline-flex items-center gap-1"
                >
                  <RotateCcw size={14} /> 초기화
                </button>
              </div>
            </div>
          </aside>

          {/* Map */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <MapContainer
                center={[37.5665, 126.9780]}
                zoom={11}
                style={{ height: 600, width: '100%' }}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {MARKERS.map(m => (
                  <Marker
                    key={m.id}
                    position={[m.lat, m.lng]}
                    eventHandlers={{ click: () => setSelected(m) }}
                  >
                    <Popup>
                      <div className="min-w-[180px]">
                        <div className="font-bold text-slate-900 mb-1">{m.name}</div>
                        <div className="text-xs text-slate-500 mb-2">{m.type} · {m.address}</div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-primary font-bold">{m.price}</span>
                          <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full font-semibold">
                            AI {m.score}점
                          </span>
                        </div>
                        <button
                          onClick={() => setSelected(m)}
                          className="w-full bg-primary hover:bg-secondary text-white text-xs py-2 rounded-md font-semibold transition"
                        >
                          상세 보기
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
            <p className="text-xs text-slate-500 mt-3 text-center">
              지도 데이터: OpenStreetMap · 마커를 클릭해 상세 정보를 확인하세요.
            </p>
          </div>

          {/* Detail panel */}
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-24 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              {!selected ? (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <MapPin className="text-slate-400" size={28} />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">매물을 선택하세요</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    지도에서 마커를 클릭하면<br />AI 분석 결과를 확인할 수 있습니다.
                  </p>
                </div>
              ) : (
                <div>
                  <div className="bg-gradient-to-br from-primary to-secondary p-6 text-white">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs px-2 py-0.5 bg-white/20 rounded-full font-semibold">{selected.type}</span>
                      <span className="text-xs text-blue-100">{selected.address}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{selected.name}</h3>
                    <div className="text-3xl font-bold">{selected.price}</div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-center justify-between">
                      <div>
                        <div className="text-xs text-yellow-700 font-semibold mb-1">AI 분석 점수</div>
                        <div className="text-2xl font-bold text-slate-900 inline-flex items-center gap-1">
                          <Star className="text-yellow-500 fill-yellow-500" size={20} />
                          {selected.score}<span className="text-sm text-slate-500 font-normal">/100</span>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1.5 rounded-full text-sm font-bold ${
                          selected.score >= 85
                            ? 'bg-green-500 text-white'
                            : selected.score >= 75
                            ? 'bg-yellow-400 text-yellow-900'
                            : 'bg-slate-300 text-slate-700'
                        }`}
                      >
                        {selected.rating}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: '주변 시세', value: selected.nearbyPrice },
                        { label: '월 거래량', value: `${selected.monthlyVolume}건` },
                        { label: '호재 점수', value: `${selected.goodNews}/10` },
                        { label: '추천 등급', value: selected.rating },
                      ].map(s => (
                        <div key={s.label} className="bg-slate-50 rounded-xl p-3">
                          <div className="text-xs text-slate-500 mb-1">{s.label}</div>
                          <div className="font-bold text-slate-900">{s.value}</div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2 pt-2">
                      <button className="w-full bg-primary hover:bg-secondary text-white py-2.5 rounded-button font-semibold text-sm transition inline-flex items-center justify-center gap-1">
                        더 자세히 보기 <ArrowRight size={16} />
                      </button>
                      <button
                        onClick={() => setSelected(null)}
                        className="w-full bg-white border-2 border-slate-200 hover:bg-slate-50 text-slate-700 py-2.5 rounded-button font-semibold text-sm transition"
                      >
                        지도 초기화
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>

      {/* AI explanation cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">AI 지도가 도와드립니다</h2>
            <p className="text-slate-600">데이터와 AI가 결합된 부동산 인사이트를 만나보세요</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: TrendingUp, title: '실시간 시세 분석', desc: '동·단지별 시세를 실시간으로 추적하고, 변동 추이를 시각화해드립니다.', color: 'bg-blue-100 text-blue-600' },
              { icon: MapIcon, title: '지역 분석', desc: '교통·학군·생활인프라·일자리 등 지역 데이터를 종합적으로 분석합니다.', color: 'bg-emerald-100 text-emerald-600' },
              { icon: Brain, title: 'AI 가격 예측', desc: '머신러닝 모델로 향후 6개월·1년·3년 시세 변동을 예측합니다.', color: 'bg-purple-100 text-purple-600' },
              { icon: Sparkles, title: '호재 정보', desc: '재개발·재건축·교통 호재 등을 AI가 자동 수집해 점수화합니다.', color: 'bg-pink-100 text-pink-600' },
            ].map(c => (
              <div key={c.title} className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${c.color}`}>
                  <c.icon size={28} />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{c.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-br from-primary via-blue-600 to-secondary">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Sparkles className="text-white/80 mx-auto mb-4" size={40} />
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            AI 지도로 더 똑똑한 투자를 시작하세요
          </h2>
          <p className="text-blue-50 mb-8 max-w-2xl mx-auto">
            단순한 위치 정보가 아닌, 데이터에 기반한 인사이트를 제공합니다.
            AI 부동산 스터디 그룹의 멤버가 되어 더 많은 분석 도구를 활용해보세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#/signup"
              className="bg-white hover:bg-blue-50 text-primary px-8 py-3 rounded-button font-semibold transition inline-flex items-center justify-center gap-2"
            >
              스터디 가입하기 <ArrowRight size={18} />
            </a>
            <a
              href="#/about"
              className="bg-white/10 hover:bg-white/20 backdrop-blur border border-white/30 text-white px-8 py-3 rounded-button font-semibold transition"
            >
              스터디 소개 보기
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
