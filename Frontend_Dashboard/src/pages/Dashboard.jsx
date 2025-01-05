import React, { useEffect, useState } from 'react';
import { fetchNews } from '../services/newsApi';
import Filters from '../components/Filters';
import PayoutCalculator from '../components/PayoutCalculator';
import Overview from '../components/Overview';
import Analytics from '../components/Analytics';
import { auth } from '../firebase'; // Ensure Firebase is correctly imported
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function Dashboard() {
  const predefinedCategories = ['sports', 'politics', 'technology', 'health', 'entertainment']; // Default categories
  const [selectedCategories, setSelectedCategories] = useState(predefinedCategories);
  const [articlesByCategory, setArticlesByCategory] = useState({});
  const [filteredArticlesByCategory, setFilteredArticlesByCategory] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    author: '',
    startDate: '',
    endDate: '',
  });

  const navigate = useNavigate(); // Initialize navigation

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Log out the user
      navigate('/'); // Redirect to login page
    } catch (error) {
      console.error('Error during logout:', error);
      alert('Failed to log out. Please try again.');
    }
  };

  useEffect(() => {
    // Fetch articles for the selected categories
    const fetchArticles = async () => {
      const results = {};
      for (const category of selectedCategories) {
        const articles = await fetchNews(category);
        results[category] = articles;
      }
      setArticlesByCategory(results);
      setFilteredArticlesByCategory(results); // Initially show all articles
    };
    fetchArticles();
  }, [selectedCategories]); // Refetch articles when selected categories change

  useEffect(() => {
    const applyFilters = () => {
      const results = {};
      for (const category in articlesByCategory) {
        let articles = articlesByCategory[category];

        if (searchTerm) {
          articles = articles.filter((article) =>
            article.title?.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        if (filters.author) {
          articles = articles.filter((article) =>
            article.author?.toLowerCase().includes(filters.author.toLowerCase())
          );
        }

        if (filters.startDate || filters.endDate) {
          const start = filters.startDate ? new Date(filters.startDate) : new Date('1900-01-01');
          const end = filters.endDate ? new Date(filters.endDate) : new Date('2100-12-31');
          articles = articles.filter((article) => {
            const publishedDate = new Date(article.publishedAt);
            return publishedDate >= start && publishedDate <= end;
          });
        }

        results[category] = articles;
      }
      setFilteredArticlesByCategory(results);
    };

    applyFilters();
  }, [searchTerm, filters, articlesByCategory]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (filterValues) => {
    setFilters(filterValues);
  };

  const handleCategoryChange = (category, isChecked) => {
    if (isChecked) {
      setSelectedCategories((prev) => [...prev, category]);
    } else {
      setSelectedCategories((prev) => prev.filter((cat) => cat !== category));
    }
  };

  return (
    <div
      className="container my-4"
      style={{
        backgroundColor: '#f9f9f9', // Light gray background for better aesthetics
        padding: '20px',
        borderRadius: '8px',
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Dashboard</h1>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Category Selection */}
      <div className="card p-3 mb-4">
        <h5>Select Categories</h5>
        <div className="d-flex flex-wrap gap-2">
          {predefinedCategories.map((category) => (
            <div key={category} className="form-check">
              <input
                type="checkbox"
                id={category}
                className="form-check-input"
                checked={selectedCategories.includes(category)}
                onChange={(e) => handleCategoryChange(category, e.target.checked)}
              />
              <label htmlFor={category} className="form-check-label text-capitalize">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Filters Component */}
      <Filters onSearch={handleSearch} onFilter={handleFilter} />

      {/* Sections for Each Category */}
      {selectedCategories.map((category) => (
        <div key={category} className="mb-4">
          <h2 className="text-capitalize">{category}</h2>
          <div className="row">
            {filteredArticlesByCategory[category]?.slice(0, 4).map((article, index) => (
              <div key={index} className="col-md-3">
                <div className="card mb-3">
                  <img
                    src={article.urlToImage || 'https://via.placeholder.com/150'}
                    className="card-img-top"
                    alt={article.title || 'No title available'}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{article.title || 'No title available'}</h5>
                    <p className="card-text">
                      {article.description || 'No description available.'}
                    </p>
                    <a
                      href={article.url}
                      className="btn btn-primary btn-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Payout Calculator */}
      <PayoutCalculator articles={Object.values(filteredArticlesByCategory).flat()} />

      {/* Overview Section */}
      <Overview articlesByCategory={filteredArticlesByCategory} />

      {/* Analytics Section */}
      <Analytics articlesByCategory={filteredArticlesByCategory} />
    </div>
  );
}

export default Dashboard;
