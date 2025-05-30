"use client";
import { Button } from "@/app/components/ui/button";
import { MapPin } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import Link from "next/link";
import { deleteJob } from "@/server/actions/job";
import toast from "react-hot-toast";
import {
  getProposalById,
  getProposalsForJob,
} from "@/server/functions/proposal";
interface ProjectCard {
  id: string;
  title: string;
  description: string;
  priceRange: string;
  location: string;
}

export default function ProjectCardsPage() {
  // Sample data - replace with your actual data source

  async function DeletedPostedJob(id: string) {
    try {
      await deleteJob(id);
      toast.success("Job Deleted Successfully");
    } catch (error) {
      console.log("error in deleting job", error);
      toast.error("Ooops...something went wrong");
    }
  }

  const projects: ProjectCard[] = [
    {
      id: "1",
      title: "Website Redesign",
      description:
        "Complete overhaul of company website with modern design principles and improved UX.",
      priceRange: "$1,000 - $5,000",
      location: "Remote",
    },
    {
      id: "2",
      title: "Mobile App Development",
      description:
        "Create a cross-platform mobile application for inventory management.",
      priceRange: "$5,000 - $10,000",
      location: "New York, NY",
    },
    {
      id: "3",
      title: "Brand Identity Package",
      description:
        "Design a complete brand identity including logo, color palette, and style guide.",
      priceRange: "$2,000 - $4,000",
      location: "Los Angeles, CA",
    },
    {
      id: "4",
      title: "E-commerce Integration",
      description:
        "Add e-commerce functionality to existing website with payment processing.",
      priceRange: "$3,000 - $7,000",
      location: "Chicago, IL",
    },
    {
      id: "5",
      title: "Content Marketing Strategy",
      description:
        "Develop a comprehensive content strategy to increase engagement and conversions.",
      priceRange: "$1,500 - $3,500",
      location: "Remote",
    },
    {
      id: "6",
      title: "SEO Optimization",
      description:
        "Improve search engine rankings through technical SEO and content optimization.",
      priceRange: "$1,000 - $2,500",
      location: "Austin, TX",
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Available Projects
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="flex flex-col h-full">
            <CardHeader>
              <CardTitle className="text-xl">{project.title}</CardTitle>
              <CardDescription className="flex items-center text-sm mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                {project.location}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground mb-4">
                {project.description}
              </p>
              <div className="bg-muted inline-block px-3 py-1 rounded-full text-sm font-medium">
                {project.priceRange}
              </div>
              <div className="flex gap-2">
                <Button onClick={() => DeletedPostedJob(String(project.id))}>
                  Delete
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end pt-4">
              <Link href={`/jobs/${project.id}/proposals`}>
                <Button
                  variant="default"
                  className="bg-blue-700 text-white"
                  size="sm"
                >
                  View all proposals
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
