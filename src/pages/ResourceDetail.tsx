import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Clock,
  BookOpen,
  Sparkles,
  Check,
  X,
  Download,
  Share2,
  ChevronRight,
} from 'lucide-react'
import { findLesson, CATEGORY_LABELS, type CatKey } from '../data/lessons'

const levelColor: Record<string, string> = {
  기초: 'bg-emerald-100 text-emerald-700',
  중급: 'bg-amber-100 text-amber-700',
  고급: 'bg-rose-100 text-rose-700',
}

export default function ResourceDetail() {
  const { category, slug } = useParams<{ category: string; slug: string }>()
  const title = decodeURIComponent(slug ?? '')
  const lesson = findLesson(category ?? '', title)

  const [quizSelected, setQuizSelected] = useState<Record<number, number>>({})
  const [quizSubmitted, setQuizSubmitted] = useState<Record<number, boolean>>({})

  if (!lesson) {
    return (
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <BookOpen className="text-slate-400 mx-auto mb-4" size={48} />
        <h1 className="text-2xl font-bold text-slate-900 mb-2">강의를 찾을 수 없습니다</h1>
        <p className="text-slate-600 mb-6">요청하신 자료가 아직 준비되지 않았거나 제목이 일치하지 않습니다.</p>
        <Link to="/resources" className="bg-primary hover:bg-blue-600 text-white px-6 py-3 rounded-button font-semibold inline-block transition">
          자료실로 돌아가기
        </Link>
      </section>
    )
  }

  const catKey = lesson.category as CatKey

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100 py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-6">
          <Link
            to="/resources"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-primary mb-6 text-sm font-medium"
          >
            <ArrowLeft size={16} /> 자료실로 돌아가기
          </Link>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="bg-primary/10 text-primary text-sm font-bold px-3 py-1 rounded-full">
              {CATEGORY_LABELS[catKey]}
            </span>
            <span className={`text-sm font-bold px-3 py-1 rounded-full ${levelColor[lesson.level]}`}>
              {lesson.level}
            </span>
            <span className="text-sm text-slate-600 inline-flex items-center gap-1 ml-2">
              <Clock size={14} /> {lesson.duration}
            </span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold text-slate-900 leading-tight">
            {lesson.title}
          </h1>
        </div>
      </section>

      {/* Main */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-6 grid lg:grid-cols-4 gap-8">
          {/* Sidebar - TOC */}
          <aside className="lg:col-span-1 lg:sticky lg:top-24 lg:self-start">
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <h3 className="font-bold text-slate-900 mb-3 text-sm">목차</h3>
              <ul className="space-y-1 text-sm">
                {lesson.sections.map((s, i) => (
                  <li key={i}>
                    <a
                      href={`#section-${i}`}
                      className="text-slate-600 hover:text-primary transition block py-1.5"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
                <li className="pt-2 border-t mt-2">
                  <a href="#keypoints" className="text-slate-700 hover:text-primary block py-1.5 font-medium">
                    핵심 포인트
                  </a>
                </li>
                {lesson.quiz && (
                  <li>
                    <a href="#quiz" className="text-slate-700 hover:text-primary block py-1.5 font-medium">
                      학습 점검 퀴즈
                    </a>
                  </li>
                )}
              </ul>
              <div className="mt-4 pt-4 border-t flex gap-2">
                <button
                  onClick={() => alert('다운로드 기능은 준비 중입니다.')}
                  className="flex-1 bg-primary hover:bg-blue-600 text-white py-2 rounded-button text-xs font-semibold inline-flex items-center justify-center gap-1 transition"
                >
                  <Download size={14} /> 다운로드
                </button>
                <button
                  onClick={() => alert('공유 기능은 준비 중입니다.')}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 rounded-button transition"
                  aria-label="공유"
                >
                  <Share2 size={14} />
                </button>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <article className="lg:col-span-3 space-y-8">
            {/* Intro */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 lg:p-8">
              <p className="text-base lg:text-lg leading-relaxed text-slate-700 whitespace-pre-line">
                {lesson.intro}
              </p>
            </div>

            {/* Sections */}
            {lesson.sections.map((s, i) => (
              <section
                key={i}
                id={`section-${i}`}
                className="bg-white rounded-2xl border border-slate-200 p-6 lg:p-8 scroll-mt-24"
              >
                <h2 className="text-xl lg:text-2xl font-bold text-slate-900 mb-4">{s.title}</h2>
                {s.body && (
                  <p className="text-slate-700 leading-relaxed whitespace-pre-line mb-4">{s.body}</p>
                )}
                {s.bullets && (
                  <ul className="space-y-2 mb-4">
                    {s.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-2 text-slate-700">
                        <ChevronRight size={18} className="text-primary mt-0.5 flex-shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {s.code && (
                  <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs lg:text-sm overflow-x-auto">
                    <code>{s.code}</code>
                  </pre>
                )}
              </section>
            ))}

            {/* Key points */}
            <section
              id="keypoints"
              className="bg-blue-50 border border-blue-200 rounded-2xl p-6 lg:p-8 scroll-mt-24"
            >
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="text-primary" size={24} />
                <h2 className="text-xl lg:text-2xl font-bold text-slate-900">핵심 포인트</h2>
              </div>
              <ul className="space-y-3">
                {lesson.keyPoints.map((kp, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-7 h-7 bg-primary text-white rounded-full text-sm font-bold leading-7 text-center flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-slate-800 leading-relaxed pt-0.5">{kp}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Quiz */}
            {lesson.quiz && (
              <section
                id="quiz"
                className="bg-white rounded-2xl border-2 border-primary/20 p-6 lg:p-8 scroll-mt-24"
              >
                <h2 className="text-xl lg:text-2xl font-bold text-slate-900 mb-2">학습 점검 퀴즈</h2>
                <p className="text-slate-600 mb-6 text-sm">학습한 내용을 바로 점검해보세요.</p>
                <div className="space-y-6">
                  {lesson.quiz.map((q, qi) => {
                    const submitted = quizSubmitted[qi]
                    const selected = quizSelected[qi]
                    return (
                      <div key={qi} className="border border-slate-200 rounded-xl p-5">
                        <p className="font-semibold text-slate-900 mb-3">
                          Q{qi + 1}. {q.q}
                        </p>
                        <div className="space-y-2">
                          {q.opts.map((opt, oi) => {
                            const isCorrect = oi === q.correct
                            const isSelected = selected === oi
                            const cls = submitted
                              ? isCorrect
                                ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                                : isSelected
                                ? 'border-rose-500 bg-rose-50 text-rose-900'
                                : 'border-slate-200 text-slate-500'
                              : isSelected
                              ? 'border-primary bg-primary/5 text-slate-900'
                              : 'border-slate-200 hover:border-primary/50 text-slate-900'
                            return (
                              <button
                                key={oi}
                                onClick={() =>
                                  !submitted && setQuizSelected({ ...quizSelected, [qi]: oi })
                                }
                                disabled={submitted}
                                className={`w-full text-left border-2 rounded-lg px-4 py-3 text-sm transition ${cls}`}
                              >
                                {String.fromCharCode(65 + oi)}. {opt}
                              </button>
                            )
                          })}
                        </div>
                        {!submitted ? (
                          <button
                            onClick={() =>
                              selected !== undefined &&
                              setQuizSubmitted({ ...quizSubmitted, [qi]: true })
                            }
                            disabled={selected === undefined}
                            className="mt-3 bg-primary hover:bg-blue-600 disabled:bg-slate-200 disabled:text-slate-500 text-white py-2 px-5 rounded-button text-sm font-semibold transition"
                          >
                            정답 확인
                          </button>
                        ) : (
                          <div
                            className={`mt-3 rounded-lg p-3 text-sm ${
                              selected === q.correct
                                ? 'bg-emerald-50 text-emerald-900'
                                : 'bg-rose-50 text-rose-900'
                            }`}
                          >
                            <div className="font-bold mb-1 inline-flex items-center gap-1">
                              {selected === q.correct ? (
                                <>
                                  <Check size={14} /> 정답입니다!
                                </>
                              ) : (
                                <>
                                  <X size={14} /> 아쉽네요
                                </>
                              )}
                            </div>
                            <p className="text-slate-700 leading-relaxed">{q.explain}</p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </section>
            )}

            {/* Related */}
            {lesson.related && lesson.related.length > 0 && (
              <section className="bg-slate-50 rounded-2xl p-6 lg:p-8">
                <h2 className="text-xl font-bold text-slate-900 mb-4">관련 자료</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {lesson.related.map((r, i) => (
                    <Link
                      key={i}
                      to={`/resources/${r.category}/${encodeURIComponent(r.title)}`}
                      className="bg-white rounded-xl p-4 hover:shadow-md hover:-translate-y-1 transition border border-slate-200 block"
                    >
                      <span className="text-xs text-primary font-semibold mb-1 block">
                        {CATEGORY_LABELS[r.category]}
                      </span>
                      <p className="text-sm font-bold text-slate-900 leading-snug">{r.title}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Bottom navigation */}
            <div className="text-center pt-4">
              <Link
                to="/resources"
                className="inline-flex items-center gap-2 text-slate-600 hover:text-primary text-sm font-medium"
              >
                <ArrowLeft size={16} /> 자료실로 돌아가기
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  )
}
