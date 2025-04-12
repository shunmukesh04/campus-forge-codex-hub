
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/auth-context';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  BookOpen,
  Code,
  Home,
  LayoutDashboard,
  Calendar,
  Users,
  PieChart,
  Settings,
  FileText,
  MessageSquare,
  LogOut,
  BrainCircuit,
  Award,
  Book,
  GraduationCap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const AppSidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  
  if (!user) return null;

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const NavLink = ({ to, icon, children }: { to: string, icon: React.ReactNode, children: React.ReactNode }) => {
    const isActive = location.pathname === to;
    return (
      <Link to={to} className={cn('nav-link', isActive && 'active')}>
        {icon}
        <span>{children}</span>
      </Link>
    );
  };

  // Different navigation links based on user role
  const getNavLinks = () => {
    const commonLinks = [
      { to: '/', icon: <Home size={18} />, label: 'Dashboard' }
    ];

    const studentLinks = [
      { to: '/courses', icon: <BookOpen size={18} />, label: 'My Courses' },
      { to: '/coding-tracks', icon: <Code size={18} />, label: 'Coding Tracks' },
      { to: '/code-editor', icon: <FileText size={18} />, label: 'Code Editor' },
      { to: '/calendar', icon: <Calendar size={18} />, label: 'Calendar' },
      { to: '/ai-assistant', icon: <BrainCircuit size={18} />, label: 'AI Assistant' }
    ];

    const facultyLinks = [
      { to: '/courses', icon: <Book size={18} />, label: 'My Courses' },
      { to: '/assignments', icon: <FileText size={18} />, label: 'Assignments' },
      { to: '/students', icon: <Users size={18} />, label: 'Students' },
      { to: '/calendar', icon: <Calendar size={18} />, label: 'Calendar' },
      { to: '/coding-challenges', icon: <Code size={18} />, label: 'Coding Challenges' }
    ];

    const adminLinks = [
      { to: '/dashboard', icon: <LayoutDashboard size={18} />, label: 'Overview' },
      { to: '/departments', icon: <GraduationCap size={18} />, label: 'Departments' },
      { to: '/users', icon: <Users size={18} />, label: 'Users' },
      { to: '/analytics', icon: <PieChart size={18} />, label: 'Analytics' },
      { to: '/placements', icon: <Award size={18} />, label: 'Placements' }
    ];

    if (user.role === 'student') return [...commonLinks, ...studentLinks];
    if (user.role === 'faculty') return [...commonLinks, ...facultyLinks];
    if (user.role === 'admin') return [...commonLinks, ...adminLinks];

    return commonLinks;
  };

  const navLinks = getNavLinks();

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="flex flex-col items-center justify-center py-4 border-b">
        <div className="flex items-center space-x-2">
          <div className="rounded-md bg-primary p-1 w-10 h-10 flex items-center justify-center">
            <GraduationCap className="text-primary-foreground" />
          </div>
          <div className="font-bold text-lg">Campus Bridge</div>
        </div>
        <SidebarTrigger className="absolute right-2 top-4 md:hidden" />
      </SidebarHeader>
      
      <SidebarContent className="py-2">
        <div className="flex flex-col space-y-1 px-3 py-2">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} icon={link.icon}>
              {link.label}
            </NavLink>
          ))}
        </div>
      </SidebarContent>
      
      <SidebarFooter className="mt-auto border-t p-4">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground capitalize truncate">{user.role}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={logout} title="Logout">
            <LogOut size={18} />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
