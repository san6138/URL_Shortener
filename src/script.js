function getRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}

// counts url clicks //
function count_clicks(event) {
    let tag = event.target.parentNode;
    let click_span_tag = tag.querySelector("span");
    let text = click_span_tag.textContent;
    let count = parseInt(text[text.length - 1]);
    count += 1;
    click_span_tag.textContent = `Clicks:${count}`;

}
function edit_url(event) {
    const url = event.target.parentNode;
    const link = url.querySelector("a");
    const inputTag = document.createElement("input");
    const linkText = link.textContent;
    inputTag.value = linkText.split("/")[1];

    url.replaceChild(inputTag, link);
    const button = url.querySelector("button");
    button.textContent = "save";

    function save_url() {
        link.textContent = `localhost/${inputTag.value}`;
        link.href = `localhost/${inputTag.value}`;
        url.replaceChild(link, inputTag);
        button.textContent = "edit";
        button.removeEventListener("click", save_url);
        button.addEventListener("click", edit_url);
    }

    button.removeEventListener("click", edit_url);
    button.addEventListener("click", save_url);
}

function get_short_url() {
    let input = document.getElementById("input-url").value;
    let regex = /https:\/\/.*/;
    if (regex.test(input)) {
        let short_url = `localhost/${getRandomString(5)}`;
        let li_tag = document.createElement("li");
        let a_tag = document.createElement("a");
        a_tag.href = input;
        a_tag.target = "_blank";
        a_tag.textContent = short_url;
        a_tag.addEventListener("click", count_clicks);
        li_tag.appendChild(a_tag);
        let text  = document.createTextNode(`-${input}-`);
        li_tag.appendChild(text);
        let click_span_text = document.createElement("span");
        click_span_text.textContent = "Clicks:0";
        li_tag.appendChild(click_span_text);
        let edit_button = document.createElement("button");
        edit_button.textContent = "edit";
        li_tag.appendChild(edit_button);
        edit_button.addEventListener("click", edit_url);
        document.getElementById("list-url").appendChild(li_tag);
    } else {
        document.querySelector("p").style.display = "block";
    }
}

function delete_url() {
    let input = document.getElementById("input-url").value;
    let url_list = document.getElementById("list-url");
    let urls = url_list.childNodes;

    if (!input) {
        // Clear the entire list when input is empty
        while (url_list.firstChild) {
            url_list.removeChild(url_list.firstChild);
        }
    } else {
        for (let i = 0; i < urls.length; i++) {
            let url = urls[i];
            let long_url_text = url.childNodes[1].textContent;
            let short_url_text = url.querySelector("a").textContent;
            let long_url = long_url_text.slice(1, -1);
            if (long_url === input || short_url_text === input) {
                url_list.removeChild(url);
                i--; // Decrement the index since the list length has decreased\\
            }

        }
    }
}
document.getElementById("button-create").addEventListener("click", get_short_url);
document.getElementById("button-delete").addEventListener("click", delete_url);