import React, { useState } from 'react';
import { Download, Code, FileDown } from 'lucide-react';
import { UserData } from '../types/userData';

// Import preview components
import ModernPreview from './previews/ModernPreview';
import ClassicPreview from './previews/ClassicPreview';
import CreativePreview from './previews/CreativePreview';
import CVPreview from './previews/CVPreview';

interface PreviewProps {
  userData: UserData;
}

const Preview: React.FC<PreviewProps> = ({ userData }) => {
  const [previewType, setPreviewType] = useState<'portfolio' | 'cv'>('portfolio');

  // Function to render the appropriate preview based on template selection
  const renderPortfolioPreview = () => {
    const template = userData.settings.template || 'modern';
    
    switch (template) {
      case 'modern':
        return <ModernPreview userData={userData} />;
      case 'classic':
        return <ClassicPreview userData={userData} />;
      case 'creative':
        return <CreativePreview userData={userData} />;
      default:
        return <ModernPreview userData={userData} />;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Preview Controls */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-16 z-10">
        <div className="flex space-x-2">
          <button
            onClick={() => setPreviewType('portfolio')}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              previewType === 'portfolio' 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            Portfolio
          </button>
          <button
            onClick={() => setPreviewType('cv')}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              previewType === 'cv' 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            CV
          </button>
        </div>
        
        <div className="flex space-x-2">
          <button 
            className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
            onClick={() => console.log('Download HTML functionality to be implemented')}
          >
            <div className="flex items-center">
              <Code size={16} className="mr-1.5" />
              Export HTML
            </div>
          </button>
          
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
            onClick={() => console.log('Download PDF functionality to be implemented')}
          >
            <div className="flex items-center">
              <FileDown size={16} className="mr-1.5" />
              Download PDF
            </div>
          </button>
        </div>
      </div>
      
      {/* Preview Content */}
      <div className="flex-1 overflow-auto bg-gray-100">
        <div className="max-w-screen-xl mx-auto p-4">
          {previewType === 'portfolio' ? (
            renderPortfolioPreview()
          ) : (
            <CVPreview userData={userData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Preview;