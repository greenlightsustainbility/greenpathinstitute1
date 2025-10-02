import React, { useState } from 'react';
import Icon from '../../../components/AppIcon.jsx';
import Button from '../../../components/ui/Button.jsx';
import Input from '../../../components/ui/Input.jsx';

const StaffManagementTable = ({ staffData, onBulkAction, onStaffAction }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedStaff, setSelectedStaff] = useState([]);

  const filteredStaff = staffData?.filter(staff =>
    staff?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    staff?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    staff?.department?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const sortedStaff = [...filteredStaff]?.sort((a, b) => {
    const aValue = a?.[sortField];
    const bValue = b?.[sortField];
    const modifier = sortDirection === 'asc' ? 1 : -1;
    
    if (typeof aValue === 'string') {
      return aValue?.localeCompare(bValue) * modifier;
    }
    return (aValue - bValue) * modifier;
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedStaff(sortedStaff?.map(staff => staff?.id));
    } else {
      setSelectedStaff([]);
    }
  };

  const handleSelectStaff = (staffId, checked) => {
    if (checked) {
      setSelectedStaff([...selectedStaff, staffId]);
    } else {
      setSelectedStaff(selectedStaff?.filter(id => id !== staffId));
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'text-success';
    if (progress >= 50) return 'text-warning';
    return 'text-destructive';
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'completed': { color: 'bg-success text-success-foreground', label: 'Completed' },
      'in-progress': { color: 'bg-warning text-warning-foreground', label: 'In Progress' },
      'not-started': { color: 'bg-muted text-muted-foreground', label: 'Not Started' },
      'overdue': { color: 'bg-destructive text-destructive-foreground', label: 'Overdue' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.['not-started'];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header with Search and Bulk Actions */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1 max-w-md">
            <Input
              type="search"
              placeholder="Search staff by name, email, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              iconName="Upload"
              iconPosition="left"
              onClick={() => onBulkAction('upload')}
            >
              Upload CSV
            </Button>
            <Button
              variant="outline"
              iconName="Download"
              iconPosition="left"
              onClick={() => onBulkAction('export')}
            >
              Export Report
            </Button>
            <Button
              variant="default"
              iconName="Plus"
              iconPosition="left"
              onClick={() => onBulkAction('add')}
            >
              Add Staff
            </Button>
          </div>
        </div>
        
        {selectedStaff?.length > 0 && (
          <div className="mt-4 p-3 bg-muted rounded-lg flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              {selectedStaff?.length} staff member(s) selected
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                iconName="BookOpen"
                onClick={() => onBulkAction('assign-course', selectedStaff)}
              >
                Assign Course
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Mail"
                onClick={() => onBulkAction('send-reminder', selectedStaff)}
              >
                Send Reminder
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="p-4 text-left">
                <input
                  type="checkbox"
                  checked={selectedStaff?.length === sortedStaff?.length && sortedStaff?.length > 0}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                  className="rounded border-border"
                />
              </th>
              {[
                { key: 'name', label: 'Staff Member' },
                { key: 'department', label: 'Department' },
                { key: 'assignedCourses', label: 'Assigned Courses' },
                { key: 'progress', label: 'Progress' },
                { key: 'status', label: 'Status' },
                { key: 'lastActivity', label: 'Last Activity' },
                { key: 'actions', label: 'Actions' }
              ]?.map((column) => (
                <th
                  key={column?.key}
                  className="p-4 text-left text-sm font-medium text-muted-foreground"
                >
                  {column?.key !== 'actions' ? (
                    <button
                      onClick={() => handleSort(column?.key)}
                      className="flex items-center space-x-1 hover:text-foreground transition-colors"
                    >
                      <span>{column?.label}</span>
                      {sortField === column?.key && (
                        <Icon
                          name={sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'}
                          size={16}
                        />
                      )}
                    </button>
                  ) : (
                    column?.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedStaff?.map((staff) => (
              <tr key={staff?.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedStaff?.includes(staff?.id)}
                    onChange={(e) => handleSelectStaff(staff?.id, e?.target?.checked)}
                    className="rounded border-border"
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary-foreground">
                        {staff?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{staff?.name}</p>
                      <p className="text-sm text-muted-foreground">{staff?.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm text-foreground">{staff?.department}</span>
                </td>
                <td className="p-4">
                  <span className="text-sm text-foreground">{staff?.assignedCourses}</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${staff?.progress}%` }}
                      />
                    </div>
                    <span className={`text-sm font-medium ${getProgressColor(staff?.progress)}`}>
                      {staff?.progress}%
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  {getStatusBadge(staff?.status)}
                </td>
                <td className="p-4">
                  <span className="text-sm text-muted-foreground">{staff?.lastActivity}</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                      onClick={() => onStaffAction('view', staff?.id)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Mail"
                      onClick={() => onStaffAction('message', staff?.id)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="MoreHorizontal"
                      onClick={() => onStaffAction('menu', staff?.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View */}
      <div className="lg:hidden">
        {sortedStaff?.map((staff) => (
          <div key={staff?.id} className="p-4 border-b border-border">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedStaff?.includes(staff?.id)}
                  onChange={(e) => handleSelectStaff(staff?.id, e?.target?.checked)}
                  className="rounded border-border mt-1"
                />
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-foreground">
                    {staff?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-foreground">{staff?.name}</p>
                  <p className="text-sm text-muted-foreground">{staff?.email}</p>
                </div>
              </div>
              {getStatusBadge(staff?.status)}
            </div>
            
            <div className="space-y-2 mb-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Department:</span>
                <span className="text-foreground">{staff?.department}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Courses:</span>
                <span className="text-foreground">{staff?.assignedCourses}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Last Activity:</span>
                <span className="text-foreground">{staff?.lastActivity}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 flex-1">
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${staff?.progress}%` }}
                  />
                </div>
                <span className={`text-sm font-medium ${getProgressColor(staff?.progress)}`}>
                  {staff?.progress}%
                </span>
              </div>
              <div className="flex items-center space-x-1 ml-4">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Eye"
                  onClick={() => onStaffAction('view', staff?.id)}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="MoreHorizontal"
                  onClick={() => onStaffAction('menu', staff?.id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {sortedStaff?.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No staff members found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm ? 'Try adjusting your search criteria' : 'Start by adding staff members to your organization'}
          </p>
          <Button
            variant="default"
            iconName="Plus"
            iconPosition="left"
            onClick={() => onBulkAction('add')}
          >
            Add First Staff Member
          </Button>
        </div>
      )}
    </div>
  );
};

export default StaffManagementTable;