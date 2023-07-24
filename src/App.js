import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './components/loginComponent/Login'
import Navbar from './components/navbarComponent/Navbar'
import NoMatch from './components/noMatchComponent/NoMatch'
import Collection from './components/collectionComponent/Collection'
import apiUrls from './api/utils/apiUrls.json'
import Overview from './components/overviewComponent/Overview'
import Profile from './components/profileComponent/Profile'
import apiReference from "../src/api/services/apiReference"
import { useEffect, useState } from "react"

const LazyMain = React.lazy(() => import('./components/mainComponent/Main'))

const App = () => {

  const [user, setUser] = useState(localStorage.getItem("userName"))
  const [currentUser, setCurrentUser] = useState('')
  const [genres, setGenres] = useState([])
  const [userDetails, setUserDetails] = useState({ name: '', preference: '' })
  const [preference, setPreference] = useState('')
  const [localGenres, setLocalGenres] = useState('')

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("userName")))
    setLocalGenres(JSON.parse(localStorage.getItem("genres")))
  }, [])

  useEffect(() => {
    if (!localGenres) {
      apiReference(apiUrls.movieGenres)
        .then((data) => {
          const defaultGenresData = data.genres.map((genre) => ({
            ...genre,
            isSet: false
          }));
          setPreferences(defaultGenresData)
          setGenres(defaultGenresData);
        })
        .catch((error) => {
          console.error('Error fetching movie genres:', error);
        })
    } else {
      const local_genres = JSON.parse(localGenres)
      setPreferences(local_genres)
      setGenres(local_genres)
    }
  }, [localGenres]);

  const handleChange = (e, genreName) => {
    const { name, checked } = e.target;

    setGenres((prevGenres) => {
      const updatedGenres = prevGenres.map((genre) => {
        if (genre.name === genreName) {
          return {
            ...genre,
            [name]: checked
          };
        }
        return genre;
      });
      localStorage.setItem("genres", JSON.stringify(updatedGenres))
      setPreferences(updatedGenres)
      return updatedGenres;
    });
  };

  const setPreferences = (genres) => {
    const newPreference = genres
      .filter((genre) => genre.isSet)
      .map((genre) => genre.id);

    setPreference(newPreference.join(','));

  }

  useEffect(() => {
    setUserDetails((prevUserDetails) => {
      const userDetails =
        user && {
          ...prevUserDetails,
          name: user,
          preference: preference,
          generes: genres

        };
      localStorage.setItem("userDetails", JSON.stringify(userDetails))
      return userDetails;
    });
  }, [preference, genres, user]);

  return (
    <>
      <Navbar user={user} />
      <Routes>
        <Route path='/' element={
          <React.Suspense fallback='Loading...'>
            <LazyMain preference={userDetails?.preference} />
          </React.Suspense>
        } />
        <Route path='login' element={<Login btnLabel="Login" currentUser={currentUser} user={user} setUser={setUser} />} />
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
        <Route path='profile' element={<Profile genres={genres} handleChange={handleChange} currentUser={currentUser} user={user} setUser={setUser} />} />
        <Route path='*' element={<NoMatch />} />
      </Routes>
    </>
  )
}

export default App