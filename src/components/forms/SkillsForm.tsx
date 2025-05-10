import React, { useState } from 'react';
import { Skill } from '../../types/userData';
import { Plus, X, ChevronDown, ChevronUp } from 'lucide-react';

interface SkillsFormProps {
  skills: Skill[];
  updateUserData: (data: Skill[]) => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ skills, updateUserData }) => {
  const skillCategories = ['Frontend', 'Backend', 'Mobile', 'DevOps', 'Design', 'Other'];
  const [expandedCategory, setExpandedCategory] = useState<string | null>('Frontend');

  const handleAddSkill = (category: string) => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      level: 3,
      category
    };
    
    updateUserData([...skills, newSkill]);
  };

  const handleRemoveSkill = (id: string) => {
    const updatedSkills = skills.filter(skill => skill.id !== id);
    updateUserData(updatedSkills);
  };

  const handleChange = (id: string, field: keyof Skill, value: any) => {
    const updatedSkills = skills.map(skill => 
      skill.id === id ? { ...skill, [field]: value } : skill
    );
    updateUserData(updatedSkills);
  };

  const toggleExpanded = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  // Filter skills by category
  const getSkillsByCategory = (category: string) => {
    return skills.filter(skill => skill.category === category);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-sm uppercase tracking-wider font-semibold text-gray-500">Skill Categories</h3>
      
      {skillCategories.map(category => (
        <div key={category} className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
          <div 
            className="px-4 py-3 bg-gray-100 flex justify-between items-center cursor-pointer"
            onClick={() => toggleExpanded(category)}
          >
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{category}</h4>
            </div>
            <div className="flex items-center">
              {expandedCategory === category ? (
                <ChevronUp size={18} className="text-gray-500" />
              ) : (
                <ChevronDown size={18} className="text-gray-500" />
              )}
            </div>
          </div>
          
          {expandedCategory === category && (
            <div className="p-4">
              {getSkillsByCategory(category).length === 0 && (
                <p className="text-sm text-gray-500 italic">No skills added yet.</p>
              )}
              
              <div className="space-y-3">
                {getSkillsByCategory(category).map(skill => (
                  <div key={skill.id} className="flex items-center space-x-3">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={skill.name}
                        onChange={(e) => handleChange(skill.id, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder={`e.g. React, Python, etc.`}
                      />
                    </div>
                    
                    <div className="w-32">
                      <select
                        value={skill.level}
                        onChange={(e) => handleChange(skill.id, 'level', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value={1}>Beginner</option>
                        <option value={2}>Intermediate</option>
                        <option value={3}>Advanced</option>
                        <option value={4}>Expert</option>
                        <option value={5}>Master</option>
                      </select>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill.id)}
                      className="p-1 text-gray-500 hover:text-red-500"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
              
              <button
                type="button"
                onClick={() => handleAddSkill(category)}
                className="mt-4 flex items-center justify-center w-full py-2 px-4 border border-dashed border-gray-300 rounded-md text-sm font-medium text-blue-600 hover:text-blue-800 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-150"
              >
                <Plus size={16} className="mr-1.5" />
                Add {category} Skill
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SkillsForm;