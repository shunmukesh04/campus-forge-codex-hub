
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppShell } from "@/components/layout/app-shell";
import { AuthProvider, useAuth } from '@/contexts/auth-context';

// Auth Pages
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";

// Dashboard Pages
import StudentDashboard from "./pages/dashboard/student-dashboard";
import FacultyDashboard from "./pages/dashboard/faculty-dashboard";
import AdminDashboard from "./pages/dashboard/admin-dashboard";

// Feature Pages
import CodeEditorPage from "./pages/features/code-editor-page";
import AIAssistantPage from "./pages/features/ai-assistant-page";
import ProgressPage from "./pages/features/progress-page";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Role-based route wrapper
const RoleRoute = ({ 
  children, 
  allowedRoles 
}: { 
  children: React.ReactNode, 
  allowedRoles: string[] 
}) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

// Dashboard selector based on user role
const DashboardSelector = () => {
  const { user } = useAuth();
  
  if (!user) return <Navigate to="/login" />;
  
  if (user.role === 'student') return <StudentDashboard />;
  if (user.role === 'faculty') return <FacultyDashboard />;
  if (user.role === 'admin') return <AdminDashboard />;
  
  return <NotFound />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route element={<ProtectedRoute><AppShell /></ProtectedRoute>}>
              <Route path="/" element={<DashboardSelector />} />
              
              {/* Student Routes */}
              <Route path="/courses" element={
                <RoleRoute allowedRoles={['student', 'faculty']}>
                  <div className="h-full p-4 flex items-center justify-center">
                    <h2 className="text-xl font-medium">Courses Page</h2>
                    <p className="text-muted-foreground">(Under development)</p>
                  </div>
                </RoleRoute>
              } />
              <Route path="/coding-tracks" element={
                <RoleRoute allowedRoles={['student']}>
                  <div className="h-full p-4 flex items-center justify-center">
                    <h2 className="text-xl font-medium">Coding Tracks Page</h2>
                    <p className="text-muted-foreground">(Under development)</p>
                  </div>
                </RoleRoute>
              } />
              <Route path="/code-editor" element={
                <RoleRoute allowedRoles={['student', 'faculty']}>
                  <CodeEditorPage />
                </RoleRoute>
              } />
              <Route path="/ai-assistant" element={
                <RoleRoute allowedRoles={['student', 'faculty']}>
                  <AIAssistantPage />
                </RoleRoute>
              } />
              <Route path="/progress" element={
                <RoleRoute allowedRoles={['student', 'faculty']}>
                  <ProgressPage />
                </RoleRoute>
              } />
              <Route path="/calendar" element={
                <RoleRoute allowedRoles={['student', 'faculty', 'admin']}>
                  <div className="h-full p-4 flex items-center justify-center">
                    <h2 className="text-xl font-medium">Calendar Page</h2>
                    <p className="text-muted-foreground">(Under development)</p>
                  </div>
                </RoleRoute>
              } />
              
              {/* Faculty Routes */}
              <Route path="/assignments" element={
                <RoleRoute allowedRoles={['faculty']}>
                  <div className="h-full p-4 flex items-center justify-center">
                    <h2 className="text-xl font-medium">Assignments Page</h2>
                    <p className="text-muted-foreground">(Under development)</p>
                  </div>
                </RoleRoute>
              } />
              <Route path="/students" element={
                <RoleRoute allowedRoles={['faculty', 'admin']}>
                  <div className="h-full p-4 flex items-center justify-center">
                    <h2 className="text-xl font-medium">Students Page</h2>
                    <p className="text-muted-foreground">(Under development)</p>
                  </div>
                </RoleRoute>
              } />
              <Route path="/coding-challenges" element={
                <RoleRoute allowedRoles={['faculty', 'admin']}>
                  <div className="h-full p-4 flex items-center justify-center">
                    <h2 className="text-xl font-medium">Coding Challenges Page</h2>
                    <p className="text-muted-foreground">(Under development)</p>
                  </div>
                </RoleRoute>
              } />
              
              {/* Admin Routes */}
              <Route path="/dashboard" element={
                <RoleRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </RoleRoute>
              } />
              <Route path="/departments" element={
                <RoleRoute allowedRoles={['admin']}>
                  <div className="h-full p-4 flex items-center justify-center">
                    <h2 className="text-xl font-medium">Departments Page</h2>
                    <p className="text-muted-foreground">(Under development)</p>
                  </div>
                </RoleRoute>
              } />
              <Route path="/users" element={
                <RoleRoute allowedRoles={['admin']}>
                  <div className="h-full p-4 flex items-center justify-center">
                    <h2 className="text-xl font-medium">Users Page</h2>
                    <p className="text-muted-foreground">(Under development)</p>
                  </div>
                </RoleRoute>
              } />
              <Route path="/analytics" element={
                <RoleRoute allowedRoles={['admin']}>
                  <div className="h-full p-4 flex items-center justify-center">
                    <h2 className="text-xl font-medium">Analytics Page</h2>
                    <p className="text-muted-foreground">(Under development)</p>
                  </div>
                </RoleRoute>
              } />
              <Route path="/placements" element={
                <RoleRoute allowedRoles={['admin']}>
                  <div className="h-full p-4 flex items-center justify-center">
                    <h2 className="text-xl font-medium">Placements Page</h2>
                    <p className="text-muted-foreground">(Under development)</p>
                  </div>
                </RoleRoute>
              } />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
