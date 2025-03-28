'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
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
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Loader2, Plus, Trash2 } from 'lucide-react'

export default function ResearchProposal() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [milestones, setMilestones] = useState([
    { title: '', description: '', deliverables: '', timeline: '', budget: '' }
  ])

  const addMilestone = () => {
    setMilestones([
      ...milestones,
      { title: '', description: '', deliverables: '', timeline: '', budget: '' }
    ])
  }

  const removeMilestone = (index: number) => {
    if (milestones.length > 1) {
      setMilestones(milestones.filter((_, i) => i !== index))
    }
  }

  const updateMilestone = (index: number, field: string, value: string) => {
    const updatedMilestones = [...milestones]
    updatedMilestones[index] = { ...updatedMilestones[index], [field]: value }
    setMilestones(updatedMilestones)
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
    // Simulate proposal submission
    setTimeout(() => {
      setIsSubmitting(false)
      router.push('/researcher/projects')
    }, 2000)
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <div className="flex flex-col items-center space-y-6 text-center mb-8">
        <h1 className="text-3xl font-bold">Create Research Proposal</h1>
        <p className="text-muted-foreground max-w-[600px]">
          Submit your research proposal to receive funding from organizations interested in your
          field.
        </p>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Research Proposal Details</CardTitle>
          <CardDescription>
            Provide comprehensive information about your research project to attract potential
            funders.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="details">Project Details</TabsTrigger>
              <TabsTrigger value="milestones">Milestones</TabsTrigger>
              <TabsTrigger value="budget">Budget</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input id="title" placeholder="Novel Approach to Quantum Error Correction" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="abstract">Abstract</Label>
                <Textarea
                  id="abstract"
                  placeholder="Provide a brief summary of your research project (250-300 words)"
                  className="min-h-[120px]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="field">Research Field</Label>
                  <Select>
                    <SelectTrigger id="field">
                      <SelectValue placeholder="Select field" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="computer-science">Computer Science</SelectItem>
                      <SelectItem value="physics">Physics</SelectItem>
                      <SelectItem value="biology">Biology</SelectItem>
                      <SelectItem value="chemistry">Chemistry</SelectItem>
                      <SelectItem value="medicine">Medicine</SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="social-sciences">Social Sciences</SelectItem>
                      <SelectItem value="humanities">Humanities</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Project Duration</Label>
                  <Select>
                    <SelectTrigger id="duration">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6-months">6 months</SelectItem>
                      <SelectItem value="1-year">1 year</SelectItem>
                      <SelectItem value="2-years">2 years</SelectItem>
                      <SelectItem value="3-years">3 years</SelectItem>
                      <SelectItem value="5-years">5 years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="keywords">Keywords</Label>
                <Input
                  id="keywords"
                  placeholder="Quantum Computing, Error Correction, Superconducting Qubits"
                />
              </div>
            </TabsContent>

            <TabsContent value="details" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="background">Background & Significance</Label>
                <Textarea
                  id="background"
                  placeholder="Describe the background and significance of your research"
                  className="min-h-[120px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="methodology">Research Methodology</Label>
                <Textarea
                  id="methodology"
                  placeholder="Describe your research methodology in detail"
                  className="min-h-[120px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expected-outcomes">Expected Outcomes</Label>
                <Textarea
                  id="expected-outcomes"
                  placeholder="Describe the expected outcomes and impact of your research"
                  className="min-h-[120px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="team">Research Team</Label>
                <Textarea
                  id="team"
                  placeholder="List the key members of your research team and their roles"
                  className="min-h-[100px]"
                />
              </div>
            </TabsContent>

            <TabsContent value="milestones" className="space-y-6 pt-4">
              {milestones.map((milestone, index) => (
                <div key={index} className="space-y-4 p-4 border rounded-md">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Milestone {index + 1}</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeMilestone(index)}
                      disabled={milestones.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`milestone-${index}-title`}>Title</Label>
                    <Input
                      id={`milestone-${index}-title`}
                      value={milestone.title}
                      onChange={(e) => updateMilestone(index, 'title', e.target.value)}
                      placeholder="Initial Prototype Development"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`milestone-${index}-description`}>Description</Label>
                    <Textarea
                      id={`milestone-${index}-description`}
                      value={milestone.description}
                      onChange={(e) => updateMilestone(index, 'description', e.target.value)}
                      placeholder="Describe what will be accomplished in this milestone"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`milestone-${index}-deliverables`}>Deliverables</Label>
                      <Input
                        id={`milestone-${index}-deliverables`}
                        value={milestone.deliverables}
                        onChange={(e) => updateMilestone(index, 'deliverables', e.target.value)}
                        placeholder="Working prototype, Research paper"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`milestone-${index}-timeline`}>Timeline</Label>
                      <Input
                        id={`milestone-${index}-timeline`}
                        value={milestone.timeline}
                        onChange={(e) => updateMilestone(index, 'timeline', e.target.value)}
                        placeholder="3 months"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`milestone-${index}-budget`}>Budget (USDC)</Label>
                    <Input
                      id={`milestone-${index}-budget`}
                      value={milestone.budget}
                      onChange={(e) => updateMilestone(index, 'budget', e.target.value)}
                      placeholder="25000"
                    />
                  </div>
                </div>
              ))}
              <Button variant="outline" onClick={addMilestone} className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Milestone
              </Button>
            </TabsContent>

            <TabsContent value="budget" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="total-funding">Total Funding Requested (USDC)</Label>
                <Input id="total-funding" placeholder="120000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget-breakdown">Budget Breakdown</Label>
                <Textarea
                  id="budget-breakdown"
                  placeholder="Provide a detailed breakdown of your budget"
                  className="min-h-[150px]"
                />
              </div>
              <Separator className="my-4" />
              <div className="space-y-2">
                <Label htmlFor="equipment">Equipment & Resources</Label>
                <Textarea
                  id="equipment"
                  placeholder="List the equipment and resources needed for your research"
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="justification">Budget Justification</Label>
                <Textarea
                  id="justification"
                  placeholder="Explain why the requested funding is necessary for your research"
                  className="min-h-[100px]"
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Proposal'
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
