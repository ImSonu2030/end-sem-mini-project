import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getStudentDetails } from "../api/api";
import useAuth from "../hooks/useAuth";
import "../components/App.css";

const StudentDetails = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { token } = useAuth();
    const [student, setStudent] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!state || !state.rollNumber) {
            navigate("/"); // Redirect to home if no rollNumber is provided
            return;
        }

        const fetchStudentDetails = async () => {
            try {
                const data = await getStudentDetails(token, state.rollNumber);
                setStudent(data);
            } catch (err) {
                console.error(err);
                setError("Failed to load student details. Please try again later.");
            }
        };

        fetchStudentDetails();
    }, [state, token, navigate]);

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    if (!student) {
        return <p>Loading student details...</p>;
    }

    const {
        firstName,
        lastName,
        email,
        cgpa,
        imageName,
        imageType,
        imageData,
        totalCredits,
        graduationYear,
        domainProgram,
        domainBatch,
        domainQualification,
        domainCapacity,
        specializationCode,
        specializationName,
        specializationDescription,
        specializationYear,
        specializationCreditRequired,
    } = student;

    const imageSrc =
        imageData && imageType
            ? `data:${imageType};base64,${imageData}`
            : "https://via.placeholder.com/150?text=No+Image";

            
    return (
        <div className="student-details">
            <button className="back-btn" onClick={() => navigate(-1)}>Back</button>
            <div className="student-card-container">
                {/* Student Card */}
                <div className="student-profile-card">
                    <div className="student-header">
                        <img src={imageSrc} alt={imageName || "No image"} className="student-image" />
                        <h2>{`${firstName} ${lastName}`}</h2>
                    </div>
                    <div className="student-info">
                        <p><strong>Email:</strong> {email}</p>
                        <p><strong>Roll Number:</strong> {student.rollNumber}</p>
                        <p><strong>CGPA:</strong> {cgpa}</p>
                        <p><strong>Total Credits:</strong> {totalCredits}</p>
                        <p><strong>Graduation Year:</strong> {graduationYear}</p>
                    </div>
                </div>

                {/* Right-side Details */}
                <div className="student-details-tray">
                    <div className="student-domain">
                        <h3>Domain Details</h3>
                        <p><strong>Program:</strong> {domainProgram}</p>
                        <p><strong>Batch:</strong> {domainBatch}</p>
                        <p><strong>Capacity:</strong> {domainCapacity}</p>
                        <p><strong>Qualification:</strong> {domainQualification}</p>
                    </div>
                    <div className="student-specialization">
                        <h3>Specialization Details</h3>
                        <p><strong>Code:</strong> {specializationCode}</p>
                        <p><strong>Name:</strong> {specializationName}</p>
                        <p><strong>Description:</strong> {specializationDescription}</p>
                        <p><strong>Year:</strong> {specializationYear}</p>
                        <p><strong>Credits Required:</strong> {specializationCreditRequired}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDetails;
