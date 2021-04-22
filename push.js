
const webPush = require("web-push");

const vapidKeys = {
    "publicKey":"BJG-cL0Jdo48_D0fq66G9M0efw0lcUlD0LpW0Mvz0LVMy33LS_UoaqNp5sdjWMhoJF83XnXs0o-QM6nzybHVM38",
    "privateKey": "M3CC4KV7Y6w70BXIJP4dqnGH16ZhZTOZKVoPlsAfV0c"
};

webPush.setVapidDetails(
    "mailto:nazhifalfarizi75@gmail.com",
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

const pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/d_ivIVWljks:APA91bF7BnNVyh8ZAergtioML_2T1m2A3kQ1YCrBfwf-OaesQ2fMTyR0kJUGZglbQhcfnDP6fvyE6yeI4-cE9QH-VCi7Dyv28rKC8Zpw9HbliPsFGKfFRFVygd1icY_XpG-nrT6OOXNP",
    "keys": {
        "p256dh": "BEL9IIMAEGCDNmA4g0qpKZkbZNTKH0y+vT0RL2U1e14UxUK+tFYLHvBc/X44ZFeE1YD8JJeHelMdXKeegyfnkcY=",
        "auth": "7s/8FAwjNw439FtDM9FSHw=="
    }
};

const payLoad = "Congrats, now you can receive push notification payload!";

const options = {
    gcmAPIKey: "535144270973",
    TTL: 60
}

webPush.sendNotification(
    pushSubscription,
    payLoad,
    options
);