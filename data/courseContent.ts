
export interface Course {
  id: string;
  name: string;
  description: string;
  duration: string;
  modules: number;
  chapters: number;
  progress: number;
  isLocked: boolean;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  track: string;
  instructor: string;
  learningObjectives: string[];
  prerequisites: string[];
  skills: string[];
}

export interface LearningTrack {
  id: string;
  name: string;
  description: string;
  progress: number;
  totalCourses: number;
  completedCourses: number;
  icon: string;
  color: string;
  courses: Course[];
}

export const learningTracks: LearningTrack[] = [
  {
    id: '1',
    name: 'Programming Fundamentals',
    description: 'Master the basics of programming logic and thinking',
    progress: 25,
    totalCourses: 3,
    completedCourses: 0,
    icon: 'bulb',
    color: '#2563eb',
    courses: [
      {
        id: '1',
        name: 'Basic Programming Concepts',
        description: 'Learn variables, data types, and basic programming structures',
        duration: '12 hours',
        modules: 4,
        chapters: 12,
        progress: 25,
        isLocked: false,
        difficulty: 'Beginner',
        track: 'Programming Fundamentals',
        instructor: 'Nova Code Academy',
        learningObjectives: [
          'Understand what programming is and how it works',
          'Learn about variables and different data types',
          'Master basic operations and expressions',
          'Use conditional statements to make decisions',
          'Implement loops for repetitive tasks'
        ],
        prerequisites: [],
        skills: ['Variables', 'Data Types', 'Conditionals', 'Loops', 'Basic Logic']
      },
      {
        id: '2',
        name: 'Algorithm Thinking',
        description: 'Develop logical thinking and problem-solving skills',
        duration: '15 hours',
        modules: 5,
        chapters: 15,
        progress: 0,
        isLocked: true,
        difficulty: 'Beginner',
        track: 'Programming Fundamentals',
        instructor: 'Nova Code Academy',
        learningObjectives: [
          'Understand algorithmic thinking',
          'Learn problem decomposition',
          'Master flowchart creation',
          'Practice pseudocode writing',
          'Solve complex problems step by step'
        ],
        prerequisites: ['Basic Programming Concepts'],
        skills: ['Algorithm Design', 'Problem Solving', 'Flowcharts', 'Pseudocode']
      },
      {
        id: '3',
        name: 'Problem Solving',
        description: 'Apply programming concepts to solve real-world problems',
        duration: '10 hours',
        modules: 4,
        chapters: 10,
        progress: 0,
        isLocked: true,
        difficulty: 'Beginner',
        track: 'Programming Fundamentals',
        instructor: 'Nova Code Academy',
        learningObjectives: [
          'Apply programming concepts to real problems',
          'Break down complex problems',
          'Design efficient solutions',
          'Test and debug solutions',
          'Optimize code performance'
        ],
        prerequisites: ['Basic Programming Concepts', 'Algorithm Thinking'],
        skills: ['Problem Analysis', 'Solution Design', 'Testing', 'Debugging', 'Optimization']
      }
    ]
  },
  {
    id: '2',
    name: 'Web Development',
    description: 'Build beautiful websites with HTML, CSS, and more',
    progress: 0,
    totalCourses: 3,
    completedCourses: 0,
    icon: 'globe',
    color: '#8b5cf6',
    courses: [
      {
        id: '4',
        name: 'Full HTML5',
        description: 'Master HTML5 and create structured web content',
        duration: '8 hours',
        modules: 3,
        chapters: 10,
        progress: 0,
        isLocked: false,
        difficulty: 'Beginner',
        track: 'Web Development',
        instructor: 'Nova Code Academy',
        learningObjectives: [
          'Understand HTML structure and syntax',
          'Create semantic web pages',
          'Use HTML5 new features',
          'Build forms and interactive elements',
          'Implement accessibility best practices'
        ],
        prerequisites: [],
        skills: ['HTML5', 'Semantic Markup', 'Forms', 'Accessibility', 'Web Standards']
      },
      {
        id: '5',
        name: 'CSS3 Styling',
        description: 'Style websites with modern CSS3 techniques',
        duration: '12 hours',
        modules: 4,
        chapters: 14,
        progress: 0,
        isLocked: true,
        difficulty: 'Beginner',
        track: 'Web Development',
        instructor: 'Nova Code Academy',
        learningObjectives: [
          'Master CSS selectors and properties',
          'Create responsive layouts',
          'Use CSS Grid and Flexbox',
          'Implement animations and transitions',
          'Apply modern CSS techniques'
        ],
        prerequisites: ['Full HTML5'],
        skills: ['CSS3', 'Responsive Design', 'Grid', 'Flexbox', 'Animations']
      },
      {
        id: '6',
        name: 'Responsive Design',
        description: 'Create websites that work on all devices',
        duration: '10 hours',
        modules: 3,
        chapters: 12,
        progress: 0,
        isLocked: true,
        difficulty: 'Intermediate',
        track: 'Web Development',
        instructor: 'Nova Code Academy',
        learningObjectives: [
          'Understand responsive design principles',
          'Use media queries effectively',
          'Create mobile-first designs',
          'Optimize for different screen sizes',
          'Test across multiple devices'
        ],
        prerequisites: ['Full HTML5', 'CSS3 Styling'],
        skills: ['Responsive Design', 'Media Queries', 'Mobile-First', 'Cross-Device Testing']
      }
    ]
  },
  {
    id: '3',
    name: 'Programming Languages',
    description: 'Learn popular programming languages',
    progress: 0,
    totalCourses: 3,
    completedCourses: 0,
    icon: 'code-slash',
    color: '#10b981',
    courses: [
      {
        id: '7',
        name: 'Java Basics',
        description: 'Learn Java programming from the ground up',
        duration: '20 hours',
        modules: 6,
        chapters: 18,
        progress: 0,
        isLocked: false,
        difficulty: 'Beginner',
        track: 'Programming Languages',
        instructor: 'Nova Code Academy',
        learningObjectives: [
          'Understand Java syntax and structure',
          'Learn object-oriented programming',
          'Work with classes and objects',
          'Handle exceptions and errors',
          'Build simple Java applications'
        ],
        prerequisites: ['Basic Programming Concepts'],
        skills: ['Java', 'OOP', 'Classes', 'Objects', 'Exception Handling']
      },
      {
        id: '8',
        name: 'Python Fundamentals',
        description: 'Master Python programming for beginners',
        duration: '18 hours',
        modules: 5,
        chapters: 16,
        progress: 0,
        isLocked: false,
        difficulty: 'Beginner',
        track: 'Programming Languages',
        instructor: 'Nova Code Academy',
        learningObjectives: [
          'Learn Python syntax and basics',
          'Work with data structures',
          'Use Python libraries',
          'Handle files and data',
          'Build practical Python projects'
        ],
        prerequisites: ['Basic Programming Concepts'],
        skills: ['Python', 'Data Structures', 'Libraries', 'File Handling', 'Project Development']
      },
      {
        id: '9',
        name: 'C++ Introduction',
        description: 'Get started with C++ programming',
        duration: '22 hours',
        modules: 7,
        chapters: 20,
        progress: 0,
        isLocked: true,
        difficulty: 'Intermediate',
        track: 'Programming Languages',
        instructor: 'Nova Code Academy',
        learningObjectives: [
          'Understand C++ syntax and features',
          'Learn memory management',
          'Work with pointers and references',
          'Use object-oriented features',
          'Build efficient C++ programs'
        ],
        prerequisites: ['Basic Programming Concepts', 'Java Basics'],
        skills: ['C++', 'Memory Management', 'Pointers', 'OOP', 'Performance Optimization']
      }
    ]
  },
  {
    id: '4',
    name: 'Developer Tools',
    description: 'Master essential development tools and workflows',
    progress: 0,
    totalCourses: 3,
    completedCourses: 0,
    icon: 'construct',
    color: '#f59e0b',
    courses: [
      {
        id: '10',
        name: 'Command Line Mastery',
        description: 'Master the command line for efficient development',
        duration: '6 hours',
        modules: 3,
        chapters: 8,
        progress: 0,
        isLocked: false,
        difficulty: 'Beginner',
        track: 'Developer Tools',
        instructor: 'Nova Code Academy',
        learningObjectives: [
          'Navigate the file system',
          'Use common command line tools',
          'Manage files and directories',
          'Automate tasks with scripts',
          'Understand command line workflows'
        ],
        prerequisites: [],
        skills: ['Command Line', 'File Management', 'Scripting', 'Automation', 'Terminal']
      },
      {
        id: '11',
        name: 'PowerShell Basics',
        description: 'Learn PowerShell for Windows automation',
        duration: '8 hours',
        modules: 3,
        chapters: 10,
        progress: 0,
        isLocked: true,
        difficulty: 'Beginner',
        track: 'Developer Tools',
        instructor: 'Nova Code Academy',
        learningObjectives: [
          'Understand PowerShell syntax',
          'Use cmdlets and functions',
          'Automate Windows tasks',
          'Work with objects and pipelines',
          'Create PowerShell scripts'
        ],
        prerequisites: ['Command Line Mastery'],
        skills: ['PowerShell', 'Windows Automation', 'Cmdlets', 'Scripting', 'Object Manipulation']
      },
      {
        id: '12',
        name: 'Git Version Control',
        description: 'Master Git for code version control',
        duration: '10 hours',
        modules: 4,
        chapters: 12,
        progress: 0,
        isLocked: true,
        difficulty: 'Intermediate',
        track: 'Developer Tools',
        instructor: 'Nova Code Academy',
        learningObjectives: [
          'Understand version control concepts',
          'Use Git commands effectively',
          'Manage branches and merges',
          'Collaborate with others',
          'Use GitHub and remote repositories'
        ],
        prerequisites: ['Command Line Mastery'],
        skills: ['Git', 'Version Control', 'Branching', 'Merging', 'GitHub', 'Collaboration']
      }
    ]
  }
];

export const findCourseById = (courseId: string): Course | undefined => {
  for (const track of learningTracks) {
    const course = track.courses.find(c => c.id === courseId);
    if (course) return course;
  }
  return undefined;
};

export const findTrackById = (trackId: string): LearningTrack | undefined => {
  return learningTracks.find(t => t.id === trackId);
};
