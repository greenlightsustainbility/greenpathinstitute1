import React from 'react';
import Icon from '../../../components/AppIcon.jsx';
import Button from '../../../components/ui/Button.jsx';

const BillingOverview = ({ billingData, onBillingAction }) => {
  const formatCurrency = (amount, currency = 'USD') => {
    const currencySymbols = {
      'USD': '$',
      'EUR': '€',
      'GBP': '£',
      'NGN': '₦',
      'ZAR': 'R'
    };
    
    return `${currencySymbols?.[currency] || '$'}${amount?.toLocaleString()}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'active': { color: 'bg-success text-success-foreground', label: 'Active' },
      'pending': { color: 'bg-warning text-warning-foreground', label: 'Pending' },
      'overdue': { color: 'bg-destructive text-destructive-foreground', label: 'Overdue' },
      'cancelled': { color: 'bg-muted text-muted-foreground', label: 'Cancelled' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.['active'];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Billing Overview</h3>
          <p className="text-sm text-muted-foreground">Subscription and payment information</p>
        </div>
        <Button
          variant="outline"
          iconName="CreditCard"
          iconPosition="left"
          onClick={() => onBillingAction('manage-payment')}
        >
          Manage Payment
        </Button>
      </div>
      {/* Current Subscription */}
      <div className="bg-muted rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-medium text-foreground">{billingData?.currentPlan?.name}</h4>
            <p className="text-sm text-muted-foreground">{billingData?.currentPlan?.description}</p>
          </div>
          {getStatusBadge(billingData?.currentPlan?.status)}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Monthly Cost</p>
            <p className="font-semibold text-foreground">
              {formatCurrency(billingData?.currentPlan?.monthlyCost, billingData?.currency)}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Staff Seats</p>
            <p className="font-semibold text-foreground">
              {billingData?.currentPlan?.usedSeats} / {billingData?.currentPlan?.totalSeats}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Next Billing</p>
            <p className="font-semibold text-foreground">
              {formatDate(billingData?.currentPlan?.nextBilling)}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Auto Renew</p>
            <p className="font-semibold text-foreground">
              {billingData?.currentPlan?.autoRenew ? 'Enabled' : 'Disabled'}
            </p>
          </div>
        </div>
      </div>
      {/* Usage Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Icon name="Users" size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-blue-600 font-medium">Seat Utilization</p>
              <p className="text-lg font-bold text-blue-800">
                {Math.round((billingData?.currentPlan?.usedSeats / billingData?.currentPlan?.totalSeats) * 100)}%
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Icon name="BookOpen" size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-green-600 font-medium">Course Completions</p>
              <p className="text-lg font-bold text-green-800">{billingData?.metrics?.completions}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Icon name="Award" size={20} className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-purple-600 font-medium">Certificates Issued</p>
              <p className="text-lg font-bold text-purple-800">{billingData?.metrics?.certificates}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Recent Invoices */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-foreground">Recent Invoices</h4>
          <Button
            variant="ghost"
            size="sm"
            iconName="FileText"
            iconPosition="left"
            onClick={() => onBillingAction('view-all-invoices')}
          >
            View All
          </Button>
        </div>
        
        <div className="space-y-3">
          {billingData?.recentInvoices?.map((invoice) => (
            <div key={invoice?.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-background rounded-lg flex items-center justify-center">
                  <Icon name="FileText" size={16} className="text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Invoice #{invoice?.number}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(invoice?.date)} • {formatCurrency(invoice?.amount, billingData?.currency)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusBadge(invoice?.status)}
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Download"
                  onClick={() => onBillingAction('download-invoice', invoice?.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Quick Actions */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="font-medium text-foreground mb-4">Quick Actions</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <Button
            variant="outline"
            size="sm"
            iconName="Plus"
            iconPosition="left"
            onClick={() => onBillingAction('add-seats')}
            fullWidth
          >
            Add Seats
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Zap"
            iconPosition="left"
            onClick={() => onBillingAction('upgrade-plan')}
            fullWidth
          >
            Upgrade Plan
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Settings"
            iconPosition="left"
            onClick={() => onBillingAction('billing-settings')}
            fullWidth
          >
            Settings
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="HelpCircle"
            iconPosition="left"
            onClick={() => onBillingAction('billing-support')}
            fullWidth
          >
            Support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BillingOverview;