const inquirer = require('inquirer');
// const fs = require('fs');
// const generatePage = require('./src/page-template.js');


// console.log(profileDataArgs);

// const printProfileData = profileDataArr => {
//     for (let i = 0; i < profileDataArr.length; i++) {
//     console.log(profileDataArr[i]);
//     }
//   };
  
//   printProfileData(profileDataArgs);


// fs.writeFile('./index.html', generatePage(name, github), err => {
//     if (err) throw new Error(err);
  
//     console.log('Portfolio complete! Check out index.html to see the output!');
//   });

inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?'
        }
    ])
    .then(answers => console.log(answers));