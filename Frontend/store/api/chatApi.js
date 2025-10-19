// Async helper functions for chat operations
// These return dummy data and can be easily replaced with real API calls

export const fetchChatMessagesApi = async (conversationId) => {
  // DUMMY DATA - Replace with real API call
  // const response = await fetch(`/api/chat/conversations/${conversationId}/messages`);
  // return response.json();

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1",
          conversationId,
          sender: "user",
          content: "Can you explain my recent blood test results?",
          timestamp: new Date(Date.now() - 3600000),
          type: "text",
        },
        {
          id: "2",
          conversationId,
          sender: "bot",
          content:
            "Your blood test shows elevated WBC count at 12,000/μL (normal: 4,500-11,000). This could indicate an infection or inflammation. I recommend consulting with your doctor for further evaluation.",
          timestamp: new Date(Date.now() - 3500000),
          type: "text",
        },
        {
          id: "3",
          conversationId,
          sender: "user",
          content: "What should I do about it?",
          timestamp: new Date(Date.now() - 3400000),
          type: "text",
        },
        {
          id: "4",
          conversationId,
          sender: "bot",
          content:
            "Here are some recommendations:\n1. Schedule an appointment with your doctor\n2. Monitor for symptoms like fever or fatigue\n3. Stay hydrated and get adequate rest\n4. Avoid strenuous activities\n\nRemember: This is for informational purposes only, not medical advice.",
          timestamp: new Date(Date.now() - 3300000),
          type: "text",
        },
      ])
    }, 500)
  })
}

export const sendChatMessageApi = async (conversationId, message) => {
  // DUMMY DATA - Replace with real API call
  // const response = await fetch(`/api/chat/conversations/${conversationId}/messages`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ content: message }),
  // });
  // return response.json();

  return new Promise((resolve) => {
    setTimeout(() => {
      const userMessage = {
        id: Date.now().toString(),
        conversationId,
        sender: "user",
        content: message,
        timestamp: new Date(),
        type: "text",
      }

      // Simulate bot response
      setTimeout(() => {
        const botMessage = {
          id: (Date.now() + 1).toString(),
          conversationId,
          sender: "bot",
          content: `I understand you mentioned: "${message}". Could you provide more details about your health concern?`,
          timestamp: new Date(),
          type: "text",
        }
        resolve([userMessage, botMessage])
      }, 1000)

      resolve([userMessage])
    }, 300)
  })
}

export const uploadReportToChatApi = async (conversationId, file, reportData) => {
  // DUMMY DATA - Replace with real API call
  // const formData = new FormData();
  // formData.append('file', file);
  // formData.append('reportData', JSON.stringify(reportData));
  // const response = await fetch(`/api/chat/conversations/${conversationId}/upload`, {
  //   method: 'POST',
  //   body: formData,
  // });
  // return response.json();

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Date.now().toString(),
        conversationId,
        sender: "user",
        content: `Uploaded report: ${file.name}`,
        timestamp: new Date(),
        type: "report",
        reportData: {
          fileName: file.name,
          fileSize: file.size,
          uploadedAt: new Date(),
          analysis: "Blood test shows normal results with slight elevation in glucose levels.",
        },
      })
    }, 1500)
  })
}

export const fetchConversationsApi = async () => {
  // DUMMY DATA - Replace with real API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1",
          title: "Blood Test Discussion",
          lastMessage: "I understand you mentioned...",
          timestamp: new Date(Date.now() - 3600000),
          unread: 0,
        },
        {
          id: "2",
          title: "General Health Questions",
          lastMessage: "Can you help me understand...",
          timestamp: new Date(Date.now() - 86400000),
          unread: 2,
        },
      ])
    }, 300)
  })
}
