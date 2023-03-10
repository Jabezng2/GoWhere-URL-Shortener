const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const charsLength = chars.length; //Cache the length of chars outside loop
function generateShortUrl() {
    let shortUrl = '';
    for(let i = 0; i < 8; i++) {
        shortUrl += chars[Math.floor(Math.random()*charsLength)];
    }
    return shortUrl;
}

function validateUrl(value) {

    var urlPattern = new RegExp(
        "^(https?:\\/\\/)?" + // validate protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
        "(\\#[-a-z\\d_]*)?$",
        "i"
    );
  return !!urlPattern.test(value);
}

module.exports = { generateShortUrl, validateUrl };
