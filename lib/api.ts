// Base URL of FastAPI backend (no trailing /api since endpoints are at root)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

class ApiClient {
  private getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem('access_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network error' }));
      throw { message: error.message || 'Something went wrong', status: response.status };
    }
    return response.json();
  }

  async login(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await this.handleResponse<{ access_token: string }>(response);
    localStorage.setItem('access_token', data.access_token);
    return data;
  }

  async signup(fullName: string, email: string, password: string, confirmPassword: string) {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, email, password, confirmPassword }),
    });
    
    const data = await this.handleResponse<{ access_token: string }>(response);
    localStorage.setItem('access_token', data.access_token);
    return data;
  }

  // no forgot-password endpoint in backend yet – retain for future use
  async forgotPassword(email: string) {
    const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    
    return this.handleResponse<{ message: string }>(response);
  }

  async sendMessage(message: string, sessionId?: string): Promise<{ response: string; session_id: string }> {
    const currentSessionId = sessionId || localStorage.getItem('session_id');
    const payload = currentSessionId ? { query: message, session_id: currentSessionId } : { query: message };
    const response = await fetch(`${API_BASE_URL}/ask`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    
    const result = await this.handleResponse<{ answer: string; session_id: string }>(response);
    if (result.session_id) {
      localStorage.setItem('session_id', result.session_id);
    }
    return { response: result.answer, session_id: result.session_id };
  }

  async getSessions() {
    const response = await fetch(`${API_BASE_URL}/sessions`, {
      headers: this.getAuthHeaders(),
    });
    
    return this.handleResponse<Array<{ session_id: string; last_activity: string }>>(response);
  }

  async getSessionMessages(sessionId: string) {
    const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}`, {
      headers: this.getAuthHeaders(),
    });
    
    return this.handleResponse<Array<{ content: string; query?: string; answer?: string; timestamp: string; role: string }>>(response);
  }

  async deleteSession(sessionId: string) {
    const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    
    return this.handleResponse<{ message: string }>(response);
  }

  async getProfile() {
    const response = await fetch(`${API_BASE_URL}/me`, {
      headers: this.getAuthHeaders(),
    });
    
    return this.handleResponse<any>(response);
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('session_id');
  }
}

export const apiClient = new ApiClient();