function deviceDetection() {
    var ua = new UAParser();
    console.log(ua.getResult());
    if(ua.getBrowser().name.search("IE") > -1) {
        document.getElementById("noIE").style.display = "flex";
    }
    else if(!CSS.supports("min-width: min( 1px, 1% )")) {
        document.getElementById("noOldBrowsers").style.display = "flex";
    }
    return 1;
}

function elmPos(elm) {
    var x = 0, y = 0;
    while(elm) {
        x += elm.offsetLeft - elm.scrollLeft + elm.clientLeft;
        y += elm.offsetTop - elm.scrollLeft + elm.clientTop;
        elm = elm.offsetParent;
    }
    return {x: x, y: y};
}

function setupWow() {
    var wow = new WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        offset: window.innerHeight * 0.15,
        mobile: true,
        live: true
    });
    wow.init();
    return wow;
}

function setLoadingSteps(step, from, to) {
    window.loadingSteps = { step, from, to, finished: 0 };
    return 1;
}

function loadingStep(step) {
    loadingSteps.finished++;
    if(loadingSteps.step >= loadingSteps.finished) {
        fl_update(loadingSteps.from + (loadingSteps.to - loadingSteps.from) * loadingSteps.finished / loadingSteps.step);
        return 1;
    }
    return 0;
};

function regLocationKey() {
    location.key = (function(){
        let kv = {};
        location.search.substr(1).split("&").forEach(k => {
            kv[k.split("=")[0]] = k.split("=")[1];
        });
        return kv;
    })();
    return location.key;
}

function devMode() {
    if(location.key && location.key["mode"] == "dev") {
        document.getElementById("debugger").style.display = "block";
        document.getElementById("debugger").style.width = "100%";
        console.log = function(thing) {
            if(typeof thing != "string") thing = JSON.stringify(thing);
            document.getElementById("debugger").innerHTML += `<span class="debugger log">${thing}</span><br>`;
        };
        console.info = function(thing) {
            if(typeof thing != "string") thing = JSON.stringify(thing);
            document.getElementById("debugger").innerHTML += `<span class="debugger log">${thing}</span><br>`;
        };
        console.warn = function(thing) {
            if(typeof thing != "string") thing = JSON.stringify(thing);
            document.getElementById("debugger").innerHTML += `<span class="debugger warn">${thing}</span><br>`;
        };
        console.error = function(thing) {
            if(typeof thing != "string") thing = JSON.stringify(thing);
            document.getElementById("debugger").innerHTML += `<span class="debugger error">${thing}</span><br>`;
        };
        console.warn("Entered Developer Mode.");
        console.warn("----------");
        return 1;
    }
    return 0;
}

async function loadFont() {
    var font_huninn = new FontFace('huninn', 'url("res/font/jf-openhuninn-10.woff2") format("woff2")');
    return await font_huninn.load().then(loaded_face => {
        document.fonts.add(loaded_face);
        document.body.style.fontFamily = "'huninn', '微軟正黑體', 'Microsoft JhengHei', 'PingFang', sans-serif";
        return true;
    });
}

async function loadInstagramPosts() {
    var anid = Math.floor(Math.random()*2), ani = ["slideInLeft", "slideInRight"];
    return await fetch("https://www.instagram.com/epii_equals_81minus82/?__a=1").then(r=>r.json()).then(ig => ig.graphql.user).then(data => {
        console.log(data);
        var posts = data.edge_owner_to_timeline_media.edges, previous = "";
        var slide = document.createElement("div");
        for(var i = 0; i < posts.length; i++) {
            if((posts[i].node.edge_media_to_caption.edges[0].node.text != previous) && (previous = posts[i].node.edge_media_to_caption.edges[0].node.text)) {
                let post = document.createElement("div"), link = document.createElement("a"), image = document.createElement("img");
                if(window.innerWidth < 1000) image.src = posts[i].node.display_url;
                else image.dataset.lazy = posts[i].node.display_url;
                image.classList.add("ig-post-image");
                link.href = "https://www.instagram.com/p/" + posts[i].node.shortcode + "/";
                link.target = "_blank";
                post.title = previous;
                post.classList.add("ig-post");
                if(previous.includes("#特別公告") || previous.includes("#重要公告")) post.classList.add("wow", "pulse", "infinite");
                link.appendChild(image);
                post.appendChild(link);
                slide.appendChild(post);
            }
        }
        slide.innerHTML += `<div><br><br><br><br><a href="https://www.instagram.com/epii_equals_81minus82/" target="_blank" class="wow flipInX" style="visibility: visible; animation-name: flipInX;"><div class="ig-follow"><div class="ig-border"><div class="ig-color"> <i class="fa fa-instagram ig-color"></i> 查看更多</div></div></div></a></div>`;
        slide.classList.add("ig-post-slide");
        document.getElementById("posts").appendChild(slide);
        $(".ig-post-slide").slick({
            dots: true,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 10000,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: false,
            centerMode: false,
            mobileFirst: true,
            prevArrow: "",
            nextArrow: "",
            dotsClass: "slick-dots dots-small-margin",
            responsive: [{
                breakpoint: 1600,
                settings: {
                    lazyLoad: "ondemand",
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                    prevArrow: `<button type="button" class="slick-prev">Previous</button>`,
                    nextArrow: `<button type="button" class="slick-next">Next</button>`,
                    dotsClass: `slick-dots`
                }
            },
            {
                breakpoint: 1000,
                settings: {
                    lazyLoad: "ondemand",
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true,
                    prevArrow: `<button type="button" class="slick-prev">Previous</button>`,
                    nextArrow: `<button type="button" class="slick-next">Next</button>`,
                    dotsClass: `slick-dots`
                }
            }]
        });
        $(".ig-post-slide").slick("slickGoTo", 0);
        return true;
    });
}

function fl_update(n = 0) {
    if(n>=100) n = 150;
    var ldr = document.getElementById("fl");
    var s = "" + (10 + n * 1.1) + "vmax";
    ldr.style.width = s;
    ldr.style.height = s;
    ldr.style.maxWidth = s;
    ldr.style.maxHeight = s;
    ldr.style.bottom = `calc( 30vh + ( max( min( 15vmin, 120px ), 5vmin ) ) - ${"" + (10 + n * 1.1)/2 + "vmax"} )`;
    if(n>=100) {
        setTimeout(function() {
            document.getElementsByClassName("fl")[0].classList.add("fl-done");
        }, 500);
        setTimeout(function() {
            document.getElementsByClassName("fl")[0].style.display = "none";
        }, 1300);
        return 1;
    }
    return 0;
}

function titleRunner() {
    let n = 0,
        titles = [
            "e^(πi) = 附1",
            "師大附中數理資優班第35屆成果發表會"
        ];
    return setInterval(function() {
        document.title = titles[(n++)%titles.length];
    }, 10*1000);
}

async function regService() {
    return await navigator.serviceWorker.register("service.js").then(()=>{return true});
}
