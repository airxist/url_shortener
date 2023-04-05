// SELECTED ELEMENTS OR TAGS
const menu_btn = document.querySelector(".menu");
const menu = document.querySelector(".compass");
const form = document.querySelector(".shorten_form");
const user_url = form.querySelector(".shorten_text");
const alert_output = document.querySelector(".alert");
const root = document.querySelector(":root");
const url_container = document.querySelector(".url_container");

// OPTIONS OR CONDITIONS
// let pausepage = false, currentpage;
// FUNCTIONS
const open_menu = () => menu.classList.toggle("show_menu");
const setDefault = () => user_url.value = "";
const displayAlert = ( msg, styling, wrongoutline, coloring ) => {
    user_url.classList.add(wrongoutline);
    alert_output.textContent = msg;
    alert_output.classList.add(styling);
    gcs = window.getComputedStyle(root);
    let placeholder_color = gcs.getPropertyValue("--text");
    root.style.setProperty("--text", coloring);
    
    setTimeout(() => {
        user_url.classList.remove(wrongoutline);
        alert_output.textContent = "";
        alert_output.classList.remove(styling);
        root.style.setProperty("--text", placeholder_color);
    }, 3000);
}
const html = () => {
    url_container.innerHTML += `
            <article class="url">
                <p class="user_url">${object.original}</p>
                <p class="shortened_url">${object.shortlink}</p>
                <button class="copy" type="button">Copy</button>
            </article>`
    const copy_btn = document.querySelectorAll(".copy");

    copy_btn.forEach(copied => {
        copied.addEventListener("click", e=> {
            e.currentTarget.classList.add("copied")
            e.currentTarget.textContent = "copied"
            element = e.currentTarget.previousSibling.previousSibling;
            let link = element.textContent;
            navigator.clipboard.writeText(link)
        })
    })
    setDefault();
}
const validate = e => {
    e.preventDefault();
    value = user_url.value;

    if(!value) {
        displayAlert( "please add a link!", "danger", "dangerline", "red" );
    } else if (value) {
        let chek = value.indexOf(".com");
        if(chek < 0) {
            displayAlert( "input is not a valid link!", "danger", "dangerline", "red" );
            setDefault();
        }else {
            displayAlert( "Wait, we working on it!", "safezone", "safezoneline", "lightgreen" );
            getFile(value);
            setDefault();
        } 
    }
}
let feedback;
// HOISTING FUNCTIONS 
function getFile(value) {
    let url = `https://api.shrtco.de/v2/shorten?url=${value}`;
    fetch(url)
    .then(res => res.json())
    .then(data => feedback = data)
    .then(() => {
        let shortlink = feedback.result.short_link;
        let original = feedback.result.original_link;
        return object = {shortlink, original}
    })
    .finally(() => {
        let child = url_container.childNodes.length;
        if(child > 4) {
            let article = `
            <article class="url">
                <p class="user_url">${object.original}</p>
                <p class="shortened_url">${object.shortlink}</p>
                <button class="copy" type="button">Copy</button>
            </article>`

            let arr_of_children = [...url_container.querySelectorAll(".url")];
            url_container.removeChild(arr_of_children[0]);

           html();
        }else {
            html();
        }
    })
}
// EVENT LISTENER 
menu_btn.addEventListener("click", open_menu);
form.addEventListener("submit", validate);
window.addEventListener("scroll", () => menu.classList.remove("show_menu"));