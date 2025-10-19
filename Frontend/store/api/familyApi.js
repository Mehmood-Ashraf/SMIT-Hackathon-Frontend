// src/store/familyAPI.js
import axios from "axios"
export const familyAPI = {
  async getFamilyMembers() {
    await new Promise((r) => setTimeout(r, 700))
    // dummy members
    return {
      ok: true,
      data: [
        { id: "m_1", name: "Aisha Khan", relation: "Mother", avatarColor: "bg-rose-200" },
        { id: "m_2", name: "Bilal Khan", relation: "Spouse", avatarColor: "bg-sky-200" },
        { id: "m_3", name: "Sara Khan", relation: "Daughter", avatarColor: "bg-amber-200" },
      ],
    }
  },

  async addFamilyMember(payload) {
    console.log(payload)
    try {
    console.log(payload)
     const response = await axios.post(`https://smit-hackathon-backend-phi.vercel.app/api/familyMember/add`, {
   userId:localStorage.getItem('id'), memberName:payload.name, relation:payload.relation
  });
    // echo back with a generated id
    return {
      ok: true,
      data: {
        id: "m_" + Math.random().toString(36).slice(2, 9),
        name: payload.name,
        relation: payload.relation || "",
        avatarColor: payload.avatarColor || "bg-slate-200",
      },
    }
        } catch (error) {
        console.log(error)
    }
    
  },

  async deleteFamilyMember(id) {
    await new Promise((r) => setTimeout(r, 350))
    return { ok: true, data: { id } }
  },
}