"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm, Controller } from "react-hook-form"
import { useFieldArray } from "react-hook-form"
import { formatISO } from "date-fns"
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Upload, FileText, Plus, Trash } from "lucide-react"

import {  useAppDispatch,useAppSelector} from "@/store/hook"
import { uploadReport } from "@/store/thunks/reportThunks"
import { resetUploadState } from "@/store/slices/reportSlice"

export default function UploadDetailedReportPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { status, error } = useAppSelector((s) => s.reports || { status: "idle", error: null })

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      reportName: "",
      reportType: "",
      doctorName: "",
      hospitalName: "",
      date: null,
      price: "",
      notes: "",
      vitals: [{ key: "", value: "" }], // start with one vitals row
      file: null,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "vitals",
  })

  const [isDragging, setIsDragging] = useState(false)
  const [localFile, setLocalFile] = useState(null)

  // watch file so we can show validation
  const watchedFile = watch("file")

  // handle drag events
  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }
  const handleDragLeave = () => setIsDragging(false)
  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const dropped = e.dataTransfer.files?.[0]
    if (dropped) {
      setLocalFile(dropped)
      setValue("file", dropped, { shouldValidate: true })
    }
  }
  const handleFileSelect = (e) => {
    const f = e.target.files?.[0]
    if (f) {
      setLocalFile(f)
      setValue("file", f, { shouldValidate: true })
    }
  }
  const removeFile = () => {
    setLocalFile(null)
    setValue("file", null)
  }

  useEffect(() => {
    if (status === "succeeded") {
      // reset form when upload succeeded (and navigate)
      reset()
      setLocalFile(null)
      dispatch(resetUploadState())
      router.push("/reports")
    }
  }, [status, reset, router, dispatch])

  const onSubmit = async (data) => {
    // file is required
    if (!data.file) {
      alert("File is required")
      return
    }

    // build FormData
    const fd = new FormData()
    fd.append("file", data.file)

    // append optional fields (only if provided) — keep backend tolerant
    console.log(data?.reportName, data?.reportType, data?.doctorName, data?.hospitalName)
    if (data.reportName){ console.log("inside if") 
      fd.append("reportName", data.reportName)}
    if (data.reportType) fd.append("reportType", data.reportType)
    if (data.doctorName) fd.append("doctorName", data.doctorName)
    if (data.hospitalName) fd.append("hospitalName", data.hospitalName)
    if (data.date) {
      // if date is a Date object
      const iso = data.date instanceof Date ? formatISO(data.date) : data.date
      fd.append("date", iso)
    }
    if (data.price) fd.append("price", data.price)
    if (data.notes) fd.append("notes", data.notes)

    // vitals: only include non-empty pairs
    const vitalsFiltered = (data.vitals || []).filter((v) => v.key || v.value)
    if (vitalsFiltered.length) fd.append("vitals", JSON.stringify(vitalsFiltered))

    // dispatch thunk
    console.log({fd, data})
    dispatch(uploadReport(fd))
  }

  return (
    <div className="space-y-6">
      {/* header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Add New Medical Report</h1>
          <p className="text-muted-foreground mt-1">Attach a report file and optional metadata</p>
        </div>
      </div>

      {/* form area */}
      <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-3 gap-6">
        {/* Left: Inputs */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Report Details</CardTitle>
              <CardDescription>Provide details (all optional except the file)</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="mb-1">Report Name</Label>
                  <Input placeholder="e.g. Chest X-Ray - Jan 2025" {...register("reportName")} />
                </div>

                <div>
                  <Label className="mb-1">Report Type</Label>
                  <Input placeholder="Lab Report, Imaging, Prescription..." {...register("reportType")} />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="mb-1">Doctor Name</Label>
                  <Input placeholder="Dr. Ahmed" {...register("doctorName")} />
                </div>

                <div>
                  <Label className="mb-1">Hospital / Clinic</Label>
                  <Input placeholder="City Medical Center" {...register("hospitalName")} />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 items-end">
                {/* <div>
                  <Label className="mb-1">Date</Label>
                  <Controller
                    control={control}
                    name="date"
                    render={({ field }) => (
                      <div>
                        <DayPicker
                          mode="single"
                          selected={field.value}
                          onSelect={(d) => field.onChange(d)}
                          footer={field.value ? `Selected: ${field.value.toLocaleDateString()}` : "Pick a date"}
                        />
                      </div>
                    )}
                  />
                </div> */}

                <div>
                  <Label className="mb-1">Price</Label>
                  <Input type="number" step="0.01" placeholder="0.00" {...register("price")} />
                </div>

                <div>
                  <Label className="mb-1">Notes</Label>
                  <Input placeholder="Short notes (optional)" {...register("notes")} />
                </div>
              </div>

              {/* Vitals field array */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium">Vitals</h3>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => append({ key: "", value: "" })}
                    className="flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> Add
                  </Button>
                </div>

                <div className="space-y-2">
                  {fields.map((f, idx) => (
                    <div key={f.id} className="flex gap-2 items-center">
                      <input
                        className="flex-1 rounded border px-3 py-2"
                        placeholder="Key (e.g. Blood Pressure)"
                        {...register(`vitals.${idx}.key`)}
                      />
                      <input
                        className="flex-1 rounded border px-3 py-2"
                        placeholder="Value (e.g. 120/80)"
                        {...register(`vitals.${idx}.value`)}
                      />
                      <button
                        type="button"
                        onClick={() => remove(idx)}
                        className="p-2 rounded hover:bg-muted"
                        aria-label="Remove"
                      >
                        <Trash className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: File uploader & submit */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload File</CardTitle>
              <CardDescription>PDF, PNG, JPG, DOC, DOCX (file is required)</CardDescription>
            </CardHeader>

            <CardContent>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  isDragging ? "border-primary bg-primary/5" : "border-border"
                }`}
              >
                <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-foreground font-medium mb-2">Drag & drop or click to browse</p>
                <p className="text-muted-foreground text-sm mb-4">Accepted: .pdf, .jpg, .jpeg, .png, .doc, .docx</p>

                <label className="inline-block">
                  <input
                    type="file"
                    onChange={handleFileSelect}
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    className="hidden"
                  />
                  <Button variant="outline" asChild className="cursor-pointer bg-transparent">
                    <span>Browse Files</span>
                  </Button>
                </label>
              </div>

              {/* selected file preview */}
              {localFile && (
                <div className="mt-4 p-3 bg-muted rounded-lg flex items-center gap-3">
                  <FileText className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{localFile.name}</p>
                    <p className="text-sm text-muted-foreground">{(localFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Remove file"
                  >
                    ✕
                  </button>
                </div>
              )}

              {/* file validation hint */}
              {!localFile && (
                <p className="text-sm text-muted-foreground mt-3">File is required to submit this form.</p>
              )}
            </CardContent>
          </Card>

          <div className="flex flex-col gap-2">
            <Button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              disabled={!localFile || status === "loading"}
              className="w-full"
            >
              {status === "loading" ? "Uploading..." : "Upload Report"}
            </Button>

            <Button variant="ghost" onClick={() => { reset(); setLocalFile(null); }}>
              Reset
            </Button>

            {status === "failed" && <p className="text-sm text-destructive">{error || "Upload failed"}</p>}
          </div>
        </div>
      </form>
    </div>
  )
}


// "use client"

// import type React from "react"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { ArrowLeft, Upload, FileText } from "lucide-react"

// export default function UploadReportPage() {
//   const router = useRouter()
//   const [isDragging, setIsDragging] = useState(false)
//   const [file, setFile] = useState<File | null>(null)
//   const [reportType, setReportType] = useState("")
//   const [isUploading, setIsUploading] = useState(false)

//   const reportTypes = [
//     "Lab Report",
//     "Imaging (X-Ray, CT, MRI)",
//     "Cardiac Report",
//     "Prescription",
//     "Vaccination Record",
//     "Other",
//   ]

//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault()
//     setIsDragging(true)
//   }

//   const handleDragLeave = () => {
//     setIsDragging(false)
//   }

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault()
//     setIsDragging(false)
//     const droppedFile = e.dataTransfer.files[0]
//     if (droppedFile) {
//       setFile(droppedFile)
//     }
//   }

//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files?.[0]
//     if (selectedFile) {
//       setFile(selectedFile)
//     }
//   }

//   const handleUpload = async () => {
//     if (!file || !reportType) {
//       alert("Please select a file and report type")
//       return
//     }

//     setIsUploading(true)
//     // Simulate upload
//     setTimeout(() => {
//       router.push("/reports")
//     }, 1500)
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center gap-4">
//         <Button variant="outline" size="icon" onClick={() => router.back()}>
//           <ArrowLeft className="w-4 h-4" />
//         </Button>
//         <div>
//           <h1 className="text-3xl font-bold text-foreground">Upload Medical Report</h1>
//           <p className="text-muted-foreground mt-1">Add a new medical report for analysis</p>
//         </div>
//       </div>

//       <div className="grid md:grid-cols-3 gap-6">
//         {/* Upload Area */}
//         <div className="md:col-span-2 space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Select File</CardTitle>
//               <CardDescription>Upload PDF, images, or documents</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div
//                 onDragOver={handleDragOver}
//                 onDragLeave={handleDragLeave}
//                 onDrop={handleDrop}
//                 className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
//                   isDragging ? "border-primary bg-primary/5" : "border-border"
//                 }`}
//               >
//                 <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
//                 <p className="text-foreground font-medium mb-2">Drag and drop your file here</p>
//                 <p className="text-muted-foreground text-sm mb-4">or</p>
//                 <label>
//                   <input
//                     type="file"
//                     onChange={handleFileSelect}
//                     accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
//                     className="hidden"
//                   />
//                   <Button variant="outline" asChild className="cursor-pointer bg-transparent">
//                     <span>Browse Files</span>
//                   </Button>
//                 </label>
//               </div>

//               {file && (
//                 <div className="mt-6 p-4 bg-muted rounded-lg flex items-center gap-3">
//                   <FileText className="w-5 h-5 text-primary" />
//                   <div className="flex-1">
//                     <p className="font-medium text-foreground">{file.name}</p>
//                     <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
//                   </div>
//                   <button
//                     onClick={() => setFile(null)}
//                     className="text-muted-foreground hover:text-foreground transition-colors"
//                   >
//                     ✕
//                   </button>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>

//         {/* Report Type Selection */}
//         <div>
//           <Card>
//             <CardHeader>
//               <CardTitle>Report Type</CardTitle>
//               <CardDescription>Select the type of report</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-3">
//               {reportTypes.map((type) => (
//                 <label key={type} className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-muted">
//                   <input
//                     type="radio"
//                     name="reportType"
//                     value={type}
//                     checked={reportType === type}
//                     onChange={(e) => setReportType(e.target.value)}
//                     className="w-4 h-4"
//                   />
//                   <span className="text-sm text-foreground">{type}</span>
//                 </label>
//               ))}
//             </CardContent>
//           </Card>

//           <Button onClick={handleUpload} disabled={!file || !reportType || isUploading} className="w-full mt-4">
//             {isUploading ? "Uploading..." : "Upload Report"}
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }
