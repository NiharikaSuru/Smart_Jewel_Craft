import React from 'react';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon,
  ShieldCheckIcon,
  TruckIcon,
  CreditCardIcon
} from '@heroicons/react/24/solid';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'About Smart Jewel Craft',
      links: [
        { name: 'Our Story', href: '#' },
        { name: 'Expert Team', href: '#' },
        { name: 'Sustainability', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Press', href: '#' }
      ]
    },
    {
      title: 'Customer Service',
      links: [
        { name: 'Contact Us', href: '#' },
        { name: 'Size Guide', href: '#' },
        { name: 'Care Instructions', href: '#' },
        { name: 'Shipping Info', href: '#' },
        { name: 'Returns & Exchanges', href: '#' }
      ]
    },
    {
      title: 'Services',
      links: [
        { name: 'Expert Reviews', href: '#' },
        { name: 'Style Assistant', href: '#' },
        { name: 'Custom Design', href: '#' },
        { name: 'Appraisals', href: '#' },
        { name: 'Repairs', href: '#' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms of Service', href: '#' },
        { name: 'Cookie Policy', href: '#' },
        { name: 'Accessibility', href: '#' },
        { name: 'Compliance', href: '#' }
      ]
    }
  ];

  const trustFeatures = [
    {
      icon: ShieldCheckIcon,
      title: 'Secure Shopping',
      description: 'SSL encrypted transactions'
    },
    {
      icon: TruckIcon,
      title: 'Free Shipping',
      description: 'On orders over $500'
    },
    {
      icon: CreditCardIcon,
      title: 'Easy Returns',
      description: '30-day return policy'
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Trust Features */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trustFeatures.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <feature.icon className="h-8 w-8 text-amber-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <SparklesIcon className="h-8 w-8 text-amber-500 mr-2" />
              <h2 className="text-xl font-bold font-playfair">Smart Jewel Craft</h2>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Discover your perfect jewelry with our personalized style assistant, 
              expert reviews, and sustainable marketplace.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <MapPinIcon className="h-4 w-4" />
                <span>123 Jewelry District, NY 10001</span>
              </div>
              <div className="flex items-center space-x-2">
                <PhoneIcon className="h-4 w-4" />
                <span>1-800-JEWELRY</span>
              </div>
              <div className="flex items-center space-x-2">
                <EnvelopeIcon className="h-4 w-4" />
                <span>hello@smartjewelcraft.com</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
              <p className="text-gray-400 text-sm">
                Get the latest jewelry trends and exclusive offers
              </p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white placeholder-gray-400"
              />
              <button className="px-6 py-2 bg-amber-500 text-white rounded-r-lg hover:bg-amber-600 transition-colors duration-200 font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Social Media & Certifications */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Instagram
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Pinterest
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Twitter
              </a>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>Certified by:</span>
              <span className="text-white">RJC</span>
              <span className="text-white">GIA</span>
              <span className="text-white">Fair Trade</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} Smart Jewel Craft. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;