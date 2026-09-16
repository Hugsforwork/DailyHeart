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

const drawAgain =
    document.getElementById("draw-again");

const changeMood =
    document.getElementById("change-mood");

const cardBack =
    document.querySelector(".card-back");


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
   開始這個心情的卡池
========================= */

function startMood(mood) {

    currentMood = mood;

    /*
        換一個心情時，
        重新計算這組卡牌的抽取紀錄
    */
    usedCards = [];

    moodScreen.classList.remove("active");

    cardScreen.classList.add("active");

    drawCard();

}


/* =========================
   抽一張卡
========================= */

function drawCard() {

    const pool =
        cardPools[currentMood];

    if (!pool) {
        return;
    }


    /*
        找出還沒有抽過的卡
    */

    const availableCards =
        pool.cards
            .map((image, index) => ({
                image,
                index
            }))
            .filter(item =>
                !usedCards.includes(item.index)
            );


    /*
        如果五張都看過
    */

    if (availableCards.length === 0) {

        alert(
            "這組療癒卡都看過啦！\n\n可以換個心情再試試 🌿"
        );

        return;
    }


    /*
        隨機選一張
    */

    const randomIndex =
        Math.floor(
            Math.random() *
            availableCards.length
        );

    const selected =
        availableCards[randomIndex];


    /*
        記錄這張卡，
        避免同一輪重複抽到
    */

    usedCards.push(selected.index);


    /*
        每次抽新卡，
        先確保卡牌回到正面
    */

    card.classList.remove("flipped");


    /*
        顯示新卡
    */

    cardImage.src =
        selected.image;


    /*
        PDF 連結：
        對應的是「這個心情的完整卡牌 PDF」
        而不是單張卡
    */

    pdfLink.href =
        pool.pdf;

}


/* =========================
   點卡牌正面 → 翻到背面
========================= */

card.addEventListener("click", event => {

    /*
        如果目前是正面，
        點卡牌任何位置都可以翻面
    */

    if (
        !card.classList.contains("flipped")
    ) {

        card.classList.add("flipped");

    }

});


/* =========================
   卡牌背面空白區
   → 翻回正面
========================= */

cardBack.addEventListener("click", event => {

    /*
        只有點「背面本身的空白區域」
        才翻回正面。

        點按鈕或 PDF 連結時不翻牌。
    */

    if (
        event.target === cardBack
    ) {

        card.classList.remove("flipped");

    }

});


/* =========================
   PDF
========================= */

pdfLink.addEventListener(
    "click",
    event => {

        /*
            防止點 PDF 時觸發翻牌
        */

        event.stopPropagation();

    }
);


/* =========================
   再抽一張
========================= */

drawAgain.addEventListener(
    "click",
    event => {

        /*
            不讓按鈕點擊觸發翻牌
        */

        event.stopPropagation();

        /*
            留在目前心情，
            從同一個卡池再抽一張
        */

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
