/*
 * win8 UpdateCenter use
 * http://www.cyberlink.com/stat/window8-updates-center/enu/index.jsp
 */

jQuery(function($){ // check IE/FF/Chrome
    var userAgent = navigator.userAgent.toString().toLowerCase();
    if(userAgent.indexOf('chrome') > 0) {
        setBrowser('chrome');
        setVersion('-1');
        showCompatibility(true);
    } else if (userAgent.indexOf('trident') > 0) { // check IE 11
		setBrowser('ie');
        setVersion(11);
        showCompatibility(true);
	} else {
        if ($.browser.msie) { // check IE 8,9,10
            var ieVersion = parseInt($.browser.version, 10);
            if(ieVersion == 8 || ieVersion == 9) {
            	setBrowser('ie');
                setVersion(ieVersion);
                showCompatibility(true);
            } else if (ieVersion == 10) {
            	if(FlashDetect.installed) {
            		setBrowser('ie');
                    setVersion(ieVersion);
                    showCompatibility(true);
            	} else { // detect Metro IE 10
            		setBrowser('other');
                    setVersion('-1');
                    showCompatibility(false);
            	}
            } else {
                setBrowser('other');
                setVersion('-1');
                showCompatibility(false);
            }
        } else { // FF or other
            setBrowser('other');
            setVersion('-1');
            showCompatibility(false);   
        }
    }
});

function setBrowser(browser) {
    $('#browser').html(browser);
}

function setVersion(version) {
    $('#version').html(version);
}

function showCompatibility(result) {
	var browser = $('#browser').html();
	if(result) {
		if(browser == 'ie') {
			$('#botton').show();
	        $('#note_href').show();
	        $('#note_href2').hide();
	        $('#unable').hide();
	        $('#botton2').hide();
	        $('#botton3').hide();
		} 
		if(browser == 'chrome') {
			$('#botton').show();
	        $('#note_href').hide();
	        $('#note_href2').show();
	        $('#unable').hide();
	        $('#botton2').hide();
	        $('#botton3').hide();
		}
	} else {
		$('#botton').hide();
        $('#note_href').hide();
        $('#note_href2').hide();
        $('#unable').show();
        $('#botton2').show();
        $('#botton3').hide();
	}
}

function checkCompatibility() {
	$('#botton').find('a').css("background-image" , "url('../img/botton3.gif')");
	$('#botton').find('a').removeAttr("onmousedown");
	pause(100);
    var browser = $('#browser').html();
    if(browser != "other") {
        loadAdvisor(browser);
    }
    loadProd(browser);
}

function loadAdvisor(browser) {
    var advisor = '';
    if(browser == "ie") {
        advisor =  '<object id="UpdateAdivsor" classid="CLSID:DED4D168-AEEE-4e0c-B699-36A9A320ED5E" codebase="/prog/win8/js/UpdateAdvisor.cab#Version=4,0,0,1" width="0" height="0">'
            + '<param name="RedirectURL" value="http://www.gocyberlink.com"/>' + '</object>';
    }
    if(browser == "chrome") {
    	advisor = '<embed id="UpdateAdivsor" type="application/x-Cyberlink-Advisor" width="0" height="0">';
    	if(!isInstalled()) {
    		installChromeExtension();
    	}
    }
    loading(advisor);
}

function loading(advisor) {
    $('#CLadvisor').html('');
    $('#CLadvisor').html(advisor);
}

function isInstalled() { // for Chrome to check if extension is installed
    if($('#CyberLink_UpdateAdvisor').length > 0) {
        return true;
    }
    return false;
}

function installChromeExtension() {
	chrome.webstore.install('https://chrome.google.com/webstore/detail/nphdbgihgmfececajlbcmeghobaleanj',doIfSuccess,doIfFail);
}

function doIfSuccess() {
	loadAdvisor("chrome");
}

function doIfFail() {
   window.location.reload();
}

function pause(milliseconds) {
	var dt = new Date();
	while ((new Date()) - dt <= milliseconds) { /* Do nothing */ }
}