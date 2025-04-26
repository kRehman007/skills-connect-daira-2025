// import { z } from "zod";
// export const formSchema = z
//   .object({
//     title: z
//       .string()
//       .min(3, { message: "Title must be at least 3 characters" })
//       .max(50, { message: "Title must not exceed 50 characters" }),
//     description: z
//       .string()
//       .min(10, { message: "Description must be at least 10 characters" })
//       .max(500, { message: "Description must not exceed 500 characters" }),
//     minPrice: z
//       .number()
//       .gt(0, { message: "Minimum price must be greater than 0" }),
//     maxPrice: z
//       .number()
//       .min(1, { message: "Maximum price is required" })
//       .refine((val) => val > 0, {
//         message: "Maximum price must be greater than 0",
//       }),
//     location: z.object({
//       lat: z.number(),
//       lng: z.number(),
//       address: z.string().min(1, "Please select a location from the map"),
//     }),
//   })
//   .refine((data) => data.maxPrice > data.minPrice, {
//     message: "Maximum price must be greater than minimum price",
//     path: ["maxPrice"],
//   });

// shared/zodSchema.ts
import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  minPrice: z.number().min(0, "Minimum price must be at least 0"),
  maxPrice: z.number().min(0, "Maximum price must be at least 0"),
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
