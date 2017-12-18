var totalSpan = document.getElementById('total');
var linksUl = document.getElementById('list');
var searchInput = document.getElementById('link-search');
var editButtons = document.getElementsByClassName('edit-url');
var qrButtons = document.getElementsByClassName('qr-code');
var deleteButtons = document.getElementsByClassName('delete-url');
var qrCodeDiv = document.getElementById('qrcode');
var links;

chrome.storage.sync.get('linksList', function (result) {

    // show total number of saved links in recap
    totalSpan.textContent = result.linksList.length;

    // show links in list
    var savedLinks = result.linksList;
    savedLinks.forEach(element => {
        if (!element.url.startsWith('http://') && !element.url.startsWith('https://')) {
            element.url = "http://" + element.url;
        };
        var listElement = '<li class="list-group-item"' +' data-index=' + element.index + '><a href="' + element.url + '" class="added-link">' + 
        '<h4 class="list-group-item-heading">' + element.title + '</h4></a><button class="btn btn-xs qr-code"><span class="glyphicon glyphicon-qrcode"></span></button>' + '<p class="list-group-item-text"><a href="' + element.url + '" class="added-link">' + element.url.substring(0, 20) + '...' + '</a></p><button class="btn btn-xs delete-url"><span class="glyphicon glyphicon-remove"></span></button></li>';
        linksUl.innerHTML += listElement;
    });

    links = document.querySelectorAll('#list .added-link');

    // open saved links in new tab

    links.forEach(function (link) {
        link.addEventListener('click', function () {
            var location = link.href;
            chrome.tabs.create({
                active: true,
                url: location
            });
        });
    });
});

// search links by title
var filter;
var title;

searchInput.addEventListener('keyup', function () {
    filter = searchInput.value.toUpperCase();
    for (i = 0; i < linksUl.getElementsByTagName("li").length; i++) {
        title = linksUl.getElementsByTagName("li")[i].getElementsByTagName("h4")[0];
        if (title) {
            if (title.innerHTML.toUpperCase().indexOf(filter) > -1) {
                linksUl.getElementsByTagName("li")[i].style.display = 'block';
            } else {
                linksUl.getElementsByTagName("li")[i].style.display = 'none';
            }
        }
    }
});

// delete url
linksUl.addEventListener('click', deleteUrl);

function deleteUrl(e) {
    // delete from UI
    if (e.target.classList.contains('delete-url')) {
        // delete from chrome storage
        deleteUrlFromChromeStorage(e.target.parentElement);
        e.target.parentElement.remove();
    }
    else if (e.target.classList.contains('glyphicon-remove')) {
        // delete from chrome storage
        deleteUrlFromChromeStorage(e.target.parentElement.parentElement);
        e.target.parentElement.parentElement.remove();
    }
}

function deleteUrlFromChromeStorage(element) {
    let title = element.firstChild.textContent;
    let index = element.dataset.index;
    chrome.storage.sync.get('linksList', function (result) {
        var savedLinks = result.linksList;
        savedLinks.forEach(function(link) {
            if (link.title === title && link.index == index) {
                console.log(link);
                savedLinks.splice(savedLinks.indexOf(link), 1);
            }
        });
        chrome.storage.sync.set({'linksList': savedLinks}, function() {
            var options = {
                type: 'basic',
                iconUrl: 'icon48.png',
                title: 'Link deleted!',
                message: 'Link with the title ' + title + ' was deleted.'
            }
            chrome.notifications.create('urlDeletedNotification', options);
            chrome.storage.sync.get('linksList', function (result) {                
                // show total number of saved links in recap
                totalSpan.textContent = result.linksList.length;
            });
        });
    }
)};

// generate qr code for url
linksUl.addEventListener('click', generateQrCode);
let qrcode;
function generateQrCode(e) {
    qrCodeDiv.style.display = 'none';
    if (e.target.classList.contains('qr-code')) {
        let link = e.target.parentElement.firstChild.href;
        if (qrcode) {
            qrcode.clear();
            qrcode.makeCode(link);
        }
        else {
            qrcode = new QRCode(qrCodeDiv, {
                text: link,
                width: 150,
                height: 150,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
        }
        qrCodeDiv.style.display = 'block';
    }
    else if (e.target.classList.contains('glyphicon-qrcode')) {
        let link = e.target.parentElement.parentElement.firstChild.href;
        if (qrcode) {
            qrcode.clear();
            qrcode.makeCode(link);
        }
        else {
            qrcode = new QRCode(qrCodeDiv, {
                text: link,
                width: 150,
                height: 150,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
        }
        qrCodeDiv.style.display = 'block';
    }  
}


