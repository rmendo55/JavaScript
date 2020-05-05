const superagent = require('superagent');

//config file to hold the base URL 
const config = require('./config.json');

//creating the functions for search
const searchResults = async keyword => {
    const searchUrl = `${config.url}autocomplete?contains=${keyword}`;
    //http://api.dataatwork.org/v1/jobs/autocomplete?contains=teacher
    console.log(searchUrl);
    try{
    const searchResponse = await superagent.get(searchUrl);
    return searchResponse.body;
    }catch(error) {
        return error;
    }
};


//creating a function for fetching
const fetchSearch = async keyword_uuid => {
    const uuid_url = `${config.url}${keyword_uuid}/related_jobs`;
    try {
    const uuid_response = await superagent.get(uuid_url);
    return uuid_response.body;
    }catch(error) {
        return error;
    }
};

//Export a method for API search
//Export a method for API fetch
module.exports = {
    searchResults,
    fetchSearch
}
