import React, { useState } from 'react';
import Button from '../../../components/ui/Button.jsx';
import Icon from '../../../components/AppIcon.jsx';

const BulkVerification = ({ onBulkVerify, isLoading }) => {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === 'dragenter' || e?.type === 'dragover') {
      setDragActive(true);
    } else if (e?.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    const droppedFile = e?.dataTransfer?.files?.[0];
    handleFileSelection(droppedFile);
  };

  const handleFileSelection = (selectedFile) => {
    if (!selectedFile) return;

    if (selectedFile?.type !== 'text/csv' && !selectedFile?.name?.endsWith('.csv')) {
      setUploadError('Please upload a CSV file only');
      return;
    }

    if (selectedFile?.size > 5 * 1024 * 1024) { // 5MB limit
      setUploadError('File size must be less than 5MB');
      return;
    }

    setFile(selectedFile);
    setUploadError('');
  };

  const handleFileInputChange = (e) => {
    const selectedFile = e?.target?.files?.[0];
    handleFileSelection(selectedFile);
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (!file) {
      setUploadError('Please select a CSV file');
      return;
    }

    onBulkVerify(file);
  };

  const downloadTemplate = () => {
    const csvContent = `certificate_id,notes
GP-20241015-ABC123,Employee certification
GP-20241016-DEF456,Contractor verification
GP-20241017-GHI789,Partner validation`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL?.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'certificate_verification_template.csv';
    document.body?.appendChild(a);
    a?.click();
    document.body?.removeChild(a);
    window.URL?.revokeObjectURL(url);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="FileSpreadsheet" size={32} className="text-secondary" />
        </div>
        <h2 className="text-2xl font-heading font-semibold text-text-primary mb-2">
          Bulk Verification
        </h2>
        <p className="text-text-secondary font-body">
          Upload a CSV file to verify multiple certificates at once
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* File Upload Area */}
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
            dragActive 
              ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept=".csv"
            onChange={handleFileInputChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="space-y-4">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto">
              <Icon name="Upload" size={24} className="text-text-secondary" />
            </div>
            
            {file ? (
              <div className="space-y-2">
                <div className="flex items-center justify-center space-x-2">
                  <Icon name="FileText" size={20} className="text-success" />
                  <span className="font-body font-medium text-text-primary">
                    {file?.name}
                  </span>
                </div>
                <p className="text-sm text-text-secondary font-caption">
                  {(file?.size / 1024)?.toFixed(1)} KB
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="font-body text-text-primary">
                  Drop your CSV file here, or{' '}
                  <span className="text-primary font-medium">browse</span>
                </p>
                <p className="text-sm text-text-secondary font-caption">
                  Maximum file size: 5MB
                </p>
              </div>
            )}
          </div>
        </div>

        {uploadError && (
          <div className="flex items-center space-x-2 text-destructive text-sm">
            <Icon name="AlertCircle" size={16} />
            <span className="font-caption">{uploadError}</span>
          </div>
        )}

        {/* Template Download */}
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-body font-medium text-text-primary">
                Need a template?
              </h4>
              <p className="text-sm text-text-secondary font-caption">
                Download our CSV template with the correct format
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
              onClick={downloadTemplate}
            >
              Download Template
            </Button>
          </div>
        </div>

        {/* CSV Format Guide */}
        <div className="bg-muted rounded-lg p-4">
          <h4 className="font-body font-medium text-text-primary mb-3">
            CSV Format Requirements
          </h4>
          <div className="space-y-2 text-sm font-caption text-text-secondary">
            <div className="flex items-start space-x-2">
              <Icon name="Dot" size={16} className="mt-1 flex-shrink-0" />
              <span>First column: <code className="bg-background px-1 rounded">certificate_id</code></span>
            </div>
            <div className="flex items-start space-x-2">
              <Icon name="Dot" size={16} className="mt-1 flex-shrink-0" />
              <span>Second column: <code className="bg-background px-1 rounded">notes</code> (optional)</span>
            </div>
            <div className="flex items-start space-x-2">
              <Icon name="Dot" size={16} className="mt-1 flex-shrink-0" />
              <span>Certificate IDs must be in GP-YYYYMMDD-XXXXXX format</span>
            </div>
            <div className="flex items-start space-x-2">
              <Icon name="Dot" size={16} className="mt-1 flex-shrink-0" />
              <span>Maximum 1000 certificates per file</span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          loading={isLoading}
          iconName="FileCheck"
          iconPosition="left"
          fullWidth
          disabled={!file}
        >
          Verify Certificates
        </Button>
      </form>
    </div>
  );
};

export default BulkVerification;