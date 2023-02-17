# TFG - University Tournaments

## Author
Eloy Alfredo Schmidt Rodríguez

## Description
This app borns as a final degree project. The basic objective is to provide an enviroment where the different Universities and not only Universities, everyone who wants to create a tournament for a competition could do it whith only a few steps.

This Web App provides the posibility to create tounaments for a lot of games such as League of Legends, Valorant, Pokemon,etc. The frontend of the WebAPP was build in React.js. This frontend obtain the information from the API REST that is under it. The API REST has different end points for different aspects such as the players statistics, its competitions and other relevant data. The API also provides an end point for the reporting data.

All the information, statistics is storage in a MongoDB database in the cloud, but this DB is not the only one providing the App with data. Some of the games have their own API end points, the APP obtain the data, select the most relevant, process it, and store it in the MongoDB database for an easiest and faster access without having to resend a petition to another API every time you search for a match or a player information.  

## Documentation
The documentation of the whole App its writen like documentation as code:  
- Web APP Documentation
- API REST Documentation
- Reporting Documentation
