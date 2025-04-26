import Image from "next/image";
import Hero from "@/components/ui/Hero";
import Plans from "@/components/ui/Plans";
import WhySkillConnect from "@/components/ui/WhySkillConnect";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <div >
      <Hero/>
      <Plans/>
      <WhySkillConnect/>
      <Footer/>

      
    </div>

  );
}
