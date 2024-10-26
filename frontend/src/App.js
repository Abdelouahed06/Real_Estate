import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/header/Header";
import Setting from "./components/setting/Setting";
import MyFavourites from "./components/favourite/MyFavourites";
import MyAnnounces from "./components/announce/MyAnnounces";
import { useState } from "react";
import LoginPage from "./components/login/Login";
import Details from "./components/detailts/Details";
import Home from "./components/home/Home";
import AddAnnouncement from "./components/announce/AddAnnouncement";
import Register from "./components/login/Register";


function App() {
  const [token, setToken] = useState()
  const isLogin = JSON.parse(localStorage.getItem('token'))

  return (
    <div className='h-screen bg-white mb-7'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/property/:id' element={<Details />} />
          <Route path='/login' element={!isLogin ? <LoginPage /> : <Navigate to='/' />} />
          <Route path='/register' element={!isLogin ? <Register /> : <Navigate to='/' />} />
          <Route path='/add-announce/:id?' element={isLogin ? <AddAnnouncement /> : <Navigate to='/login' />} />
          <Route path='/setting/profile' element={isLogin ? <Setting active={true} /> : <Navigate to='/login' /> } />
          <Route path='/setting/password' element={isLogin ? <Setting active={false} /> : <Navigate to='/login' />} />
          <Route path='/my-favourites' element={isLogin ? <MyFavourites /> : <Navigate to='/login' />} />
          <Route path='/my-announces' element={isLogin ? <MyAnnounces /> : <Navigate to='/login' />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
