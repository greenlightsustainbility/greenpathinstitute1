import React, { useState } from 'react';
import Icon from '../../../components/AppIcon.jsx';
import Button from '../../../components/ui/Button.jsx';

const RefundPolicy = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={20} className="text-primary" />
          <h3 className="font-heading font-semibold text-lg text-card-foreground">
            Refund Policy
          </h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          onClick={() => setIsExpanded(!isExpanded)}
        />
      </div>

      <div className="mt-4">
        <div className="bg-success/10 border border-success/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Clock" size={16} className="text-success mt-0.5" />
            <div>
              <h4 className="font-body font-semibold text-sm text-success mb-1">
                7-Day Money-Back Guarantee
              </h4>
              <p className="font-caption text-xs text-success/80">
                Full refund available within 7 days of purchase if you're not satisfied with your course.
              </p>
            </div>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-4 space-y-4">
            <div className="space-y-3">
              <h4 className="font-body font-semibold text-sm text-card-foreground">
                Refund Conditions:
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <Icon name="Check" size={14} className="text-success mt-0.5" />
                  <span className="font-caption text-xs text-text-secondary">
                    Request must be made within 7 days of purchase
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <Icon name="Check" size={14} className="text-success mt-0.5" />
                  <span className="font-caption text-xs text-text-secondary">
                    Course completion must be less than 30%
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <Icon name="Check" size={14} className="text-success mt-0.5" />
                  <span className="font-caption text-xs text-text-secondary">
                    Certificate must not have been issued
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <Icon name="Check" size={14} className="text-success mt-0.5" />
                  <span className="font-caption text-xs text-text-secondary">
                    Refund processed to original payment method
                  </span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-body font-semibold text-sm text-card-foreground">
                How to Request a Refund:
              </h4>
              <ol className="space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center font-bold mt-0.5">
                    1
                  </span>
                  <span className="font-caption text-xs text-text-secondary">
                    Contact our support team at support@greenpathinstitute.com
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center font-bold mt-0.5">
                    2
                  </span>
                  <span className="font-caption text-xs text-text-secondary">
                    Provide your order number and reason for refund
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center font-bold mt-0.5">
                    3
                  </span>
                  <span className="font-caption text-xs text-text-secondary">
                    Receive confirmation and refund within 5-7 business days
                  </span>
                </li>
              </ol>
            </div>

            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={16} className="text-primary mt-0.5" />
                <div>
                  <h4 className="font-body font-medium text-sm text-card-foreground mb-2">
                    Important Notes:
                  </h4>
                  <ul className="space-y-1">
                    <li className="font-caption text-xs text-text-secondary">
                      • Bulk organization purchases may have different refund terms
                    </li>
                    <li className="font-caption text-xs text-text-secondary">
                      • Processing fees may apply for certain payment methods
                    </li>
                    <li className="font-caption text-xs text-text-secondary">
                      • Refunds are processed in the original currency of purchase
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RefundPolicy;