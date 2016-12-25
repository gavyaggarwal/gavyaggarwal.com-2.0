var events2;
events2 = [
    ["September 2014", "academic", "Matriculated at the California Institute of Technology", "Those past four years at the Charter School of Wilmington flew by fast. So did that Boeing 767. I left behind my home in Delaware and hauled all my belongings to California, so I could commit myself to four more years of education at Caltech."],
    ["Summer 2015", "career", "Engineering Practicum Intern at Google", "I worked on Google's Ad Team to design an app category mapping system that was used in serving ads and implement a mobile app ad format. I had an awesome summer in Mountain View and learned lots of new technologies including protobuffers, BigTable, and Google's proprietary rendering language."],
    ["April 2016", "life", "Competed in 3Red's Poker Night", "After picking up poker in my downtime, I won an online poker tournament and was flown to Chicago for a poker tournament. I had the opportunity to meet players who've played in the World Series and hear their stories of being career poker players."],
    ["Summer 2016", "career", "Program Manager Intern at Microsoft", "I developed the functional specification and UI mockups for a feedback feature in Microsoft Dynamics AX. As part of the job, I worked with the legal, UX, content, and engineering teams in order to bring this feature to fruition. I also performed code reviews and created technical prototypes."],
    ["Fall 2016", "academic", "A Long Way from Home", "I spent the term at Cambridge University at Corpus Christi College as part of an exchange program. Living in England was quite different from life in the states, but I adjusted well and joined the rowing team and massage society while abroad."],
    ["The Future", "life", "A Crazy Adventure", "Who knows what the future will bring. I'm really open to anything and my only preference is that I keep doing cool stuff. Come back soon to see where life takes me."]
];
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
function getEventTypeString(type) {
    switch (type) {
        case "life":
            return "Life Event";
        case "career":
            return "Career Event";
        case "academic":
            return "Academic Event";
    }
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
    window.controller = controller;
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
        duration: 600
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
});
