"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
// import { useToast } from "@/components/ui/use-toast";

interface ProposalProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

export function ProposalModal({ isOpen, setIsOpen }: ProposalProps) {
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  //   const [isOpen, setIsOpen] = useState(false);
  //   const { toast } = useToast();

  const handleGenerateAIProposal = async () => {
    try {
      setIsGeneratingAI(true);
      // Simulate AI API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In a real app, you would call your AI API here
      // const response = await fetch("/api/generate-proposal", {
      //   method: "POST",
      //   body: JSON.stringify({ price, description })
      // });
      // const data = await response.json();

      // Mock AI enhancement
      setDescription(
        (prev) =>
          `After careful consideration of your project requirements, I'm pleased to offer the following proposal:\n\n${prev}\n\nFor the price of $${price}, this includes all the services mentioned above plus 30 days of post-delivery support.`
      );

      //       toast({
      //         title: "AI Enhancement Complete",
      //         description: "Your proposal has been enhanced with professional language.",
      //       });
    } catch (error) {
      //       toast({
      //         title: "Error",
      //         description: "Failed to generate AI proposal",
      //         variant: "destructive",
      //       });
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleSubmit = () => {
    // toast({
    //   title: "Proposal Submitted",
    //   description: "Your proposal has been sent to the customer.",
    // });
    setIsOpen(false);
    setPrice("");
    setDescription("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px] bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle>Create Work Proposal</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price ($)
            </Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="col-span-3"
              placeholder="Enter your price"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3 h-48"
              placeholder="Describe the work you'll perform..."
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            onClick={handleGenerateAIProposal}
            disabled={!price || !description || isGeneratingAI}
            variant="secondary"
          >
            {isGeneratingAI ? "Generating..." : "Enhance with AI"}
          </Button>
          <Button onClick={handleSubmit} disabled={!price || !description}>
            Submit Proposal
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
