var titleInput = document.getElementById('link-name');
var urlInput = document.getElementById('link');
var errorMessage = document.getElementById('error');
var totalSpan = document.getElementById('total');
var saveButton = document.getElementById('save');
var cancelButton = document.getElementById('cancel');
var editForm = document.getElementById('add-link');

var urlParams = new URLSearchParams(window.location.search);
var incomingIndex = urlParams.get('index');

if (incomingIndex) {
    chrome.storage.sync.get('linksList', function(result) {
        result.linksList.forEach(function(link) {
            if (link.index == incomingIndex) {
                console.log(link);
                titleInput.value = link.title;
                urlInput.value = link.url;
            }
            return;
        });
    });
}

editForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (titleInput.value == '' || urlInput.value == '') {
        errorMessage.style.display = 'block';
    } 
    else {
        errorMessage.style.display = 'none';
        chrome.storage.sync.get('linksList', function (result) {
            var savedLinks = [];

            savedLinks = result.linksList;
            savedLinks.forEach(function(link) {
                if (link.index == incomingIndex) {
                    link.url = urlInput.value;
                    link.title = titleInput.value;
                }
            });
            console.log('After update: ', savedLinks);
            chrome.storage.sync.set({
                'linksList': savedLinks
            }, function () {
                var options = {
                    type: 'basic',
                    iconUrl: 'icon48.png',
                    title: 'Link edited and saved!',
                    message: 'Link with the title ' + titleInput.value + ' was edited and saved.'
                }
                chrome.notifications.create('urlSavedNotification', options);

                titleInput.value = '';
                urlInput.value = '';
                totalSpan.textContent = savedLinks.length;
            });

        });
    }
});