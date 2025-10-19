"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Search, Plus, ThumbsUp, MessageSquare, Clock } from "lucide-react"

// DUMMY DATA - Replace with real API calls
const dummyQAs = [
  {
    id: 1,
    question: "What does high WBC count mean in my blood test?",
    category: "Blood Test",
    reportId: 1,
    reportTitle: "Blood Test Report",
    answer:
      "A high WBC (White Blood Cell) count typically indicates that your body is fighting an infection or inflammation. This could be due to bacterial infection, viral infection, or other inflammatory conditions. It's important to consult with your doctor for proper diagnosis and treatment.",
    answerUrdu:
      "ایک اعلیٰ WBC (سفید خون کے خلیے) کی تعداد عام طور پر ظاہر کرتی ہے کہ آپ کا جسم انفیکشن یا سوزش سے لڑ رہا ہے۔ یہ بیکٹیریل انفیکشن، وائرل انفیکشن، یا دیگر سوزش والی حالتوں کی وجہ سے ہو سکتا ہے۔",
    helpful: 24,
    views: 156,
    date: "2024-10-15",
    answered: true,
    tags: ["Blood Test", "WBC", "Infection"],
  },
  {
    id: 2,
    question: "Should I be concerned about my blood pressure reading of 140/90?",
    category: "Vitals",
    reportId: null,
    reportTitle: null,
    answer:
      "A blood pressure reading of 140/90 mmHg falls into the Stage 2 Hypertension category. While this is elevated, a single reading doesn't necessarily mean you have hypertension. It's recommended to monitor your blood pressure regularly and consult with your doctor for proper evaluation and treatment options.",
    answerUrdu:
      "140/90 mmHg کا بلڈ پریشر ریڈنگ سٹیج 2 ہائی بلڈ پریشر کے زمرے میں آتا ہے۔ اگرچہ یہ بلند ہے، ایک ریڈنگ کا مطلب یہ نہیں ہے کہ آپ کو ہائی بلڈ پریشر ہے۔",
    helpful: 18,
    views: 92,
    date: "2024-10-14",
    answered: true,
    tags: ["Blood Pressure", "Hypertension", "Vitals"],
  },
  {
    id: 3,
    question: "What foods should I avoid with my current health condition?",
    category: "General",
    reportId: 1,
    reportTitle: "Blood Test Report",
    answer: null,
    answerUrdu: null,
    helpful: 0,
    views: 45,
    date: "2024-10-13",
    answered: false,
    tags: ["Diet", "Nutrition", "Health"],
  },
  {
    id: 4,
    question: "Is my hemoglobin level normal for my age?",
    category: "Blood Test",
    reportId: 1,
    reportTitle: "Blood Test Report",
    answer:
      "Hemoglobin levels vary based on age, gender, and overall health. For adults, normal hemoglobin levels are typically 13.5-17.5 g/dL for men and 12.0-15.5 g/dL for women. Your doctor can compare your specific results with age-appropriate reference ranges to determine if your level is normal.",
    answerUrdu:
      "ہیموگلوبن کی سطح عمر، جنس، اور مجموعی صحت کی بنیاد پر مختلف ہوتی ہے۔ بالغوں کے لیے، عام ہیموگلوبن کی سطح عام طور پر مردوں کے لیے 13.5-17.5 g/dL اور خواتین کے لیے 12.0-15.5 g/dL ہے۔",
    helpful: 31,
    views: 203,
    date: "2024-10-12",
    answered: true,
    tags: ["Hemoglobin", "Blood Test", "Normal Range"],
  },
]

export default function QAPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [language, setLanguage] = useState<"en" | "ur">("en")

  const categories = ["All", "Blood Test", "Vitals", "General", "Imaging", "Medications"]

  const filteredQAs = dummyQAs.filter((qa) => {
    const matchesSearch =
      qa.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      qa.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "All" || qa.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const translations = {
    en: {
      title: "Q&A About Your Reports",
      subtitle: "Ask questions and get AI-powered answers about your medical reports",
      askQuestion: "Ask a Question",
      search: "Search questions...",
      categories: "Categories",
      answered: "Answered",
      unanswered: "Unanswered",
      views: "views",
      helpful: "helpful",
      noResults: "No questions found",
      tryDifferent: "Try searching with different keywords",
    },
    ur: {
      title: "آپ کی رپورٹس کے بارے میں سوالات",
      subtitle: "اپنی میڈیکل رپورٹس کے بارے میں سوالات پوچھیں اور AI سے جوابات حاصل کریں",
      askQuestion: "سوال پوچھیں",
      search: "سوالات تلاش کریں...",
      categories: "زمرہ جات",
      answered: "جواب دیا گیا",
      unanswered: "جواب نہیں دیا گیا",
      views: "نظریات",
      helpful: "مفید",
      noResults: "کوئی سوال نہیں ملا",
      tryDifferent: "مختلف الفاظ سے تلاش کرنے کی کوشش کریں",
    },
  }

  const t = translations[language]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
          <p className="text-muted-foreground mt-2">{t.subtitle}</p>
        </div>
        <div className="flex gap-2">
          <Button variant={language === "en" ? "default" : "outline"} size="sm" onClick={() => setLanguage("en")}>
            EN
          </Button>
          <Button variant={language === "ur" ? "default" : "outline"} size="sm" onClick={() => setLanguage("ur")}>
            اردو
          </Button>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={t.search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={() => router.push("/qa/ask")} className="gap-2">
          <Plus className="w-4 h-4" />
          {t.askQuestion}
        </Button>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="whitespace-nowrap"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Q&A List */}
      <div className="space-y-4">
        {filteredQAs.length === 0 ? (
          <Card>
            <CardContent className="pt-12 text-center">
              <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground mb-2">{t.noResults}</p>
              <p className="text-sm text-muted-foreground">{t.tryDifferent}</p>
            </CardContent>
          </Card>
        ) : (
          filteredQAs.map((qa) => (
            <Card
              key={qa.id}
              className="hover:border-primary/50 transition-colors cursor-pointer"
              onClick={() => router.push(`/qa/${qa.id}`)}
            >
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {/* Question Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2">{qa.question}</h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {qa.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Badge variant={qa.answered ? "default" : "outline"} className="whitespace-nowrap">
                      {qa.answered ? t.answered : t.unanswered}
                    </Badge>
                  </div>

                  {/* Answer Preview */}
                  {qa.answered && (
                    <div className="bg-muted/50 p-3 rounded-lg border border-border">
                      <p className="text-sm text-foreground line-clamp-2">
                        {language === "en" ? qa.answer : qa.answerUrdu}
                      </p>
                    </div>
                  )}

                  {/* Report Link */}
                  {qa.reportTitle && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MessageSquare className="w-4 h-4" />
                      <span>Related to: {qa.reportTitle}</span>
                    </div>
                  )}

                  {/* Footer Stats */}
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {qa.date}
                      </span>
                      <span>
                        {qa.views} {t.views}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ThumbsUp className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{qa.helpful}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
