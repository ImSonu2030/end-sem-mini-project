package org.ryukonz.esdminiproject.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "domains")
public class Domains {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int domain_id;
    private String program;
    private String batch;
    private int capacity;
    private String qualification;
}
