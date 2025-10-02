import React, { useState } from 'react';
import Icon from '../../../components/AppIcon.jsx';
import Image from '../../../components/AppImage.jsx';
import Button from '../../../components/ui/Button.jsx';

const CourseOverview = ({ course }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'FileText' },
    { id: 'outcomes', label: 'Learning Outcomes', icon: 'Target' },
    { id: 'prerequisites', label: 'Prerequisites', icon: 'CheckSquare' },
    { id: 'certificate', label: 'Certificate', icon: 'Award' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-heading font-semibold text-text-primary mb-4">
                Course Description
              </h3>
              <div className="prose prose-gray max-w-none">
                <p className="text-text-secondary leading-relaxed mb-4">
                  {course?.fullDescription}
                </p>
                <p className="text-text-secondary leading-relaxed">
                  This comprehensive course is designed for professionals who want to build expertise in ESG principles and sustainability practices. Through practical case studies, interactive exercises, and real-world applications, you'll develop the skills needed to drive meaningful change in your organization.
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-heading font-semibold text-text-primary mb-4">
                What You'll Learn
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course?.keyLearnings?.map((learning, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Icon name="CheckCircle" size={20} className="text-success mt-0.5 flex-shrink-0" />
                    <span className="text-text-secondary">{learning}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-heading font-semibold text-text-primary mb-4">
                Course Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {course?.features?.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 bg-muted rounded-lg">
                    <Icon name={feature?.icon} size={24} className="text-primary" />
                    <div>
                      <h4 className="font-body font-semibold text-text-primary">
                        {feature?.title}
                      </h4>
                      <p className="text-sm text-text-secondary">
                        {feature?.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'outcomes':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-heading font-semibold text-text-primary mb-4">
                Learning Outcomes
              </h3>
              <p className="text-text-secondary mb-6">
                Upon successful completion of this course, you will be able to:
              </p>
              <div className="space-y-4">
                {course?.learningOutcomes?.map((outcome, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-card border border-border rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-semibold text-sm">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-body font-semibold text-text-primary mb-2">
                        {outcome?.title}
                      </h4>
                      <p className="text-text-secondary">
                        {outcome?.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-heading font-semibold text-text-primary mb-4">
                Skills You'll Gain
              </h3>
              <div className="flex flex-wrap gap-2">
                {course?.skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );

      case 'prerequisites':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-heading font-semibold text-text-primary mb-4">
                Prerequisites
              </h3>
              {course?.prerequisites?.required?.length > 0 ? (
                <div className="mb-6">
                  <h4 className="font-body font-semibold text-text-primary mb-3">
                    Required Prerequisites
                  </h4>
                  <div className="space-y-2">
                    {course?.prerequisites?.required?.map((req, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <Icon name="AlertCircle" size={20} className="text-warning mt-0.5 flex-shrink-0" />
                        <span className="text-text-secondary">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mb-6 p-4 bg-success/5 border border-success/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Icon name="CheckCircle" size={20} className="text-success" />
                    <span className="font-body font-semibold text-success">
                      No Prerequisites Required
                    </span>
                  </div>
                  <p className="text-success/80 mt-2">
                    This course is designed for beginners and requires no prior experience.
                  </p>
                </div>
              )}

              {course?.prerequisites?.recommended?.length > 0 && (
                <div>
                  <h4 className="font-body font-semibold text-text-primary mb-3">
                    Recommended Background
                  </h4>
                  <div className="space-y-2">
                    {course?.prerequisites?.recommended?.map((rec, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <Icon name="Info" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-text-secondary">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div>
              <h3 className="text-xl font-heading font-semibold text-text-primary mb-4">
                Technical Requirements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course?.technicalRequirements?.map((req, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 bg-muted rounded-lg">
                    <Icon name={req?.icon} size={24} className="text-primary" />
                    <div>
                      <h4 className="font-body font-semibold text-text-primary">
                        {req?.title}
                      </h4>
                      <p className="text-sm text-text-secondary">
                        {req?.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'certificate':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-heading font-semibold text-text-primary mb-4">
                Certificate of Completion
              </h3>
              <p className="text-text-secondary mb-6">
                Earn a professional certificate upon successful completion of this course. Our certificates are recognized by industry leaders and can be shared on LinkedIn, added to your resume, or displayed in your office.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-body font-semibold text-text-primary">
                  Certificate Features
                </h4>
                <div className="space-y-3">
                  {course?.certificate?.features?.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Icon name="CheckCircle" size={20} className="text-success mt-0.5 flex-shrink-0" />
                      <span className="text-text-secondary">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <h4 className="font-body font-semibold text-text-primary mb-3">
                    Completion Requirements
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <Icon name="Video" size={16} className="text-primary" />
                      <span className="text-sm text-text-secondary">
                        Complete all video lessons
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Icon name="HelpCircle" size={16} className="text-primary" />
                      <span className="text-sm text-text-secondary">
                        Pass all module quizzes with 80% or higher
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Icon name="FileText" size={16} className="text-primary" />
                      <span className="text-sm text-text-secondary">
                        Submit final assessment
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h4 className="font-body font-semibold text-text-primary mb-4">
                  Certificate Preview
                </h4>
                <div className="relative">
                  <Image
                    src={course?.certificate?.preview}
                    alt="Certificate Preview"
                    className="w-full h-auto rounded-lg shadow-elevation-sm"
                  />
                  <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                    <Button variant="default" iconName="Eye">
                      View Sample
                    </Button>
                  </div>
                </div>
                <div className="mt-4 space-y-2 text-sm text-text-secondary">
                  <div className="flex justify-between">
                    <span>Certificate ID:</span>
                    <span className="font-mono">GP-20250930-ABC123</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Verification:</span>
                    <span className="text-primary">QR Code + Online</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Format:</span>
                    <span>PDF Download</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Tab Navigation */}
          <div className="border-b border-border mb-8">
            <nav className="flex space-x-8 overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-body font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseOverview;