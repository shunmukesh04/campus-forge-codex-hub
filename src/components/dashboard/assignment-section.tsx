
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, Calendar, Clock, FileCheck, FilePen, FileText } from 'lucide-react';

type Assignment = {
  id: string;
  title: string;
  course: string;
  courseCode: string;
  dueDate: string;
  completed: boolean;
  progress?: number;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'submitted' | 'graded';
};

interface AssignmentSectionProps {
  assignments: Assignment[];
}

export const AssignmentSection = ({ assignments }: AssignmentSectionProps) => {
  const getStatusIcon = (status: Assignment['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'in-progress':
        return <FilePen className="h-4 w-4 text-blue-500" />;
      case 'submitted':
        return <FileCheck className="h-4 w-4 text-green-500" />;
      case 'graded':
        return <FileText className="h-4 w-4 text-purple-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getPriorityClass = (priority: Assignment['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-500 border-red-200 bg-red-50';
      case 'medium':
        return 'text-amber-500 border-amber-200 bg-amber-50';
      case 'low':
        return 'text-green-500 border-green-200 bg-green-50';
      default:
        return '';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assignments</CardTitle>
        <CardDescription>Track your upcoming and completed assignments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {assignments.map((assignment) => (
            <div key={assignment.id} className="flex flex-col space-y-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(assignment.status)}
                    <h3 className="font-medium">{assignment.title}</h3>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {assignment.courseCode}: {assignment.course}
                  </div>
                </div>
                <Badge variant="outline" className={`${getPriorityClass(assignment.priority)}`}>
                  {assignment.priority.charAt(0).toUpperCase() + assignment.priority.slice(1)} Priority
                </Badge>
              </div>
              
              {assignment.description && (
                <p className="text-sm text-muted-foreground">{assignment.description}</p>
              )}
              
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className={assignment.dueDate.includes('Today') || assignment.dueDate.includes('Tomorrow') 
                    ? 'text-red-600 font-medium' 
                    : ''
                  }>
                    Due: {assignment.dueDate}
                  </span>
                </div>
                <Badge variant={
                  assignment.status === 'graded' ? 'outline' :
                  assignment.status === 'submitted' ? 'secondary' :
                  assignment.status === 'in-progress' ? 'default' : 
                  'destructive'
                }>
                  {assignment.status === 'in-progress' ? 'In Progress' : 
                   assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                </Badge>
              </div>
              
              {assignment.status === 'in-progress' && assignment.progress && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Progress</span>
                    <span>{assignment.progress}%</span>
                  </div>
                  <Progress value={assignment.progress} className="h-1.5" />
                </div>
              )}
              
              <div className="pt-2">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to={`/assignments/${assignment.id}`}>
                    {assignment.status === 'pending' ? 'Start Assignment' : 
                     assignment.status === 'in-progress' ? 'Continue Working' :
                     assignment.status === 'submitted' ? 'View Submission' : 'View Feedback'}
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <Link to="/assignments">
            View All Assignments
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
