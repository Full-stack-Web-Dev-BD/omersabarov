// import Utilities from "./utilities.js";

// Secure Wrap;
(function () {
    // initializations 

    var utilities = new Utilities();
    var menuCollection = document.querySelectorAll(".menu");
    var subMenuCollection = document.querySelectorAll(".sub-menu");


    utilities.attachEvent(menuCollection, 'click', function (evt) {
        navigation.menuClicked(evt);
    });
    utilities.attachEvent(subMenuCollection, 'click', function (evt) {

        navigation.menuClicked(evt);
        navigation.subMenuClicked(evt);
    });
    utilities.attachEvent(document.querySelectorAll("#toggleTheme"), "click", function () {
        toggleTheme();
    })
    utilities.attachEvent(document.querySelectorAll("#logo"), 'click', function () {
        resetMenu();
    })

    utilities.attachEvent(document.querySelectorAll(".portfolio-icon"), 'mouseenter', function (evt) {
        portfolio.portfolio(evt);
    });



    // self executing closure;
    var navigation = (function () {
        var expandMenu = function (target) {
            // resetting previously active menu if any;
            var activeClasses = document.querySelectorAll(".active");
            utilities.removeClass(activeClasses, "active");

            // marking the current element as active
            target.classList.add("active");
        };

        var navigateToFn = function (pageId, type) {
            var mainPageHolder = document.getElementById("main-page-holder");
            var targetPage = document.getElementById(pageId);
            var subpageAnimationTarget = document.querySelectorAll("#" + pageId + " .column")[0];
            // hideAll 
            utilities.addClass(document.querySelectorAll(".sub-page"), 'hide-page');

            if (type == "main") {
                utilities.mainPageAnimation(mainPageHolder);
            }

            // hiding all other subpages
            if (targetPage.classList.contains("hide-page")) {
                targetPage.classList.remove("hide-page");
            }

            utilities.addSubPageAnimation(subpageAnimationTarget, pageId);

            // animate H1
            var h1 = document.querySelectorAll("#" + pageId + " h1")[0];
            utilities.typeWriterAnimation(h1);

        }
        return {
            menuClicked: function (evt) {
                var target = evt.currentTarget;
                var navigateTo = target.getAttribute("navigate-to");

                var navigationType = "main";
                var delay = 900;

                if (navigateTo && navigateTo != "") {
                    var h1 = document.querySelectorAll('#' + navigateTo + ' .typewriter')[0];
                    if (h1)
                        h1.innerHTML = "";
                    if (evt.target.classList.contains("sub-menu")) {
                        navigationType = "sub";
                    }

                    if (navigationType == "main") {
                        navigateToFn(navigateTo, navigationType);
                        expandMenu(target);
                        var query = '#' + target.getAttribute("id") + ' .sub-menu';
                        if (query.length > 2) {
                            var q = document.querySelectorAll(query);
                            if (q.length > 0) {
                                q[0].classList.add("active");
                            }
                        }
                        delay = 1000;
                    } else {
                        navigateToFn(navigateTo, navigationType);
                        delay = 900;
                    }
                    if (navigateTo == "sub-page-m4-1") {
                        animation.addGlide(document.querySelectorAll(".input-elm"));
                    }

                    setTimeout(function () {
                        utilities.typeWriter(h1, h1.getAttribute("typewriter"));
                    }, delay);
                } else {
                    // portfolio
                    var activeClasses = document.querySelectorAll(".active");
                    utilities.removeClass(activeClasses, "active");

                    utilities.addClass(document.querySelectorAll(".sub-page"), 'hide-page');
                    var mainPage = document.querySelectorAll("#main-page-holder");
                    utilities.removeClass(mainPage, 'animate__fadeInRight');
                    utilities.addClass(mainPage, "animate__fadeOutRight");
                    target.classList.add("active");

                }
                evt.stopPropagation();


            },
            subMenuClicked: function (evt) {
                utilities.removeClass(document.querySelectorAll(".sub-menu"), "active");
                var portfolio = document.querySelectorAll("#portfolio-title")[0];

                evt.currentTarget.classList.add("active");

                if (portfolio.classList.contains("active")) {
                    portfolio.classList.remove("active");
                    // utilities.addClass(document.querySelectorAll(".sub-page"), 'hide-page');

                    var mainPage = document.querySelectorAll("#main-page-holder");
                    utilities.addClass(mainPage, 'animate__fadeInRight');
                    utilities.removeClass(mainPage, "animate__fadeOutRight");
                }
            },
            expandMenu: function (target) {
                expandMenu(target);
            }
        }
    })();

    var animation = (function () {
        return {
            addGlide: function (elmCollection) {
                utilities.removeClass(document.querySelectorAll(".input-elm"), "animate__fadeInDown");
                // for (var i = 0; i < elmCollection.length; i++) {
                var i = 0;
                var glideInt = window.setInterval(function () {
                    if (i == elmCollection.length) {
                        window.clearInterval(glideInt);
                        return
                    }
                    var element = elmCollection[i];

                    if (element.classList) {
                        utilities.clearAnimationClasses(element);
                        if (!element.classList.contains("animate__animated")) {
                            element.classList.add("animate__animated");
                        }
                        element.classList.add("animate__fadeInDown");
                    }
                    i++;
                }, 150);

                // }
            }
        }
    })();

    var portfolio = (function () {
        var stripWidth = "220px";
        var stripLeftPos = ""
        var activeClient = (function () {
            var client = ""
            return {
                get: function () {
                    return client;
                },
                set: function (_client) {
                    client = _client;
                }
            }
        })()
        function showImageStrip(anchorElm) {
            var imgStripElm = document.getElementById("imgStrip");
            var imgStripElmInner = document.getElementById("imgStripInner");
            var imgStripButton = document.getElementById("imgStripButton");
            var bb = anchorElm.getBoundingClientRect();
            stripLeftPos = (bb.left - 25) + "px";

            if (!imgStripElm) {
                imgStripElm = utilities.createElement("div", ["img-strip"]);
                imgStripElmInner = utilities.createElement("div", ["img-strip-inner"]);
                imgStripButton = utilities.createElement("button", ["img-strip-button", "more-info-btn"]);

                // setting attrs
                imgStripElmInner.setAttribute("id", "imgStripInner");
                imgStripElm.setAttribute("id", "imgStrip");
                imgStripButton.setAttribute("id", "imgStripButton");

                // creating dom structure
                imgStripElm.appendChild(imgStripElmInner);
                imgStripElmInner.appendChild(imgStripButton);

                imgStripElm.style.width = stripWidth;
                imgStripElmInner.style.width = stripWidth;
                imgStripElmInner.style.height = "0";
                imgStripElmInner.style.overflow = "hidden";
                imgStripElmInner.style.backgroundRepeat = "none";
                imgStripElmInner.style.display = "flex";
                imgStripElmInner.style.alignItems = "center";
                imgStripElmInner.style.justifyContent = "center";
                


                imgStripButton.innerHTML = "Click for more info";

                document.body.appendChild(imgStripElm);

                imgStripElm.addEventListener('mouseleave', function (evt) {

                    var imgStrip = document.getElementById("imgStrip");

                    if (imgStrip && !imgStrip.getAttribute("halfWidth")) {
                        document.getElementById("imgStripInner").style.height = 0;
                        document.getElementById("imgStripInner").style.opacity = "0";
                        document.getElementById("imgStripButton").style.opacity = "0";
                        document.getElementById("portfolio-background").style.backgroundImage = "";
                        document.getElementById("portfolio-background").style.zIndex = 3;
                        document.getElementById("portfolio-background").style.opacity = 0;
                        imgStrip.style.height = 0;
                    }
                });
                imgStripElm.addEventListener('click', function (evt) {
                    showHalfStrip()
                });
                if (window.innerWidth <= 800) {
                    showHalfStrip()
                }
            }

            imgStripElm.style.opacity = "1";
            imgStripElmInner.style.opacity = "1";

            imgStripElm.style.left = stripLeftPos;
            imgStripElm.style.height = window.innerHeight + "px";
            imgStripElmInner.style.height = "0";

            // making the stript animate
            setTimeout(function () {
                imgStripElmInner.style.height = window.innerHeight + "px";
                imgStripButton.style.opacity = "1";
            }, 500);

            // setting bg image
            var bgWidth = (parseInt(window.innerWidth));
            var img = getClientPortfolioImage(activeClient.get());

            document.getElementById("portfolio-background").style.backgroundImage = "url(" + img + ")";
            document.getElementById("portfolio-background").style.backgroundSize = (bgWidth) + "px";
            document.getElementById("portfolio-background").style.zIndex = 3;
            document.getElementById("portfolio-background").style.opacity = 0.4;
            imgStripElmInner.style.backgroundImage = "url(" + img + ")";
            imgStripElmInner.style.backgroundSize = bgWidth + "px";
            imgStripElmInner.style.backgroundPositionX = "-" + stripLeftPos;

        }
        function getClientPortfolioImage(clientName) {
            var mobile = false;
            if (window.innerWidth <= 800) {
                mobile = true;
            }

            var img = "";
            if (clientName == "excalibur") {
                img = "img/portfolio/excb-portfolio.jpg";
            } else if (clientName == "fab") {
                img = "img/portfolio/fab-portfolio.jpg";
            }
            else if (clientName == "armscor") {
                img = "img/portfolio/armscor-portfolio.jpg";
            }
            else if (clientName == "ria") {
                img = "img/portfolio/ria-portfolio.jpg";
            }
            else if (clientName == "riaImports") {
                img = "img/portfolio/ria-imports-portfolio.jpg";
            }
            if (mobile) {
                img = img.replace(".jpg", "_mobile.jpg");
            }

            return img;
        }
        function showHalfStrip() {
            var imgStrip = document.getElementById("imgStrip");
            var imgStripInner = document.getElementById("imgStripInner");
            document.getElementById("portfolio-background").style.backgroundColor = "#000";
            document.getElementById("portfolio-background").style.zIndex = 6;
            document.getElementById("portfolio-background").style.backdropFilter = "blur(50px)";


            imgStrip.style.left = 0;
            imgStrip.style.removeProperty('width');
            imgStrip.setAttribute("halfWidth", "true");
            imgStripInner.style.width = "100%";
            imgStrip.classList.add("img-strip-full");
            imgStrip.classList.add("img-strip-full--" + activeClient.get());

            // Adds a close button and its corresponding Logic;
            addClose();

            // adding portfolio data;
            addPortfolioData();

            // Trigger Auto Scroll
            autoScroll.startScrolling();

            // this will reduce the size of the backgroundimage to fit the container; also animates;
            setTimeout(function () {
                imgStripInner.style.backgroundPositionX = "0";
                imgStripInner.style.backgroundSize = "100%";
                imgStripInner.innerHTML = "<img src='" + getClientPortfolioImage(activeClient.get()) + "' style='opacity:0' />"
            }, 700);
        }
        function addClose() {
            var imgStripButton = document.getElementById("imgStripButton");
            var close = document.getElementById("portfolio-close");
            if (!close) {
                close = utilities.createElement("div", ["portfolio-close"]);
                close.setAttribute("id", "portfolio-close");
                close.addEventListener('click', function (evt) {
                    var imgStripElm = document.getElementById("imgStrip");
                    var imgStripElmInner = document.getElementById("imgStripInner");
                    var portfolioContainer = document.getElementById("portfolio-content-container");

                    document.getElementById("portfolio-background").style.backgroundColor = "transparent";
                    document.getElementById("portfolio-background").style.zIndex = "3";
                    imgStrip.removeAttribute("halfWidth");
                    imgStrip.classList.remove("img-strip-full");
                    evt.target.classList.remove("animate__fadeInRight");
                    evt.target.classList.add("animate__fadeOutRight");

                    // Removing content 
                    portfolioContainer.classList.remove("portfolio-content-container-animate");
                    portfolioContainer.style.zIndex = 1;
                    document.getElementById("portfolio-background").style.backgroundImage = "";
                    imgStripElmInner.style.height = "0";

                    setTimeout(function () {
                        imgStripElm.style.left = stripLeftPos;
                        imgStripElm.style.height = "0";
                        imgStripElm.style.width = stripWidth;
                        imgStripElmInner.style.width = stripWidth;
                        setTimeout(function () {
                            imgStripElm.parentNode.removeChild(imgStripElm);
                        }, 100)
                        autoScroll.destroy();
                    }, 800)


                });
                document.body.appendChild(close);
            }
            imgStripButton.style.display = "none";
            close.classList.remove("animate__fadeOutRight");
            close.classList.add("animate__fadeInRight");
            autoScroll.destroy();

        }
        function addPortfolioData() {
            var currentClient = activeClient.get();

            var data = {
                excalibur: {
                    title: "Excalibur Army",
                    message: "We believe in a peaceful world where people are free to live and feel safe. Yet freedom and security are values that need to be protected.",
                    button: "Click for more info"
                },
                fab: {
                    title: "Fab Defese",
                    message: "FAB-Defense® superior ergonomics, functionality and durability, reflects decades of design experience through continuous improvement and successive generations of weapon accessories.",
                    button: "Click for more info"
                },
                armscor: {
                    title: "Armscor",
                    message: "ARMSCOR USA ammunition line is made in the USA. ARMSCOR PRECISION ammunition line is made in the Philippines. The company offers a wide selection of competitively priced ammunition and components with sales spread throughout the world.",
                    button: "Click for more info"
                },
                ria: {
                    title: "Rock Island Armory",
                    message: "30 YEARS OF DELIVERING INNOVATION AND VALUE TO THE USA",
                    button: "Click for more info"
                },
                riaImports: {
                    title: "RIA Imports",
                    message: "30 YEARS OF DELIVERING INNOVATION AND VALUE TO THE USA",
                    button: "Click for more info"
                }
            }
            var moveUpButton = document.getElementById("portfolio-move-up-button");
            var moveDownButton = document.getElementById("portfolio-move-down-button");
            var portfolioTitle = document.getElementById("portfolio-info-title");
            var portfolioMessage = document.getElementById("portfolio-message");
            var portfolioContainer = document.getElementById("portfolio-content-container");
            var button = document.getElementById("portfolio-action");
            var moveButtonContainer;

            if (!portfolioTitle) {
                portfolioContainer = utilities.createElement("div", ["portfolio-content-container"]);
                moveButtonContainer = utilities.createElement("div", ["moveButtonContainer"]);

                moveUpButton = utilities.createElement("button", ["portfolio-move", "portfolio-move--up"]);
                moveDownButton = utilities.createElement("button", ["portfolio-move", "portfolio-move--down"]);
                portfolioMessage = utilities.createElement("div", ["portfolio-message"]);
                portfolioTitle = utilities.createElement("h1", ["portfolio-info-title"]);
                button = utilities.createElement("button", ["portfolio-action"]);

                moveUpButton.setAttribute("id", "portfolio-move-up-button");
                moveDownButton.setAttribute("id", "portfolio-move-down-button");
                portfolioContainer.setAttribute("id", "portfolio-content-container");
                portfolioTitle.setAttribute("id", "portfolio-info-title");
                portfolioMessage.setAttribute("id", "portfolio-message");
                button.setAttribute("id", "portfolio-action");

                // Adding eventHanderls
                moveUpButton.addEventListener("click", function () {
                    autoScroll.moveDown();
                });
                moveDownButton.addEventListener("click", function () {
                    autoScroll.moveUp();
                });

                // Adding to Dom;
                moveButtonContainer.appendChild(moveUpButton)
                moveButtonContainer.appendChild(moveDownButton)
                portfolioContainer.appendChild(moveButtonContainer);
                portfolioContainer.appendChild(portfolioTitle);
                portfolioContainer.appendChild(portfolioMessage);
                portfolioContainer.appendChild(button);

                document.body.appendChild(portfolioContainer);
            }
            portfolioContainer.classList.remove("portfolio-content-container-animate");
            portfolioTitle.innerHTML = data[currentClient].title;
            portfolioMessage.innerHTML = data[currentClient].message;
            button.innerHTML = data[currentClient].button;
            portfolioContainer.classList.add("portfolio-content-container-animate");
            portfolioContainer.style.zIndex = 14;
        }

        var autoScroll = (function () {
            var autoScrollInt;
            var classIndex = 0;
            var overflow;
            var animationInProgress = false;
            function scroll() {
                var innerElm = document.querySelectorAll("#imgStripInner")[0];
                var innerElmImg = document.querySelectorAll("#imgStripInner img")[0];

                // Adding a base class to remove backround image.. 
                if (!innerElm.classList.contains("img-strip-full--" + activeClient.get() + "-animate")) {
                    innerElm.classList.add("img-strip-full--" + activeClient.get() + "-animate");
                }
                innerElmImg.style.transform = "translateY(-" + overflow * classIndex + "px)";

            };
            function animationInProgressFn() {
                animationInProgress = true;
                window.setTimeout(function () {
                    animationInProgress = false;
                }, 1000);
            }
            function moveDown() {
                if (!animationInProgress) {
                    classIndex--;
                    if (classIndex < 0) {
                        classIndex = 3;
                    }
                    scroll();
                    animationInProgressFn();
                }
            }
            function moveUp() {
                if (!animationInProgress) {
                    classIndex++;
                    if (classIndex == 4) {
                        classIndex = 0;
                    }
                    scroll();
                    animationInProgressFn();
                }
            }
            return {
                startScrolling: function () {
                    setTimeout(function () {
                        var img = document.querySelectorAll("#imgStripInner img")[0];
                        overflow = (img.scrollHeight - window.innerHeight) / 3;

                        img.style.opacity = 1;
                    }, 1500);
                    autoScrollInt = window.setInterval(function () {
                        moveUp();
                    }, 4000);
                },
                moveUp: function () {
                    moveUp();
                },
                moveDown: function () {
                    moveDown();
                },
                destroy: function () {
                    window.clearInterval(autoScrollInt);
                    animationInProgress = false;
                    classIndex = null;
                }
            }
        })();

        return {
            portfolio: function (evt) {
                activeClient.set(evt.currentTarget.getAttribute("client"));
                showImageStrip(evt.currentTarget);
            }
        }
    })();

    function toggleTheme() {
        var bdy = document.querySelectorAll("body")[0];

        if (bdy.classList.contains("dark")) {
            bdy.classList.remove("dark");
            bdy.classList.add("light");
        } else {
            bdy.classList.remove("light");
            bdy.classList.add("dark");
        }
    }
    function resetMenu() {
        var mainPage = document.querySelectorAll("#main-page-holder");
        utilities.removeClass(document.querySelectorAll(".menu.active"), "active");
        utilities.removeClass(mainPage, 'animate__fadeInRight');
        utilities.addClass(mainPage, "animate__fadeOutRight");
    }


})();
function submitForm(event) {
    var utilities = new Utilities();
    var form = document.getElementById("form");
    var data = new FormData();
    document.getElementById("formSubmit").setAttribute("disabled", "true");

    var msg = "<table>";
    msg += "<tr><td>Name</td><td>" + form.name.value + "</td></tr>";
    msg += "<tr><td>Email</td><td>" + form.email.value + "</td></tr>";
    msg += "<tr><td>Company</td><td>" + form.companyName.value + "</td></tr>";
    msg += "<tr><td>Organization</td><td>" + form.organization.value + "</td></tr>";
    msg += "<tr><td>Location</td><td>" + form.locationState.value + "</td></tr>";
    msg += "<tr><td>Phone Number</td><td>" + form.phoneNumber.value + "</td></tr>";
    msg += "<tr><td>Query</td><td>" + form.query.value + "</td></tr>";
    msg += "<tr><td>Message</td><td>" + form.message.value + "</td></tr>";
    msg += "</table>"
    data.append("email", form.email.value);
    data.append("message", msg);
    data.append("query", form.query.value);
    data.append("name", form.name.value);

    utilities.makeHTTPRequest({
        path: "http://107.180.94.54/septime/testemail.php",
        type: "POST",
        data: data
    }, (function () {
        formSuccess();

    }))
    event.preventDefault();
    return false;
}
function formSuccess() {
    var form = document.getElementById("form");
    form.classList.add("animate__animated");
    form.classList.add("animate__fadeOut");
    setTimeout(function () {
        form.style.display = "none";
        var thankYouMsg = document.createElement("h3");
        thankYouMsg.style.textAlign = "center";
        thankYouMsg.style.fontSize = "20px";
        thankYouMsg.style.marginTop = "15%";
        thankYouMsg.innerHTML = "Thank you. We'll get back you shortly.";
        form.parentNode.appendChild(thankYouMsg);

    }, 800);
}

