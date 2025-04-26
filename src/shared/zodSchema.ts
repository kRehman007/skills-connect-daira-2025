import { z } from "zod";
export const formSchema = z
  .object({
    title: z
      .string()
      .min(3, { message: "Title must be at least 3 characters" })
      .max(50, { message: "Title must not exceed 50 characters" }),
    description: z
      .string()
      .min(10, { message: "Description must be at least 10 characters" })
      .max(500, { message: "Description must not exceed 500 characters" }),
    minPrice: z
      .number()
      .gt(0, { message: "Minimum price must be greater than 0" }),
    maxPrice: z
      .number()
      .min(1, { message: "Maximum price is required" })
      .refine((val) => val > 0, {
        message: "Maximum price must be greater than 0",
      }),
  })
  .refine((data) => data.maxPrice > data.minPrice, {
    message: "Maximum price must be greater than minimum price",
    path: ["maxPrice"],
  });
