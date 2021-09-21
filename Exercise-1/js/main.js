
/**START Api call */
let url = `https://5dc588200bbd050014fb8ae1.mockapi.io/assessment`;

const api = new XMLHttpRequest;
api.open('GET', url, true);

api.onload = function () {
    if (api.status >= 200 && api.status < 400) {
        var data = JSON.parse(api.responseText);
        createHTML(data)
    } else {
        console.log("Connected to the server but it returned an error")
    }
};

api.onerror = function () {
    consoel.log("Error")
}
api.send();
/**END Api call */

/**START HTML Creation */
function createHTML(usersData) {
    var rawTemplate = document.getElementById('handlebar').innerHTML;
    var compiledTemplate = Handlebars.compile(rawTemplate);
    var generatedHTML = compiledTemplate(usersData);

    var usersContainer = document.getElementById("users-container")
    usersContainer.innerHTML = generatedHTML;
}
/**END HTML Creation */
