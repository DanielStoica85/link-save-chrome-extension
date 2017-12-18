var contextMenuItem = {
    "id": "saveLink",
    "title": "Save URL for later",
    "contexts": ["link"]
};

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function(clickedData) {
    console.log(clickedData);
    // check if user clicked on extension contextMenuItem and there is a link selected
    if (clickedData.menuItemId === 'saveLink' && clickedData.linkUrl) {
        chrome.storage.sync.get('linksList', function (result) {
            console.log(result);
            var savedLinks = [];
            if (result.linksList) {
                console.log('There was a linkslist!!!');
                savedLinks = result.linksList;
                console.log(savedLinks);
                let currentLastIndex = savedLinks[savedLinks.length - 1].index;
                savedLinks.push({
                    title: 'New Link',
                    url: clickedData.linkUrl,
                    index: currentLastIndex + 1
                });
                console.log(savedLinks);
                chrome.storage.sync.set({
                    'linksList': savedLinks
                }, function () {
                    var options = {
                        type: 'basic',
                        iconUrl: 'icon48.png',
                        title: 'Link saved!',
                        message: 'Link with the url ' + savedLinks[savedLinks.length -1].url + ' was saved.'
                    }
                    chrome.notifications.create('urlSavedNotification', options);
                });
            } else {
                console.log('There was no linkslist!!!');
                savedLinks = [{
                    title: 'New Link',
                    url: clickedData.linkUrl,
                    index: 1
                }];
                chrome.storage.sync.set({
                    'linksList': savedLinks
                }, function () {
                    var options = {
                        type: 'basic',
                        iconUrl: 'icon48.png',
                        title: 'Link saved!',
                        message: 'Link with the url ' + savedLinks[0].url + ' was saved.'
                    }
                    chrome.notifications.create('urlSavedNotification', options);
                });
            }
        });
    }
});

