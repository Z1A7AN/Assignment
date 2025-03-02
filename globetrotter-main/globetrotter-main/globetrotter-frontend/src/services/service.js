import axios from "../utils/axios";

class Service {
    async getRandomDestination() {
        try {
            const res = await axios.get("/destinations/random");
            if(res) {
                return res.data;
            }
        } catch (error) {
            throw error;
        }
    } 

    async validateAnswer(token, answer) {
        try {
            const res = await axios.post("/destinations/validate", {
                token,
                answer
            });
            if(res) {
                return res.data;
            }
        } catch (error) {
            throw error;
        }
    }

    async registerUser(username, score=0) {
        try {
            const res = await axios.post("/users", {
                username,
                score
            })
            if(res) {
                return res.data;
            }
        } catch (error) {
            throw error;
        }
    }

    async getUser(username) {
        try {
            const res = await axios.get(`/users/${username}`);
            if(res) {
                return res.data;
            }
        } catch (error) {
            throw error;
        }
    }
}

const service = new Service();
export default service;