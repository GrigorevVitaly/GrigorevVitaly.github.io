const burger = document.querySelector('.hamburger_menu');
const burg_cont = document.querySelector('.hamburger_menu_container');
const composition = document.querySelector('.composition');
const compo_menu = document.querySelector('.compo_menu');
burger.addEventListener('click', function () {
    burg_cont.style.display = 'block';
});
composition.addEventListener('click', function () {
    compo_menu.style.display = 'block';
});
const closeComp = document.querySelector('.composition_close');
const close = document.querySelector('.close');
close.addEventListener('click', function () {
    burg_cont.style.display = 'none';
});
    closeComp.addEventListener('click', function () {
        compo_menu.style.display = 'none';
    });
    const closeDef = document.querySelector('.close_def');
    closeDef.addEventListener('click', function (event) {
        event.preventDefault();
    });

    $(".composition").click(function () {
        $(".compo_menu").toggle("fast");
    });

    function toggleTeam(obj) {
        var $item = $(obj);
        if (!$item.hasClass("team_acco_item_active")) {
            $(".team_acco_item_active").removeClass("team_acco_item_active");
            $item.addClass("team_acco_item_active");
        } else {
            $(".team_acco_item_active").removeClass("team_acco_item_active");
        }
        return false;
    }
    $(".team_acco_item").on("click", function (event) {
        event.preventDefault();
        toggleTeam(this);
    });
    function toggleMenu(obj) {
        var $itemMenu = $(obj);
        if (!$itemMenu.hasClass("menu_acco_item_active")) {
            $(".menu_acco_item_active").removeClass("menu_acco_item_active");
            $itemMenu.addClass("menu_acco_item_active");
        } else {
            $(".menu_acco_item_active").removeClass("menu_acco_item_active");
        }
        return false;
    }
    $(".menu_acco_item").on("click", function (event) {
        event.preventDefault();
        toggleMenu(this);
    });

    const left = document.querySelector(".btn_left");
    const right = document.querySelector(".btn_right");
    const items = document.querySelector("#S-items");

    const minRight = 100;
    const maxRight = 600;
    const step = 100;
    let currentRight = 0;

    right.addEventListener("click", function() {
        if (currentRight < maxRight) {
            currentRight += step;
            items.style.right = currentRight + "%";
        } else if (currentRight == maxRight ) {
            items.style.right = 0;
            currentRight = 0;
        }
    });

    left.addEventListener("click", function() {
        if (currentRight > minRight) {
            currentRight -= step;
            items.style.right = currentRight + "%";
        }
    })


// ===========YANDEX MAP=============

ymaps.ready(init);
var myMap;

function init(){
    myMap = new ymaps.Map("map", {
        center: [59.95213166, 30.33032249],
        zoom: 12
    });
    myMap.behaviors.disable(['drag', 'rightMouseButtonMagnifier', 'scrollZoom'])
    myMap.controls.remove('zoomControl').remove('typeSelector').remove('searchControl').remove('fullscreenControl').remove('geolocationControl').remove('trafficControl');

    var coords = [
            [59.97564187, 30.30862474], [59.94788354, 30.38029710], [59.89407189, 30.31034873], [59.91718513, 30.48737640]
        ],
        myCollection = new ymaps.GeoObjectCollection({}, {
            iconLayout: 'default#image',
            iconImageHref: './img/icons/map-marker.svg',
            iconImageSize: [46, 57],
            hintContent: 'Москва!',
            balloonContent: 'Столица России'
        });

    for (var i = 0; i < coords.length; i++) {
        myCollection.add(new ymaps.Placemark(coords[i]));
    }

    myMap.geoObjects.add(myCollection);

}

// ==========One Page Scroll==========
$('#fullpage').fullpage();



// ===========Navigation Menu==============
// Cache selectors
var lastId,
    topMenu = $("#scroll-nav"),
    topMenuHeight = topMenu.outerHeight()+15,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
        var item = $($(this).attr("href"));
        if (item.length) { return item; }
    });

// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function(e){
    var href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
    $('html, body').stop().animate({
        scrollTop: offsetTop
    }, 300);
    e.preventDefault();
});

// Bind to scroll
$(window).scroll(function(){
    // Get container scroll position
    var fromTop = $(this).scrollTop()+topMenuHeight;

    // Get id of current scroll item
    var cur = scrollItems.map(function(){
        if ($(this).offset().top < fromTop)
            return this;
    });
    // Get the id of the current element
    cur = cur[cur.length-1];
    var id = cur && cur.length ? cur[0].id : "";

    if (lastId !== id) {
        lastId = id;
        // Set/remove active class
        menuItems
            .parent().removeClass("active")
            .end().filter("[href='#"+id+"']").parent().addClass("active");
    }
});