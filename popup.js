
$(function() {

	popup();
	var firstRun = true;

	function popup() {
		chrome.storage.sync.get(['trelloColor','state'], function(items) {

				$('.clr-pck').colorpicker({
			    colorFormat: '#HEX',
			    select: function(event, color) {
						if (items.state) {
							chrome.tabs.executeScript(null,
								{code:"document.body.style.backgroundColor='" + color.formatted + "'"});
						}
			    },
					stop: function(event, color) {
						chrome.storage.sync.set({'trelloColor' : color.formatted});
					},
					color: items.trelloColor
			  });

				if ($('input[type="checkbox"]').switchButton("instance") == undefined) {
					$('input[type="checkbox"]').switchButton({
						labels_placement: "right",
						checked: items.state,
						on_callback: function() {
							if (items.state != true) {
								chrome.storage.sync.set({'state' : true });
								chrome.tabs.reload(null, {bypassCache: false});
								popup();
							}
						},
						off_callback: function() {
							if (items.state != false) {
								chrome.storage.sync.set({'state' : false });
								chrome.tabs.reload(null, {bypassCache: false});
								popup();
							}
						}
					});
				}

		});
	}

});
