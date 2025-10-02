import React from 'react';
import Icon from '../../../components/AppIcon.jsx';

const ProgressTracker = ({ 
  courseData, 
  progress = {}, 
  currentLesson,
  onLessonJump 
}) => {
  const getTotalLessons = () => {
    return courseData?.modules?.reduce((total, module) => total + module.lessons?.length, 0);
  };

  const getCompletedLessons = () => {
    return Object.values(progress)?.filter(p => p >= 100)?.length;
  };

  const getOverallProgress = () => {
    const total = getTotalLessons();
    const completed = getCompletedLessons();
    return total > 0 ? Math.round((completed / total) * 100) : 0;
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

  const getNextLesson = () => {
    const currentIndex = getCurrentLessonIndex();
    if (currentIndex === -1 || currentIndex >= getTotalLessons() - 1) return null;
    
    let index = 0;
    for (const module of courseData?.modules) {
      for (const lesson of module.lessons) {
        if (index === currentIndex + 1) return lesson;
        index++;
      }
    }
    return null;
  };

  const getPreviousLesson = () => {
    const currentIndex = getCurrentLessonIndex();
    if (currentIndex <= 0) return null;
    
    let index = 0;
    for (const module of courseData?.modules) {
      for (const lesson of module.lessons) {
        if (index === currentIndex - 1) return lesson;
        index++;
      }
    }
    return null;
  };

  const getEstimatedTimeRemaining = () => {
    let totalMinutes = 0;
    for (const module of courseData?.modules) {
      for (const lesson of module.lessons) {
        if (progress?.[lesson?.id] < 100) {
          // Extract minutes from duration string (e.g., "15 min" -> 15)
          const minutes = parseInt(lesson?.duration?.match(/\d+/)?.[0] || '0');
          totalMinutes += minutes;
        }
      }
    }
    
    if (totalMinutes < 60) return `${totalMinutes} min`;
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    return `${hours}h ${mins}m`;
  };

  const overallProgress = getOverallProgress();
  const completedLessons = getCompletedLessons();
  const totalLessons = getTotalLessons();
  const nextLesson = getNextLesson();
  const previousLesson = getPreviousLesson();

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-semibold text-xl text-foreground">Course Progress</h2>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">{overallProgress}%</div>
          <div className="text-sm text-muted-foreground">Complete</div>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>{completedLessons} of {totalLessons} lessons completed</span>
          <span>{getEstimatedTimeRemaining()} remaining</span>
        </div>
        <div className="w-full bg-muted rounded-full h-3">
          <div 
            className="bg-primary h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${overallProgress}%` }}
          ></div>
        </div>
      </div>
      {/* Current Lesson Info */}
      {currentLesson && (
        <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="Play" size={16} color="white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-body font-medium text-foreground mb-1">Currently Learning</h3>
              <p className="text-sm text-foreground truncate">{currentLesson?.title}</p>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-xs text-muted-foreground">{currentLesson?.duration}</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground capitalize">{currentLesson?.type}</span>
              </div>
              {progress?.[currentLesson?.id] > 0 && progress?.[currentLesson?.id] < 100 && (
                <div className="mt-2">
                  <div className="w-full bg-muted rounded-full h-1">
                    <div 
                      className="bg-primary h-1 rounded-full transition-all duration-300"
                      style={{ width: `${progress?.[currentLesson?.id]}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Navigation Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          onClick={() => previousLesson && onLessonJump?.(previousLesson)}
          disabled={!previousLesson}
          className={`p-3 rounded-lg border transition-colors duration-200 ${
            previousLesson
              ? 'border-border hover:bg-muted text-foreground'
              : 'border-border bg-muted/50 text-muted-foreground cursor-not-allowed'
          }`}
        >
          <div className="flex items-center space-x-2">
            <Icon name="ChevronLeft" size={16} />
            <div className="text-left">
              <div className="text-xs text-muted-foreground">Previous</div>
              <div className="text-sm font-medium truncate">
                {previousLesson ? previousLesson?.title : 'None'}
              </div>
            </div>
          </div>
        </button>

        <button
          onClick={() => nextLesson && onLessonJump?.(nextLesson)}
          disabled={!nextLesson}
          className={`p-3 rounded-lg border transition-colors duration-200 ${
            nextLesson
              ? 'border-border hover:bg-muted text-foreground'
              : 'border-border bg-muted/50 text-muted-foreground cursor-not-allowed'
          }`}
        >
          <div className="flex items-center space-x-2">
            <div className="text-right flex-1">
              <div className="text-xs text-muted-foreground">Next</div>
              <div className="text-sm font-medium truncate">
                {nextLesson ? nextLesson?.title : 'Course Complete'}
              </div>
            </div>
            <Icon name="ChevronRight" size={16} />
          </div>
        </button>
      </div>
      {/* Module Progress */}
      <div className="space-y-3">
        <h3 className="font-body font-medium text-foreground text-sm">Module Progress</h3>
        {courseData?.modules?.map((module, index) => {
          const moduleProgress = module.lessons?.reduce((acc, lesson) => {
            return acc + (progress?.[lesson?.id] >= 100 ? 1 : 0);
          }, 0);
          const modulePercentage = Math.round((moduleProgress / module.lessons?.length) * 100);
          
          return (
            <div key={module.id} className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-medium text-primary">{index + 1}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-foreground truncate">{module.title}</span>
                  <span className="text-xs text-muted-foreground">{modulePercentage}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1">
                  <div 
                    className="bg-primary h-1 rounded-full transition-all duration-300"
                    style={{ width: `${modulePercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Achievement Badge */}
      {overallProgress === 100 && (
        <div className="mt-6 p-4 bg-success/10 border border-success/20 rounded-lg text-center">
          <Icon name="Award" size={32} className="text-success mx-auto mb-2" />
          <h3 className="font-body font-semibold text-success mb-1">Course Completed!</h3>
          <p className="text-sm text-success/80">Congratulations on completing this course. Your certificate is ready!</p>
        </div>
      )}
    </div>
  );
};

export default ProgressTracker;