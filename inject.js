function wpLocalLoginRedirect() {

    var form = document.getElementById('loginform');
    
    if (typeof form !== 'undefined')
    {    
        var url = form.getAttribute('action');        
        url = url.replace(/(:\/\/)(.[^\/]+)/i, '$1localhost');
        
        form.setAttribute('action', url);
        
        form.submit();
    }
}

function handleMessage(msgEvent) {
    var messageName = msgEvent.name;
    var messageData = msgEvent.message;
        
    if (messageName === "redirect") {
        wpLocalLoginRedirect();
    }
}

function validateContextMenu() {
    
    if (window.location.pathname) {
        var matches = window.location.pathname.match(/.*\/wp-login\.php.*/i);
        
        if (matches)
            return matches.length > 0;
    }
    
    
    return false;
}

function onContextMenu(ev) {
    var UserInfo = {};
    UserInfo.showMenuItem = validateContextMenu();
        
    safari.self.tab.setContextMenuEventUserInfo(ev, UserInfo);
};

document.addEventListener('contextmenu', onContextMenu, false);
safari.self.addEventListener("message", handleMessage, false);