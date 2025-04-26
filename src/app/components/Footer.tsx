"use client"

import { Mail, MapPin, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-blue-50 py-10 mt-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Us</h3>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-center">
                <MapPin className="h-5 w-5 text-blue-600 mr-3" />
                123 SkillsConnect Avenue, Karachi, Pakistan
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-blue-600 mr-3" />
                +92 300 1234567
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-blue-600 mr-3" />
                support@skillsconnect.com
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="hover:text-blue-600 transition">Home</li>
              <li className="hover:text-blue-600 transition">About Us</li>
              <li className="hover:text-blue-600 transition">Services</li>
              <li className="hover:text-blue-600 transition">Contact</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Stay Connected</h3>
            <p className="text-gray-600 mb-4">Subscribe to get the latest updates and offers.</p>
            <form className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="text-center text-gray-500 text-sm mt-10">
          © {new Date().getFullYear()} SkillsConnect. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
