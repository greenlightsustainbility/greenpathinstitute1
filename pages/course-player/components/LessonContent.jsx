import React, { useState } from 'react';
import Icon from '../../../components/AppIcon.jsx';
import Button from '../../../components/ui/Button.jsx';
import Input from '../../../components/ui/Input.jsx';

const LessonContent = ({ 
  lesson, 
  onComplete, 
  onNoteAdd, 
  notes = [],
  resources = [] 
}) => {
  const [newNote, setNewNote] = useState('');
  const [noteTimestamp, setNoteTimestamp] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [showResources, setShowResources] = useState(false);

  const handleAddNote = () => {
    if (newNote?.trim()) {
      onNoteAdd?.({
        id: Date.now(),
        content: newNote,
        timestamp: noteTimestamp,
        createdAt: new Date()?.toISOString()
      });
      setNewNote('');
    }
  };

  const formatTimestamp = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds?.toString()?.padStart(2, '0')}`;
  };

  const downloadResource = (resource) => {
    // Mock download functionality
    const link = document.createElement('a');
    link.href = resource?.url;
    link.download = resource?.name;
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
  };

  if (!lesson) {
    return (
      <div className="flex-1 flex items-center justify-center bg-muted/30">
        <div className="text-center">
          <Icon name="BookOpen" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="font-heading font-semibold text-foreground mb-2">Select a Lesson</h3>
          <p className="text-muted-foreground">Choose a lesson from the course navigation to begin learning.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Lesson Header */}
      <div className="bg-card border-b border-border p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                {lesson?.type === 'video' && <Icon name="Play" size={12} className="text-primary" />}
                {lesson?.type === 'quiz' && <Icon name="HelpCircle" size={12} className="text-primary" />}
                {lesson?.type === 'reading' && <Icon name="FileText" size={12} className="text-primary" />}
              </div>
              <span className="text-sm text-muted-foreground capitalize">{lesson?.type}</span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{lesson?.duration}</span>
            </div>
            <h1 className="font-heading font-bold text-2xl text-foreground mb-2">{lesson?.title}</h1>
            {lesson?.description && (
              <p className="text-muted-foreground">{lesson?.description}</p>
            )}
          </div>
          
          <div className="flex items-center space-x-2 ml-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowNotes(!showNotes)}
              className={showNotes ? 'bg-muted' : ''}
            >
              <Icon name="StickyNote" size={16} className="mr-2" />
              Notes ({notes?.length})
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowResources(!showResources)}
              className={showResources ? 'bg-muted' : ''}
            >
              <Icon name="Download" size={16} className="mr-2" />
              Resources ({resources?.length})
            </Button>
          </div>
        </div>
      </div>
      {/* Content Area */}
      <div className="flex-1 flex">
        {/* Main Content */}
        <div className="flex-1 p-6">
          {lesson?.type === 'reading' && (
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <div className="bg-card rounded-lg p-8 border border-border">
                  {lesson?.content ? (
                    <div dangerouslySetInnerHTML={{ __html: lesson?.content }} />
                  ) : (
                    <div className="space-y-6">
                      <h2 className="font-heading font-semibold text-xl text-foreground">
                        Introduction to ESG Fundamentals
                      </h2>
                      <p className="text-foreground leading-relaxed">
                        Environmental, Social, and Governance (ESG) criteria are a set of standards for a company's operations that socially conscious investors use to screen potential investments. Environmental criteria consider how a company performs as a steward of nature.
                      </p>
                      <h3 className="font-heading font-semibold text-lg text-foreground">
                        Environmental Factors
                      </h3>
                      <p className="text-foreground leading-relaxed">
                        Environmental factors include a company's energy use, waste, pollution, natural resource conservation, and treatment of animals. These criteria can also help evaluate any environmental risks a company might face and how the company is managing those risks.
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-foreground">
                        <li>Carbon emissions and climate change impact</li>
                        <li>Water and waste management</li>
                        <li>Energy efficiency and renewable energy use</li>
                        <li>Biodiversity and ecosystem protection</li>
                      </ul>
                      <h3 className="font-heading font-semibold text-lg text-foreground">
                        Social Factors
                      </h3>
                      <p className="text-foreground leading-relaxed">
                        Social criteria examine how a company manages relationships with employees, suppliers, customers, and the communities where it operates. This includes labor standards, health and safety, and community development.
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Completion Button */}
              <div className="mt-8 text-center">
                <Button
                  variant="default"
                  size="lg"
                  onClick={() => onComplete?.(lesson?.id)}
                >
                  <Icon name="CheckCircle" size={20} className="mr-2" />
                  Mark as Complete
                </Button>
              </div>
            </div>
          )}

          {lesson?.type === 'quiz' && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-card rounded-lg p-8 border border-border">
                <h2 className="font-heading font-semibold text-xl text-foreground mb-6">
                  Knowledge Check
                </h2>
                <div className="space-y-6">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h3 className="font-body font-medium text-foreground mb-3">
                      Question 1: What does ESG stand for?
                    </h3>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input type="radio" name="q1" value="a" className="text-primary" />
                        <span className="text-foreground">Environmental, Social, and Governance</span>
                      </label>
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input type="radio" name="q1" value="b" className="text-primary" />
                        <span className="text-foreground">Economic, Social, and Government</span>
                      </label>
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input type="radio" name="q1" value="c" className="text-primary" />
                        <span className="text-foreground">Environmental, Sustainable, and Green</span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-between">
                  <Button variant="outline">
                    Previous Question
                  </Button>
                  <Button variant="default">
                    Next Question
                    <Icon name="ChevronRight" size={16} className="ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Side Panels */}
        <div className="w-80 border-l border-border bg-card">
          {/* Notes Panel */}
          {showNotes && (
            <div className="h-full flex flex-col">
              <div className="p-4 border-b border-border">
                <h3 className="font-heading font-semibold text-foreground mb-3">My Notes</h3>
                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder="Add a note..."
                    value={newNote}
                    onChange={(e) => setNewNote(e?.target?.value)}
                    onKeyPress={(e) => e?.key === 'Enter' && handleAddNote()}
                  />
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleAddNote}
                    disabled={!newNote?.trim()}
                    className="w-full"
                  >
                    <Icon name="Plus" size={16} className="mr-2" />
                    Add Note
                  </Button>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4">
                {notes?.length === 0 ? (
                  <div className="text-center py-8">
                    <Icon name="StickyNote" size={32} className="text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground text-sm">No notes yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {notes?.map((note) => (
                      <div key={note?.id} className="p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-muted-foreground font-mono">
                            {formatTimestamp(note?.timestamp)}
                          </span>
                          <Button variant="ghost" size="icon" className="w-6 h-6">
                            <Icon name="Trash2" size={12} />
                          </Button>
                        </div>
                        <p className="text-sm text-foreground">{note?.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Resources Panel */}
          {showResources && (
            <div className="h-full flex flex-col">
              <div className="p-4 border-b border-border">
                <h3 className="font-heading font-semibold text-foreground">Resources</h3>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4">
                {resources?.length === 0 ? (
                  <div className="text-center py-8">
                    <Icon name="Download" size={32} className="text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground text-sm">No resources available</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {resources?.map((resource) => (
                      <div key={resource?.id} className="p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center flex-shrink-0">
                            <Icon name="FileText" size={16} className="text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-body font-medium text-foreground text-sm truncate">
                              {resource?.name}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              {resource?.type} • {resource?.size}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => downloadResource(resource)}
                            className="w-8 h-8 flex-shrink-0"
                          >
                            <Icon name="Download" size={14} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonContent;