const Slack = require('slack-node')
const secretConfig = require("./secret.json")
const apiToken = secretConfig.API_TOKEN
const slack = new Slack(apiToken)

const sender = async(msg) => {
    slack.api(
        'chat.postMessage', 
        {
            username: 'Jarvis ( 알리미 )',
            text:msg,
            channel:'#general'
        }, 
        function(err, res){
            if(err){
                console.log(err)
                throw err
            }
            if(res.ok === true){
                console.log("noti success")
            }
        }
    )
}

module.exports = sender