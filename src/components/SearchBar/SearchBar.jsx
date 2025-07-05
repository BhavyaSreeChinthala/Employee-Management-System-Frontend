import React from "react";
import "./SearchBar.css"

export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="bar">
    <input
      type="text"
      placeholder="Search by first name or last name"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}/>
    </div>
  );
  
}
