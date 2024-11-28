// src/components/StudentCard.js
import React from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

const StudentCard = ({ student }) => {
    const navigate = useNavigate();
    const handleViewMore = () => {
        navigate("/student-details", { state: { rollNumber: student.rollNumber } });
    };
    const {
        firstName,
        lastName,
        rollNumber,
        imageName,
        imageType,
        imageData,
        graduationYear,
        domainName,
    } = student;

    // Fallback for missing image data
    const imageSrc =
        imageData && imageType
            ? `data:${imageType};base64,${imageData}`
            : "https://via.placeholder.com/150?text=No+Image";

    return (
        <div className="student-card">
            <div className="student-imageBox">
            <img src={imageSrc} alt={imageName || "No image"} className="student-image" />
            </div>
            <div className="student-info">
            <h3>{`${firstName} ${lastName}`}</h3>
            <p><strong>Roll Number:</strong> {rollNumber}</p>
            <p><strong>Graduation Year:</strong> {graduationYear}</p>
            <p><strong>Domain:</strong> {domainName}</p>
            </div>
            <div className="info-view-btn">
                <button onClick={handleViewMore}>View More</button>
            </div>
        </div>
    );
};

export default StudentCard;
