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
import { formSchema, FormValues } from "@/shared/zodSchema";

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

    if (!isLoaded) return <div className="flex items-center justify-center h-full">Loading map...</div>;

    return (
        <div className="flex-1 flex justify-center items-center flex-col p-6 overflow-hidden">      
        <div className="h-full flex flex-col">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add New Job</h1>

            <div className="flex-1 bg-white rounded-lg shadow-sm p-6 overflow-auto">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6 h-full flex flex-col"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
                            {/* Title Field */}
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem className="md:col-span-2">
                                        <FormLabel className="text-gray-700 font-medium">Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter job title"
                                                className="bg-gray-50 text-gray-800 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 placeholder-gray-400 py-2 px-4 rounded-lg w-full transition-all"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-sm" />
                                    </FormItem>
                                )}
                            />

                            {/* Description Field */}
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem className="md:col-span-2">
                                        <FormLabel className="text-gray-700 font-medium">Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter job description"
                                                className="min-h-[120px] resize-none bg-gray-50 text-gray-800 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 placeholder-gray-400 py-2 px-4 rounded-lg w-full transition-all"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-sm" />
                                    </FormItem>
                                )}
                            />

                            {/* Minimum Price Field */}
                            <FormField
                                control={form.control}
                                name="minPrice"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 font-medium">Minimum Price (PKR)</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                                    PKR
                                                </span>
                                                <Input
                                                    type="number"
                                                    placeholder="100"
                                                    className="pl-12 bg-gray-50 text-gray-800 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 placeholder-gray-400 py-2 px-4 rounded-lg w-full transition-all"
                                                    {...field}
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-sm" />
                                    </FormItem>
                                )}
                            />

                            {/* Maximum Price Field */}
                            <FormField
                                control={form.control}
                                name="maxPrice"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 font-medium">Maximum Price (PKR)</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                                    PKR
                                                </span>
                                                <Input
                                                    type="number"
                                                    placeholder="1000"
                                                    className="pl-12 bg-gray-50 text-gray-800 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 placeholder-gray-400 py-2 px-4 rounded-lg w-full transition-all"
                                                    {...field}
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-sm" />
                                    </FormItem>
                                )}
                            />

                            {/* Location Field */}
                            <FormField
                                control={form.control}
                                name="location.address"
                                render={({ field }) => (
                                    <FormItem className="md:col-span-2">
                                        <FormLabel className="text-gray-700 font-medium">Location</FormLabel>
                                        <FormControl>
                                            <div className="space-y-4">
                                                <Input
                                                    placeholder="No location selected"
                                                    readOnly
                                                    {...field}
                                                    value={selectedLocation?.address || ""}
                                                    className="bg-gray-50 text-gray-800 border border-gray-300 placeholder-gray-400 py-2 px-4 rounded-lg w-full"
                                                />
                                                <div className="h-96 w-full rounded-lg overflow-hidden border border-gray-300 shadow-sm">
                                                    <GoogleMap
                                                        zoom={10}
                                                        center={
                                                            selectedLocation?.lat !== null && selectedLocation?.lng !== null
                                                                ? {
                                                                    lat: selectedLocation?.lat ?? defaultCenter.lat,
                                                                    lng: selectedLocation?.lng ?? defaultCenter.lng
                                                                }
                                                                : defaultCenter
                                                        }
                                                        onClick={onMapClick}
                                                        mapContainerClassName="w-full h-full"
                                                        options={{
                                                            streetViewControl: false,
                                                            mapTypeControl: false,
                                                            fullscreenControl: false,
                                                        }}
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
                                                <p className="text-sm text-gray-500">
                                                    Click on the map to select your location
                                                </p>
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-sm" />
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
                        </div>

                        <div className="pt-4">
                            <Button
                                type="submit"
                                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors shadow-sm"
                            >
                                Create Job
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
        </div>
    );
}