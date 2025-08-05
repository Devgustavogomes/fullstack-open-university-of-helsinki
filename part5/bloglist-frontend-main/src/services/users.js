import axios from "axios";

const baseUrl = '/api/login'

const userLogin = async (username, password) =>{
    const user = {
        username: username,
        password: password
    }
    const response = await axios.post(baseUrl,user)
    return response.data
}

export default { userLogin }