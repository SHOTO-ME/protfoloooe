import React from 'react';
import PersonalForm from './forms/PersonalForm';
import ExperienceForm from './forms/ExperienceForm';
import EducationForm from './forms/EducationForm';
import ProjectsForm from './forms/ProjectsForm';
import SkillsForm from './forms/SkillsForm';
import LanguagesForm from './forms/LanguagesForm';
import CertificationsForm from './forms/CertificationsForm';
import AppearanceSettings from './forms/AppearanceSettings';
import { UserData } from '../types/userData';

interface FormWizardProps {
  userData: UserData;
  updateUserData: (section: string, data: any) => void;
  activeSection: string;
  navItems: Array<{
    id: string;
    label: string;
    icon: React.ReactNode;
  }>;
}

const FormWizard: React.FC<FormWizardProps> = ({
  userData,
  updateUserData,
  activeSection,
  navItems
}) => {
  // Function to render the appropriate form based on activeSection
  const renderActiveForm = () => {
    switch (activeSection) {
      case 'personal':
        return (
          <PersonalForm 
            personalData={userData.personal} 
            updateUserData={(data) => updateUserData('personal', data)} 
          />
        );
      case 'experience':
        return (
          <ExperienceForm 
            experience={userData.experience} 
            updateUserData={(data) => updateUserData('experience', data)} 
          />
        );
      case 'education':
        return (
          <EducationForm 
            education={userData.education} 
            updateUserData={(data) => updateUserData('education', data)} 
          />
        );
      case 'projects':
        return (
          <ProjectsForm 
            projects={userData.projects} 
            updateUserData={(data) => updateUserData('projects', data)} 
          />
        );
      case 'skills':
        return (
          <SkillsForm 
            skills={userData.skills} 
            updateUserData={(data) => updateUserData('skills', data)} 
          />
        );
      case 'languages':
        return (
          <LanguagesForm 
            languages={userData.languages} 
            updateUserData={(data) => updateUserData('languages', data)} 
          />
        );
      case 'certifications':
        return (
          <CertificationsForm 
            certifications={userData.certifications} 
            updateUserData={(data) => updateUserData('certifications', data)} 
          />
        );
      case 'settings':
        return (
          <AppearanceSettings 
            settings={userData.settings} 
            updateUserData={(data) => updateUserData('settings', data)} 
          />
        );
      default:
        return <div>Select a section to edit</div>;
    }
  };

  // Find active section from navItems
  const activeItem = navItems.find(item => item.id === activeSection);
  
  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            {activeItem?.label}
          </h2>
          <p className="text-gray-600">
            {getFormDescription(activeSection)}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {renderActiveForm()}
        </div>
      </div>
    </div>
  );
};

// Helper function to get descriptions for each form section
function getFormDescription(section: string): string {
  switch (section) {
    case 'personal':
      return 'Enter your personal information and contact details';
    case 'experience':
      return 'Add your work experience and professional history';
    case 'education':
      return 'Include your educational background and qualifications';
    case 'projects':
      return 'Showcase your projects and portfolio items';
    case 'skills':
      return 'List your professional skills and expertise';
    case 'languages':
      return 'Add languages you speak and your proficiency level';
    case 'certifications':
      return 'Include professional certifications and achievements';
    case 'settings':
      return 'Customize the appearance of your portfolio';
    default:
      return '';
  }
}

export default FormWizard;