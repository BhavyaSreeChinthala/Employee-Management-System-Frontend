import React from "react";
import "./DepartmentFilter.css"

export default function DepartmentFilter({ departmentFilter, setDepartmentFilter }) {
  return (
    <select className="select" value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)} >
      <option value="">All Departments</option>
      <option value="Engineering">Engineering</option>
      <option value="HR">HR</option>
      <option value="Marketing">Marketing</option>
      <option value="Sales">Sales</option>
      <option value="Finance">Finance</option>
    </select>
  );
}
