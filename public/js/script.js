const input = document.querySelector("input");
const form = document.querySelector("form");

input.addEventListener("change", (e) => {
    form.submit();
});

// copy link to clipboard
const link = document.querySelector(".link-box div");
const linkText = link.childNodes[1];
link.addEventListener("click", (e) => {
    navigator.clipboard.writeText(linkText.textContent);
})
