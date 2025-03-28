'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { ArrowRight, BookOpen, Filter, Search, Star, Users } from 'lucide-react'

// Mock data for research projects
const projects = [
  {
    id: 1,
    title: 'Quantum Error Correction in Superconducting Qubits',
    researcher: 'Dr. Emily Chen',
    institution: 'MIT',
    field: 'Quantum Computing',
    fundingGoal: 120000,
    fundedPercentage: 65,
    duration: '2 years',
    tags: ['Quantum Computing', 'Error Correction', 'Superconducting Qubits'],
    description:
      'Exploring novel approaches to quantum error correction in superconducting qubit systems to improve quantum computing reliability.',
    rating: 4.8,
    reviews: 12
  },
  {
    id: 2,
    title: 'Machine Learning for Climate Change Prediction',
    researcher: 'Prof. James Wilson',
    institution: 'Stanford University',
    field: 'Climate Science',
    fundingGoal: 85000,
    fundedPercentage: 42,
    duration: '18 months',
    tags: ['Machine Learning', 'Climate Science', 'Predictive Modeling'],
    description:
      'Developing advanced machine learning models to improve climate change predictions and identify mitigation strategies.',
    rating: 4.5,
    reviews: 8
  },
  {
    id: 3,
    title: 'CRISPR-Based Therapies for Neurodegenerative Diseases',
    researcher: 'Dr. Sarah Johnson',
    institution: 'Harvard Medical School',
    field: 'Biotechnology',
    fundingGoal: 250000,
    fundedPercentage: 78,
    duration: '3 years',
    tags: ['CRISPR', 'Gene Therapy', 'Neurodegenerative Diseases'],
    description:
      "Investigating the potential of CRISPR-based gene therapies for treating Alzheimer's and Parkinson's diseases.",
    rating: 4.9,
    reviews: 15
  },
  {
    id: 4,
    title: 'Sustainable Materials for Next-Generation Solar Cells',
    researcher: 'Dr. Michael Rodriguez',
    institution: 'UC Berkeley',
    field: 'Materials Science',
    fundingGoal: 110000,
    fundedPercentage: 35,
    duration: '2 years',
    tags: ['Renewable Energy', 'Materials Science', 'Solar Cells'],
    description:
      'Developing sustainable and efficient materials for next-generation solar cells to improve renewable energy adoption.',
    rating: 4.6,
    reviews: 10
  },
  {
    id: 5,
    title: 'AI-Driven Drug Discovery for Infectious Diseases',
    researcher: 'Prof. Lisa Zhang',
    institution: 'Johns Hopkins University',
    field: 'Pharmaceutical Research',
    fundingGoal: 180000,
    fundedPercentage: 52,
    duration: '2.5 years',
    tags: ['AI', 'Drug Discovery', 'Infectious Diseases'],
    description:
      'Using artificial intelligence to accelerate the discovery of novel therapeutics for emerging infectious diseases.',
    rating: 4.7,
    reviews: 9
  },
  {
    id: 6,
    title: 'Blockchain for Secure Medical Data Sharing',
    researcher: 'Dr. Robert Kim',
    institution: 'University of Washington',
    field: 'Healthcare IT',
    fundingGoal: 95000,
    fundedPercentage: 28,
    duration: '1.5 years',
    tags: ['Blockchain', 'Healthcare', 'Data Security'],
    description:
      'Implementing blockchain technology to enable secure and privacy-preserving medical data sharing between healthcare providers.',
    rating: 4.4,
    reviews: 7
  }
]

export default function BrowseProjects() {
  const [searchTerm, setSearchTerm] = useState('')
  const [fundingRange, setFundingRange] = useState([0, 300000])
  const [selectedFields, setSelectedFields] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('relevance')

  const handleFieldToggle = (field: string) => {
    if (selectedFields.includes(field)) {
      setSelectedFields(selectedFields.filter((f) => f !== field))
    } else {
      setSelectedFields([...selectedFields, field])
    }
  }

  const filteredProjects = projects.filter((project) => {
    // Search term filter
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.researcher.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    // Funding range filter
    const matchesFunding =
      project.fundingGoal >= fundingRange[0] && project.fundingGoal <= fundingRange[1]

    // Field filter
    const matchesField = selectedFields.length === 0 || selectedFields.includes(project.field)

    return matchesSearch && matchesFunding && matchesField
  })

  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case 'funding-high':
        return b.fundingGoal - a.fundingGoal
      case 'funding-low':
        return a.fundingGoal - b.fundingGoal
      case 'progress':
        return b.fundedPercentage - a.fundedPercentage
      case 'rating':
        return b.rating - a.rating
      default: // relevance
        return 0 // Keep original order
    }
  })

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center space-y-6 text-center mb-8">
        <h1 className="text-3xl font-bold">Browse Research Projects</h1>
        <p className="text-muted-foreground max-w-[600px]">
          Discover innovative research projects seeking funding and make an impact by supporting
          groundbreaking science.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
        {/* Filters sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter className="mr-2 h-5 w-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search projects..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Funding Amount</Label>
                <div className="pt-4 pb-2">
                  <Slider
                    defaultValue={[0, 300000]}
                    max={300000}
                    step={5000}
                    value={fundingRange}
                    onValueChange={setFundingRange}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">${fundingRange[0].toLocaleString()}</span>
                  <span className="text-sm">${fundingRange[1].toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Research Fields</Label>
                <div className="space-y-2">
                  {[
                    'Quantum Computing',
                    'Climate Science',
                    'Biotechnology',
                    'Materials Science',
                    'Pharmaceutical Research',
                    'Healthcare IT'
                  ].map((field) => (
                    <div key={field} className="flex items-center space-x-2">
                      <Checkbox
                        id={field}
                        checked={selectedFields.includes(field)}
                        onCheckedChange={() => handleFieldToggle(field)}
                      />
                      <label
                        htmlFor={field}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {field}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sort">Sort By</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger id="sort">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="funding-high">Funding: High to Low</SelectItem>
                    <SelectItem value="funding-low">Funding: Low to High</SelectItem>
                    <SelectItem value="progress">Funding Progress</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Projects grid */}
        <div className="space-y-6">
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="new">Newly Added</TabsTrigger>
              <TabsTrigger value="ending">Ending Soon</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sortedProjects.map((project) => (
                  <Card key={project.id} className="flex flex-col h-full">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{project.title}</CardTitle>
                          <CardDescription>
                            {project.researcher} • {project.institution}
                          </CardDescription>
                        </div>
                        <Badge variant="outline">{project.field}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Funding Progress</span>
                            <span>{project.fundedPercentage}%</span>
                          </div>
                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary"
                              style={{ width: `${project.fundedPercentage}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Goal</p>
                            <p className="font-medium">${project.fundingGoal.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Duration</p>
                            <p className="font-medium">{project.duration}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Rating</p>
                            <p className="font-medium flex items-center">
                              <Star className="h-3.5 w-3.5 mr-1 fill-primary text-primary" />
                              {project.rating} ({project.reviews})
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full">
                        <Link href={`/funder/project/${project.id}`}>
                          View Details <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              {filteredProjects.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No projects found</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </TabsContent>
            <TabsContent value="trending" className="mt-6">
              <div className="text-center py-12">
                <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Trending Projects</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Discover the most popular research projects this week
                </p>
              </div>
            </TabsContent>
            <TabsContent value="new" className="mt-6">
              <div className="text-center py-12">
                <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Newly Added Projects</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Explore the latest research proposals added to the platform
                </p>
              </div>
            </TabsContent>
            <TabsContent value="ending" className="mt-6">
              <div className="text-center py-12">
                <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Ending Soon</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Research projects that are close to their funding deadline
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
