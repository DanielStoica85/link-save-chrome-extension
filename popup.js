var titleInput = document.getElementById("link-name");
var urlInput = document.getElementById("link");
var errorMessage = document.getElementById("error");
var totalSpan = document.getElementById("total");

<<<<<<< HEAD
var saveButton = document.getElementById("save");
var cancelButton = document.getElementById("cancel");
var addForm = document.getElementById("add-link");

// show total number of saved links in recap
chrome.storage.sync.get("linksList", function(result) {
  if (result.linksList && result.linksList.length !== 0) {
    totalSpan.textContent = result.linksList.length;
  } else if (result.linksList && result.linksList.length === 0) {
    chrome.storage.sync.clear(function() {
      totalSpan.textContent = "0";
    });
  } else {
    totalSpan.textContent = "0";
  }
=======
var saveButton = document.getElementById('save');
var cancelButton = document.getElementById('cancel');
var addForm = document.getElementById('add-link');

// chrome.storage.sync.clear(function() {
//     console.log('Storage cleared.');
// });

// show total number of saved links in recap
chrome.storage.sync.get('linksList', function (result) {
    if (result.linksList && result.linksList.length !== 0) {
        totalSpan.textContent = result.linksList.length;
    } else if (result.linksList && result.linksList.length === 0) {
        chrome.storage.sync.clear(function () {
            totalSpan.textContent = '0';
        });
    } else {
        totalSpan.textContent = '0';
    }
>>>>>>> cbd62fdda220acc9ef1b290fb495802e9f12ee05
});

// clear input fields on clicking 'Cancel' button
cancelButton.addEventListener("click", function() {
  titleInput.value = "";
  urlInput.value = "";
});

// manually save an url
<<<<<<< HEAD
addForm.addEventListener("submit", function(e) {
  e.preventDefault();
  if (titleInput.value == "" || urlInput.value == "") {
    errorMessage.style.display = "block";
  } else {
    errorMessage.style.display = "none";
    chrome.storage.sync.get("linksList", function(result) {
      var savedLinks = [];
      if (result.linksList) {
        savedLinks = result.linksList;
        let currentLastIndex = savedLinks[savedLinks.length - 1].index;
        savedLinks.push({
          title: titleInput.value,
          url: urlInput.value,
          index: currentLastIndex + 1
        });
        chrome.storage.sync.set(
          {
            linksList: savedLinks
          },
          function() {
            var options = {
              type: "basic",
              iconUrl: "icon48.png",
              title: "Link saved!",
              message: "Link with the title " + titleInput.value + " was saved."
            };
            chrome.notifications.create("urlSavedNotification", options);

            titleInput.value = "";
            urlInput.value = "";
            totalSpan.textContent = savedLinks.length;
          }
        );
      } else {
        savedLinks = [
          {
            title: titleInput.value,
            url: urlInput.value,
            index: 1
          }
        ];
        chrome.storage.sync.set(
          {
            linksList: savedLinks
          },
          function() {
            var options = {
              type: "basic",
              iconUrl: "icon48.png",
              title: "Link saved!",
              message: "Link with the title " + titleInput.value + " was saved."
            };
            chrome.notifications.create("urlSavedNotification", options);
            titleInput.value = "";
            urlInput.value = "";
            totalSpan.textContent = savedLinks.length;
          }
        );
      }
    });
  }
});
=======
addForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (titleInput.value == '' || urlInput.value == '') {
        errorMessage.style.display = 'block';
    } 
    else {
        errorMessage.style.display = 'none';
        chrome.storage.sync.get('linksList', function (result) {
            var savedLinks = [];
            if (result.linksList) {
                console.log('There was a linkslist!!!');
                savedLinks = result.linksList;
                console.log(savedLinks);
                let currentLastIndex = savedLinks[savedLinks.length - 1].index;
                console.log(currentLastIndex);
                savedLinks.push({
                    title: titleInput.value,
                    url: urlInput.value,
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
                    url: urlInput.value,
                    index: 1
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

>>>>>>> cbd62fdda220acc9ef1b290fb495802e9f12ee05
