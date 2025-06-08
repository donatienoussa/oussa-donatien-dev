import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatDateToColumn(dateString: string): string {
  const date = new Date(dateString);

  const day = date.getDate().toString().padStart(2, '0');

  const month = date.toLocaleString('fr-FR', { month: 'long' });

  const year = date.getFullYear();

  return `${day}\n${month}\n${year}`;
}
