
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Calendar, Clock, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CourseCardProps {
  title: string;
  code: string;
  instructor: string;
  progress?: number;
  category: string;
  credits: number;
  students?: number;
  nextClass?: string;
  className?: string;
  onClick?: () => void;
}

export const CourseCard = ({
  title,
  code,
  instructor,
  progress,
  category,
  credits,
  students,
  nextClass,
  className,
  onClick,
}: CourseCardProps) => {
  return (
    <Card 
      className={cn("h-full hover:shadow-md transition-shadow cursor-pointer", className)}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="outline">{category}</Badge>
          <div className="text-sm font-medium text-muted-foreground">{code}</div>
        </div>
        
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground mb-3">Instructor: {instructor}</p>
        
        {progress !== undefined && (
          <div className="space-y-1 mb-3">
            <div className="flex justify-between text-xs">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} />
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="flex items-center text-xs text-muted-foreground">
            <BookOpen className="h-3.5 w-3.5 mr-1" />
            <span>{credits} Credits</span>
          </div>
          
          {students && (
            <div className="flex items-center text-xs text-muted-foreground">
              <Users className="h-3.5 w-3.5 mr-1" />
              <span>{students} Students</span>
            </div>
          )}
          
          {nextClass && (
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              <span>{nextClass}</span>
            </div>
          )}
        </div>
      </CardContent>
      
      {progress !== undefined && progress < 100 && nextClass && (
        <CardFooter className="p-4 pt-0">
          <div className="w-full rounded-md border p-2 flex items-center">
            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
            <div className="text-xs">
              <p>Next class</p>
              <p className="font-medium">{nextClass}</p>
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};
