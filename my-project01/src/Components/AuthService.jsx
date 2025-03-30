import axios from "axios";


const API_BASE_URL = "http://localhost:3000";

class AuthService {

  async checkAuthentication() {
    const sessionId = localStorage.getItem("SessionId");
    const email = localStorage.getItem("Email");
    const userName = localStorage.getItem("UserName");
    const role = localStorage.getItem("Role");
    
    if (!sessionId || !email || !userName || !role) {
      return false;
    }
    
    try {
      const response = await axios.post(`${API_BASE_URL}/authenticatePrivateComponent`, {
        email,
        userName,
        sessionId,
        role
      });
      
      return response.data.authenticated === true;
    } catch (error) {
      console.error("Authentication check failed:", error);
      return false;
    }
  }
  
  // Get current user info
  getCurrentUser() {
    return {
      email: localStorage.getItem("Email"),
      userName: localStorage.getItem("UserName"),
      role: localStorage.getItem("Role")
    };
  }
}

export default new AuthService();