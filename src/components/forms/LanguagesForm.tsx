import React from 'react';
import { Language } from '../../types/userData';
import { Plus, X } from 'lucide-react';

interface LanguagesFormProps {
  languages: Language[];
  updateUserData: (data: Language[]) => void;
}

const LanguagesForm: React.FC<LanguagesFormProps> = ({ languages, updateUserData }) => {
  const handleAddLanguage = () => {
    const newLanguage: Language = {
      id: Date.now().toString(),
      name: '',
      proficiency: 'Intermediate'
    };
    
    updateUserData([...languages, newLanguage]);
  };

  const handleRemoveLanguage = (id: string) => {
    const updatedLanguages = languages.filter(language => language.id !== id);
    updateUserData(updatedLanguages);
  };

  const handleChange = (id: string, field: keyof Language, value: any) => {
    const updatedLanguages = languages.map(language => 
      language.id === id ? { ...language, [field]: value } : language
    );
    updateUserData(updatedLanguages);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {languages.length === 0 && (
          <p className="text-sm text-gray-500 italic">No languages added yet.</p>
        )}
        
        {languages.map(language => (
          <div key={language.id} className="flex items-center space-x-3">
            <div className="flex-1">
              <input
                type="text"
                value={language.name}
                onChange={(e) => handleChange(language.id, 'name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. English, Spanish, etc."
              />
            </div>
            
            <div className="w-40">
              <select
                value={language.proficiency}
                onChange={(e) => handleChange(language.id, 'proficiency', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Basic">Basic</option>
                <option value="Conversational">Conversational</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Proficient">Proficient</option>
                <option value="Fluent">Fluent</option>
                <option value="Native">Native</option>
              </select>
            </div>
            
            <button
              type="button"
              onClick={() => handleRemoveLanguage(language.id)}
              className="p-1 text-gray-500 hover:text-red-500"
            >
              <X size={18} />
            </button>
          </div>
        ))}
      </div>
      
      <button
        type="button"
        onClick={handleAddLanguage}
        className="mt-4 flex items-center justify-center w-full py-2 px-4 border border-dashed border-gray-300 rounded-md text-sm font-medium text-blue-600 hover:text-blue-800 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-150"
      >
        <Plus size={16} className="mr-1.5" />
        Add Language
      </button>
    </div>
  );
};

export default LanguagesForm;