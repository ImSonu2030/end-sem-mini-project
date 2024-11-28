import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import "../components/App.css";

const Register = () => {
    const { token } = useAuth(); // Access token from AuthContext
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        image: "",
        cgpa: "",
        totalCredits: "",
        graduationYear: "",
        domainId: "",
        specialization: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            setMessage("You must be logged in to register a student.");
            return;
        }

        // Validation
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(formData.email)) {
            setMessage("Invalid email format. Please use username@domain.com.");
            return;
        }

        if (formData.cgpa < 2 || formData.cgpa > 10) {
            setMessage("CGPA must be between 2 and 10.");
            return;
        }

        if (formData.totalCredits > 250) {
            setMessage("Total credits cannot exceed 250.");
            return;
        }

        // Prepare multipart form data
        const form = new FormData();
        form.append(
            "student",
            new Blob(
                [
                    JSON.stringify({
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        email: formData.email,
                        cgpa: formData.cgpa,
                        totalCredits: formData.totalCredits,
                        graduationYear: formData.graduationYear,
                        domainName: formData.domainId,
                        specializationId: formData.specialization,
                    }),
                ],
                { type: "application/json" }
            )
        );
        form.append("image", formData.image);

        try {
            const response = await fetch("http://localhost:8080/api/register", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`, // Include token in the Authorization header
                },
                body: form,
            });

            if (response.ok) {
                setMessage("Registration successful!");
            } else {
                const errorData = await response.json();
                setMessage(`Error: ${errorData.message || "Registration failed."}`);
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("Error registering user.");
        }
    };

    return (
        <div className="form-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="user-input">
                    <input
                        type="text"
                        name="firstName"
                        placeholder=""
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                    <label>First Name</label>
                </div>
                <div className="user-input">
                    <input
                        type="text"
                        name="lastName"
                        placeholder=""
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                    <label>Last Name</label>
                </div>
                <div className="user-input">
                    <input
                        type="email"
                        name="email"
                        placeholder=""
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <label>Email</label>
                </div>
                <div className="user-input">
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                    />
                </div>
                <div className="user-input">
                    <input
                        type="number"
                        name="cgpa"
                        placeholder=""
                        step="0.01"
                        value={formData.cgpa}
                        onChange={handleChange}
                        required
                    />
                    <label>CGPA</label>
                </div>
                <div className="user-input">
                    <input
                        type="number"
                        name="totalCredits"
                        placeholder=""
                        value={formData.totalCredits}
                        onChange={handleChange}
                        required
                    />
                    <label>Total Credits</label>
                </div>
                <div className="user-input">
                    <select
                        name="graduationYear"
                        value={formData.graduationYear}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Graduation Year</option>
                        {Array.from({ length: 11 }, (_, i) => 2020 + i).map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="user-input">
                    <select
                        name="domainId"
                        value={formData.domainId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Domain</option>
                        <option value="IMTech CSE">IMTech CSE</option>
                        <option value="IMTech ECE">IMTech ECE</option>
                        <option value="MTech CSE">MTech CSE</option>
                        <option value="MTech ECE">MTech ECE</option>
                        <option value="BTech CSE">BTech CSE</option>
                        <option value="BTech ECE">BTech ECE</option>
                        <option value="BTech AI">BTech AI</option>
                    </select>
                </div>
                <div className="user-input">
                    <select
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Specialization</option>
                        <option value="1">Artificial Intelligence & Machine Learning (IML)</option>
                        <option value="2">Theoretical Computer Science (TCS)</option>
                        <option value="3">Software Systems (SSY)</option>
                        <option value="4">Networking and Communication (NC)</option>
                        <option value="5">VLSI Systems (VLSI)</option>
                        <option value="6">Digital Society (DT)</option>
                    </select>
                </div>
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Register;
