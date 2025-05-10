import React from 'react';
import { UserData } from '../../types/userData';
import { Mail, Phone, MapPin, Github, Linkedin, Globe, Twitter } from 'lucide-react';

interface CVPreviewProps {
  userData: UserData;
}

const CVPreview: React.FC<CVPreviewProps> = ({ userData }) => {
  const { personal, experience, education, skills, projects, languages, certifications } = userData;
  
  // Helper function to format date
  const formatDate = (dateString: string, current: boolean = false) => {
    if (!dateString && current) return 'Present';
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };
  
  // Group skills by category
  const groupedSkills: Record<string, typeof skills> = {};
  skills.forEach(skill => {
    if (!groupedSkills[skill.category]) {
      groupedSkills[skill.category] = [];
    }
    groupedSkills[skill.category].push(skill);
  });
  
  // Get featured projects
  const featuredProjects = projects.filter(project => project.featured).slice(0, 3);
  
  return (
    <div className="bg-white shadow-md max-w-4xl mx-auto print:shadow-none">
      {/* CV Header */}
      <header className="px-8 py-8 border-b border-gray-200 print:py-6">
        <div className="flex flex-wrap md:flex-nowrap justify-between items-start gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">{personal.name || 'Your Name'}</h1>
            <h2 className="text-xl text-gray-700 mb-3">{personal.title || 'Your Title'}</h2>
            
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {personal.email && (
                <div className="flex items-center text-gray-700">
                  <Mail size={14} className="mr-1.5 text-gray-500" />
                  <span>{personal.email}</span>
                </div>
              )}
              
              {personal.phone && (
                <div className="flex items-center text-gray-700">
                  <Phone size={14} className="mr-1.5 text-gray-500" />
                  <span>{personal.phone}</span>
                </div>
              )}
              
              {personal.location && (
                <div className="flex items-center text-gray-700">
                  <MapPin size={14} className="mr-1.5 text-gray-500" />
                  <span>{personal.location}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex gap-3">
            {personal.socials.github && (
              <a href={personal.socials.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                <Github size={18} />
              </a>
            )}
            
            {personal.socials.linkedin && (
              <a href={personal.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                <Linkedin size={18} />
              </a>
            )}
            
            {personal.socials.website && (
              <a href={personal.socials.website} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                <Globe size={18} />
              </a>
            )}
            
            {personal.socials.twitter && (
              <a href={personal.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                <Twitter size={18} />
              </a>
            )}
          </div>
        </div>
        
        {personal.bio && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Professional Summary</h3>
            <p className="text-gray-700">{personal.bio}</p>
          </div>
        )}
      </header>
      
      {/* Main CV Content */}
      <div className="px-8 py-6">
        {/* Work Experience */}
        {experience.length > 0 && (
          <section className="mb-8 print:mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">
              Professional Experience
            </h2>
            
            <div className="space-y-6 print:space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex flex-wrap justify-between items-baseline">
                    <h3 className="text-base font-bold text-gray-900">{exp.position}</h3>
                    <span className="text-sm text-gray-600">
                      {formatDate(exp.startDate)} - {formatDate(exp.endDate, exp.current)}
                    </span>
                  </div>
                  
                  <div className="text-base text-gray-700 mb-1">{exp.company}, {exp.location}</div>
                  
                  {exp.description && (
                    <p className="text-sm text-gray-600 mb-2">{exp.description}</p>
                  )}
                  
                  {exp.achievements.length > 0 && exp.achievements[0] !== '' && (
                    <ul className="list-disc list-outside ml-4 text-sm text-gray-700 space-y-0.5">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Education */}
        {education.length > 0 && (
          <section className="mb-8 print:mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">
              Education
            </h2>
            
            <div className="space-y-4 print:space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex flex-wrap justify-between items-baseline">
                    <h3 className="text-base font-bold text-gray-900">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                    <span className="text-sm text-gray-600">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate, edu.current)}
                    </span>
                  </div>
                  
                  <div className="text-base text-gray-700">{edu.institution}, {edu.location}</div>
                  
                  {edu.gpa && (
                    <div className="text-sm text-gray-600">GPA: {edu.gpa}</div>
                  )}
                  
                  {edu.description && (
                    <p className="text-sm text-gray-600 mt-1">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Skills */}
        {skills.length > 0 && (
          <section className="mb-8 print:mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">
              Skills
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:gap-3">
              {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                <div key={category}>
                  <h3 className="text-base font-semibold mb-2 text-gray-800">{category}</h3>
                  
                  <div className="text-sm">
                    {categorySkills.map((skill, index) => (
                      <span key={skill.id}>
                        {skill.name}{index < categorySkills.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Projects */}
        {featuredProjects.length > 0 && (
          <section className="mb-8 print:mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">
              Featured Projects
            </h2>
            
            <div className="space-y-4">
              {featuredProjects.map((project) => (
                <div key={project.id}>
                  <div className="flex flex-wrap justify-between items-baseline">
                    <h3 className="text-base font-bold text-gray-900">{project.title}</h3>
                    
                    {(project.startDate || project.endDate) && (
                      <span className="text-sm text-gray-600">
                        {formatDate(project.startDate)}
                        {(project.startDate && project.endDate) && ' - '}
                        {formatDate(project.endDate)}
                      </span>
                    )}
                  </div>
                  
                  {project.description && (
                    <p className="text-sm text-gray-600 mb-1">{project.description}</p>
                  )}
                  
                  {project.technologies.length > 0 && (
                    <div className="text-sm text-gray-700">
                      <span className="font-medium">Technologies:</span> {project.technologies.join(', ')}
                    </div>
                  )}
                  
                  <div className="mt-1 flex space-x-4 text-sm">
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Live Demo
                      </a>
                    )}
                    
                    {project.repoUrl && (
                      <a 
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Source Code
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Additional Sections in 2-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:gap-4">
          {/* Languages */}
          {languages.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
                Languages
              </h2>
              
              <ul className="space-y-1">
                {languages.map((language) => (
                  <li key={language.id} className="flex justify-between items-center">
                    <span className="text-gray-800">{language.name}</span>
                    <span className="text-gray-600 text-sm">{language.proficiency}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
          
          {/* Certifications */}
          {certifications.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
                Certifications
              </h2>
              
              <ul className="space-y-2">
                {certifications.map((cert) => (
                  <li key={cert.id}>
                    <div className="font-medium text-gray-800">{cert.name}</div>
                    <div className="text-sm text-gray-700">{cert.issuer}</div>
                    <div className="text-sm text-gray-600">
                      {formatDate(cert.date)}
                      {cert.expiry && ` - ${formatDate(cert.expiry)}`}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
      
      {/* CV Footer - Only visible in print */}
      <footer className="px-8 py-4 text-center text-gray-500 text-xs border-t border-gray-200 print:block hidden">
        <p>This CV was generated using Portfolio Pro. Last updated: {new Date().toLocaleDateString()}</p>
      </footer>
    </div>
  );
};

export default CVPreview;