package org.ryukonz.esdminiproject.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "students")
public class Students {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int studentId;

    @Column(name = "roll_number", unique = true, nullable = false)
    private String rollNumber;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(nullable = false, unique = true)
    private String email;

    private double cgpa;

    private String imageName;
    private String imageType;

    @Lob
    private byte[] imageData;

    @Column(name = "total_credits")
    private int totalCredits;

    @Column(name = "graduation_year")
    private String graduationYear;

    @ManyToOne
    @JoinColumn(name = "domain_id", nullable = false)
    private Domains domain;

    @ManyToOne
    @JoinColumn(name = "specialization_id", nullable = false)
    private Specializations specialization;
}