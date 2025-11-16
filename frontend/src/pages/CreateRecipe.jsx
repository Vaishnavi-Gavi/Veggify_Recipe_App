import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateRecipe = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    thumbnail_image: '',
    instructions: '',
    prep_time: '',
    cook_time: '',
    servings: '',
    difficulty: '',
    source: '',
    tags: '',
    ingredients: [{ name: '', quantity: '' }]
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index][field] = value;
    setFormData(prev => ({
      ...prev,
      ingredients: newIngredients
    }));
  };

  const addIngredient = () => {
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: '', quantity: '' }]
    }));
  };

  const removeIngredient = (index) => {
    if (formData.ingredients.length > 1) {
      const newIngredients = formData.ingredients.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        ingredients: newIngredients
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.name || !formData.category || !formData.instructions) {
      setError('Please fill in all required fields (Name, Category, Instructions)');
      return;
    }

    if (formData.ingredients.some(ing => !ing.name || !ing.quantity)) {
      setError('Please fill in all ingredient fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare data according to backend schema
      const recipeData = {
        menuid: Date.now(), // Simple ID generation
        name: formData.name,
        category: formData.category,
        thumbnail_image: formData.thumbnail_image || 'https://via.placeholder.com/400x300',
        instructions: formData.instructions,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
        ingredients: formData.ingredients,
        comments: [],
        more: [{
          prep_time: formData.prep_time || '0 minutes',
          cook_time: formData.cook_time || '0 minutes',
          servings: formData.servings || '1',
          difficulty: formData.difficulty || 'Easy',
          source: formData.source || 'User Created'
        }]
      };

      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(recipeData)
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Failed to create recipe');
      } else {
        alert('Recipe created successfully!');
        navigate('/');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-eggshell to-gray-50 py-12 px-4 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 animate-slide-up">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-2">Create Your Recipe</h1>
            <p className="text-gray-600">Share your culinary masterpiece with the community</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 animate-fade-in">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Recipe Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-btnColor focus:border-transparent transition-all"
                  placeholder="e.g., Chocolate Chip Cookies"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-btnColor focus:border-transparent transition-all"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Entrees">Entrees</option>
                  <option value="Desserts">Desserts</option>
                  <option value="Sides">Sides</option>
                  <option value="Drinks">Drinks</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Recipe Image URL
              </label>
              <input
                type="url"
                name="thumbnail_image"
                value={formData.thumbnail_image}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-btnColor focus:border-transparent transition-all"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Instructions <span className="text-red-500">*</span>
              </label>
              <textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleInputChange}
                rows="6"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-btnColor focus:border-transparent transition-all"
                placeholder="Step-by-step cooking instructions..."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Prep Time</label>
                <input
                  type="text"
                  name="prep_time"
                  value={formData.prep_time}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-btnColor focus:border-transparent transition-all"
                  placeholder="e.g., 15 minutes"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Cook Time</label>
                <input
                  type="text"
                  name="cook_time"
                  value={formData.cook_time}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-btnColor focus:border-transparent transition-all"
                  placeholder="e.g., 30 minutes"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Servings</label>
                <input
                  type="text"
                  name="servings"
                  value={formData.servings}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-btnColor focus:border-transparent transition-all"
                  placeholder="e.g., 4"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Difficulty</label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-btnColor focus:border-transparent transition-all"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Tags (comma-separated)</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-btnColor focus:border-transparent transition-all"
                placeholder="e.g., vegetarian, quick, healthy"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Ingredients <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={addIngredient}
                  className="text-btnColor hover:text-opacity-80 font-medium text-sm"
                >
                  + Add Ingredient
                </button>
              </div>
              <div className="space-y-3">
                {formData.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex gap-3 items-start animate-slide-right">
                    <input
                      type="text"
                      value={ingredient.quantity}
                      onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-btnColor focus:border-transparent transition-all"
                      placeholder="Quantity (e.g., 2 cups)"
                      required
                    />
                    <input
                      type="text"
                      value={ingredient.name}
                      onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                      className="flex-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-btnColor focus:border-transparent transition-all"
                      placeholder="Ingredient name"
                      required
                    />
                    {formData.ingredients.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeIngredient(index)}
                        className="px-4 py-3 text-red-500 hover:text-red-700 transition-colors"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Source</label>
              <input
                type="text"
                name="source"
                value={formData.source}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-btnColor focus:border-transparent transition-all"
                placeholder="Recipe source or your name"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-btnColor text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Creating Recipe...' : 'Create Recipe'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRecipe;


