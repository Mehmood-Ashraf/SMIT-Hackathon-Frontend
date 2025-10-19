// Async helper functions for reports operations

export const fetchReportsApi = async () => {
  // DUMMY DATA - Replace with real API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1",
          title: "Blood Test Report",
          type: "Blood Test",
          uploadedAt: new Date(Date.now() - 604800000),
          status: "Analyzed",
          fileName: "blood_test_2024.pdf",
          fileSize: 2048576,
          aiSummary: "Normal results with slight elevation in glucose levels.",
        },
        {
          id: "2",
          title: "X-Ray Report",
          type: "X-Ray",
          uploadedAt: new Date(Date.now() - 1209600000),
          status: "Analyzed",
          fileName: "xray_chest_2024.pdf",
          fileSize: 5242880,
          aiSummary: "No abnormalities detected.",
        },
        {
          id: "3",
          title: "Ultrasound Report",
          type: "Ultrasound",
          uploadedAt: new Date(Date.now() - 1814400000),
          status: "Pending",
          fileName: "ultrasound_abdomen_2024.pdf",
          fileSize: 3145728,
          aiSummary: null,
        },
      ])
    }, 500)
  })
}

export const uploadReportApi = async (file, reportData) => {
  // DUMMY DATA - Replace with real API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Date.now().toString(),
        title: reportData.title,
        type: reportData.type,
        uploadedAt: new Date(),
        status: "Processing",
        fileName: file.name,
        fileSize: file.size,
        aiSummary: null,
      })
    }, 2000)
  })
}

export const deleteReportApi = async (reportId) => {
  // DUMMY DATA - Replace with real API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(reportId)
    }, 300)
  })
}

export const fetchReportDetailsApi = async (reportId) => {
  // DUMMY DATA - Replace with real API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: reportId,
        title: "Blood Test Report",
        type: "Blood Test",
        uploadedAt: new Date(Date.now() - 604800000),
        status: "Analyzed",
        fileName: "blood_test_2024.pdf",
        fileSize: 2048576,
        aiSummary: "Normal results with slight elevation in glucose levels.",
        abnormalValues: [{ parameter: "Glucose", value: "115 mg/dL", normalRange: "70-100 mg/dL", severity: "Low" }],
        normalValues: [
          { parameter: "WBC", value: "7,500/μL", normalRange: "4,500-11,000/μL" },
          { parameter: "Hemoglobin", value: "14.5 g/dL", normalRange: "13.5-17.5 g/dL" },
        ],
        doctorQuestions: [
          "Should I modify my diet?",
          "Do I need follow-up tests?",
          "Are there any medications I should take?",
        ],
      })
    }, 500)
  })
}
