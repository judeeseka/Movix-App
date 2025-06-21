import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalizeWords(value: string) {
  return value
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export const getPosterUrl = (path: string, size: string = 'w500') => {
  if (!path) return 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&h=750&fit=crop';
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

export const getBackdropUrl = (path: string, size: string = 'w1280') => {
  if (!path) return 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1280&h=720&fit=crop';
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

export const getProfileUrl = (profilePath: string | null, size: string = "w300") => {
  if (!profilePath) return "/avatar.webp";
  return `https://image.tmdb.org/t/p/${size}${profilePath}`;
};

export const formatRuntime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};