const BASE_URL = "http://localhost:8080/api";

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    return response.json();
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};


export const getStudents = async (token) => {
  try {
      const response = await fetch(`${BASE_URL}/students`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include the token
          },
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
  } catch (error) {
      console.error("Error fetching students:", error);
      throw error;
  }
};


export const getStudentDetails = async (token, rollNumber) => {
  try {
      const response = await fetch(`${BASE_URL}/student/${rollNumber}`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include the token
          },
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
  } catch (error) {
      console.error("Error fetching student details:", error);
      throw error;
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      throw new Error(`Login failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data; // Handle token/session if needed
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const signUpUser = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`Sign Up failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Sign Up failed:", error);
    throw error;
  }
};
