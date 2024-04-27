import React, { lazy } from 'react'
import './App.scss'
import { Header } from './components/Header';
import { Routes, Route } from 'react-router-dom'
const Login = lazy(() => import("./components/login/Login"));
const Registration = lazy(() => import("./components/registration/Regisrtration"));
// const Header = lazy(() => import("./components/Header"));
const Profile = lazy(() => import("./components/profile/Profile"));
const Messenger = lazy(() => import("./components/Messenger/Messenger"));
const Chat = lazy(() => import("./components/Messenger/Chat/Chat"));
const Home = lazy(() => import("./components/Home/Home"));
const Photo = lazy(() => import("./components/Photo/Photo"));
const Peoples = lazy(() => import("./components/Peoples/Peoples"));
import { Loader } from './Loader'
import { Admin } from './components/Admin/Admin';

export const App = () => {
  const usr = localStorage.getItem('user')
  const login = JSON.parse(usr)?.login?.login
  return (
    <div className="App" >
      <React.Suspense fallback={<Loader/>}>
        <div className={'container'}>
          {usr && <Header />}
          <div>
            <Routes>
                <Route path={'/admin'} element={<Admin />} />
                <Route path={'/login'} element={<Login />} />
                <Route path={'/registration'} element={<Registration />} />
                <Route path={'/'} element={<Home />} />
                <Route path={'/profile/:login'} element={<Profile />} />
                <Route path={'/messenger'} element={<Messenger />} />
                <Route path={'/peoples'} element={<Peoples />} />
                <Route path={'/chat/:login'} element={<Chat />} />
                <Route path={'/photos/:login'} element={<Photo />} />
            </Routes>
          </div>
          <a target='_blank' href={`http://localhost:8014/${login}`} className={'linkToInProjects'}><img src={'/logoScrum.png'} alt=""/></a>
        </div>
      </React.Suspense>
    </div>
  )
}