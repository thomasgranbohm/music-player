<script context="module">
    export async function preload(page, session) {
        let { id } = page.query;
        return { id };
    }
</script>

<script>
    export let id = "spotify:track:6HZILIRieu8S0iqY8kIKhj";
    let token, deviceID;
    let readyToPlay = false;
    let playing = false;
    if (process.env.NODE_ENV != "developement") {
        window.onSpotifyWebPlaybackSDKReady = async () => {
            // You can now initialize Spotify.Player and use the SDK
            console.log(id);
            let resp = await fetch("/api/getAccessToken", {
                credentials: "same-origin"
            });
            token = await resp.text();
            const player = new Spotify.Player({
                name: "Music Player on Yommail",
                getOAuthToken: cb => {
                    cb(token);
                }
            });

            // Error handling
            player.addListener("initialization_error", ({ message }) => {
                console.error("initialization_error", message);
            });
            player.addListener("authentication_error", ({ message }) => {
                console.error("authentication_error", message);
            });
            player.addListener("account_error", ({ message }) => {
                console.error("account_error", message);
            });
            player.addListener("playback_error", ({ message }) => {
                console.error("playback_error", message);
            });

            // Playback status updates
            player.addListener("player_state_changed", state => {
                console.log("Player state changed: %O", state);
            });

            // Ready
            player.addListener("ready", ({ device_id }) => {
                console.log("Ready with Device ID", device_id);
                deviceID = device_id;
                readyToPlay = true;
            });

            // Not Ready
            player.addListener("not_ready", ({ device_id }) => {
                console.log("Device ID has gone offline", device_id);
                deviceID = device_id;
            });

            // Connect to the player!
            player.connect();
        };
    }
    $: console.log("ID: %s", id);
    $: if (readyToPlay && !playing) {
        console.log(id);
        fetch(
            `https://api.spotify.com/v1/me/player/play?device_id=${deviceID}`,
            {
                method: "PUT",
                body: JSON.stringify({ uris: [id] }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
        ).then(async res => {
            let body = await res.text();
            console.log(body);
        });
        playing = true;
        const AudioContext = window.AudioContext || window.webkitAudioContext;

        const audioContext = new AudioContext();
    }
</script>

<svelte:head>
    <script src="/scripts/spotify-player.js">

    </script>
</svelte:head>
