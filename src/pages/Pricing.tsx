import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "0",
      features: [
        "Generate up to 5 forms/month",
        "Basic form templates",
        "Email support",
        "Basic analytics",
      ],
      cta: "Get Started",
      highlighted: false,
    },
    {
      name: "Pro",
      price: "29",
      features: [
        "Generate up to 50 forms/month",
        "Advanced form templates",
        "Priority support",
        "Advanced analytics",
        "Custom branding",
        "Export responses",
      ],
      cta: "Start Free Trial",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "99",
      features: [
        "Unlimited form generation",
        "Custom AI training",
        "24/7 Priority support",
        "Advanced security features",
        "API access",
        "Custom integration",
        "Dedicated account manager",
      ],
      cta: "Contact Sales",
      highlighted: false,
    },
  ];

  return (
    <div className="bg-gradient-to-b from-white via-blue-50 to-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="text-center py-20 px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900">
          Simple, Transparent Pricing
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          Choose the plan that fits your needs and scale effortlessly.
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-7xl mx-auto px-6 md:grid md:grid-cols-3 gap-8 pb-24">
        {plans.map((plan) => (
          <motion.div
            key={plan.name}
            whileHover={{ scale: 1.05 }}
            className={`relative rounded-3xl p-8 shadow-xl border border-gray-200 ${
              plan.highlighted
                ? "bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white shadow-2xl"
                : "bg-white"
            }`}
          >
            {plan.highlighted && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                Most Popular
              </div>
            )}

            <h3
              className={`text-2xl font-bold text-center ${
                plan.highlighted ? "text-white" : "text-gray-900"
              }`}
            >
              {plan.name}
            </h3>

            <div className="mt-4 flex justify-center items-baseline">
              <span
                className={`text-5xl font-extrabold ${
                  plan.highlighted ? "text-white" : "text-gray-900"
                }`}
              >
                ${plan.price}
              </span>
              <span
                className={`ml-1 text-xl font-semibold ${
                  plan.highlighted ? "text-blue-200" : "text-gray-500"
                }`}
              >
                /month
              </span>
            </div>

            <ul className="mt-8 space-y-4">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <Check
                    className={`w-5 h-5 flex-shrink-0 ${
                      plan.highlighted ? "text-amber-300" : "text-green-500"
                    }`}
                  />
                  <span
                    className={`ml-3 text-base ${
                      plan.highlighted ? "text-blue-100" : "text-gray-700"
                    }`}
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <button
              className={`mt-8 w-full py-3 rounded-xl font-medium text-lg transition-all ${
                plan.highlighted
                  ? "bg-white text-indigo-700 hover:bg-gray-100"
                  : "bg-blue-50 text-blue-700 hover:bg-blue-100"
              }`}
            >
              {plan.cta}
            </button>
          </motion.div>
        ))}
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-10 text-left">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Can I change plans later?
              </h3>
              <p className="mt-2 text-gray-600">
                Yes, you can upgrade or downgrade your plan anytime. Changes are reflected in your next billing cycle.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                What payment methods do you accept?
              </h3>
              <p className="mt-2 text-gray-600">
                We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
