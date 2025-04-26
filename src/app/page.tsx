import Image from "next/image";
import Hero from "@/app/components/Hero";
import Plans from "@/app/components/Plans";
import WhySkillConnect from "@/app/components/WhySkillConnect";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";

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
