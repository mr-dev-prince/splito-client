import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getGroupIdFromPath(path: string): number | null {
  const segments = path.split("/").filter(Boolean);
  const groupIndex = segments.indexOf("groups");
  if (groupIndex !== -1 && segments.length > groupIndex + 1) {
    const groupId = Number(segments[groupIndex + 1]);
    return isNaN(groupId) ? null : groupId;
  }
  return null;
}
