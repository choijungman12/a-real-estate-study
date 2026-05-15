import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X, Building2, User as UserIcon } from 'lucide-react'

const NAV = [
  { to: '/', label: '홈' },
  { to: '/about', label: '스터디 소개' },
  { to: '/curriculum', label: '스터디 과정' },
  { to: '/challenge', label: '챌린지' },
  { to: '/map', label: 'AI 지도' },
  { to: '/resources', label: '자료실' },
  { to: '/community', label: '커뮤니티' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="w-full px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Building2 className="text-white" size={20} />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-base lg:text-xl font-bold text-slate-900 leading-tight">AI 부동산 스터디 그룹</h1>
              <p className="text-xs lg:text-sm text-slate-600 leading-tight">AI로 분석하고, 함께 공부하고, 실제 수익을 얻습니다.</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-5 xl:space-x-7">
            {NAV.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  isActive
                    ? 'text-primary border-b-2 border-primary pb-0.5 font-semibold'
                    : 'text-slate-600 hover:text-primary transition-colors font-medium'
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center space-x-2 lg:space-x-3">
            <Link to="/mypage" title="마이페이지" className="hidden lg:inline-flex w-9 h-9 items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition">
              <UserIcon size={18} />
            </Link>
            <Link to="/login" className="hidden sm:inline text-slate-600 hover:text-slate-900 transition-colors font-medium text-sm">로그인</Link>
            <Link to="/signup" className="bg-primary hover:bg-blue-600 text-white px-3 lg:px-5 py-2 rounded-button whitespace-nowrap transition-colors font-semibold text-sm">스터디 가입</Link>
            <button className="lg:hidden p-2 -mr-2" onClick={() => setOpen(!open)} aria-label="메뉴">
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="lg:hidden mt-4 flex flex-col space-y-1 border-t pt-4">
            {NAV.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2 rounded ${isActive ? 'bg-primary/10 text-primary font-semibold' : 'text-slate-700 hover:bg-slate-50'}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <NavLink to="/mypage" onClick={() => setOpen(false)} className={({isActive}) => `px-3 py-2 rounded ${isActive ? 'bg-primary/10 text-primary font-semibold' : 'text-slate-700 hover:bg-slate-50'}`}>마이페이지</NavLink>
            <Link to="/login" onClick={() => setOpen(false)} className="px-3 py-2 text-slate-700 hover:bg-slate-50 rounded">로그인</Link>
          </nav>
        )}
      </div>
    </header>
  )
}
