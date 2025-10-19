// app/(dashboard)/family/FamilyMembersPage.jsx
"use client"

import React, { useEffect, useState } from "react"
import {useAppSelector,useAppDispatch} from "@/store/hook"
import { fetchFamilyMembers, addFamilyMember, deleteFamilyMember } from "@/store/thunks/familyThunk"
import AddMemberModal from "@/components/family/AddMember"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Heart, Home, Users, Trash2, Plus } from "lucide-react"
import { useRouter } from "next/router"
import Link from "next/link"

export default function FamilyMembersPage() {
  const dispatch = useAppDispatch()
  const { items, status, error } = useAppSelector((s) => s.family || { items: [], status: "idle", error: null })

  const [open, setOpen] = useState(false)
  const [loadingAdd, setLoadingAdd] = useState(false)

  useEffect(() => {
    if (status === "idle") dispatch(fetchFamilyMembers())
  }, [dispatch, status])

  const relationIcon = (relation) => {
    if (!relation) return <User className="w-6 h-6" />
    const r = relation.toLowerCase()
    if (r.includes("mother") || r.includes("mother")) return <Heart className="w-6 h-6" />
    if (r.includes("father") || r.includes("father")) return <Home className="w-6 h-6" />
    if (r.includes("spouse") || r.includes("husband") || r.includes("wife")) return <Users className="w-6 h-6" />
    return <User className="w-6 h-6" />
  }
// utils/avatarColor.js
 function getAvatarColor(relation = "", name = "") {
  const rel = relation.toLowerCase()

  if (rel.includes("father")) return "bg-blue-200"
  if (rel.includes("mother")) return "bg-pink-200"
  if (rel.includes("spouse") || rel.includes("wife") || rel.includes("husband")) return "bg-indigo-200"
  if (rel.includes("son")) return "bg-emerald-200"
  if (rel.includes("daughter")) return "bg-amber-200"
  if (rel.includes("brother")) return "bg-sky-200"
  if (rel.includes("sister")) return "bg-rose-200"
  if (rel.includes("grand")) return "bg-lime-200"

  // fallback: hash name into a color bucket
  const colors = [
    "bg-sky-200",
    "bg-emerald-200",
    "bg-rose-200",
    "bg-amber-200",
    "bg-indigo-200",
    "bg-purple-200",
    "bg-pink-200",
  ]

  if (name) {
    let hash = 0
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
    const index = Math.abs(hash) % colors.length
    return colors[index]
  }

  // ultimate fallback
  return "bg-slate-200"
}


  const handleAdd = async (vals) => {
    setLoadingAdd(true)
    // optional avatarColor for nicer UI
    const avatarColor = "bg-indigo-200"
    console.log(vals)
    await dispatch(addFamilyMember({ ...vals, avatarColor }))
    setLoadingAdd(false)
    setOpen(false)
  }

  const handleDelete = async (id) => {
    if (!confirm("Remove this family member?")) return
    await dispatch(deleteFamilyMember(id))
  }
console.log({items})
  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between py-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Family Members</h1>
          <p className="text-muted-foreground mt-1">Manage family members connected to your HealthMate account</p>
        </div>

        <div>
          <Button onClick={() => setOpen(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Member
          </Button>
        </div>
      </div>

      <div>
        {/* <Card className="bg-transparent m-4 shadow-none"> */}
          {/* <CardHeader>
            <CardTitle>Members</CardTitle>
          </CardHeader> */}
          {/* <CardContent> */}
            {status === "loading" && <p className="text-sm text-muted-foreground">Loading...</p>}
            {status === "failed" && <p className="text-sm text-destructive">{error}</p>}

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {items?.length === 0 && status === "succeeded" && (
                <div className="text-sm text-muted-foreground">No members yet — add one.</div>
              )}

              {items?.map((m) => (
                <Link href={`/reports/${m._id}`}>
                <div  key={m._id} className="rounded-lg border p-4 flex items-center gap-3 shadow-sm ">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getAvatarColor(m.relation, m.name)}`}>
                    {relationIcon(m.relation)}
                  </div>

                  <div className="flex-1">
                    <div className="font-medium text-foreground">{m.memberName}</div>
                    <div className="text-sm text-muted-foreground">{m.relation || "—"}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button onClick={() => handleDelete(m.id)} className="p-2 rounded hover:bg-muted" aria-label="Delete">
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </button>
                  </div>
                </div>
                </Link>
              ))}
            </div>
          {/* </CardContent> */}
        {/* </Card> */}
      </div>

      <AddMemberModal open={open} onClose={() => setOpen(false)} onSubmit={handleAdd} loading={loadingAdd} />
    </div>
  )
}