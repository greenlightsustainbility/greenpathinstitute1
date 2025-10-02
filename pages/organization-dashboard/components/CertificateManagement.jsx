import React, { useState } from 'react';
import Icon from '../../../components/AppIcon.jsx';
import Button from '../../../components/ui/Button.jsx';
import Input from '../../../components/ui/Input.jsx';

const CertificateManagement = ({ certificates, onCertificateAction }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredCertificates = certificates?.filter(cert => {
    const matchesSearch = cert?.staffName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         cert?.courseName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         cert?.certificateId?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || cert?.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      'active': { color: 'bg-success text-success-foreground', label: 'Active', icon: 'CheckCircle' },
      'revoked': { color: 'bg-destructive text-destructive-foreground', label: 'Revoked', icon: 'XCircle' },
      'expired': { color: 'bg-warning text-warning-foreground', label: 'Expired', icon: 'Clock' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.['active'];
    return (
      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        <Icon name={config?.icon} size={12} />
        <span>{config?.label}</span>
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">Certificate Management</h3>
            <p className="text-sm text-muted-foreground">Manage and verify issued certificates</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              iconName="Download"
              iconPosition="left"
              onClick={() => onCertificateAction('export-all')}
            >
              Export All
            </Button>
            <Button
              variant="outline"
              iconName="FileCheck"
              iconPosition="left"
              onClick={() => onCertificateAction('bulk-verify')}
            >
              Bulk Verify
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <div className="flex-1 max-w-md">
            <Input
              type="search"
              placeholder="Search by staff name, course, or certificate ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            {['all', 'active', 'revoked', 'expired']?.map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors capitalize ${
                  filterStatus === status
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="p-4 text-left text-sm font-medium text-muted-foreground">Certificate ID</th>
              <th className="p-4 text-left text-sm font-medium text-muted-foreground">Staff Member</th>
              <th className="p-4 text-left text-sm font-medium text-muted-foreground">Course</th>
              <th className="p-4 text-left text-sm font-medium text-muted-foreground">Issue Date</th>
              <th className="p-4 text-left text-sm font-medium text-muted-foreground">Expiry Date</th>
              <th className="p-4 text-left text-sm font-medium text-muted-foreground">Status</th>
              <th className="p-4 text-left text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCertificates?.map((cert) => (
              <tr key={cert?.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="Award" size={16} className="text-primary" />
                    <span className="font-mono text-sm text-foreground">{cert?.certificateId}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-primary-foreground">
                        {cert?.staffName?.split(' ')?.map(n => n?.[0])?.join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{cert?.staffName}</p>
                      <p className="text-xs text-muted-foreground">{cert?.staffEmail}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <p className="text-sm text-foreground">{cert?.courseName}</p>
                  <p className="text-xs text-muted-foreground">{cert?.courseCode}</p>
                </td>
                <td className="p-4">
                  <span className="text-sm text-foreground">{formatDate(cert?.issueDate)}</span>
                </td>
                <td className="p-4">
                  <span className="text-sm text-foreground">
                    {cert?.expiryDate ? formatDate(cert?.expiryDate) : 'No Expiry'}
                  </span>
                </td>
                <td className="p-4">
                  {getStatusBadge(cert?.status)}
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                      onClick={() => onCertificateAction('view', cert?.id)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Download"
                      onClick={() => onCertificateAction('download', cert?.id)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="ExternalLink"
                      onClick={() => onCertificateAction('verify', cert?.id)}
                    />
                    {cert?.status === 'active' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Ban"
                        onClick={() => onCertificateAction('revoke', cert?.id)}
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View */}
      <div className="lg:hidden">
        {filteredCertificates?.map((cert) => (
          <div key={cert?.id} className="p-4 border-b border-border">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Icon name="Award" size={16} className="text-primary" />
                <span className="font-mono text-sm text-foreground">{cert?.certificateId}</span>
              </div>
              {getStatusBadge(cert?.status)}
            </div>
            
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary-foreground">
                  {cert?.staffName?.split(' ')?.map(n => n?.[0])?.join('')}
                </span>
              </div>
              <div>
                <p className="font-medium text-foreground">{cert?.staffName}</p>
                <p className="text-sm text-muted-foreground">{cert?.staffEmail}</p>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Course:</span>
                <span className="text-foreground">{cert?.courseName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Issued:</span>
                <span className="text-foreground">{formatDate(cert?.issueDate)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Expires:</span>
                <span className="text-foreground">
                  {cert?.expiryDate ? formatDate(cert?.expiryDate) : 'No Expiry'}
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Eye"
                  onClick={() => onCertificateAction('view', cert?.id)}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Download"
                  onClick={() => onCertificateAction('download', cert?.id)}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="ExternalLink"
                  onClick={() => onCertificateAction('verify', cert?.id)}
                />
              </div>
              {cert?.status === 'active' && (
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Ban"
                  onClick={() => onCertificateAction('revoke', cert?.id)}
                >
                  Revoke
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
      {filteredCertificates?.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Award" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No certificates found</h3>
          <p className="text-muted-foreground">
            {searchTerm || filterStatus !== 'all' ?'Try adjusting your search or filter criteria' :'Certificates will appear here once staff complete courses'}
          </p>
        </div>
      )}
    </div>
  );
};

export default CertificateManagement;