import React from 'react'
import { Routes, Route } from 'react-router-dom'
// import Main from './components/mainComponent/Main'
import Login from './components/loginComponent/Login'
import Navbar from './components/navbarComponent/Navbar'
import NoMatch from './components/noMatchComponent/NoMatch'
import Collection from './components/collectionComponent/Collection'
import apiUrls from './api/utils/apiUrls.json'
import Overview from './components/overviewComponent/Overview'
import Profile from './components/profileComponent/Profile'
import { AuthProvider } from './utils/auth'
import RequireAuth from './components/requireAuthComponent/RequireAuth'
const LazyMain = React.lazy(() => import('./components/mainComponent/Main'))


const App = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path='/' element={
          <React.Suspense fallback='Loading...'>
            <LazyMain />
          </React.Suspense>
        } />
        <Route path='login' element={<Login btnLabel="Login" />} />
        <Route path='register' element={<Login btnLabel="Register" />} />
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
        <Route path='profile' element={<RequireAuth><Profile /></RequireAuth>} />
        <Route path='*' element={<NoMatch />} />
      </Routes>
    </AuthProvider>
  )
}

export default App