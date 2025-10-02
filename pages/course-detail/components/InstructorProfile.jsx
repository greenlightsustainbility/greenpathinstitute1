import React, { useState } from 'react';
import Icon from '../../../components/AppIcon.jsx';
import Image from '../../../components/AppImage.jsx';
import Button from '../../../components/ui/Button.jsx';

const InstructorProfile = ({ instructor }) => {
  const [showFullBio, setShowFullBio] = useState(false);

  const toggleBio = () => {
    setShowFullBio(!showFullBio);
  };

  return (
    <div className="bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-heading font-bold text-text-primary mb-4">
              Meet Your Instructor
            </h2>
            <p className="text-lg text-text-secondary">
              Learn from industry experts with real-world experience
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg shadow-elevation-sm overflow-hidden">
            <div className="p-8">
              <div className="flex flex-col lg:flex-row items-start space-y-6 lg:space-y-0 lg:space-x-8">
                {/* Instructor Photo and Basic Info */}
                <div className="flex-shrink-0 text-center lg:text-left">
                  <Image
                    src={instructor?.avatar}
                    alt={instructor?.name}
                    className="w-32 h-32 rounded-full object-cover mx-auto lg:mx-0 mb-4"
                  />
                  <h3 className="text-2xl font-heading font-bold text-text-primary mb-2">
                    {instructor?.name}
                  </h3>
                  <p className="text-lg text-primary font-semibold mb-2">
                    {instructor?.title}
                  </p>
                  <p className="text-text-secondary mb-4">
                    {instructor?.company}
                  </p>

                  {/* Social Links */}
                  <div className="flex items-center justify-center lg:justify-start space-x-3 mb-6">
                    {instructor?.socialLinks?.map((link, index) => (
                      <a
                        key={index}
                        href={link?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-muted hover:bg-primary hover:text-white rounded-full flex items-center justify-center transition-colors duration-200"
                      >
                        <Icon name={link?.platform} size={20} />
                      </a>
                    ))}
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-heading font-bold text-primary">
                        {instructor?.stats?.studentsCount?.toLocaleString()}
                      </div>
                      <div className="text-sm text-text-secondary">
                        Students
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-heading font-bold text-primary">
                        {instructor?.stats?.coursesCount}
                      </div>
                      <div className="text-sm text-text-secondary">
                        Courses
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-heading font-bold text-primary">
                        {instructor?.stats?.rating}
                      </div>
                      <div className="text-sm text-text-secondary">
                        Rating
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-heading font-bold text-primary">
                        {instructor?.stats?.experience}+
                      </div>
                      <div className="text-sm text-text-secondary">
                        Years Exp.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Instructor Details */}
                <div className="flex-1">
                  {/* Bio */}
                  <div className="mb-6">
                    <h4 className="text-xl font-heading font-semibold text-text-primary mb-3">
                      About the Instructor
                    </h4>
                    <div className="text-text-secondary leading-relaxed">
                      <p className={showFullBio ? '' : 'line-clamp-4'}>
                        {instructor?.bio}
                      </p>
                      {instructor?.bio?.length > 200 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={toggleBio}
                          className="mt-2 p-0 h-auto"
                        >
                          {showFullBio ? 'Show Less' : 'Read More'}
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Expertise */}
                  <div className="mb-6">
                    <h4 className="text-xl font-heading font-semibold text-text-primary mb-3">
                      Areas of Expertise
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {instructor?.expertise?.map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Education */}
                  <div className="mb-6">
                    <h4 className="text-xl font-heading font-semibold text-text-primary mb-3">
                      Education & Certifications
                    </h4>
                    <div className="space-y-3">
                      {instructor?.education?.map((edu, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <Icon name="GraduationCap" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <h5 className="font-body font-semibold text-text-primary">
                              {edu?.degree}
                            </h5>
                            <p className="text-sm text-text-secondary">
                              {edu?.institution} • {edu?.year}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Professional Experience */}
                  <div className="mb-6">
                    <h4 className="text-xl font-heading font-semibold text-text-primary mb-3">
                      Professional Experience
                    </h4>
                    <div className="space-y-4">
                      {instructor?.experience?.map((exp, index) => (
                        <div key={index} className="border-l-2 border-primary/20 pl-4">
                          <h5 className="font-body font-semibold text-text-primary">
                            {exp?.position}
                          </h5>
                          <p className="text-sm text-primary font-medium">
                            {exp?.company}
                          </p>
                          <p className="text-sm text-text-secondary mb-2">
                            {exp?.duration}
                          </p>
                          <p className="text-sm text-text-secondary">
                            {exp?.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h4 className="text-xl font-heading font-semibold text-text-primary mb-3">
                      Notable Achievements
                    </h4>
                    <div className="space-y-2">
                      {instructor?.achievements?.map((achievement, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <Icon name="Award" size={16} className="text-warning mt-1 flex-shrink-0" />
                          <span className="text-text-secondary text-sm">
                            {achievement}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Other Courses by Instructor */}
            {instructor?.otherCourses && instructor?.otherCourses?.length > 0 && (
              <div className="border-t border-border p-8">
                <h4 className="text-xl font-heading font-semibold text-text-primary mb-6">
                  Other Courses by {instructor?.name?.split(' ')?.[0]}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {instructor?.otherCourses?.map((course, index) => (
                    <div
                      key={index}
                      className="bg-muted rounded-lg p-4 hover:bg-muted/80 transition-colors duration-200 cursor-pointer"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <Image
                          src={course?.thumbnail}
                          alt={course?.title}
                          className="w-16 h-12 rounded object-cover"
                        />
                        <div className="flex-1">
                          <h5 className="font-body font-semibold text-text-primary text-sm line-clamp-2">
                            {course?.title}
                          </h5>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex items-center space-x-1">
                              <Icon name="Star" size={12} className="text-warning fill-current" />
                              <span className="text-xs text-text-secondary">
                                {course?.rating}
                              </span>
                            </div>
                            <span className="text-xs text-text-secondary">
                              ({course?.studentCount} students)
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-primary">
                          ${course?.price}
                        </span>
                        <Button variant="ghost" size="sm" iconName="ArrowRight">
                          View Course
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorProfile;