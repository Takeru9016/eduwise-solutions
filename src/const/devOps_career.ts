export interface CareerTrackItem {
    id: number;
    title: string;
    description: string;
    details: string[];
  }
  
  export const careerTrackData: CareerTrackItem[] = [
    {
      id: 1,
      title: 'Profile and Resume Building',
      description: 'Create a professional profile that stands out to recruiters',
      details: [
        'Profile and Resume building',
        'Portfolio Building',
        'Build highly optimized Resumes and Cover Letters',
        'Build your LinkedIn Profile',
        'GitHub Profile Optimization',
        'Personal Branding Strategies',
        'ATS-Friendly Resume Creation',
        'Resume Review and Feedback Sessions',
      ],
    },
    {
      id: 2,
      title: 'Business Communication',
      description: 'Master professional communication skills for the workplace',
      details: [
        'Email Writing Etiquette',
        'Professional Presentation Skills',
        'Effective Team Communication',
        'Client Interaction Best Practices',
        'Meeting Management',
        'Conflict Resolution',
        'Cross-Cultural Communication',
        'Virtual Communication Tools',
        'Body Language and Non-Verbal Communication',
      ],
    },
    {
      id: 3,
      title: 'Competency Test',
      description: 'Assess and improve your technical and soft skills',
      details: [
        'Technical Assessment Tests',
        'Aptitude and Logical Reasoning',
        'Problem-Solving Exercises',
        'Coding Challenges',
        'System Design Questions',
        'Behavioral Assessment',
        'Time Management Tests',
        'Critical Thinking Evaluation',
        'Performance Analysis and Feedback',
      ],
    },
    {
      id: 4,
      title: 'Mock Interviews',
      description: 'Practice with industry experts to ace your interviews',
      details: [
        'One-on-One Mock Interviews',
        'Technical Interview Preparation',
        'HR Round Practice',
        'Behavioral Interview Questions',
        'System Design Interviews',
        'Coding Interview Practice',
        'Salary Negotiation Tips',
        'Post-Interview Follow-up',
        'Video Interview Best Practices',
        'Group Discussion Practice',
      ],
    },
    {
      id: 5,
      title: 'Job Application Strategy',
      description: 'Learn how to effectively search and apply for jobs',
      details: [
        'Job Portal Navigation',
        'Company Research Techniques',
        'Application Tracking',
        'Networking Strategies',
        'Referral Programs',
        'Cold Email Outreach',
        'Job Fair Preparation',
        'Freelancing Opportunities',
      ],
    },
    {
      id: 6,
      title: 'Interview Preparation',
      description: 'Comprehensive preparation for all interview rounds',
      details: [
        'Common Interview Questions',
        'STAR Method for Behavioral Questions',
        'Technical Deep Dives',
        'Project Explanation Techniques',
        'Handling Difficult Questions',
        'Interview Anxiety Management',
        'Dress Code and Grooming',
        'Virtual Interview Setup',
      ],
    },
    {
      id: 7,
      title: 'Placement Assistance',
      description: 'Dedicated support to help you land your dream job',
      details: [
        'Direct Company Referrals',
        'Placement Drives',
        'Campus Recruitment Support',
        'Startup Opportunities',
        'MNC Job Openings',
        'Contract and Full-Time Positions',
        'Remote Job Opportunities',
        'Internship to Full-Time Conversion',
        'Post-Placement Support',
      ],
    },
  ];