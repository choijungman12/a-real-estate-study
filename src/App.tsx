import { HashRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import About from './pages/About'
import Curriculum from './pages/Curriculum'
import Challenge from './pages/Challenge'
import Resources from './pages/Resources'
import Community from './pages/Community'
import MyPage from './pages/MyPage'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import MapPage from './pages/Map'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="curriculum" element={<Curriculum />} />
          <Route path="challenge" element={<Challenge />} />
          <Route path="resources" element={<Resources />} />
          <Route path="community" element={<Community />} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="map" element={<MapPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
