chrome.storage.sync.get(["trelloColor","state"], function(items) {
  if (items.state) {
    document.body.style.backgroundColor=items.trelloColor;
  }
});
