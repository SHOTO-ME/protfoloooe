import React from 'react';
import { UserData } from '../../types/userData';
import { Mail, Phone, MapPin, Github, Linkedin, Globe, Twitter, ArrowRight } from 'lucide-react';

interface CreativePreviewProps {
  userData: UserData;
}

const CreativePreview: React.FC<CreativePreviewProps> = ({ userData }) => {
  const { personal, experience, education, skills, projects, languages, certifications } = userData;
  
  // Helper function to format date
  const formatDate = (dateString: string, current: boolean = false) => {
    if (!dateString && current) return 'Present';
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };
  
  // Get three most recent projects
  const recentProjects = [...projects].sort((a, b) => {
    const dateA = a.endDate ? new Date(a.endDate).getTime() : new Date().getTime();
    const dateB = b.endDate ? new Date(b.endDate).getTime() : new Date().getTime();
    return dateB - dateA;
  }).slice(0, 3);
  
  // Get skills with highest levels
  const topSkills = [...skills].sort((a, b) => b.level - a.level).slice(0, 6);
  
  return (
    <div className="bg-white">
      {/* Hero Section with Diagonal Split */}
      <section className="relative overflow-hidden bg-black text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-900"></div>
        
        <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-28 lg:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
                {personal.name || 'Your Name'}
              </h1>
              <h2 className="text-xl md:text-2xl font-medium mb-6 text-purple-200">
                {personal.title || 'Your Title'}
              </h2>
              
              <p className="text-lg max-w-lg leading-relaxed mb-8 text-white/90">
                {personal.bio || 'Add a professional summary in the Personal section to display here.'}
              </p>
              
              <div className="flex space-x-4 mb-8">
                {personal.socials.github && (
                  <a 
                    href={personal.socials.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <Github size={20} />
                  </a>
                )}
                
                {personal.socials.linkedin && (
                  <a 
                    href={personal.socials.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <Linkedin size={20} />
                  </a>
                )}
                
                {personal.socials.website && (
                  <a 
                    href={personal.socials.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <Globe size={20} />
                  </a>
                )}
                
                {personal.socials.twitter && (
                  <a 
                    href={personal.socials.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <Twitter size={20} />
                  </a>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {personal.email && (
                  <div className="flex items-center">
                    <Mail size={18} className="mr-2 text-purple-300" />
                    <span>{personal.email}</span>
                  </div>
                )}
                
                {personal.phone && (
                  <div className="flex items-center">
                    <Phone size={18} className="mr-2 text-purple-300" />
                    <span>{personal.phone}</span>
                  </div>
                )}
              </div>
              
              {personal.location && (
                <div className="flex items-center mt-4">
                  <MapPin size={18} className="mr-2 text-purple-300" />
                  <span>{personal.location}</span>
                </div>
              )}
            </div>
            
            <div className="hidden md:block">
              <div className="relative">
                <div className="h-80 w-80 bg-purple-300/20 rounded-full backdrop-blur-md mx-auto"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-white mb-4">
                      {experience.length > 0 ? experience.length : 'X'}
                    </div>
                    <div className="text-lg text-purple-200">Years of experience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }}></div>
      </section>
      
      {/* About Section with Top Skills */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900 inline-block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-1/2 after:h-1 after:bg-purple-600">
                About Me
              </h2>
              
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                {personal.bio || 'Add details about yourself, your career journey, and what drives you professionally.'}
              </p>
              
              {topSkills.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Top Skills</h3>
                  
                  <div className="flex flex-wrap gap-3">
                    {topSkills.map((skill) => (
                      <span 
                        key={skill.id}
                        className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-6">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 inline-block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-1/2 after:h-1 after:bg-purple-600">
                Experience
              </h2>
              
              {experience.slice(0, 2).map((exp) => (
                <div key={exp.id} className="bg-gray-50 rounded-lg p-6 transition-all hover:shadow-md">
                  <div className="flex justify-between flex-wrap mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                    <span className="text-sm text-gray-500">
                      {formatDate(exp.startDate)} - {formatDate(exp.endDate, exp.current)}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-1">{exp.company}{exp.location && `, ${exp.location}`}</p>
                  
                  {exp.description && (
                    <p className="text-gray-600 mt-3 text-sm">{exp.description}</p>
                  )}
                </div>
              ))}
              
              {experience.length > 2 && (
                <div className="text-right">
                  <button className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium">
                    See all experience
                    <ArrowRight size={16} className="ml-1" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Projects Section with Cards */}
      {recentProjects.length > 0 && (
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-2 text-gray-900">Featured Projects</h2>
            <p className="text-lg text-gray-600 mb-12">Check out some of my recent work</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentProjects.map((project) => (
                <div key={project.id} className="bg-white rounded-xl overflow-hidden shadow-md group hover:shadow-xl transition-shadow">
                  {project.image ? (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <span className="text-gray-500 text-lg">No Image</span>
                    </div>
                  )}
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-900">{project.title}</h3>
                    
                    {project.description && (
                      <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                    )}
                    
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 3).map((tech, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                            +{project.technologies.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                    
                    <div className="flex space-x-4">
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-600 hover:text-purple-800 font-medium text-sm"
                        >
                          View Live
                        </a>
                      )}
                      
                      {project.repoUrl && (
                        <a 
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-600 hover:text-purple-800 font-medium text-sm"
                        >
                          Source Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {projects.length > 3 && (
              <div className="mt-12 text-center">
                <button className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors">
                  View All Projects
                  <ArrowRight size={16} className="ml-2" />
                </button>
              </div>
            )}
          </div>
        </section>
      )}
      
      {/* Skills & Education Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Education Section */}
            {education.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold mb-8 text-gray-900 inline-block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-1/2 after:h-1 after:bg-purple-600">
                  Education
                </h2>
                
                <div className="space-y-6">
                  {education.map((edu) => (
                    <div key={edu.id} className="relative pl-6 pb-6 before:absolute before:top-0 before:bottom-0 before:left-0 before:w-px before:bg-gray-300">
                      <div className="absolute top-0 left-0 w-2 h-2 rounded-full bg-purple-600 -translate-x-1/2"></div>
                      
                      <div className="flex justify-between flex-wrap mb-1">
                        <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                        <span className="text-sm text-gray-500">
                          {formatDate(edu.startDate)} - {formatDate(edu.endDate, edu.current)}
                        </span>
                      </div>
                      
                      <p className="text-gray-700">{edu.institution}</p>
                      {edu.field && <p className="text-gray-600">{edu.field}</p>}
                      
                      {edu.gpa && (
                        <p className="text-gray-600 text-sm mt-1">GPA: {edu.gpa}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Certifications & Languages */}
            <div>
              {certifications.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-3xl font-bold mb-8 text-gray-900 inline-block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-1/2 after:h-1 after:bg-purple-600">
                    Certifications
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {certifications.map((cert) => (
                      <div key={cert.id} className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-bold text-gray-800 mb-1">{cert.name}</h3>
                        <p className="text-gray-600 text-sm">{cert.issuer}</p>
                        <p className="text-gray-500 text-sm">
                          {formatDate(cert.date)}
                          {cert.expiry && ` - ${formatDate(cert.expiry)}`}
                        </p>
                        
                        {cert.url && (
                          <a 
                            href={cert.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-600 hover:text-purple-800 text-sm mt-1 inline-block"
                          >
                            View Certificate
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {languages.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold mb-8 text-gray-900 inline-block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-1/2 after:h-1 after:bg-purple-600">
                    Languages
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {languages.map((language) => (
                      <div key={language.id} className="space-y-1">
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-800">{language.name}</span>
                          <span className="text-sm text-gray-600">{language.proficiency}</span>
                        </div>
                        
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-purple-600 rounded-full"
                            style={{ 
                              width: language.proficiency === 'Native' ? '100%' : 
                                    language.proficiency === 'Fluent' ? '90%' :
                                    language.proficiency === 'Proficient' ? '75%' :
                                    language.proficiency === 'Intermediate' ? '60%' :
                                    language.proficiency === 'Conversational' ? '40%' : '20%' 
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-20 px-6 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Interested in working together? Feel free to reach out using the contact information below.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-10">
            {personal.email && (
              <a 
                href={`mailto:${personal.email}`}
                className="flex items-center text-gray-100 hover:text-white group"
              >
                <div className="w-12 h-12 rounded-full bg-gray-800 group-hover:bg-purple-600 flex items-center justify-center mr-3 transition-colors">
                  <Mail size={20} />
                </div>
                <span>{personal.email}</span>
              </a>
            )}
            
            {personal.phone && (
              <a 
                href={`tel:${personal.phone}`}
                className="flex items-center text-gray-100 hover:text-white group"
              >
                <div className="w-12 h-12 rounded-full bg-gray-800 group-hover:bg-purple-600 flex items-center justify-center mr-3 transition-colors">
                  <Phone size={20} />
                </div>
                <span>{personal.phone}</span>
              </a>
            )}
          </div>
          
          <div className="flex justify-center space-x-6">
            {personal.socials.github && (
              <a 
                href={personal.socials.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <Github size={24} />
              </a>
            )}
            
            {personal.socials.linkedin && (
              <a 
                href={personal.socials.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <Linkedin size={24} />
              </a>
            )}
            
            {personal.socials.website && (
              <a 
                href={personal.socials.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <Globe size={24} />
              </a>
            )}
            
            {personal.socials.twitter && (
              <a 
                href={personal.socials.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <Twitter size={24} />
              </a>
            )}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 px-6 bg-black text-center text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} {personal.name || 'Your Name'}. All rights reserved.</p>
        <p className="mt-2">Created with PortfolioX</p>
      </footer>
    </div>
  );
};

export default CreativePreview;