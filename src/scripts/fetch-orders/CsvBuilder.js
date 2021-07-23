import { parse as json2csv } from 'json2csv';
import path from 'path';
import fs from 'fs';

class CsvBuilder {
    constructor(params) {
        this.params = params;
        this.newlineSeparator = params.newlineSeparator;
        this.fileName = params.fileName;
        this.fields = params.fields;
    }

    /**
     * @description Appends the given array to an existing csv file or creates a new one
     * @param {array} data 
     */
    write( data ) {
        try{
            // output file in the same folder
            const filename = path.join(__dirname, 'CSV', `${this.fileName}`);
            this.filePath = filename;

            let rows;
            // If file doesn't exist, we will create new file and add rows with headers.    
            if (!fs.existsSync(filename)) {
                rows = json2csv(data, { header: true, fields: this.fields });
            } else {
                // Rows without headers.
                rows = json2csv(data, { header: false });
            }
            
            // Append file function can create new file too.
            fs.appendFileSync(filename, rows);

            // Always add new line if file already exists.
            fs.appendFileSync(filename, "\r\n");
        }catch(e) {
            console.log('Failed to write json to csv: ', e);
            throw (e)
        }  
    }
}

export default CsvBuilder;
