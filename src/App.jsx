import { useEffect, useState } from "react";
import { Film } from "lucide-react";
import Search from "./components/Search";

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();

      if (data.Response === "False") {
        setErrorMessage(data.Error || "Failed to fetch movies");
        setMovieList([]);
        return;
      }
      setMovieList(data.results || []);
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage("Error Fetching Movies. Please try again letter");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchMovies();
  }, []);
  return (
    <>
      <main>
        <div className="pattern">
          <div className="gradient-overlay" />
        </div>
        <div className="wrapper">
          <header className="relative">
            {/* Logo and title section */}
            <div className="flex flex-col items-center gap-6">
              <div className="logo-container">
                <Film className="text-white w-16 h-16 animate-pulse" />
              </div>
              <h1 className="hero-title">
                Find{" "}
                <span className="text-gradient animate-gradient">Movies</span>
                <br />
                You&apos;ll Enjoy Without Hassles
              </h1>
              <p className="max-w-2xl text-center text-light-200/80 text-lg">
                Discover thousands of movies, from latest releases to timeless
                classics. Your perfect movie night starts here.
              </p>
            </div>

            {/* Search section with enhanced styling */}
            <div className="mt-12">
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>

            {/* Stats section */}
            <div className="stats-container text-white mt-16 grid grid-cols-3 max-w-xl mx-auto">
              <div className="stat-item">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Movies</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">5K+</span>
                <span className="stat-label">Users</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">4.9</span>
                <span className="stat-label">Rating</span>
              </div>
            </div>
          </header>
          <section className="all-movies">
            <h2>All Movies</h2>
            {isLoading ? (
              <p className="text-white">Loading ...</p>
            ) : errorMessage ? (
              <p className="text-red-500">{errorMessage}</p>
            ) : (
              <ul>
                {movieList.map((movie) => {
                  return (
                    <p key={movie.id} className="text-white">
                      {movie.title}
                    </p>
                  );
                })}
              </ul>
            )}
          </section>
        </div>
      </main>
    </>
  );
}

export default App;
