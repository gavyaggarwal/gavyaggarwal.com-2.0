function configureName() {
    var title = $("#title");
    var titles = ["Developer", "Designer", "Hacker", "Hustler"];
    var i = 0;
    setInterval(function () {
        $(title).removeClass("animate").addClass("animated");
        setTimeout(function () {
            $(title).removeClass("animated").addClass("animate").text(titles[i]);
            i = (i + 1) % 4;
        }, 600);
    }, 5000);
}
function configureProjects() {
    var grid = $('#grid').isotope({
        itemSelector: 'div',
        masonry: {
            columnWidth: 40,
            isFitWidth: true
        }
    });
    grid.on('layoutComplete', function (e, laidOutItems) {
        var count = laidOutItems.length;
        $("#count").text(count + " Project" + (count == 1 ? "" : "s"));
    });
    $("#filter a").click(function () {
        $(this).toggleClass("selected");
        var tags = [];
        $("#filter .selected").each(function (i) {
            tags.push("." + $(this).attr("data-tag"));
        });
        if (tags.length == 4) {
            $("#filter a").removeClass("selected");
        }
        grid.isotope({
            filter: tags.join(", ")
        });
    });
}
function isEmail(email) {
    if (!email) {
        return true;
    }
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}
function sendMail(obj) {
    if (isEmail(obj.email) && obj.message != "") {
        $.ajax({
            url: "https://formspree.io/gavyaggarwal@gmail.com",
            method: "POST",
            data: {
                "_replyto": obj.email,
                "_subject": "Comment on gavyaggarwal.com",
                message: obj.message
            },
            dataType: "json",
            error: function (req, code, err) {
                console.log("Error Submitting Form:", req, code, err);
                obj.error();
            },
            success: function (data) {
                obj.success();
            }
        });
    }
    else {
        obj.error();
    }
}
function configureForm() {
    var form = $("#form");
    $(form).click(function () {
        $(this).addClass("selected").find("span").fadeOut(400, function () {
            $(form).html("        <input placeholder=\"Email (Optional)\" id=\"email\" />        <textarea placeholder=\"Message\" id=\"message\"></textarea>        <div id=\"send\">Send</div>      ");
            var button = $("#send");
            $(button).click(function () {
                $(button).text("Sending");
                sendMail({
                    email: $("#email").val(),
                    message: $("#message").val(),
                    success: function () {
                        $(button).text("Sent");
                        $(button).off();
                    },
                    error: function () {
                        $(button).text("Error");
                    }
                });
            });
        });
    });
}
function configureScrolling() {
    var controller = new ScrollMagic.Controller();
    window["controller"] = controller;
    controller.scrollTo(function (newScrollPos, offset) {
        $("html, body").animate({ scrollTop: newScrollPos + offset });
    });
    var nameFade = new TweenMax("#name", 1, {
        opacity: 0
    });
    new ScrollMagic.Scene({
        duration: 300
    })
        .setTween(nameFade)
        .setPin("#name")
        .addTo(controller);
    var timelineScroll = new TweenMax("#timeline", 1, {
        top: -300
    });
    new ScrollMagic.Scene({
        offset: 150
    })
        .setClassToggle("#background", "blur")
        .addTo(controller);
    new ScrollMagic.Scene({
        offset: 250,
        duration: 50
    })
        .setTween(timelineScroll)
        .addTo(controller);
    var events = $("#timeline li");
    for (var i = 0; i < events.length; i++) {
        new ScrollMagic.Scene({
            triggerHook: 0.4,
            triggerElement: events[i],
            duration: 60
        })
            .setClassToggle(events[i], "selected")
            .addTo(controller);
    }
    var projectIntro = new TimelineMax().add([
        new TweenMax("#projects", 1, {
            top: -300
        }, 0),
        new TweenMax("#projects", 1, {
            opacity: 1
        }, 0)
    ]);
    new ScrollMagic.Scene({
        triggerElement: "#timeline",
        offset: $("#timeline").outerHeight(),
        duration: 300
    })
        .setTween(projectIntro)
        .addTo(controller);
    var projectsOutro = new TimelineMax().add([
        new TweenMax("#projects", 1, {
            top: -500
        }, 0),
        new TweenMax("#projects", 1, {
            opacity: 0
        }, 0)
    ]);
    new ScrollMagic.Scene({
        triggerElement: "#skills",
        duration: 200
    })
        .setTween(projectsOutro)
        .addTo(controller);
    var skills = $("#skills");
    var tags = $(skills).find("#tags span");
    var tagsTweens = new TimelineMax();
    for (var i = 0; i < tags.length; i++) {
        tagsTweens.add(TweenMax.fromTo(tags[i], 1, {
            transform: "translateY(-1000px) rotate(-90deg)",
            opacity: 0
        }, {
            transform: "translateY(100px) rotate(-90deg)",
            opacity: 1
        }));
    }
    tagsTweens.add(TweenMax.fromTo("#legend", tags.length, { opacity: 0 }, { opacity: 1 }), 0);
    new ScrollMagic.Scene({
        triggerElement: "#skills",
        offset: $(skills).height() / 2,
        duration: 200
    })
        .setTween(tagsTweens)
        .setPin("#skills")
        .addTo(controller);
    var rotateWheel = new TweenMax("#tags", 1, {
        rotation: 360,
    });
    new ScrollMagic.Scene({
        triggerElement: "#skills",
        offset: $(skills).height() / 2 + 200,
        duration: 1800
    })
        .setTween(rotateWheel)
        .setPin("#skills")
        .addTo(controller);
    var contactIntro = TweenMax.fromTo("#contact", 1, { opacity: 0 }, { opacity: 1 });
    new ScrollMagic.Scene({
        triggerElement: "#contact",
        duration: 200,
        triggerHook: "onEnter"
    })
        .setTween(contactIntro)
        .addTo(controller);
}
function configureNavigation() {
    var page = window.location.hash.replace("#", "");
    scrollToPage(page);
}
function scrollToPage(page) {
    switch (page) {
        case "name":
            window["controller"].scrollTo("#name", 0);
            return;
        case "timeline":
            window["controller"].scrollTo("#timeline", -$(window).height() * 0.4 - 300);
            return;
        case "projects":
            window["controller"].scrollTo("#projects", -300);
            return;
        case "skills":
            window["controller"].scrollTo("#skills", 200 + (-$(window).height() + $("#skills").height()) * 0.5);
            return;
        case "contact":
            window["controller"].scrollTo("#contact", 0);
            return;
    }
}
console.log("Hey there. What brings you with to the console? Are you having issues with my website. You can send me a message by typing tellGavy(\"[Your message]\") and hitting enter. Alternatively, you can include your email by using tellGavy([message]\", \"[email]\") so that I can get back to you.");
function tellGavy(message, email) {
    sendMail({
        email: email,
        message: "Sent From Console \n" + message,
        success: function () {
            console.log("Thanks! Your message was sent.");
        },
        error: function () {
            console.log("There was an error sending your message.");
        }
    });
}
$(document).ready(function () {
    configureName();
    configureProjects();
    configureForm();
    configureScrolling();
    configureNavigation();
});
window['GoogleAnalyticsObject'] = 'ga';
window['ga'] = window['ga'] || function () {
    (window['ga'].q = window['ga'].q || []).push(arguments);
};
window['ga'].l = (1 * new Date());
ga('create', 'UA-89431222-2', 'auto');
ga('send', 'pageview');
