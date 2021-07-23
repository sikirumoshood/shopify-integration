class LinkProcessor {
    constructor(params){
        this.params = params;
        this.headers = params.headers;
    }

    /**
     * @description Extracts the link for pagination from shopify response
     * headers if it exists
     * @returns {string|null}
     */
    get paginationLink() {
        const link = this.headers.get('link');
        if(link){
            return link;
        }
        return null;
    }

    /**
     * @description Extracts url from a link 
     * @example <https://latudestore.myshopify.com/admin/api/2021-07/orders.json?limit=20&page_info=eyJkaXJlY3Rpb24iOiJwcmV2Iiwib3JkZXIiOiJjcmVhdGVkX2F0IGFzYyIsInN0YXR1cyI6ImFueSIsImxhc3RfaWQiOjM5NTg0NzYyNzU4NjQsImxhc3RfdmFsdWUiOiIyMDIxLTA3LTIyIDA4OjQ0OjQ4LjYxMzM0MCJ9>
     * @param {string} linkText 
     * @returns 
     */
    extractUrlFrom(linkText) {
        const startIndex = linkText.indexOf('<');
        const endIndex = linkText.indexOf('>');

        if(startIndex === -1){
            return null;
        }

        const url = linkText.substring(startIndex + 1, endIndex);
        return url;
    }

    /**
     * @description Extracts the link rel value as the action, usually "next" or "previous"
     * @example <https://latudestore.myshopify.com/admin/api/2021-07/orders.json?limit=20&page_info=eyJkaXJlY3Rpb24iOiJwcmV2Iiwib3JkZXIiOiJjcmVhdGVkX2F0IGFzYyIsInN0YXR1cyI6ImFueSIsImxhc3RfaWQiOjM5NTg0NzYyNzU4NjQsImxhc3RfdmFsdWUiOiIyMDIxLTA3LTIyIDA4OjQ0OjQ4LjYxMzM0MCJ9>; rel="previous"
     * @param {string} linkText 
     * @returns {string}
     */
    extractCursorAction(linkText) {
        const cursorText = linkText.split(';')[1];
        const cursorActionWithQuotes =  cursorText.split('rel=')[1];
        // Remove surrounding quotes ""
        const cursorAction = cursorActionWithQuotes.substring(1, cursorActionWithQuotes.length - 1);
        return cursorAction;
    }

    /**
     * @description Builds the pagination information
     * @example { next:'https://latudestore.myshopify.com/admin/api/2021-07/orders.json?limit=20&page_info=eyJkaXJlY3Rpb24iOiJuZXh0Iiwib3JkZXIiOiJjcmVhdGVkX2F0IGFzYyIsInN0YXR1cyI6ImFueSIsImxhc3RfaWQiOjM5NTg0ODI0NjkwMTYsImxhc3RfdmFsdWUiOiIyMDIxLTA3LTIyIDA4OjUyOjU1LjAzMjE5NSJ9', previous:'https://latudestore.myshopify.com/admin/api/2021-07/orders.json?limit=20&page_info=eyJkaXJlY3Rpb24iOiJwcmV2Iiwib3JkZXIiOiJjcmVhdGVkX2F0IGFzYyIsInN0YXR1cyI6ImFueSIsImxhc3RfaWQiOjM5NTg0NzYyNzU4NjQsImxhc3RfdmFsdWUiOiIyMDIxLTA3LTIyIDA4OjQ0OjQ4LjYxMzM0MCJ9' }
     * @returns {object}
     */
    getPaginationUrls() {
        const paginationUrls = {
            next: null,
            previous: null
        }

        const linkText = this.paginationLink;

        if(!linkText){
            return paginationUrls;
        }

        for(const link of linkText.split(',')){
            const action = this.extractCursorAction(link);
            const url = this.extractUrlFrom(link);
            paginationUrls[action] = url;
        }

        return paginationUrls;
    }

};

export default LinkProcessor;
