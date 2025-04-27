import { JobCategory } from "@prisma/client";

export function cn(...inputs: (string | undefined | false | null)[]) {
  return inputs.filter(Boolean).join(" ");
}

export function capitalizeFirstLetter(category: string): JobCategory {
  return (category.charAt(0).toUpperCase() + category.slice(1)) as JobCategory;
}
