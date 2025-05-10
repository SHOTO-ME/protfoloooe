import React from 'react';
import { Settings } from '../../types/userData';

interface AppearanceSettingsProps {
  settings: Settings;
  updateUserData: (data: Partial<Settings>) => void;
}

const themeColors = [
  { id: 'blue', label: 'Blue', primary: '#3B82F6', accent: '#8B5CF6' },
  { id: 'teal', label: 'Teal', primary: '#10B981', accent: '#3B82F6' },
  { id: 'purple', label: 'Purple', primary: '#8B5CF6', accent: '#EC4899' },
  { id: 'indigo', label: 'Indigo', primary: '#6366F1', accent: '#F59E0B' },
  { id: 'rose', label: 'Rose', primary: '#F43F5E', accent: '#8B5CF6' },
  { id: 'amber', label: 'Amber', primary: '#F59E0B', accent: '#10B981' }
];

const fontOptions = [
  { id: 'inter', label: 'Inter', value: 'Inter, sans-serif' },
  { id: 'poppins', label: 'Poppins', value: 'Poppins, sans-serif' },
  { id: 'roboto', label: 'Roboto', value: 'Roboto, sans-serif' },
  { id: 'montserrat', label: 'Montserrat', value: 'Montserrat, sans-serif' },
  { id: 'opensans', label: 'Open Sans', value: 'Open Sans, sans-serif' }
];

const templateOptions = [
  { id: 'modern', label: 'Modern', description: 'Clean and minimalist design with smooth animations' },
  { id: 'classic', label: 'Classic', description: 'Traditional resume-like layout with elegant styling' },
  { id: 'creative', label: 'Creative', description: 'Bold and unique layout for creative professionals' }
];

const AppearanceSettings: React.FC<AppearanceSettingsProps> = ({ settings, updateUserData }) => {
  const handleChange = (field: keyof Settings, value: any) => {
    updateUserData({ [field]: value });
  };
  
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Color Theme</h3>
        <p className="text-sm text-gray-500">Choose a color scheme for your portfolio.</p>
        
        <div className="grid grid-cols-3 gap-4">
          {themeColors.map(color => (
            <div 
              key={color.id}
              onClick={() => handleChange('theme', color.id)}
              className={`border rounded-lg p-4 cursor-pointer ${
                settings.theme === color.id 
                  ? 'ring-2 ring-offset-2 ring-blue-500' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex justify-center mb-2">
                <div 
                  className="w-8 h-8 rounded-full mr-2"
                  style={{ backgroundColor: color.primary }}
                />
                <div 
                  className="w-8 h-8 rounded-full"
                  style={{ backgroundColor: color.accent }}
                />
              </div>
              <p className="text-center text-sm font-medium">{color.label}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Font Family</h3>
        <p className="text-sm text-gray-500">Select a font for your portfolio and resume.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {fontOptions.map(font => (
            <div 
              key={font.id}
              onClick={() => handleChange('font', font.id)}
              className={`border rounded-lg p-4 cursor-pointer ${
                settings.font === font.id 
                  ? 'ring-2 ring-offset-2 ring-blue-500' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <p className="text-center" style={{ fontFamily: font.value }}>{font.label}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Layout Template</h3>
        <p className="text-sm text-gray-500">Choose a template for your portfolio website.</p>
        
        <div className="space-y-3">
          {templateOptions.map(template => (
            <div 
              key={template.id}
              onClick={() => handleChange('template', template.id)}
              className={`border rounded-lg p-4 cursor-pointer ${
                settings.template === template.id 
                  ? 'ring-2 ring-offset-2 ring-blue-500' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center">
                <div className="mr-4">
                  <input
                    type="radio"
                    id={`template-${template.id}`}
                    checked={settings.template === template.id}
                    onChange={() => handleChange('template', template.id)}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor={`template-${template.id}`} className="font-medium text-gray-900 block">
                    {template.label}
                  </label>
                  <p className="text-sm text-gray-500">{template.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="space-y-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Dark Mode</h3>
            <p className="text-sm text-gray-500">Enable dark mode for your portfolio.</p>
          </div>
          <div className="ml-4 flex items-center">
            <input
              type="checkbox"
              id="dark-mode"
              checked={settings.darkMode}
              onChange={(e) => handleChange('darkMode', e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="dark-mode" className="ml-2 block text-sm text-gray-700">
              Enable
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppearanceSettings;