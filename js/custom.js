$(document).on('ready', function() {
  var price = 0;
  priceCalculate = function(workshop){
    var workshopPrice = 0;
    switch(workshop) {
      case 'standard': workshopPrice = 9000; break;
      case 'mobile-first': workshopPrice = 14000; break;
      case 'responsive-web': workshopPrice = 19000; break;
      case 'multiplatform': workshopPrice = 24000; break;
      default: break;
    }
    price = parseInt($('#workshop-location').val()) + parseInt($('#flight-Accomodations').val()) + parseInt($('.product-type').val())
    if(workshop) {
      price = price + workshopPrice
    }
    $('.workshop-cost').html('$' + price)
  }

  priceCalculate()
  // Workshop page
  $('#workshop-location, .product-type, #flight-Accomodations').on('change', function(){
    priceCalculate()
  })
  var date = new Date(); console.log(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate())

  $('#daterangepicker').dateRangePicker({
    inline:true,
    container: '#daterangepicker',
    alwaysOpen:true,
    minDays: 7,
    singleMonth: true,
    showShortcuts: false,
    showTopbar: false,
    startOfWeek: 'monday',
    startDate: date,
  });
  
// workshop scroll animation effects starts
  $("#next-calendar-view").click(function() {
      $('html, body').animate({
          scrollTop: $("#target-calendar").offset().top
      }, 1000);$('#calendar-view').addClass('bounceInUp').removeClass('hidden');
  }); 
  $("#next-type-of-product").click(function() {
      $('html, body').animate({
          scrollTop: $("#target-type-product").offset().top
      }, 1000);$('#type-of-product').addClass('bounceInUp').removeClass('hidden');
  }); 

  $("#next-select-package").click(function() {
      $('html, body').animate({
          scrollTop: $("#target-select-package").offset().top
      }, 1000);$('#select-package').addClass('bounceInUp').removeClass('hidden');
  }); 

  $("#next-proceed-to-pay-form").click(function() {
      $('html, body').animate({
          scrollTop: $("#target-pay-form ").offset().top
      }, 1000);$('#proceed-to-pay-form').addClass('bounceInUp').removeClass('hidden');
  }); 
// workshop scroll animation effects ends


// var stripe = Stripe('pk_test_peByeQhWP1HRv1T5KWaAYvpI');
// var elements = stripe.elements();

// var card = elements.create('card', {
//   style: {
//     base: {
//       iconColor: '#666EE8',
//       color: '#31325F',
//       lineHeight: '40px',
//       fontWeight: 300,
//       fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
//       fontSize: '15px',
//
//       '::placeholder': {
//         color: '#CFD7E0',
//       },
//     },
//   }
// });
// card.mount('#card-element');

//
// function chargeCard(token) {
//   var payload = {}
//   payload['token'] = token
//   payload['phone'] = $('.user-phone').val()
//   $.ajax({
//     method: "POST",
//     url: "/payment",
//     data: payload,
//
//   })
// }

// function setOutcome(result) {
//   console.log(result)
//   var successElement = document.querySelector('.success');
//   var errorElement = document.querySelector('.error');
//   successElement.classList.remove('visible');
//   errorElement.classList.remove('visible');
//
//   if (result.token) {
//     // Use the token to create a charge or a customer
//     // https://stripe.com/docs/charges
//     successElement.querySelector('.token').textContent = result.token.id;
//     successElement.classList.add('visible');
//     chargeCard(result.token)
//   } else if (result.error) {
//     errorElement.textContent = result.error.message;
//     errorElement.classList.add('visible');
//   }
// }

// card.on('change', function(event) {
//   setOutcome(event);
// });
//
// document.querySelector('form').addEventListener('submit', function(e) {
//   e.preventDefault();
//   var form = document.querySelector('form');
//   var extraDetails = {
//     name: $('.user-name').val(),
//     email: $('.user-email').val(),
//     phone: $('.user-phone').val()
//   };
//   stripe.createToken(card, extraDetails).then(setOutcome);
// });


  // var stripe = Stripe('pk_test_peByeQhWP1HRv1T5KWaAYvpI');
  // var elements = stripe.elements();
  // var card = elements.create('card')
//   card.mount("#card-element")
// console.log(card)
//   $("#payment-form").on('submit', function(e) {
//       // form validation
//       e.preventDefault()
//       // formValidationCheck(this);
//       // if(!$(this).valid()){
//           // return false;
//       // }
//       // Disable the submit button to prevent repeated clicks and form submit
//       $('.submit-button').attr("disabled", "disabled");
//       // createToken returns immediately - the supplied callback 
//       // submits the form if there are no errors
//       console.log($('.card-expiry-date').val())
//       console.log($('.card-number').val())
//       console.log($('.card-cvc').val())
//       console.log($('.user-email').val())
//       console.log($('.user-name').val())
//       console.log($('.user-phone').val())

//       stripe.createToken('card',{
//           number: $('.card-number').val(),
//           cvc: $('.card-cvc').val(),
//           exp_month: $('.card-expiry-date').val().split('/')[0],
//           exp_year: $('.card-expiry-date').val().split('/')[1]
//       }, function(response){
//         console.log(response)

//       });
//       // return false; // submit from callback
//   });

  // work shop page

  /* to check view port */

     $('body').on('click','.resources-sort-filter button',function() {
      $(".resources-list ul li button.active").removeClass("active");
        $(this).addClass('active');
        var val = $(this).val();
        resourceFilter(val);
    })

   var scroll = $(document).scrollTop();   
  $('body').on('click','.btn-selected',function() {
    $(".btn-selected").text("SELECT")
    $(".btn-selected").removeClass("active")
    $(this).toggleClass("active") 
    $(this).html("<span class='icon-selected'></span>SELECTED")
    priceCalculate($(this).attr('name'))
  });

   var headerHeight = $('.navbar-fixed-top').outerHeight();

    var sendApplication = function(data){
      NProgress.start();
      return $.ajax({
        data : data,
        url : '/apply',
        method: 'POST',
        success: function(res){
          $('#submit-application-btn').prop('disabled', false);
          NProgress.done();
          window.location.href =  '/thanks-for-applying/';
        }, error: function(error){
          $('#submit-application-btn').prop('disabled', false);
          NProgress.done();
        }
      });
    }
    

    var uploadFile = function(data){
      NProgress.start();
      return  $.ajax({
        data : data,
        url : '/uploadfile',
        method: 'POST',
        processData: false,
        cache: false,
        contentType: false,
        // async: false,
        success: function(res){
          
        }, error: function(error){
          NProgress.done();
          $('#submit-application-btn').prop('disabled', false);
        }
      });
    }


   $('body').on('click', '#submit-application-btn', function (e) {
       e.preventDefault();
       $('#submit-application-btn').prop('disabled', true);

       var data = {};

       $('#submit-application-form .form-control').each(function (i, ele) {
           if ($(this).attr('type') != 'file') {
               if ($(this).val() == '' || $(this).val() == undefined) {
                   return;
               } else {
                   data[$(this).attr('name')] = $(this).val();
               }
           }
       });
       console.log(data);



       var resume = $('#resume').prop('files')[0];
       var cover = $('#cover').prop('files')[0];
       var position = document.URL.split('/');
       position = position[position.length - 1];
       data['postionApplied'] = position;

       debugger
       if (('resumeUrl' in data) && ('coverUrl' in data )) {
           var p4 = sendApplication(data);
           p4.then(function (res3) {

           })
       }
       else{

       if (!('resumeUrl' in data) && !('coverUrl' in data )) {
           var formData = new FormData();
           formData.append('file', resume);
           var p1 = uploadFile(formData);
           formData = new FormData();
           formData.append('file', cover);
           var p2 = uploadFile(formData);
           var resumeUrl = '';
           var coverUrl = '';
           p1.then(function (res1) {
               data['resumeUrl'] = res1.url;
               p2.then(function (res2) {
                   data['coverUrl'] = res2.url;
                   var p3 = sendApplication(data);
                   p3.then(function (res3) {

                   })
               })
           });
           return;
       }

       if ('coverUrl' in data) {
           //data['resumeUrl'] = $("input[name=resumeUrl]").val();
           var resumeData = new FormData();
           if (!resume) {
               alert("Please Attach the Resume");
               return false
           }
           resumeData.append('file', resume);
           var resume1 = uploadFile(resumeData);
           resume1.then(function (res1) {
               console.log("Got the resume Url");
               data['resumeUrl'] = res1.url;

           }).then(function (result) {
               console.log("Now Sending the All the Data");
               var send = sendApplication(data);
               send.then(function (res3) {
                   return true
               })
           });
       }


       if ('resumeUrl' in data) {
           //data['coverUrl'] = $("input[name=coverUrl]").val();
           var coverData = new FormData();
           if (!cover) {
               alert("Please Attach the Cover letter");
               return false
           }
           coverData.append('file', cover);
           var coverPage = uploadFile(coverData);
           coverPage.then(function (res1) {
               console.log("Got the resume Url");
               data['coverUrl'] = res1.url;

           }).then(function (result) {
               console.log("Now Sending the All the Data");
               var send = sendApplication(data);
               send.then(function (res3) {
                   return true
               })
           });
       }
   }


       // data['resumeUrl'] = $('attach-link-resume').val();
       // data['coverUrl'] = $('attach-link-cover').val();
       // sendApplication(data);
       // return;

    // $('.radio-cover input[type=radio]:checked').val()
    // var attachFile = false;
    // $('input[type=radio]').each(function(){
    //   console.log($(this).val());
    //   console.log($(this).attr('checked'))
    //   console.log('.....')
    //     if($(this).val() == 'attach-link' && $(this).attr('checked') == 'checked'){
    //       attachFile = true;
    //     }
    // })
    // console.log(attachFile);


   });


   $('body').on('click', '#contact-page-btn', function (e){
    e.preventDefault();
    var data = {};

    $('.contact-form .form-control').each(function (i, ele){
        if($(this).val() == '' || $(this).val() == undefined){
          return;
        } else {
          data[$(this).attr('name')] = $(this).val();  
        }
    });

    NProgress.start();
    $.ajax({
      url: '/sendFeedback',
      method: 'POST',
      data: data,
      success: function(){
        NProgress.done();
        $('#contactUs').modal('toggle');

      }, error: function(er){
        NProgress.done();
        $('#contactUs').modal('toggle');
      }
    })
   })


   /* js for uplad file path */

   /* $('body').on('click', '#tab-4', function (e){
       // $("#uploadCover").val('');
        console.log("Clear");
        var input = $("#uploadCover");
        input = input.val('').clone(true);

    });*/

    $('body').on('click', '#tab-3', function (e){
        $("input[name=coverUrl]").val('');

    });

    $('body').on('click', '#tab-1', function (e){
        $("input[name=resumeUrl]").val('');
    });



    $('#sort-news button').click(function() {
        $("#sort-news button.active").removeClass("active");
        $(this).addClass('active');
        var filter = $(this).val()
        filterList(filter);
    });
    /* for mobile */
    $( ".navbar-toggle" ).click(function() {
      $("html").toggleClass( "hamburger-open");
    });

    /* animation for flixster*/
    if($('#page-content').hasClass('flixster-animate')){
       doCheck();
    }
    /* yatra carousel for yatra */
    $(".carousel-yatra-bg .carousel").carousel({
        interval : 1500
    });

    $(".vertical").carousel({
        interval : 2500,
         pause: 'none'
    });


    $('#navbarScroll a').on('click',function (e) {
        e.preventDefault();

        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            console.log(target.length);
            $('html,body').animate({
              scrollTop: target.offset().top-50
            }, "slow");
            return false;
          }
        }
    });

    $('.arrowDown a,.btn-green').on('click',function (e) {
        e.preventDefault();

        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          console.log(target);
          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top
            }, "slow");
            return false;
          }
        }
    });


    /* js for job page sticky header */
    
    if($('.job-subheader-stick').hasClass('job')){
        var flag = false,
        main_header_height = $('#navbarScroll').height(),
        second_header_top = $('#navbarScroll').offset().top;
    }
    if($('.service-subheader-stick').hasClass('all-services')){
        var flag = false,
        main_header_height = $('#sevice-header').height(),
        second_header_top = $('#sevice-header').offset().top;
    }

    $("#carousel-slide").carousel();

    
    $(window).scroll(function() { 
      var scrolled = $(document).scrollTop();

       if( scrolled > 100) {
        $('.navbar').addClass('custom-navabar');
       }
       else {
          $('.navbar').removeClass('custom-navabar');
        }

         /* animation for device */
        if($('#page-content').hasClass('viewport-check')){
         doCheck();
        }

        if ($(window).width() >= 780) { 
          //sticky secondar navbar//

        //   if(($(window).scrollTop()) >= second_header_top - 44){
        //     $('.department-list').addClass('fixtop');
        //     // $('.navbar').addClass('fixtop-enabled');
        //     flag = true;
        //   }
        //   else if(flag){
        //     $('.department-list').removeClass('fixtop');
        //     // $('.navbar').removeClass('fixtop-enabled');
        //     flag = false;
        //   }

        // navbar free consultaion tab//
           if(($(window).scrollTop()) >= 620){
            $('.navbar').addClass('fixtop-enabled');
          }
          else {
            $('.navbar').removeClass('fixtop-enabled');
          }
        }
     });


    /* clock */

     $('#aclock').each(function () {
        updateTime();
      });

     /* usa clock */

     $('#aclock-usa').each(function () {
        updateTimeUsa()
      });

     /* singapore */
     $('#aclock-sp').each(function () {
        updateTimeSingapore();
      });

     $("#resume").change(function () {
      var str = $("#resume").val();
      var fil=str.split('\\').pop();
       $("#uploadFile").attr('value', fil)
    });
     $("#cover").change(function () {
      var str = $("#cover").val();
      var fil=str.split('\\').pop();
       $("#uploadCover").attr('value', fil)
    });

});


// filter function
function filterList(value) {
    var list = $(".more-customers .customer-block");
    $(list).hide();
    if (value == "All") {
        $(".more-customers").find(".customer-block").each(function (i) {
            $(this).show();
        });
    } else {
        //Notice this *=" <- This means that if the data-category contains multiple options, it will find them
        //Ex: data-category="Cat1, Cat2"
        $(".more-customers").find("div[data-category*=" + value + "]").each(function (i) {
            $(this).show();
        });
    }
}

function resourceFilter(value) {
  $('.post').hide();
    if(value == 'all-topics'){
      $('.post').show();
    }
  else {
    $('.resources .post').each(function(){
      if($(this).attr('data-resources-category') == value)
        $(this).show()
    });
  }
}

/* viewport checker */
$.fn.isVisible = function() {
    // Height and Width are not explicitly necessary in visibility detection, the bottom, right, top and left are the
    // essential checks. If an image is 0x0, it is technically not visible, so it should not be marked as such.
    // That is why either width or height have to be &gt; 0.
    var rect = this[0].getBoundingClientRect();
    return (
        (rect.height > 0 || rect.width > 0) &&
        rect.bottom >= 0 &&
        rect.right >= 0 &&
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

function doCheck() {
    var elementToDetect = $('.image-section');
    
    if (elementToDetect.isVisible()) {
        $(".image-section").addClass("custom-animation");
    } else {
        $(".image-section").removeClass("custom-animation");
    }
    
}

  // onhover video control
  var video = document.getElementById("video_player");
    $(video).on({
      mouseenter: function () {
        video.setAttribute("controls","controls")
      },
      mouseleave: function () {
        video.removeAttribute("controls");
      }
  });
    // onclose pause the video
    $("#close_video").on("click", function(){
        $("#video_player")[0].pause();
    })
  
  $(document).on('click', '.video-pop-btn', function (e) {
    var video = $("#video_player").get(0);
    if (video.paused === false) {
        video.pause();
    } else {
        video.play();
    }
    return false;
});


/* js to rotate clock */

function updateTime() {
  // Get time from moment.js with specified format
   // min_offset will give minutes offset either +ve/-ve
  var now = null;
  var min_offset = moment().utcOffset()
  if(min_offset > 0){
    now = moment().subtract({minute: min_offset})
  } else {
    now = moment().add({minute: Math.abs(min_offset)})
  }
  now = now.add({hours: 5, minute :30}).format("hhmmssdA"); 
  // Move the clock hands
  rotateHands(now[4]+now[5],now[2] + now[3],now[0] + now[1], now[7] + now[8]);

  setTimeout(updateTime, 1000);

}

function rotateHands(sec,min,hour,period) {
  var degSec = 360/60*sec;
  var degMin = 360/60*min;
  var degHour = 360/12*hour;
  degHour = degHour + ((min/12) * 4.59);
  var pd = period;

  var sHand = $('#secondhand');
  sHand.css({
        "-webkit-transform": "rotate(" + degSec + "deg)",
        "-moz-transform": "rotate(" + degSec + "deg)",
        "transform": "rotate(" + degSec + "deg)" 
    });

  var mHand = $('#minutehand');
  mHand.css({
        "-webkit-transform": "rotate(" + degMin + "deg)",
        "-moz-transform": "rotate(" + degMin + "deg)",
        "transform": "rotate(" + degMin + "deg)"
    });

  var hHand = $('#hourhand');
  hHand.css({
        "-webkit-transform": "rotate(" + degHour + "deg)",
        "-moz-transform": "rotate(" + degHour + "deg)",
        "transform": "rotate(" + degHour + "deg)" 
    });

  $("#period").text(pd);

   // night and dark//

  var isNight = false;
  var hourin24 =null;
  hour = parseInt(hour);
  if(pd == "PM"){
    if( hour < 12 ){
      hourin24 = hour + 12;  
    } else if(hour == 12){
      hourin24 = hour;
    }
  }
  else{
    hourin24 = hour; 
    if(hour == 12 ){
      hourin24 = 0;
    }
  }

  if(hourin24 > 18 || hourin24 < 6){
    isNight = true;
  }

  $('#aclock').removeClass(isNight ? 'light' : 'dark').addClass(isNight ? 'dark' : 'light');
  
}



/* js to rotate clock  */

function updateTimeUsa() {

  // Get time from moment.js with specified format
  // min_offset will give minutes offset either +ve/-ve
  var now = null;
 var min_offset = moment().utcOffset()
 if(min_offset > 0){
   now = moment().subtract({minute: min_offset})

 } else {
   now = moment().add({minute: Math.abs(min_offset)})
 }

  now = now.subtract({hours: 7}).format("hhmmssdA");
  // Move the clock hands
  rotateHandsUsa(now[4]+now[5],now[2] + now[3],now[0] + now[1], now[7] + now[8]);

  setTimeout(updateTimeUsa, 1000);
}

function rotateHandsUsa(sec,min,hour,period) {
  var degSec = 360/60*sec;
  var degMin = 360/60*min;

  var degHour = 360/12*hour;
  degHour = degHour + ((min/12) * 4.59);

  var pd = period;

  var sHand = $('#second-hand-usa');
  sHand.css({
        "-webkit-transform": "rotate(" + degSec + "deg)",
        "-moz-transform": "rotate(" + degSec + "deg)",
        "transform": "rotate(" + degSec + "deg)" 
    });

  var mHand = $('#minute-hand-usa');
  mHand.css({
        "-webkit-transform": "rotate(" + degMin + "deg)",
        "-moz-transform": "rotate(" + degMin + "deg)",
        "transform": "rotate(" + degMin + "deg)"
    });

  var hHand = $('#hour-hand-usa');
  hHand.css({
        "-webkit-transform": "rotate(" + degHour + "deg)",
        "-moz-transform": "rotate(" + degHour + "deg)",
        "transform": "rotate(" + degHour + "deg)" 
    });

   $("#period-usa").text(pd);


   // night and dark//

    var isNight = false;
    var hourin24 =null;
    hour = parseInt(hour);
    if(pd == "PM"){
      if( hour < 12 ){
        hourin24 = hour + 12;  
      } else if(hour == 12){
        hourin24 = hour;
      }
      
    }
    else{
      hourin24 = hour; 
      if(hour == 12 ){
        hourin24 = 0;
      }
    }
    if(hourin24 > 18 || hourin24 < 6){
      isNight = true;
    }

  $('#aclock-usa').removeClass(isNight ? 'light' : 'dark').addClass(isNight ? 'dark' : 'light');
    
}
/* js for singapore clock */

function updateTimeSingapore() {
  var now = null;
  var min_offset = moment().utcOffset()
  if(min_offset > 0){
    now = moment().subtract({minute: min_offset})

  } else {
    now = moment().add({minute: Math.abs(min_offset)})
  }
  now = now.add({hours: 8}).format("hhmmssdA"); 


  rotateHandsSingapore(now[4]+now[5],now[2] + now[3],now[0] + now[1], now[7] + now[8]);
  setTimeout(updateTimeSingapore, 1000);
}

function rotateHandsSingapore(sec,min,hour,period) {
  var degSec = 360/60*sec;
  var degMin = 360/60*min;
  var degHour = 360/12*hour;
  degHour = degHour + ((min/12) * 4.59);

  var pd = period;


  var sHand = $('#second-hand-sp');
  sHand.css({
        "-webkit-transform": "rotate(" + degSec + "deg)",
        "-moz-transform": "rotate(" + degSec + "deg)",
        "transform": "rotate(" + degSec + "deg)" 
    });

  var mHand = $('#minute-hand-sp');
  mHand.css({
        "-webkit-transform": "rotate(" + degMin + "deg)",
        "-moz-transform": "rotate(" + degMin + "deg)",
        "transform": "rotate(" + degMin + "deg)"
    });

  var hHand = $('#hour-hand-sp');
  hHand.css({
        "-webkit-transform": "rotate(" + degHour + "deg)",
        "-moz-transform": "rotate(" + degHour + "deg)",
        "transform": "rotate(" + degHour + "deg)" 
    });
   $("#period-sp").text(pd);


    var isNight = false;
    var hourin24 =null;
    hour = parseInt(hour);
    if(pd == "PM"){
      if( hour < 12 ){
        hourin24 = hour + 12;  
      } else if(hour == 12){
        hourin24 = hour;
      }
      
    }
    else{
      hourin24 = hour; 
      if(hour == 12 ){
        hourin24 = 0;
      }
    }
    if(hourin24 > 18 || hourin24 < 6){
      isNight = true;
    }
    $('#aclock-sp').removeClass(isNight ? 'light' : 'dark').addClass(isNight ? 'dark' : 'light');
    // var isNight = hour >= 19 || (hour < 5 && min <= 59 && sec <= 59); 
    
    // workshop page js
    
}