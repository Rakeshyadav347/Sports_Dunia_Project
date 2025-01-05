import React, { useState } from 'react';

function Filters({ onFilter, onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [author, setAuthor] = useState('');
  const [type, setType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleFilter = () => {
    onFilter({ author, type, startDate, endDate });
  };

  return (
    <div className="card p-3 mb-4">
      <h2 className="mb-3">Filters and Search</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <select
            className="form-select"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="news">News</option>
            <option value="blog">Blog</option>
          </select>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
      <div className="d-flex gap-2">
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
        <button className="btn btn-success" onClick={handleFilter}>
          Apply Filters
        </button>
      </div>
    </div>
  );
}

export default Filters;
