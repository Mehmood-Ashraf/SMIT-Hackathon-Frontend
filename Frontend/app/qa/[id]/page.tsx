"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, ThumbsUp, ThumbsDown, Share2, Flag, MessageCircle } from "lucide-react"

// DUMMY DATA - Replace with real API calls
const dummyQADetail = {
  id: 1,
  question: "What does high WBC count mean in my blood test?",
  category: "Blood Test",
  reportId: 1,
  reportTitle: "Blood Test Report",
  askedBy: "You",
  askedDate: "2024-10-15",
  answer:
    "A high WBC (White Blood Cell) count typically indicates that your body is fighting an infection or inflammation. This could be due to bacterial infection, viral infection, or other inflammatory conditions. It's important to consult with your doctor for proper diagnosis and treatment.\n\nNormal WBC count ranges from 4,500 to 11,000 cells per microliter of blood. If your count is significantly higher, your doctor may recommend:\n\n1. Additional testing to identify the cause\n2. Lifestyle modifications\n3. Medical treatment if necessary\n\nCommon causes of high WBC include:\n- Infections (bacterial, viral, or fungal)\n- Leukemia or other blood disorders\n- Stress or physical exertion\n- Certain medications\n- Smoking",
  answerUrdu:
    "ایک اعلیٰ WBC (سفید خون کے خلیے) کی تعداد عام طور پر ظاہر کرتی ہے کہ آپ کا جسم انفیکشن یا سوزش سے لڑ رہا ہے۔ یہ بیکٹیریل انفیکشن، وائرل انفیکشن، یا دیگر سوزش والی حالتوں کی وجہ سے ہو سکتا ہے۔ اپنے ڈاکٹر سے مناسب تشخیص اور علاج کے لیے رابطہ کرنا ضروری ہے۔",
  answeredBy: "Dr. AI Assistant",
  answeredDate: "2024-10-15",
  helpful: 24,
  notHelpful: 2,
  views: 156,
  tags: ["Blood Test", "WBC", "Infection"],
  relatedQuestions: [
    {
      id: 4,
      question: "Is my hemoglobin level normal for my age?",
      helpful: 31,
    },
    {
      id: 2,
      question: "Should I be concerned about my blood pressure reading of 140/90?",
      helpful: 18,
    },
  ],
}

export default function QADetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [language, setLanguage] = useState<"en" | "ur">("en")
  const [userHelpful, setUserHelpful] = useState<"helpful" | "notHelpful" | null>(null)
  const [followUpQuestion, setFollowUpQuestion] = useState("")

  const translations = {
    en: {
      back: "Back to Q&A",
      answeredBy: "Answered by",
      on: "on",
      relatedQuestions: "Related Questions",
      followUp: "Ask a Follow-up Question",
      submit: "Submit",
      wasHelpful: "Was this answer helpful?",
      yes: "Yes",
      no: "No",
      share: "Share",
      report: "Report",
      views: "views",
      helpful: "people found this helpful",
    },
    ur: {
      back: "Q&A پر واپس جائیں",
      answeredBy: "کا جواب دیا",
      on: "پر",
      relatedQuestions: "متعلقہ سوالات",
      followUp: "ایک متابعت کا سوال پوچھیں",
      submit: "جمع کریں",
      wasHelpful: "کیا یہ جواب مفید تھا؟",
      yes: "ہاں",
      no: "نہیں",
      share: "شیئر کریں",
      report: "رپورٹ کریں",
      views: "نظریات",
      helpful: "لوگوں نے یہ مفید پایا",
    },
  }

  const t = translations[language]
  const qa = dummyQADetail

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => router.back()} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          {t.back}
        </Button>
        <div className="flex gap-2">
          <Button variant={language === "en" ? "default" : "outline"} size="sm" onClick={() => setLanguage("en")}>
            EN
          </Button>
          <Button variant={language === "ur" ? "default" : "outline"} size="sm" onClick={() => setLanguage("ur")}>
            اردو
          </Button>
        </div>
      </div>

      {/* Question Card */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground mb-3">{qa.question}</h1>
              <div className="flex flex-wrap gap-2 mb-4">
                {qa.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>
                  Asked by <span className="font-medium">{qa.askedBy}</span> {t.on} {qa.askedDate}
                </p>
                {qa.reportTitle && (
                  <p>
                    Related to: <span className="font-medium">{qa.reportTitle}</span>
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Flag className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Answer Card */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">{t.answeredBy}</CardTitle>
              <CardDescription>
                {qa.answeredBy} {t.on} {qa.answeredDate}
              </CardDescription>
            </div>
            <Badge variant="default">Verified Answer</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="prose prose-sm max-w-none">
            <p className="text-foreground whitespace-pre-wrap leading-relaxed">
              {language === "en" ? qa.answer : qa.answerUrdu}
            </p>
          </div>

          {/* Helpful Section */}
          <div className="pt-4 border-t border-border">
            <p className="text-sm font-medium text-foreground mb-3">{t.wasHelpful}</p>
            <div className="flex items-center gap-4">
              <Button
                variant={userHelpful === "helpful" ? "default" : "outline"}
                size="sm"
                onClick={() => setUserHelpful(userHelpful === "helpful" ? null : "helpful")}
                className="gap-2"
              >
                <ThumbsUp className="w-4 h-4" />
                {t.yes} ({qa.helpful})
              </Button>
              <Button
                variant={userHelpful === "notHelpful" ? "default" : "outline"}
                size="sm"
                onClick={() => setUserHelpful(userHelpful === "notHelpful" ? null : "notHelpful")}
                className="gap-2"
              >
                <ThumbsDown className="w-4 h-4" />
                {t.no} ({qa.notHelpful})
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-6 text-sm text-muted-foreground pt-2">
            <span>
              {qa.views} {t.views}
            </span>
            <span>
              {qa.helpful} {t.helpful}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Related Questions */}
      {qa.relatedQuestions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>{t.relatedQuestions}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {qa.relatedQuestions.map((relatedQA) => (
              <div
                key={relatedQA.id}
                className="p-3 border border-border rounded-lg hover:border-primary/50 transition-colors cursor-pointer"
                onClick={() => router.push(`/qa/${relatedQA.id}`)}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-foreground">{relatedQA.question}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
                    <ThumbsUp className="w-3 h-3" />
                    {relatedQA.helpful}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Follow-up Question */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            {t.followUp}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Ask a follow-up question..."
            value={followUpQuestion}
            onChange={(e) => setFollowUpQuestion(e.target.value)}
            className="min-h-24"
          />
          <Button onClick={() => setFollowUpQuestion("")} className="w-full">
            {t.submit}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
