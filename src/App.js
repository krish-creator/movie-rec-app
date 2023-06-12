import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Main from './components/mainComponent/Main'
import Login from './components/loginComponent/Login'
import Navbar from './components/navbarComponent/Navbar'
import NoMatch from './components/noMatchComponent/NoMatch'
import Collection from './components/collectionComponent/Collection'
import apiUrls from './api/utils/apiUrls.json'
import Overview from './components/overviewComponent/Overview'


const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Login />} />
        <Route path='popular' element={<Collection collectionUrl={apiUrls.popularMovies} />} >
          <Route index element={<Collection collectionUrl={apiUrls.popularMovies} />} />
          <Route path=':page' element={<Collection collectionUrl={apiUrls.popularMovies} />} />
        </Route>
        <Route path='now-playing' element={<Collection collectionUrl={apiUrls.nowPlayingMovies} />} >
          <Route index element={<Collection collectionUrl={apiUrls.nowPlayingMovies} />} />
          <Route path=':page' element={<Collection collectionUrl={apiUrls.nowPlayingMovies} />} />
        </Route>
        <Route path='upcoming' element={<Collection collectionUrl={apiUrls.upcomingMovies} />} >
          <Route index element={<Collection collectionUrl={apiUrls.upcomingMovies} />} />
          <Route path=':page' element={<Collection collectionUrl={apiUrls.upcomingMovies} />} />
        </Route>
        <Route path='top-rated' element={<Collection collectionUrl={apiUrls.topRatedMovies} />} >
          <Route index element={<Collection collectionUrl={apiUrls.topRatedMovies} />} />
          <Route path=':page' element={<Collection collectionUrl={apiUrls.topRatedMovies} />} />
        </Route>
        <Route path='search' element={<Collection collectionUrl={apiUrls.searchMovies} />} >
          <Route index element={<Collection collectionUrl={apiUrls.topRatedMovies} />} />
          <Route path=':page' element={<Collection collectionUrl={apiUrls.topRatedMovies} />} />
        </Route>
        <Route path='overview' element={<Overview overviewUrl={apiUrls.movieOverview} />} />
        <Route path='*' element={<NoMatch />} />
      </Routes>
    </>
  )
}

export default App