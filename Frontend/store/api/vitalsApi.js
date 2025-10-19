// Async helper functions for vitals operations

export const fetchVitalsApi = async () => {
  // DUMMY DATA - Replace with real API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1",
          type: "Blood Pressure",
          value: "130/80",
          unit: "mmHg",
          recordedDate: new Date(Date.now() - 3600000),
          timeOfDay: "Morning",
          isAbnormal: true,
        },
        {
          id: "2",
          type: "Blood Sugar",
          value: "95",
          unit: "mg/dL",
          recordedDate: new Date(Date.now() - 7200000),
          timeOfDay: "Fasting",
          isAbnormal: false,
        },
        {
          id: "3",
          type: "Weight",
          value: "75",
          unit: "kg",
          recordedDate: new Date(Date.now() - 86400000),
          timeOfDay: "Morning",
          isAbnormal: false,
        },
      ])
    }, 500)
  })
}

export const addVitalApi = async (vitalData) => {
  // DUMMY DATA - Replace with real API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Date.now().toString(),
        ...vitalData,
        recordedDate: new Date(),
      })
    }, 500)
  })
}

export const deleteVitalApi = async (vitalId) => {
  // DUMMY DATA - Replace with real API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(vitalId)
    }, 300)
  })
}

export const fetchVitalTrendsApi = async (vitalType, days = 30) => {
  // DUMMY DATA - Replace with real API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = []
      for (let i = days; i > 0; i--) {
        data.push({
          date: new Date(Date.now() - i * 86400000).toLocaleDateString(),
          value: Math.floor(Math.random() * 50) + 100,
        })
      }
      resolve(data)
    }, 500)
  })
}
