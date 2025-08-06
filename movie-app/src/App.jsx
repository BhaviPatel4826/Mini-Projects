import { useEffect, useState } from 'react'

import Search from './components/Search'
import MovieCard from './components/MovieCard';
import { useDebounce } from 'react-use';
const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjYxYjMxZjE0YWNmYWViYTE1MDEzZWMzZTYxNmNiNSIsIm5iZiI6MTc1NDUxOTM1MC44ODcsInN1YiI6IjY4OTNkNzM2YmZiMGM0MWY3Mzc5NTVjOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8Ko5NGpB-Jfb7OCkpb7Efh4AGb-4oSUsaeelXZhNlqM'
  }
};

function App() {

  const [searchTerm, setSearchTerm] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false) ;
  const [page, setPage] = useState(1);
  const [deboundedSerachedTerm, setDeboundedSerachedTerm] = useState(''); 

  useDebounce(() => setDeboundedSerachedTerm(searchTerm), 500, [searchTerm])
 
  const loadMore = () => {
    setPage(page + 1);
    fetchMovies(deboundedSerachedTerm);
  }
    const fetchMovies = async(query = '') => {
    console.log(page);
    setIsLoading(true);
    setErrorMessage('');
    try {
      const endpoint = query ? `${API_BASE_URL}/search/movie?page=${page}&query=${encodeURIComponent(query)}`: `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page}`;


      const response = await fetch(endpoint, options);

      if(!response.ok){
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();

      if(data.Response === 'False'){
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovieList([]);
        return;
      }
      console.log(data.results);
      if(page === 1){
        setMovieList(data.results);
      } else{
        setMovieList(prevMovieList => [...prevMovieList, data.results]);
      }


    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching Movies...')
    } finally{
      setIsLoading(false);
    }
  }
  useEffect(() => {
    setPage(1);
    fetchMovies(deboundedSerachedTerm);
  }, [deboundedSerachedTerm])
  return (
    <main>
      <div className='pattern' />

      <div className='wrapper'>
        <header>
          <h1>Find <span className='text-gradient'>Movies</span> You'll Love Without the Hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>

        
        <section className='all-movies'>
          <h2>All Movies</h2>

          {isLoading ? (
            <p className='text-while'>Loading....</p>
          ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie}/>
              ))}
            </ul>
          )}
          
        </section>
        <button className="text-white" onClick={() => {loadMore()}}> Load More</button>
      </div>
    </main>
  )
}

export default App
