ICON_ON = 'images/star-on.png';
ICON_OFF = 'images/star-off.png';
data = {
  'activeTabId': -1
};

chrome.bookmarks.onCreated.addListener(function(id, bookmarkInfo) {
  chrome.browserAction.setIcon({
			path: ICON_ON
  });
});

chrome.bookmarks.onRemoved.addListener(function(id, changeInfo) {
  chrome.browserAction.setIcon({
			path: ICON_OFF
  });
});

function onSearchDone(results) {
  var iconPath = results.length > 0 ? ICON_ON : ICON_OFF;
  chrome.browserAction.setIcon({
			path: iconPath
  });
}

function updateForURL(url) {
  chrome.bookmarks.search({'url': url}, onSearchDone);
}

function onActiveTabInfoUpdated(tab) {
  updateForURL(tab.url);
}

function refreshForActiveTab() {
  chrome.tabs.get(data.activeTabId, onActiveTabInfoUpdated);
}

chrome.tabs.onActivated.addListener(function(tabInfo) {
  data.activeTabId = tabInfo.tabId;
  refreshForActiveTab();
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (tabId == data.activeTabId) {
    refreshForActiveTab();
  }
});