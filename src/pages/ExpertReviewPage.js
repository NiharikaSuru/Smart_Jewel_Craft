import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { expertReviewData, experts } from '../data/expertReview';
import { 
  CloudArrowUpIcon,
  DocumentTextIcon,
  CameraIcon,
  CheckCircleIcon,
  ClockIcon,
  CurrencyDollarIcon,
  StarIcon,
  ChatBubbleLeftRightIcon,
  VideoCameraIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const ExpertReviewPage = () => {
  const { addNotification } = useApp();
  const [selectedAnalysisType, setSelectedAnalysisType] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);
  const [formData, setFormData] = useState({
    jewelryType: '',
    description: '',
    estimatedAge: '',
    purchasePrice: '',
    contactEmail: '',
    contactPhone: ''
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [dragOver, setDragOver] = useState(false);

  const handleImageUpload = (files) => {
    const newImages = Array.from(files).map(file => ({
      id: Date.now() + Math.random(),
      file,
      url: URL.createObjectURL(file),
      name: file.name
    }));
    setUploadedImages(prev => [...prev, ...newImages]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );
    if (files.length > 0) {
      handleImageUpload(files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const removeImage = (imageId) => {
    setUploadedImages(prev => prev.filter(img => img.id !== imageId));
  };

  const handleSubmit = () => {
    if (!selectedAnalysisType || uploadedImages.length === 0) {
      alert('Please select an analysis type and upload at least one image.');
      return;
    }

    addNotification({
      type: 'success',
      title: 'Review Request Submitted',
      message: `Your ${expertReviewData.analysisTypes.find(t => t.id === selectedAnalysisType)?.name} request has been submitted successfully.`
    });

    // Reset form
    setSelectedAnalysisType('');
    setUploadedImages([]);
    setFormData({
      jewelryType: '',
      description: '',
      estimatedAge: '',
      purchasePrice: '',
      contactEmail: '',
      contactPhone: ''
    });
    setCurrentStep(1);
  };

  const selectedAnalysis = expertReviewData.analysisTypes.find(
    type => type.id === selectedAnalysisType
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold font-playfair text-gray-900 mb-4">
            Expert Jewelry Analysis
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get professional evaluation and detailed reports from certified gemologists and jewelry experts
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-8">
            {[
              { step: 1, title: 'Choose Analysis', icon: DocumentTextIcon },
              { step: 2, title: 'Upload Images', icon: CameraIcon },
              { step: 3, title: 'Provide Details', icon: ClockIcon },
              { step: 4, title: 'Submit & Pay', icon: CurrencyDollarIcon }
            ].map(({ step, title, icon: Icon }) => (
              <div key={step} className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                  currentStep >= step
                    ? 'bg-amber-500 text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}>
                  {currentStep > step ? (
                    <CheckCircleIcon className="h-6 w-6" />
                  ) : (
                    <Icon className="h-6 w-6" />
                  )}
                </div>
                <span className={`text-sm font-medium ${
                  currentStep >= step ? 'text-amber-600' : 'text-gray-400'
                }`}>
                  {title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Analysis Type Selection */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Choose Your Analysis Type
                </h2>
                
                <div className="grid gap-6">
                  {expertReviewData.analysisTypes.map((analysis) => (
                    <div
                      key={analysis.id}
                      onClick={() => {
                        setSelectedAnalysisType(analysis.id);
                        setCurrentStep(2);
                      }}
                      className={`p-6 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedAnalysisType === analysis.id
                          ? 'border-amber-500 bg-amber-50'
                          : 'border-gray-200 hover:border-amber-300 bg-white'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {analysis.name}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                            <span className="flex items-center">
                              <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                              ${analysis.price}
                            </span>
                            <span className="flex items-center">
                              <ClockIcon className="h-4 w-4 mr-1" />
                              {analysis.deliveryTime}
                            </span>
                          </div>
                        </div>
                        <div className="text-3xl font-bold text-amber-600">
                          ${analysis.price}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Includes:</h4>
                        <ul className="space-y-1">
                          {analysis.includes.map((item, index) => (
                            <li key={index} className="flex items-start text-sm text-gray-600">
                              <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Image Upload */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Upload Jewelry Images
                  </h2>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="btn btn-outline btn-sm"
                  >
                    Back
                  </button>
                </div>

                {/* Upload Requirements */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-medium text-blue-900 mb-2">Image Requirements:</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• {expertReviewData.imageRequirements.quantity}</li>
                    {expertReviewData.imageRequirements.requirements.map((req, index) => (
                      <li key={index}>• {req}</li>
                    ))}
                  </ul>
                </div>

                {/* Upload Area */}
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`image-upload-area ${dragOver ? 'drag-over' : ''}`}
                >
                  <CloudArrowUpIcon className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Drop images here or click to browse
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Supports JPEG, PNG, HEIC up to 10MB per image
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files)}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="btn btn-primary">
                    Select Images
                  </label>
                </div>

                {/* Uploaded Images */}
                {uploadedImages.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Uploaded Images ({uploadedImages.length})
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {uploadedImages.map((image) => (
                        <div key={image.id} className="relative group">
                          <img
                            src={image.url}
                            alt={image.name}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => removeImage(image.id)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          >
                            ×
                          </button>
                          <div className="absolute bottom-2 left-2 right-2">
                            <p className="text-xs text-white bg-black bg-opacity-50 rounded px-2 py-1 truncate">
                              {image.name}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => setCurrentStep(3)}
                      disabled={uploadedImages.length === 0}
                      className="btn btn-primary mt-6"
                    >
                      Continue to Details
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Details Form */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Jewelry Details
                  </h2>
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="btn btn-outline btn-sm"
                  >
                    Back
                  </button>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-group">
                      <label className="form-label">Jewelry Type</label>
                      <select
                        value={formData.jewelryType}
                        onChange={(e) => setFormData(prev => ({ ...prev, jewelryType: e.target.value }))}
                        className="form-select"
                      >
                        <option value="">Select type</option>
                        <option value="ring">Ring</option>
                        <option value="necklace">Necklace</option>
                        <option value="earrings">Earrings</option>
                        <option value="bracelet">Bracelet</option>
                        <option value="watch">Watch</option>
                        <option value="brooch">Brooch</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Estimated Age</label>
                      <input
                        type="text"
                        value={formData.estimatedAge}
                        onChange={(e) => setFormData(prev => ({ ...prev, estimatedAge: e.target.value }))}
                        placeholder="e.g., 1950s, Modern, Unknown"
                        className="form-input"
                      />
                    </div>

                    <div className="form-group md:col-span-2">
                      <label className="form-label">Description</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Describe any known details about the jewelry..."
                        rows={4}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Purchase Price (Optional)</label>
                      <input
                        type="text"
                        value={formData.purchasePrice}
                        onChange={(e) => setFormData(prev => ({ ...prev, purchasePrice: e.target.value }))}
                        placeholder="$0.00"
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Contact Email</label>
                      <input
                        type="email"
                        value={formData.contactEmail}
                        onChange={(e) => setFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
                        placeholder="your@email.com"
                        className="form-input"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Phone Number (Optional)</label>
                      <input
                        type="tel"
                        value={formData.contactPhone}
                        onChange={(e) => setFormData(prev => ({ ...prev, contactPhone: e.target.value }))}
                        placeholder="(555) 123-4567"
                        className="form-input"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentStep(4)}
                    className="btn btn-primary mt-6"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Payment */}
            {currentStep === 4 && selectedAnalysis && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Review & Submit
                  </h2>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="btn btn-outline btn-sm"
                  >
                    Back
                  </button>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Order Summary
                  </h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span>Analysis Type:</span>
                      <span className="font-medium">{selectedAnalysis.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Images Uploaded:</span>
                      <span className="font-medium">{uploadedImages.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Time:</span>
                      <span className="font-medium">{selectedAnalysis.deliveryTime}</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between text-xl font-bold">
                        <span>Total:</span>
                        <span className="text-amber-600">${selectedAnalysis.price}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <h4 className="font-medium text-gray-900">Payment Method</h4>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="radio" name="payment" className="mr-3" defaultChecked />
                        <span>Credit/Debit Card</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="payment" className="mr-3" />
                        <span>PayPal</span>
                      </label>
                    </div>
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="btn btn-primary w-full btn-lg"
                  >
                    Submit Analysis Request
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Expert Team */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Our Expert Team
              </h3>
              <div className="space-y-4">
                {experts.slice(0, 2).map((expert) => (
                  <div key={expert.id} className="flex items-start space-x-3 border-b border-gray-200 not:last:border-b-0 pb-4">
                    {/* <img
                      src="/images/silver_bracelet.jpg"
                      alt={expert.name}
                      className="w-12 h-12 rounded-full shadow-md"
                    /> */}
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{expert.name}</h4>
                      <p className="text-sm text-gray-600">{expert.title}</p>
                      <div className="flex items-center mt-1">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(expert.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600 ml-1">
                          {expert.rating} ({expert.reviewCount})
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                What You Get
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <ShieldCheckIcon className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-700">Certified experts</span>
                </div>
                <div className="flex items-center space-x-3">
                  <DocumentTextIcon className="h-5 w-5 text-blue-500" />
                  <span className="text-sm text-gray-700">Detailed reports</span>
                </div>
                <div className="flex items-center space-x-3">
                  <ChatBubbleLeftRightIcon className="h-5 w-5 text-purple-500" />
                  <span className="text-sm text-gray-700">Follow-up support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <VideoCameraIcon className="h-5 w-5 text-red-500" />
                  <span className="text-sm text-gray-700">Video consultations</span>
                </div>
              </div>
            </div>

            {/* Sample Reports */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Sample Reports
              </h3>
              <div className="space-y-3">
                {expertReviewData.sampleReports.map((report) => (
                  <div key={report.id} className="border border-gray-200 rounded p-3">
                    <h4 className="font-medium text-gray-900 text-sm">
                      {report.itemType} - {report.type}
                    </h4>
                    <p className="text-xs text-gray-600 mt-1">
                      By {report.expert}
                    </p>
                    <button className="text-xs text-amber-600 hover:text-amber-700 mt-2">
                      View Sample →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertReviewPage;