import React, { useState } from 'react';
import Icon from '../../../components/AppIcon.jsx';
import Button from '../../../components/ui/Button.jsx';

const CourseNavigation = ({ 
  courseData, 
  currentLesson, 
  onLessonSelect, 
  progress = {},
  isCollapsed = false,
  onToggleCollapse 
}) => {
  const [expandedModules, setExpandedModules] = useState(new Set([courseData.modules[0]?.id]));

  const toggleModule = (moduleId) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded?.has(moduleId)) {
      newExpanded?.delete(moduleId);
    } else {
      newExpanded?.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const getLessonStatus = (lessonId) => {
    const lessonProgress = progress?.[lessonId];
    if (!lessonProgress) return 'not-started';
    if (lessonProgress >= 100) return 'completed';
    if (lessonProgress > 0) return 'in-progress';
    return 'not-started';
  };

  const getModuleProgress = (module) => {
    const totalLessons = module.lessons?.length;
    const completedLessons = module.lessons?.filter(lesson => 
      getLessonStatus(lesson?.id) === 'completed'
    )?.length;
    return Math.round((completedLessons / totalLessons) * 100);
  };

  const StatusIcon = ({ status }) => {
    switch (status) {
      case 'completed':
        return <Icon name="CheckCircle" size={16} className="text-success" />;
      case 'in-progress':
        return <Icon name="PlayCircle" size={16} className="text-primary" />;
      default:
        return <Icon name="Circle" size={16} className="text-muted-foreground" />;
    }
  };

  if (isCollapsed) {
    return (
      <div className="w-16 bg-card border-r border-border h-full flex flex-col">
        <div className="p-4 border-b border-border">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="w-8 h-8"
          >
            <Icon name="ChevronRight" size={16} />
          </Button>
        </div>
        <div className="flex-1 p-2 space-y-2">
          {courseData?.modules?.map((module, index) => (
            <div
              key={module.id}
              className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium"
              title={module.title}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-card border-r border-border h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-heading font-semibold text-foreground">Course Content</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="w-8 h-8"
          >
            <Icon name="ChevronLeft" size={16} />
          </Button>
        </div>
        
        {/* Course Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Overall Progress</span>
            <span className="font-medium text-foreground">
              {Math.round(Object.values(progress)?.reduce((acc, val) => acc + (val >= 100 ? 1 : 0), 0) / 
                courseData?.modules?.reduce((acc, mod) => acc + mod?.lessons?.length, 0) * 100)}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${Math.round(Object.values(progress)?.reduce((acc, val) => acc + (val >= 100 ? 1 : 0), 0) / 
                  courseData?.modules?.reduce((acc, mod) => acc + mod?.lessons?.length, 0) * 100)}%` 
              }}
            ></div>
          </div>
        </div>
      </div>
      {/* Module List */}
      <div className="flex-1 overflow-y-auto">
        {courseData?.modules?.map((module, moduleIndex) => (
          <div key={module.id} className="border-b border-border last:border-b-0">
            {/* Module Header */}
            <button
              onClick={() => toggleModule(module.id)}
              className="w-full p-4 text-left hover:bg-muted transition-colors duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">{moduleIndex + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-body font-medium text-foreground text-sm">{module.title}</h4>
                    <p className="text-xs text-muted-foreground">
                      {module.lessons?.length} lessons • {module.duration}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-muted-foreground">{getModuleProgress(module)}%</span>
                  <Icon 
                    name={expandedModules?.has(module.id) ? "ChevronDown" : "ChevronRight"} 
                    size={16} 
                    className="text-muted-foreground"
                  />
                </div>
              </div>
            </button>

            {/* Lessons List */}
            {expandedModules?.has(module.id) && (
              <div className="bg-muted/30">
                {module.lessons?.map((lesson, lessonIndex) => {
                  const status = getLessonStatus(lesson?.id);
                  const isActive = currentLesson?.id === lesson?.id;
                  
                  return (
                    <button
                      key={lesson?.id}
                      onClick={() => onLessonSelect(lesson)}
                      className={`w-full p-3 pl-12 text-left hover:bg-muted transition-colors duration-200 ${
                        isActive ? 'bg-primary/10 border-r-2 border-primary' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <StatusIcon status={status} />
                        <div className="flex-1 min-w-0">
                          <h5 className={`font-body text-sm truncate ${
                            isActive ? 'text-primary font-medium' : 'text-foreground'
                          }`}>
                            {lessonIndex + 1}. {lesson?.title}
                          </h5>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-muted-foreground">{lesson?.duration}</span>
                            {lesson?.type === 'video' && (
                              <Icon name="Play" size={12} className="text-muted-foreground" />
                            )}
                            {lesson?.type === 'quiz' && (
                              <Icon name="HelpCircle" size={12} className="text-muted-foreground" />
                            )}
                            {lesson?.type === 'reading' && (
                              <Icon name="FileText" size={12} className="text-muted-foreground" />
                            )}
                          </div>
                          {status === 'in-progress' && progress?.[lesson?.id] && (
                            <div className="w-full bg-muted rounded-full h-1 mt-2">
                              <div 
                                className="bg-primary h-1 rounded-full transition-all duration-300"
                                style={{ width: `${progress?.[lesson?.id]}%` }}
                              ></div>
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Navigation Controls */}
      <div className="p-4 border-t border-border">
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            disabled={!currentLesson}
          >
            <Icon name="ChevronLeft" size={16} className="mr-1" />
            Previous
          </Button>
          <Button
            variant="default"
            size="sm"
            className="flex-1"
            disabled={!currentLesson}
          >
            Next
            <Icon name="ChevronRight" size={16} className="ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseNavigation;