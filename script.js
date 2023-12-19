let data;
let dataArray = []
let sortedData = {};
let tweetsCount;
let categories = ["Global warming\nis not happening", "Human Greenhouse Gases\nare not causing\nglobal warming", "Climate impacts\nare not bad", "Climate solutions\nwon't work", "Climate movement or\nscience is\nunreliable"];
// let categories2 = ["Global warming is not happening >>>", "Human Greenhouse Gases are not causing global warming >>>", "Climate impacts are not bad >>>", "Climate solutions won't work >>>", "Climate movement/scienceis unreliable >>>"];

let width = 1080;
let height = 30000;

function preload() {
    // Get the most recent earthquake in the database
    let url = "./tweetszkm_202203.json";
    data = loadJSON(url);
    fontRegular = loadFont('assets/fonts/AzeretMono-Regular.ttf');
    fontBlack = loadFont("./assets/fonts/AzeretMono-Black.ttf")
}

function countTweetsInCategory(category) {
    let count = 0;

    // Check if the segment exists in sortedData
    if (sortedData[segment]) {
        // Count tweets in the current segment
        count += Object.keys(sortedData[segment]).length;

        // Iterate through subsegments (if any) and recursively count tweets
        Object.keys(sortedData[segment]).forEach(subsegment => {
            count += countTweetsInSegment(subsegment);
        });
    }

    return count;
}


function sortData() {
    // Iterate through the JSON data array
    dataArray.forEach(item => {
        const category = item.category || "0_0"; // If category is missing, use "0_0"
        const categoryIdParts = category.split('_');
        const outerKey = categoryIdParts[0];
        const innerKey = categoryIdParts.join('_');

        // Initialize the outer category if it doesn't exist
        if (!sortedData[outerKey]) {
            sortedData[outerKey] = {};
        }

        // Initialize the inner category if it doesn't exist
        if (!sortedData[outerKey][innerKey]) {
            sortedData[outerKey][innerKey] = {};
        }

        // Assign the item to the inner category
        sortedData[outerKey][innerKey][item.id] = item;
    });

    console.log(sortedData);
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

function sortCat() {
    let counts = {}
    dataArray.map(tweet => {
        if (tweet.category != undefined) {
            // const cat = tweet.category
            const cat = tweet.category.slice(0, 1)
            if (counts[cat]) counts[cat]++
                else counts[cat] = 1
        } else {
            counts[0]++
        }
    })
    let result = Object.keys(counts).map(cat => ({
        name: cat,
        quantity: counts[cat]
    }))
    return result
}

function sortSousCat() {
    let counts = {}
    dataArray.map(tweet => {
        if (tweet.category != undefined) {
            const cat = tweet.category
            // const cat = tweet.category.slice(0, 1)
            if (counts[cat]) counts[cat]++
                else counts[cat] = 1
        } else {
            counts[0]++
        }
    })
    let result = Object.keys(counts).map(cat => ({
        name: cat,
        quantity: counts[cat]
    })).sort((a, b) => a.name.localeCompare(b.name))
    return result
}

function setup() {
    createCanvas(width, height);
    for (let i in data) {
        dataArray.push(data[i])
    }
    console.log(sortData())
    console.log(sortAuthors())
    console.log(sortHashtags())
    console.log(sortCat())
    console.log(sortSousCat())
}

let legendNbTweets = "NOMBRE DE TWEETS ↓"
let cats = ["1", "2", "3", "4", "5"]
// let cats = ["CATEGORY1", "CATEGORY2", "CATEGORY3", "CATEGORY4", "CATEGORY5"]
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
        for (let l = 0; l < cats[i].length; l++) text(cats[i][l], width / 6 * (i+1), l*catSize+290)
        textFont(fontRegular)
        textSize(12);
        text(categories[i], width / 6 * (i+1), 330)
        // push()
        //     textAlign(LEFT)
        //     translate(width / 6 * (i+1)+10, 425);
        //     rotate(PI/2)
        //     text(categories2[i], 0, 0)
        // pop()
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

    // souscat[i+"_"+j]

    noLoop()
}