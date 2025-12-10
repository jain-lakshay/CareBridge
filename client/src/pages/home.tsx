import { useState } from "react";
import { VIDEOS } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredVideos = VIDEOS.filter((video) => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? video.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(VIDEOS.map((v) => v.category)));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="text-center py-12 space-y-6 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 to-transparent rounded-3xl" />
        <h1 className="text-4xl md:text-6xl font-heading font-bold tracking-tight text-foreground max-w-4xl mx-auto leading-tight">
          Healthcare Guidance, <span className="text-primary">Simplified.</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Not every symptom needs a hospital visit. Get verified advice from professional doctors for common health concerns.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Button size="lg" className="rounded-full px-8 h-12 text-base shadow-lg shadow-primary/20">
            Browse Topics
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-base">
            How it Works
          </Button>
        </div>
      </section>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl border shadow-sm sticky top-4 z-10 backdrop-blur-md bg-opacity-90">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search symptoms (e.g., 'fever', 'back pain')..."
            className="pl-9 bg-background/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
            className="rounded-full"
          >
            All
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className="rounded-full whitespace-nowrap"
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="relative aspect-video bg-muted overflow-hidden">
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 flex items-center justify-center transition-all duration-300">
                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 shadow-xl">
                  <Play className="h-5 w-5 text-primary ml-1 fill-primary" />
                </div>
              </div>
              <Badge className="absolute top-2 right-2 bg-black/60 hover:bg-black/70 border-none text-white backdrop-blur-sm">
                {video.duration}
              </Badge>
            </div>
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-2 mb-3">
                <Badge variant="secondary" className="text-xs font-normal">
                  {video.category}
                </Badge>
                <span className="text-xs text-muted-foreground">{video.views} views</span>
              </div>
              <h3 className="font-bold text-lg leading-tight mb-3 group-hover:text-primary transition-colors line-clamp-2">
                {video.title}
              </h3>
              <div className="flex items-center gap-3 pt-3 border-t border-border/50">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary ring-2 ring-background">
                  {video.doctorName[4]}
                </div>
                <p className="text-sm font-medium text-muted-foreground">{video.doctorName}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
