// 


const video = document.getElementById("myVideo");
const toggleBtn = document.getElementById("toggleBtn");
const playIcon = document.getElementById("playIcon");
const pauseIcon = document.getElementById("pauseIcon");

if (video && toggleBtn && playIcon && pauseIcon) {
    toggleBtn.addEventListener("click", () => {
        if (video.paused) {
            video.play();
            playIcon.classList.add("hidden");
            pauseIcon.classList.remove("hidden");
        } else {
            video.pause();
            pauseIcon.classList.add("hidden");
            playIcon.classList.remove("hidden");
        }
    });
}
