// Back to Top Button
const backToTopButton = document.createElement("button");
backToTopButton.innerText = "↑";
backToTopButton.id = "back-to-top";
document.body.appendChild(backToTopButton);

window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
});

backToTopButton.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});