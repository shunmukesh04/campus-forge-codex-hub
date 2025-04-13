import React from 'react';
import { StatsCard } from '@/components/dashboard/stats-card';
import { CourseCard } from '@/components/dashboard/course-card';
import { AddCourseDialog } from '@/components/faculty/add-course-dialog';
import { useCourses } from '@/contexts/courses-context';
import { 
  BookOpen, 
  Users, 
  FileCheck, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  ArrowRight,
  BadgeCheck,
  PlusCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/auth-context';
import { Link } from 'react-router-dom';

const FacultyDashboard = () => {
  const { user } = useAuth();
  const { courses } = useCourses();
  
  if (!user) return null;
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Faculty Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user.name}. Here's what's happening with your courses.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="h-9">
            <FileCheck className="mr-2 h-4 w-4" />
            Create Assignment
          </Button>
          <AddCourseDialog />
          <Button className="h-9">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Session
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Courses"
          value={courses.length.toString()}
          icon={<BookOpen className="h-4 w-4" />}
          description="Active courses this semester"
        />
        <StatsCard
          title="Total Students"
          value="127"
          icon={<Users className="h-4 w-4" />}
          description="Enrolled in your courses"
          trend="up"
          trendValue="12 new this week"
        />
        <StatsCard
          title="Assignments"
          value="7"
          icon={<FileCheck className="h-4 w-4" />}
          description="Pending review"
          trend="up"
          trendValue="3 new submissions"
        />
        <StatsCard
          title="Upcoming Sessions"
          value="3"
          icon={<Clock className="h-4 w-4" />}
          description="Scheduled this week"
        />
      </div>

      <Tabs defaultValue="courses" className="space-y-4">
        <TabsList>
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="assignments">Recent Assignments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="courses" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
            <Card 
              className="h-full border-dashed flex flex-col items-center justify-center p-6 hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => {
                const addCourseButton = document.querySelector('[aria-label="Add Course"]');
                if (addCourseButton instanceof HTMLElement) {
                  addCourseButton.click();
                }
              }}
            >
              <PlusCircle className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground font-medium">Add New Course</p>
            </Card>
          </div>
        </TabsContent>
        
        
        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Performance</CardTitle>
              <CardDescription>
                Overview of student performance across your courses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Alex Johnson",
                    id: "CS2023042",
                    course: "Data Structures",
                    attendance: 95,
                    performance: 87,
                    status: "excellent"
                  },
                  {
                    name: "Maria Garcia",
                    id: "CS2023078",
                    course: "Data Structures",
                    attendance: 88,
                    performance: 76,
                    status: "good"
                  },
                  {
                    name: "James Wilson",
                    id: "CS2023021",
                    course: "Advanced Database",
                    attendance: 75,
                    performance: 65,
                    status: "average"
                  },
                  {
                    name: "Sarah Chen",
                    id: "CS2023056",
                    course: "Software Engineering",
                    attendance: 92,
                    performance: 91,
                    status: "excellent"
                  },
                  {
                    name: "Raj Patel",
                    id: "CS2023034",
                    course: "Computer Networks",
                    attendance: 68,
                    performance: 58,
                    status: "at-risk"
                  },
                ].map((student, i) => (
                  <div key={i} className="flex items-center gap-4 p-2 hover:bg-muted/50 rounded-md">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>{student.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium flex items-center gap-2">
                        {student.name}
                        {student.status === 'excellent' && (
                          <BadgeCheck className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground flex gap-2">
                        <span>{student.id}</span>
                        <span>•</span>
                        <span>{student.course}</span>
                      </div>
                    </div>
                    <div className="space-y-1 w-24">
                      <div className="flex justify-between text-xs">
                        <span>Attendance</span>
                        <span className={`font-medium ${
                          student.attendance >= 90 ? 'text-green-600' :
                          student.attendance >= 75 ? 'text-amber-600' :
                          'text-red-600'
                        }`}>{student.attendance}%</span>
                      </div>
                      <Progress value={student.attendance} className="h-1.5" />
                    </div>
                    <div className="space-y-1 w-24">
                      <div className="flex justify-between text-xs">
                        <span>Performance</span>
                        <span className={`font-medium ${
                          student.performance >= 80 ? 'text-green-600' :
                          student.performance >= 60 ? 'text-amber-600' :
                          'text-red-600'
                        }`}>{student.performance}%</span>
                      </div>
                      <Progress value={student.performance} className="h-1.5" />
                    </div>
                    <Badge variant={
                      student.status === 'excellent' ? 'default' :
                      student.status === 'good' ? 'secondary' :
                      student.status === 'average' ? 'outline' :
                      'destructive'
                    }>
                      {student.status === 'at-risk' ? 'At Risk' : 
                       student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Students
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="assignments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Assignments</CardTitle>
              <CardDescription>
                Recently submitted assignments that need review
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Binary Tree Implementation",
                    course: "CS301: Data Structures",
                    dueDate: "Sep 10, 2023",
                    submitted: 38,
                    pending: 4,
                    status: "active"
                  },
                  {
                    title: "Database Normalization",
                    course: "CS404: Advanced Database",
                    dueDate: "Sep 8, 2023",
                    submitted: 25,
                    pending: 3,
                    status: "active"
                  },
                  {
                    title: "UML Diagrams",
                    course: "CS305: Software Engineering",
                    dueDate: "Sep 5, 2023",
                    submitted: 36,
                    pending: 2,
                    status: "grading"
                  },
                  {
                    title: "TCP/IP Implementation",
                    course: "CS403: Computer Networks",
                    dueDate: "Sep 2, 2023",
                    submitted: 32,
                    pending: 3,
                    status: "graded"
                  },
                ].map((assignment, i) => (
                  <div key={i} className="border rounded-md p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{assignment.title}</h3>
                        <p className="text-sm text-muted-foreground">{assignment.course}</p>
                      </div>
                      <Badge variant={
                        assignment.status === 'active' ? 'default' :
                        assignment.status === 'grading' ? 'secondary' :
                        'outline'
                      }>
                        {assignment.status === 'active' ? 'Active' : 
                         assignment.status === 'grading' ? 'Grading in Progress' :
                         'Graded'}
                      </Badge>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Due: {assignment.dueDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>{assignment.submitted} Submitted</span>
                      </div>
                      {assignment.pending > 0 && (
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-amber-500" />
                          <span>{assignment.pending} Pending</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-3">
                      <Button variant="outline" size="sm" className="w-full">
                        {assignment.status === 'active' || assignment.status === 'grading'
                          ? 'Grade Submissions'
                          : 'View Results'
                        }
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Assignments
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FacultyDashboard;
