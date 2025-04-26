"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";

import { Textarea } from "@/app/components/ui/textarea";
// import { toast } from "@/app/components/ui/use-toast"
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { formSchema } from "@/shared/zodSchema";

// Define the form schema with Zod

// Infer the type from the schema
type FormValues = z.infer<typeof formSchema>;

export default function ProductForm() {
  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      minPrice: 100,
      maxPrice: 1000,
    },
  });

  // Handle form submission
  function onSubmit(data: FormValues) {
    console.log(data);
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Job</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Title Field */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Job title" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description Field */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter job description"
                    className="min-h-[120px] resize-none"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Minimum Price Field */}
          <FormField
            control={form.control}
            name="minPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Minimum Price (PKR)</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      PKR
                    </span>
                    <Input
                      type="number"
                      placeholder="0"
                      className="pl-12"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Maximum Price Field */}
          <FormField
            control={form.control}
            name="maxPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Maximum Price (PKR)</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      PKR
                    </span>
                    <Input
                      type="number"
                      placeholder="0"
                      className="pl-12"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
