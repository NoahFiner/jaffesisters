var changeTimeout, changeInterval, emailChangeTimeout;
var currentSlide = 0;
var currentEmail = "order";

//TODO: add smooth hash scrolling

var Slide = function(num, img, title, text, link) {
  this.num = num;
  this.text = text;
  this.title = title;
  this.link = link;
  this.img = img;
  this.height = 100;
  this.init = function() {
    $("#home-carousel-slides").append("<div class='slide hidden' id='slide"+this.num+"' style='background-image: url(\""+this.img+"\")'></div>");
    $("#home-carousel-mask").append("<div class='info' id='info"+this.num+"'> " +
      "<h1>"+this.title+"</h1>" +
      "<p>"+this.text+"</p>" +
      "<a href="+this.link+">LEARN MORE</a>" +
    "</div>");
    this.height = $("#info"+this.num).height();
    $("#info"+this.num).remove();
    $(".info").css("height", "10px");
    $(".info").css("transition", "height 0.5s");
    $(".info").css("-webkit-transition", "height 0.5s");
  }
  this.activate = function() {
    clearTimeout(changeTimeout);
    $(".info").css("height", "10px");
    $(".slide:not(#slide"+this.num+")").addClass("hidden");
    $("#slide"+this.num).removeClass("hidden");
    var that = this;
    changeTimeout = setTimeout(function() {
      $('.info').css("height", that.height+"px");
      $(".info").html("");
      $(".info").append("<h1>"+that.title+"</h1>" +
                        "<p>"+that.text+"</p>" +
                        "<a href="+that.link+">LEARN MORE</a>");
    }, 1000);
  }
}

var slides = [
  new Slide(0, 'img/4.jpg', 'A SAUCY SELECTION', 'We make high-quality, local, and fresh hot sauce in a variety of spicy flavors!.', 'sauces.html'),
  new Slide(1, 'img/3.jpg', 'PERFECT PARTNERS', 'As sisters and best friends, the owners of Tuition Hot Sauce make the ultimate business companions.', 'about.html#about-header'),
  new Slide(2, 'img/1.jpg', 'BACKYARD INGREDIENTS', 'Literally! All peppers in hot sauces are grown in our backyard. You can\'t get fresher than that!', 'about.html#ingredients-header'),
  new Slide(3, 'img/2-cropped.jpg', 'EARNING FOR EDUCATION', 'All earnings from selling our hot sauce goes towards our college savings.', 'about.html#education-header'),
  new Slide(4, 'img/5.jpg', 'A HOMEMADE BUSINESS', 'The hot sauce flavors, bottles, and labels are all designed and original to our business.', 'about.html#business-header')
];

var nextSlide = function() {
  currentSlide++;
  if(currentSlide >= slides.length) {
    currentSlide = 0;
  }
  slides[currentSlide].activate();
}

changeInterval = setInterval(nextSlide, 10000);

$(document).ready(function() {
  for(var i = 0; i < slides.length; i++) {
    slides[i].init();
  }
  setTimeout(function() {slides[0].activate(); $(".loading").fadeOut(500)}, 250);

  //set constant dimensions to contact-right to avoid weird animations

  $("#contact-right").css("height", $("#contact-right").height()+"px");
  $("#contact-right, .form-lower").css("width", $("#contact-right").width()+"px");
  if(window.location.hash) {
    //hash should be order-1, with the 1 corresponding to the value to set the order flavor to
    var hash = window.location.hash.substr(1);
    if(parseInt(hash.split("-")[1])) {
      $("select[name='order-flavor'] option[value="+hash.split("-")[1]+"]").attr('selected', 'selected');
    }
  }

  $("select[name='email-type']").change(function() {
    clearTimeout(emailChangeTimeout);
    currentEmail = $(this).val();
    $(".form-lower").addClass("hidden");
    emailChangeTimeout = setTimeout(function() {
      $("#"+currentEmail+"-outer").removeClass("hidden");
    }, 500);
  });

  $("#hamburger-outer").click(function() {
    $("#hamburger-outer, #header-right").toggleClass("expanded");
  });

  $(window).scroll(function() {
    $("#hamburger-outer, #header-right").removeClass("expanded");
  });

  //TODO: clicking outside of expanded hamburger menu closes it
});
