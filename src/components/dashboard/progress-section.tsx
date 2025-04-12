
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Activity, Award, BookOpen, Code, Gauge, GraduationCap, BookMarked, CheckCircle2 } from 'lucide-react';

interface ProgressItemProps {
  title: string;
  description?: string;
  value: number;
  icon?: React.ReactNode;
  badgeText?: string;
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
  items?: {
    label: string;
    value: string;
  }[];
}

interface ProgressSectionProps {
  title: string;
  description?: string;
  items: ProgressItemProps[];
  className?: string;
}

const ProgressItem = ({ title, description, value, icon, badgeText, badgeVariant = 'outline', items }: ProgressItemProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          {icon && <div className="text-primary">{icon}</div>}
          <div>
            <h4 className="font-medium">{title}</h4>
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
        </div>
        {badgeText && (
          <Badge variant={badgeVariant} className={
            badgeVariant === 'outline' ? "bg-background" : ""
          }>
            {badgeText}
          </Badge>
        )}
      </div>
      <Progress value={value} className="h-2" />
      
      {items && items.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs mt-2">
          {items.map((item, index) => (
            <div key={index} className="border rounded p-2">
              <div className="font-medium">{item.label}</div>
              <div className="text-muted-foreground">{item.value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const ProgressSection = ({ title, description, items, className }: ProgressSectionProps) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <ProgressItem {...item} />
              {index < items.length - 1 && <Separator className="my-4" />}
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
