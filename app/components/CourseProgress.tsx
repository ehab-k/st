"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { GraduationCap } from "lucide-react";

interface Course {
  name: string;
  grade: string;
  progress: number;
}

export default function CourseProgress({ courses }: { courses: Course[] }) {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <GraduationCap className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Overall Progress</h2>
      </div>
      <div className="space-y-4">
        {courses.map((course) => (
          <div key={course.name} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">{course.name}</span>
              <span className="text-sm font-semibold">{course.grade}</span>
            </div>
            <Progress value={course.progress} className="h-2" />
          </div>
        ))}
      </div>
    </Card>
  );
}