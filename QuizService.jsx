import axios from "axios"


export const api = axios.create({
	baseURL: "http://localhost:9192/questions",
})

export const empApi = axios.create({
  baseURL: "http://localhost:9192/employee"
})

export const resultApi = axios.create({
  baseURL: "http://localhost:9192/result"
})



export const createQuestion = async(quizQustion) =>{
  try {
    const response = await api.post("/create-new-question", quizQustion)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getAllQuestions = async() =>{
  try {
    const response = await api.get("/")
    return response.data
  } catch (error) {
    console.error(error.response.data)
    return []
  }
}

export const fetchQuizForUser = async(number, subject) =>{
  try {
    const response = await api.get(
			`/fetch-questions-for-user?numOfQuestions=${number}&subject=${subject}`
		)
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}

export const getSubjects = async() =>{
  try {
    const response = await api.get("/subjects")
    return response.data
  } catch (error) {
    console.error(error)

  }
}

export const updateQuestion = async(id, question) =>{
  try {
    const response = await api.put(`/${id}/update`, question)
    return response.data
  } catch (error) {
    console.error(error)

  }
}

export const getQuestionById = async(id) =>{
  try {
    const response = await api.get(`/${id}`)
		return response.data
  } catch (error) {
    console.error(error)
  }
}

export const deleteQuestion = async(id) =>{
  try {
    const response = await api.delete(`/${id}/delete`)
		return response.data
  } catch (error) {
    console.error(error)
  }
}

export const saveEmployee = async(employee) => {
  try{
    const response = await empApi.post("/")
    return response.data
  }catch(error){
    console.log(error)
  }
}
export const getEmployees = async() => {
  try{
    const response = await empApi.get("/")
    return response.data
  }catch(error){
    console.log(error)
  }
}
export const getEmployeeById = async(Id) => {
  try{
    const response =await empApi.get("/{id}")
    return response.data
  }catch(error){
    console.log(error)
  }
}
export const updateEmployee = async(Id,employee) => {
  try{
    const response = await empApi.put("/{id}")
    return response.data
  }catch(error){
    console.log(error)
  }
}
export  const deleteEmpolyee = async(id) => {
  try {
    const response = await empApi.delete("/{id}/delete")
    return response.data
  }catch(error){
    console.log(error)
  }
}

//result mapping

export const saveResult = async(result) => {
  try{
    const response = await resultApi.post("/")
    return response.data
  }catch(error){
    console.log(error)
  }
}

export const getScores = async() => {
  try{
    const response = await resultApi.get("/")
    return response.data
  }catch(error){
    console.log(error)
  }
}

export const getScoreById = async(Id) => {
  try{
    const response =await resultApi.get("/{id}")
    return response.data
  }catch(error){
    console.log(error)
  }
}

export const getScoreBySubject = async(subject) => {
  try{
    const response =await resultApi.get("/{subject}")
    return response.data
  }catch(error){
    console.log(error)
  }
}