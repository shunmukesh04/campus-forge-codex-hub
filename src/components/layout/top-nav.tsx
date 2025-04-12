
import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Search, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/auth-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

export const TopNav = () => {
  const { user } = useAuth();
  
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 justify-between">
        <div className="flex items-center gap-2 lg:gap-4 w-full">
          <form className="w-full lg:w-[400px] relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for courses, content, or users..."
              className="w-full pl-8 bg-background"
            />
          </form>
        </div>
        
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {[
                { title: "New assignment due", description: "Data Structures Assignment #3 is due tomorrow", time: "2 hours ago" },
                { title: "New course content", description: "Web Development course has new material", time: "5 hours ago" },
                { title: "Upcoming test", description: "Python programming test scheduled next week", time: "1 day ago" }
              ].map((notification, i) => (
                <DropdownMenuItem key={i} className="cursor-pointer">
                  <div className="flex flex-col gap-1">
                    <p className="font-medium">{notification.title}</p>
                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer justify-center text-primary">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <MessageSquare className="h-4 w-4" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]">
                  2
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Messages</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {[
                { sender: "Prof. Lisa Johnson", message: "Please check the updated syllabus", time: "10 min ago" },
                { sender: "Alex Smith", message: "Can we discuss the group project?", time: "Yesterday" }
              ].map((msg, i) => (
                <DropdownMenuItem key={i} className="cursor-pointer">
                  <div className="flex flex-col gap-1">
                    <p className="font-medium">{msg.sender}</p>
                    <p className="text-sm text-muted-foreground">{msg.message}</p>
                    <p className="text-xs text-muted-foreground">{msg.time}</p>
                  </div>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer justify-center text-primary">
                View all messages
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <div className="hidden md:block text-sm">
            {user && (
              <div className="text-right">
                <p className="font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">
                  {user.role === 'student' ? user.studentId : user.role === 'faculty' ? user.facultyId : 'Admin'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
