export interface User {
  uuid?: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  graduationYear: number;
  major: string;
  bio: string;
  points: number;
}

export interface UserResponse {
  error?: string;
  user: User;
}
