function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

// device APIs are available
//
function onDeviceReady() {
    document.addEventListener("pause", onPause, false);
    document.addEventListener("resume", onResume, false);
    document.addEventListener("menubutton", onMenuKeyDown, false);
    document.addEventListener("backbutton", onBackKeyDown, false);
    $('.exit-btn').click(function () {
        if (confirm('Do you want to exit the app?') == true) {
            navigator.app.exitApp();
        }
    });

    $('.back-btn').click(function () {
        navigator.app.backHistory();
    });
}

function onPause() {
    // Handle the pause event
}

function onResume() {
    // Handle the resume event
}

function onMenuKeyDown() {
    // Handle the menubutton event
}

function onBackKeyDown() {
    var active_page = $(":mobile-pagecontainer").pagecontainer("getActivePage");
    var id = active_page.page().attr('id');
    if (id === 'halaman-login') {
        if (confirm('Do you want to exit the app?') == true) {
            navigator.app.exitApp();
        }
    }
    else {
        navigator.app.backHistory();
    }
}