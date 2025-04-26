"use client"

import { useEffect, useRef, useState } from "react"
import { Clock, CreditCard, Shield, Users } from "lucide-react"
import Image from "next/image"

export default function WhySkillsConnect() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const features = [
    {
      icon: <Users className="h-6 w-6 text-blue-600" />,
      title: "Vetted Local Professionals",
      description:
        "Every professional on our platform is thoroughly vetted and background-checked for your peace of mind.",
    },
    {
      icon: <Clock className="h-6 w-6 text-blue-600" />,
      title: "Quick and Easy Booking",
      description: "Book services in under 2 minutes with our streamlined, user-friendly interface.",
    },
    {
      icon: <CreditCard className="h-6 w-6 text-blue-600" />,
      title: "Secure Payments",
      description: "Your transactions are protected with bank-level security and encryption.",
    },
    {
      icon: <Shield className="h-6 w-6 text-blue-600" />,
      title: "Real-time Negotiation",
      description: "Communicate and negotiate directly with professionals to get the best value and service.",
    },
  ]


  return (
    <section className="py-16" id="why-us" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="space-y-8">
            <div
              className={`transform transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
            >
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900">
                Why Choose <span className="text-blue-600">SkillsConnect</span>?
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                We're revolutionizing how you connect with local service professionals, making it simpler, safer, and
                more efficient.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`flex flex-col p-5 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-500 transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="p-2 bg-blue-50 rounded-full w-fit mb-4">{feature.icon}</div>
                  <h3 className="font-semibold text-lg text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>


          {/* Right side - Image instead of Video */}
          <div
            className={`relative h-[500px] rounded-2xl overflow-hidden shadow-xl transition-all duration-1000 transform ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
              }`}
            style={{ transitionDelay: "200ms" }}
          >
            <Image
              src="/workers.jpg" // or .png or .webp depending on your actual file
              alt="Workers Image"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
              priority // optional: loads faster
            />

            {/* Overlay banner */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-blue-400 p-6 text-white">
              <p className="text-xl font-semibold">Connecting You with Talent — Made Simple</p>
              <p className="text-sm mt-1 opacity-90">Join thousands of satisfied customers today</p>
            </div>
          </div>


        </div>
      </div>
    </section>
  )
}
