import { useState } from "react";
import { Film } from "lucide-react";
import Search from "./components/Search";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

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
        </div>
      </main>
    </>
  );
}

export default App;
