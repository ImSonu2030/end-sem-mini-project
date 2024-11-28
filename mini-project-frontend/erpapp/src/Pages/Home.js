import React, { useEffect, useState } from "react";
import { getStudents } from "../api/api";
import StudentCard from "../components/StudentCard";
import useAuth from "../hooks/useAuth";
import "../components/App.css";

const Home = () => {
    const { token } = useAuth(); // Get the token from AuthContext
    const [students, setStudents] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchStudents = async () => {
            if (!token) return; // Ensure a token is available

            try {
                const data = await getStudents(token); // Pass the token to the API call
                console.log(data);
                setStudents(data);
            } catch (err) {
                console.error(err);
                setError("Failed to load student data. Please try again later.");
            }
        };

        fetchStudents();
    }, [token]); // Re-run the effect if the token changes

    return (
        <div className="student-card-section">
            <h2>Student Details</h2>
            {error && <p className="error-message">{error}</p>}
            <div className="student-cards">
                {students.length > 0 ? (
                    students.map((student) => (
                        <StudentCard key={student.rollNumber} student={student} />
                    ))
                ) : (
                    !error && <p>Loading students...</p>
                )}
            </div>
        </div>
    );
};

export default Home;