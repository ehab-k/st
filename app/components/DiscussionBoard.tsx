"use client";

import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

const initialDiscussions = [
  {
    id: 1,
    user: "Alex Thompson",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
    topic: "Study Group for Physics Final",
    content: "Anyone interested in forming a study group for the upcoming physics final?",
    likes: 5,
    replies: 2,
    time: "2 hours ago"
  },
  {
    id: 2,
    user: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    topic: "Literature Essay Tips",
    content: "Looking for tips on analyzing modern poetry for the upcoming essay.",
    likes: 3,
    replies: 4,
    time: "4 hours ago"
  }
];

export default function DiscussionBoard() {
  const [discussions, setDiscussions] = useState(initialDiscussions);
  const [newPost, setNewPost] = useState("");

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Discussion Board</h2>
      </div>

      <div className="mb-6">
        <Textarea
          placeholder="Start a new discussion..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          className="mb-2"
        />
        <Button size="sm">Post Discussion</Button>
      </div>

      <ScrollArea className="h-[400px]">
        <div className="space-y-4">
          {discussions.map((discussion) => (
            <div key={discussion.id} className="border-b pb-4">
              <div className="flex items-start gap-3">
                <Avatar>
                  <AvatarImage src={discussion.avatar} />
                  <AvatarFallback>{discussion.user[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{discussion.user}</h3>
                    <span className="text-xs text-muted-foreground">{discussion.time}</span>
                  </div>
                  <p className="text-sm font-medium mt-1">{discussion.topic}</p>
                  <p className="text-sm text-muted-foreground mt-1">{discussion.content}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <Button variant="ghost" size="sm" className="gap-1">
                      <ThumbsUp className="h-4 w-4" />
                      {discussion.likes}
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      {discussion.replies} replies
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}