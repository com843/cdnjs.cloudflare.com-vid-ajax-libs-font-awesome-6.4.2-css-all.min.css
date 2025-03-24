 let coins = localStorage.getItem("coins") ? parseInt(localStorage.getItem("coins")) : 0;
        document.getElementById("coins").innerText = coins;

        let player;
        let interval = null;  // ✅ Global scope me declare kiya

        function onYouTubeIframeAPIReady() {
            player = new YT.Player('video', {
                height: '360',
                width: '640',
                videoId: 'YOUR_VIDEO_ID',  // ✅ Yahan apna video ID dalna
                events: {
                    'onStateChange': onPlayerStateChange
                }
            });
        }

        function onPlayerStateChange(event) {
            console.log("Player State Changed:", event.data); // Debugging ke liye

            if (event.data === YT.PlayerState.PLAYING && interval === null) { 
                console.log("Video Playing... Coins Increment Start!");

                interval = setInterval(() => {
                    if (player.getPlayerState() === YT.PlayerState.PLAYING) {
                        coins++;
                        localStorage.setItem("coins", coins);
                        document.getElementById("coins").innerText = coins;
                        console.log("Coins Added:", coins);
                    }
                }, 4000);
            } else if (event.data !== YT.PlayerState.PLAYING) {
                console.log("Video Stopped or Paused... Coins Increment Stop!");
                clearInterval(interval);
                interval = null;
            }
        }
