import Image from "next/image";
import Hero from "@/components/ui/Hero";
import Plans from "@/components/ui/Plans";
import WhySkillConnect from "@/components/ui/WhySkillConnect";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";

export default function Home() {
  return (
    <div >
      <Header/>
      <Hero/>
      <Plans/>
      <WhySkillConnect/>
      <Footer/>

      
    </div>

  );
}
