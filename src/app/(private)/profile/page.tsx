"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Button } from "@/app/components/ui/button";
import { Edit, Camera } from "lucide-react";

export default function ProfilePage({ isWorker = true }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const methods = useForm({
    defaultValues: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      contact: "+1234567890",
      skills: "JavaScript, React, Node.js",
      image: "",
    },
  });

  const { register, handleSubmit, watch, setValue } = methods;
  const currentImage = watch("image");
  const currentSkills = watch("skills");

  const onSubmit = (data: any) => {
    console.log("Profile updated:", data);
    setShowEditModal(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue("image", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="max-w-6xl mx-auto p-6">
        {/* Main Profile Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Side - Profile Image */}
            <div className="flex flex-col items-center md:items-start md:w-1/3">
              <div className="relative group">
                <div className="w-48 h-48 rounded-full border-4 border-white shadow-lg overflow-hidden">
                  {currentImage ? (
                    <img src={currentImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                      <span className="text-5xl font-bold text-gray-400">
                        {watch("firstName")[0]}{watch("lastName")[0]}
                      </span>
                    </div>
                  )}
                </div>
                <label className="absolute bottom-4 right-4 p-2 bg-white rounded-full shadow-md cursor-pointer hover:bg-gray-100 transition-colors">
                  <Camera className="w-5 h-5 text-gray-600" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Right Side - Profile Info */}
            <div className="flex-1 space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-gray-800">
                  {watch("firstName")} {watch("lastName")}
                </h1>
                <p className="text-gray-500">{watch("email")}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Contact</h3>
                  <p className="text-lg text-gray-800">{watch("contact")}</p>
                </div>

                {isWorker && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Skills</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {currentSkills.split(",").map((skill: string, index: number) => (
                        <span 
                          key={index} 
                          className="px-3 py-1 text-sm rounded-full bg-blue-50 text-blue-700 border border-blue-100"
                        >
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4">
                <Button 
                  className="gap-2 bg-blue-600 hover:bg-blue-700 text-white" 
                  onClick={() => setShowEditModal(true)}
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Profile Modal */}
        {showEditModal && (
          <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Edit Profile</h2>
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <Input {...register("firstName")} />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <Input {...register("lastName")} />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Contact</label>
                    <Input {...register("contact")} />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <Input {...register("email")} disabled />
                  </div>

                  {isWorker && (
                    <div className="md:col-span-2 space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Skills (comma separated)
                      </label>
                      <Textarea 
                        {...register("skills")} 
                        placeholder="e.g. JavaScript, React, Node.js"
                        className="min-h-[100px]"
                      />
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button 
                    variant="outline" 
                    type="button"
                    onClick={() => setShowEditModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </FormProvider>
  );
}