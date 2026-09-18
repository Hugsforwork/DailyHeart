// ==================================================
// 療癒卡資料
// ==================================================

const cardPools = {

    // ------------------------------------------
    // 紅色／躁動
    // ------------------------------------------

    mood01: {

        // 之後把這裡換成紅色這組卡牌的 PDF 連結
        pdf: "你的PDF連結1",

        // 紅色卡背
        back: "images/back-red.png",

        // 紅色 4 張卡
        cards: [
            "images/card-red-01.png",
            "images/card-red-02.png",
            "images/card-red-03.png",
            "images/card-red-04.png"
        ]
    },


    // ------------------------------------------
    // 黃色／無聊
    // ------------------------------------------

    mood02: {

        // 之後把這裡換成黃色這組卡牌的 PDF 連結
        pdf: "你的PDF連結2",

        // 黃色卡背
        back: "images/back-yellow.png",

        // 黃色 4 張卡
        cards: [
            "images/card-yellow-05.png",
            "images/card-yellow-06.png",
            "images/card-yellow-07.png",
            "images/card-yellow-08.png"
        ]
    },


    // ------------------------------------------
    // 藍色／疲累
    // ------------------------------------------

    mood03: {

        // 之後把這裡換成藍色這組卡牌的 PDF 連結
        pdf: "你的PDF連結3",

        // 藍色卡背
        back: "images/back-blue.png",

        // 藍色 4 張卡
        cards: [
            "images/card-blue-09.png",
            "images/card-blue-10.png",
            "images/card-blue-11.png",
            "images/card-blue-12.png"
        ]
    },


    // ------------------------------------------
    // 粉色／難過
    // ------------------------------------------

    mood04: {

        // 之後把這裡換成粉色這組卡牌的 PDF 連結
        pdf: "你的PDF連結4",

        // 粉色卡背
        back: "images/back-pink.png",

        // 粉色 4 張卡
        cards: [
            "images/card-pink-13.png",
            "images/card-pink-14.png",
            "images/card-pink-15.png",
            "images/card-pink-16.png"
        ]
    }

};


// ==================================================
// 目前遊戲狀態
// ==================================================

let currentMood = null;

// 紀錄目前這組已經抽過哪些卡
let usedCards = [];


// ==================================================
// 取得 HTML 元件
// ==================================================

const moodScreen = document.getElementById("mood-screen");

const cardScreen = document.getElementById("card-screen");

const card = document.getElementById("card");

const cardImage = document.getElementById("card-image");

const cardBackImage =
    document.getElementById("card-back-image");

const pdfLink =
    document.getElementById("pdf-link");

const drawAgain =
    document.getElementById("draw-again");

const changeMood =
    document.getElementById("change-mood");

const cardBack =
    document.querySelector(".card-back");


// ==================================================
// 4 個心情按鈕
// ==================================================

document
    .querySelectorAll(".mood-button")
    .forEach(button => {

        button.addEventListener("click", () => {

            const mood =
                button.dataset.mood;

            startMood(mood);

        });

    });


// ==================================================
// 開始一組新的心情
// ==================================================

function startMood(mood) {

    currentMood = mood;

    // 換新的心情時，
    // 重新開始計算這組看過哪些卡
    usedCards = [];

    // 切換畫面
    moodScreen.classList.remove("active");

    cardScreen.classList.add("active");

    // 抽第一張卡
    drawCard();

}


// ==================================================
// 抽卡
// ==================================================

function drawCard() {

    const pool =
        cardPools[currentMood];

    if (!pool) {
        return;
    }


    // 找出還沒有抽過的卡片
    const availableCards =
        pool.cards
            .map((image, index) => ({
                image: image,
                index: index
            }))
            .filter(item =>
                !usedCards.includes(item.index)
            );


    // ------------------------------------------
    // 4 張全部看過
    // ------------------------------------------

    if (availableCards.length === 0) {

        alert(
            "這組療癒卡都看過啦！\n\n可以換個心情，再試試看 🌿"
        );

        return;
    }


    // ------------------------------------------
    // 隨機抽一張
    // ------------------------------------------

    const randomIndex =
        Math.floor(
            Math.random() * availableCards.length
        );

    const selected =
        availableCards[randomIndex];


    // 記錄這張卡已經看過
    usedCards.push(selected.index);


    // 確保顯示新卡時回到正面
    card.classList.remove("flipped");


    // 放入卡片正面
    cardImage.src =
        selected.image;


    // 放入目前心情對應的卡背
    cardBackImage.src =
        pool.back;


    // 放入目前心情對應的完整卡牌 PDF
    pdfLink.href =
        pool.pdf;

}


// ==================================================
// 點擊卡片正面 → 翻到背面
// ==================================================

card.addEventListener("click", event => {

    // 只有目前在正面時才翻面
    if (!card.classList.contains("flipped")) {

        card.classList.add("flipped");

    }

});


// ==================================================
// 點擊卡片背面空白處 → 翻回正面
// ==================================================

cardBack.addEventListener("click", event => {

    // 如果點到 PDF 或按鈕，就不要翻回正面
    if (event.target.closest("a, button")) {
        return;
    }

    // 其他任何地方都可以翻回原本的卡片正面
    card.classList.remove("flipped");

});


// ==================================================
// PDF 按鈕
// ==================================================

pdfLink.addEventListener("click", event => {

    // 防止觸發卡片翻面
    event.stopPropagation();

});


// ==================================================
// 再抽一張
// ==================================================

drawAgain.addEventListener("click", event => {

    // 防止觸發卡片翻面
    event.stopPropagation();

    // 留在目前心情，再抽一張
    drawCard();

});


// ==================================================
// 換個心情
// ==================================================

changeMood.addEventListener("click", event => {

    // 防止觸發卡片翻面
    event.stopPropagation();


    // 回到心情選擇畫面
    cardScreen.classList.remove("active");

    moodScreen.classList.add("active");


    // 清除目前狀態
    currentMood = null;

    usedCards = [];

});

