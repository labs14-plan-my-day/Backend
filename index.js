const server = require('./api/server.js');
const jwtCheck = require('./auth/jwtCheck')
const SlackBot = require('slackbots');
const axios = require('axios')


const bot = new SlackBot({
    token: 'xoxb-689980001927-686756441314-SBjtYiyWrluCl8ztb9RgVBfr',
    name: 'Plan My Day'

})

//start
bot.on('start', () => {
    var params = {
        icon_emoji: ':cat:'
    }
    bot.postMessageToChannel('general', "Hello i am PlanMyDayBot type tasks to see your schedule", params)
});

//error 
bot.on('error', (err) => console.log(err))

//message
bot.on('message', (data) => {
    if (data.type !== 'message') {
        return;
    }

    handleMessage(data.text);
})

function handleMessage(message) {
    if (message.includes('tasks')) {
        getTaskList()
    } else if (message.includes('help')){
        runHelp();
    }
}

function getTaskList() {
    axios.get('https://plan-my-dayapp.herokuapp.com/tasks/2')
        .then(res => {
            let tasks = res.data.tasks
            console.log(tasks)

            var params = {
                icon_emoji: ':cat:'
            }
            bot.postMessageToChannel('gneral', `These are your tasks ${tasks}`, params)
        })
        // .catch(err =>{
        //     res.send(err)
        // })
}

//Help 
function runHelp() {
    const params = {
        icon_emoji: ':question:'
    }

    bot.postMessageToChannel('general', `Type @planbot to get started`, params)
}


var port = process.env.PORT || 8080;


server.listen(port, () => console.log(`\nAPI running on port ${port}\n`));
