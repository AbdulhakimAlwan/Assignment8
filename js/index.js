var siteName = document.getElementById("siteName");
var siteURL = document.getElementById("siteURL");
var myBody = document.getElementById("myBody");
var error = document.getElementById("error");
var urlError = document.getElementById("urlError");
var siteList = [];

window.onload = function () {
    if (localStorage.getItem('sites')) {
        siteList = JSON.parse(localStorage.getItem('sites'));
        displaySite(siteList);
    }
};

function addSite() {
    if (siteValidation() && urlValidation()) {
        var site = {
            name: siteName.value,
            url: addProtocol(siteURL.value)
        };
        siteList.push(site);

        displaySite(siteList);
        localStorage.setItem('sites', JSON.stringify(siteList));

        siteName.value = '';
        siteURL.value = '';
        siteName.classList.remove("is-valid");
        siteURL.classList.remove("is-valid");
    } else {
        console.log("Validation error");
    }
}

function displaySite(sList) {
    var list = "";
    for (var i = 0; i < sList.length; i++) {
        list += `<tr>
                    <td>${i + 1}</td>
                    <td>${sList[i].name}</td>
                    <td><a href="${sList[i].url}" target="_blank" class="visit-button"><i class="fa-regular fa-eye"></i> Visit</a></td>
                    <td><button onclick="deleteSite(${i})" class="btn btn-danger"><i class="fa-solid fa-trash"></i> Delete</button></td>
                </tr>`;
    }
    myBody.innerHTML = list;
}

function deleteSite(index) {
    siteList.splice(index, 1);
    localStorage.setItem('sites', JSON.stringify(siteList));
    displaySite(siteList);
}

siteName.addEventListener('input', siteValidation);
siteURL.addEventListener('input', urlValidation);

function siteValidation() {
    var regex = /^[^\s]{3,}$/;

    if (regex.test(siteName.value)) {
        error.classList.add("d-none");
        siteName.classList.remove("is-invalid");
        siteName.classList.add("is-valid");
        return true;
    } else {
        error.classList.remove("d-none");
        siteName.classList.remove("is-valid");
        siteName.classList.add("is-invalid");
        return false;
    }
}

function urlValidation() {
    var url = siteURL.value.toLowerCase();
    var validExtensions = ['.com', '.net', '.org', '.edu', '.gov'];

    var valid = validExtensions.some(function (extension) {
        return url.endsWith(extension);
    });

    if (valid) {
        siteURL.classList.remove("is-invalid");
        siteURL.classList.add("is-valid");
        urlError.classList.add("d-none");
        return true;
    } else {
        siteURL.classList.remove("is-valid");
        siteURL.classList.add("is-invalid");
        urlError.classList.remove("d-none");
        return false;
    }
}

function addProtocol(url) {
    if (!/^https?:\/\//i.test(url)) {
        url = 'https://' + url;
    }
    return url;
}
