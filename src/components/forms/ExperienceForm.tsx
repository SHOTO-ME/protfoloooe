import React, { useState } from 'react';
import { Experience } from '../../types/userData';
import { Plus, X, ChevronDown, ChevronUp } from 'lucide-react';

interface ExperienceFormProps {
  experience: Experience[];
  updateUserData: (data: Experience[]) => void;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ experience, updateUserData }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const handleAddExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: ['']
    };
    
    updateUserData([...experience, newExperience]);
    setExpandedIndex(experience.length);
  };

  const handleRemoveExperience = (index: number) => {
    const updatedExperience = [...experience];
    updatedExperience.splice(index, 1);
    updateUserData(updatedExperience);
    
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else if (expandedIndex !== null && expandedIndex > index) {
      setExpandedIndex(expandedIndex - 1);
    }
  };

  const handleChange = (index: number, field: keyof Experience, value: any) => {
    const updatedExperience = [...experience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value
    };
    updateUserData(updatedExperience);
  };

  const handleChangeAchievement = (expIndex: number, achievementIndex: number, value: string) => {
    const updatedExperience = [...experience];
    const achievements = [...updatedExperience[expIndex].achievements];
    achievements[achievementIndex] = value;
    updatedExperience[expIndex] = {
      ...updatedExperience[expIndex],
      achievements
    };
    updateUserData(updatedExperience);
  };

  const handleAddAchievement = (expIndex: number) => {
    const updatedExperience = [...experience];
    updatedExperience[expIndex] = {
      ...updatedExperience[expIndex],
      achievements: [...updatedExperience[expIndex].achievements, '']
    };
    updateUserData(updatedExperience);
  };

  const handleRemoveAchievement = (expIndex: number, achievementIndex: number) => {
    const updatedExperience = [...experience];
    const achievements = [...updatedExperience[expIndex].achievements];
    achievements.splice(achievementIndex, 1);
    updatedExperience[expIndex] = {
      ...updatedExperience[expIndex],
      achievements
    };
    updateUserData(updatedExperience);
  };

  const toggleExpanded = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="space-y-6">
      {experience.map((exp, index) => (
        <div key={exp.id} className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
          <div 
            className="px-4 py-3 bg-gray-100 flex justify-between items-center cursor-pointer"
            onClick={() => toggleExpanded(index)}
          >
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">
                {exp.position ? exp.position : 'New Position'} 
                {exp.company ? ` at ${exp.company}` : ''}
              </h4>
            </div>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveExperience(index);
                }}
                className="p-1 text-gray-500 hover:text-red-500"
              >
                <X size={18} />
              </button>
              {expandedIndex === index ? (
                <ChevronUp size={18} className="text-gray-500" />
              ) : (
                <ChevronDown size={18} className="text-gray-500" />
              )}
            </div>
          </div>
          
          {expandedIndex === index && (
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => handleChange(index, 'company', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. Acme Inc."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Position
                  </label>
                  <input
                    type="text"
                    value={exp.position}
                    onChange={(e) => handleChange(index, 'position', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. Senior Developer"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={exp.location}
                  onChange={(e) => handleChange(index, 'location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. Remote, New York, NY"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="month"
                      value={exp.endDate}
                      onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      disabled={exp.current}
                    />
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`current-${index}`}
                        checked={exp.current}
                        onChange={(e) => handleChange(index, 'current', e.target.checked)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor={`current-${index}`} className="ml-2 block text-sm text-gray-700">
                        Current
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={exp.description}
                  onChange={(e) => handleChange(index, 'description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Brief description of your role and responsibilities..."
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Key Achievements
                  </label>
                  <button
                    type="button"
                    onClick={() => handleAddAchievement(index)}
                    className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                  >
                    <Plus size={16} className="mr-1" />
                    Add
                  </button>
                </div>
                
                <div className="space-y-2">
                  {exp.achievements.map((achievement, achievementIndex) => (
                    <div key={achievementIndex} className="flex items-center">
                      <input
                        type="text"
                        value={achievement}
                        onChange={(e) => handleChangeAchievement(index, achievementIndex, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g. Increased sales by 20%"
                      />
                      {exp.achievements.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveAchievement(index, achievementIndex)}
                          className="ml-2 p-1 text-gray-500 hover:text-red-500"
                        >
                          <X size={18} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
      
      <button
        type="button"
        onClick={handleAddExperience}
        className="mt-4 flex items-center justify-center w-full py-2 px-4 border border-dashed border-gray-300 rounded-md text-sm font-medium text-blue-600 hover:text-blue-800 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-150"
      >
        <Plus size={16} className="mr-1.5" />
        Add Work Experience
      </button>
    </div>
  );
};

export default ExperienceForm;