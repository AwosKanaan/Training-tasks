const ball = document.querySelector(".ball");
const body = document.querySelector("body");
const shadow = document.querySelector(".shadow");

body.addEventListener("click", (event) => {
    const imageWidth = ball.clientWidth;
    const imageHeight = ball.clientHeight;
    const newX = event.clientX - imageWidth / 2;
    const newY = event.clientY - imageHeight / 2;
    if (event.target && event.target.className === "hoop" && (newY <= 70 && newY >= 35)) {
        // debugger
        ball.style.transition = "transform 1.5s, left 1.5s, bottom 1.5s";
        const bodyHeight = document.querySelector('body').clientHeight;
        ball.style.bottom = `${bodyHeight - newY - 130}px`;
        ball.style.left = `50%`;
        ball.style.transform = "translate(-50%) scale(0.33)"


        setTimeout(() => {
            ball.style.transition = "transition: 1.5s ";
            //left 1s, top 1s
            ball.style.transform = "scale(1)";

            ball.style.bottom = `${0}px`;
            ball.style.left = `${50}%`;
            ball.style.transform = "translate(-50%)";

            ball.style.animation = "none";
            ball.style.zIndex = -1;

            setTimeout(() => {
                ball.style.animation = "bounce 1s"
                shadow.style.animation = "shadow-shrink 1s"
                ball.style.zIndex = 0;
            }, 1150)
        }, 1500)

    } else {
        
    }
});
