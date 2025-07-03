import React, { useState } from "react";
import { useEffect } from "react";
import './EmployeeForm.css';

export default function EmployeeForm({ onAdd, onClose, editingEmployee, onUpdate }) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        department: "",
        position: "",
        salary: "",
        hireDate: "",
        profilePic: "",
        isActive: true,
        performance: "",
        managerId: ""
    });

    useEffect(() => {
        if (editingEmployee) {
            setFormData({
                ...editingEmployee,
                salary: editingEmployee.salary ?? "",
                performance: editingEmployee.performance ?? "",
                managerId: editingEmployee.managerId ?? "",
                profilePic: editingEmployee.profilePic ?? "",
            });
        }
    }, [editingEmployee]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        if (type === "file") {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({ ...prev, profilePic: reader.result }));
            };
            if (file) reader.readAsDataURL(file);
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedData = {
            ...formData,
            salary: parseFloat(formData.salary),
            isActive: formData.isActive === "true" || formData.isActive === true,
            performance: parseInt(formData.performance),
            managerId: parseInt(formData.managerId)
        };

        if (editingEmployee) {
            onUpdate(formattedData);
        } else {
            onAdd({ ...formattedData, id: Date.now() });
        }

        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="formContainer">
            <h2>{editingEmployee ? "Edit Employee" : "Add New Employee"}</h2>
            <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
            <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
            <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
            <input name="department" placeholder="Department" value={formData.department} onChange={handleChange} required />
            <input name="position" placeholder="Position" value={formData.position} onChange={handleChange} required />
            <input name="salary" type="number" placeholder="Salary" value={formData.salary} onChange={handleChange} required />
            <input name="hireDate" type="date" placeholder="Hire Date" value={formData.hireDate} onChange={handleChange} required />
            <input name="performance" type="number" placeholder="Performanc (1-5)" value={formData.performance} onChange={handleChange} required />
            <input name="managerId" type="number" placeholder="Manager ID" value={formData.managerId} onChange={handleChange} />

            <label>
                Status:
                <select name="isActive" value={formData.isActive} onChange={handleChange}>
                    <option value={true}>Active</option>
                    <option value={false}>Inactive</option>
                </select>
            </label>

            <label>
                Upload Profile Picture:
                <input type="file" name="profilePic" accept="image/*" onChange={handleChange} />
            </label>
            {formData.profilePic && (
                <img src={formData.profilePic} alt="Preview" style={{ width: 100, height: 100, marginTop: 10, borderRadius: "50%" }} />
            )}

            <div style={{ marginTop: "10px" }}>
                <button type="submit">Submit</button>
                <button type="button" onClick={onClose} className="cancelButton">Cancel</button>
            </div>
        </form>
    );
}
