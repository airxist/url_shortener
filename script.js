// SELECTED ELEMENTS OR TAGS
const menu_btn = document.querySelector(".menu");
const menu = document.querySelector(".compass");
const form = document.querySelector(".shorten_form");
const user_url = form.querySelector(".shorten_text");
const alert_output = document.querySelector(".alert");
const root = document.querySelector(":root");
const url_container = document.querySelector(".url_container");

// OPTIONS OR CONDITIONS

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
}
const validate = e => {
    e.preventDefault();
    value = user_url.value;

    if(!value) {
        displayAlert( "please add a link!", "danger", "dangerline", "red" );
    } else {
        getFile(value);
        displayAlert( "Wait, we working on it!", "safezone", "safezoneline", "lightgreen" );
    }

}
let y;
// HOISTING FUNCTIONS 
function getFile(value) {
    let url = `https://api.shrtco.de/v2/shorten?url=${value}`;
    fetch(url)
    .then(res => res.json())
    .then(data => y=data)
    .then(() => {
        let shortlink = y.result.short_link;
        let original = y.result.original_link;
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
        }else{
            let chek = value.indexOf(".com");
            if(chek < 0) {
                displayAlert( "input is not a valid link!", "danger", "dangerline", "red" );
            }else{
                html();
            }
        }
    })
}
// EVENT LISTENER 
menu_btn.addEventListener("click", open_menu);
form.addEventListener("submit", validate);