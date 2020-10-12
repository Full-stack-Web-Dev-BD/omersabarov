function _clearAnimationClasses(target) {
    var animClasses = target.classList;
    var target = target;
    for (var i = 0; i < animClasses.length; i++) {
        if (animClasses[i].indexOf("animate__") >= 0 && animClasses[i] != "animate__animated") {
            target.classList.remove(animClasses[i]);
        }
    }
}
var Utilities = (function () {
    return {
        attachEvent: function (elmArray, event, callBack) {
            for (var i = 0; i < elmArray.length; i++) {
                var element = elmArray[i];
                element.addEventListener(event, (function (event) {
                    callBack(event);
                }))

            }
        },

        addClass: function (collection, cls) {
            for (var index = 0; index < collection.length; index++) {
                var element = collection[index];
                if (!element.classList.contains(cls)) {
                    element.classList.add(cls);
                }
            }
        },

        removeClass: function (collection, cls) {
            if (collection && collection.length > 0) {
                for (var i = 0; i < collection.length; i++) {
                    var element = collection[i];
                    element.classList.remove(cls);
                }
            }
        },
        createElement: function (type, classes) {
            var svgElms = ["path", "polyline", "g", "circle"];
            var elm;
            if (svgElms.indexOf(type) >= 0) {
                var ns = 'http://www.w3.org/2000/svg';
                elm = document.createElementNS(ns, type);
            } else {
                elm = document.createElement(type);
            }

            elm.classList.add("animate__animated", "animate__fast");
            if (classes && classes.length > 0) {
                for (var z = 0; z < classes.length; z++) {
                    var cls = classes[z];
                    elm.classList.add(cls);
                }
            }
            return elm;
        },

        addSubPageAnimation: function (target, pageId) {
            target.style.opacity = 0;

            setTimeout(function () {
                var animatableElms = document.querySelectorAll("#" + pageId + " [animate-class]");
                
                for (var i = 0; i < animatableElms.length; i++) {
                    target.style.opacity = 0;
                    var element = animatableElms[i];

                    var animateClasses = animatableElms[i].getAttribute("animate-class").split(" ");
                    _clearAnimationClasses(element);

                    (function (animateClasses, element) {
                        setTimeout(function () {

                            for (var c = 0; c < animateClasses.length; c++) {
                                element.classList.add(animateClasses[c]);

                            }
                        },50)
                    })(animateClasses, element)


                }
            }, 500)

        },
        clearAnimationClasses: function (target) {
            _clearAnimationClasses(target);
        },
        subPageAnimations: function (target) {
            var subpages = document.querySelectorAll("sub-page");
            for (var x = 0; x < subpages.length; x++) {
                _clearAnimationClasses(subpages[x]);
            }
        },

        mainPageAnimation: function (target) {
            var activemenu = document.querySelectorAll(".menu.active");

            _clearAnimationClasses(target);
            target.classList.remove("hide-main-page");
            if (activemenu.length > 0) {
                target.classList.add("animate__animated", "animate__fadeOutRight");
                setTimeout(function () {
                    _clearAnimationClasses(target);
                    target.classList.add("animate__fadeInRight");
                }, 700)
            } else {
                _clearAnimationClasses(target);
                target.classList.add("animate__animated", "animate__fadeInRight");

            }

        },


        typeWriterAnimation: function (elm) {
            if (elm) {
                this.removeClass(elm, "anim-typewriter");
                this.removeClass(elm, "line-1");
                elm.classList.add("anim-typewriter", "line-1");
            }
        },
        typeWriter: function (elm, text) {

            var length = text.length;
            var x = 0;
            elm.innerHTML = "";
            elm.style.opacity = 1;
            var cursor = document.createElement("span");
            var textPlaceHolder = document.createElement("span");
            var id = "textPlaceHolder" + elm.getAttribute("typewriter");
            textPlaceHolder.setAttribute("id", id);
            elm.appendChild(textPlaceHolder);
            elm.appendChild(cursor);

            var textElm = document.getElementById(id);
            cursor.style.transform = "rotate(0deg)";

            cursor.innerHTML = " |";
            var int = window.setInterval(function () {
                if (x == length) {
                    window.clearInterval(int);
                    cursor.style.transition = "transform 300ms";
                    cursor.style.display = "inline-block";


                    cursor.style.marginLeft = "6px";
                    setTimeout(function () {
                        cursor.style.transform = "rotate(25deg)";
                    }, 500)
                    return
                }
                textElm.innerHTML += text[x];

                x++;
            }, 70);
        },
        makeHTTPRequest:function (opts, callBack) {
            
            var path = opts.path;
            var data = opts.data || {};
            var type = opts.type || "GET";
            httpRequest = new XMLHttpRequest();
          
            if (!httpRequest) {
              
              return false;
            }
            httpRequest.onreadystatechange = function (httpRequest) {
              if (httpRequest.target.readyState == 4) {
                if (callBack) {
                  callBack.call();
                }
              }
            };
            httpRequest.open(type, path);
            
            httpRequest.send(data);
          }
    }
});