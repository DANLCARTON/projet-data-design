let data;
let dataArray = []
let sortedData = {};
let tweetsCount;
let categories = ["Global warming\nis not happening", "Human Greenhouse Gases\nare not causing\nglobal warming", "Climate impacts\nare not bad", "Climate solutions\nwon't work", "Climate movement or\nscience is\nunreliable"];
let sousCat1 = ["1_1  • Ice isn't melting →", "1_2 • Heading into ice age →", "1_3 • Wheather is cold →", "1_4 • Hiatus in warming", "1_6 • Sea levels are exaggerated", "1_7 • Extremes are not increasing →"];
let sousCat2 = ["2_1 • It's natural cycles →", "2_3 • No evidence for Greenhouse Effect →"]
let sousCat3 = ["3_1 • Sensitivity is low →", "3_2 • No species impact →", "3_3 • Not a pollutant →"]
let sousCat4 = ["4_1 • Policies are harmful →", "4_2 • Policies are ineffective →", "4_4 • Clean energy won't work →", "4_5 • We need energy →"]
let sousCat5 = ["5_1 • Science is unlieliable →", "5_2 • Movement is unreliable →"]
let sousCatTexts = [sousCat1, sousCat2, sousCat3, sousCat4, sousCat5]

let width = 1080;
let height = 20000;

function preload() {
    // Get the most recent earthquake in the database
    let url = "./tweetszkm_202203.json";
    data = loadJSON(url);
    fontRegular = loadFont('assets/fonts/AzeretMono-Regular.ttf');
    fontBlack = loadFont("./assets/fonts/AzeretMono-Black.ttf")
}

function sortAuthors() {
    let counts = {}
    dataArray.map(tweet => {
        const author = tweet.author
        if (counts[author]) counts[author]++
            else counts[author] = 1
    })
    let result = Object.keys(counts).map(author => ({
        name: author,
        quantity: counts[author]
    })).sort((a, b) => b.quantity - a.quantity)
    return result
}

function sortHashtags() {
    let counts = {}
    dataArray.map(tweet => {
        const text = tweet.text
        const hashtags = text.match(/#\w+/g)
        if (hashtags) {
            hashtags.map(hashtag => {
                if (counts[hashtag]) counts[hashtag]++
                    else counts[hashtag] = 1
            })
        }
    })
    let result = Object.keys(counts).map(hashtag => ({
        name: hashtag,
        quantity: counts[hashtag]
    })).sort((a, b) => b.quantity - a.quantity)
    return result
}

function setup() {
    createCanvas(width, height);
    for (let i in data) {
        dataArray.push(data[i])
    }
    console.log(sortAuthors())
    console.log(sortHashtags())
}

let legendNbTweets = "NOMBRE DE TWEETS ↓"
let cats = ["1", "2", "3", "4", "5"]
let legendSize = 18;
let catSize = 72;

function draw() {

    smooth(1);
    background(255, 0);
    strokeWeight(6);
    textFont(fontRegular)
    strokeCap(ROUND);
    textAlign(CENTER);
    textSize(catSize);
    textFont(fontBlack)

    for (let i = 0; i < 5; i++) {
        let n = map(sortCat()[i + 1].quantity, 0, 300, 400, height);
        line(width / 6 * (i + 1), 400, width / 6 * (i + 1), n);
        textSize(catSize);
        textFont(fontBlack)
        text("CATEGORIES", 540, 150)
        for (let l = 0; l < cats[i].length; l++) text(cats[i][l], width / 6 * (i + 1), l * catSize + 290)
        textFont(fontRegular)
        textSize(12);
        text(categories[i], width / 6 * (i + 1), 330)

        let y = 0
        let varText = 0;
        for (let j = 0; j < 6; j++) {
            if (sortSousCat()[i + 1][j]) {
                m = map(sortSousCat()[i + 1][j].quantity, 0, 300, 400, height)

                push()
                textAlign(LEFT)
                if (y == 0) translate(width / 6 * (i + 1) + 10, 400)
                else translate(width / 6 * (i + 1) + 10, y + 15)
                rotate(PI / 2)
                text(sousCatTexts[i][varText], 0, 0)
                pop()
                y += m
                if (y < n) {
                    line(width / 6 * (i + 1) - 10, y, width / 6 * (i + 1) + 10, y)
                }
                varText++;
            }
        }
    }

    textFont(fontRegular)
    textSize(legendSize);
    for (let i = 10; i < 300; i += 10) { // axe nombre de tweets
        let n = map(i, 0, 300, 400, height);
        line(0, n, 20, n)
        textAlign(LEFT);
        text(i, 40, n + 5);
    }

    textSize(legendSize);
    textAlign(CENTER);
    for (let l = 0; l < legendNbTweets.length; l++) {
        text(legendNbTweets[l], 20, (l * legendSize) + 700);
    }

    const titre = "280 to ZERO"

    textSize(catSize)
    textFont(fontBlack)
    textAlign(LEFT);
    text(titre, 50, height - 500)
    noLoop()
}