const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('tjrPost.csv');

//Write headers
writeStream.write(`title,imageUrl,description,author \n`);

//request to url from where data is to scrapped
request('https://tjrexpress.com/2020/02/23/wall-of-inequality/', (err, response, html) => {
    if(!err && response.statusCode == 200){
        //selects whole HTML of page and saves it in $
        const $ = cheerio.load(html);
        
        //Data that is to be scrapped
        let title = $('.entry-title').text();
        let imageUrl = $('.post-thumbnail > a > img').attr("src");
        let description = $('<div>').append($('.entry-content > p:not(:last-of-type)').clone()).html();   
        let author = $('.entry-content > p:last-of-type');
        description = description.replace(/,/g,';');
        // for(var i=0;i<name.length;i++){
        //     let emp_name = (name[i].children[0].data);
        //     let emp_dept = (department[i].children[0].data);
        //     let emp_des = (description[i].children[0].data);
        
        //     //Write to CSV
        //     writeStream.write(`${emp_name}, ${emp_dept}, ${emp_des} \n`);
        // }
        //Write to CSV
        writeStream.write(`${title}, ${imageUrl}, ${description}, ${author} \n`);
        console.log("Scrapping Done"); 
    }

});