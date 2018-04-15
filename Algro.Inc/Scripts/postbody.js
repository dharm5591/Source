
    var viewPortWidth, deviceHeight, backDropTablet = $(".back-drop-tablet"),
        countrySelectorCont = $(".utility-nav .country-form"),
        mobileShowToggle = "show-sub-menu",
        nav = $(".nav-content .nav-submenu"),
        navContainer = $(".nav-content"),
        navIcon = $("#nav-icon"),
        navLabel = $("div.nav-submenu-label[data-parent= #navigation-menu]"),
        toggleCountryList = "show-country-list",
        varSearchBody = $("#search-body .search-body-wrapper"),
        divContainer = $(".secondary-navs"),
        acnLogoContainer = $(".acn-logo-container"),
        documentClick = $(document),
        navMenu = $("#navigation-menu"),
        menuFooter = $("#menuFooter"),
        tertiaryContainer = $(".secondary-item"),
        groupTitle = $("li.col-sm-12.secondary-item"),
        tertiaryClose = $(".nav-submenu-label-L3"),
        tertiaryNav = $("#tertiaryNav"),
        primaryNav = $(".primary-nav"),
        secondContactLink = $("#second-contact-link"),
        tertiaryListContainer = $("#tertiaryListContainer"),
        subMenuLabel = $(".nav-submenu-label"),
        isClosed = !1,
        lastListChild = $('.secondary-navs[aria-expanded="true"]'),
        userLinks = $(".signin-container"),
        item = $(".layout-column #multiple-l3");
    $(document).ready(function() {
        viewPortWidth = $(document).width();
        deviceHeight = $(window).height();
        globalHeader.init()
    });
    window.addEventListener("orientationchange", function() {
        setTimeout(function() {
            viewPortWidth = $(document).width();
            deviceHeight = $(window).height();
            globalHeader.init();
            showHideSecondaryNav.restoreSecondaryNav();
            jsUtility.isTablet() || jsUtility.isMobile() || navMenu.children().removeClass("hidden")
        }, 300)
    }, !1);
var
    globalHeader = function () {
        var pageContext = "";
            function s() {
                var f = h(),
                    l = document.location.href.toLowerCase(),
                    n = [],
                    e, u, o, s, c;
                if (f != "null" && f != null && typeof f != "undefined" && f.length > 0) {
                    for (e = JSON.parse(f), u = 0; u < e.GeoGroup.length; u++)
                        for (o = 0; o < e.GeoGroup[u].CountryGroup.length; o++)
                            for (s = 0; s < e.GeoGroup[u].CountryGroup[o].CountryList.length; s++) n.push(e.GeoGroup[u].CountryGroup[o].CountryList[s]);
                    n.sort(function(n, t) {
                        var i = n.CountryName,
                            r = t.CountryName;
                        return i == r ? 0 : i > r ? 1 : -1
                    });
                    r(n)
                } else c = "/api/sitecore/CountrySelectorModule/GetCountrySelectorData", $.ajax({
                    type: "GET",
                    url: c,
                    contentType: "application/json; charset=utf-8",
                    data: {
                        pageContext: pageContext
                    },
                    dataType: "json",
                    async: !0,
                    cache: !0,
                    error: function() {
                        console.error("Error while trying to get Geo Group List.")
                    },
                    success: function(u) {
                        var s, f, e, o;
                        if (u.GeoGroup != null && u.GeoGroup != "") {
                            if (u.GeoGroup.length > 0) {
                                for (typeof Storage != "undefined" && (s = {
                                        GeoGroup: u.GeoGroup,
                                        DateCreated: (new Date).getTime()
                                    }, l.indexOf("/careers") >= 0 ? localStorage.setItem(t, JSON.stringify(s)) : localStorage.setItem(i, JSON.stringify(s))), f = 0; f < u.GeoGroup.length; f++)
                                    for (e = 0; e < u.GeoGroup[f].CountryGroup.length; e++)
                                        for (o = 0; o < u.GeoGroup[f].CountryGroup[e].CountryList.length; o++) n.push(u.GeoGroup[f].CountryGroup[e].CountryList[o]);
                                n.sort(function(n, t) {
                                    var i = n.CountryName,
                                        r = t.CountryName;
                                    return i == r ? 0 : i > r ? 1 : -1
                                });
                                r(n)
                            }
                        } else console.error("Page Context is not set.")
                    }
                })
            }

            function h() {
                var r = document.location.href.toLowerCase();
                return typeof Storage != "undefined" && (n = r.indexOf("/careers") >= 0 ? localStorage.getItem(t) : localStorage.getItem(i), n != null && Date.now() - JSON.parse(n).DateCreated > 864e5) ? (r.indexOf("/careers") >= 0 ? localStorage.removeItem(t) : localStorage.removeItem(i), null) : n
            }

            function r(n) {
                for (var u, f, e, o, i = "", s = "/" + window.location.pathname.split("/")[1], r = "", h = document.location.href.toLowerCase(), t = 0; t < n.length; t++)
                    if (u = n[t].CountryDotcomUrl, f = n[t].LanguageTitle, s == u) {
                        r = '<li class="default">Default (' + f + ") <\/li > ";
                        break
                    } else r = '<li class="default">Default (English) <\/li > ';
                for (e = '<li class="dropdown-header ucase">All COUNTRIES &amp; LANGUAGES<\/li>', i = '<ul type="none" role="menu">', i += r, i += e, o = h.indexOf("/careers") >= 0 ? "/careers" : "", t = 0; t < n.length; t++) {
                    var c = n[t].CountryName,
                        u = n[t].CountryDotcomUrl + o,
                        f = n[t].LanguageTitle;
                    i += '<li><a href="' + u + '" role="list" data-linktype="language">' + c + " (" + f + ")<\/a><\/li>"
                }
                i += "<\/ul>";
                $("#location-recommendation").html(i)
            }
            var u = function() {
                    f();
                    $(".search-icon-container.search-trigger").length == 0 && e();
                    o()
                },
                f = function() {
                    var u = null,
                        f = $(".country-select-cont"),
                        n = $(".ie .nav-content .secondary-navs"),
                        t = $(".ie #block-header-new .primary-nav"),
                        i = $(".ie #block-header-new .utility-nav"),
                        r = $(".ie #block-header-new .navbar-background"),
                        e = $(".ie .nav-content .nav-submenu.panel"),
                        o = $(".ie .cookie-nav .disclaimer-close-btn.close");
                    secondContactLink.html(menuFooter.children().clone());
                    jsUtility.isTablet() && !jsUtility.isMobile() ? (divContainer.removeClass("hidden"), navContainer.addClass("hidden"), navIcon.hasClass("open") && (navIcon.removeClass("open"), showHideSecondaryNav.hideBackDrop(), navContainer.removeClass("crawl-right")), backDropTablet.click(function() {
                        showHideSecondaryNav.hideBackDropOnClick()
                    })) : (divContainer.addClass("hidden"), navContainer.removeClass("hidden"));
                    jsUtility.isMobile() && divContainer.removeClass("hidden");
                    $(document).click(function(n) {
                        $(".popover").hasClass("show") && $(n.target).closest("#block-header").length === 0 && $(".popover").removeClass("show")
                    });
                    e.click(function() {
                        var u = $(".cookie-nav");
                        n.length > 0 && u.length > 0 && (n.css("padding-top", u.height() + "px"), t.css("border-bottom", "1px solid #e3e3e3"), i.css("border-bottom", "1px solid #e3e3e3"), r.css({
                            "border-bottom": "1px solid #e3e3e3",
                            height: "70px"
                        }))
                    });
                    o.click(function() {
                        n.length > 0 && (n.css("padding-top", ""), t.css("border-bottom", ""), i.css("border-bottom", ""), r.css({
                            "border-bottom": "",
                            height: ""
                        }))
                    });
                    userLinks.on("click", function() {
                        var i = $(this),
                            r = $(".ion-android-person"),
                            n, t;
                        if (r.length > 0) {
                            n = $(".popover");
                            n.is(":visible") ? n.removeClass("show") : n.addClass("show");
                            $(document.body).on("click.signin-container", function() {
                                var t = $(this);
                                n.hide();
                                t.off("click.signin-container")
                            })
                        } else t = i.find("a").attr("href"), location.href = t
                    });
                    navIcon.off("click").click(function() {
                        closeL3();
                        $("body").toggleClass("o-hidden");
                        jsUtility.isTablet() || $(this).toggleClass("open");
                        (jsUtility.isTablet() || jsUtility.isMobile()) && (tertiaryNav.attr("display", "none") || closeL3(), navIcon.hasClass("open") ? (navIcon.attr({
                            "data-linktype": "nav/paginate",
                            "data-linkaction": "menu"
                        }), $("body").css("overflow", "hidden"), jsUtility.isMobile() && $(".body-content").css("display", "none")) : (navIcon.attr({
                            "data-linktype": "nav/paginate",
                            "data-linkaction": "menuclose"
                        }), $("body").css("overflow", "auto"), jsUtility.isMobile() && $(".body-content").css("display", "")));
                        jsUtility.isTablet() && !jsUtility.isMobile() ? (hasClass(backDropTablet, "hidden") ? (showHideSecondaryNav.showBackDrop(), navContainer.removeClass("hidden"), setTimeout(function() {
                            navIcon.addClass("open");
                            navContainer.addClass("crawl-right")
                        }, 100)) : (showHideSecondaryNav.hideBackDrop(), navContainer.removeClass("crawl-right"), setTimeout(function() {
                            navIcon.removeClass("open");
                            navContainer.addClass("hidden")
                        }, 210)), navIcon.hasClass("open") ? navIcon.attr({
                            "data-linktype": "nav/paginate",
                            "data-linkaction": "menuclose"
                        }) : navIcon.attr({
                            "data-linktype": "nav/paginate",
                            "data-linkaction": "menu"
                        })) : navContainer.toggleClass("crawl-down");
                        nav.removeClass(mobileShowToggle);
                        jsUtility.isMobile() && (acnLogoContainer.toggleClass("hidden"), f.toggleClass("absolute-fade"));
                        divContainer.removeClass("in").addClass("collapse");
                        countrySelectorControl.closeCountrySelector();
                        u = null
                    });
                    navLabel.click(function(n) {
                        var r;
                        n.preventDefault();
                        var t = $(this),
                            i = t.closest(".nav-submenu"),
                            u = $(this).next(),
                            f = t.siblings(".secondary-navs");
                        jsUtility.isMobile() || jsUtility.isTablet() ? (divContainer.removeClass("hidden"), i.hasClass(mobileShowToggle) ? setTimeout(function() {
                            i.removeClass(mobileShowToggle)
                        }, 10) : (i.attr("id") != "tertiary-block" && nav.delay(1400).removeClass(mobileShowToggle), setTimeout(function() {
                            i.delay(2800).addClass(mobileShowToggle)
                        }, 10), isLandscape() && isClosed && (r = $(".tertiary-title").text(), u = $("div").find("[data-id='" + r + "']")))) : (hasClass(f, "hidden") ? (divContainer.addClass("hidden"), setTimeout(function() {
                            var r, u, c;
                            if (showHideSecondaryNav.showNav(i), r = t.siblings().find(".secondary-item"), t.siblings().find("#multiple-l3").length == 1 && t.parent().hasClass("layout-column") && r.length > 4) {
                                var l = $(".layout-column #multiple-l3 .secondary-item").eq(0),
                                    n = $(".layout-column #multiple-l3 .secondary-item").eq(4),
                                    e = $(".layout-column #multiple-l3 .first-secondary-item"),
                                    o = l.outerHeight();
                                o += e.length == 1 ? parseFloat(e.outerHeight()) : 0;
                                n.css("top", (o / 16).toFixed(2) + "em");
                                n.css("position", "absolute");
                                var a = $(".layout-column #multiple-l3 .secondary-item").eq(0).outerHeight(),
                                    v = $(".layout-column #multiple-l3 .secondary-item").eq(4).outerHeight(),
                                    s = parseFloat(a + v),
                                    f = 0,
                                    h = 0;
                                for (u = 1; u < r.length - 1; u++) $(r[u]).outerHeight() > f && (f = parseFloat($(r[u]).outerHeight()));
                                s > f ? (c = t.siblings().find(".first-secondary-item").outerHeight(), h = s + 50 + c, viewPortWidth <= 999 ? (n.removeProp("top"), n.removeProp("position"), t.siblings().find(".secondary-nav-menu").removeProp("height"), t.siblings().find(".secondary-nav-menu").removeProp("padding-bottom")) : (t.siblings().find(".secondary-nav-menu").css("height", (h / 16).toFixed(2) + "em"), t.siblings().find(".secondary-nav-menu").css("padding-bottom", 3.13 + "em"))) : !viewPortWidth <= 999 && (n.removeProp("top"), n.removeProp("position"), t.siblings().find(".secondary-nav-menu").removeProp("height"), t.siblings().find(".secondary-nav-menu").removeProp("padding-bottom"))
                            }
                        }, 100)) : showHideSecondaryNav.clickHideNav(i), t.hasClass("active") ? t.removeClass("active").closest(".nav-submenu").removeClass("border-bottom") : (navLabel.removeClass("active").closest(".nav-submenu").removeClass("border-bottom"), t.addClass("active").closest(".nav-submenu").addClass("border-bottom")))
                    });
                    jsUtility.isMobile() || jsUtility.isTablet() ? (hasClass(divContainer, "collapse") || (divContainer.addClass("collapse"), navLabel.attr("data-toggle", "collapse")), tertiaryClose.click(function() {
                        closeL3()
                    }), tertiaryContainer.click(function() {
                        if (isClosed = !1, $(this).parent().attr("id") != "no-l3") {
                            navMenu.children().addClass("hidden");
                            var n = $(this).data("tertiary");
                            $("#" + n).removeClass("hidden");
                            tertiaryNav.css({
                                opacity: "0",
                                left: "-530px"
                            });
                            tertiaryNav.css("display", "flex").animate({
                                opacity: "1",
                                left: "0px"
                            }, 100);
                            $(".tertiary-title").html($(this).parents(".secondary-navs").attr("id"));
                            subMenuLabel.addClass("tertiaryLevel3");
                            tertiaryListContainer.html($(this).children("ul").clone());
                            tertiaryListContainer.children("ul").removeClass("hidden-xs hidden-sm")
                        }
                    })) : (divContainer.removeClass("collapse"), navLabel.removeAttr("data-toggle"));
                    jsUtility.isMobile() || jsUtility.isTablet() ? groupTitle.attr({
                        "data-linktype": "nav/paginate"
                    }) : (documentClick.click(function(n) {
                        $(n.target).closest(navMenu).length || navLabel.is(n.target) || showHideSecondaryNav.hideSubNav()
                    }), groupTitle.removeAttr("data-linktype"))
                },
                e = function() {
                    var t = "#header-topnav",
                        e = $("#search-body"),
                        o = $(t + " .search-icon-container"),
                        i = $(t + " .search-textbox"),
                        n = $(t + " .ion-ios-close"),
                        r = $(".utility-nav .country-select-cont"),
                        u = "show-search",
                        f = $(".utility-nav .signin-container"),
                        s = $(t + " .ion-ios-search");
                    o.off("click").click(function() {
                        $(this).toggleClass(u);
                        varSearchBody.css("height", deviceHeight + "px");
                        $("body").toggleClass("modal-open");
                        acnLogoContainer.toggleClass("hidden");
                        navIcon.toggleClass("hidden-xs hidden-sm");
                        r.css("visibility", "hidden");
                        e.toggleClass("slide-down");
                        f.css("visibility", "hidden");
                        navLabel.css("visibility", "hidden");
                        i.val("");
                        n.addClass("hidden");
                        hasClass($(this), u) || (varSearchBody.css("height", 0), r.removeAttr("style"), f.removeAttr("style"), navLabel.removeAttr("style"))
                    });
                    i.keyup(function() {
                        viewPortWidth <= 999 && ($(this).val() != "" ? n.removeClass("hidden") : n.addClass("hidden"))
                    });
                    n.click(function(t) {
                        t.preventDefault();
                        i.val("");
                        n.addClass("hidden");
                        $("#search-recommendation").removeClass("in").addClass("collapse")
                    })
                },
                o = function() {
                    s();
                    var n = $(".country-select-cont");
                    n.off("click").click(function() {
                        countrySelectorCont.toggleClass(toggleCountryList)
                    });
                    $(document).on("mouseup touchend", function(n) {
                        n || (n = window.event);
                        var t = n.target || n.srcElement;
                        !$(".show-country-list").length || $(t).attr("class") === "country-select-cont" || $(t).attr("class") === "show-country-list" || $(t).closest(".country-select-cont").length || $(t).closest(".show-country-list").length || countrySelectorCont.toggleClass(toggleCountryList)
                    })
                },
                n = "",
                t = "CountryLanguageSelectorData_Careers",
                i = "CountryLanguageSelectorData_Dotcom";
            return {
                init: u
            }
        }(),
        showHideSecondaryNav = {
            showNav: function(n) {
                var i = n,
                    t = $("#" + i.data("id"));
                t.css({
                    opacity: "0",
                    top: "-530px"
                });
                t.removeClass("hidden").animate({
                    opacity: "1",
                    top: "70px"
                }, 400)
            },
            hideNav: function(n) {
                var i = n,
                    t = $("#" + i.data("id"));
                t.css({
                    opacity: "1"
                });
                t.animate({
                    opacity: "0"
                }, 400);
                setTimeout(function() {
                    t.addClass("hidden")
                }, 450)
            },
            restoreSecondaryNav: function() {
                var n = divContainer,
                    t = $(".tertiary-nav-container");
                n.css({
                    top: "",
                    opacity: ""
                });
                closeL3()
            },
            hideSubNav: function() {
                var n = divContainer;
                navLabel.removeClass("active");
                n.css({
                    top: "0",
                    opacity: "1"
                });
                n.animate({
                    top: jsUtility.isTablet() ? 0 : "-530px",
                    opacity: "1"
                }, 400);
                setTimeout(function() {
                    n.addClass("hidden")
                }, 450)
            },
            clickHideNav: function(n) {
                var i = n,
                    t = $("#" + i.data("id"));
                t.css({
                    top: "0",
                    opacity: "1"
                });
                t.animate({
                    top: "-530px",
                    opacity: "0"
                }, 300);
                setTimeout(function() {
                    t.addClass("hidden")
                }, 700)
            },
            showBackDrop: function() {
                $("html").css("position", "fixed");
                var n = $("#nav-content-menu");
                n.css({
                    "margin-top": " 50px"
                });
                backDropTablet.css({
                    opacity: "0.6",
                    "z-index": "-1",
                    top: "0"
                });
                backDropTablet.removeClass("hidden").animate({
                    opacity: "0.6",
                    zIndex: "2"
                }, 10)
            },
            hideBackDrop: function() {
                $("html").css("position", "");
                $("body").css("overflow", "auto");
                backDropTablet.css({
                    opacity: "1",
                    "z-index": "1"
                });
                backDropTablet.animate({
                    opacity: "0",
                    zIndex: "0"
                }, 10);
                setTimeout(function() {
                    backDropTablet.addClass("hidden")
                }, 1e3)
            },
            hideBackDropOnClick: function() {
                $("html").css("position", "");
                $("body").css("overflow", "auto");
                var n = $("#nav-content-menu");
                n.css({
                    "margin-top": "0"
                });
                n.animate({
                    marginTop: "-200%"
                }, 10);
                backDropTablet.css({
                    top: "",
                    "margin-top": "0%"
                });
                backDropTablet.animate({
                    maringTop: "-200%",
                    opacity: "0",
                    zIndex: "0"
                }, 10);
                setTimeout(function() {
                    navIcon.removeClass("open");
                    backDropTablet.addClass("hidden");
                    navContainer.addClass("hidden").removeClass("crawl-right");
                    n.css({
                        "margin-top": " 50px"
                    })
                }, 50);
                n.hasClass("hidden") && n.css({
                    "margin-top": " 50px"
                });
                closeL3()
            }
        },
        countrySelectorControl = {
            closeCountrySelector: function() {
                hasClass(countrySelectorCont, toggleCountryList) && countrySelectorCont.removeClass(toggleCountryList)
            }
        };

    function hasClass(n, t) {
        var i = n.attr("class");
        return i && (i = i.split(" ")), $.inArray(t, i) > 0 ? !0 : !1
    }

    function isLandscape() {
        return $(window).width() > $(window).height() ? !0 : !1
    }

    function closeL3() {
        isClosed = !0;
        navMenu.children().removeClass("hidden");
        tertiaryNav.css("display", "none");
        tertiaryListContainer.html("");
        subMenuLabel.removeClass("tertiaryLevel3")
    }

//# sourceMappingURL=postbodyjs.map