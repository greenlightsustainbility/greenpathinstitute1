import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header.jsx';
import Breadcrumbs from '../../components/ui/Breadcrumbs.jsx';
import CourseHero from './components/CourseHero.jsx';
import CourseModules from './components/CourseModules.jsx';
import CourseOverview from './components/CourseOverview.jsx';
import StudentTestimonials from './components/StudentTestimonials.jsx';
import InstructorProfile from './components/InstructorProfile.jsx';
import RelatedCourses from './components/RelatedCourses.jsx';

const CourseDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [userProgress, setUserProgress] = useState({});
  const [loading, setLoading] = useState(true);

  // Mock course data
  const mockCourse = {
    id: 'esg-fundamentals-2024',
    title: 'ESG Fundamentals for African Professionals',
    slug: 'esg-fundamentals-african-professionals',
    category: 'ESG Fundamentals',
    level: 'Beginner',
    certified: true,
    description: 'Master the fundamentals of Environmental, Social, and Governance (ESG) principles with a focus on African markets and regulatory frameworks.',
    fullDescription: `This comprehensive course provides a deep dive into ESG fundamentals specifically tailored for African professionals. You'll learn how to integrate ESG principles into business strategy, understand regulatory requirements across African markets, and develop practical skills for ESG reporting and implementation.\n\nThe course combines theoretical knowledge with real-world case studies from leading African companies, providing you with actionable insights that you can immediately apply in your professional role.`,
    duration: '8 weeks',
    videoHours: 12,
    resources: 25,
    moduleCount: 8,
    enrolledCount: 2847,
    rating: 4.8,
    reviewCount: 342,
    pricing: {
      USD: 299,
      EUR: 279,
      GBP: 249,
      NGN: 450000,
      ZAR: 5499
    },
    originalPrice: {
      USD: 399,
      EUR: 369,
      GBP: 329,
      NGN: 600000,
      ZAR: 7299
    },
    discount: 25,
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=450&fit=crop',
    instructor: {
      id: 'dr-amara-okafor',name: 'Dr. Amara Okafor',title: 'ESG Strategy Director',company: 'African Development Bank',experience: '15 years',avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
      bio: `Dr. Amara Okafor is a leading ESG expert with over 15 years of experience in sustainable finance and environmental policy across Africa. She has advised governments and corporations on ESG integration strategies and has been instrumental in developing ESG frameworks for emerging markets.\n\nDr. Okafor holds a PhD in Environmental Economics from the University of Cape Town and has published extensively on sustainable development in African contexts. She currently serves as ESG Strategy Director at the African Development Bank, where she leads initiatives to integrate ESG principles into development finance.`,
      stats: {
        studentsCount: 12500,
        coursesCount: 8,
        rating: 4.9,
        experience: 15
      },
      socialLinks: [
        { platform: 'Linkedin', url: 'https://linkedin.com/in/amara-okafor' },
        { platform: 'Twitter', url: 'https://twitter.com/amaraokafor' },
        { platform: 'Globe', url: 'https://amaraokafor.com' }
      ],
      expertise: [
        'ESG Strategy','Sustainable Finance','Environmental Policy','Climate Risk','Impact Measurement','Regulatory Compliance'
      ],
      education: [
        {
          degree: 'PhD in Environmental Economics',institution: 'University of Cape Town',year: '2008'
        },
        {
          degree: 'MSc in Development Finance',institution: 'London School of Economics',year: '2004'
        },
        {
          degree: 'BSc in Economics',institution: 'University of Ghana',year: '2002'
        }
      ],
      experience: [
        {
          position: 'ESG Strategy Director',company: 'African Development Bank',duration: '2020 - Present',description: 'Leading ESG integration across development finance operations and policy development.'
        },
        {
          position: 'Senior ESG Consultant',company: 'PwC Africa',duration: '2015 - 2020',description: 'Advised multinational corporations on ESG strategy and implementation across African markets.'
        },
        {
          position: 'Environmental Policy Analyst',company: 'UNEP',duration: '2010 - 2015',description: 'Developed environmental policy frameworks for sustainable development in emerging economies.'
        }
      ],
      achievements: [
        'Winner of the African ESG Leadership Award 2023','Published author of "ESG in Emerging Markets" (2022)','Keynote speaker at over 50 international conferences','Advisor to the African Union on sustainable finance policy','Featured expert in Financial Times and Bloomberg ESG coverage'
      ],
      otherCourses: [
        {
          title: 'Advanced ESG Reporting Standards',thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=150&fit=crop',
          rating: 4.7,
          studentCount: 1850,
          price: 399
        },
        {
          title: 'Climate Risk Assessment',thumbnail: 'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=200&h=150&fit=crop',
          rating: 4.9,
          studentCount: 2100,
          price: 449
        }
      ]
    },
    keyLearnings: [
      'Understand core ESG principles and frameworks','Navigate African regulatory landscapes','Develop ESG integration strategies','Create comprehensive ESG reports','Assess and manage ESG risks','Implement stakeholder engagement programs','Measure and track ESG performance','Build sustainable business models'
    ],
    features: [
      {
        icon: 'Video',title: 'HD Video Content',description: '12+ hours of professional video lectures'
      },
      {
        icon: 'FileText',title: 'Downloadable Resources',description: '25+ templates, guides, and frameworks'
      },
      {
        icon: 'Users',title: 'Community Access',description: 'Join our exclusive ESG professionals network'
      },
      {
        icon: 'Award',title: 'Certification',description: 'Industry-recognized certificate upon completion'
      },
      {
        icon: 'Clock',title: 'Lifetime Access',description: 'Learn at your own pace with permanent access'
      },
      {
        icon: 'Smartphone',title: 'Mobile Learning',description: 'Access content on any device, anywhere'
      }
    ],
    learningOutcomes: [
      {
        title: 'ESG Framework Mastery',description: 'Develop comprehensive understanding of ESG principles, standards, and best practices applicable to African business contexts.'
      },
      {
        title: 'Regulatory Compliance',description: 'Navigate complex regulatory requirements across different African jurisdictions and international ESG standards.'
      },
      {
        title: 'Strategic Implementation',description: 'Design and execute ESG strategies that align with business objectives and stakeholder expectations.'
      },
      {
        title: 'Risk Management',description: 'Identify, assess, and mitigate ESG-related risks while capitalizing on sustainable business opportunities.'
      },
      {
        title: 'Reporting Excellence',description: 'Create compelling ESG reports that meet international standards and effectively communicate impact to stakeholders.'
      }
    ],
    skills: [
      'ESG Analysis','Sustainability Reporting','Stakeholder Engagement','Risk Assessment','Data Analysis','Policy Development','Impact Measurement','Strategic Planning'
    ],
    prerequisites: {
      required: [],
      recommended: [
        'Basic understanding of business fundamentals','Familiarity with African business environment','Interest in sustainability and environmental issues'
      ]
    },
    technicalRequirements: [
      {
        icon: 'Monitor',title: 'Computer/Device',description: 'Desktop, laptop, tablet, or smartphone with internet access'
      },
      {
        icon: 'Wifi',title: 'Internet Connection',description: 'Stable broadband connection for video streaming'
      },
      {
        icon: 'Headphones',title: 'Audio Equipment',description: 'Headphones or speakers for optimal audio experience'
      },
      {
        icon: 'FileText',title: 'PDF Reader',description: 'Ability to view and download PDF documents'
      }
    ],
    certificate: {
      features: [
        'Unique certificate ID for verification','QR code for instant authentication','Digital signature and security features','Shareable on LinkedIn and social media','Downloadable PDF format','Lifetime validity'
      ],
      preview: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
    }
  };

  const mockModules = [
    {
      id: 'module-1',
      title: 'Introduction to ESG Principles',
      description: 'Foundational concepts of Environmental, Social, and Governance factors in business.',
      duration: 90,
      objectives: [
        'Define ESG and its importance in modern business',
        'Understand the evolution of ESG frameworks',
        'Identify key stakeholders in ESG implementation'
      ],
      lessons: [
        {
          id: 'lesson-1-1',
          title: 'What is ESG?',
          type: 'Video',
          duration: 15,
          hasQuiz: true,
          isPreview: true
        },
        {
          id: 'lesson-1-2',
          title: 'The Business Case for ESG',
          type: 'Video',
          duration: 20,
          hasQuiz: false,
          isPreview: false
        },
        {
          id: 'lesson-1-3',
          title: 'ESG Frameworks Overview',
          type: 'Video',
          duration: 25,
          hasQuiz: true,
          isPreview: false
        },
        {
          id: 'lesson-1-4',
          title: 'Stakeholder Mapping Exercise',
          type: 'Interactive',
          duration: 30,
          hasQuiz: false,
          isPreview: false
        }
      ]
    },
    {
      id: 'module-2',
      title: 'Environmental Factors in African Context',
      description: 'Deep dive into environmental considerations specific to African markets and challenges.',
      duration: 120,
      objectives: [
        'Analyze environmental challenges in Africa',
        'Understand climate risk assessment',
        'Learn environmental reporting standards'
      ],
      lessons: [
        {
          id: 'lesson-2-1',
          title: 'Climate Change in Africa',
          type: 'Video',
          duration: 25,
          hasQuiz: false,
          isPreview: false
        },
        {
          id: 'lesson-2-2',
          title: 'Water Resource Management',
          type: 'Video',
          duration: 20,
          hasQuiz: true,
          isPreview: false
        },
        {
          id: 'lesson-2-3',
          title: 'Biodiversity Conservation',
          type: 'Video',
          duration: 30,
          hasQuiz: false,
          isPreview: false
        },
        {
          id: 'lesson-2-4',
          title: 'Environmental Impact Assessment',
          type: 'Case Study',
          duration: 45,
          hasQuiz: true,
          isPreview: false
        }
      ]
    },
    {
      id: 'module-3',
      title: 'Social Impact and Community Engagement',
      description: 'Understanding social factors and community engagement strategies in ESG implementation.',
      duration: 105,
      objectives: [
        'Develop community engagement strategies',
        'Understand social impact measurement',
        'Learn about human rights in business'
      ],
      lessons: [
        {
          id: 'lesson-3-1',
          title: 'Community Engagement Best Practices',
          type: 'Video',
          duration: 30,
          hasQuiz: false,
          isPreview: false
        },
        {
          id: 'lesson-3-2',
          title: 'Human Rights Due Diligence',
          type: 'Video',
          duration: 25,
          hasQuiz: true,
          isPreview: false
        },
        {
          id: 'lesson-3-3',
          title: 'Social Impact Measurement',
          type: 'Interactive',
          duration: 35,
          hasQuiz: false,
          isPreview: false
        },
        {
          id: 'lesson-3-4',
          title: 'Case Study: Mining in Ghana',
          type: 'Case Study',
          duration: 15,
          hasQuiz: true,
          isPreview: false
        }
      ]
    }
  ];

  const mockTestimonials = [
    {
      id: 1,
      content: `This course completely transformed my understanding of ESG principles. Dr. Okafor's expertise and the African context made it incredibly relevant to my work. The practical frameworks and case studies were invaluable.`,
      rating: 5,
      completed: true,
      student: {
        name: 'Kwame Asante',title: 'Sustainability Manager',company: 'Ghana Commercial Bank',avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
      }
    },
    {
      id: 2,
      content: `Excellent course structure and content quality. The modules are well-organized and the instructor's experience really shows. I've already started implementing the ESG strategies in my organization.`,
      rating: 5,
      completed: true,
      student: {
        name: 'Fatima Al-Rashid',title: 'ESG Analyst',company: 'Standard Bank',avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
      }
    },
    {
      id: 3,
      content: `The African perspective on ESG is exactly what I was looking for. The course covers regulatory requirements across different countries and provides practical tools that I use daily in my consulting work.`,
      rating: 4,
      completed: true,
      student: {
        name: 'David Mwangi',title: 'ESG Consultant',company: 'KPMG Kenya',avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
      }
    },
    {
      id: 4,
      content: `Outstanding course! The combination of theory and practical application is perfect. Dr. Okafor's teaching style is engaging and the course materials are comprehensive. Highly recommended for anyone in sustainability.`,
      rating: 5,
      completed: true,
      student: {
        name: 'Amina Hassan',
        title: 'Corporate Affairs Director',
        company: 'Dangote Group',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
      }
    },
    {
      id: 5,
      content: `This course gave me the confidence to lead ESG initiatives at my company. The frameworks and tools provided are practical and immediately applicable. The certificate has also enhanced my professional credibility.`,
      rating: 5,
      completed: true,
      student: {
        name: 'Joseph Ochieng',
        title: 'Risk Manager',
        company: 'Equity Bank',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face'
      }
    },
    {
      id: 6,
      content: `The course exceeded my expectations. The content is current, relevant, and presented in an accessible way. The African case studies were particularly valuable for understanding local implementation challenges.`,
      rating: 4,
      completed: true,
      student: {
        name: 'Sarah Okonkwo',
        title: 'Investment Analyst',
        company: 'ARM Investment Managers',
        avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face'
      }
    }
  ];

  const mockCourseStats = {
    averageRating: 4.8,
    totalReviews: 342,
    completionRate: 87,
    recommendationRate: 94,
    ratingBreakdown: {
      5: 68,
      4: 22,
      3: 7,
      2: 2,
      1: 1
    }
  };

  const mockRelatedCourses = [
    {
      id: 'advanced-esg-reporting',
      title: 'Advanced ESG Reporting and Disclosure',
      description: 'Master advanced ESG reporting frameworks and disclosure requirements for African markets.',
      category: 'ESG Reporting',
      level: 'Intermediate',
      certified: true,
      duration: '6 weeks',
      enrolledCount: 1850,
      rating: 4.7,
      reviewCount: 198,
      pricing: { USD: 399, EUR: 369, GBP: 329, NGN: 600000, ZAR: 7299 },
      originalPrice: { USD: 499, EUR: 459, GBP: 409, NGN: 750000, ZAR: 9199 },
      discount: 20,
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop',
      instructor: {
        name: 'Prof. Michael Adebayo',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face'
      },
      isNew: false,
      hasQuiz: true,
      downloadableResources: true
    },
    {
      id: 'climate-risk-management',
      title: 'Climate Risk Assessment and Management',
      description: 'Learn to identify, assess, and manage climate-related risks in African business contexts.',
      category: 'Climate Risk',
      level: 'Advanced',
      certified: true,
      duration: '8 weeks',
      enrolledCount: 1245,
      rating: 4.9,
      reviewCount: 156,
      pricing: { USD: 449, EUR: 419, GBP: 369, NGN: 675000, ZAR: 8199 },
      thumbnail: 'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=400&h=225&fit=crop',
      instructor: {
        name: 'Dr. Amara Okafor',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face'
      },
      isNew: true,
      hasQuiz: true,
      downloadableResources: true
    },
    {
      id: 'sustainable-finance-africa',
      title: 'Sustainable Finance in African Markets',
      description: 'Explore sustainable finance instruments and green investment opportunities across Africa.',
      category: 'Sustainable Finance',
      level: 'Intermediate',
      certified: true,
      duration: '7 weeks',
      enrolledCount: 2100,
      rating: 4.6,
      reviewCount: 287,
      pricing: { USD: 349, EUR: 329, GBP: 289, NGN: 525000, ZAR: 6399 },
      originalPrice: { USD: 449, EUR: 419, GBP: 369, NGN: 675000, ZAR: 8199 },
      discount: 22,
      thumbnail: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=225&fit=crop',
      instructor: {
        name: 'Dr. Fatima Al-Zahra',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face'
      },
      isNew: false,
      hasQuiz: true,
      downloadableResources: true
    }
  ];

  const mockUserProgress = {
    'module-1': {
      completedLessons: ['lesson-1-1'],
      totalLessons: 4
    },
    'module-2': {
      completedLessons: [],
      totalLessons: 4
    },
    'module-3': {
      completedLessons: [],
      totalLessons: 4
    }
  };

  useEffect(() => {
    // Simulate API call
    const loadCourse = async () => {
      setLoading(true);
      try {
        // In real app, fetch course by slug
        setCourse(mockCourse);
        
        // Check enrollment status
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
          // Mock enrollment check
          setIsEnrolled(false); // Set to true to test enrolled state
          setUserProgress(mockUserProgress);
        }
      } catch (error) {
        console.error('Error loading course:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [slug]);

  const handleEnroll = () => {
    navigate('/checkout-flow', { 
      state: { 
        courseId: course?.id,
        courseTitle: course?.title,
        price: course?.pricing?.USD
      }
    });
  };

  const handlePreview = () => {
    // Mock video preview functionality
    alert('Video preview would open here. This is a 30-second preview of the course content.');
  };

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Courses', path: '/course-listing' },
    { label: course?.title || 'Course Detail', path: `/course-detail/${slug}`, isLast: true }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-text-secondary">Loading course details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-heading font-bold text-text-primary mb-4">
              Course Not Found
            </h1>
            <p className="text-text-secondary mb-6">
              The course you're looking for doesn't exist or has been removed.
            </p>
            <button
              onClick={() => navigate('/course-listing')}
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors duration-200"
            >
              Browse All Courses
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{course?.title} | GreenPath Institute</title>
        <meta name="description" content={course?.description} />
        <meta property="og:title" content={`${course?.title} | GreenPath Institute`} />
        <meta property="og:description" content={course?.description} />
        <meta property="og:image" content={course?.thumbnail} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${course?.title} | GreenPath Institute`} />
        <meta name="twitter:description" content={course?.description} />
        <meta name="twitter:image" content={course?.thumbnail} />
      </Helmet>
      <Header />
      <main className="pt-16">
        {/* Breadcrumbs */}
        <div className="bg-muted border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs customBreadcrumbs={breadcrumbItems} />
          </div>
        </div>

        {/* Course Hero Section */}
        <CourseHero
          course={course}
          onEnroll={handleEnroll}
          onPreview={handlePreview}
          isEnrolled={isEnrolled}
        />

        {/* Course Modules */}
        <CourseModules
          modules={mockModules}
          isEnrolled={isEnrolled}
          userProgress={userProgress}
        />

        {/* Course Overview */}
        <CourseOverview course={course} />

        {/* Student Testimonials */}
        <StudentTestimonials
          testimonials={mockTestimonials}
          courseStats={mockCourseStats}
        />

        {/* Instructor Profile */}
        <InstructorProfile instructor={course?.instructor} />

        {/* Related Courses */}
        <RelatedCourses
          courses={mockRelatedCourses}
          currentCourseId={course?.id}
        />
      </main>
    </div>
  );
};

export default CourseDetail;