
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Mock Data Types
export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  location: string;
  image: string;
  rating: number;
  reviews: number;
  available: boolean;
  languages: string[];
}

export interface Video {
  id: string;
  title: string;
  doctorName: string;
  thumbnail: string;
  category: "Symptom" | "General Advice" | "Emergency Warning";
  duration: string;
  views: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "bot" | "doctor";
  content: string;
  timestamp: string;
}

// Mock Data
export const DOCTORS: Doctor[] = [
  {
    id: "d1",
    name: "Dr. Sarah Chen",
    specialization: "General Physician",
    location: "Downtown Medical Center, NY",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300",
    rating: 4.8,
    reviews: 124,
    available: true,
    languages: ["English", "Mandarin"],
  },
  {
    id: "d2",
    name: "Dr. James Wilson",
    specialization: "Pediatrician",
    location: "Westside Family Clinic, NY",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300",
    rating: 4.9,
    reviews: 89,
    available: true,
    languages: ["English", "Spanish"],
  },
  {
    id: "d3",
    name: "Dr. Emily Rodriguez",
    specialization: "Dermatologist",
    location: "Skin Care Institute, NJ",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300",
    rating: 4.7,
    reviews: 215,
    available: false,
    languages: ["English", "Spanish"],
  },
  {
    id: "d4",
    name: "Dr. Michael Chang",
    specialization: "Orthopedic",
    location: "City Ortho Center, NY",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300&h=300",
    rating: 4.6,
    reviews: 76,
    available: true,
    languages: ["English"],
  },
];

export const VIDEOS: Video[] = [
  {
    id: "v1",
    title: "When is a fever dangerous?",
    doctorName: "Dr. Sarah Chen",
    thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=500",
    category: "Symptom",
    duration: "2:15",
    views: "1.2k",
  },
  {
    id: "v2",
    title: "Treating minor cuts at home",
    doctorName: "Dr. James Wilson",
    thumbnail: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=500",
    category: "General Advice",
    duration: "3:45",
    views: "850",
  },
  {
    id: "v3",
    title: "Vitamin B12 Deficiency Signs",
    doctorName: "Dr. Michael Chang",
    thumbnail: "https://images.unsplash.com/photo-1584515933487-9bfa05d1d6a6?auto=format&fit=crop&q=80&w=500",
    category: "Symptom",
    duration: "4:20",
    views: "3.5k",
  },
  {
    id: "v4",
    title: "When to see a doctor for back pain",
    doctorName: "Dr. Michael Chang",
    thumbnail: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=500",
    category: "Emergency Warning",
    duration: "1:50",
    views: "5.1k",
  },
];

export const INITIAL_CHAT: ChatMessage[] = [
  {
    id: "c1",
    role: "bot",
    content: "Hello! I'm CareBridge Assistant. I can help answer general health questions based on doctor-approved guidelines. Remember, I cannot diagnose diseases. How can I help you today?",
    timestamp: new Date().toISOString(),
  },
];
