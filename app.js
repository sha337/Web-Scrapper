const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('empData.csv');

//Write headers
writeStream.write(`Name,Department,Bio \n`);

//request to url from where data is to scrapped
request('https://www.qandle.com/our-team.html', (err, response, html) => {
    if(!err && response.statusCode == 200){
        //selects whole HTML of page and saves it in $
        const $ = cheerio.load(html);

        //Data that is to be scrapped
        let name = $('.profile_detail > p > strong');
        let department = $('.profile_detail > p:nth-of-type(2)');
        let description = $('.profile_detail_info > p > small');    
        
        for(var i=0;i<name.length;i++){
            let emp_name = (name[i].children[0].data);
            let emp_dept = (department[i].children[0].data);
            let emp_des = (description[i].children[0].data);
        
            //Write to CSV
            writeStream.write(`${emp_name}, ${emp_dept}, ${emp_des} \n`);
        }
        console.log("Scrapping Done"); 
    }

});