"use client";

import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Newspaper } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const news = [
  {
    id: 1,
    title: "Campus Library Extended Hours",
    category: "Facility Update",
    date: "Today",
    content: "Library hours extended during finals week. Now open 24/7."
  },
  {
    id: 2,
    title: "New Online Learning Resources",
    category: "Academic",
    date: "Yesterday",
    content: "Access to LinkedIn Learning now available for all students."
  },
  {
    id: 3,
    title: "Spring Break Schedule Changes",
    category: "Important",
    date: "2 days ago",
    content: "Modified class schedule for the week before spring break."
  }
];

export default function NewsUpdates() {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Newspaper className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">News & Updates</h2>
      </div>
      <ScrollArea className="h-[300px]">
        <div className="space-y-4">
          {news.map((item) => (
            <div key={item.id} className="border-b pb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{item.title}</h3>
                <Badge variant="secondary">{item.category}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{item.content}</p>
              <span className="text-xs text-muted-foreground">{item.date}</span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}