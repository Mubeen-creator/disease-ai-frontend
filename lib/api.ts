const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

class ApiClient {
  private getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem('auth_token');
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
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await this.handleResponse<{ token: string; user: any }>(response);
    localStorage.setItem('auth_token', data.token);
    return data;
  }

  async signup(name: string, email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    
    const data = await this.handleResponse<{ token: string; user: any }>(response);
    localStorage.setItem('auth_token', data.token);
    return data;
  }

  async forgotPassword(email: string) {
    const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    
    return this.handleResponse<{ message: string }>(response);
  }

  async sendMessage(message: string) {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ message }),
    });
    
    return this.handleResponse<{ response: string }>(response);
  }

  async getProfile() {
    const response = await fetch(`${API_BASE_URL}/profile`, {
      headers: this.getAuthHeaders(),
    });
    
    return this.handleResponse<any>(response);
  }

  logout() {
    localStorage.removeItem('auth_token');
  }
}

export const apiClient = new ApiClient();