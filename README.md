# Running this app locally

1. `npm install`

2. Create a .env file and add REACT_APP_API_KEY to the file. Insert your own API key which you can get from [Alpha Vantage](https://www.alphavantage.co/).

3. `npm run start`

# Thoughts on API keys

Although my .env file with the API_KEY for accessing alphavantage data is gitignored, the API key is still accessible to people using the app since it is loaded during build time. My first thought was to store the API key in the backend and only expose some of the alphavantage routes via the express API, but the instructions for the app said the API should only have a single route which returns "hello world", thus that didn't seem like an option.

Given that the API key is one I got for free and is very limited in the amount of data it can query, I don't really see this as a big security flaw. But on a production system I don't think this build pattern would be good practice.
