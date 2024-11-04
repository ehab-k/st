"use client";

import { Card } from "@/components/ui/card";
import { Brain, Clock, FileText, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";

const tools = [
  {
    icon: <Brain className="h-5 w-5" />,
    name: "Flashcards",
    description: "Create and study with digital flashcards"
  },
  {
    icon: <Clock className="h-5 w-5" />,
    name: "Pomodoro Timer",
    description: "Stay focused with timed study sessions"
  },
  {
    icon: <FileText className="h-5 w-5" />,
    name: "Note Templates",
    description: "Access pre-made study note templates"
  },
  {
    icon: <Calculator className="h-5 w-5" />,
    name: "Grade Calculator",
    description: "Calculate your potential final grades"
  }
];

export default function StudyTools() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Study Tools</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tools.map((tool) => (
          <Button
            key={tool.name}
            variant="outline"
            className="h-auto p-4 flex flex-col items-center text-center gap-2"
          >
            {tool.icon}
            <span className="font-medium">{tool.name}</span>
            <span className="text-xs text-muted-foreground">{tool.description}</span>
          </Button>
        ))}
      </div>
    </Card>
  );
}