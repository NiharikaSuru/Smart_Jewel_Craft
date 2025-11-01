import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { sustainabilityInfo, educationalContent } from '../data/sustainability';
import { jewelryItems } from '../data/jewelry';
import JewelryCard from '../components/JewelryCard';
import { 
  HeartIcon as LeafIcon,
  ShieldCheckIcon,
  SparklesIcon,
  BookOpenIcon,
  ClockIcon,
  CheckBadgeIcon,
  TruckIcon
} from '@heroicons/react/24/outline';

const SustainabilityPage = () => {
  const { setCurrentPage } = useApp();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedEducation, setSelectedEducation] = useState(null);

  const sustainableItems = jewelryItems.filter(item => 
    item.sustainability?.recycledMetal || item.sustainability?.ethicalStones
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LeafIcon },
    { id: 'certifications', label: 'Certifications', icon: CheckBadgeIcon },
    { id: 'materials', label: 'Materials', icon: SparklesIcon },
    { id: 'education', label: 'Education', icon: BookOpenIcon },
    { id: 'products', label: 'Sustainable Products', icon: ShieldCheckIcon }
  ];

  const EducationModal = () => {
    if (!selectedEducation) return null;

    return (
      <div className="modal-overlay" onClick={() => setSelectedEducation(null)}>
        <div className="modal-content max-w-4xl w-full m-4" onClick={(e) => e.stopPropagation()}>
          <div className="bg-white rounded-lg overflow-hidden">
            <div className="relative h-64">
              <img
                src={selectedEducation.image || '/images/education-placeholder.jpg'}
                alt={selectedEducation.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              <div className="absolute bottom-4 left-6 text-white">
                <h2 className="text-3xl font-bold font-playfair mb-2">
                  {selectedEducation.title}
                </h2>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="flex items-center">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    {selectedEducation.readTime}
                  </span>
                  <span className="px-2 py-1 bg-amber-500 rounded-full text-xs font-medium">
                    {selectedEducation.category}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedEducation(null)}
                className="absolute top-4 right-4 text-white hover:text-gray-300"
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>
            
            <div className="p-8">
              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {selectedEducation.content}
                </p>
                
                {/* Sample content based on education type */}
                {selectedEducation.category === 'sustainability' && (
                  <div className="mt-8 space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900">
                      Environmental Impact of Jewelry Production
                    </h3>
                    <p className="text-gray-700">
                      The jewelry industry has significant environmental implications, from mining 
                      practices to manufacturing processes. Traditional gold mining, for example, 
                      can require up to 20 tons of ore to produce a single gold ring.
                    </p>
                    
                    <h3 className="text-xl font-semibold text-gray-900">
                      Making Sustainable Choices
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li>Choose recycled metals when possible</li>
                      <li>Look for conflict-free and ethically sourced gemstones</li>
                      <li>Support brands with transparent supply chains</li>
                      <li>Consider vintage or pre-owned jewelry</li>
                      <li>Invest in quality pieces that will last a lifetime</li>
                    </ul>
                  </div>
                )}

                {selectedEducation.category === 'materials' && (
                  <div className="mt-8 space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900">
                      Understanding Metal Sources
                    </h3>
                    <p className="text-gray-700">
                      Recycled metals retain the same quality and beauty as newly mined metals 
                      while significantly reducing environmental impact. The recycling process 
                      uses up to 95% less energy than mining new metal.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-900 mb-2">Recycled Metals</h4>
                        <ul className="text-sm text-green-800 space-y-1">
                          <li>• 95% less energy consumption</li>
                          <li>• No new mining required</li>
                          <li>• Same quality as new metals</li>
                          <li>• Reduces waste streams</li>
                        </ul>
                      </div>
                      
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-2">Responsibly Mined</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Fair labor practices</li>
                          <li>• Environmental restoration</li>
                          <li>• Community development</li>
                          <li>• Transparent supply chain</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold font-playfair text-gray-900 mb-4">
            Sustainable & Ethical Jewelry
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover beautiful jewelry that's responsibly sourced and ethically made
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center space-x-2 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  selectedTab === tab.id
                    ? 'border-amber-500 text-amber-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {selectedTab === 'overview' && (
          <div className="space-y-12">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-xl p-8 md:p-12 text-white">
              <div className="max-w-3xl">
                <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4">
                  Jewelry with Purpose
                </h2>
                <p className="text-xl mb-6 opacity-90">
                  Every piece tells a story of responsibility, from ethically sourced materials 
                  to fair labor practices and environmental stewardship.
                </p>
                <button
                  onClick={() => setSelectedTab('products')}
                  className="btn bg-white text-green-600 hover:bg-gray-100 btn-lg"
                >
                  Shop Sustainable Jewelry
                </button>
              </div>
            </div>

            {/* Impact Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { number: '95%', label: 'Less Energy', desc: 'Using recycled metals' },
                { number: '100%', label: 'Conflict-Free', desc: 'Diamond sourcing' },
                { number: '50+', label: 'Certified', desc: 'Sustainable sellers' },
                { number: '1M+', label: 'Trees Protected', desc: 'Through partnerships' }
              ].map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                  <div className="text-3xl font-bold text-amber-600 mb-2">{stat.number}</div>
                  <div className="font-semibold text-gray-900 mb-1">{stat.label}</div>
                  <div className="text-sm text-gray-600">{stat.desc}</div>
                </div>
              ))}
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <LeafIcon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Eco-Friendly Materials
                </h3>
                <p className="text-gray-600">
                  Recycled metals and responsibly sourced gemstones that minimize environmental impact
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheckIcon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Ethical Sourcing
                </h3>
                <p className="text-gray-600">
                  Fair labor practices and transparent supply chains supporting communities worldwide
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckBadgeIcon className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Certified Quality
                </h3>
                <p className="text-gray-600">
                  Third-party certifications ensuring the highest standards of sustainability and ethics
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Certifications Tab */}
        {selectedTab === 'certifications' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Trusted Certifications
              </h2>
              <p className="text-lg text-gray-600">
                Our sustainability partners and certification bodies
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {sustainabilityInfo.certifications.map((cert) => (
                <div key={cert.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <img
                        src={cert.logo || '/images/cert-placeholder.png'}
                        alt={cert.name}
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {cert.name}
                      </h3>
                      <p className="text-gray-600">
                        {cert.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">
                Why Certifications Matter
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
                <div className="flex items-start">
                  <CheckBadgeIcon className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Independent verification of sustainability claims</span>
                </div>
                <div className="flex items-start">
                  <CheckBadgeIcon className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Transparency in supply chain practices</span>
                </div>
                <div className="flex items-start">
                  <CheckBadgeIcon className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Continuous monitoring and improvement</span>
                </div>
                <div className="flex items-start">
                  <CheckBadgeIcon className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Consumer confidence and trust</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Materials Tab */}
        {selectedTab === 'materials' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Sustainable Materials
              </h2>
              <p className="text-lg text-gray-600">
                Understanding the impact of different material choices
              </p>
            </div>

            {/* Metal Sourcing */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {sustainabilityInfo.metalSourcing.recycled.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {sustainabilityInfo.metalSourcing.recycled.description}
                </p>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Benefits:</h4>
                  <ul className="space-y-2">
                    {sustainabilityInfo.metalSourcing.recycled.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-600">
                        <LeafIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    Available in: {sustainabilityInfo.metalSourcing.recycled.availability.join(', ')}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {sustainabilityInfo.metalSourcing.newlyMined.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {sustainabilityInfo.metalSourcing.newlyMined.description}
                </p>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Benefits:</h4>
                  <ul className="space-y-2">
                    {sustainabilityInfo.metalSourcing.newlyMined.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-600">
                        <ShieldCheckIcon className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    Certifications: {sustainabilityInfo.metalSourcing.newlyMined.certifications.join(', ')}
                  </p>
                </div>
              </div>
            </div>

            {/* Gemstone Ethics */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Ethical Gemstone Sourcing
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(sustainabilityInfo.gemstoneEthics).map(([key, info]) => (
                  <div key={key} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">{info.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">{info.description}</p>
                    
                    {info.verification && (
                      <div className="text-xs text-gray-500">
                        <span className="font-medium">Verification:</span> {info.verification}
                      </div>
                    )}
                    
                    {info.benefits && (
                      <div className="mt-2">
                        <div className="text-xs font-medium text-gray-700 mb-1">Benefits:</div>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {info.benefits.map((benefit, index) => (
                            <li key={index}>• {benefit}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {info.standards && (
                      <div className="mt-2">
                        <div className="text-xs font-medium text-gray-700 mb-1">Standards:</div>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {info.standards.map((standard, index) => (
                            <li key={index}>• {standard}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Education Tab */}
        {selectedTab === 'education' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Educational Resources
              </h2>
              <p className="text-lg text-gray-600">
                Learn about sustainable jewelry practices and make informed choices
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {educationalContent.map((content) => (
                <div
                  key={content.id}
                  onClick={() => setSelectedEducation(content)}
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 group"
                >
                  <div className="relative h-48">
                    <img
                      src={content.image || '/images/education-placeholder.jpg'}
                      alt={content.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-amber-500 text-white text-xs font-medium rounded-full">
                        {content.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors duration-200">
                      {content.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {content.content}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        {content.readTime}
                      </div>
                      <button className="text-amber-600 hover:text-amber-700 font-medium text-sm">
                        Read More →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sustainable Products Tab */}
        {selectedTab === 'products' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Sustainable Jewelry Collection
                </h2>
                <p className="text-lg text-gray-600">
                  {sustainableItems.length} pieces featuring recycled metals and ethical gemstones
                </p>
              </div>
              <button
                onClick={() => setCurrentPage('marketplace')}
                className="btn btn-outline flex items-center space-x-2"
              >
                <span>View All</span>
                <TruckIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Sustainability Filters
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                  <input type="checkbox" id="recycled-metal" className="text-amber-500" />
                  <label htmlFor="recycled-metal" className="text-gray-700">
                    Recycled Metals
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <input type="checkbox" id="ethical-stones" className="text-amber-500" />
                  <label htmlFor="ethical-stones" className="text-gray-700">
                    Ethical Gemstones
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <input type="checkbox" id="carbon-neutral" className="text-amber-500" />
                  <label htmlFor="carbon-neutral" className="text-gray-700">
                    Carbon Neutral
                  </label>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sustainableItems.map((item) => (
                <JewelryCard key={item.id} item={item} />
              ))}
            </div>

            {/* CTA */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-green-900 mb-2">
                Make a Difference with Every Purchase
              </h3>
              <p className="text-green-800 mb-4">
                Choose sustainable jewelry and support responsible practices in the industry
              </p>
              <button
                onClick={() => setCurrentPage('marketplace')}
                className="btn bg-green-600 text-white hover:bg-green-700"
              >
                Shop Sustainable Collection
              </button>
            </div>
          </div>
        )}
      </div>

      <EducationModal />
    </div>
  );
};

export default SustainabilityPage;