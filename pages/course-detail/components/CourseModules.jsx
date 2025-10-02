import React, { useState } from 'react';
import Icon from '../../../components/AppIcon.jsx';
import Button from '../../../components/ui/Button.jsx';

const CourseModules = ({ modules, isEnrolled, userProgress = {} }) => {
  const [expandedModules, setExpandedModules] = useState(new Set([0]));

  const toggleModule = (moduleIndex) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded?.has(moduleIndex)) {
      newExpanded?.delete(moduleIndex);
    } else {
      newExpanded?.add(moduleIndex);
    }
    setExpandedModules(newExpanded);
  };

  const calculateModuleProgress = (moduleId) => {
    if (!isEnrolled || !userProgress?.[moduleId]) return 0;
    const progress = userProgress?.[moduleId];
    return Math.round((progress?.completedLessons / progress?.totalLessons) * 100);
  };

  const isLessonCompleted = (moduleId, lessonId) => {
    return userProgress?.[moduleId]?.completedLessons?.includes(lessonId) || false;
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <div className="bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-heading font-bold text-text-primary mb-4">
              Course Content
            </h2>
            <p className="text-lg text-text-secondary">
              {modules?.length} modules • {modules?.reduce((total, module) => total + module.lessons?.length, 0)} lessons • {modules?.reduce((total, module) => total + module.duration, 0)} minutes total
            </p>
          </div>

          <div className="space-y-4">
            {modules?.map((module, moduleIndex) => {
              const isExpanded = expandedModules?.has(moduleIndex);
              const moduleProgress = calculateModuleProgress(module.id);

              return (
                <div
                  key={module.id}
                  className="bg-card border border-border rounded-lg overflow-hidden shadow-elevation-sm"
                >
                  {/* Module Header */}
                  <button
                    onClick={() => toggleModule(moduleIndex)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <span className="text-primary font-semibold">
                            {moduleIndex + 1}
                          </span>
                        </div>
                      </div>
                      <div className="text-left">
                        <h3 className="font-body font-semibold text-text-primary">
                          {module.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-text-secondary mt-1">
                          <span>{module.lessons?.length} lessons</span>
                          <span>{formatDuration(module.duration)}</span>
                          {isEnrolled && (
                            <span className="text-primary font-medium">
                              {moduleProgress}% complete
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {isEnrolled && moduleProgress > 0 && (
                        <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all duration-300"
                            style={{ width: `${moduleProgress}%` }}
                          />
                        </div>
                      )}
                      <Icon
                        name={isExpanded ? "ChevronUp" : "ChevronDown"}
                        size={20}
                        className="text-text-secondary"
                      />
                    </div>
                  </button>
                  {/* Module Content */}
                  {isExpanded && (
                    <div className="border-t border-border">
                      <div className="px-6 py-4">
                        <p className="text-text-secondary mb-4">
                          {module.description}
                        </p>

                        {/* Learning Objectives */}
                        {module.objectives && module.objectives?.length > 0 && (
                          <div className="mb-6">
                            <h4 className="font-body font-semibold text-text-primary mb-2">
                              Learning Objectives:
                            </h4>
                            <ul className="space-y-1">
                              {module.objectives?.map((objective, index) => (
                                <li key={index} className="flex items-start space-x-2 text-sm text-text-secondary">
                                  <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                                  <span>{objective}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Lessons */}
                        <div className="space-y-2">
                          {module.lessons?.map((lesson, lessonIndex) => {
                            const isCompleted = isLessonCompleted(module.id, lesson?.id);
                            const isLocked = !isEnrolled && lessonIndex > 0;

                            return (
                              <div
                                key={lesson?.id}
                                className={`flex items-center justify-between p-3 rounded-lg border transition-colors duration-200 ${
                                  isCompleted
                                    ? 'bg-success/5 border-success/20'
                                    : isLocked
                                    ? 'bg-muted/50 border-border' :'bg-muted border-border hover:bg-muted/80'
                                }`}
                              >
                                <div className="flex items-center space-x-3">
                                  <div className="flex-shrink-0">
                                    {isCompleted ? (
                                      <Icon name="CheckCircle" size={20} className="text-success" />
                                    ) : isLocked ? (
                                      <Icon name="Lock" size={20} className="text-text-secondary" />
                                    ) : (
                                      <Icon name="Play" size={20} className="text-primary" />
                                    )}
                                  </div>
                                  <div>
                                    <h5 className={`font-body font-medium ${
                                      isLocked ? 'text-text-secondary' : 'text-text-primary'
                                    }`}>
                                      {lesson?.title}
                                    </h5>
                                    <div className="flex items-center space-x-3 text-xs text-text-secondary mt-1">
                                      <span className="flex items-center space-x-1">
                                        <Icon name="Video" size={12} />
                                        <span>{lesson?.type}</span>
                                      </span>
                                      <span>{formatDuration(lesson?.duration)}</span>
                                      {lesson?.hasQuiz && (
                                        <span className="flex items-center space-x-1">
                                          <Icon name="HelpCircle" size={12} />
                                          <span>Quiz</span>
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  {lesson?.isPreview && !isEnrolled && (
                                    <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">
                                      Preview
                                    </span>
                                  )}
                                  {isEnrolled && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      iconName={isCompleted ? "RotateCcw" : "Play"}
                                    >
                                      {isCompleted ? "Review" : "Start"}
                                    </Button>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!isEnrolled && (
            <div className="mt-8 text-center">
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                <Icon name="Lock" size={48} className="text-primary mx-auto mb-4" />
                <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
                  Unlock Full Course Content
                </h3>
                <p className="text-text-secondary mb-4">
                  Enroll now to access all modules, quizzes, and downloadable resources
                </p>
                <Button variant="default" size="lg">
                  Enroll Now
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseModules;