import { useState } from "react";
import EmployeeList from "./components/EmployeeList/EmployeeList";
import EmployeeCard from "./components/EmployeeCard/EmployeeCard";

import EmployeeForm from "./components/EmployeeForm/EmployeeForm";
import SearchBar from "./components/SearchBar/SearchBar";
import DepartmentFilter from "./components/DepartmentFilter/DepartmentFilter";
import { mockEmployees } from "./data/mockEmployees";
import "./App.css"

function App() {
  const [employeeData, setEmployeeData] = useState(mockEmployees);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [viewMode, setViewMode] = useState(""); // ✅ Add this


  const handleAddEmployee = (newEmployee) => {
    setEmployeeData((prev) => [...prev, newEmployee]);
  };

  const handleUpdateEmployee = (updatedEmployee) => {
    setEmployeeData((prev) =>
      prev.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp))
    );
  };

  const handleDeleteEmployee = (id) => {
    setEmployeeData((prev) => prev.filter((emp) => emp.id !== id));
  };

  const filteredEmployees = employeeData.filter((emp) => {
    const matchesSearch =
      (emp.firstName?.toLowerCase() ?? "").includes(searchQuery.toLowerCase()) ||
      (emp.lastName?.toLowerCase() ?? "").includes(searchQuery.toLowerCase());

    const matchesDepartment = departmentFilter ? emp.department === departmentFilter : true;

    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="app">
      {showForm ? (
        <EmployeeForm
          onAdd={handleAddEmployee}
          onUpdate={handleUpdateEmployee}
          onClose={() => {
            setShowForm(false);
            setEditingEmployee(null);
          }}
          editingEmployee={editingEmployee}
        />
      ) : (
        <>
          <div className="top-controls">
            <button onClick={() => setShowForm(true)}>+ Add Employee</button>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <DepartmentFilter departmentFilter={departmentFilter} setDepartmentFilter={setDepartmentFilter} />
          </div>
          <div className="view-toggle">
            <h1>Employee Details</h1>
            <button onClick={() => setViewMode("table")} className={viewMode === "table" ? "active" : ""}>
              Table View
            </button>
            <button onClick={() => setViewMode("card")} className={viewMode === "card" ? "active" : ""}>
              Card View
            </button>
            
          </div>

          {viewMode === "table" && (
            <EmployeeList
              employeeData={filteredEmployees}
              setEmployeeData={setEmployeeData}
              onEdit={(emp) => {
                setEditingEmployee(emp);
                setShowForm(true);
              }}
              onDelete={handleDeleteEmployee}
            />
          )}

          {viewMode === "card" && (
            <EmployeeCard
              employeeData={filteredEmployees}
              onEdit={(emp) => {
                setEditingEmployee(emp);
                setShowForm(true);
              }}
              onDelete={handleDeleteEmployee}
            />
          )}
        </>
      )}
    </div>
  );
}


export default App;
