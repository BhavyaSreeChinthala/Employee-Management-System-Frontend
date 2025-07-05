import { useState } from "react";
import "./EmployeeCard.css";
export default function EmployeeCard({ employeeData = [], onEdit, onDelete }) {
    const [currentPage, setCurrentPage] = useState(1);
    const EMPLOYEES_PER_PAGE = 10;
    const startIdx = (currentPage - 1) * EMPLOYEES_PER_PAGE;
    const endIdx = startIdx + EMPLOYEES_PER_PAGE;
    const paginatedEmployees = employeeData.slice(startIdx, endIdx);
    const totalPages = Math.ceil(employeeData.length / EMPLOYEES_PER_PAGE);
    return (
        <div className="card-container">
            <p>
                Showing {startIdx + 1} - {Math.min(endIdx, employeeData.length)} of{" "}
                {employeeData.length} employees (Page {currentPage} of {totalPages})
            </p>

            <div className="employee-cards">
                {paginatedEmployees.map((employee) => (
                    <div className="employee-card" key={employee.id}>
                        <img
                            src={employee.profilePic}
                            alt={`${employee.firstName}'s avatar`}
                            className="profile-pic"
                        />
                        <h3>{employee.firstName} {employee.lastName}</h3>
                        <p><strong>Email:</strong> {employee.email}</p>
                        <p><strong>Phone:</strong> {employee.phone}</p>
                        <p><strong>Department:</strong> {employee.department}</p>
                        <p><strong>Position:</strong> {employee.position}</p>
                        <p><strong>Salary:</strong> ${employee.salary}</p>
                        <p><strong>Hire Date:</strong> {employee.hireDate}</p>
                        <p><strong>Status:</strong> {employee.isActive ? "Active" : "Inactive"}</p>
                        <p><strong>Performance:</strong> {employee.performance}</p>
                        <button className="button" onClick={() => onEdit(employee)}>Edit</button>
                        <button className="button" onClick={() => {
                            if (window.confirm(`Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`)) {
                                onDelete(employee.id);
                            }
                        }}>Delete</button>
                    </div>
                ))}
            </div>
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
