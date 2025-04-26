// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/app/components/ui/form";

// import { Textarea } from "@/app/components/ui/textarea";
// // import { toast } from "@/app/components/ui/use-toast"
// import { Button } from "@/app/components/ui/button";
// import { Input } from "@/app/components/ui/input";
// import { formSchema } from "@/shared/zodSchema";

// // Define the form schema with Zod

// // Infer the type from the schema
// type FormValues = z.infer<typeof formSchema>;

// export default function ProductForm() {
//   // Initialize the form
//   const form = useForm<FormValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       title: "",
//       description: "",
//       minPrice: 100,
//       maxPrice: 1000,
//     },
//   });

//   // Handle form submission
//   function onSubmit(data: FormValues) {
//     console.log(data);
//   }

//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">Add New Job</h1>

//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//           {/* Title Field */}
//           <FormField
//             control={form.control}
//             name="title"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Title</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Enter Job title" {...field} />
//                 </FormControl>

//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Description Field */}
//           <FormField
//             control={form.control}
//             name="description"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Description</FormLabel>
//                 <FormControl>
//                   <Textarea
//                     placeholder="Enter job description"
//                     className="min-h-[120px] resize-none"
//                     {...field}
//                   />
//                 </FormControl>

//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Minimum Price Field */}
//           <FormField
//             control={form.control}
//             name="minPrice"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Minimum Price (PKR)</FormLabel>
//                 <FormControl>
//                   <div className="relative">
//                     <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
//                       PKR
//                     </span>
//                     <Input
//                       type="number"
//                       placeholder="0"
//                       className="pl-12"
//                       {...field}
//                       onChange={(e) => field.onChange(Number(e.target.value))}
//                     />
//                   </div>
//                 </FormControl>

//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Maximum Price Field */}
//           <FormField
//             control={form.control}
//             name="maxPrice"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Maximum Price (PKR)</FormLabel>
//                 <FormControl>
//                   <div className="relative">
//                     <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
//                       PKR
//                     </span>
//                     <Input
//                       type="number"
//                       placeholder="0"
//                       className="pl-12"
//                       {...field}
//                       onChange={(e) => field.onChange(Number(e.target.value))}
//                     />
//                   </div>
//                 </FormControl>

//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <Button type="submit" className="w-full">
//             Submit
//           </Button>
//         </form>
//       </Form>
//     </div>
//   );
// }

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api";
import { useCallback, useState, useMemo } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";

import { Textarea } from "@/app/components/ui/textarea";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { formSchema, FormValues } from "@/shared/schema/zodSchema";

const libraries: any = ["places"];

export default function ProductForm() {
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number | null;
    lng: number | null;
    address: string;
  } | null>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: libraries,
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      minPrice: 100,
      maxPrice: 1000,
      location: {
        lat: null,
        lng: null,
        address: "",
      },
    },
  });

  const defaultCenter = useMemo(() => ({ lat: 24.8607, lng: 67.0011 }), []);

  const onMapClick = useCallback(
    async (e: google.maps.MapMouseEvent) => {
      if (!e.latLng) return;

      const lat = e.latLng.lat();
      const lng = e.latLng.lng();

      try {
        const geocoder = new window.google.maps.Geocoder();
        const response = await geocoder.geocode({ location: { lat, lng } });
        const address =
          response.results[0]?.formatted_address || "Address not found";

        setSelectedLocation({ lat, lng, address });
        form.setValue("location", { lat, lng, address });
      } catch (error) {
        console.error("Error getting address:", error);
      }
    },
    [form]
  );

  function onSubmit(data: FormValues) {
    console.log(data);
  }

  if (!isLoaded) return <div>Loading...</div>;

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
          {/* Location Field */}
          <FormField
            control={form.control}
            name="location.address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <div>
                    <Input
                      placeholder="No location selected"
                      readOnly
                      {...field}
                      value={selectedLocation?.address || ""}
                    />
                    <div className="mt-4 h-96 w-full">
                      <GoogleMap
                        zoom={10}
                        center={
                          selectedLocation?.lat !== null &&
                          selectedLocation?.lng !== null
                            ? {
                                lat: selectedLocation?.lat ?? defaultCenter.lat,
                                lng: selectedLocation?.lng ?? defaultCenter.lng,
                              }
                            : defaultCenter
                        }
                        onClick={onMapClick}
                        mapContainerClassName="w-full md:w-2/3 h-full rounded-lg border"
                      >
                        {selectedLocation?.lat && selectedLocation?.lng && (
                          <MarkerF
                            position={{
                              lat: selectedLocation.lat,
                              lng: selectedLocation.lng,
                            }}
                          />
                        )}
                      </GoogleMap>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Click on the map to select your location
                    </p>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Hidden fields */}
          <FormField
            control={form.control}
            name="location.lat"
            render={({ field }) => (
              <FormItem className="hidden">
                <FormControl>
                  <Input type="hidden" {...field} value={field.value || ""} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location.lng"
            render={({ field }) => (
              <FormItem className="hidden">
                <FormControl>
                  <Input type="hidden" {...field} value={field.value || ""} />
                </FormControl>
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
