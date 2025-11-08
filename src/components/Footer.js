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
    <footer className="bg-white border-t border-gray-100">
      {/* Trust Features */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {trustFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <feature.icon className="h-6 w-6 text-gray-400 mx-auto mb-3" />
                <h3 className="text-sm font-medium text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-start">
              <SparklesIcon className="h-6 w-6 text-amber-500 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">Smart Jewel Craft</h2>
            </div>
            <p className="text-sm text-gray-500 mb-2 leading-relaxed">
              Discover your perfect jewelry with our personalized style assistant, 
              expert reviews, and sustainable marketplace.
            </p>
            <div className="space-y-1 text-sm text-gray-500">
              <div className="flex items-center space-x-3">
                <MapPinIcon className="h-4 w-4 text-gray-400" />
                <span>123 Jewelry District, NY 10001</span>
              </div>
              <div className="flex items-center space-x-3">
                <PhoneIcon className="h-4 w-4 text-gray-400" />
                <span>1-800-JEWELRY</span>
              </div>
              <div className="flex items-center space-x-3">
                <EnvelopeIcon className="h-4 w-4 text-gray-400" />
                <span>hello@smartjewelcraft.com</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-sm font-medium text-gray-900 mb-2">{section.title}</h3>
              <ul className="space-y-1">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-100 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-500">&copy; {currentYear} Smart Jewel Craft. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;