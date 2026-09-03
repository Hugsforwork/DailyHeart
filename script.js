/* =========================
   DailyHeart
   卡池資料
========================= */

const cardPools = {

    mood01: {
        pdf: "https://你的PDF連結1",
        cards: [
            "images/card-01.png",
            "images/card-02.png",
            "images/card-03.png",
            "images/card-04.png",
            "images/card-05.png"
        ]
    },

    mood02: {
        pdf: "https://你的PDF連結2",
        cards: [
            "images/card-06.png",
            "images/card-07.png",
            "images/card-08.png",
            "images/card-09.png",
            "images/card-10.png"
        ]
    },

    mood03: {
        pdf: "https://你的PDF連結3",
        cards: [
            "images/card-11.png",
            "images/card-12.png",
            "images/card-13.png",
            "images/card-14.png",
            "images/card-15.png"
        ]
    },

    mood04: {
        pdf: "https://你的PDF連結4",
        cards: [
            "images/card-16.png",
            "images/card-17.png",
            "images/card-18.png",
            "images/card-19.png",
            "images/card-20.png"
        ]
    }

};


/* =========================
   目前狀態
========================= */

let currentMood = null;

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
   心情選擇
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
   開始抽卡
========================= */

function startMood(mood) {

    currentMood = mood;

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

    const availableCards =
        pool.cards
            .map((image, index) => ({
                image,
                index
            }))
            .filter(item =>
                !usedCards.includes(item.index)
            );


    /* 五張都抽過 */

    if (availableCards.length === 0) {

        alert(
            "這組療癒卡都看過啦！\n\n可以換個心情再試試 🌿"
        );

        return;
    }


    /* 隨機抽一張 */

    const random =
        Math.floor(
            Math.random() *
            availableCards.length
        );


    const selected =
        availableCards[random];


    usedCards.push(selected.index);


    /* 翻回正面 */

    card.classList.remove("flipped");


    /* 顯示卡牌 */

    cardImage.src =
        selected.image;


    /* PDF */

    pdfLink.href =
        pool.pdf;


    /* 顯示提示 */

    flipHint.style.display =
        "block";
}


/* =========================
   點卡牌翻面
========================= */

card.addEventListener("click", () => {

    if (
        !card.classList.contains("flipped")
    ) {

        card.classList.add("flipped");

        flipHint.style.display =
            "none";
    }

});


/* =========================
   再抽一張
========================= */

drawAgain.addEventListener(
    "click",
    event => {

        event.stopPropagation();

        drawCard();

    }
);


/* =========================
   換個心情
========================= */

changeMood.addEventListener(
    "click",
    event => {

        event.stopPropagation();

        cardScreen.classList.remove(
            "active"
        );

        moodScreen.classList.add(
            "active"
        );

        currentMood = null;

        usedCards = [];

    }
);
