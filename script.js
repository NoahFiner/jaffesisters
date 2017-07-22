var changeTimeout, changeInterval, emailChangeTimeout;
var currentSlide = 0;
var currentEmail = "order";

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
  new Slide(0, 'img/4.jpg', 'JAFFE SISTERS HOT SAUCE', 'Formerly known as Tuition Hot Sauce, Jaffe Sisters Hot Sauce is a home-built hot sauce company managed by Anna and Naomi Jaffe.', 'sauces.html'),
  new Slide(1, 'img/2-cropped.jpg', 'LOREM IPSUM', 'In publishing and graphic design, lorem ipsum is a filler text commonly used to demonstrate the graphic elements of a document or visual presentation.', 'about.html'),
  new Slide(2, 'img/1.jpg', 'BACKYARD INGREDIENTS', 'Literally! All peppers in our sauces are grown in our backyard. You can\'t get fresher than that!', 'about.html'),
  new Slide(3, 'img/3.jpg', 'IPSUM LOREM LEE', 'Lorem ipsum dolor sit amet, vis et delectus dignissim expetendis, sea rebum gloriatur ad. Graeci splendide necessitatibus vel no.', 'about.html')
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
});
