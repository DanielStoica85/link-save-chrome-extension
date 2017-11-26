var totalSpan = document.getElementById('total');
var linksUl = document.getElementById('list');
var searchInput = document.getElementById('link-search');
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
        var listElement = '<li class="list-group-item"><a href="' + element.url + '">' + '<h4 class="list-group-item-heading">' + element.title + '</h4></a><a href="' + element.url + '">' + '<p class="list-group-item-text">' + element.url.substring(0, 30) + '...' + '</p></a></li>';
        linksUl.innerHTML += listElement;
    });

    links = document.querySelectorAll('#list a');
    console.log(links);

    // open saved links in new tab

    links.forEach(function(link) {
        link.addEventListener('click', function() {
            var location = link.href;
            chrome.tabs.create({active: true, url: location});
        });
    });
});

// search links by title
var filter;
var title;

searchInput.addEventListener('keyup', function() {
    filter = searchInput.value.toUpperCase();
    for (i = 0; i < linksUl.getElementsByTagName("li").length; i++) {
        title = linksUl.getElementsByTagName("li")[i].getElementsByTagName("h4")[0];
        if (title) {
          if (title.innerHTML.toUpperCase().indexOf(filter) > -1) {
              linksUl.getElementsByTagName("li")[i].style.display = 'block';
          }
          else {
              linksUl.getElementsByTagName("li")[i].style.display = 'none';
          }
        }
    }
});




// document.addEventListener('DOMContentLoaded', function () {
//   var links = document.getElementsByTagName("a");
//   for (var i = 0; i < links.length; i++) {
//       (function () {
//           var ln = links[i];
//           var location = ln.href;
//           ln.onclick = function () {
//               chrome.tabs.create({active: true, url: location});
//           };
//       })();
//   }
// });