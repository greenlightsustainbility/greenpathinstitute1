import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header.jsx';
import Button from "../../components/ui/Button.jsx";
import Icon from "../../components/AppIcon.jsx";
import StatsOverview from './components/StatsOverview.jsx';
import StaffManagementTable from './components/StaffManagementTable.jsx';
import DepartmentProgressChart from './components/DepartmentProgressChart.jsx';
import CertificateManagement from './components/CertificateManagement.jsx';
import BillingOverview from './components/BillingOverview.jsx';
import AnalyticsDashboard from './components/AnalyticsDashboard.jsx';

const OrganizationDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [chartType, setChartType] = useState('bar');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for organization dashboard
  const organizationStats = {
    totalStaff: 156,
    completedCourses: 342,
    certificatesIssued: 89,
    averageProgress: 73
  };

  const staffData = [
    {
      id: 1,
      name: "Adebayo Ogundimu",
      email: "adebayo.ogundimu@company.com",
      department: "Sustainability",
      assignedCourses: 3,
      progress: 85,
      status: "completed",
      lastActivity: "2 hours ago"
    },
    {
      id: 2,
      name: "Fatima Al-Rashid",
      email: "fatima.alrashid@company.com",
      department: "Environmental",
      assignedCourses: 2,
      progress: 60,
      status: "in-progress",
      lastActivity: "1 day ago"
    },
    {
      id: 3,
      name: "Kofi Asante",
      email: "kofi.asante@company.com",
      department: "Compliance",
      assignedCourses: 4,
      progress: 95,
      status: "completed",
      lastActivity: "3 hours ago"
    },
    {
      id: 4,
      name: "Amara Diallo",
      email: "amara.diallo@company.com",
      department: "Risk Management",
      assignedCourses: 2,
      progress: 30,
      status: "in-progress",
      lastActivity: "5 days ago"
    },
    {
      id: 5,
      name: "Thandiwe Mthembu",
      email: "thandiwe.mthembu@company.com",
      department: "Operations",
      assignedCourses: 1,
      progress: 0,
      status: "not-started",
      lastActivity: "Never"
    },
    {
      id: 6,
      name: "Omar Hassan",
      email: "omar.hassan@company.com",
      department: "Finance",
      assignedCourses: 3,
      progress: 45,
      status: "overdue",
      lastActivity: "1 week ago"
    }
  ];

  const departmentData = [
    { department: "Sustainability", progress: 85, enrolled: 25 },
    { department: "Environmental", progress: 72, enrolled: 18 },
    { department: "Compliance", progress: 90, enrolled: 22 },
    { department: "Risk Management", progress: 65, enrolled: 15 },
    { department: "Operations", progress: 58, enrolled: 35 },
    { department: "Finance", progress: 78, enrolled: 20 },
    { department: "HR", progress: 82, enrolled: 12 },
    { department: "Legal", progress: 88, enrolled: 9 }
  ];

  const certificatesData = [
    {
      id: 1,
      certificateId: "GP-20250930-001234",
      staffName: "Adebayo Ogundimu",
      staffEmail: "adebayo.ogundimu@company.com",
      courseName: "ESG Fundamentals for African Markets",
      courseCode: "ESG-101",
      issueDate: "2025-09-25",
      expiryDate: "2027-09-25",
      status: "active"
    },
    {
      id: 2,
      certificateId: "GP-20250928-001235",
      staffName: "Kofi Asante",
      staffEmail: "kofi.asante@company.com",
      courseName: "Sustainable Finance and Investment",
      courseCode: "SF-201",
      issueDate: "2025-09-20",
      expiryDate: "2027-09-20",
      status: "active"
    },
    {
      id: 3,
      certificateId: "GP-20250915-001236",
      staffName: "Fatima Al-Rashid",
      staffEmail: "fatima.alrashid@company.com",
      courseName: "Environmental Risk Assessment",
      courseCode: "ERA-301",
      issueDate: "2025-09-10",
      expiryDate: null,
      status: "revoked"
    },
    {
      id: 4,
      certificateId: "GP-20250901-001237",
      staffName: "Thandiwe Mthembu",
      staffEmail: "thandiwe.mthembu@company.com",
      courseName: "Carbon Footprint Management",
      courseCode: "CFM-401",
      issueDate: "2025-08-28",
      expiryDate: "2026-08-28",
      status: "expired"
    }
  ];

  const billingData = {
    currency: "USD",
    currentPlan: {
      name: "Enterprise Plan",
      description: "Comprehensive ESG training for large organizations",
      status: "active",
      monthlyCost: 2500,
      usedSeats: 156,
      totalSeats: 200,
      nextBilling: "2025-10-30",
      autoRenew: true
    },
    metrics: {
      completions: 342,
      certificates: 89
    },
    recentInvoices: [
      {
        id: "INV-2025-09-001",
        number: "2025-09-001",
        date: "2025-09-01",
        amount: 2500,
        status: "paid"
      },
      {
        id: "INV-2025-08-001",
        number: "2025-08-001",
        date: "2025-08-01",
        amount: 2500,
        status: "paid"
      },
      {
        id: "INV-2025-07-001",
        number: "2025-07-001",
        date: "2025-07-01",
        amount: 2200,
        status: "paid"
      }
    ]
  };

  const analyticsData = {
    engagement: {
      "7d": [
        { date: "Sep 24", value: 85 },
        { date: "Sep 25", value: 92 },
        { date: "Sep 26", value: 78 },
        { date: "Sep 27", value: 88 },
        { date: "Sep 28", value: 95 },
        { date: "Sep 29", value: 82 },
        { date: "Sep 30", value: 90 }
      ],
      "30d": [
        { date: "Sep 1", value: 75 },
        { date: "Sep 5", value: 82 },
        { date: "Sep 10", value: 88 },
        { date: "Sep 15", value: 85 },
        { date: "Sep 20", value: 92 },
        { date: "Sep 25", value: 89 },
        { date: "Sep 30", value: 90 }
      ]
    },
    completion: {
      "7d": [
        { date: "Sep 24", value: 12 },
        { date: "Sep 25", value: 18 },
        { date: "Sep 26", value: 8 },
        { date: "Sep 27", value: 15 },
        { date: "Sep 28", value: 22 },
        { date: "Sep 29", value: 10 },
        { date: "Sep 30", value: 16 }
      ],
      "30d": [
        { date: "Sep 1", value: 45 },
        { date: "Sep 5", value: 52 },
        { date: "Sep 10", value: 38 },
        { date: "Sep 15", value: 48 },
        { date: "Sep 20", value: 55 },
        { date: "Sep 25", value: 42 },
        { date: "Sep 30", value: 50 }
      ]
    },
    certificates: {
      "7d": [
        { date: "Sep 24", value: 3 },
        { date: "Sep 25", value: 5 },
        { date: "Sep 26", value: 2 },
        { date: "Sep 27", value: 4 },
        { date: "Sep 28", value: 6 },
        { date: "Sep 29", value: 1 },
        { date: "Sep 30", value: 4 }
      ],
      "30d": [
        { date: "Sep 1", value: 12 },
        { date: "Sep 5", value: 15 },
        { date: "Sep 10", value: 8 },
        { date: "Sep 15", value: 18 },
        { date: "Sep 20", value: 22 },
        { date: "Sep 25", value: 14 },
        { date: "Sep 30", value: 20 }
      ]
    },
    "time-spent": {
      "7d": [
        { date: "Sep 24", value: 245 },
        { date: "Sep 25", value: 312 },
        { date: "Sep 26", value: 189 },
        { date: "Sep 27", value: 278 },
        { date: "Sep 28", value: 356 },
        { date: "Sep 29", value: 198 },
        { date: "Sep 30", value: 289 }
      ],
      "30d": [
        { date: "Sep 1", value: 1250 },
        { date: "Sep 5", value: 1420 },
        { date: "Sep 10", value: 1180 },
        { date: "Sep 15", value: 1380 },
        { date: "Sep 20", value: 1520 },
        { date: "Sep 25", value: 1290 },
        { date: "Sep 30", value: 1450 }
      ]
    },
    insights: [
      {
        title: "Engagement Rate",
        value: "87%",
        description: "Above industry average",
        icon: "TrendingUp",
        color: "bg-green-50 text-green-600"
      },
      {
        title: "Completion Time",
        value: "4.2 days",
        description: "Average per course",
        icon: "Clock",
        color: "bg-blue-50 text-blue-600"
      },
      {
        title: "Knowledge Retention",
        value: "92%",
        description: "Post-training assessment",
        icon: "Brain",
        color: "bg-purple-50 text-purple-600"
      },
      {
        title: "Satisfaction Score",
        value: "4.6/5",
        description: "Learner feedback",
        icon: "Star",
        color: "bg-yellow-50 text-yellow-600"
      }
    ],
    popularCourses: [
      {
        id: 1,
        name: "ESG Fundamentals for African Markets",
        enrollments: 89,
        completionRate: 85,
        avgRating: 4.7
      },
      {
        id: 2,
        name: "Sustainable Finance and Investment",
        enrollments: 67,
        completionRate: 78,
        avgRating: 4.5
      },
      {
        id: 3,
        name: "Environmental Risk Assessment",
        enrollments: 54,
        completionRate: 82,
        avgRating: 4.6
      },
      {
        id: 4,
        name: "Carbon Footprint Management",
        enrollments: 43,
        completionRate: 75,
        avgRating: 4.4
      }
    ],
    roi: {
      costSavings: "$125K",
      productivityGain: "+18%",
      complianceScore: "94%"
    }
  };

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole');
    
    if (!token || userRole !== 'organization') {
      navigate('/login');
      return;
    }

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleBulkAction = (action, selectedIds = []) => {
    console.log('Bulk action:', action, selectedIds);
    // Handle bulk actions like CSV upload, export, add staff, etc.
  };

  const handleStaffAction = (action, staffId) => {
    console.log('Staff action:', action, staffId);
    // Handle individual staff actions
  };

  const handleCertificateAction = (action, certificateId) => {
    console.log('Certificate action:', action, certificateId);
    // Handle certificate actions
  };

  const handleBillingAction = (action, data) => {
    console.log('Billing action:', action, data);
    // Handle billing actions
  };

  const handleAnalyticsAction = (action, data) => {
    console.log('Analytics action:', action, data);
    // Handle analytics actions
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'staff', label: 'Staff Management', icon: 'Users' },
    { id: 'progress', label: 'Progress Analytics', icon: 'BarChart3' },
    { id: 'certificates', label: 'Certificates', icon: 'Award' },
    { id: 'billing', label: 'Billing', icon: 'CreditCard' },
    { id: 'analytics', label: 'Analytics', icon: 'TrendingUp' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading organization dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Organization Dashboard</h1>
                <p className="text-muted-foreground">
                  Manage your team's ESG training and track organizational progress
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  iconName="Download"
                  iconPosition="left"
                  onClick={() => handleBulkAction('export-dashboard')}
                >
                  Export Report
                </Button>
                <Button
                  variant="default"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={() => handleBulkAction('add')}
                >
                  Add Staff
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <StatsOverview stats={organizationStats} />
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-border mb-8">
            <nav className="flex space-x-8 overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
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

          {/* Tab Content */}
          <div className="space-y-8">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <DepartmentProgressChart
                  departmentData={departmentData}
                  chartType={chartType}
                  onChartTypeChange={setChartType}
                />
                <BillingOverview
                  billingData={billingData}
                  onBillingAction={handleBillingAction}
                />
              </div>
            )}

            {activeTab === 'staff' && (
              <StaffManagementTable
                staffData={staffData}
                onBulkAction={handleBulkAction}
                onStaffAction={handleStaffAction}
              />
            )}

            {activeTab === 'progress' && (
              <DepartmentProgressChart
                departmentData={departmentData}
                chartType={chartType}
                onChartTypeChange={setChartType}
              />
            )}

            {activeTab === 'certificates' && (
              <CertificateManagement
                certificates={certificatesData}
                onCertificateAction={handleCertificateAction}
              />
            )}

            {activeTab === 'billing' && (
              <BillingOverview
                billingData={billingData}
                onBillingAction={handleBillingAction}
              />
            )}

            {activeTab === 'analytics' && (
              <AnalyticsDashboard
                analyticsData={analyticsData}
                onAnalyticsAction={handleAnalyticsAction}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationDashboard;