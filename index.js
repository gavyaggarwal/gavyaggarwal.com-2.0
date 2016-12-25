var events2;
events2 = [
    ["August 1996", "life", "Out of the Womb", "I came out as a chubby, summer baby at the ripe, young age of 0. However, don't let looks deceive you. I was a devious child, and I hope the world was ready for me."],
    ["August 2001", "academic", "Off to School", "With a pair of freshly sharpened pencils and a shiny, new eraser, I was off to Kindergarten to learn all the wonderful things school had to offer. Unfortunately, the only thing I learned that day was that American school lunches were far from what I imagined."],
    ["June 2002", "life", "Look Ma! No Training Wheels", "After several screams, crashes, and scraped knees, I finally earned my wheels. I could now be where I wanted, when I wanted and had to report to nobody... At least until I was tired and hungry after biking all day and needed to come home for dinner."],
    ["January 2006", "career", "First Business Venture", "I started my business in my 4th grade classroom, making and selling paper fortune-tellers to other students. Unfortunately, I didn't pay my (nonexistent) lawyers enough because my teacher was able to shut down my operations in just a few weeks."],
    ["June 2006", "academic", "Graduated from Thurgood Marshall Elementary School", "With my elementary school diploma in hand, I was off to change the world. I put my juice box down and set off to be an astronaut and make my 9-year-old dream a reality."],
    ["December 2007", "life", "My First Laptop", "I planned on using my first computer for school, but I ended up playing more flash games on it than I'd like to admit. Luckily, Netflix was not around back then or my productivity would have dropped even further. However, this laptop really sparked my interest in computers and led me to study computer science. Thanks Mom and Dad!"],
    ["June 2010", "academic", "Graduated from Newark Charter Middle School", "Wow! A middle school diploma! I must be really accomplished by now. Not only did I survive elementary school, but now I also had 4 years of middle school under my belt. I wasn't ready to stop now, and I braced myself for high school..."],
    ["Summer 2012", "career", "Intern at the University of Delaware", "As part of the K-12 Engineering Internship program, I worked in the Electrical Engineering Department of the University of Delaware under Professor Xiaoming Li. I did low-level programming for microchips on robots for applications that included following a line and moving towards a wireless access point."],
    ["Summer 2014", "career", "iOS Developer at dyli", "I developed the front-end of dyli, a fashion app that matches users to designers, brands, and boutiques based on their personal tastes. This was my first real industry experience and I learned a lot about analytics, UI design, and developer collaboration."],
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
function scrollToEvent() {
    this.controller.scrollTo(this.scene);
}
function configureScrolling() {
    var controller = new ScrollMagic.Controller();
    controller.scrollTo(function (newScrollPos) {
        $("html, body").animate({ scrollTop: newScrollPos });
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
            triggerElement: events[i],
            offset: -120,
            duration: 60
        })
            .setClassToggle(events[i], "selected")
            .addTo(controller);
    }
    return;
    var projectsScrollIn = TweenMax.fromTo("#projects", 1, { top: "+=0" }, { top: "-=200" });
    var projectsFadeIn = TweenMax.fromTo("#projects", 1, { opacity: 0 }, { opacity: 1 });
    var projectsFadeOut = TweenMax.fromTo("#projects", 1, { opacity: 1 }, { opacity: 0 });
    new ScrollMagic.Scene({
        triggerElement: "#timeline",
        offset: $("#timeline").outerHeight(),
        duration: 300
    })
        .setTween(projectsScrollIn)
        .addTo(controller);
    new ScrollMagic.Scene({
        triggerElement: "#timeline",
        offset: $("#timeline").outerHeight(),
        duration: 300
    })
        .setTween(projectsFadeIn)
        .addTo(controller);
    new ScrollMagic.Scene({
        triggerElement: "#skills",
        duration: 200
    })
        .setTween(projectsFadeOut)
        .addTo(controller);
    var tags = $("#skills #tags span");
    for (var i = 0; i < tags.length; i++) {
        var tagFlyIn = TweenMax.fromTo(tags[i], 1, {
            transform: "translateY(-1000px) rotate(-90deg)",
            opacity: 0
        }, {
            transform: "translateY(100px) rotate(-90deg)",
            opacity: 1
        });
        new ScrollMagic.Scene({
            triggerElement: "#skills",
            offset: 300 + (tags.length - i - 1) * 10,
            duration: 40
        })
            .setTween(tagFlyIn)
            .addTo(controller);
    }
    var legendFadeIn = TweenMax.fromTo("#legend", 1, { opacity: 0 }, { opacity: 1 });
    var wheelWind = TweenMax.fromTo("#tags", 1, { transform: "rotate(0deg)" }, { transform: "rotate(179.9deg)" });
    var wheelUnwind = TweenMax.fromTo("#tags", 1, { transform: "rotate(-179.9deg)" }, { transform: "rotate(0deg)" });
    new ScrollMagic.Scene({
        triggerElement: "#skills",
        offset: 300,
        duration: 100
    })
        .setTween(legendFadeIn)
        .addTo(controller);
    new ScrollMagic.Scene({
        triggerElement: "#skills",
        offset: 300,
        duration: 10 * tags.length + 30
    })
        .setTween(wheelWind)
        .setPin("#skills")
        .addTo(controller);
    new ScrollMagic.Scene({
        triggerElement: "#skills",
        offset: 330 + 10 * tags.length,
        duration: 600
    })
        .setTween(wheelUnwind)
        .setPin("#skills")
        .addTo(controller);
    var skillsScrollOut = TweenMax.fromTo("#skills", 1, { top: "+=0" }, { top: "-=200" });
    var contactFadeIn = TweenMax.fromTo("#contact", 1, { opacity: 0 }, { opacity: 1 });
    new ScrollMagic.Scene({
        triggerElement: "#contact",
        duration: 200,
        triggerHook: "onEnter"
    })
        .setTween(skillsScrollOut)
        .addTo(controller);
    new ScrollMagic.Scene({
        triggerElement: "#contact",
        offset: 200,
        duration: 200,
        triggerHook: "onEnter"
    })
        .setTween(contactFadeIn)
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
