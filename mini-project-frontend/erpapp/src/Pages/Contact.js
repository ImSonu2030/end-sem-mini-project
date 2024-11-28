// Pages/Contact.js
import React from "react";
import "../components/App.css";

const Contact = () => {
    const contactDetails = [
        { label: "Phone", value: "+91 9878987898" },
        { label: "Email", value: "student@iiitb.ac.in" },
        { label: "Address", value: "26/C, Opposite of Infosys gate 1 Electronics City Phase 1, Hosur Road Bengaluru - 560100" },
        { label: "Working Hours", value: "Mon-Fri: 9 AM - 6 PM" },
    ];

    return (
        <div className="contact-page">
            <h2>Contact Us</h2>
            <p>
                We are here to assist you. Feel free to reach out to us through any of the
                following contact details.
            </p>
            <div className="contact-details">
                {contactDetails.map((detail, index) => (
                    <div key={index} className="contact-item">
                        <strong>{detail.label}:</strong> {detail.value}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Contact;
