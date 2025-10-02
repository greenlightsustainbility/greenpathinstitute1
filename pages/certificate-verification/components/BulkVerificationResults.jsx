import React, { useState } from 'react';
import Button from '../../../components/ui/Button.jsx';
import Icon from '../../../components/AppIcon.jsx';

const BulkVerificationResults = ({ results, onReset, onDownloadReport }) => {
  const [expandedRows, setExpandedRows] = useState(new Set());

  if (!results || !results?.length) return null;

  const toggleRowExpansion = (index) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded?.has(index)) {
      newExpanded?.delete(index);
    } else {
      newExpanded?.add(index);
    }
    setExpandedRows(newExpanded);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'valid':
        return { icon: 'CheckCircle', color: 'text-success' };
      case 'revoked':
        return { icon: 'XCircle', color: 'text-destructive' };
      case 'not_found':
        return { icon: 'AlertCircle', color: 'text-warning' };
      default:
        return { icon: 'AlertTriangle', color: 'text-text-secondary' };
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'valid':
        return 'bg-success/10 text-success border-success/20';
      case 'revoked':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'not_found':
        return 'bg-warning/10 text-warning border-warning/20';
      default:
        return 'bg-muted text-text-secondary border-border';
    }
  };

  const summary = results?.reduce((acc, result) => {
    acc[result.status] = (acc?.[result?.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-muted border-b border-border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-heading font-semibold text-text-primary">
              Bulk Verification Results
            </h3>
            <p className="text-text-secondary font-body mt-1">
              {results?.length} certificates processed
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
              onClick={onDownloadReport}
            >
              Download Report
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={onReset}
            />
          </div>
        </div>
      </div>
      {/* Summary Stats */}
      <div className="p-6 border-b border-border">
        <h4 className="font-heading font-medium text-text-primary mb-4">
          Verification Summary
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-success/5 rounded-lg border border-success/20">
            <div className="text-2xl font-heading font-bold text-success">
              {summary?.valid || 0}
            </div>
            <div className="text-sm font-caption text-text-secondary">Valid</div>
          </div>
          <div className="text-center p-4 bg-destructive/5 rounded-lg border border-destructive/20">
            <div className="text-2xl font-heading font-bold text-destructive">
              {summary?.revoked || 0}
            </div>
            <div className="text-sm font-caption text-text-secondary">Revoked</div>
          </div>
          <div className="text-center p-4 bg-warning/5 rounded-lg border border-warning/20">
            <div className="text-2xl font-heading font-bold text-warning">
              {summary?.not_found || 0}
            </div>
            <div className="text-sm font-caption text-text-secondary">Not Found</div>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg border border-border">
            <div className="text-2xl font-heading font-bold text-text-primary">
              {((summary?.valid || 0) / results?.length * 100)?.toFixed(1)}%
            </div>
            <div className="text-sm font-caption text-text-secondary">Success Rate</div>
          </div>
        </div>
      </div>
      {/* Results Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="text-left p-4 font-heading font-medium text-text-primary">
                Certificate ID
              </th>
              <th className="text-left p-4 font-heading font-medium text-text-primary">
                Status
              </th>
              <th className="text-left p-4 font-heading font-medium text-text-primary">
                Recipient
              </th>
              <th className="text-left p-4 font-heading font-medium text-text-primary">
                Course
              </th>
              <th className="text-center p-4 font-heading font-medium text-text-primary">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {results?.map((result, index) => {
              const statusConfig = getStatusIcon(result?.status);
              const isExpanded = expandedRows?.has(index);
              
              return (
                <React.Fragment key={index}>
                  <tr className="border-b border-border hover:bg-muted/50 transition-colors duration-200">
                    <td className="p-4">
                      <code className="font-mono text-sm bg-background px-2 py-1 rounded">
                        {result?.certificateId}
                      </code>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Icon 
                          name={statusConfig?.icon} 
                          size={16} 
                          className={statusConfig?.color} 
                        />
                        <span className={`px-2 py-1 rounded-full text-xs font-caption border ${getStatusBadge(result?.status)}`}>
                          {result?.status?.replace('_', ' ')?.toUpperCase()}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-body text-text-primary">
                        {result?.certificate?.recipientName || '-'}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="font-body text-text-primary">
                        {result?.certificate?.courseTitle || '-'}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      {result?.status === 'valid' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
                          onClick={() => toggleRowExpansion(index)}
                        />
                      )}
                    </td>
                  </tr>
                  {/* Expanded Row Details */}
                  {isExpanded && result?.status === 'valid' && result?.certificate && (
                    <tr className="bg-muted/30">
                      <td colSpan={5} className="p-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <h5 className="font-heading font-medium text-text-primary">
                              Certificate Details
                            </h5>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-text-secondary font-caption">Completion Date:</span>
                                <span className="font-body text-text-primary">
                                  {new Date(result.certificate.completionDate)?.toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-text-secondary font-caption">Grade:</span>
                                <span className="font-body text-text-primary">
                                  {result?.certificate?.grade}% - {result?.certificate?.gradeLevel}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-text-secondary font-caption">Institution:</span>
                                <span className="font-body text-text-primary">
                                  {result?.certificate?.issuingInstitution}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <h5 className="font-heading font-medium text-text-primary">
                              Verification Status
                            </h5>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-text-secondary font-caption">HMAC Status:</span>
                                <span className="font-body text-success font-medium">Valid</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-text-secondary font-caption">Digital Signature:</span>
                                <span className="font-body text-success font-medium">Verified</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-text-secondary font-caption">Verified On:</span>
                                <span className="font-body text-text-primary">
                                  {new Date()?.toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BulkVerificationResults;