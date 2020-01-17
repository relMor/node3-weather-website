const request = require('request')

const forecast = (lat, long, callback) =>{
    const url = 'https://api.darksky.net/forecast/b439ce43aa32690cd65bd679940d0c9d/'+lat+ ',' +long
    request({ url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else{
            callback(undefined, body.daily.data[0].summary+ " It is currently "+body.currently.temperature+" dergrees out. There is a "+body.currently.precipProbability+"% chance of rain.")
        }
    })
}

module.exports = forecast