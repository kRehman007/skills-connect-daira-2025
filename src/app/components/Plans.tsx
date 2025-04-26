"use client"
import { Check, Star, Percent, Infinity } from "lucide-react"

export default function PricingSection() {
  const plans = [
    {
      name: "Basic",
      price: "$0",
      period: "Free",
      features: [
        "25 job requests per month",
        "Browse unlimited professionals",
        "Direct client-worker chat",
        "5% platform fee",
        "Standard search visibility",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$19",
      period: "per month",
      features: [
        "Unlimited job requests",
        "Only 2% platform fee",
        "AI-enhanced proposals",
      ],
      cta: "Upgrade to Pro",
      popular: true,
      highlights: [
        { icon: <Infinity className="h-4 w-4" />, text: "Unlimited requests" },
        { icon: <Star className="h-4 w-4" />, text: "Top visibility" },
        { icon: <Percent className="h-4 w-4" />, text: "Save 3% per job" },
      ],
    },
  ]

  return (
    <section className="py-20 bg-white" id="pricing">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
            Flexible Pricing for Every Need
          </h2>
          <p className="mt-3 text-base text-gray-600">
            Choose your plan with transparent pricing and savings on job fees.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative transition-all duration-300 hover:translate-y-[-4px] ${
                plan.popular ? "mt-[-8px] mb-[8px] md:mt-[-16px] md:mb-[16px]" : ""
              }`}
            >
              <div
                className={`h-full rounded-xl p-6 flex flex-col ${
                  plan.popular
                    ? "border-2 border-blue-500 shadow-lg bg-white"
                    : "border border-gray-200 shadow bg-gray-50/50"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-0 right-0 mx-auto w-fit px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                    Most Popular
                  </div>
                )}

                <div className="mb-5">
                  <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                  <div className="mt-3 flex items-baseline">
                    <span className="text-3xl font-extrabold text-gray-900">{plan.price}</span>
                    <span className="ml-1 text-base font-medium text-gray-500">{plan.period}</span>
                  </div>
                </div>

                {plan.highlights && (
                  <div className="grid grid-cols-1 gap-2 mb-5">
                    {plan.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-center p-2.5 bg-blue-50 rounded-lg">
                        <div className="flex-shrink-0 text-blue-600">{highlight.icon}</div>
                        <p className="ml-2 text-sm font-medium text-blue-800">{highlight.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                <ul className="space-y-3 mb-5 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check className={`h-4 w-4 ${plan.popular ? "text-blue-600" : "text-gray-600"}`} />
                      </div>
                      <p className="ml-2 text-sm text-gray-600">{feature}</p>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-2.5 px-4 rounded-lg font-medium transition-colors text-sm ${
                    plan.popular
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-white border border-gray-300 text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center max-w-3xl mx-auto">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-base font-semibold mb-1">How job charges work</h3>
            <p className="text-sm text-gray-600">
              Basic users pay 5% platform fee, Pro subscribers pay only 2% - saving money on every job.
            </p>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            Need a custom plan?{" "}
            <a href="#contact" className="text-blue-600 font-medium hover:underline">
              Contact us
            </a>{" "}
            for enterprise pricing.
          </p>
        </div>
      </div>
    </section>
  )
}