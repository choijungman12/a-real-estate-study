import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-32 text-center">
      <h1 className="text-7xl font-bold accent-text mb-4">404</h1>
      <p className="text-xl text-slate-600 mb-8">요청하신 페이지를 찾을 수 없습니다.</p>
      <Link to="/" className="bg-primary hover:bg-blue-600 text-white px-6 py-3 rounded-button font-semibold inline-block transition-colors">
        홈으로 돌아가기
      </Link>
    </div>
  )
}
