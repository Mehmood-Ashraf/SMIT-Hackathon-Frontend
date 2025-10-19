// components/AddMemberModal.jsx
"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, UserPlus } from "lucide-react"

export default function AddMemberModal({ open, onClose, onSubmit, loading }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { name: "", relation: "" },
  })

  const submit = (vals) => {
    onSubmit(vals)
    reset()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <Card className="w-full max-w-md z-10">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5" /> Add Family Member
          </CardTitle>
          <button onClick={onClose} aria-label="Close" className="p-2 rounded hover:bg-muted">
            <X className="w-4 h-4" />
          </button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(submit)} className="space-y-3">
            <div>
              <Label className="mb-1">Name</Label>
              <Input {...register("name", { required: true })} placeholder="e.g. Ahmed Khan" />
            </div>

            <div>
              <Label className="mb-1">Relation (optional)</Label>
              <Input {...register("relation")} placeholder="e.g. Father, Spouse, Daughter" />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="ghost" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Adding..." : "Add Member"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
