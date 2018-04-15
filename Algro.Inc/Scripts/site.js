//version="5"
jQuery.fn.outerHTML = function (s) {
    return (s)
      ? this.before(s).remove()
      : jQuery("<p>").append(this.eq(0).clone()).html();
}

//_________________________________________
//HEADER
//_________________________________________
function changeHeaderInformation(position) {
    var newHeader = $('#block-hero .slide').eq(position).find('.slide-header').text();
    var newBody = $('#block-hero .slide').eq(position).find('.slide-body').text();
    var newCTAlink = $('#block-hero .slide').eq(position).find('.slide-cta-link').text();

    $('#block-hero .page-header .headline h1').text(newHeader);
    $('#block-hero .page-header .body span').text(newBody);
    $('#block-hero .page-header .cta a').attr('href', newCTAlink);
}

function InitializeHeaderSlider() {
    //slider nav JS
    var slider = {
        // Not sure if keeping element collections like this
        // together is useful or not.
        el: {
            slider: $("#block-hero .slider"),
            allSlides: $("#block-hero .slide"),
            sliderNav: $("#block-hero .slider-nav"),
            allNavButtons: $("#block-hero .slider-nav > a")
        },

        timing: 800,
        slideWidth: 1280, // could measure this

        // In this simple example, might just move the
        // binding here to the init function
        init: function () {
            this.bindUIEvents();
        },

        bindUIEvents: function () {
            this.el.sliderNav.on("click", "a", function (event) {
                slider.handleNavClick(event, this);
            });
            // What would be cool is if it had touch
            // events where you could swipe but it
            // also kinda snapped into place.
        },

        handleNavClick: function (event, el) {
            event.preventDefault();
            var position = $(el).attr("href").split("-").pop();

            this.el.slider.animate({
                scrollLeft: position * this.slideWidth
            }, this.timing);

            this.changeActiveNav(el);

            changeHeaderInformation(position);
        },

        changeActiveNav: function (el) {
            this.el.allNavButtons.removeClass("active");
            $(el).addClass("active");
        }
    };

    slider.init();
}

function InitializeSlider(pSlider, pAllSlides, pSliderNav, pAllNavButtons, pSlide) {
    //alert('InitializeSlider/ ' + pSlideWidth + '/' );
    //slider nav JS
    var slider = {
        el: {
            slider: pSlider,
            allSlides: pAllSlides,
            sliderNav: pSliderNav,
            allNavButtons: pAllNavButtons
        },

        timing: 400,
        slideWidth: mobileSlideWidth, // could measure this

        // In this simple example, might just move the
        // binding here to the init function
        init: function () {
            this.bindUIEvents();
        },

        bindUIEvents: function () {
            this.el.sliderNav.on("click", "a", function (event) {
                slider.handleNavClick(event, this);
            });
            // What would be cool is if it had touch
            // events where you could swipe but it
            // also kinda snapped into place.
        },

        handleNavClick: function (event, el) {
            event.preventDefault();
            var position = $(el).attr("href").split("-").pop();

            this.el.slider.animate({
                scrollLeft: position * mobileSlideWidth
            }, this.timing);

            this.changeActiveNav(el);
        },

        changeActiveNav: function (el) {
            this.el.allNavButtons.removeClass("active");
            $(el).addClass("active");
        }
    };

    slider.init();
}

//BUG #425783 - Removed unnecessary variable declarations
function displayCommentButton() {
    var mobileview = $(window).width();
    if (mobileview <= 767) {
        var commentSectionHeader = $('#displayCommentSectionHeader');
        commentSectionHeader.removeClass("commentHeader");
        commentSectionHeader.removeClass("hidden-xs");
        $('#displayCommentsButton').addClass("hidden-xs");
        $('#postCommentButton').removeClass("hidden-xs");
        $('#displayLoadMore').removeClass("hidden-xs");
        $('#commentSection').removeClass("hidden-xs");
    }
}

//BUG #425783 - Removed unnecessary variable declarations
function displayCommentSection() {
    var postacomment = $('#postacomment');
    var textSignInToPost = $('#signinToPost').html();
    //BUG #425783
    $('#postCommentButton').addClass("hidden-xs");

    //BUG #425783
    var header = $('#header');
    header.append(postacomment);

    postacomment.removeClass("hidden-xs");
    $('#displayPostACommentSection').remove(".commentHeader");
    //$('#mobileCommentsTitle').removeClass("hidden-xs");
    $('#userYourAccentureLogin').text(textSignInToPost);
}

$(window).load(function () {
    //prevents the modal from closing when clicking the background and hitting the keyboard
    $('.modal').modal({
        backdrop: 'static',
        keyboard: false,
        show: false
    });

    $('#main-modal').modal({
        backdrop: 'static',
        keyboard: false,
        show: false
    });

    //Bug 390596: Disables autocomplete
    $("#search-input").autocomplete({
        disabled: true
    });

    InitializeHeaderSlider();

    if ($('#accent').length > 0) {
        $("#content-wrapper div div").first().addClass("first");
    }

    $(".btn-group-country .dropdown-menu li a").click(function () {
        $(".btn1:first-child").text($(this).text());
        $(".btn1:first-child").val($(this).text());
    });

    $(".btn-group-state .dropdown-menu li a").click(function () {
        $(".btn2:first-child").text($(this).text());
        $(".btn2:first-child").val($(this).text());
    });

    $(".acn-popover .top").popover({
        placement: 'top'
    });
    $(".acn-popover .top").popover('show');

    $("[rel='tooltip']").popover({
        placement: 'top',
        html: 'true',
        title: '' +
                '<button type="button" id="close" class="close close-popover">&times;</button>',
        content: ''
    }).on('shown.bs.popover', function () {
        var $popup = $(this);
        $(this).next('.popover').find('button.close-popover').click(function (e) {
            $popup.popover('hide');
        });
    });;;

    document.createElement('header');
    document.createElement('section');
    document.createElement('article');
    document.createElement('aside');
    document.createElement('nav');
    document.createElement('footer');

    //Enable swiping...
    //AddSwipeToCarousel(); transferred to ui.styleCore-engine.js for now

    //Transfered function to jumplink.js

    //$(window).scroll(function () {
    //    var activeNav = $('li.active');
    //    var currentsection = $('li.active > a').data("jump-link-number");

    //    //if (currentsection != "0") {
    //    //    $("#block-jumplink").css("display", "block")
    //    //}
    //    //else {
    //    //    $("#block-jumplink").css("display", "none")
    //    //}

    //    $("#current-navigation").html(currentsection);
    //    $("#jump-link-headline").html(activeNav.text());
    //});

    var jumbnavcount = $("#scrollspy > ul > li").length - 1;
    $("#total-navigation").html(jumbnavcount);

    $(document).ready(function () {
        InitializeBootstrapValidator();

        //Bug Fix for Bug 303345 - Page Headline and Sub-headline adjustment for docked first blocks
        if ($('.dock').length > 0) {
            $('.page-title').addClass('page-title-dock');
        }
    });

    //Fix for Bug:343313 - Webpart - Contact Us: Article Utility Control container should not be displayed.
    if ($('.placeholder').length == 0) {
        $('#toolbar-container').hide();
    } else if ($('.placeholder').length > 1 && $('.placeholder:has(.print)')) {
        //Bug 423966: Updated selector for social media sharing and how the toolbar-container is hidden for mobile and tablet resolutions.
        if ($('.social-likes_single-w').length == 0 && $('#DownloadModule').length == 0) {
            $('#toolbar-container').addClass("visible-lg");
            //if ($(window).width() <= 1024) {
            //$('#toolbar-container').hide();

            //} else { $('#toolbar-container').show(); }
        }
    }

    //Cookies Statements Alignment
    if ($('#announcement-carousel').length != 0) {
        $('#ui-wrapper').addClass('has-announcement-module');
    }
    // $('#cookie-disclaimer-long p').addClass('dotdot');

    if ($('.bottom-block-spacing').length > 0) {
        $('#ui-wrapper').addClass('has-bottom-block-spacing');
    }

    if ($('.top-block-spacing').length > 0) {
        $('#ui-wrapper').addClass('has-top-block-spacing');
    }
});

//set the callback url
$(window).unload(function () {
    if (typeof (Storage) !== "undefined") {
        sessionStorage.setItem("hashCallback", window.location.href);
    }
});

function closeButton() {
    $.sidr('close', 'main-menu');

    var buttoncollapse = $('.acn-icon-close');
    buttoncollapse.attr("class", "acn-icon acn-icon-nav-top-menu");
}

var activeSectionIndex = -1;

function changeHeaderSectionText(newName, newActiveCount) {
    //console.log('changeHeaderSectionText == ' + newActiveCount + 1);

    if (typeof newName != 'undefined') {
        $('#header-section-nav-text').text(newName);
        $('#activeSectionNo').text(newActiveCount + 1);
    }
}
//var fadeEffectHandler = null;

//function fadeSuccessMessage(control) {
//    //closest has-success
//    var form = $(control).closest('.has-success');

//    //check if it has one
//    if (form.length > 0) {
//        clearTimeout(fadeEffectHandler);
//        //find the success-message and animate it to fade.
//        fadeEffectHandler = setTimeout(function () {
//            form.find('.success-message').animate({ opacity: 0 }, 1400);
//        }, 100);
//    } else {
//        form.find('.success-message').css("opacity", 1);
//    }
//}

function scrollEventHandler() {
    //console.log('scrollEventHandler START');

    var screen_offset = $(window).scrollTop();
    var anchor_text_active = '';
    var anchor_index_active = -1;

    $('.block-title h2').each(function (index) {
        if (screen_offset + 100 >= $(this).offset().top) {
            anchor_text_active = $(this).text();
            anchor_index_active = index;
        }
    });

    //console.log('global.activeSectionIndex == ' + activeSectionIndex);
    //console.log('scrollEventHandler.anchor_index_active == ' + anchor_index_active);

    if (activeSectionIndex != anchor_index_active) {
        changeHeaderSectionText(anchor_text_active, anchor_index_active);
        activeSectionIndex = anchor_index_active;
    }
}

function scrollToAnchor(id) {
    //console.log('scrollToAnchor == ' + id);

    var aTag = $("#" + id);
    var newName = '';
    var scrollTop = $(window).scrollTop();
    var headerNav = $('#header-topnav').height();
    var blockOffset = $(aTag).offset().top;
    var editRibbon = 0;
    var addOffset = 18;

    if (typeof aTag != 'undefined' || typeof aTag.offset() != 'undefined') {
        if (!$(aTag).hasClass('c-ui-square')) {
            headerNav = 0;
            addOffset = 0;
        }

        if (document.getElementById('scWebEditRibbon') !== null) {
            editRibbon = $('#scWebEditRibbon').height();
        }

        $('html,body').animate({ scrollTop: blockOffset - (headerNav + editRibbon + addOffset) }, 750);
        newName = $(aTag).text();
    }

    //change header name
    if (id != 'block-hero' && id != 'block-footer') {
        changeHeaderSectionText(newName, activeSectionIndex);
    }
    else {
        changeHeaderSectionText("", -1);
    }
}

function ScrollSection(direction) {
    //console.log('ScrollSection == ' + direction);
    //console.log('activeSectionIndex = ' + activeSectionIndex);

    event.preventDefault();

    var newIndex = activeSectionIndex + direction;
    //console.log('newIndex = ' + newIndex);

    if (newIndex < 0) {
        //scroll to hero
        $(window).scrollTop(0)
        changeHeaderSectionText("", -1);
        return;
    }

    if (newIndex > $('.block-title h2').length - 1) {
        //scroll to footer
        //scrollToAnchor('block-footer');
        return;
    }

    activeSectionIndex = newIndex;
    //console.log('new_activeSectionIndex = ' + activeSectionIndex);

    scrollToAnchor(activeSectionIndex + '-block-title');

    //console.log('ScrollSection == END');
}

$(window).load(function () {
    //InitializeHeaderSlider();
    //InitializeSpotlightSlider();

    $('#layout-homepage').on('DOMMouseScroll mousewheel keyup keydown keypress', function (e) {
        scrollEventHandler();
    });

    $(document).keydown(function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 38 || code == 40) {
            scrollEventHandler();
        }
    });

    //total count
    //$('#totalSectionCount').text($('.block-title h2').length);
});

function isEditMode() {
    return $('html').hasClass('edit-mode');
}

//$(window).on('load resize', function () {
//    $('.ui-terminator').each(function (index) {
//        var xBorderWidth = $(this).parent().width();
//        var yBorderWidth = xBorderWidth * 106 / 260;
//        $(this).css({
//            'border-top-width': $(this).hasClass('top') ? yBorderWidth : 0,
//            'border-bottom-width': $(this).hasClass('bottom') ? yBorderWidth : 0,
//            'border-left-width': $(this).hasClass('left') ? xBorderWidth : 0,
//            'border-right-width': $(this).hasClass('right') ? xBorderWidth : 0,
//            'margin-top': $(this).hasClass('top') ? yBorderWidth * -1.25 : 0
//        });

//        //set previous
//        if (isEditMode()) {
//            var prev = $(this).parent('.term-after-image').prevUntil('.block').prev();
//            if (prev.length > 0 && prev.hasClass("block")) {
//                $(prev[prev.length - 1]).css('padding-bottom', yBorderWidth);
//            }

//            //set next
//            var next = $(this).parent('.term-after-image').nextUntil('.block').next();

//            if (next.length > 0 && next.hasClass("block")) {
//                $(next[next.length - 1]).css('margin-top', (yBorderWidth - 1) * -1);
//            }
//        }
//        else {
//            $(this).parent('.term-after-image').prev().css('padding-bottom', yBorderWidth);
//            $(this).parent('.term-after-image').next().css('margin-top', (yBorderWidth - 1) * -1);
//        }
//    });

//});

//////////////////////////
//BLOG INDUSTRY SELECTOR
//////////////////////////

function realWidth(obj) {
    var clone = obj.clone();
    clone.css("visibility", "hidden");
    $('body').append(clone);
    var width = clone.outerWidth();
    clone.remove();

    return width;
}

if (ComponentRegistry.BlogIndustrySelectorHeader) {
    $(document).ready(function () {
        //show selection
        var text = $('#block-blog-industry-selector .dropdown-menu a[href*="' + window.location.pathname + '"]').text();

        if (text.length > 0) {
            //show first selection
            $('#block-blog-industry-selector label').text(text);
        }

        //set offset height
        //var height = $('#header-topnav').outerHeight();
        //$('#block-blog-industry-selector').css('margin-top', height + 'px');
    });
}

//////////////////////////
//BLOG POST LIST
//////////////////////////

function isJSONBlogPostDataAvailable() {
    if (typeof _dataBlogPostList != 'undefined')
        return true;

    return false;
}

function getJSONBlogPostData() {
    return _dataBlogPostList['GetBlogPosts-return']['blog-post-list']['posts'];
}

function getJSONBlogPostDataFeatured() {
    return _dataBlogPostList['GetBlogPosts-return']['blog-post-list']['posts-featured'];
}

function bindBlogPosts(JSONposts) {
    //featured
    $(".module-blog-featured-post > div").loadTemplate($('.module-blog-featured-post .json-template'), getJSONBlogPostDataFeatured());

    //non featured
    $(".module-blog-post-list ul").loadTemplate($('.module-blog-post-list .json-template'), JSONposts);
    $('.module-blog-post-list ul li:lt(4)').removeClass('hidden-xs'); //show only first 4 on mobile
}

if ((ComponentRegistry.BlogPostList || ComponentRegistry.BlogArchiveList) && isJSONBlogPostDataAvailable()) {
    $(window).ready(function () {
        //INIT
        bindBlogPosts(getJSONBlogPostData());

        //EVENT HANDLERS
        //add show more button event handler
        $('.module-blog-post-list button').click(function (event) {
            event.preventDefault();

            $('.module-blog-post-list ul li[class=hidden-xs]').removeClass('hidden-xs');

            $(this).addClass('clicked');
        });

        var url = window.location.href;
        var arr = url.split("/");
        var result = arr[0] + "//" + arr[2];

        $('.social-likes-post').each(function () {
            $(this).attr('data-url', result + $(this).attr('data-url'));
        });

        $('.social-likes-post').socialLikes();

        BlogPostListAuthors();
        BlogPostTags();
        BlogPostArchiveYears();
    });
}

//////////////////////////
//BLOG POST LIST - AUTHORS
//////////////////////////
function isJSONBlogPostAuthorDataAvailable() {
    if (typeof _dataBlogPostList != 'undefined')
        return true;

    return false;
}

function getJSONBlogPostAuthorData() {
    return _dataBlogPostList['GetBlogPosts-return']['author-list'];
}

function bindBlogAuthors() {
    //load authors
    $("#author-carousel .carousel-inner").loadTemplate($('.module-blog-authors .json-template'), getJSONBlogPostAuthorData());

    //create nav
    var indicators = "";
    for (ctr = 0; ctr < $("#author-carousel .carousel-inner .item").length; ctr++) {
        indicators += '<li data-target="#author-carousel" data-slide-to="' + ctr + '"></li>';
    }
    $("#author-carousel .carousel-indicators").html(indicators);

    //set first author as active
    $("#author-carousel .carousel-inner .item:eq(0)").addClass('active');
    $("#author-carousel .carousel-indicators li:eq(0)").addClass('active');

    //generate author pop up content
    $(".module-blog-authors .author-full-bio").loadTemplate($('.module-blog-authors .json-template-fullbio'), getJSONBlogPostAuthorData());
}

function BlogPostListAuthors() {
    //INIT
    bindBlogAuthors();

    //EVENT HANDLERS
    //add author show full bio event handler
    $('.module-blog-authors a.cta').click(function (event) {
        event.preventDefault();

        //get index of author
        var index = $('#author-carousel .item.active').index();

        //ready pop up HTML content
        var content = $('.author-full-bio > div:eq(' + index + ')').html();

        //change pop up content
        $('#main-modal .modal-body').html(content);

        //show pop up content
        $('#main-modal').modal('show');
    });
}

if ((ComponentRegistry.BlogPostAuthors || ComponentRegistry.BlogArchiveAuthor) && isJSONBlogPostAuthorDataAvailable()) {
    $(window).ready(function () {
        BlogPostListAuthors();
    });
}

//////////////////////////
//BLOG POST LIST - TAGS
//////////////////////////

function isJSONBlogPostTagDataAvailable() {
    if (typeof _dataBlogPostList != 'undefined')
        return true;

    return false;
}

function getJSONBlogPostTagData() {
    return _dataBlogPostList['GetBlogPosts-return']['tag-list'];
}

function bindBlogTags() {
    $(".module-blog-tags ul").loadTemplate($('.module-blog-tags .json-template'), getJSONBlogPostTagData());
}

function BlogPostTags() {
    //INIT
    bindBlogTags();

    //EVENT HANDLERS
    //add tag event handler
    //$('.module-blog-tags a').click(function (event) {
    //    //event.preventDefault();
    //});
}

if ((ComponentRegistry.BlogPostTags || ComponentRegistry.BlogArchiveTags) && isJSONBlogPostTagDataAvailable()) {
    $(window).ready(function () {
        BlogPostTags();
    });
}

//////////////////////////
//BLOG POST LIST - ARCHIVE YEARS
//////////////////////////
function isJSONBlogPostYearDataAvailable() {
    if (typeof _dataBlogPostList != 'undefined')
        return true;

    return false;
}

function getJSONBlogPostYearData() {
    return _dataBlogPostList['GetBlogPosts-return']['year-published-list'];
}

function bindBlogArchiveYears() {
    $(".module-blog-archive ul").loadTemplate($('.module-blog-archive .json-template'), getJSONBlogPostYearData());

    //add ALL
    $(".module-blog-archive ul").append('<li><a href="#" title="Show All">Show All</a></li>');
}

function filterPostsByYear(year) {
    if (year == 'Show All') {
        $('.module-blog-featured-post').removeClass('hidden');
        return getJSONBlogPostData();
    } else {
        $('.module-blog-featured-post').addClass('hidden');
        return $.grep(getJSONBlogPostData(), function (element, index) {
            return element.dateYear == year;
        });
    }
}

function BlogArchiveYears() {
    //INIT
    bindBlogArchiveYears();

    //EVENT HANDLERS
    //add archive event handler
    $('.module-blog-archive a').click(function (event) {
        event.preventDefault();

        var year = $(this).text();

        bindBlogPosts(filterPostsByYear(year));

        $('.social-likes-post').socialLikes();
    });
}

if (ComponentRegistry.BlogPostListArchiveYears && isJSONBlogPostYearDataAvailable()) {
    $(window).ready(function () {
        BlogArchiveYears();
    });
}

function BlogPostArchiveYears() {
    //INIT
    bindBlogArchiveYears();

    //EVENT HANDLERS
    //add archive event handler
    $('.module-blog-archive a').click(function (event) {
        event.preventDefault();

        var year = $(this).text();
        var author = '';
        //var author = document.getElementById("author-name").innerText.replace(/ /g, "%20");
        if ($('#authorId').length == 1) {
            author = $('#authorId').val().replace(/ /g, "%20"); //document.getElementById("author-name").innerText.replace(/ /g, "%20");
        }
        else {
            var authors = $('#authorId').map(function () { return $(this).text(); });//.val().replace(/ /g, "%20");
        }
        var path = location.pathname;
        path = path.substr(0, path.indexOf("/", 1));
        if (path == "") {
            path = "/" + $('#currentSite').val();
        }
        window.open(location.protocol + "//" + location.hostname + path + "/home/blogs/blogarchive?year=" + year + "&author=" + author, "_self");
    });
}

if ((ComponentRegistry.BlogPostArchiveYears || ComponentRegistry.BlogArchiveYears) && isJSONBlogPostYearDataAvailable()) {
    $(window).ready(function () {
        BlogPostArchiveYears();
    });
}

//////////////////////////
//BLOG POST - MULTI SUBJECT - AUTHORS
//////////////////////////

if (ComponentRegistry.BlogPostMultipleSubjectAuthors) {
    $('#author-carousel').on("click", ".module-body a, .item-sm > a", function (event) {
        event.preventDefault();

        //get index of author
        var index = $(this).attr('href').substring('1');

        //ready pop up HTML content
        var content = $('.author-full-bio > div:eq(' + index + ')').html();

        //change pop up content
        $('#main-modal .modal-body').html(content);

        //show pop up content
        $('#main-modal').modal('show');
    });
}

//TALENT SEGMENT SELECTOR
//if (ComponentRegistry.TalentSegmentSelector) {
//    $(document).ready(function () {
//        //EVENT
//        //bind event publisher
//        $('#talent-segment-selector .dropdown-menu a').bind('click', function (event) {
//            event.preventDefault();

//            //change text
//            $('#talent-segment-selector .text').text($(this).text());

//            //raise event
//            $('#talent-segment-selector').trigger('talentSegmentSelector_change', [($(this).attr('data-search-value'))]);
//        });

//        //event subscriber sample
//        //$('#talent-segment-selector').on('talentSegmentSelector_change', function (event, val) {
//        //    event.preventDefault();
//        //    alert('talentSegmentSelector_change, search value == ' + val);
//        //});
//    });
//}

function SetTalentSegmentSelectorValue(value) {
    if (ComponentRegistry.TalentSegmentSelector) {
        //find text of value on list
        var text = $('#talent-segment-selector .dropdown-menu a[data-search-value="' + value + '"]').eq(0).text();

        $('#talent-segment-selector .text').text(text.substring(0, 30));
    }
}

///////////////////////////////////////////////////////////////////////////////
//START EVENT CALENDAR
///////////////////////////////////////////////////////////////////////////////

Date.prototype.addDays = function (days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}

Date.prototype.addMonths = function (months) {
    var dat = new Date(this.valueOf());
    dat.setMonth(dat.getMonth() + months);
    return dat;
}

//removed: redundant. in stylecore.engine as well
//function replaceAll(find, replace, str) {
//    return typeof str == 'undefined' || str == null ? '' : str.replace(new RegExp(find, 'g'), replace);
//}

//gets a week's starting Sunday based on a given date. This assumes Sun to Sat format
function GetWeekSundayDate(dateFrom) {
    return dateFrom.addDays(dateFrom.getDay() * -1);
}

function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 11;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months;
}

function wsCall(wsUrl, wsCallback) {
    $.getJSON(wsUrl, wsCallback);
}

function getLastDayOfMonth(month, year) {
    return new Date(year, month + 1, 0);
}

//END EVENT CALENDAR

//////////////////////////
//BLOG POST - RECENT POSTS
//////////////////////////

function isJSONBlogRecentPostDataAvailable() {
    if (typeof _dataBlogPostList != 'undefined')
        return true;

    return false;
}

function getJSONBlogRecentPostData() {
    return _dataBlogPostList['GetBlogPosts-return']['recentpost-list'];
}

function bindBlogRecentPosts() {
    $(".module-blog-recent ul").loadTemplate($('.module-blog-recent .json-template'), getJSONBlogRecentPostData());
    if ($(".module-blog-recent ul li").length == 0) {
        $(".module-blog-recent").hide();
    }
}

if (ComponentRegistry.AuthorRecentPosts && isJSONBlogRecentPostDataAvailable()) {
    $(window).ready(function () {
        //INIT
        bindBlogRecentPosts();

        //EVENT HANDLERS
        //add tag event handler
        //$('.module-blog-recent a').click(function (event) {
        //    event.preventDefault();
        //});
    });
}

//////////////////////
//TEAM MEMBERS MODULE
/////////////////////

if (ComponentRegistry.TeamMembersModule) {
    $('.cta.member-fullbio').click(function (event) {
        event.preventDefault();

        //get index of author
        var index = $(this).attr('href').substring('1');

        //ready pop up HTML content
        var maincontent = $('.member-fullbio').parents('.col-sm-4.member-index-' + index).html();

        $('.member-item-header').empty();
        $('.member-item-header').append($(maincontent).filter('img'));

        $('.member-item-details').empty();
        $('.member-item-details').append($(maincontent).children());

        //Remove short description and show full biography.
        $('.member-item-details .shortdescription').remove();
        $('.member-item-details .fullbiography').removeClass('hidden');

        //Remove Full bio link
        $('.member-item-details a.cta.member-fullbio').remove();

        //change header text.
        $('h4#myModalLabel.modal-title').text('Member');

        var membermodalcontent = $('#member-item-modal');
        $(membermodalcontent).removeClass('hidden');

        //change pop up content
        $('#main-modal .modal-body').html(membermodalcontent);

        //show pop up content
        $('#main-modal').modal('show');
    });
}

function placeholderIsSupported() {
    var test = document.createElement('input');
    return ('placeholder' in test);
}

if (!placeholderIsSupported()) {
    $('input, textarea').placeholder();
}

//Bug 437929 Collection of R1.1 requirements that's in scope for R1.2 & Tracking of scope changes: Podcast module - Podcast icon is not consistent with the spec design
if (typeof limelightPlayerCallback != 'function') {
    window.limelightPlayerCallback = function (playerId, eventName, data) {
        if (typeof customLimelightPlayerCallback == 'function') {
            window.customLimelightPlayerCallback(playerId, eventName, data);
        }

    }
}

// 1/14 Merge Main Release: Changeset 724330 to 728897
// Bug # 302043 : Careers Meet Our People: Video is not display in the page upon clicking of Play button. Big # 339844
var currentDuration, totalDuration;
function customLimelightPlayerCallback(playerId, eventName, data) {
    var isThumbnailPresent = false;
    if ($(document.getElementById(playerId)).parent().siblings("#media-video-thumbnail").children('.acn-icon') && isMobile())
        isThumbnailPresent = true;

    if (eventName == 'onPlayerLoad' && (document.getElementById(playerId).getPlayers() == null || document.getElementById(playerId).getPlayers().length == 0)) {
        document.getElementById(playerId).registerPlayer(playerId);
    }
    var $podCastItem = $("div[data-podcast-video-player-id='" + playerId + "']");

    switch (eventName) {
        case 'onMediaComplete':

            var mediaGalleryBlock = $('.media-gallery');
            mediaGalleryBlock.find('.video-container a').html(mediaGalleryBlock.attr("data-watch-link")).css("text-decoration", "");
            mediaGalleryBlock.find('.video-container a').parent().css("pointer-events", "");
            mediaGalleryBlock.removeClass('firstPlay');

            //Video is for Block Background
            if ($podCastItem.length > 0) {
                $podCastItem.find(".podcast-play-pause").click();
            }
            else {
                var isAutoLoop = $('#' + playerId).find('param[name="autoLoop"]').val();
                if (isAutoLoop != undefined) {
                    if (isAutoLoop.toLowerCase() == "true") {
                        //document.getElementById(playerId).doPlay();
                        playVideo(playerId);
                    }
                    else {
                        var playerParent = $('#' + playerId).parent().parent().parent().data('content-id')
                        var parentBlocId = playerParent + 'Video';
                        $('#' + parentBlocId + ' #play').show();
                        $('#' + parentBlocId + ' #pause').hide();
                        $('#' + parentBlocId + ' #playPauseIcon').removeClass("icon-pause");
                        $('#' + parentBlocId + ' #playPauseIcon').addClass("icon-play");
                    }
                    break;
                }

                //Video is for Media Player Module
                var parent = $('#' + playerId).closest('.media-container');
                if (parent.find('#media-video-thumbnail').length > 0 && parent.find('.DisplayOverlay').length <= 0) {
                    parent.find('.LimelightEmbeddedPlayer').hide();
                    parent.find('#media-video-thumbnail').show();
                    $('#' + playerId).find('param[name="state"]').val("");
                }
            }

            //Video is for MOP
            if (typeof ComponentRegistry.EmployeeProfileGallery != 'undefined' && ComponentRegistry.EmployeeProfileGallery) {
                doOnPlayStateChanged(data, playerId);
            }
            break;
        case 'onMediaLoad':
            if (ComponentRegistry.Podcast) {
                var $podcastElement = $('.podcast-audio');
                var $podcastElementPlayPause = $('.podcast-audio .podcast-play-pause');

                if ($podcastElement.length > 0) {
                    var vid, podcastPlayerId;
                    $podcastElement.parent().find('.media-container').addClass("podcast-audio-media-container");

                    if ($podcastElementPlayPause.length > 0) {
                        podcastPlayerId = $podcastElementPlayPause.parent().data('podcast-video-player-id');
                        document.getElementById(podcastPlayerId).doSetVolume(1);
                        $podcastElementPlayPause.click(function () {
                            //Get the parent container...
                            var $this = $(this);
                            var $podcastAudio = $this.closest("div.podcast-audio");

                            vid = document.getElementById(podcastPlayerId);

                            //prepend h_
                            if ($('#' + podcastPlayerId).length <= 0) {
                                podcastPlayerId = "h_" + podcastPlayerId;
                            }

                            $('#' + podcastPlayerId).find('param[name="state"]').val("isPlaying");

                            var state = vid.doGetCurrentPlayState();
                            if ($podcastAudio.hasClass("playing")) {
                                $podcastAudio.removeClass("playing");
                                vid.doPause();
                            }
                            else {
                                $podcastAudio.addClass("playing");
                                vid.doPlay();
                            }

                            //Bug 437929 Collection of R1.1 requirements that's in scope for R1.2 & Tracking of scope changes: Podcast module - Podcast icon is not consistent with the spec design
                            var $podcastSlider = $this.next().find('.podcast-slider.ui-slider-horizontal');
                            $podcastSlider.find("a.ui-slider-handle").bind('touchend mouseup', function () {
                                vid.doSeekToSecond(convertToSeconds($podcastSlider.slider("value")));
                            });
                            $podcastSlider.bind('touchend mouseup', function () {
                                vid.doSeekToSecond(convertToSeconds($podcastSlider.slider("value")));
                            });

                            //Volume
                            var $volumeSlider = $this.siblings('.volume-slider');
                            $volumeSlider.on("slidechange", function (event, ui) {
                                vid.doSetVolume(findVolume($volumeSlider.slider("value")));
                                if ($volumeSlider.slider("value") > 0) {
                                    $(".podcast-mute").addClass("hide");
                                    $(".icon-unmute-lg").removeClass("hide");
                                }
                                else {
                                    $(".icon-unmute-lg").addClass("hide");
                                    $(".podcast-mute").removeClass("hide");
                                }
                            });
                            $(".icon-unmute-lg").click(function () {
                                $volumeSlider.removeClass("hide");
                                $volumeSlider.slider("value", 0);
                            });
                            $(".podcast-mute").click(function () {
                                $volumeSlider.removeClass("hide");
                                $volumeSlider.slider("value", 100);
                            });
                            $(document).mouseup(function (e) {
                                var container = $(".volume-slider,.icon-unmute-lg,.podcast-mute");
                                if (!$volumeSlider.is(e.target) // if the target of the click isn't the container...
                                    && !$volumeSlider.hasClass("hide")
                                    && $volumeSlider.has(e.target).length === 0) // ... nor a descendant of the container
                                {
                                    $volumeSlider.addClass("hide");
                                }
                            });
                        });

                        $podcastElementPlayPause.removeClass("hidden");

                        function volumeToggle(vid, volumeSlider, volumeValue) {
                            volumeSlider.slider("value", volumeValue);
                        }

                        function sliderTimer(currentDuration) {
                            var totalSec = currentDuration / 1000,
                                hours = parseInt(totalSec / 3600) % 24,
                                minutes = parseInt(totalSec / 60) % 60,
                                seconds = totalSec % 60;
                            seconds = Math.round(seconds);
                            //With Hours
                            //result = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
                            var result = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
                            return result;
                        }
                        function convertToSeconds(currentDuration) {
                            var seconds = currentDuration / 1000;
                            return Math.round(seconds) + 1;
                        }
                        function findVolume(currentPlace) {
                            return currentPlace / 100;
                        }
                    }
                }
            }

            if (playerId.indexOf('blockcarousel_bg_limelight_player_') >= 0) {
                var v = document.getElementById(playerId);
                if (v != null && $(v).closest('.item').hasClass('autoplay')) {
                    v.doPlay();
                    break;
                }
            }

            var state = $('#' + playerId).find('param[name="state"]').val();
            if ($podCastItem.length > 0) {
                totalDuration = sliderTimer(data.durationInMilliseconds);
                $podCastItem.find(".podcast-slider.ui-slider-horizontal").slider({
                    range: "min",
                    value: 0001,
                    min: 0001,
                    max: data.durationInMilliseconds,
                    slide: function (event, ui) {
                    }
                });
                $podCastItem.find(".volume-slider").slider({
                    orientation: "vertical",
                    range: "min",
                    value: 100,
                    min: 0,
                    max: 100,
                    slide: function (event, ui) {
                    }
                });
                $podCastItem.find('.podcast-timer').html("0.00 / " + totalDuration);
            }
            if (state == "isPlaying")
                //document.getElementById(playerId).doPlay();
                playVideo(playerId);

            //after object is transformed to .limelight-player-footprint, perform resizeVideo
            if (ComponentRegistry.MediaPlayer) {
                resizeVideo();
            }
            if (isThumbnailPresent)
                checkThumbnail(playerId, eventName);
            break;

        case 'onPlayheadUpdate':
            if ($podCastItem.length > 0) {
                totalDuration = sliderTimer(data.durationInMilliseconds);
                currentDuration = sliderTimer(data.positionInMilliseconds);
                $podCastItem.find(".podcast-slider.ui-slider-horizontal").slider("value", data.positionInMilliseconds);
                $podCastItem.find('.podcast-timer').html(currentDuration + " / " + totalDuration);
            }
            break;
            //case 'onPlayStateChanged':
            //    if (typeof ComponentRegistry.EmployeeProfileGallery != 'undefined' && ComponentRegistry.EmployeeProfileGallery) {
            //        doOnPlayStateChanged(data, playerId);
            //    }
            //    break;

        default:
            if (isThumbnailPresent)
                checkThumbnail(playerId, eventName);
            break;
    }
}


function checkThumbnail(playerId, eventName) {
    var playerParent = document.getElementById(playerId);
    var playIcon = $(playerParent).parent().siblings("#media-video-thumbnail");

    if (eventName == "onMediaLoad") {
        $(playIcon).children('.acn-icon').show()
    }
    else {
        $(playIcon).children('.acn-icon').hide()
    }
}

function playVideo(playerId) {
    try {
        var vid2 = document.getElementById(playerId).getElementsByTagName('video')[0];
        if (vid2.paused)
            vid2.play();
        else
            vid2.pause();
    } catch (e) {
        document.getElementById(playerId).doPlay();
    }
}

function doOnPlayStateChanged(e, pid) {
    //Bug302043 Careers Meet Our People: Video is not display in the page upon clicking of Play button.
    if (!e.isPlaying && !e.isBusy) {
        $("#" + pid + "-overlay").css("visibility", "visible");
        $("#" + pid + "-play").css("visibility", "visible");
        $("#" + pid + "-play").closest(".mop-vid").removeClass('playing');
    }
}
function limitText(limitField, limitCount, limitNum) {
    //[2/18/15] Merge 1/29 from Main Release Branch
    //if (limitField.value.length > limitNum) {
    //    limitField.value = limitField.value.substring(0, limitNum);
    //} else {
    //    limitCount.value = limitNum - limitField.value.length;
    var $textArea = $('#' + limitField);
    var $counter = $('#' + limitCount);
    var maxCount = Number(limitNum);
    if ($textArea.val().length > maxCount) {
        $textArea.val($textArea.val().substring(0, maxCount));
        var evt = this.event || window.event; // IE compatibility
        if (evt.preventDefault) {
            evt.preventDefault();
        } else {
            evt.returnValue = false;
            evt.cancelBubble = true;
        }
    }
    if ($textArea.val() == $('#commentContent').val()) {
        $counter.val(maxCount - $textArea.val().length + " " + $('#commentContent').attr('data-characters-remaining'));
    }
    else {
        $counter.val(maxCount - $textArea.val().length);
    }
}

//returns true if page is in Sitecore's Preview mode.
function isPreviewMode() {
    return ($('#scCrossPiece').length > 0 && $("#scFieldValues").length == 0);
}

//Cookies alignment

$(window).resize(function () {
    if ($('#announcement-carousel').length != 0) {
        $('#ui-wrapper').addClass('has-announcement-module');
    }
});

// LINE CLAMPING

// added reusable function
// SIR #433133: Webpart - Business Services Module: in US-EN page, the artilces pulled in to the page are NOT arranged properly.
function PackeryDynamicFeaturedArticle() {
    var container = document.querySelectorAll('.packery-container');
    if (container != null && container != undefined) {
        $.each(container, function () {
            var packery = new Packery(this, {
                containerStyle: null,
                itemSelector: '.packery-item'
            });
        });
    }
    return false;
}

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

function InitializeBootstrapValidator() {
    if ($(document).bootstrapValidator) {
        if ($('.acn-form').length > 0) {
            $('.acn-form').bootstrapValidator({
                submitHandler: function (validator, form, submitButton) {
                    // remove undefined 'control'
                    //var form = $(control).closest('form');
                    //if (form > 0) {
                    //    form.find('.has-success .success-message').css("opacity", 1).animate({ opacity: 0 }, 1500);
                    //}
                },
                feedbackIcons: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                }
            });
        }
    }
}

var packeryResizeTimeoutHandle = null;
$(document).ready(function () {
    //Bug 465653: Fix for framekiller. Will only be implemented on Live Pages
    if ((typeof isNormal !== "undefined") && (isNormal != "")) {
        if (isNormal == "true") {
            if (top.location.hostname != self.location.hostname) {
                top.location = self.location
            }
        }
    }

    packeryResizeTimeoutHandle = window.setTimeout(function () {
        // refresh packery
        PackeryDynamicFeaturedArticle();
    }, 800);

    //MGDL 10.29.2014
    //[BUG#337547] - Collection of R1.1 requirements that's in scope for R1.2 & Tracking of scope changes - Careers MOP: Add Photo/Video and Add Pull Quote buttons not working
    var onboardingpage = $('.onboarding');
    if (onboardingpage.length == 0) {
        var packeryContainer = $('.packery-container');
        var isPageEditor = $('#webedit');

        if (typeof packeryContainer != 'undefined' && packeryContainer.length > 0 && isPageEditor.length == 0) {
            packeryContainer.moduleClamping({
                moduleSelector: ".module-article",
                titleSelector: "h4",
                bodySelector: ".module-body",
                titleMaximumRowCount: 3,
                bodyMaximumRowCount: 3,
                totalMaximumRowCount: 5,
                mouseOver: 'expand',
                onMouseOver: function () {
                    // refresh packery
                    PackeryDynamicFeaturedArticle();
                },
                onMouseOut: function () {
                    // refresh packery
                    PackeryDynamicFeaturedArticle();
                }
            });
            $(window).on('load', function () {
                $('.packery-container .module-article').addClass('disable-link-analysis');

                if (isDesktop() && !IsTouch()) {
                    $('.packery-container .module-article').trigger('mouseenter').trigger('mouseleave');
                }
                else {
                    $('.packery-container .module-article').addClass('mouse-entered-onload');
                    $('.packery-container .module-article').trigger('click').trigger('click');
                    $('.packery-container .module-article').removeClass('mouse-entered-onload');
                }

                $('.packery-container .module-article').removeClass('disable-link-analysis');
            });

        }
    }
    $(window).resize(function () {
        clearTimeout(packeryResizeTimeoutHandle);
        packeryResizeTimeoutHandle = window.setTimeout(function () {
            // refresh packery
            PackeryDynamicFeaturedArticle();
        }, 100);
    });

    $(window).load(function () {
        clearTimeout(packeryResizeTimeoutHandle);
        packeryResizeTimeoutHandle = window.setTimeout(function () {
            // refresh packery
            PackeryDynamicFeaturedArticle();
        }, 100);
    });

    //[BUG#318584] - Layouts for top level pages on accenture.com: Clamping approach for the FeaturedSection module is not working on the page
    var clampFeaturedSection = $('.clamp-featured-section');
    if (typeof clampFeaturedSection != 'undefined' && clampFeaturedSection.length > 0) {
        clampFeaturedSection.moduleClamping({
            moduleSelector: ".module-article",
            titleSelector: "h4",
            bodySelector: "p",
            titleMaximumRowCount: 3,
            bodyMaximumRowCount: 3,
            totalMaximumRowCount: 5,
            mouseOver: 'expand',
            onMouseOver: function () { },
            onMouseOut: function () { }
        });
    }
});
//returns true if page is in Sitecore's Preview mode.
function isPreviewMode() {
    return ($('#scCrossPiece').length > 0 && $("#scFieldValues").length == 0);
}

var isMobileDevice = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (isMobileDevice.Android() || isMobileDevice.BlackBerry() || isMobileDevice.iOS() || isMobileDevice.Opera() || isMobileDevice.Windows());
    }
};

var tagBody = '(?:[^"\'>]|"[^"]*"|\'[^\']*\')*';

var tagOrComment = new RegExp(
    '<(?:'
    // Comment body.
    + '!--(?:(?:-*[^->])*--+|-?)'
    // Special "raw text" elements whose content should be elided.
    + '|script\\b' + tagBody + '>[\\s\\S]*?</script\\s*'
    + '|style\\b' + tagBody + '>[\\s\\S]*?</style\\s*'
    // Regular name
    + '|/?[a-z]'
    + tagBody
    + ')>',
    'gi');
function removeTags(html) {
    if (html) {
        var oldHtml;
        do {
            oldHtml = html;
            html = html.replace(tagOrComment, '');
        } while (html !== oldHtml);
        return html.replace(/</g, '');
    }
    return "";
}

$(document).ready(function () {
    RemoveDuplicateID('#SSOErrorID');
    var err = '';
    var ErrorID = $('#SSOErrorID');
    if (ErrorID != undefined && ErrorID.length > 0) {
        err = ErrorID.val();
        if (err == '1')//Social.Error.Email.Used
            $('#SocialEmailModal').modal('show');//continue button redirect to registration
        else if (ComponentRegistry.ClientEditProfile || ComponentRegistry.EditProfile || ComponentRegistry.ClientAccount) {
            if (err == '0')//Social.Error.Duplicate
                $('#SocialMediaModal').modal('show');
        }
        else if (ComponentRegistry.Registration) {
            if (err == '2' || err == '0')//SocialConnect.Error.Email.Used & Social.Error.Duplicate
                $('#SocialMediaModal').modal('show');//continue button close the modal
        }
    }

    var vp = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var w = vp < 768 ? 95 : (vp < 1000 ? 110 : 120);
    $('.map area.first').attr("coords", "0,0," + w + ",50");
    $('.map area.second').attr("coords", +w + ",0,300,50");
});

$(window).on('load', function () {
    $('.social-likes__button.social-likes__button_single').on("click", function () {
        $(this).closest('.packery-item').css("overflow", "visible");
    });
});