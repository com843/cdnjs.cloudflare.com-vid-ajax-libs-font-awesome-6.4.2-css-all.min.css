let coins = localStorage.getItem("coins") ? parseInt(localStorage.getItem("coins")) : 0;
document.getElementById("coins").innerText = coins;

let rewarded = false;
let player;
let interval = null;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('video', {
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING && !interval) {
        rewarded = false;

        interval = setInterval(() => {
            if (player.getPlayerState() === YT.PlayerState.PLAYING) {
                coins++;
                localStorage.setItem("coins", coins);
                document.getElementById("coins").innerText = coins;
            }
        }, 4000);
    } else if (event.data !== YT.PlayerState.PLAYING) {
        clearInterval(interval);
        interval = null;  // Reset interval reference
    }
}
