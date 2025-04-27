import { z } from "zod";

export const categories = [
  "Electrician",
  "Plumber",
  "Carpenter",
  "Mechanic",
  "Cleaner",
] as const;

export const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  minPrice: z.number().min(0, "Minimum price must be at least 0"),
  maxPrice: z.number().min(0, "Maximum price must be at least 0"),
  category: z.enum(categories, {
    required_error: "Please select a category",
  }),
  location: z
    .object({
      lat: z.number().nullable(),
      lng: z.number().nullable(),
      address: z.string().min(1, "Please select a location from the map"),
    })
    .refine((data) => data.lat !== null && data.lng !== null, {
      message: "Please select a location from the map",
      path: ["address"], // This will show the error on the address field
    }),
});

export type FormValues = z.infer<typeof formSchema>;
