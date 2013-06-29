function display_dropdown(x) {
    $('.dropdown_menu').show();
}

var fading_out = false;
var fading_in = true;

window.onload = function() {
    var header = $('#header');
    // Event handlers for the fading in/out of header
    header.mouseenter(fade_in(header));
    header.mouseleave(fade_out(header));

    // We want to fade out the header when the user first sees the page. If
    // the page has focus right away, we can do it immediately. Otherwise, when
    // the user sees the page next
    if (document.hasFocus()) {
        fade_out(header, 1000);
    }
    else {
        fade_out(header, 1000);
    }
}

function fade_out(element, duration) {
    // Just ignore if we're already fading out
    if (fading_out == true) {
        return;
    }
    else {
        console.log ("Fading out... Element = " + element);
        fading_out = true;
        element.animate({
            opacity: 0.25
        }, duration);
        fading_out = false;
    }
}

function fade_in(element, duration) {
    // Just ignore if we're already fading in
    if (fading_in == true) {
        return;
    }
    else {
        console.log ("Fading out... Element = " + element);
        fading_in = true;
        element.animate({
            opacity: 0.75
        }, duration);
        fading_out = false
    }
}