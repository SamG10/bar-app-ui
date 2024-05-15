import axiosInstance from './config'

interface LoginResponse {
  token: string
  user: { id: number; email: string; role: string }
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await axiosInstance.post('/auth/login', { email, password })
  return response.data
}

export const logout = async (): Promise<void> => {
  await axiosInstance.post('/auth/logout')
}
