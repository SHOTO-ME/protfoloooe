import React from 'react';
import { Settings } from 'lucide-react';

interface SidebarProps {
  navItems: Array<{
    id: string;
    label: string;
    icon: React.ReactNode;
  }>;
  activeSection: string;
  setActiveSection: (section: string) => void;
  setActiveView: (view: 'form' | 'preview') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  navItems, 
  activeSection, 
  setActiveSection,
  setActiveView 
}) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <Settings className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-800">Portfolio Pro</h2>
        </div>
      </div>
      
      <nav className="mt-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => {
                  setActiveSection(item.id);
                  setActiveView('form');
                }}
                className={`w-full flex items-center px-6 py-3 text-sm font-medium transition-colors duration-150 ease-in-out ${
                  activeSection === item.id
                    ? 'text-blue-600 bg-blue-50 border-r-2 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="absolute bottom-0 w-full border-t border-gray-200 p-4">
        <button
          onClick={() => setActiveView('preview')}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-150 ease-in-out text-sm font-medium"
        >
          Preview Website
        </button>
      </div>
    </div>
  );
};

export default Sidebar;