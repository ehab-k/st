"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Brain, BookMarked, ThumbsUp, Link2 } from "lucide-react";

interface Resource {
  id: number;
  type: string;
  title: string;
  subject: string;
  author: string;
  authorAvatar: string;
  link: string;
  likes: number;
  saved: boolean;
  tags: string[];
}

interface ResourceCardProps {
  resource: Resource;
  onLike: (id: number) => void;
}

export default function ResourceCard({ resource, onLike }: ResourceCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-3 rounded-lg">
            {resource.type === "quizlet" ? (
              <Brain className="h-6 w-6 text-blue-500" />
            ) : (
              <BookMarked className="h-6 w-6 text-purple-500" />
            )}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg">{resource.title}</h3>
              <Badge variant="secondary">{resource.type}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={resource.authorAvatar} />
                <AvatarFallback>{resource.author[0]}</AvatarFallback>
              </Avatar>
              <span className="text-sm text-gray-600">{resource.author}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {resource.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-1"
            onClick={() => onLike(resource.id)}
          >
            <ThumbsUp className="h-4 w-4" />
            {resource.likes}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-1"
            onClick={() => window.open(resource.link, '_blank')}
          >
            <Link2 className="h-4 w-4" />
            Open
          </Button>
        </div>
      </div>
    </Card>
  );
}