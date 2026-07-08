import { useState, useMemo } from "react";
import { Search, BookOpen, Zap, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuestionCard from "@/components/QuestionCard";
import { questions, categories, difficulties } from "@/data/questions";
import { useQuestionFilter } from "@/hooks/useQuestionFilter";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  const filteredQuestions = useQuestionFilter(
    questions,
    searchTerm,
    selectedCategory,
    selectedDifficulty
  );

  const stats = useMemo(() => {
    return {
      total: questions.length,
      byDifficulty: {
        beginner: questions.filter((q) => q.difficulty === "beginner").length,
        intermediate: questions.filter((q) => q.difficulty === "intermediate").length,
        advanced: questions.filter((q) => q.difficulty === "advanced").length
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section
        className="relative min-h-[500px] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url(/manus-storage/hero-background_11d563e6.png)",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />

        {/* Content */}
        <div className="relative z-10 container max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="mb-6 flex justify-center">
            <img
              src="/manus-storage/logo-icon_9a3db50d.png"
              alt="ServiceNow Hackathon Logo"
              className="w-16 h-16"
            />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Master ServiceNow Development
          </h1>
          <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
            Interactive Q&A guide with real hackathon problems, expert answers, and comprehensive coverage of ServiceNow fundamentals to advanced topics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white"
              onClick={() => setActiveTab("all")}
            >
              Explore Questions
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              View Resources
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-12 border-b border-border">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Total Questions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{stats.byDifficulty.beginner}</div>
              <div className="text-sm text-muted-foreground">Beginner</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">{stats.byDifficulty.intermediate}</div>
              <div className="text-sm text-muted-foreground">Intermediate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">{stats.byDifficulty.advanced}</div>
              <div className="text-sm text-muted-foreground">Advanced</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container max-w-6xl mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Search and Filters */}
            <div className="mb-8 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search questions, answers, or topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 py-6 text-base"
                />
              </div>

              {/* Category Filter */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedCategory === null ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(null)}
                  >
                    All Categories
                  </Button>
                  {categories.map((cat) => (
                    <Button
                      key={cat.id}
                      variant={selectedCategory === cat.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(cat.id)}
                    >
                      {cat.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Difficulty Filter */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Difficulty</h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedDifficulty === null ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedDifficulty(null)}
                  >
                    All Levels
                  </Button>
                  {difficulties.map((diff) => (
                    <Button
                      key={diff.id}
                      variant={selectedDifficulty === diff.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedDifficulty(diff.id)}
                    >
                      {diff.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Results Count */}
              <div className="text-sm text-muted-foreground">
                Showing {filteredQuestions.length} of {questions.length} questions
              </div>
            </div>

            {/* Tab Navigation */}
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="all">All Questions</TabsTrigger>
              <TabsTrigger value="hackathon">Hackathon Focus</TabsTrigger>
              <TabsTrigger value="learning">Learning Path</TabsTrigger>
            </TabsList>

            {/* Tab Content */}
            <TabsContent value="all" className="space-y-4">
              {filteredQuestions.length > 0 ? (
                <div className="space-y-4">
                  {filteredQuestions.map((q) => (
                    <QuestionCard key={q.id} question={q} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No questions found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filters</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="hackathon" className="space-y-4">
              {filteredQuestions.filter((q) => q.category === "hackathon").length > 0 ? (
                <div className="space-y-4">
                  {filteredQuestions
                    .filter((q) => q.category === "hackathon")
                    .map((q) => (
                      <QuestionCard key={q.id} question={q} />
                    ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No hackathon questions found
                  </h3>
                  <p className="text-muted-foreground">Try adjusting your search filters</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="learning" className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Recommended Learning Path</h3>
                <p className="text-blue-800 mb-4">
                  Start with fundamentals, progress through intermediate topics, and master advanced concepts.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800">Step 1</Badge>
                    <span className="text-sm font-medium">Learn Core Fundamentals</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-yellow-100 text-yellow-800">Step 2</Badge>
                    <span className="text-sm font-medium">Master Client & Server Scripting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-red-100 text-red-800">Step 3</Badge>
                    <span className="text-sm font-medium">Understand Security & Performance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-pink-100 text-pink-800">Step 4</Badge>
                    <span className="text-sm font-medium">Tackle Hackathon Problems</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {filteredQuestions
                  .sort((a, b) => {
                    const diffOrder = { beginner: 0, intermediate: 1, advanced: 2 };
                    return diffOrder[a.difficulty] - diffOrder[b.difficulty];
                  })
                  .map((q) => (
                    <QuestionCard key={q.id} question={q} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted border-t border-border py-12">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-foreground mb-4">About</h3>
              <p className="text-sm text-muted-foreground">
                Comprehensive guide for ServiceNow hackathon preparation with real interview questions and expert answers.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Categories</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {categories.slice(0, 4).map((cat) => (
                  <li key={cat.id}>{cat.label}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>ServiceNow Community</li>
                <li>Developer Documentation</li>
                <li>Interview Guides</li>
                <li>Best Practices</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>ServiceNow Hackathon Preparation Guide © 2026. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
