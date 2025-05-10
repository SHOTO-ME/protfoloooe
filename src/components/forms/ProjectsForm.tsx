import React, { useState } from 'react';
import { Project } from '../../types/userData';
import { Plus, X, ChevronDown, ChevronUp, Link as LinkIcon } from 'lucide-react';

interface ProjectsFormProps {
  projects: Project[];
  updateUserData: (data: Project[]) => void;
}

const ProjectsForm: React.FC<ProjectsFormProps> = ({ projects, updateUserData }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const handleAddProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: '',
      description: '',
      technologies: [],
      liveUrl: '',
      repoUrl: '',
      image: '',
      startDate: '',
      endDate: '',
      featured: false
    };
    
    updateUserData([...projects, newProject]);
    setExpandedIndex(projects.length);
  };

  const handleRemoveProject = (index: number) => {
    const updatedProjects = [...projects];
    updatedProjects.splice(index, 1);
    updateUserData(updatedProjects);
    
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else if (expandedIndex !== null && expandedIndex > index) {
      setExpandedIndex(expandedIndex - 1);
    }
  };

  const handleChange = (index: number, field: keyof Project, value: any) => {
    const updatedProjects = [...projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value
    };
    updateUserData(updatedProjects);
  };

  const handleTechnologiesChange = (index: number, value: string) => {
    const technologies = value.split(',').map(tech => tech.trim()).filter(tech => tech !== '');
    handleChange(index, 'technologies', technologies);
  };

  const toggleExpanded = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="space-y-6">
      {projects.map((project, index) => (
        <div key={project.id} className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
          <div 
            className="px-4 py-3 bg-gray-100 flex justify-between items-center cursor-pointer"
            onClick={() => toggleExpanded(index)}
          >
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">
                {project.title ? project.title : 'New Project'}
              </h4>
            </div>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveProject(index);
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) => handleChange(index, 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. E-commerce Platform"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={project.description}
                  onChange={(e) => handleChange(index, 'description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe what the project does and your role in it..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Technologies Used
                </label>
                <input
                  type="text"
                  value={project.technologies.join(', ')}
                  onChange={(e) => handleTechnologiesChange(index, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. React, Node.js, MongoDB (comma separated)"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Live URL (optional)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LinkIcon size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="url"
                      value={project.liveUrl}
                      onChange={(e) => handleChange(index, 'liveUrl', e.target.value)}
                      className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g. https://myproject.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Repository URL (optional)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LinkIcon size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="url"
                      value={project.repoUrl}
                      onChange={(e) => handleChange(index, 'repoUrl', e.target.value)}
                      className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g. https://github.com/username/repo"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Image URL (optional)
                </label>
                <input
                  type="url"
                  value={project.image}
                  onChange={(e) => handleChange(index, 'image', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. https://example.com/project-image.jpg"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date (optional)
                  </label>
                  <input
                    type="month"
                    value={project.startDate}
                    onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date (optional)
                  </label>
                  <input
                    type="month"
                    value={project.endDate}
                    onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div className="mt-2">
                <div className="flex items-center">
                  <input
                    id={`featured-${index}`}
                    type="checkbox"
                    checked={project.featured}
                    onChange={(e) => handleChange(index, 'featured', e.target.checked)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor={`featured-${index}`} className="ml-2 block text-sm text-gray-700">
                    Feature this project on your portfolio
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
      
      <button
        type="button"
        onClick={handleAddProject}
        className="mt-4 flex items-center justify-center w-full py-2 px-4 border border-dashed border-gray-300 rounded-md text-sm font-medium text-blue-600 hover:text-blue-800 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-150"
      >
        <Plus size={16} className="mr-1.5" />
        Add Project
      </button>
    </div>
  );
};

export default ProjectsForm;