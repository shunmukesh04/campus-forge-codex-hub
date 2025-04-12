
import React from 'react';
import { CodeEditor } from '@/components/code-editor/editor';
import { CourseCard } from '@/components/dashboard/course-card';
import { StatsCard } from '@/components/dashboard/stats-card';
import { AIChat } from '@/components/ai-assistant/ai-chat';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Code, 
  Calendar, 
  Award, 
  Check, 
  Clock, 
  BrainCircuit, 
  BookMarked, 
  Flame,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/auth-context';

const StudentDashboard = () => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Student Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-xs">
            Semester {user.semester}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {user.batch}
          </Badge>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Academic Progress"
          value="76%"
          icon={<BookOpen className="h-4 w-4" />}
          description="Overall completion rate"
          trend="up"
          trendValue="4% since last month"
        />
        <StatsCard
          title="Coding Progress"
          value="62%"
          icon={<Code className="h-4 w-4" />}
          description="DSA track completion"
          trend="up"
          trendValue="12% since last month"
        />
        <StatsCard
          title="Attendance"
          value="92%"
          icon={<Check className="h-4 w-4" />}
          description="Overall attendance rate"
          trend="neutral"
          trendValue="Same as last month"
        />
        <StatsCard
          title="Upcoming Deadlines"
          value="3"
          icon={<Clock className="h-4 w-4" />}
          description="Assignments due this week"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Courses</CardTitle>
              <CardDescription>
                Your enrolled courses and academic progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  {
                    title: "Data Structures & Algorithms",
                    code: "CS301",
                    instructor: "Dr. Robert Chen",
                    progress: 78,
                    category: "Core",
                    credits: 4,
                    nextClass: "Tomorrow, 10:00 AM"
                  },
                  {
                    title: "Database Management Systems",
                    code: "CS304",
                    instructor: "Prof. Lisa Wong",
                    progress: 65,
                    category: "Core",
                    credits: 3,
                    nextClass: "Today, 2:00 PM"
                  },
                  {
                    title: "Web Development",
                    code: "CS310",
                    instructor: "Dr. Michael Stevens",
                    progress: 82,
                    category: "Elective",
                    credits: 3,
                    nextClass: "Wednesday, 11:30 AM"
                  },
                  {
                    title: "Machine Learning Fundamentals",
                    code: "CS420",
                    instructor: "Dr. Sarah Johnson",
                    progress: 45,
                    category: "Elective",
                    credits: 4,
                    nextClass: "Friday, 9:00 AM"
                  }
                ].map((course, i) => (
                  <CourseCard key={i} {...course} />
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Courses
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>
                Deadlines and scheduled activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "DSA Assignment",
                    course: "CS301",
                    date: "Today",
                    time: "11:59 PM",
                    type: "assignment"
                  },
                  {
                    title: "Database Quiz",
                    course: "CS304",
                    date: "Tomorrow",
                    time: "2:00 PM",
                    type: "quiz"
                  },
                  {
                    title: "Web Dev Project Demo",
                    course: "CS310",
                    date: "Sep 18",
                    time: "10:30 AM",
                    type: "project"
                  },
                  {
                    title: "ML Mid-term Exam",
                    course: "CS420",
                    date: "Sep 20",
                    time: "9:00 AM",
                    type: "exam"
                  }
                ].map((event, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <div className={`rounded-full p-1.5 ${
                      event.type === 'assignment' ? 'bg-blue-100 text-blue-700' :
                      event.type === 'quiz' ? 'bg-green-100 text-green-700' :
                      event.type === 'project' ? 'bg-purple-100 text-purple-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {event.type === 'assignment' ? <BookMarked className="h-4 w-4" /> :
                       event.type === 'quiz' ? <Award className="h-4 w-4" /> :
                       event.type === 'project' ? <Code className="h-4 w-4" /> :
                       <Calendar className="h-4 w-4" />}
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{event.title}</p>
                      <p className="text-xs text-muted-foreground">{event.course}</p>
                      <div className="flex items-center space-x-2 text-xs">
                        <span className={`${
                          event.date === 'Today' ? 'text-red-600 font-medium' : 
                          event.date === 'Tomorrow' ? 'text-orange-600 font-medium' : ''
                        }`}>{event.date}</span>
                        <span>•</span>
                        <span>{event.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Calendar
                <Calendar className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Coding Progress</CardTitle>
              <CardDescription>
                Your learning tracks and programming skill development
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Data Structures & Algorithms</h4>
                      <p className="text-sm text-muted-foreground">Fundamental programming concepts and problem-solving techniques</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">70 problems solved</Badge>
                  </div>
                  <Progress value={65} className="h-2" />
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                    <div className="border rounded p-2">
                      <div className="font-medium">Arrays</div>
                      <div className="text-muted-foreground">18/25 complete</div>
                    </div>
                    <div className="border rounded p-2">
                      <div className="font-medium">Linked Lists</div>
                      <div className="text-muted-foreground">12/20 complete</div>
                    </div>
                    <div className="border rounded p-2">
                      <div className="font-medium">Trees</div>
                      <div className="text-muted-foreground">8/15 complete</div>
                    </div>
                    <div className="border rounded p-2">
                      <div className="font-medium">Graphs</div>
                      <div className="text-muted-foreground">3/10 complete</div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Web Development</h4>
                      <p className="text-sm text-muted-foreground">Modern frontend and backend development</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">5 projects completed</Badge>
                  </div>
                  <Progress value={75} className="h-2" />
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                    <div className="border rounded p-2">
                      <div className="font-medium">HTML/CSS</div>
                      <div className="text-muted-foreground">Complete</div>
                    </div>
                    <div className="border rounded p-2">
                      <div className="font-medium">JavaScript</div>
                      <div className="text-muted-foreground">80% complete</div>
                    </div>
                    <div className="border rounded p-2">
                      <div className="font-medium">React</div>
                      <div className="text-muted-foreground">65% complete</div>
                    </div>
                    <div className="border rounded p-2">
                      <div className="font-medium">Node.js</div>
                      <div className="text-muted-foreground">40% complete</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <Flame className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-medium">7 day streak</span>
                  </div>
                  <Button>Continue Learning</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>AI Assistant</CardTitle>
              <CardDescription>
                Get help with your coursework and coding problems
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[300px] p-4">
                <div className="border rounded-md p-4 h-full flex flex-col justify-center items-center text-center space-y-3">
                  <BrainCircuit className="h-10 w-10 text-primary opacity-80" />
                  <h3 className="font-medium">Ready to Help</h3>
                  <p className="text-sm text-muted-foreground">Get instant help with your coding problems, course material questions, or project ideas.</p>
                  <Button>
                    Chat with AI Assistant
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
