import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { styleQuestions, skinToneAnalysis, styleRecommendations } from '../data/styleAssistant';
import { jewelryItems } from '../data/jewelry';
import JewelryCard from '../components/JewelryCard';
import { 
  CameraIcon,
  SparklesIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  PhotoIcon,
  BeakerIcon
} from '@heroicons/react/24/outline';

const StyleAssistantPage = () => {
  const { setStyleProfile, addNotification, setCurrentPage } = useApp();
  const [currentMethod, setCurrentMethod] = useState(''); // 'photo' or 'questionnaire'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [recommendations, setRecommendations] = useState(null);
  const [skinTone, setSkinTone] = useState(null);

  const handleMethodSelect = (method) => {
    setCurrentMethod(method);
    if (method === 'questionnaire') {
      setCurrentQuestionIndex(0);
    }
  };

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < styleQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      completeQuestionnaire();
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handlePhotoUpload = (file) => {
    setUploadedPhoto({
      file,
      url: URL.createObjectURL(file)
    });
    
    // Simulate skin tone analysis
    setTimeout(() => {
      const tones = ['cool', 'warm', 'neutral'];
      const randomTone = tones[Math.floor(Math.random() * tones.length)];
      setSkinTone(randomTone);
      completePhotoAnalysis(randomTone);
    }, 2000);
  };

  const completePhotoAnalysis = (detectedSkinTone) => {
    const profile = {
      method: 'photo',
      skinTone: detectedSkinTone,
      preferences: {
        style: 'modern', // Default based on photo analysis
        metals: skinToneAnalysis[detectedSkinTone].recommendedMetals,
        gemstones: skinToneAnalysis[detectedSkinTone].recommendedGemstones
      }
    };

    generateRecommendations(profile);
  };

  const completeQuestionnaire = () => {
    // Analyze questionnaire answers
    const stylePreference = answers[1] || 'classic';
    const metalPreference = answers[3] || 'yellow';
    
    // Determine skin tone based on metal preference (simplified)
    let detectedSkinTone = 'neutral';
    if (metalPreference === 'yellow') detectedSkinTone = 'warm';
    else if (metalPreference === 'white') detectedSkinTone = 'cool';

    const profile = {
      method: 'questionnaire',
      answers,
      skinTone: detectedSkinTone,
      preferences: {
        style: stylePreference,
        metals: [metalPreference],
        occasions: answers[2] || [],
        personalStyle: answers[4] || [],
        size: answers[5] || 'medium'
      }
    };

    generateRecommendations(profile);
  };

  const generateRecommendations = (profile) => {
    const styleRec = styleRecommendations[profile.preferences.style] || styleRecommendations.classic;
    const skinToneRec = skinToneAnalysis[profile.skinTone];

    // Filter jewelry items based on recommendations
    const recommendedItems = jewelryItems.filter(item => {
      // Check if materials match recommendations
      const hasRecommendedMetal = item.materials.some(material =>
        skinToneRec.recommendedMetals.some(recMetal =>
          material.toLowerCase().includes(recMetal.replace('-', ' '))
        )
      );
      
      const hasRecommendedGemstone = item.materials.some(material =>
        skinToneRec.recommendedGemstones.some(recGem =>
          material.toLowerCase().includes(recGem.toLowerCase())
        )
      );

      return hasRecommendedMetal || hasRecommendedGemstone;
    }).slice(0, 6);

    setRecommendations({
      profile,
      styleRec,
      skinToneRec,
      recommendedItems,
      personalizedTips: generatePersonalizedTips(profile)
    });

    setStyleProfile(profile);
    setAnalysisComplete(true);

    addNotification({
      type: 'success',
      title: 'Style Analysis Complete!',
      message: 'Your personalized jewelry recommendations are ready.'
    });
  };

  const generatePersonalizedTips = (profile) => {
    const tips = [
      `Your ${profile.skinTone} undertone pairs beautifully with ${skinToneAnalysis[profile.skinTone].recommendedMetals.join(', ')} metals.`,
      `Based on your style preference, consider ${styleRecommendations[profile.preferences.style]?.characteristics.join(', ').toLowerCase()}.`,
      'Mix metals for a modern, layered look that works with your versatile style.',
      'Consider the occasion when choosing jewelry size and formality.'
    ];

    return tips.slice(0, 3);
  };

  const currentQuestion = styleQuestions[currentQuestionIndex];

  if (analysisComplete && recommendations) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <SparklesIcon className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-playfair text-gray-900 mb-4">
              Your Style Profile
            </h1>
            <p className="text-xl text-gray-600">
              Personalized recommendations based on your unique style
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Style Analysis */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Style Analysis
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900">Skin Tone</h3>
                  <p className="text-gray-600 capitalize">{recommendations.profile.skinTone}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {recommendations.skinToneRec.description}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900">Recommended Metals</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {recommendations.skinToneRec.recommendedMetals.map((metal) => (
                      <span key={metal} className="px-3 py-1 bg-amber-100 text-amber-800 text-sm rounded-full">
                        {metal.replace('-', ' ')}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">Recommended Gemstones</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {recommendations.skinToneRec.recommendedGemstones.map((stone) => (
                      <span key={stone} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        {stone}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Style Preferences */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Your Style
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 capitalize">
                    {recommendations.profile.preferences.style}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {recommendations.styleRec.description}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">Characteristics</h3>
                  <ul className="text-sm text-gray-600 mt-1 space-y-1">
                    {recommendations.styleRec.characteristics.map((char, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {char}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Personalized Tips */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Personal Tips
              </h2>
              <div className="space-y-3">
                {recommendations.personalizedTips.map((tip, index) => (
                  <div key={index} className="flex items-start">
                    <SparklesIcon className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-600">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Recommended For You
              </h2>
              <button
                onClick={() => setCurrentPage('marketplace')}
                className="btn btn-outline flex items-center space-x-2"
              >
                <span>View All</span>
                <ArrowRightIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.recommendedItems.map((item) => (
                <JewelryCard key={item.id} item={{ ...item, images: [
                  item.category === 'rings' 
                    ? "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800" 
                    : item.category === 'necklaces'
                    ? "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800"
                    : item.category === 'earrings'
                    ? "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=800"
                    : item.category === 'bracelets'
                    ? "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800"
                    : "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800"
                ] }} />
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="text-center">
            <div className="space-y-4">
              <button
                onClick={() => {
                  setAnalysisComplete(false);
                  setCurrentMethod('');
                  setAnswers({});
                  setUploadedPhoto(null);
                  setRecommendations(null);
                  setSkinTone(null);
                  setCurrentQuestionIndex(0);
                }}
                className="btn btn-outline mr-4"
              >
                Retake Analysis
              </button>
              <button
                onClick={() => setCurrentPage('marketplace')}
                className="btn btn-primary"
              >
                Shop Recommendations
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold font-playfair text-gray-900 mb-4">
            Intelligent Style Assistant
          </h1>
          <p className="text-xl text-gray-600">
            Discover jewelry that complements your unique style and features
          </p>
        </div>

        {/* Method Selection */}
        {!currentMethod && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              onClick={() => handleMethodSelect('photo')}
              className="bg-white rounded-lg shadow-md p-8 text-center cursor-pointer hover:shadow-lg transition-shadow duration-300 group"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors duration-300">
                <CameraIcon className="h-8 w-8 text-purple-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Photo Analysis
              </h2>
              <p className="text-gray-600 mb-6">
                Upload a photo and let our smart analysis determine your skin tone and suggest complementary jewelry
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-center">
                  <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                  Automatic skin tone detection
                </div>
                <div className="flex items-center justify-center">
                  <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                  Instant recommendations
                </div>
                <div className="flex items-center justify-center">
                  <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                  Quick 2-minute process
                </div>
              </div>
            </div>

            <div
              onClick={() => handleMethodSelect('questionnaire')}
              className="bg-white rounded-lg shadow-md p-8 text-center cursor-pointer hover:shadow-lg transition-shadow duration-300 group"
            >
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors duration-300">
                <BeakerIcon className="h-8 w-8 text-amber-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Style Questionnaire
              </h2>
              <p className="text-gray-600 mb-6">
                Answer a few questions about your style preferences to get personalized jewelry recommendations
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-center">
                  <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                  Detailed style analysis
                </div>
                <div className="flex items-center justify-center">
                  <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                  Lifestyle-based recommendations
                </div>
                <div className="flex items-center justify-center">
                  <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                  5-minute questionnaire
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Photo Upload Method */}
        {currentMethod === 'photo' && !uploadedPhoto && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Upload Your Photo
              </h2>
              <p className="text-gray-600">
                Take or upload a clear photo of yourself for skin tone analysis
              </p>
            </div>

            <div className="image-upload-area">
              <PhotoIcon className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Drop your photo here or click to browse
              </h3>
              <p className="text-gray-600 mb-4">
                For best results, use natural lighting and face the camera directly
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files[0] && handlePhotoUpload(e.target.files[0])}
                className="hidden"
                id="photo-upload"
              />
              <label htmlFor="photo-upload" className="btn btn-primary">
                <CameraIcon className="h-5 w-5 mr-2" />
                Select Photo
              </label>
            </div>

            <button
              onClick={() => setCurrentMethod('')}
              className="btn btn-outline mt-6"
            >
              Back to Options
            </button>
          </div>
        )}

        {/* Photo Analysis */}
        {currentMethod === 'photo' && uploadedPhoto && !skinTone && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="mb-6">
              <img
                src={uploadedPhoto.url}
                alt="Uploaded"
                className="w-48 h-48 object-cover rounded-full mx-auto mb-4"
              />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Analyzing Your Photo...
              </h2>
              <p className="text-gray-600">
                Our intelligent system is analyzing your skin tone and features
              </p>
            </div>
            <div className="spinner mx-auto"></div>
          </div>
        )}

        {/* Questionnaire Method */}
        {currentMethod === 'questionnaire' && currentQuestion && (
          <div className="bg-white rounded-lg shadow-md p-8">
            {/* Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">
                  Question {currentQuestionIndex + 1} of {styleQuestions.length}
                </span>
                <span className="text-sm text-gray-600">
                  {Math.round(((currentQuestionIndex + 1) / styleQuestions.length) * 100)}% Complete
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / styleQuestions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Question */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {currentQuestion.question}
              </h2>

              {currentQuestion.type === 'multiple-choice' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleAnswer(currentQuestion.id, option.id)}
                      className={`p-4 border-2 rounded-lg text-left transition-all duration-200 ${
                        answers[currentQuestion.id] === option.id
                          ? 'border-amber-500 bg-amber-50'
                          : 'border-gray-200 hover:border-amber-300'
                      }`}
                    >
                      {option.image && (
                        <img
                          src={option.image}
                          alt={option.label}
                          className="w-full h-32 object-cover rounded mb-3"
                        />
                      )}
                      {option.color && (
                        <div
                          className="w-full h-8 rounded mb-3"
                          style={{ backgroundColor: option.color }}
                        ></div>
                      )}
                      <span className="font-medium">{option.label}</span>
                    </button>
                  ))}
                </div>
              )}

              {currentQuestion.type === 'multiple-select' && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {currentQuestion.options.map((option) => (
                    <label
                      key={option.id}
                      className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                    >
                      <input
                        type="checkbox"
                        checked={(answers[currentQuestion.id] || []).includes(option.id)}
                        onChange={(e) => {
                          const currentAnswers = answers[currentQuestion.id] || [];
                          const newAnswers = e.target.checked
                            ? [...currentAnswers, option.id]
                            : currentAnswers.filter(id => id !== option.id);
                          handleAnswer(currentQuestion.id, newAnswers);
                        }}
                        className="mr-3 text-amber-500 focus:ring-amber-500"
                      />
                      <span className="text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <button
                onClick={currentQuestionIndex === 0 ? () => setCurrentMethod('') : previousQuestion}
                className="btn btn-outline"
              >
                {currentQuestionIndex === 0 ? 'Back to Options' : 'Previous'}
              </button>
              
              <button
                onClick={nextQuestion}
                disabled={!answers[currentQuestion.id]}
                className="btn btn-primary disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {currentQuestionIndex === styleQuestions.length - 1 ? 'Get Results' : 'Next'}
                <ArrowRightIcon className="h-5 w-5 ml-2" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StyleAssistantPage;