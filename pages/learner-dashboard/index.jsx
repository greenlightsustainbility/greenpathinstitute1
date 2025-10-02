import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header.jsx';
import CourseCard from './components/CourseCard.jsx';
import CertificateCard from './components/CertificateCard.jsx';
import AchievementMetrics from './components/AchievementMetrics.jsx';
import ActivityFeed from './components/ActivityFeed.jsx';
import QuickActions from './components/QuickActions.jsx';
import RecommendedCourses from './components/RecommendedCourses.jsx';
import UpcomingDeadlines from './components/UpcomingDeadlines.jsx';
import Icon from '../../components/AppIcon.jsx';
import Button from '../../components/ui/Button.jsx';

const LearnerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole');
    
    if (!token || userRole !== 'learner') {
      navigate('/login');
      return;
    }

    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);
  }, [navigate]);

  // Mock data
  const enrolledCourses = [
    {
      id: 1,
      title: "ESG Fundamentals for African Markets",
      thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
      progress: 65,
      duration: "8 hours",
      lessonsCompleted: 13,
      totalLessons: 20,
      nextLesson: "Module 4: Social Impact Measurement",
      estimatedCompletion: "3 days"
    },
    {
      id: 2,
      title: "Sustainable Finance and Green Bonds",
      thumbnail: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop",
      progress: 30,
      duration: "12 hours",
      lessonsCompleted: 6,
      totalLessons: 18,
      nextLesson: "Module 2: Green Bond Frameworks",
      estimatedCompletion: "1 week"
    },
    {
      id: 3,
      title: "Climate Risk Assessment",
      thumbnail: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=400&h=300&fit=crop",
      progress: 85,
      duration: "6 hours",
      lessonsCompleted: 15,
      totalLessons: 16,
      nextLesson: "Final Assessment",
      estimatedCompletion: "1 day"
    }
  ];

  const certificates = [
    {
      id: 1,
      courseName: "Corporate Sustainability Reporting",
      certId: "GP-20240915-CSR001",
      earnedDate: "September 15, 2024",
      score: 92,
      downloadUrl: "/certificates/GP-20240915-CSR001.pdf"
    },
    {
      id: 2,
      courseName: "Environmental Impact Assessment",
      certId: "GP-20240820-EIA002",
      earnedDate: "August 20, 2024",
      score: 88,
      downloadUrl: "/certificates/GP-20240820-EIA002.pdf"
    }
  ];

  const achievementMetrics = {
    totalHours: 45,
    coursesCompleted: 3,
    certificatesEarned: 2,
    currentLevel: "Intermediate"
  };

  const recentActivities = [
    {
      id: 1,
      type: "lesson_completed",
      description: "Completed lesson: Social Impact Measurement Frameworks",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      score: null
    },
    {
      id: 2,
      type: "quiz_passed",
      description: "Passed quiz: ESG Reporting Standards",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      score: 85
    },
    {
      id: 3,
      type: "certificate_earned",
      description: "Earned certificate: Corporate Sustainability Reporting",
      timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
      score: 92
    },
    {
      id: 4,
      type: "course_started",
      description: "Started new course: Climate Risk Assessment",
      timestamp: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // 20 days ago
      score: null
    }
  ];

  const recommendedCourses = [
    {
      id: 4,
      title: "Carbon Accounting and Net Zero Strategies",
      thumbnail: "https://images.pexels.com/photos/9800029/pexels-photo-9800029.jpeg?w=400&h=300&fit=crop",
      duration: "10 hours",
      enrolledCount: 1247,
      rating: 4.8,
      reviewCount: 156,
      price: 299,
      originalPrice: 399
    },
    {
      id: 5,
      title: "Biodiversity and Nature-based Solutions",
      thumbnail: "https://images.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_1280.jpg?w=400&h=300&fit=crop",
      duration: "8 hours",
      enrolledCount: 892,
      rating: 4.6,
      reviewCount: 98,
      price: 249,
      originalPrice: null
    },
    {
      id: 6,
      title: "Sustainable Supply Chain Management",
      thumbnail: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop",
      duration: "12 hours",
      enrolledCount: 1456,
      rating: 4.9,
      reviewCount: 203,
      price: 349,
      originalPrice: 449
    }
  ];

  const upcomingDeadlines = [
    {
      id: 1,
      title: "Final Assessment",
      courseName: "Climate Risk Assessment",
      courseId: 3,
      dueDate: "October 5, 2024",
      daysLeft: 5
    },
    {
      id: 2,
      title: "Module 5 Quiz",
      courseName: "ESG Fundamentals for African Markets",
      courseId: 1,
      dueDate: "October 8, 2024",
      daysLeft: 8
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'courses', label: 'My Courses', icon: 'BookOpen' },
    { id: 'certificates', label: 'Certificates', icon: 'Award' },
    { id: 'activity', label: 'Activity', icon: 'Activity' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="font-body text-muted-foreground">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="font-heading font-bold text-3xl text-foreground mb-2">
                  Welcome back, Sarah!
                </h1>
                <p className="font-body text-muted-foreground">
                  Continue your ESG and sustainability learning journey
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => navigate('/courses')}
                  iconName="Search"
                  iconPosition="left"
                >
                  Browse Courses
                </Button>
                <Button
                  variant="default"
                  onClick={() => navigate('/profile')}
                  iconName="Settings"
                  iconPosition="left"
                >
                  Settings
                </Button>
              </div>
            </div>
            
            {/* Tab Navigation */}
            <div className="border-b border-border">
              <nav className="flex space-x-8">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-body text-sm font-medium transition-colors duration-200 ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Achievement Metrics */}
              <AchievementMetrics metrics={achievementMetrics} />
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Current Courses */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-heading font-semibold text-xl text-foreground">
                        Continue Learning
                      </h2>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setActiveTab('courses')}
                        iconName="ArrowRight"
                        iconPosition="right"
                      >
                        View All
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {enrolledCourses?.slice(0, 2)?.map((course) => (
                        <CourseCard key={course?.id} course={course} />
                      ))}
                    </div>
                  </div>
                  
                  {/* Recommended Courses */}
                  <RecommendedCourses courses={recommendedCourses} />
                </div>
                
                {/* Sidebar */}
                <div className="space-y-8">
                  {/* Quick Actions */}
                  <QuickActions />
                  
                  {/* Upcoming Deadlines */}
                  <UpcomingDeadlines deadlines={upcomingDeadlines} />
                  
                  {/* Recent Activity */}
                  <ActivityFeed activities={recentActivities?.slice(0, 3)} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'courses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-heading font-semibold text-2xl text-foreground">
                  My Courses ({enrolledCourses?.length})
                </h2>
                <Button
                  variant="default"
                  onClick={() => navigate('/courses')}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Enroll in New Course
                </Button>
              </div>
              
              <div className="space-y-4">
                {enrolledCourses?.map((course) => (
                  <CourseCard key={course?.id} course={course} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'certificates' && (
            <div id="certificates-section" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-heading font-semibold text-2xl text-foreground">
                  My Certificates ({certificates?.length})
                </h2>
                <Button
                  variant="outline"
                  onClick={() => window.open('/verify', '_blank')}
                  iconName="ExternalLink"
                  iconPosition="left"
                >
                  Verify Certificate
                </Button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {certificates?.map((certificate) => (
                  <CertificateCard key={certificate?.id} certificate={certificate} />
                ))}
              </div>
              
              {certificates?.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Award" size={32} className="text-muted-foreground" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                    No certificates yet
                  </h3>
                  <p className="font-body text-muted-foreground mb-6">
                    Complete courses to earn your first certificate
                  </p>
                  <Button
                    variant="default"
                    onClick={() => navigate('/courses')}
                    iconName="BookOpen"
                    iconPosition="left"
                  >
                    Browse Courses
                  </Button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="space-y-6">
              <h2 className="font-heading font-semibold text-2xl text-foreground">
                Learning Activity
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ActivityFeed activities={recentActivities} />
                <AchievementMetrics metrics={achievementMetrics} />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default LearnerDashboard;