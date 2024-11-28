-- Table creation for Domains
CREATE TABLE Domains (
                         domain_id INT AUTO_INCREMENT PRIMARY KEY,
                         program VARCHAR(100) NOT NULL,
                         batch VARCHAR(100) NOT NULL,
                         capacity INT NOT NULL,
                         qualification VARCHAR(100) NOT NULL
);

-- Table creation for Specializations
CREATE TABLE Specializations (
                                 specialization_id INT AUTO_INCREMENT PRIMARY KEY,
                                 specialization_code VARCHAR(50) UNIQUE NOT NULL,
                                 specialization_name VARCHAR(100) NOT NULL,
                                 specialization_description TEXT,
                                 specialization_year INT NOT NULL,
                                 credit_required INT NOT NULL
);
