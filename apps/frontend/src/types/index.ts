export interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  thumbnail?: string;
  featured: boolean;
  status: "in-progress" | "completed" | "archived";
  createdAt: string;
}

export interface Blog {
  _id: string;
  title: string;
  content: string;
  summary?: string;
  tags: string[];
  published: boolean;
  views: number;
  createdAt: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}
