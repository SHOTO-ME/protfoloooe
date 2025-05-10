import { UserData } from '../types/userData';

export const defaultUserData: UserData = {
  personal: {
    name: 'John Doe',
    title: 'Senior Software Engineer',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Dedicated software engineer with 8+ years of experience in building scalable web applications. Passionate about clean code, performance optimization, and user experience.',
    socials: {
      github: 'https://github.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe',
      twitter: 'https://twitter.com/johndoe',
      website: 'https://johndoe.com'
    }
  },
  experience: [
    {
      id: '1',
      company: 'Tech Innovations Inc.',
      position: 'Senior Software Engineer',
      location: 'San Francisco, CA',
      startDate: '2020-01',
      endDate: '',
      current: true,
      description: 'Lead developer for the company\'s flagship product, a cloud-based project management solution.',
      achievements: [
        'Architected and implemented a microservices-based backend that improved scalability by 300%',
        'Led a team of 4 engineers to deliver a complete redesign of the user interface',
        'Reduced loading times by 65% through code optimization and implementing CDN caching strategies'
      ]
    },
    {
      id: '2',
      company: 'WebDev Solutions',
      position: 'Full Stack Developer',
      location: 'New York, NY',
      startDate: '2016-03',
      endDate: '2019-12',
      current: false,
      description: 'Developed and maintained various client projects using React, Node.js, and PostgreSQL.',
      achievements: [
        'Built a custom e-commerce platform that increased client conversion rates by 25%',
        'Implemented automated testing that reduced bugs in production by 40%',
        'Mentored junior developers and led technical training sessions'
      ]
    }
  ],
  education: [
    {
      id: '1',
      institution: 'University of California, Berkeley',
      degree: 'Master of Science',
      field: 'Computer Science',
      location: 'Berkeley, CA',
      startDate: '2014-09',
      endDate: '2016-05',
      current: false,
      description: 'Specialized in Artificial Intelligence and Distributed Systems.',
      gpa: '3.8/4.0'
    },
    {
      id: '2',
      institution: 'Stanford University',
      degree: 'Bachelor of Science',
      field: 'Computer Engineering',
      location: 'Stanford, CA',
      startDate: '2010-09',
      endDate: '2014-05',
      current: false,
      description: 'Graduated with honors. Active member of the ACM student chapter.',
      gpa: '3.7/4.0'
    }
  ],
  projects: [
    {
      id: '1',
      title: 'E-commerce Platform',
      description: 'A full-featured e-commerce platform with product management, shopping cart, and payment processing capabilities.',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
      liveUrl: 'https://example-ecommerce.com',
      repoUrl: 'https://github.com/johndoe/ecommerce-platform',
      image: 'https://images.pexels.com/photos/34577/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      startDate: '2021-03',
      endDate: '2021-07',
      featured: true
    },
    {
      id: '2',
      title: 'Task Management App',
      description: 'A Kanban-style task management application with drag-and-drop functionality and real-time updates.',
      technologies: ['React', 'Firebase', 'Tailwind CSS', 'React DnD'],
      liveUrl: 'https://taskmanager-demo.web.app',
      repoUrl: 'https://github.com/johndoe/task-manager',
      image: 'https://images.pexels.com/photos/3243/pen-calendar-to-do-checklist.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      startDate: '2020-10',
      endDate: '2020-12',
      featured: true
    },
    {
      id: '3',
      title: 'Weather Forecast App',
      description: 'A mobile-responsive weather application that provides current conditions and 5-day forecasts based on user location.',
      technologies: ['JavaScript', 'HTML5', 'CSS3', 'OpenWeather API'],
      liveUrl: 'https://weather-forecast-app.demo.com',
      repoUrl: 'https://github.com/johndoe/weather-app',
      image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      startDate: '2020-05',
      endDate: '2020-06',
      featured: false
    }
  ],
  skills: [
    {
      id: '1',
      name: 'React',
      level: 5,
      category: 'Frontend'
    },
    {
      id: '2',
      name: 'JavaScript',
      level: 5,
      category: 'Frontend'
    },
    {
      id: '3',
      name: 'TypeScript',
      level: 4,
      category: 'Frontend'
    },
    {
      id: '4',
      name: 'HTML/CSS',
      level: 4,
      category: 'Frontend'
    },
    {
      id: '5',
      name: 'Node.js',
      level: 4,
      category: 'Backend'
    },
    {
      id: '6',
      name: 'Express',
      level: 4,
      category: 'Backend'
    },
    {
      id: '7',
      name: 'MongoDB',
      level: 3,
      category: 'Backend'
    },
    {
      id: '8',
      name: 'PostgreSQL',
      level: 3,
      category: 'Backend'
    },
    {
      id: '9',
      name: 'Docker',
      level: 3,
      category: 'DevOps'
    },
    {
      id: '10',
      name: 'AWS',
      level: 3,
      category: 'DevOps'
    },
    {
      id: '11',
      name: 'Git',
      level: 4,
      category: 'DevOps'
    }
  ],
  languages: [
    {
      id: '1',
      name: 'English',
      proficiency: 'Native'
    },
    {
      id: '2',
      name: 'Spanish',
      proficiency: 'Fluent'
    },
    {
      id: '3',
      name: 'French',
      proficiency: 'Intermediate'
    }
  ],
  certifications: [
    {
      id: '1',
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2021-03',
      expiry: '2024-03',
      url: 'https://www.certmetrics.com/amazon/public/badge.aspx'
    },
    {
      id: '2',
      name: 'Microsoft Certified: Azure Developer Associate',
      issuer: 'Microsoft',
      date: '2020-08',
      expiry: '2023-08',
      url: 'https://www.microsoft.com/en-us/learning/certification-dashboard.aspx'
    }
  ],
  settings: {
    theme: 'blue',
    font: 'inter',
    template: 'modern',
    darkMode: false
  }
};