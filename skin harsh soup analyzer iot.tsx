import React, { useState } from 'react';
import { Droplet, AlertCircle, CheckCircle, Info, Beaker } from 'lucide-react';

export default function SoupSkinAnalyzer() {
  const [soupName, setSoupName] = useState('');
  const [phLevel, setPhLevel] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [result, setResult] = useState(null);

  const analyzeSoup = () => {
    const ph = parseFloat(phLevel);
    
    if (!soupName || !phLevel || isNaN(ph)) {
      alert('Please fill in all required fields with valid data');
      return;
    }

    // Skin pH is typically 4.5-5.5 (slightly acidic)
    // Safe range for topical application: 4.0-7.0
    let status = '';
    let recommendation = '';
    let skinCompatibility = 0;
    let color = '';

    if (ph < 3.0) {
      status = 'Too Acidic - Not Suitable';
      recommendation = 'This soup is highly acidic and may cause skin irritation, burning, or damage. Do not apply to skin.';
      skinCompatibility = 10;
      color = 'text-red-600';
    } else if (ph >= 3.0 && ph < 4.0) {
      status = 'Very Acidic - Use with Caution';
      recommendation = 'This soup is very acidic. It may cause irritation on sensitive skin. Patch test recommended before any topical use.';
      skinCompatibility = 35;
      color = 'text-orange-600';
    } else if (ph >= 4.0 && ph <= 5.5) {
      status = 'Optimal pH - Skin Friendly';
      recommendation = 'This soup has a pH similar to natural skin pH (4.5-5.5). It is generally safe for topical application and may have skin benefits.';
      skinCompatibility = 95;
      color = 'text-green-600';
    } else if (ph > 5.5 && ph <= 7.0) {
      status = 'Slightly Alkaline - Generally Safe';
      recommendation = 'This soup is mildly alkaline. Generally safe for skin but may slightly disrupt natural skin barrier over time.';
      skinCompatibility = 70;
      color = 'text-blue-600';
    } else if (ph > 7.0 && ph <= 9.0) {
      status = 'Alkaline - Use with Caution';
      recommendation = 'This soup is alkaline and may disrupt skin pH balance, potentially causing dryness or irritation.';
      skinCompatibility = 40;
      color = 'text-orange-600';
    } else {
      status = 'Highly Alkaline - Not Suitable';
      recommendation = 'This soup is highly alkaline and can damage skin barrier, cause irritation, or chemical burns. Do not apply to skin.';
      skinCompatibility = 5;
      color = 'text-red-600';
    }

    // Analyze ingredients for additional concerns
    const concernIngredients = [];
    const beneficialIngredients = [];
    
    const ingredientList = ingredients.toLowerCase();
    
    // Check for common irritants
    if (ingredientList.includes('chili') || ingredientList.includes('pepper') || ingredientList.includes('spicy')) {
      concernIngredients.push('Spicy ingredients (capsaicin) may irritate skin');
    }
    if (ingredientList.includes('garlic') || ingredientList.includes('onion')) {
      concernIngredients.push('Allium vegetables may cause sensitivity');
    }
    if (ingredientList.includes('citrus') || ingredientList.includes('lemon') || ingredientList.includes('lime')) {
      concernIngredients.push('Citrus acids may increase photosensitivity');
    }
    if (ingredientList.includes('salt') || ingredientList.includes('sodium')) {
      concernIngredients.push('High sodium may dehydrate skin');
    }

    // Check for beneficial ingredients
    if (ingredientList.includes('tomato')) {
      beneficialIngredients.push('Tomatoes contain lycopene (antioxidant)');
    }
    if (ingredientList.includes('carrot')) {
      beneficialIngredients.push('Carrots rich in beta-carotene (vitamin A)');
    }
    if (ingredientList.includes('spinach') || ingredientList.includes('kale')) {
      beneficialIngredients.push('Leafy greens contain vitamins and antioxidants');
    }
    if (ingredientList.includes('pumpkin')) {
      beneficialIngredients.push('Pumpkin contains enzymes and vitamins');
    }
    if (ingredientList.includes('cucumber')) {
      beneficialIngredients.push('Cucumber has soothing and hydrating properties');
    }

    setResult({
      status,
      recommendation,
      skinCompatibility,
      color,
      concernIngredients,
      beneficialIngredients,
      ph
    });
  };

  const reset = () => {
    setSoupName('');
    setPhLevel('');
    setIngredients('');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Beaker className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-800">Soup Skin Compatibility Analyzer</h1>
          </div>
          <p className="text-gray-600">Analyze if soup is suitable for topical skincare based on pH levels and ingredients</p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Enter Soup Details</h2>
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Soup Name *
              </label>
              <input
                type="text"
                value={soupName}
                onChange={(e) => setSoupName(e.target.value)}
                placeholder="e.g., Tomato Soup, Cucumber Soup"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                pH Level * (0-14 scale)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="14"
                value={phLevel}
                onChange={(e) => setPhLevel(e.target.value)}
                placeholder="e.g., 5.5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">Measure using pH strips or digital pH meter</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ingredients (Optional)
              </label>
              <textarea
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="e.g., tomatoes, carrots, onions, garlic, salt, pepper"
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={analyzeSoup}
              className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Analyze Soup
            </button>
            <button
              onClick={reset}
              className="px-6 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Status Card */}
            <div className={`bg-white rounded-2xl shadow-lg p-8 border-l-4 ${
              result.skinCompatibility >= 70 ? 'border-green-500' :
              result.skinCompatibility >= 40 ? 'border-orange-500' :
              'border-red-500'
            }`}>
              <div className="flex items-start gap-4">
                {result.skinCompatibility >= 70 ? (
                  <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-8 h-8 text-orange-600 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{soupName}</h3>
                  <p className={`text-xl font-semibold mb-3 ${result.color}`}>{result.status}</p>
                  <div className="bg-gray-100 rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">pH Level</span>
                      <span className="text-2xl font-bold text-purple-600">{result.ph}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Skin Compatibility</span>
                      <span className="text-2xl font-bold text-purple-600">{result.skinCompatibility}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${
                        result.skinCompatibility >= 70 ? 'bg-green-500' :
                        result.skinCompatibility >= 40 ? 'bg-orange-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${result.skinCompatibility}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendation */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-start gap-3 mb-4">
                <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Recommendation</h3>
                  <p className="text-gray-700">{result.recommendation}</p>
                </div>
              </div>
            </div>

            {/* Ingredient Analysis */}
            {(result.beneficialIngredients.length > 0 || result.concernIngredients.length > 0) && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Ingredient Analysis</h3>
                
                {result.beneficialIngredients.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-green-700 mb-2">✓ Beneficial Components</h4>
                    <ul className="space-y-1">
                      {result.beneficialIngredients.map((item, idx) => (
                        <li key={idx} className="text-sm text-gray-700 pl-4">• {item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {result.concernIngredients.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-orange-700 mb-2">⚠ Potential Concerns</h4>
                    <ul className="space-y-1">
                      {result.concernIngredients.map((item, idx) => (
                        <li key={idx} className="text-sm text-gray-700 pl-4">• {item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* pH Reference Guide */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">pH Reference Guide</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span className="font-medium">pH 0-3: Highly Acidic</span>
                  <span className="text-red-600">❌ Not Suitable</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <span className="font-medium">pH 3-4: Very Acidic</span>
                  <span className="text-orange-600">⚠️ Caution</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="font-medium">pH 4-5.5: Optimal (Skin pH)</span>
                  <span className="text-green-600">✓ Best for Skin</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium">pH 5.5-7: Neutral</span>
                  <span className="text-blue-600">✓ Generally Safe</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <span className="font-medium">pH 7-9: Alkaline</span>
                  <span className="text-orange-600">⚠️ Caution</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span className="font-medium">pH 9+: Highly Alkaline</span>
                  <span className="text-red-600">❌ Not Suitable</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Important Note */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mt-6">
          <div className="flex gap-3">
            <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-yellow-900 mb-2">Important Safety Notice</h4>
              <p className="text-sm text-yellow-800">
                This analyzer is for educational purposes. Always perform a patch test before applying any food-based product to your skin. 
                Consult a dermatologist for personalized skincare advice. Not all soups are meant for topical application, even if pH is suitable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}