
import React from 'react';
import { ProgressSection } from '@/components/dashboard/progress-section';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { 
  BookOpen, 
  Code, 
  Award, 
  Flame, 
  GraduationCap,
  BookMarked,
  CheckCircle2,
  Gauge,
  BarChart3
} from 'lucide-react';

const ProgressPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Progress</h1>
        <p className="text-muted-foreground">
          Track your academic and coding skill development
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Learning Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-4">
              <div className="relative">
                <Flame className="h-20 w-20 text-orange-500 animate-pulse" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">7</span>
                </div>
              </div>
              <span className="text-sm text-muted-foreground mt-2">Day streak</span>
              <div className="w-full max-w-[200px] grid grid-cols-7 gap-1 mt-4">
                {Array(7).fill(0).map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-6 rounded-sm ${i < 6 ? 'bg-green-500' : 'bg-green-500 animate-pulse'}`}
                  ></div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-4">
              <div className="relative h-32 w-32">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle 
                    className="text-gray-200" 
                    strokeWidth="10" 
                    stroke="currentColor" 
                    fill="transparent" 
                    r="40" 
                    cx="50" 
                    cy="50" 
                  />
                  <circle 
                    className="text-primary" 
                    strokeWidth="10" 
                    strokeDasharray={252}
                    strokeDashoffset={252 * (1 - 0.72)} 
                    strokeLinecap="round" 
                    stroke="currentColor" 
                    fill="transparent" 
                    r="40" 
                    cx="50" 
                    cy="50" 
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold">72%</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs mt-4">
              <div className="border rounded p-2">
                <div className="font-medium">Academic</div>
                <div className="text-muted-foreground">76% complete</div>
              </div>
              <div className="border rounded p-2">
                <div className="font-medium">Coding</div>
                <div className="text-muted-foreground">68% complete</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Achievement Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-3">
              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col items-center text-center">
                  <div className="rounded-full bg-green-100 p-3 mb-1">
                    <Award className="h-6 w-6 text-green-600" />
                  </div>
                  <span className="text-xs">12</span>
                  <span className="text-xs text-muted-foreground">Badges</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="rounded-full bg-blue-100 p-3 mb-1">
                    <CheckCircle2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <span className="text-xs">24</span>
                  <span className="text-xs text-muted-foreground">Tasks</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="rounded-full bg-purple-100 p-3 mb-1">
                    <GraduationCap className="h-6 w-6 text-purple-600" />
                  </div>
                  <span className="text-xs">3</span>
                  <span className="text-xs text-muted-foreground">Courses</span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="text-sm font-medium mb-1">Placement Readiness</div>
              <div className="flex items-center gap-2">
                <Slider value={[65]} max={100} step={1} className="flex-1" />
                <span className="text-sm">65%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="academic">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="academic">Academic Progress</TabsTrigger>
          <TabsTrigger value="coding">Coding Progress</TabsTrigger>
        </TabsList>
        <TabsContent value="academic" className="space-y-4 mt-4">
          <ProgressSection 
            title="Course Progress" 
            description="Your academic courses progress"
            items={[
              {
                title: "Data Structures & Algorithms",
                description: "CS301",
                value: 78,
                icon: <BookOpen className="h-4 w-4" />,
                badgeText: "78% Complete",
                items: [
                  { label: "Lectures", value: "16/20 attended" },
                  { label: "Assignments", value: "4/5 completed" },
                  { label: "Quizzes", value: "3/4 taken" },
                  { label: "Projects", value: "1/1 submitted" }
                ]
              },
              {
                title: "Database Management Systems",
                description: "CS304",
                value: 65,
                icon: <BookOpen className="h-4 w-4" />,
                badgeText: "65% Complete",
                items: [
                  { label: "Lectures", value: "12/18 attended" },
                  { label: "Assignments", value: "3/4 completed" },
                  { label: "Quizzes", value: "2/3 taken" },
                  { label: "Projects", value: "In progress" }
                ]
              },
              {
                title: "Web Development",
                description: "CS310",
                value: 82,
                icon: <BookOpen className="h-4 w-4" />,
                badgeText: "82% Complete",
                items: [
                  { label: "Lectures", value: "14/16 attended" },
                  { label: "Assignments", value: "5/6 completed" },
                  { label: "Quizzes", value: "3/3 taken" },
                  { label: "Projects", value: "2/2 submitted" }
                ]
              }
            ]}
          />
        </TabsContent>
        <TabsContent value="coding" className="space-y-4 mt-4">
          <ProgressSection 
            title="Programming Skills" 
            description="Your coding skills development"
            items={[
              {
                title: "Data Structures & Algorithms",
                description: "Fundamental programming concepts and problem solving",
                value: 65,
                icon: <Code className="h-4 w-4" />,
                badgeText: "70 problems solved",
                badgeVariant: "secondary",
                items: [
                  { label: "Arrays", value: "18/25 complete" },
                  { label: "Linked Lists", value: "12/20 complete" },
                  { label: "Trees", value: "8/15 complete" },
                  { label: "Graphs", value: "3/10 complete" }
                ]
              },
              {
                title: "Web Development",
                description: "Modern frontend and backend technologies",
                value: 75,
                icon: <Code className="h-4 w-4" />,
                badgeText: "5 projects completed",
                badgeVariant: "secondary",
                items: [
                  { label: "HTML/CSS", value: "Complete" },
                  { label: "JavaScript", value: "80% complete" },
                  { label: "React", value: "65% complete" },
                  { label: "Node.js", value: "40% complete" }
                ]
              },
              {
                title: "Python Programming",
                description: "Python programming and applications",
                value: 45,
                icon: <Code className="h-4 w-4" />,
                badgeText: "3 projects completed",
                badgeVariant: "secondary",
                items: [
                  { label: "Basics", value: "Complete" },
                  { label: "Functions", value: "90% complete" },
                  { label: "OOP", value: "60% complete" },
                  { label: "Frameworks", value: "20% complete" }
                ]
              }
            ]}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProgressPage;
