/* =========================
   卡池資料
========================= */

const cardPools = {

    red: {
        pdf: "https://你的紅色卡池PDF連結.pdf",

        cards: [
            "images/red-01.png",
            "images/red-02.png",
            "images/red-03.png",
            "images/red-04.png",
            "images/red-05.png"
        ]
    },


    yellow: {
        pdf: "https://你的黃色卡池PDF連結.pdf",

        cards: [
            "images/yellow-01.png",
            "images/yellow-02.png",
            "images/yellow-03.png",
            "images/yellow-04.png",
            "images/yellow-05.png"
        ]
    },


    blue: {
        pdf: "https://你的藍色卡池PDF連結.pdf",

        cards: [
            "images/blue-01.png",
            "images/blue-02.png",
            "images/blue-03.png",
            "images/blue-04.png",
            "images/blue-05.png"
        ]
    },


    pink: {
        pdf: "https://你的粉紅色卡池PDF連結.pdf",

        cards: [
            "images/pink-01.png",
            "images/pink-02.png",
            "images/pink-03.png",
            "images/pink-04.png",
            "images/pink-05.png"
        ]
    }

};


/* =========================
   目前狀態
========================= */

let currentMood = null;

/*
    記錄目前這個卡池已經抽過哪些卡
*/
let usedCards = [];


/* =========================
   找到 HTML 元件
========================= */

const moodScreen =
    document.getElementById("mood-screen");

const cardScreen =
    document.getElementById("card-screen");

const card =
    document.getElementById("card");

const cardImage =
    document.getElementById("card-image");

const pdfLink =
    document.getElementById("pdf-link");

const flipHint =
    document.getElementById("flip-hint");

const drawAgain =
    document.getElementById("draw-again");

const changeMood =
    document.getElementById("change-mood");


/* =========================
   選擇心情
========================= */

document
    .querySelectorAll(".mood-button")
    .forEach(button => {

        button.addEventListener("click", () => {

            const mood =
                button.dataset.mood;

            startMood(mood);

        });

    });


/* =========================
   開始一個新的心情
========================= */

function startMood(mood) {

    currentMood = mood;

    /*
        換心情時，
        清空上一個卡池的抽卡紀錄
    */
    usedCards = [];

    moodScreen.classList.remove("active");

    cardScreen.classList.add("active");

    drawCard();

}


/* =========================
   抽卡
========================= */

function drawCard() {

    const pool =
        cardPools[currentMood];

    /*
        如果這組 5 張全部看過
    */

    if (usedCards.length >= pool.cards.length) {

        alert(
            "✨ 這組卡牌都看過啦！\n\n想換個心情再試試嗎？"
        );

        return;
    }


    /*
        找出還沒抽過的卡
    */

    const availableCards =
        pool.cards
            .map((card, index) => ({
                card,
                index
            }))
            .filter(item =>
                !usedCards.includes(item.index)
            );


    /*
        隨機選一張
    */

    const randomIndex =
        Math.floor(
            Math.random() * availableCards.length
        );


    const selected =
        availableCards[randomIndex];


    /*
        記錄這張已經抽過
    */

    usedCards.push(selected.index);


    /*
        如果上一張是翻面狀態，
        先翻回正面
    */

    card.classList.remove("flipped");


    /*
        換圖片
    */

    cardImage.src = selected.card;


    /*
        連結到這一組卡池的 PDF
    */

    pdfLink.href = pool.pdf;


    /*
        顯示翻牌提示
    */

    flipHint.style.display = "block";

}


/* =========================
   點卡牌 → 翻面
========================= */

card.addEventListener("click", () => {

    /*
        只有正面時才翻
    */

    if (!card.classList.contains("flipped")) {

        card.classList.add("flipped");

        flipHint.style.display = "none";

    }

});


/* =========================
   再抽一張
========================= */

drawAgain.addEventListener("click", (event) => {

    /*
        防止點按鈕時，
        觸發卡牌本身的 click
    */

    event.stopPropagation();

    drawCard();

});


/* =========================
   換個心情
========================= */

changeMood.addEventListener("click", (event) => {

    event.stopPropagation();

    /*
        回到心情選擇
    */

    cardScreen.classList.remove("active");

    moodScreen.classList.add("active");

    /*
        清除狀態
    */

    currentMood = null;

    usedCards = [];

});
