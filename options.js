var limitInput = document.getElementById("limit");
var saveLimitButton = document.getElementById("save-limit");
var deleteButton = document.getElementById("delete-links");
var resetButton = document.getElementById("reset-limit");
var totalSpan = document.getElementById("total");
var limitSpan = document.getElementById("limit-span");
var errorMessage = document.getElementById("error");

// show total number of saved links in recap
chrome.storage.sync.get("linksList", function(result) {
  if (result.linksList) {
    totalSpan.textContent = result.linksList.length;
  } else {
    totalSpan.textContent = "0";
  }
});

// delete all saved links
deleteButton.addEventListener("click", function() {
  chrome.storage.sync.remove("linksList", function() {
    // show notification with limit reset confirmation
    var notifOptions = {
      type: "basic",
      iconUrl: "icon48.png",
      title: "Links deleted!",
      message: "You just deleted all your previously saved links!"
    };
    chrome.notifications.create("delete", notifOptions);
    totalSpan.textContent = "0";
  });
});
