import { useState } from "react";
import { mockEmployees } from "../../data/mockEmployees";
import "./EmployeeList.css";


export default function EmployeeList({ employeeData = [], setEmployeeData, onEdit, onDelete }) {
    const [currentPage, setCurrentPage] = useState(1);
    const EMPLOYEES_PER_PAGE = 10;

    const handleSort = (key, direction) => {
        const sorted = [...employeeData].sort((a, b) => {
            let aVal = a[key];
            let bVal = b[key];

            if (key === "hireDate") {
                aVal = new Date(aVal);
                bVal = new Date(bVal);
            }
            if (typeof aVal === "string" && typeof bVal === "string") {
                aVal = aVal.toLowerCase();
                bVal = bVal.toLowerCase();
            }
            if (aVal < bVal) return direction === "asc" ? -1 : 1;
            if (aVal > bVal) return direction === "asc" ? 1 : -1;
            return 0;
        });
        setEmployeeData(sorted);
        setCurrentPage(1);
    };
    const renderSortButtons = (key) => (
        <span className="sort-buttons">
            <button onClick={() => handleSort(key, "asc")}>↓</button>
            <button onClick={() => handleSort(key, "desc")}>↑</button>
        </span>
    );

    const startIdx = (currentPage - 1) * EMPLOYEES_PER_PAGE;
    const endIdx = startIdx + EMPLOYEES_PER_PAGE;
    const paginatedEmployees = employeeData.slice(startIdx, endIdx);
    const totalPages = Math.ceil(employeeData.length / EMPLOYEES_PER_PAGE);

    return (
        <div className="employee-table-container">
            <p>
                Showing {startIdx + 1} - {Math.min(endIdx, employeeData.length)} of{" "}
                {employeeData.length} employees (Page {currentPage} of {totalPages})
            </p>

            <table className="employee-table">
                <thead> 
                    <tr>
                        <th>ID</th>
                        <th>Profile</th>
                        <th>First Name {renderSortButtons("firstName")}</th>
                        <th>Last Name {renderSortButtons("lastName")}</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Department</th>
                        <th>Position</th>
                        <th>Salary {renderSortButtons("salary")}</th>
                        <th>Hire Date {renderSortButtons("hireDate")}</th>
                        <th>Status</th>
                        <th>Performance</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedEmployees.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>
                            <img
                            src={employee.profilePic}
                            alt={`${employee.firstName}'s avatar`}
                            className="profile-pic"/></td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>{employee.phone}</td>
                            <td>{employee.department}</td>
                            <td>{employee.position}</td>
                            <td>${employee.salary}</td>
                            <td>{employee.hireDate}</td>
                            <td>{employee.isActive ? "Active" : "Inactive"}</td>
                            <td>{employee.performance}</td>
                            <td>
                                <button onClick={() => onEdit(employee)}>Edit</button>
                                <button onClick={() => {
                                    if (window.confirm(`Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`)) {
                                        onDelete(employee.id);
                                    }
                                }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={currentPage === i + 1 ? "active" : ""}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}