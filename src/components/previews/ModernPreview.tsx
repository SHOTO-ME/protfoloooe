import React from 'react';
import { UserData } from '../../types/userData';
import { Mail, Phone, MapPin, Github, Linkedin, Globe, Twitter } from 'lucide-react';

interface ModernPreviewProps {
  userData: UserData;
}

const ModernPreview: React.FC<ModernPreviewProps> = ({ userData }) => {
  const { personal, experience, education, skills, projects, languages, certifications } = userData;
  
  // Helper function to format date
  const formatDate = (dateString: string, current: boolean = false) => {
    if (!dateString && current) return 'Present';
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };
  
  // Get featured projects
  const featuredProjects = projects.filter(project => project.featured);
  
  // Group skills by category
  const groupedSkills: Record<string, typeof skills> = {};
  skills.forEach(skill => {
    if (!groupedSkills[skill.category]) {
      groupedSkills[skill.category] = [];
    }
    groupedSkills[skill.category].push(skill);
  });
  
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{personal.name || 'Your Name'}</h1>
          <h2 className="text-xl md:text-2xl font-medium mb-6 opacity-90">{personal.title || 'Your Title'}</h2>
          
          <p className="text-lg max-w-2xl mb-8 opacity-85">
            {personal.bio || 'Add a professional summary in the Personal section to display here.'}
          </p>
          
          <div className="flex flex-wrap gap-y-2 gap-x-6">
            {personal.email && (
              <div className="flex items-center">
                <Mail size={18} className="mr-2" />
                <span>{personal.email}</span>
              </div>
            )}
            
            {personal.phone && (
              <div className="flex items-center">
                <Phone size={18} className="mr-2" />
                <span>{personal.phone}</span>
              </div>
            )}
            
            {personal.location && (
              <div className="flex items-center">
                <MapPin size={18} className="mr-2" />
                <span>{personal.location}</span>
              </div>
            )}
          </div>
          
          <div className="mt-6 flex space-x-4">
            {personal.socials.github && (
              <a href={personal.socials.github} target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                <Github size={24} />
              </a>
            )}
            
            {personal.socials.linkedin && (
              <a href={personal.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                <Linkedin size={24} />
              </a>
            )}
            
            {personal.socials.website && (
              <a href={personal.socials.website} target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                <Globe size={24} />
              </a>
            )}
            
            {personal.socials.twitter && (
              <a href={personal.socials.twitter} target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                <Twitter size={24} />
              </a>
            )}
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-12 px-6">
        {/* Experience Section */}
        {experience.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Experience</h2>
            
            <div className="space-y-8">
              {experience.map((exp) => (
                <div key={exp.id} className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-gray-300">
                  <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-blue-600 -translate-x-1/2"></div>
                  
                  <div className="mb-1.5">
                    <h3 className="text-xl font-semibold text-gray-800">{exp.position}</h3>
                    <div className="flex flex-wrap items-center text-gray-600">
                      <span className="font-medium">{exp.company}</span>
                      {exp.location && (
                        <>
                          <span className="mx-2 text-gray-400">•</span>
                          <span>{exp.location}</span>
                        </>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {formatDate(exp.startDate)} - {formatDate(exp.endDate, exp.current)}
                    </div>
                  </div>
                  
                  {exp.description && (
                    <p className="text-gray-700 mb-3">{exp.description}</p>
                  )}
                  
                  {exp.achievements.length > 0 && exp.achievements[0] !== '' && (
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
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
        
        {/* Projects Section */}
        {featuredProjects.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Featured Projects</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredProjects.map((project) => (
                <div key={project.id} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm border border-gray-200">
                  {project.image && (
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-48 object-cover"
                    />
                  )}
                  
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                    
                    {project.description && (
                      <p className="text-gray-700 mb-3 text-sm">{project.description}</p>
                    )}
                    
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.technologies.map((tech, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex space-x-3 mt-3">
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-blue-600 hover:text-blue-800"
                        >
                          View Live
                        </a>
                      )}
                      
                      {project.repoUrl && (
                        <a 
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-blue-600 hover:text-blue-800"
                        >
                          Source Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {projects.length > featuredProjects.length && (
              <div className="mt-6 text-center">
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  View All Projects ({projects.length})
                </button>
              </div>
            )}
          </section>
        )}
        
        {/* Skills & Education Split Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Skills Section */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Skills</h2>
              
              <div className="space-y-6">
                {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                  <div key={category}>
                    <h3 className="text-lg font-medium mb-3 text-gray-700">{category}</h3>
                    
                    <div className="space-y-2">
                      {categorySkills.map((skill) => (
                        <div key={skill.id} className="flex items-center">
                          <div className="w-full">
                            <div className="flex justify-between mb-1">
                              <span className="text-gray-800">{skill.name}</span>
                              <span className="text-sm text-gray-500">
                                {skill.level === 1 && 'Beginner'}
                                {skill.level === 2 && 'Intermediate'}
                                {skill.level === 3 && 'Advanced'}
                                {skill.level === 4 && 'Expert'}
                                {skill.level === 5 && 'Master'}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div 
                                className="bg-blue-600 h-1.5 rounded-full" 
                                style={{ width: `${skill.level * 20}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Education Section */}
          {education.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Education</h2>
              
              <div className="space-y-6">
                {education.map((edu) => (
                  <div key={edu.id} className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-gray-300">
                    <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-blue-600 -translate-x-1/2"></div>
                    
                    <h3 className="text-lg font-semibold text-gray-800">{edu.degree}</h3>
                    
                    <div className="flex flex-wrap text-gray-600">
                      <span className="font-medium">{edu.institution}</span>
                      {edu.location && (
                        <>
                          <span className="mx-2 text-gray-400">•</span>
                          <span>{edu.location}</span>
                        </>
                      )}
                    </div>
                    
                    <div className="text-sm text-gray-500 mt-1">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate, edu.current)}
                    </div>
                    
                    {edu.field && (
                      <div className="text-gray-700 mt-1">
                        Field: {edu.field}
                        {edu.gpa && ` • GPA: ${edu.gpa}`}
                      </div>
                    )}
                    
                    {edu.description && (
                      <p className="text-sm text-gray-600 mt-2">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
        
        {/* Languages & Certifications Split Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Languages Section */}
          {languages.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Languages</h2>
              
              <div className="space-y-4">
                {languages.map((language) => (
                  <div key={language.id} className="flex justify-between items-center">
                    <span className="text-gray-800">{language.name}</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {language.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Certifications Section */}
          {certifications.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Certifications</h2>
              
              <div className="space-y-4">
                {certifications.map((cert) => (
                  <div key={cert.id} className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-gray-300">
                    <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-blue-600 -translate-x-1/2"></div>
                    
                    <h3 className="font-medium text-gray-800">{cert.name}</h3>
                    <div className="text-gray-600">{cert.issuer}</div>
                    <div className="text-sm text-gray-500">
                      {formatDate(cert.date)}
                      {cert.expiry && ` - ${formatDate(cert.expiry)}`}
                    </div>
                    
                    {cert.url && (
                      <a 
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 mt-1 inline-block"
                      >
                        View Certificate
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8 px-6 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} {personal.name || 'Your Name'}. All rights reserved.</p>
        <p className="mt-2">Made with Portfolio Pro</p>
      </footer>
    </div>
  );
};

export default ModernPreview;