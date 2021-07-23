import fetch from 'node-fetch'

class Utility {
    /**
     * @description Utility function to make remote api call
     * @param {object} options 
     * @returns {object}
     */
    static async callApi(options) {
        try{
            const { url, method, headers, body = null } = options;
            const fetchOptions = { 
                method, 
                headers: { "Content-Type": "application/json", ...headers },
            }

            if(body){
                fetchOptions.body = JSON.stringify(body);
            }

            const response = await fetch(url, fetchOptions);
            const jsonResponse = await response.json();
            return jsonResponse;

        }catch(e){
            console.error('Failed to fulfill api call: ', e);
            throw (e)
        }
    }

    /**
     * @description Utility function to make remote api call and returns response header
     * together with the data
     * @param {object} options 
     * @returns {void}
     */
    static async callApiWithHeaderResponse(options) {
        try{
            const { url, method, headers, body = null } = options;
            const fetchOptions = { 
                method, 
                headers: { "Content-Type": "application/json", ...headers },
            }

            if(body){
                fetchOptions.body = JSON.stringify(body);
            }

            const response = await fetch(url, fetchOptions);
            const jsonResponse = await response.json();
            
            const result = {
                data: jsonResponse,
                headers: response.headers
            }

            return result;

        }catch(e){
            console.error('Failed to fulfill api call: ', e);
            throw (e)
        }
    }
};

export default Utility;
