import React from 'react';
import { WordRotate } from "@/app/components/magicui/word-rotate";
import { RetroGrid } from "@/app/components/magicui/retro-grid";

function Hero() {
  return (
    <div className="relative h-[80vh] flex flex-col justify-center items-center text-center overflow-hidden">

      {/* Background RetroGrid */}
      <RetroGrid className="absolute inset-0 z-0" />

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center gap-5 font-bold px-4">
        <h2 className="text-2xl md:text-3xl">SkillsConnect:</h2>
        <div className="text-xl md:text-2xl">
          Bridging Local Clients with <span className="text-blue-700">
            <WordRotate words={["Professionals", "Technicians", "Specialists", "Contractors"]} />
          </span> seamlessly
        </div>
        <p className="font-semibold max-w-md">
          Find trusted local services — Anytime, Anywhere.
        </p>

        <button className="bg-blue-700 text-white px-8 py-2 rounded-md hover:bg-blue-800 transition duration-300 ease-in-out">
          Get Started
        </button>
      </div>

    </div>
  );
}

export default Hero;
