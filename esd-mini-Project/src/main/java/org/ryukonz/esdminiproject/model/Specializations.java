package org.ryukonz.esdminiproject.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "specializations")
public class Specializations {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int specialization_id;

    @Column(unique = true, nullable = false)
    private String specialization_code;
    private String specialization_name;
    private String specialization_description;
    private int specialization_year;
    private int credit_required;
}
