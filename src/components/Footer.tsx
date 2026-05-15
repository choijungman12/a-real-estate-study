import { Link } from 'react-router-dom'
import { Building2 } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Building2 className="text-white" size={18} />
              </div>
              <span className="font-pacifico text-xl text-white">AI Real Estate</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">AI 기술로 부동산 투자의 새로운 가능성을 열어갑니다.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">스터디</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><Link to="/about" className="hover:text-primary transition-colors">스터디 소개</Link></li>
              <li><Link to="/curriculum" className="hover:text-primary transition-colors">커리큘럼</Link></li>
              <li><Link to="/signup" className="hover:text-primary transition-colors">가입하기</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">서비스</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><Link to="/challenge" className="hover:text-primary transition-colors">챌린지</Link></li>
              <li><Link to="/resources" className="hover:text-primary transition-colors">자료실</Link></li>
              <li><Link to="/community" className="hover:text-primary transition-colors">커뮤니티</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">고객지원</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">문의하기</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">이용약관</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-500 text-sm">
          <p>&copy; 2026 AI 부동산 스터디 그룹. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
