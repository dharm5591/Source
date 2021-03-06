﻿/*  version="13" */
$(document).ready(function () {
    jsUtility.init();

    //Tooltip  
    if (jsUtility.isMobileBrowser() == false) {
        dataOriginalTitle.tooltip();
    }
});

$(window).on('resize', resize);
function resize() {
    jsUtility.setFeaturedImage();
    jsUtility.setFeatureBackgroundImage();
}

var dataOriginalTitle = $('[data-original-title]'); //Calling enhanced Tooltip

//Tooltip Dismissal Mechanism

dataOriginalTitle.on("keydown", function (e) {
    if (e.keyCode == 27) {
        dataOriginalTitle.tooltip("hide");
        dataOriginalTitle.blur();
    }
});


var aspectRatio = 0.5625; // 16:9 default aspect ratio

var jsUtility = (function () {
    var init = function () {
        setFeaturedImage();
        setFeatureBackgroundImage();
        checkBrowser();
        setBackgroundImage();
        //addEllipsis();
        //adjustHeaderOnLoadEditor();
        //lazyLoading();
        isMobile();
        isTablet();
        isMobileBrowser();
    }
    var smMin = 768;
    var smMax = 999;

    var isMobile = function () {
        if ($(window).width() < smMin) {
            return true;
        } else {
            return false;
        }
    }

    var isTablet = function () {
        if ($(window).width() >= smMin && $(window).width() <= smMax) {
            return true;
        } else {
            return false;
        }
    }


    var isMobileBrowser = function () {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            return true;
        } else {
            return false;
        }
    }

    var sitecoreCrossPiece = $('#scCrossPiece');
    var adjustHeaderOnLoadEditor = function () {
        var scFieldValues = $('#scFieldValues');
        if (sitecoreCrossPiece.length > 0 && scFieldValues.length <= 0) {
            setTimeout(adjustHeaderOnLoadEditor);
        }
        else {
            setTimeout(adjustHeaderOnLoadEditor, 200);
        }

        hideRibbon();
    }

    var hideRibbon = function () {

        if (window.location.search.substring(1).indexOf('sc_mode=preview') >= 0) {
            var scWebEditRibbon = $('#scWebEditRibbon');
            var headerTopNav = $('#header-topnav');
            scWebEditRibbon.addClass('hidden');
            headerTopNav.css('top', '0px');
            sitecoreCrossPiece.css('height', '0px');

        }
    }

    var checkBrowser = function () {
        var $html = $('html');
        var ua = navigator.userAgent.toLowerCase();
        var appName = navigator.appName.toLowerCase();

        if (ua.indexOf("firefox") > -1) {
            $html.addClass('firefox');
        }

        //RMT 7441 US002 Edge 200% alignment fix
        if (ua.indexOf("edge") > -1) {
            $html.addClass('ie-edge');
        }
        if (ua.indexOf("trident/7.0") != -1 && appName == "netscape") {
            $html.addClass('ie');
        }

        //RMT 8203 BUG 734964
        if (ua.indexOf("chrome") < 0 && ua.indexOf("safari") > -1) {
            $html.addClass("safari");
        }
    }

    var setBackgroundImage = function () {
        var blockContainer = $("#hero-carousel .item, .ui-container");

        blockContainer.each(function () {
            var $this = $(this);
            var image = $this.data("src");
            if (image != undefined && image != "") {
                $this.css('background-image', "url(" + image + ")");
            }
        });
    }
    /*var addEllipsis = function () {
        var ellipsis = $('.ellipsis');
        ellipsis.dotdotdot({
            ellipsis: '... ',
          
            watch: window,
           
            wrap: 'letter'
        });
    }*/

    /*var lazyLoading = function () {
        var lazyLoading = $('.lazy');
        lazyLoading.lazy();
    }*/

    //RMT7949 US011.A start
    var setFeaturedImage = function () {
        var featuredImage = $('.adaptive-img');
        featuredImage.each(function () {
            var $this = $(this);
            var image = $this.data("imagexs");
            if (typeof $this !== "undefined" && $this !== "") {
                if (!jsUtility.isMobile() && !jsUtility.isTablet()) {
                    image = $this.data("imagelg");
                    $this.attr("src", image);
                }
                else if (jsUtility.isTablet()) {
                    image = $this.data("imagesm");
                    $this.attr("src", image);
                }
                else {
                    $this.attr("src", image);
                }
            }
        });

    };
    //RMT7949 US011.A end

    //RMT8092 US014 start
    var setFeatureBackgroundImage = function () {
        var featuredImage = $("#hero-carousel .item");
        featuredImage.each(function () {
            var $this = $(this);
            var image = $this.data("imagexs");
            if (typeof $this !== "undefined" && $this !== "") {
                if (!jsUtility.isMobile() && !jsUtility.isTablet()) {
                    image = $this.data("imagelg");
                    if (image) {
                        $this.css('background-image', image);
                    }
                }
                else if (jsUtility.isTablet()) {
                    image = $this.data("imagesm");
                    if (image) {
                        $this.css('background-image', image);
                    }
                }
                else {
                    if (image) {
                        $this.css('background-image', image);
                    }
                }
            }
        });

    };
    //RMT8092 US014 end

    return {
        init: init,
        isTablet: isTablet,
        isMobile: isMobile,
        setFeaturedImage: setFeaturedImage,
        setFeatureBackgroundImage: setFeatureBackgroundImage,
        isMobileBrowser: isMobileBrowser,
    }
})();

//Will be removed once SERP functionality for Redesign is done
function Bootstraploader() {
    var validatorExists = $('head').find("script[src*='bootstrapValidator.js']").length > 0;

    if (!validatorExists) {
        var bootstrapScript = document.createElement('script'), d = false;
        bootstrapScript.async = true;
        bootstrapScript.src = "/Scripts/lib/bootstrapValidator.js";
        bootstrapScript.type = "text/javascript";
        bootstrapScript.onload = bootstrapScript.onreadystatechange = function () {
            var bootstrapReadyState = this.readyState;
            //Validate if script is downloaded successfully.
            if (!d && bootstrapReadyState == "complete" || bootstrapReadyState == "loaded") {
                d = true;
                InitializeBootstrapValidator(); //Callback
            }
        };
        $('head').append(bootstrapScript);
    }
}

var smallMin = 768;
var smallMax = 999;

function IsIE() {
    if ($('html').hasClass('ie')) {
        return true;
    } else {
        return false;
    }
}

function isMobile() {
    if ($(window).width() < smallMin) {
        return true;
    } else {
        return false;
    }
}
function isTablet() {
    if ($(window).width() >= smallMin && $(window).width() <= smallMax) {
        return true;
    } else {
        return false;
    }
}
//Will be removed once SERP functionality for Redesign is done