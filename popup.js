var titleInput = document.getElementById('link-name');
var urlInput = document.getElementById('link');
var errorMessage = document.getElementById('error');
var totalSpan = document.getElementById('total');

var saveButton = document.getElementById('save');
var cancelButton = document.getElementById('cancel');

// chrome.storage.sync.clear(function() {
//     console.log('Storage cleared.');
// });

// show total number of saved links in recap
chrome.storage.sync.get('linksList', function (result) {
    if (result.linksList) {
        totalSpan.textContent = result.linksList.length;
    }
    else {
        totalSpan.textContent = '0';
    }
});

// clear input fields on clicking 'Cancel' button
cancelButton.addEventListener('click', function () {
    titleInput.value = '';
    urlInput.value = '';
});

// manually save an url
saveButton.addEventListener('click', function () {
    if (titleInput.value == '' || urlInput.value == '') {
        errorMessage.style.display = 'block';
    } else {
        errorMessage.style.display = 'none';
        chrome.storage.sync.get('linksList', function (result) {
            console.log(result);
            var savedLinks = [];
            if (result.linksList) {
                console.log('There was a linkslist!!!');
                savedLinks = result.linksList;
                console.log(savedLinks);
                savedLinks.push({
                    title: titleInput.value,
                    url: urlInput.value
                });
                console.log(savedLinks);
                chrome.storage.sync.set({
                    'linksList': savedLinks
                }, function () {
                    var options = {
                        type: 'basic',
                        iconUrl: 'icon48.png',
                        title: 'Link saved!',
                        message: 'Link with the title ' + titleInput.value + ' was saved.'
                    }
                    chrome.notifications.create('urlSavedNotification', options);
                    titleInput.value = '';
                    urlInput.value = '';
                    totalSpan.textContent = savedLinks.length;
                });
            } else {
                console.log('There was no linkslist!!!');
                savedLinks = [{
                    title: titleInput.value,
                    url: urlInput.value
                }];
                chrome.storage.sync.set({
                    'linksList': savedLinks
                }, function () {
                    var options = {
                        type: 'basic',
                        iconUrl: 'icon48.png',
                        title: 'Link saved!',
                        message: 'Link with the title ' + titleInput.value + ' was saved.'
                    }
                    chrome.notifications.create('urlSavedNotification', options);
                    titleInput.value = '';
                    urlInput.value = '';
                    totalSpan.textContent = savedLinks.length;
                });
            }
        });
    }
});