import React, { useState } from 'react';
import { Briefcase, GraduationCap, Download, Eye, FileText, Home, User, Code, Languages, Award, Settings } from 'lucide-react';
import Sidebar from './components/Sidebar';
import FormWizard from './components/FormWizard';
import Preview from './components/Preview';
import { defaultUserData } from './data/defaultData';
import { UserData } from './types/userData';

function App() {
  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const [activeView, setActiveView] = useState<'form' | 'preview'>('form');
  const [activeSection, setActiveSection] = useState<string>('personal');
  
  // Function to update user data
  const updateUserData = (section: string, data: any) => {
    setUserData(prevData => ({
      ...prevData,
      [section]: Array.isArray(prevData[section]) && Array.isArray(data)
        ? data
        : { ...prevData[section], ...data }
    }));
  };
  
  // Navigation items for sidebar
  const navItems = [
    { id: 'personal', label: 'Personal', icon: <User size={20} /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase size={20} /> },
    { id: 'education', label: 'Education', icon: <GraduationCap size={20} /> },
    { id: 'projects', label: 'Projects', icon: <Code size={20} /> },
    { id: 'skills', label: 'Skills', icon: <FileText size={20} /> },
    { id: 'languages', label: 'Languages', icon: <Languages size={20} /> },
    { id: 'certifications', label: 'Certifications', icon: <Award size={20} /> },
    { id: 'settings', label: 'Appearance', icon: <Settings size={20} /> },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <Sidebar 
        navItems={navItems} 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        setActiveView={setActiveView}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center px-6 justify-between sticky top-0 z-10">
          <h1 className="text-xl font-semibold text-gray-800">Portfolio & CV Generator</h1>
          
          <div className="flex space-x-2">
            {/* Toggle between form and preview */}
            <button
              onClick={() => setActiveView('form')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                activeView === 'form' 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <div className="flex items-center">
                <FileText size={18} className="mr-1.5" />
                Edit
              </div>
            </button>
            
            <button
              onClick={() => setActiveView('preview')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                activeView === 'preview' 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <div className="flex items-center">
                <Eye size={18} className="mr-1.5" />
                Preview
              </div>
            </button>
            
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
              onClick={() => console.log('Export functionality to be implemented')}
            >
              <div className="flex items-center">
                <Download size={18} className="mr-1.5" />
                Export
              </div>
            </button>
          </div>
        </header>
        
        {/* Conditional render based on active view */}
        <div className="flex-1 overflow-auto">
          {activeView === 'form' ? (
            <FormWizard 
              userData={userData} 
              updateUserData={updateUserData} 
              activeSection={activeSection}
              navItems={navItems}
            />
          ) : (
            <Preview userData={userData} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;