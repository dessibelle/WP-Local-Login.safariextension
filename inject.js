function wpLocalLoginRedirect(force_http) {

    var form = document.getElementById('loginform');

    if (typeof form !== 'undefined')
    {
        var url = form.getAttribute('action');

        if (force_http) {
            url = url.replace(/(http[s]?)(:\/\/)(.[^\/]+)/i, 'http$2localhost');
        } else {
            url = url.replace(/(:\/\/)(.[^\/]+)/i, '$1localhost');
        }

        form.setAttribute('action', url);

        form.submit();
    }
}

function handleMessage(msgEvent) {
    var messageName = msgEvent.name;
    var messageData = msgEvent.message;

    var force_http = messageName == 'redirect_http';

    if (messageName === "redirect" || messageName === "redirect_http") {
        wpLocalLoginRedirect(force_http);
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

    var form = document.getElementById('loginform');
    UserInfo.url = form.getAttribute('action');

    safari.self.tab.setContextMenuEventUserInfo(ev, UserInfo);
};

document.addEventListener('contextmenu', onContextMenu, false);
safari.self.addEventListener("message", handleMessage, false);
