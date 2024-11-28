SELECT * FROM Domains;

SELECT * FROM Specializations;

SELECT * FROM Domains WHERE program = 'IMTech CSE' AND batch = '2024';
SELECT * FROM Domains WHERE program = 'IMTech ECE' AND batch = '2024';

SELECT * FROM Domains WHERE program = 'IMTech CSE' AND batch = '2025';
SELECT * FROM Domains WHERE program = 'IMTech ECE' AND batch = '2025';

SELECT * FROM Domains WHERE program = 'MTech CSE' AND batch = '2025';

SELECT * FROM Specializations WHERE credit_required > 25;
