var client_id = "19e6247f9dbc465ea843ec067d08622c";
var redirect_uri = "http://localhost:3000";

var state = "gigih-week1";

localStorage.setItem("TOKEN", state);
var scope = "playlist-modify-private user-read-private";

var url = "https://accounts.spotify.com/authorize";
url += "?response_type=token";
url += "&client_id=" + encodeURIComponent(client_id);
url += "&scope=" + encodeURIComponent(scope);
url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
url += "&state=" + encodeURIComponent(state);

export default url;