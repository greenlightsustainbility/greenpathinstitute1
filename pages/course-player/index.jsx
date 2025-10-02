import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header.jsx';
import VideoPlayer from './components/VideoPlayer.jsx';
import CourseNavigation from './components/CourseNavigation.jsx';
import LessonContent from './components/LessonContent.jsx';
import ProgressTracker from './components/ProgressTracker.jsx';
import Button from "../../components/ui/Button.jsx";
import Icon from "../../components/AppIcon.jsx";

const CoursePlayer = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const courseId = searchParams?.get('courseId') || 'esg-fundamentals';
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [progress, setProgress] = useState({});
  const [notes, setNotes] = useState([]);
  const [isNavigationCollapsed, setIsNavigationCollapsed] = useState(false);
  const [showProgressTracker, setShowProgressTracker] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);

  // Mock course data
  const courseData = {
    id: "esg-fundamentals",
    title: "ESG Fundamentals for African Professionals",
    description: "Comprehensive introduction to Environmental, Social, and Governance principles for sustainable business practices in Africa.",
    instructor: "Dr. Amara Okafor",
    duration: "4 hours 30 minutes",
    modules: [
      {
        id: "module-1",
        title: "Introduction to ESG",
        duration: "1h 15m",
        lessons: [
          {
            id: "lesson-1-1",
            title: "What is ESG?",
            type: "video",
            duration: "15 min",
            description: "Understanding the fundamentals of Environmental, Social, and Governance criteria.",
            videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
          },
          {
            id: "lesson-1-2",
            title: "ESG in African Context",
            type: "reading",
            duration: "20 min",
            description: "How ESG principles apply specifically to African markets and businesses."
          },
          {
            id: "lesson-1-3",
            title: "Knowledge Check",
            type: "quiz",
            duration: "10 min",
            description: "Test your understanding of basic ESG concepts."
          }
        ]
      },
      {
        id: "module-2",
        title: "Environmental Factors",
        duration: "1h 30m",
        lessons: [
          {
            id: "lesson-2-1",
            title: "Climate Change Impact",
            type: "video",
            duration: "25 min",
            description: "Understanding climate risks and opportunities for businesses.",
            videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4"
          },
          {
            id: "lesson-2-2",
            title: "Resource Management",
            type: "reading",
            duration: "30 min",
            description: "Sustainable resource utilization and waste management strategies."
          },
          {
            id: "lesson-2-3",
            title: "Environmental Assessment",
            type: "quiz",
            duration: "15 min",
            description: "Evaluate environmental impact assessment methods."
          }
        ]
      },
      {
        id: "module-3",
        title: "Social Responsibility",
        duration: "1h 20m",
        lessons: [
          {
            id: "lesson-3-1",
            title: "Stakeholder Engagement",
            type: "video",
            duration: "20 min",
            description: "Building meaningful relationships with communities and stakeholders.",
            videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
          },
          {
            id: "lesson-3-2",
            title: "Labor Standards",
            type: "reading",
            duration: "25 min",
            description: "Ensuring fair labor practices and human rights compliance."
          },
          {
            id: "lesson-3-3",
            title: "Social Impact Quiz",
            type: "quiz",
            duration: "15 min",
            description: "Assessment of social responsibility concepts."
          }
        ]
      },
      {
        id: "module-4",
        title: "Governance Excellence",
        duration: "1h 25m",
        lessons: [
          {
            id: "lesson-4-1",
            title: "Corporate Governance",
            type: "video",
            duration: "30 min",
            description: "Best practices in corporate governance and board oversight.",
            videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4"
          },
          {
            id: "lesson-4-2",
            title: "Risk Management",
            type: "reading",
            duration: "25 min",
            description: "Identifying and managing ESG-related risks."
          },
          {
            id: "lesson-4-3",
            title: "Final Assessment",
            type: "quiz",
            duration: "30 min",
            description: "Comprehensive assessment of all ESG concepts covered."
          }
        ]
      }
    ]
  };

  // Mock transcript data
  const transcriptData = [
    {
      start: 0,
      end: 15,
      text: "Welcome to ESG Fundamentals. In this lesson, we'll explore what ESG means and why it's crucial for modern businesses."
    },
    {
      start: 15,
      end: 30,
      text: "ESG stands for Environmental, Social, and Governance. These three pillars form the foundation of sustainable business practices."
    },
    {
      start: 30,
      end: 45,
      text: "Environmental factors include climate change impact, resource usage, and waste management strategies."
    },
    {
      start: 45,
      end: 60,
      text: "Social aspects cover stakeholder relationships, labor standards, and community engagement initiatives."
    }
  ];

  // Mock resources data
  const resourcesData = [
    {
      id: "resource-1",
      name: "ESG Framework Guide.pdf",
      type: "PDF",
      size: "2.4 MB",
      url: "/resources/esg-framework-guide.pdf"
    },
    {
      id: "resource-2",
      name: "African ESG Case Studies.xlsx",
      type: "Excel",
      size: "1.8 MB",
      url: "/resources/african-esg-cases.xlsx"
    },
    {
      id: "resource-3",
      name: "Sustainability Checklist.docx",
      type: "Word",
      size: "856 KB",
      url: "/resources/sustainability-checklist.docx"
    }
  ];

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
      return;
    }
    setIsAuthenticated(true);

    // Load saved progress
    const savedProgress = localStorage.getItem(`course-progress-${courseId}`);
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }

    // Load saved notes
    const savedNotes = localStorage.getItem(`course-notes-${courseId}`);
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }

    // Set initial lesson
    const lessonId = searchParams?.get('lessonId');
    if (lessonId) {
      const lesson = findLessonById(lessonId);
      if (lesson) {
        setCurrentLesson(lesson);
      }
    } else {
      // Start with first lesson
      setCurrentLesson(courseData?.modules?.[0]?.lessons?.[0]);
    }
  }, [courseId, navigate, searchParams]);

  const findLessonById = (lessonId) => {
    for (const module of courseData?.modules) {
      const lesson = module.lessons?.find(l => l?.id === lessonId);
      if (lesson) return lesson;
    }
    return null;
  };

  const handleLessonSelect = (lesson) => {
    setCurrentLesson(lesson);
    // Update URL without page reload
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams?.set('lessonId', lesson?.id);
    window.history?.replaceState({}, '', `${window.location?.pathname}?${newSearchParams}`);
  };

  const handleProgressUpdate = (lessonProgress) => {
    if (!currentLesson) return;
    
    const newProgress = {
      ...progress,
      [currentLesson?.id]: lessonProgress
    };
    setProgress(newProgress);
    localStorage.setItem(`course-progress-${courseId}`, JSON.stringify(newProgress));
  };

  const handleVideoProgressUpdate = (progressPercent) => {
    setVideoProgress(progressPercent);
    handleProgressUpdate(progressPercent);
  };

  const handleLessonComplete = (lessonId) => {
    const newProgress = {
      ...progress,
      [lessonId]: 100
    };
    setProgress(newProgress);
    localStorage.setItem(`course-progress-${courseId}`, JSON.stringify(newProgress));

    // Auto-advance to next lesson
    const currentIndex = getCurrentLessonIndex();
    const nextLesson = getNextLesson(currentIndex);
    if (nextLesson) {
      setTimeout(() => {
        handleLessonSelect(nextLesson);
      }, 1000);
    }
  };

  const getCurrentLessonIndex = () => {
    if (!currentLesson) return -1;
    let index = 0;
    for (const module of courseData?.modules) {
      for (const lesson of module.lessons) {
        if (lesson?.id === currentLesson?.id) return index;
        index++;
      }
    }
    return -1;
  };

  const getNextLesson = (currentIndex) => {
    const totalLessons = courseData?.modules?.reduce((acc, mod) => acc + mod?.lessons?.length, 0);
    if (currentIndex >= totalLessons - 1) return null;
    
    let index = 0;
    for (const module of courseData?.modules) {
      for (const lesson of module.lessons) {
        if (index === currentIndex + 1) return lesson;
        index++;
      }
    }
    return null;
  };

  const handleNoteAdd = (note) => {
    const newNotes = [...notes, note];
    setNotes(newNotes);
    localStorage.setItem(`course-notes-${courseId}`, JSON.stringify(newNotes));
  };

  const handleVideoEnd = () => {
    if (currentLesson && currentLesson?.type === 'video') {
      handleLessonComplete(currentLesson?.id);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16 h-screen flex">
        {/* Course Navigation */}
        <CourseNavigation
          courseData={courseData}
          currentLesson={currentLesson}
          onLessonSelect={handleLessonSelect}
          progress={progress}
          isCollapsed={isNavigationCollapsed}
          onToggleCollapse={() => setIsNavigationCollapsed(!isNavigationCollapsed)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Video Player for Video Lessons */}
          {currentLesson && currentLesson?.type === 'video' && (
            <div className="bg-black">
              <VideoPlayer
                videoUrl={currentLesson?.videoUrl}
                title={currentLesson?.title}
                onProgressUpdate={handleVideoProgressUpdate}
                currentProgress={progress?.[currentLesson?.id] || 0}
                onVideoEnd={handleVideoEnd}
                transcriptData={transcriptData}
              />
            </div>
          )}

          {/* Lesson Content */}
          <LessonContent
            lesson={currentLesson}
            onComplete={handleLessonComplete}
            onNoteAdd={handleNoteAdd}
            notes={notes?.filter(note => note?.lessonId === currentLesson?.id)}
            resources={resourcesData}
          />
        </div>

        {/* Progress Tracker Sidebar */}
        {showProgressTracker && (
          <div className="w-80 border-l border-border bg-card p-4 overflow-y-auto">
            <ProgressTracker
              courseData={courseData}
              progress={progress}
              currentLesson={currentLesson}
              onLessonJump={handleLessonSelect}
            />
          </div>
        )}
      </div>
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3">
        {/* Progress Tracker Toggle */}
        <Button
          variant="default"
          size="icon"
          onClick={() => setShowProgressTracker(!showProgressTracker)}
          className={`w-12 h-12 rounded-full shadow-lg ${showProgressTracker ? 'bg-primary/90' : ''}`}
        >
          <Icon name="BarChart3" size={20} />
        </Button>

        {/* Back to Dashboard */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate('/learner-dashboard')}
          className="w-12 h-12 rounded-full shadow-lg bg-card"
        >
          <Icon name="Home" size={20} />
        </Button>
      </div>
      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const currentIndex = getCurrentLessonIndex();
              const prevLesson = currentIndex > 0 ? getNextLesson(currentIndex - 2) : null;
              if (prevLesson) handleLessonSelect(prevLesson);
            }}
            disabled={getCurrentLessonIndex() <= 0}
          >
            <Icon name="ChevronLeft" size={16} className="mr-1" />
            Previous
          </Button>

          <div className="text-center">
            <div className="text-sm font-medium text-foreground">
              {getCurrentLessonIndex() + 1} of {courseData?.modules?.reduce((acc, mod) => acc + mod?.lessons?.length, 0)}
            </div>
            <div className="text-xs text-muted-foreground">
              {Math.round(Object.values(progress)?.filter(p => p >= 100)?.length / 
                courseData?.modules?.reduce((acc, mod) => acc + mod?.lessons?.length, 0) * 100)}% Complete
            </div>
          </div>

          <Button
            variant="default"
            size="sm"
            onClick={() => {
              const currentIndex = getCurrentLessonIndex();
              const nextLesson = getNextLesson(currentIndex);
              if (nextLesson) handleLessonSelect(nextLesson);
            }}
            disabled={!getNextLesson(getCurrentLessonIndex())}
          >
            Next
            <Icon name="ChevronRight" size={16} className="ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;