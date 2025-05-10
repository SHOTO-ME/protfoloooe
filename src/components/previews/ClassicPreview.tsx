import React from 'react';
import { UserData } from '../../types/userData';
import { Mail, Phone, MapPin, Github, Linkedin, Globe, Twitter } from 'lucide-react';

interface ClassicPreviewProps {
  userData: UserData;
}

const ClassicPreview: React.FC<ClassicPreviewProps> = ({ userData }) => {
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
  
  return (
    <div className="bg-white shadow-lg">
      {/* Header */}
      <header className="bg-gray-100 py-10 px-6 border-b border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{personal.name || 'Your Name'}</h1>
          <h2 className="text-xl text-gray-700 mb-6">{personal.title || 'Your Title'}</h2>
          
          <p className="max-w-2xl mx-auto text-gray-600 mb-8">
            {personal.bio || 'Add a professional summary in the Personal section to display here.'}
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            {personal.email && (
              <div className="flex items-center text-gray-700">
                <Mail size={18} className="mr-2 text-gray-500" />
                <span>{personal.email}</span>
              </div>
            )}
            
            {personal.phone && (
              <div className="flex items-center text-gray-700">
                <Phone size={18} className="mr-2 text-gray-500" />
                <span>{personal.phone}</span>
              </div>
            )}
            
            {personal.location && (
              <div className="flex items-center text-gray-700">
                <MapPin size={18} className="mr-2 text-gray-500" />
                <span>{personal.location}</span>
              </div>
            )}
          </div>
          
          <div className="mt-6 flex justify-center space-x-5">
            {personal.socials.github && (
              <a href={personal.socials.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                <Github size={22} />
              </a>
            )}
            
            {personal.socials.linkedin && (
              <a href={personal.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                <Linkedin size={22} />
              </a>
            )}
            
            {personal.socials.website && (
              <a href={personal.socials.website} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                <Globe size={22} />
              </a>
            )}
            
            {personal.socials.twitter && (
              <a href={personal.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                <Twitter size={22} />
              </a>
            )}
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-10 px-6">
        {/* Experience Section */}
        {experience.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-6">Professional Experience</h2>
            
            <div className="space-y-8">
              {experience.map((exp) => (
                <div key={exp.id} className="border-l-4 border-gray-300 pl-6 py-1">
                  <div className="flex justify-between items-start flex-wrap">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                      <div className="text-lg text-gray-700">{exp.company}</div>
                    </div>
                    
                    <div className="text-right text-gray-600">
                      <div>{exp.location}</div>
                      <div>
                        {formatDate(exp.startDate)} - {formatDate(exp.endDate, exp.current)}
                      </div>
                    </div>
                  </div>
                  
                  {exp.description && (
                    <p className="mt-3 text-gray-700">{exp.description}</p>
                  )}
                  
                  {exp.achievements.length > 0 && exp.achievements[0] !== '' && (
                    <ul className="mt-3 list-disc list-inside space-y-1 text-gray-700">
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
        
        {/* Education Section */}
        {education.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-6">Education</h2>
            
            <div className="space-y-6">
              {education.map((edu) => (
                <div key={edu.id} className="border-l-4 border-gray-300 pl-6 py-1">
                  <div className="flex justify-between items-start flex-wrap">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                      <div className="text-lg text-gray-700">{edu.institution}</div>
                    </div>
                    
                    <div className="text-right text-gray-600">
                      <div>{edu.location}</div>
                      <div>
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate, edu.current)}
                      </div>
                      {edu.gpa && <div>GPA: {edu.gpa}</div>}
                    </div>
                  </div>
                  
                  {edu.description && (
                    <p className="mt-3 text-gray-700">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Skills Section */}
        {skills.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-6">Skills</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                <div key={category}>
                  <h3 className="text-lg font-bold mb-4 text-gray-800">{category}</h3>
                  
                  <ul className="space-y-2">
                    {categorySkills.map((skill) => (
                      <li key={skill.id} className="flex items-center">
                        <span className="text-gray-800">{skill.name}</span>
                        <div className="ml-2 flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-1.5 bg-gray-500" 
                            style={{ width: `${skill.level * 20}%` }}
                          ></div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Projects Section */}
        {projects.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-6">Projects</h2>
            
            <div className="space-y-6">
              {projects.map((project) => (
                <div key={project.id} className="border-l-4 border-gray-300 pl-6 py-1">
                  <div className="flex justify-between items-start flex-wrap">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                    </div>
                    
                    {(project.startDate || project.endDate) && (
                      <div className="text-right text-gray-600">
                        <div>
                          {formatDate(project.startDate)} 
                          {(project.startDate && project.endDate) && ' - '} 
                          {formatDate(project.endDate)}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {project.description && (
                    <p className="mt-2 text-gray-700">{project.description}</p>
                  )}
                  
                  {project.technologies.length > 0 && (
                    <div className="mt-2">
                      <span className="text-gray-700 font-medium">Technologies: </span>
                      <span className="text-gray-600">{project.technologies.join(', ')}</span>
                    </div>
                  )}
                  
                  <div className="mt-2 flex space-x-4">
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
        
        {/* Additional Information - Languages and Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Languages Section */}
          {languages.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-6">Languages</h2>
              
              <ul className="space-y-3">
                {languages.map((language) => (
                  <li key={language.id} className="flex justify-between items-center">
                    <span className="text-gray-800">{language.name}</span>
                    <span className="text-gray-600">{language.proficiency}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
          
          {/* Certifications Section */}
          {certifications.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-6">Certifications</h2>
              
              <ul className="space-y-4">
                {certifications.map((cert) => (
                  <li key={cert.id}>
                    <div className="font-bold text-gray-800">{cert.name}</div>
                    <div className="text-gray-700">{cert.issuer}</div>
                    <div className="text-gray-600">
                      {formatDate(cert.date)}
                      {cert.expiry && ` - ${formatDate(cert.expiry)}`}
                    </div>
                    
                    {cert.url && (
                      <a 
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        View Certificate
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-100 py-6 px-6 text-center text-gray-600 border-t border-gray-200">
        <p>© {new Date().getFullYear()} {personal.name || 'Your Name'}. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ClassicPreview;