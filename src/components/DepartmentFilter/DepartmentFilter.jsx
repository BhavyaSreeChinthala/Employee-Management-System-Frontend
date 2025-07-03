import React from "react";

export default function DepartmentFilter({ departmentFilter, setDepartmentFilter }) {
  return (
    <select
      value={departmentFilter}
      onChange={(e) => setDepartmentFilter(e.target.value)}
      style={{ marginLeft: "10px", padding: "5px" }}
    >
      <option value="">All Departments</option>
      <option value="Engineering">Engineering</option>
      <option value="HR">HR</option>
      <option value="Marketing">Marketing</option>
      <option value="Sales">Sales</option>
      <option value="Finance">Finance</option>
    </select>
  );
}
