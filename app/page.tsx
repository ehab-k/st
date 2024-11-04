"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Search } from "lucide-react";
import ResourceCard from "./components/ResourceCard";
import { useToast } from "@/components/ui/use-toast";

export default function StudyLinks() {
  const [resources, setResources] = useState([]);
  const [newLink, setNewLink] = useState({ title: "", link: "", subject: "", tags: "" });
  const { toast } = useToast();

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await fetch('/api/resources');
      const data = await response.json();
      setResources(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch resources",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/resources', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newLink,
          tags: newLink.tags.split(',').map(tag => tag.trim()),
          type: newLink.link.includes('quizlet.com') ? 'quizlet' : 'blooket',
          author: 'Anonymous User',
          authorAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`,
        }),
      });

      if (!response.ok) throw new Error('Failed to create resource');

      toast({
        title: "Success",
        description: "Resource shared successfully!",
      });

      setNewLink({ title: "", link: "", subject: "", tags: "" });
      fetchResources();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to share resource",
        variant: "destructive",
      });
    }
  };

  const handleLike = async (id: number) => {
    try {
      await fetch(`/api/resources/${id}/like`, {
        method: 'POST',
      });
      fetchResources();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to like resource",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            StudyShare Hub
          </h1>
          <p className="text-gray-600">Share and discover the best study resources</p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-4">
              <BookOpen className="h-5 w-5 text-blue-500" />
              <h2 className="text-xl font-semibold">Share a Study Resource</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Resource Title"
                value={newLink.title}
                onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                required
              />
              <Input
                placeholder="Link (Quizlet or Blooket)"
                value={newLink.link}
                onChange={(e) => setNewLink({ ...newLink, link: e.target.value })}
                required
              />
              <Input
                placeholder="Subject"
                value={newLink.subject}
                onChange={(e) => setNewLink({ ...newLink, subject: e.target.value })}
                required
              />
              <Input
                placeholder="Tags (comma separated)"
                value={newLink.tags}
                onChange={(e) => setNewLink({ ...newLink, tags: e.target.value })}
                required
              />
            </div>
            <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
              Share Resource
            </Button>
          </form>
        </Card>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="all">All Resources</TabsTrigger>
            <TabsTrigger value="quizlet">Quizlet</TabsTrigger>
            <TabsTrigger value="blooket">Blooket</TabsTrigger>
          </TabsList>

          <div className="my-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input className="pl-10" placeholder="Search resources..." />
            </div>
          </div>

          <TabsContent value="all" className="space-y-4">
            {resources.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                onLike={handleLike}
              />
            ))}
          </TabsContent>

          <TabsContent value="quizlet" className="space-y-4">
            {resources
              .filter((r) => r.type === "quizlet")
              .map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  onLike={handleLike}
                />
              ))}
          </TabsContent>

          <TabsContent value="blooket" className="space-y-4">
            {resources
              .filter((r) => r.type === "blooket")
              .map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  onLike={handleLike}
                />
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}