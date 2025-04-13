
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './auth-context';

export interface Course {
  id: string;
  title: string;
  code: string;
  instructor: string;
  category: string;
  credits: number;
  description?: string;
  students?: number;
  nextClass?: string;
}

interface CoursesContextType {
  courses: Course[];
  addCourse: (course: Omit<Course, 'id'>) => void;
  deleteCourse: (id: string) => void;
}

const CoursesContext = createContext<CoursesContextType | undefined>(undefined);

export const CoursesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);

  // Load courses from localStorage on mount
  useEffect(() => {
    const storedCourses = localStorage.getItem('campusBridgeCourses');
    if (storedCourses) {
      try {
        setCourses(JSON.parse(storedCourses));
      } catch (e) {
        localStorage.removeItem('campusBridgeCourses');
      }
    } else {
      // Initialize with sample courses
      const initialCourses = [
        {
          id: "cs301",
          title: "Data Structures & Algorithms",
          code: "CS301",
          instructor: "Dr. Robert Chen",
          category: "Core",
          credits: 4,
          description: "Study of fundamental data structures and algorithms with emphasis on design and analysis.",
          students: 42,
          nextClass: "Today, 10:00 AM"
        },
        {
          id: "cs404",
          title: "Advanced Database Systems",
          code: "CS404",
          instructor: "Prof. Lisa Wong",
          category: "Elective",
          credits: 3,
          description: "Advanced topics in database design, query optimization, and transaction processing.",
          students: 28,
          nextClass: "Tomorrow, 2:00 PM"
        }
      ];
      setCourses(initialCourses);
      localStorage.setItem('campusBridgeCourses', JSON.stringify(initialCourses));
    }
  }, []);

  // Save courses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('campusBridgeCourses', JSON.stringify(courses));
  }, [courses]);

  const addCourse = (course: Omit<Course, 'id'>) => {
    if (!user || user.role !== 'faculty') return;
    
    const newCourse = {
      ...course,
      id: Date.now().toString(),
      instructor: user.name,
      students: 0
    };
    
    setCourses(prevCourses => [...prevCourses, newCourse]);
  };

  const deleteCourse = (id: string) => {
    if (!user || user.role !== 'faculty') return;
    setCourses(prevCourses => prevCourses.filter(course => course.id !== id));
  };

  return (
    <CoursesContext.Provider value={{ courses, addCourse, deleteCourse }}>
      {children}
    </CoursesContext.Provider>
  );
};

export const useCourses = () => {
  const context = useContext(CoursesContext);
  if (context === undefined) {
    throw new Error('useCourses must be used within a CoursesProvider');
  }
  return context;
};
