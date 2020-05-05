const inquirer = require('inquirer');

const custom = require("custom-module");

//display search specified by user and
//allow user to select a search
const searchKeyword = async keyword => {
    try {
    const response = await custom.searchResults(keyword);
    
    const lengthToDisplay = await howManyToDisplay(response.length, keyword);
  
    const mappedResponse = modifyResponse(response, lengthToDisplay.num);
    
     //filter modifiedArr (contains all features)
    const filteredWithUuid = filterModifiedResponse(response, lengthToDisplay.num)
   
    //filter modifiedArr (only contains job title)
    const filteredArr = filterModifiedResponse(mappedResponse, lengthToDisplay.num)

    const selected = await getSelectedJob(filteredArr);
    
    //lastly display all the jogs associated with the Job Title
    const uuidSelected = await filteredWithUuid.filter(element => {
        if (selected.job[0] === element.suggestion) {
            return element;
        }
    });
    //fetch the specific job selected
    const fetchUuid = await custom.fetchSearch(uuidSelected[0].uuid);
  
    //tell user how many to display
    const lengthForFetch = await howManyToFetch(fetchUuid.related_job_titles.length, selected.job[0]);
    
    const displayFetchResults = fetchResults(fetchUuid.related_job_titles,lengthForFetch.num)
    // all done by displaying displayFetchResults (using a foreach)
    _print(displayFetchResults);

    
   }catch(error) {
        return error;
    }
};

const howManyToDisplay = async (length, keyword) => {
    //create an inquirer type prompt
    return inquirer.prompt([
        {
            type: 'number',
            name: 'num',
            message: `The number of jobs for keyword: ${keyword} is ${length}\n Enter number of jobs to view: `,

            // validate that the user picks less than 4 cards
            validate: num => {
                if (num < 0 || num > length) {
                    return 'The length must be between the given length';
                } else {
                    return true;
                }
            }
        }
    ]);
};

const modifyResponse = (response, length) => {
    return response.map((element,index) => {
        if (index < length) {
            return element.suggestion;
        }
    });
};

const filterModifiedResponse = (modifiedArr, length) => {
    return modifiedArr.filter((element, index) => {
        if (index < length) {
            return element;
        }
    });
};

const getSelectedJob = async filteredArr => {
    //create an inquirer checkbox prompt  
    return inquirer.prompt([
        {
            type: 'checkbox',
            name: 'job',
            message: "Select 1 Job",
            choices: filteredArr,
            // validate that the user picks less than 4 cards
            validate: job => {
                if (job.length > 1 || job.length == 0) {
                    return 'You must only choose 1 job to fetch';
                } else {
                    return true;
                }
            }
        }
    ]);
};

const _print = fetchArr => {
    fetchArr.forEach(element => {
        console.log(element.title);
    });
}

const fetchResults = (fetchResponse, length) => {
    //modify the content of the array by using map
    const arr = fetchResponse.map((element, index) => {
        if (index < length) {
            return {title: element.title};
        }
    });
    //filter out the related job titles based on how many to display
    return arr.filter((element, index) => {
        if (index < length) {
            return element;
        }
    });
};


const howManyToFetch = (length, keyword) => {
    //create an inquirer type prompt
    return inquirer.prompt([
        {
            type: 'number',
            name: 'num',
            message: `The number of jobs related with '${keyword}' is ${length}\n Enter number of jobs related with '${keyword}' to view: `,

            // validate that the user picks less than 4 cards
            validate: num => {
                if (num < 0 || num > length) {
                    return 'The length must be between the given length';
                } else {
                    return true;
                }
            }
        }
    ]);
};

//fetch detail by id (or some unique identifier)
//then display the fetched details cleanly

module.exports = {
    searchKeyword
}