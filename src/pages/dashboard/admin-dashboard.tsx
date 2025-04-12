
import React from 'react';
import { StatsCard } from '@/components/dashboard/stats-card';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  Award, 
  BarChart3,
  ArrowRight,
  Calendar,
  Building,
  UserCheck,
  Code,
  BookMarked,
  ChevronUp,
  ChevronDown,
  Minus
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
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/auth-context';

const AdminDashboard = () => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of campus activities and performance metrics
          </p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="current">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current Semester</SelectItem>
              <SelectItem value="previous">Previous Semester</SelectItem>
              <SelectItem value="year">Academic Year</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <BarChart3 className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Students"
          value="2,845"
          icon={<Users className="h-4 w-4" />}
          description="Active enrolled students"
          trend="up"
          trendValue="4.2% from last semester"
        />
        <StatsCard
          title="Departments"
          value="12"
          icon={<Building className="h-4 w-4" />}
          description="Academic departments"
        />
        <StatsCard
          title="Faculty Members"
          value="156"
          icon={<GraduationCap className="h-4 w-4" />}
          description="Professors and instructors"
          trend="up"
          trendValue="3 new hires"
        />
        <StatsCard
          title="Courses Offered"
          value="287"
          icon={<BookOpen className="h-4 w-4" />}
          description="Active courses this semester"
          trend="up"
          trendValue="15 new courses"
        />
      </div>
      
      <Tabs defaultValue="academic" className="space-y-4">
        <TabsList>
          <TabsTrigger value="academic">Academic Overview</TabsTrigger>
          <TabsTrigger value="coding">Coding Platform</TabsTrigger>
          <TabsTrigger value="placement">Placement Cell</TabsTrigger>
        </TabsList>
        
        <TabsContent value="academic" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Department Performance</CardTitle>
                <CardDescription>
                  Academic metrics by department
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Department</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead>Avg. GPA</TableHead>
                      <TableHead>Attendance</TableHead>
                      <TableHead>Trend</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { name: "Computer Science", students: 520, gpa: 3.7, attendance: 92, trend: "up" },
                      { name: "Information Technology", students: 485, gpa: 3.5, attendance: 88, trend: "up" },
                      { name: "Electronics & Comm.", students: 420, gpa: 3.4, attendance: 85, trend: "neutral" },
                      { name: "Mechanical Engineering", students: 390, gpa: 3.3, attendance: 82, trend: "down" },
                      { name: "Civil Engineering", students: 310, gpa: 3.2, attendance: 81, trend: "neutral" }
                    ].map((dept, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{dept.name}</TableCell>
                        <TableCell>{dept.students}</TableCell>
                        <TableCell>{dept.gpa}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={dept.attendance} className="h-2 w-20" />
                            <span className="text-sm">{dept.attendance}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {dept.trend === 'up' ? (
                            <div className="flex items-center text-green-600">
                              <ChevronUp className="h-4 w-4" />
                              <span className="text-xs">2.1%</span>
                            </div>
                          ) : dept.trend === 'down' ? (
                            <div className="flex items-center text-red-600">
                              <ChevronDown className="h-4 w-4" />
                              <span className="text-xs">1.4%</span>
                            </div>
                          ) : (
                            <div className="flex items-center text-blue-600">
                              <Minus className="h-4 w-4" />
                              <span className="text-xs">0.3%</span>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Detailed Analytics
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Academic Calendar</CardTitle>
                <CardDescription>
                  Important upcoming events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: "Mid-term Exams", date: "Oct 10-15, 2023", type: "exam" },
                    { title: "Faculty Meeting", date: "Sep 25, 2023", type: "meeting" },
                    { title: "Course Registration", date: "Nov 5-10, 2023", type: "registration" },
                    { title: "Winter Break", date: "Dec 18, 2023 - Jan 5, 2024", type: "holiday" },
                    { title: "Final Exams", date: "Dec 5-15, 2023", type: "exam" }
                  ].map((event, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <div className={`rounded-full p-1.5 ${
                        event.type === 'exam' ? 'bg-red-100 text-red-700' :
                        event.type === 'meeting' ? 'bg-blue-100 text-blue-700' :
                        event.type === 'registration' ? 'bg-purple-100 text-purple-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {event.type === 'exam' ? <BookMarked className="h-4 w-4" /> :
                         event.type === 'meeting' ? <Users className="h-4 w-4" /> :
                         event.type === 'registration' ? <UserCheck className="h-4 w-4" /> :
                         <Calendar className="h-4 w-4" />}
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium text-sm">{event.title}</p>
                        <p className="text-xs text-muted-foreground">{event.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Open Calendar
                  <Calendar className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="coding" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Coding Platform Analytics</CardTitle>
                <CardDescription>
                  Usage and performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="border rounded-md p-4 text-center">
                    <div className="text-2xl font-bold">2,364</div>
                    <div className="text-sm text-muted-foreground">Active Users</div>
                  </div>
                  <div className="border rounded-md p-4 text-center">
                    <div className="text-2xl font-bold">16,483</div>
                    <div className="text-sm text-muted-foreground">Problems Solved</div>
                  </div>
                  <div className="border rounded-md p-4 text-center">
                    <div className="text-2xl font-bold">4</div>
                    <div className="text-sm text-muted-foreground">Learning Tracks</div>
                  </div>
                  <div className="border rounded-md p-4 text-center">
                    <div className="text-2xl font-bold">72%</div>
                    <div className="text-sm text-muted-foreground">Avg. Completion Rate</div>
                  </div>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Track Name</TableHead>
                      <TableHead>Enrollments</TableHead>
                      <TableHead>Completion</TableHead>
                      <TableHead>Avg. Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { name: "Data Structures & Algorithms", enrollments: 1205, completion: 78, score: 72 },
                      { name: "Web Development", enrollments: 985, completion: 83, score: 76 },
                      { name: "Python Programming", enrollments: 890, completion: 79, score: 74 },
                      { name: "Java Programming", enrollments: 752, completion: 68, score: 65 }
                    ].map((track, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{track.name}</TableCell>
                        <TableCell>{track.enrollments}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={track.completion} className="h-2 w-20" />
                            <span className="text-sm">{track.completion}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{track.score}/100</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Configure Learning Tracks
                  <Code className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
                <CardDescription>
                  Students with highest coding scores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Priya Sharma", department: "Computer Science", score: 98, problems: 283 },
                    { name: "Ravi Kumar", department: "Information Technology", score: 95, problems: 271 },
                    { name: "David Chen", department: "Computer Science", score: 93, problems: 264 },
                    { name: "Ananya Patel", department: "Electronics", score: 91, problems: 258 },
                    { name: "Michael Johnson", department: "Computer Science", score: 90, problems: 247 }
                  ].map((student, i) => (
                    <div key={i} className="flex items-center space-x-3 border-b pb-3">
                      <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground font-medium">
                        {i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{student.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{student.department}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{student.score}/100</div>
                        <div className="text-xs text-muted-foreground">{student.problems} solved</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Leaderboard
                  <Award className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="placement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Placement Statistics</CardTitle>
              <CardDescription>
                Campus placement and recruitment data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="border rounded-md p-4 text-center">
                  <div className="text-2xl font-bold">92%</div>
                  <div className="text-sm text-muted-foreground">Placement Rate</div>
                </div>
                <div className="border rounded-md p-4 text-center">
                  <div className="text-2xl font-bold">76</div>
                  <div className="text-sm text-muted-foreground">Companies Visited</div>
                </div>
                <div className="border rounded-md p-4 text-center">
                  <div className="text-2xl font-bold">₹8.7L</div>
                  <div className="text-sm text-muted-foreground">Avg. Package</div>
                </div>
                <div className="border rounded-md p-4 text-center">
                  <div className="text-2xl font-bold">₹24L</div>
                  <div className="text-sm text-muted-foreground">Highest Package</div>
                </div>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Department</TableHead>
                    <TableHead>Eligible</TableHead>
                    <TableHead>Placed</TableHead>
                    <TableHead>Avg. Package</TableHead>
                    <TableHead>Top Recruiters</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { 
                      name: "Computer Science", 
                      eligible: 142, 
                      placed: 135,
                      avg: "₹9.2L",
                      recruiters: ["Google", "Microsoft", "Amazon"]
                    },
                    { 
                      name: "Information Technology", 
                      eligible: 128, 
                      placed: 120,
                      avg: "₹8.9L",
                      recruiters: ["TCS", "Wipro", "Infosys"]
                    },
                    { 
                      name: "Electronics", 
                      eligible: 115, 
                      placed: 102,
                      avg: "₹7.8L",
                      recruiters: ["Intel", "Samsung", "Qualcomm"]
                    },
                    { 
                      name: "Mechanical", 
                      eligible: 98, 
                      placed: 85,
                      avg: "₹7.2L",
                      recruiters: ["L&T", "Tata Motors", "BHEL"]
                    },
                  ].map((dept, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{dept.name}</TableCell>
                      <TableCell>{dept.eligible}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{dept.placed}</span>
                          <Badge variant="outline" className="ml-1">
                            {Math.round(dept.placed / dept.eligible * 100)}%
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>{dept.avg}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {dept.recruiters.map((company, j) => (
                            <Badge key={j} variant="secondary" className="text-xs">
                              {company}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" className="w-full sm:w-auto">
                Schedule Campus Drive
              </Button>
              <Button className="w-full sm:w-auto">
                Generate Placement Report
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
