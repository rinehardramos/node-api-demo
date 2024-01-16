describe('User Registration Test Suite', () => {
    // const req = httpMocks.createRequest({
    
    // });
    function createUser(payload: any){
        // mock db query to user_tb
        function queryUser(payload: any){
            if (payload.email === "admin@demo.com") {
                return "admin@demo.com";
            } else {
                return "";
            }
            
        }

        const userInfo = queryUser(payload);

        if (userInfo) {
            // send 409 status if user already exists
            return true;
        } else {
            //const password = await encryptPassword(password);
            return false;
            // mock db calls here
        };
    }
    // const res = httpMocks.createResponse();
    it('Check if User Exists Test Case', () => {
        const payload = { 
            first_name: "",
            last_name: "",
            birthdate: "",
            email: "admin@demo.com",
            password: "",
            user_role_id: "",
            user_status_id: "",
        }
        const result = createUser(payload)
        expect(result).toEqual(true);
    });
    it('Check if User Does Not Exist Test Case', () => {
        const payload = { 
            first_name: "",
            last_name: "",
            birthdate: "",
            email: "admin@demo.com",
            password: "",
            user_role_id: "",
            user_status_id: "",
        }
        const result = createUser(payload)
        expect(result).toEqual(false);
    });     
});