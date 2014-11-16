//var { ToggleButton } = require('sdk/ui/button/action'); // >= v29
var panels  = require("sdk/panel");
var self    = require("sdk/self");
var widgets = require("sdk/widget");
var data    = self.data;
var pageMod = require("sdk/page-mod");
var tabs    = require("sdk/tabs");


// For v29 and above
/*var button = ToggleButton({
  id: "oalplugin-button",
  label: "Deployee OAL Menu",
  icon: {
    //"16": "./icon-16.png",
    "32": "./img/btn_small.png",
    "64": "./img/btn_large.png"
  },
  onChange: handleChange
});*/

// Display area for the plugin.
var panel = panels.Panel({
  width: 550,
  height: 550,
  position: {
    top: 0,
    left: 0
  },
  contentURL: data.url("./html/index.html"),
  onHide: handleHide
});

// Handle showing the content
function handleChange(state) {
  if (state.checked) {
    // For v29 and above.
    /*panel.show({
      //position: button
      position: {
        top: 10,
        right: 10
      }
    });*/
    view.panel = panel;
  }
}

// V29+
function handleHide() {
  //button.state('window', {checked: false});
}

// Button on menu bar < V29 safe.
var widget = widgets.Widget({
    id: "se31520-toolbar",
    label: "SE31520 Browser Extension",
    //panel: thePanel,
    contentURL: self.data.url("./img/16.png"),
    width: 16,
    height: 16, 
    onClick: function(view) {
        /*This will work*/
       view.panel = panel;
       /*This will work*/
    }
});
