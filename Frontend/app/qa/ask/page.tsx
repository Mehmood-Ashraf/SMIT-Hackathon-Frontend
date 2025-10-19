"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, AlertCircle } from "lucide-react"

// DUMMY DATA - Replace with real API calls
const dummyReports = [
  { id: 1, title: "Blood Test Report", date: "2024-10-15" },
  { id: 2, title: "X-Ray Results", date: "2024-10-10" },
  { id: 3, title: "Ultrasound Report", date: "2024-10-05" },
]

export default function AskQuestionPage() {
  const router = useRouter()
  const [question, setQuestion] = useState("")
  const [description, setDescription] = useState("")
  const [selectedReport, setSelectedReport] = useState("")
  const [category, setCategory] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")

  const categories = ["Blood Test", "Vitals", "Imaging", "Medications", "General", "Other"]

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  const handleSubmit = () => {
    // DUMMY SUBMISSION - Replace with real API call
    console.log({
      question,
      description,
      selectedReport,
      category,
      tags,
    })
    router.push("/qa")
  }

  const isFormValid = question.trim() && category

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      {/* Header */}
      <div>
        <Button variant="ghost" onClick={() => router.back()} className="gap-2 mb-4">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <h1 className="text-3xl font-bold text-foreground">Ask a Question</h1>
        <p className="text-muted-foreground mt-2">Get AI-powered answers about your medical reports</p>
      </div>

      {/* Info Alert */}
      <Card className="bg-accent/5 border-accent/20">
        <CardContent className="pt-6 flex gap-3">
          <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
          <div className="text-sm text-foreground">
            <p className="font-medium mb-1">Tips for better answers:</p>
            <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
              <li>Be specific about your concern</li>
              <li>Include relevant test values if applicable</li>
              <li>Link to the related medical report</li>
              <li>Add relevant tags for better categorization</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Question Details</CardTitle>
          <CardDescription>Provide clear information about your question</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Question Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Question *</label>
            <Input
              placeholder="What would you like to know about your report?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="text-base"
            />
            <p className="text-xs text-muted-foreground">{question.length}/200 characters</p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Additional Details</label>
            <Textarea
              placeholder="Provide more context about your question (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-24"
            />
            <p className="text-xs text-muted-foreground">{description.length}/1000 characters</p>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Category *</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Related Report */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Related Report (Optional)</label>
            <Select value={selectedReport} onValueChange={setSelectedReport}>
              <SelectTrigger>
                <SelectValue placeholder="Link to a medical report" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {dummyReports.map((report) => (
                  <SelectItem key={report.id} value={report.id.toString()}>
                    {report.title} ({report.date})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Tags</label>
            <div className="flex gap-2">
              <Input
                placeholder="Add tags (e.g., WBC, infection)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddTag()
                  }
                }}
              />
              <Button variant="outline" onClick={handleAddTag} className="whitespace-nowrap bg-transparent">
                Add Tag
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="cursor-pointer hover:bg-secondary/80"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    {tag} ×
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button variant="outline" onClick={() => router.back()} className="flex-1">
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={!isFormValid} className="flex-1">
          Submit Question
        </Button>
      </div>
    </div>
  )
}
