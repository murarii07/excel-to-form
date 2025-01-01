//create a test cases here
const axios = require('axios')
// jest.mock('axios')
describe("Authentication", () => {
    test('user Registration', async () => {
        const r = await axios.post("http://localhost:5000/Register", {
            username: "Suresh1" + Math.random(),
            email: "abhay121@gmail.com",
            password: "111111"


        })
        expect(r.data.success).toBe(true)
    })
})
