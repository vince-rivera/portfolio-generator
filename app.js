const inquirer = require('inquirer');
const fs = require('fs');
const generatePage = require('./src/page-template');

const mockData = {
    name: 'Vincent',
    'GitHub username': 'vince-rivera',
    confirmAbout: true,
    about: 'sTUFF',
    projects: [
      {
        'Project name': 'Run-Buddy',
        'Project description': 'ligma',
        languages: [Array],
        'Project GitHub link': 'vince-rivera/run-buddy',
        feature: true,
        confirmAddProject: false
      }
    ]
  }
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

const promptUser = () => {
return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name? (Required)',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'GitHub username',
            message: 'Enter your Github Username (Required)',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About" section?',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:',
            when: ({ confirmAbout }) => {
                if (confirmAbout) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:'
        },
       
    ])
}

    const promptProject = portfolioData => {
        //if no 'projects' array create one
        if (!portfolioData.projects) {
            portfolioData.projects = [];
          }
        console.log(`
      =================
      Add a New Project
      =================
      `);
        return inquirer.prompt([
          {
            type: 'input',
            name: 'Project name',
            message: 'What is the name of your project? (Required)',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter the name of your project!');
                    return false;
                }
            }
          },
          {
            type: 'input',
            name: 'Project description',
            message: 'Provide a description of the project (Required)',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter a description of your project!');
                    return false;
                }
            }
          },
          {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
          },
          {
            type: 'input',
            name: 'Project GitHub link',
            message: 'Enter the GitHub link to your project. (Required)',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter the GitHub link!');
                    return false;
                }
            }
          },
          {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
          },
          {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
          }
        ])
        .then(projectData => {
            portfolioData.projects.push(projectData);
            if (projectData.confirmAddProject) {
              return promptProject(portfolioData);
            } else {
              return portfolioData;
            }
          });
      };
      promptUser()
        .then(promptProject)
        .then(portfolioData => {
            const pageHTML = generatePage(mockData);

            fs.writeFile('./index.html', pageHTML, err => {
            if (err) throw new Error(err);

            console.log('Page created! Check out index.html in this directory to see it!');
        });
    });