import React, { useState, useEffect } from 'react';
import Card from './Card';
import axios from 'axios';
import { baseURL } from '../utils/constants';
import { Link } from 'react-router-dom';

const Home = () => {
  //state to store the articles
  const [articles, setArticles] = useState([]);

  //state to store the articles based on search query
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get(`${baseURL}/get`).then((res) => {
      setArticles(res.data);
    }, []);
  }, []);


  //  map transforms each element of an array and returns a new array with the transformed values.
  // filter creates a new array containing only the elements that meet a specified condition.
  const handleSearch = () => {
    // Perform the search based on the searchQuery in the client-side
    const filteredArticles = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Update the articles state with the filtered results
    setArticles(filteredArticles);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="mb-4">Articles</h1>
        <Link to="/new" className="btn btn-success mb-4">
          New Article
        </Link>
        <div className="input-group">
          <input
            className="form-control"
            type="text"
            id="searchInput"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleInputChange}
          />
          <button
            onClick={handleSearch}
            id="searchButton"
            type="button"
            className="btn btn-secondary"
          >
            Search
          </button>
        </div>

        <ul className="list-unstyled">
          {articles.map((article) => {
            return <Card key={article._id} article={article} />;
          })}
        </ul>
      </div>
    </div>
  );
};

export default Home;
