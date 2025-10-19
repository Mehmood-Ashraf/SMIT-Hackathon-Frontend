// Async helper functions for user operations
import axios from "axios" 

export const fetchUserProfileApi = async () => {
  // DUMMY DATA - Replace with real API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: "1",
        firstName: "Ahmed",
        lastName: "Khan",
        email: "ahmed@example.com",
        phone: "+92-300-1234567",
        dateOfBirth: "1990-05-15",
        gender: "Male",
        bloodType: "O+",
        allergies: ["Penicillin"],
        chronicConditions: ["Hypertension"],
        profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed",
      })
    }, 500)
  })
}

export const updateUserProfileApi = async (userData) => {
  // DUMMY DATA - Replace with real API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...userData,
        id: "1",
      })
    }, 800)
  })
}

export const loginUserApi = async (email, password) => {
  // DUMMY DATA - Replace with real API call
  try {
    

  const response = await axios.post(`https://smit-hackathon-backend-phi.vercel.app/api/auth/login`, {
    email,
    password,
  });
  if (response?.data?.status) {
    
    localStorage.setItem('id','68f401698732e9530623d0ee')
    console.log(response)
    localStorage.setItem('id',response?.data?.data?._id)
    console.log({email,password})
    return {
          id: response?.data?.data?._id,
          firstName: response?.data?.data?.userName,
          lastName: '',
          email:response?.data?.data?.email,
          token: response?.data?.data?.token,
        }
  }
    } catch (error) {
    console.log(error)
  }
}

export const logoutUserApi = async () => {
  // DUMMY DATA - Replace with real API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 300)
  })
}