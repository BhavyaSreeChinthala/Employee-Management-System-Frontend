import React from "react";

export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <input
      type="text"
      placeholder="Search by first name or last name"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      style={{ marginLeft: "10px", padding: "5px" }}
    />
  );
}
