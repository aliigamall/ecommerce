/* ================================================
---------------------- Main.js ----------------- */
(function ($) {
  'use strict';
  var Porto = {
    initialised: false,
    mobile: false,
    init: function () {

      if (!this.initialised) {
        this.initialised = true;
      } else {
        return;
      }

      // Call Porto Functions
      this.checkMobile();
      this.stickySearch();
      // this.stickyHeader();
      this.headerSearchToggle();
      this.mMenuIcons();
      this.mMenuToggle();
      this.mobileMenu();
      this.toggleComparePanel();
      this.removeFromCompare();
      this.showAutoComplete();
      this.productTabSroll();
      this.scrollToTop();
      this.quantityInputs();
      this.countTo();
      this.tooltip();
      this.popover();
      this.changePassToggle();
      this.changeBillToggle();
      this.catAccordion();
      this.ajaxLoadProduct();
      this.toggleFilter();
      this.toggleSidebar();
      this.productTabSroll();
      this.scrollToElement();
      this.loginPopup();
      this.windowClick();

      /* Manu via superfish plugin */
      if ($.fn.superfish) {
        this.menuInit();
      }

      /* Call function if Owl Carousel plugin is included */
      if ($.fn.owlCarousel) {
       // this.owlCarousels();
      }

      /* Call function if noUiSlider plugin is included - for category pages */
      if (typeof noUiSlider === 'object') {
        this.filterSlider();
      }

      /* Call if not mobile and plugin is included */
      // if ($.fn.themeSticky) {
      //   this.stickySidebar();
      // }

      /* Call function if Light Gallery plugin is included */
      if ($.fn.magnificPopup) {
        this.lightBox();
      }

    },
    checkMobile: function () {
      /* Mobile Detect*/
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        this.mobile = true;
      } else {
        this.mobile = false;
      }
    },
    menuInit: function () {
      // Main Menu init with superfish plugin
      $('.menu').superfish({
        popUpSelector: 'ul, .megamenu',
        hoverClass: 'show',
        delay: 0,
        speed: 80,
        speedOut: 80,
        autoArrows: true
      });
    },
    stickySearch: function () {
      // Sticky header - calls if sticky-header class is added to the header
      if ($('.header-scroll').length) {
        var sticky = new Waypoint.Sticky({
          element: $('.header-scroll')[0],
          stuckClass: 'fixed',
          offset: -100
        });

        var lastScrollTop = 0;
        if($('.sticky-header').length < 1){
          window.onscroll = function () {
            var st = window.pageYOffset || document.documentElement.scrollTop;
            if (st > lastScrollTop) {
              $('.header-scroll.fixed').removeClass('scrolling-up');
              $('body').removeClass('body--scrolling-up');
            } else {
              $('.header-scroll.fixed').addClass('scrolling-up');
              $('body').addClass('body--scrolling-up');
            }
            lastScrollTop = st <= 0 ? 0 : st;
          };
        }
      };
      //Set sticky headers in main part
      $('main').find('.sticky-header').each(function () {
        var sticky = new Waypoint.Sticky({
          element: $(this),
          stuckClass: 'fixed-nav',
        });
      });
    },

    stickyHeader: function () {
      // Sticky header - calls if sticky-header class is added to the header
      if ($('.sticky-header').length) {
        var sticky = new Waypoint.Sticky({
          element: $('.sticky-header')[0],
          stuckClass: 'fixed',
          offset: -10,
        });

        if (!$('.header-bottom').find('.logo, .cart-dropdown').length) {
          var targetArea = $('.header-bottom').find('.container');

          // Clone and put in the header bottom for sticky header
          $('.header').find('.logo, .cart-dropdown')
            .clone(true)
            .prependTo(targetArea);
        }
      }

      //Set sticky headers in main part
      $('main').find('.sticky-header').each(function () {
        var sticky = new Waypoint.Sticky({
          element: $(this),
          stuckClass: 'fixed-nav',
        });
      });
    },
    headerSearchToggle: function () {
      // Search Dropdown Toggle
      $('.search-toggle').on('click', function (e) {
        e.preventDefault();
        $('.header-search-wrapper').toggleClass('show');
        $('.header-search-wrapper .form-control').focus();
      });

      $('body').on('click', function (e) {
        if ($('.header-search-wrapper').hasClass('show')) {
          $('.header-search-wrapper').removeClass('show');
          $('body').removeClass('is-search-active');
        }
      });

      $('.header-search').on('click', function (e) {
        e.stopPropagation();
      });
    },
    mMenuToggle: function () {
      // Mobile Menu Show/Hide
      $('.mobile-menu-toggler').on('click', function (e) {
        $('body').toggleClass('mmenu-active');
        $(this).toggleClass('active');
        e.preventDefault();
      });

      $('.mobile-menu-overlay, .mobile-menu-close').on('click', function (e) {
        $('body').removeClass('mmenu-active');
        $('.menu-toggler').removeClass('active');
        e.preventDefault();
      });
    },
    mMenuIcons: function () {
      // Add Mobile menu icon arrows or plus/minus to items with children
      $('.mobile-menu').find('li').each(function () {
        var $this = $(this);

        if ($this.find('ul').length) {
          $('<span/>', {
            'class': 'mmenu-btn'
          }).appendTo($this.children('a'));
        }
      });
    },
    toggleComparePanel: function(){
      $(".compare-panel__close").on("click", function(){
        // $(".compare-panel").toggleClass('is-open');
        openSideCart('#comparePanel');
      });
    },
    removeFromCompare: function(){
      $(".compare-panel__remove").on("click", function(){
        $(this).parents('.compare-panel__item').remove();
        if($(".compare-panel__item").length === 0 )
          $(".compare-panel").removeClass('is-shown');
      });
    },
    showAutoComplete: function(){
      $('#q').on("focus keyup", function(){
        var inputVal = $(this).val();
        if(inputVal != ''){
          $(".search-autocomplete").show();
        }else{
          $(".search-autocomplete").hide();
        }
        $(function() {
          $("body").click(function(e) {
            if (e.target.id == "headerSearch" || $(e.target).parents("#headerSearch").length) {
              alert("Inside div");
            } else {
              $(".search-autocomplete").hide();
            }
          });
        })
      });
    },
    mobileMenu: function () {
      // Mobile Menu Toggle
      $('.mmenu-btn').on('click', function (e) {
        var $parent = $(this).closest('li'),
          $targetUl = $parent.find('ul').eq(0);

        if (!$parent.hasClass('open')) {
          $targetUl.slideDown(300, function () {
            $parent.addClass('open');
          });
        } else {
          $targetUl.slideUp(300, function () {
            $parent.removeClass('open');
          });
        }

        e.stopPropagation();
        e.preventDefault();
      });
    },
    owlCarousels: function () {
      var sliderDefaultOptions = {
        loop: true,
        margin: 0,
        responsiveClass: true,
        nav: false,
        navText: ['<i class="icon-left-open-big">', '<i class="icon-right-open-big">'],
        dots: true,
        autoplay: true,
        autoplayTimeout: 15000,
        items: 1,
      };

      /* Hom Slider */
      var homeSlider = $('.home-slider');

      homeSlider.owlCarousel($.extend(true, {}, sliderDefaultOptions, {
        lazyLoad: true,
        autoplayTimeout: 20000,
        nav: true,
        // rtl: true,
        animateOut: 'fadeOut'
      }));

      homeSlider.on('loaded.owl.lazy', function (event) {
        $(event.element).closest('.home-slider').addClass('loaded')
      });

      /* Featured Products */
      $('.featured-products').owlCarousel($.extend(true, {}, sliderDefaultOptions, {
        loop: false,
        margin: 30,
        autoplay: false,
        // rtl:true,
        nav: true,
        dots: false,
        responsive: {
          0: {
            items: 2
          },
          700: {
            items: 3,
            margin: 15
          },
          1200: {
            items: 5,
            margin: 10
          }
        }
      }));

      /* Widget Featurd Products*/
      $('.widget-featured-products').owlCarousel($.extend(true, {}, sliderDefaultOptions, {
        lazyLoad: true,
        nav: true,
        navText: ['<i class="icon-angle-left">', '<i class="icon-angle-right">'],
        dots: false,
        autoHeight: true
      }));

      /* About Testimonials carousel */
      $('.testimonials-carousel').owlCarousel($.extend(true, {}, sliderDefaultOptions, {
        lazyLoad: true,
        navText: ['<i class="icon-angle-left">', '<i class="icon-angle-right">'],
        autoHeight: true,
        responsive: {
          0: {
            items: 1
          },
          992: {
            items: 2
          }
        }
      }));

      // Entry Slider - Blog page
      $('.entry-slider').each(function () {
        $(this).owlCarousel($.extend(true, {}, sliderDefaultOptions, {
          margin: 2,
          lazyLoad: true,
        }));
      });

      // Related posts
      $('.related-posts-carousel').owlCarousel($.extend(true, {}, sliderDefaultOptions, {
        loop: false,
        margin: 30,
        autoplay: false,
        responsive: {
          0: {
            items: 1
          },
          480: {
            items: 2
          },
          1200: {
            items: 3
          }
        }
      }));

      //Category boxed slider
      $('.boxed-slider').owlCarousel($.extend(true, {}, sliderDefaultOptions, {
        lazyLoad: true,
        autoplayTimeout: 20000,
      }));
      $('.boxed-slider').on('loaded.owl.lazy', function (event) {
        $(event.element).closest('.boxed-slider').addClass('loaded')
      });

      /* Product single carousel - extenden product */
      $('.product-single-default .product-single-carousel').owlCarousel($.extend(true, {}, sliderDefaultOptions, {
        nav: false,
        animateOut: 'fadeOut',
        navText: ['<i class="icon-angle-left">', '<i class="icon-angle-right">'],
        dotsContainer: '#carousel-custom-dots',
        autoplay: false,
        onInitialized: function () {
          var $source = this.$element;

          if ($.fn.elevateZoom) {
            $source.find('img').each(function () {
              var $this = $(this),
                zoomConfig = {
                  responsive: true,
                  zoomWindowFadeIn: 350,
                  zoomWindowFadeOut: 200,
                  borderSize: 0,
                  zoomContainer: $this.parent(),
                  zoomType: 'inner',
                  cursor: 'grab'
                };
                if($(window).width() >= 1280){
                  $this.elevateZoom(zoomConfig);
                }
            });
          }
        },
      }));

      $('.product-single-extended .product-single-carousel').owlCarousel($.extend(true, {}, sliderDefaultOptions, {
        dots: false,
        autoplay: false,
        responsive: {
          0: {
            items: 1
          },
          480: {
            items: 2
          },
          1200: {
            items: 3
          }
        }
      }));

      $('#carousel-custom-dots .owl-dot').click(function () {
        $('.product-single-carousel').trigger('to.owl.carousel', [$(this).index(), 300]);
      });
    },
    filterSlider: function () {
      // Slider For category pages / filter price
      var priceSlider = document.getElementById('price-slider'),
        currencyVar = 'EGP';

      // Check if #price-slider elem is exists if not return
      // to prevent error logs
      if (priceSlider == null) return;

      noUiSlider.create(priceSlider, {
        start: [200, 700],
        connect: true,
        step: 100,
        direction: 'rtl',
        margin: 100,
        range: {
          'min': 0,
          'max': 1000
        }
      });

      // Update Price Range
      priceSlider.noUiSlider.on('update', function (values, handle) {
        var values = values.map(function (value) {
          return value + currencyVar ;
        })
        $('#filter-price-range').text(values.join(' - '));
      });
    },
    stickySidebar: function () {
      $(".sidebar-wrapper, .sticky-slider").themeSticky({
        autoInit: true,
        minWidth: 991,
        containerSelector: '.row, .container',
        autoFit: true,
        paddingOffsetBottom: 10,
        paddingOffsetTop: 60,
        topSpacing: 0,
      });
    },
    countTo: function () {
      // CountTo plugin used count animations for homepages
      if ($.fn.countTo) {
        if ($.fn.waypoint) {
          $('.count').waypoint(function () {
            $(this.element).countTo();
          }, {
            offset: '90%',
            triggerOnce: true
          });
        } else {
          $('.count').countTo();
        }
      } else {
        // fallback if count plugin doesn't included
        // Get the data-to value and add it to element
        $('.count').each(function () {
          var $this = $(this),
            countValue = $this.data('to');
          $this.text(countValue);
        });
      }
    },
    tooltip: function () {
      // Bootstrap Tooltip
      if ($.fn.tooltip) {
        $('[data-toggle="tooltip"]').tooltip({
          trigger: 'hover focus' // click can be added too
        });
      }
    },
    popover: function () {
      // Bootstrap Popover
      if ($.fn.popover) {
        $('[data-toggle="popover"]').popover({
          trigger: 'focus'
        });
      }
    },
    changePassToggle: function () {
      // Toggle new/change password section via checkbox
      $('#change-pass-checkbox').on('change', function () {
        $('#account-chage-pass').toggleClass('show');
      });
    },
    changeBillToggle: function () {
      // Checkbox review - billing address checkbox
      $('#change-bill-address').on('change', function () {
        $('#checkout-shipping-address').toggleClass('show');
        $('#new-checkout-address').toggleClass('show');
      });
    },
    catAccordion: function () {
      // Toggle "open" Class for parent elem - Home cat widget
      $('.catAccordion').on('shown.bs.collapse', function (item) {
        var parent = $(item.target).closest('li');

        if (!parent.hasClass('open')) {
          parent.addClass('open');
        }
      }).on('hidden.bs.collapse', function (item) {
        var parent = $(item.target).closest('li');

        if (parent.hasClass('open')) {
          parent.removeClass('open');
        }
      });
    },
    scrollBtnAppear: function () {
      if ($(window).scrollTop() >= 400) {
        $('#scroll-top').addClass('fixed');
      } else {
        $('#scroll-top').removeClass('fixed');
      }
    },
    scrollToTop: function () {
      $('#scroll-top').on('click', function (e) {
        $('html, body').animate({
          'scrollTop': 0
        }, 1200);
        e.preventDefault();
      });
    },
    newsletterPopup: function () {
      $.magnificPopup.open({
        items: {
          src: '#newsletter-popup-form'
        },
        type: 'inline',
        mainClass: 'mfp-newsletter',
        removalDelay: 350
      });
    },
    lightBox: function () {
      // Newsletter popup
      if (document.getElementById('newsletter-popup-form')) {
        setTimeout(function () {
          var mpInstance = $.magnificPopup.instance;
          if (mpInstance.isOpen) {
            mpInstance.close();
            setTimeout(function () {
              Porto.newsletterPopup();
            }, 360);
          }
          else {
            Porto.newsletterPopup();
          }
        }, 10000);
      }

      // Gallery Lightbox
      var links = [];
      var $productSliderImages = $('.product-single-carousel .owl-item:not(.cloned) img').length === 0 ? $('.product-single-gallery img') : $('.product-single-carousel .owl-item:not(.cloned) img');
      $productSliderImages.each(function () {
        links.push({ 'src': $(this).attr('data-zoom-image') });
      });

      $(".prod-full-screen").click(function (e) {
        var currentIndex;
        if (e.currentTarget.closest(".product-slider-container")) {
          currentIndex = ($('.product-single-carousel').data('owl.carousel').current() + $productSliderImages.length - Math.ceil($productSliderImages.length / 2)) % $productSliderImages.length;
        }
        else {
          currentIndex = $(e.currentTarget).closest(".product-item").index();
        }

        $.magnificPopup.open({
          items: links,
          navigateByImgClick: true,
          type: 'image',
          gallery: {
            enabled: true
          },
        }, currentIndex);
      });

      //QuickView Popup
      $('a.btn-quickview').on('click', function (e) {
        e.preventDefault();
        Porto.ajaxLoading();
        var ajaxUrl = $(this).attr('href');
        setTimeout(function () {
          $.magnificPopup.open({
            type: 'ajax',
            mainClass: "mfp-ajax-product",
            tLoading: '',
            preloader: false,
            removalDelay: 350,
            items: {
              src: ajaxUrl
            },
            callbacks: {
              ajaxContentAdded: function () {
                Porto.owlCarousels();
                Porto.quantityInputs();
                if (typeof addthis !== 'undefined') {
                  addthis.layers.refresh();
                }
                else {
                  $.getScript("https://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5b927288a03dbde6");
                }
              },
              beforeClose: function () {
                $('.ajax-overlay').remove();
              }
            },
            ajax: {
              tError: '',
            }
          });
        }, 1500);
      });
    },
    productTabSroll: function () {
      // Scroll to product details tab and show review tab - product pages
      $('.rating-link').on('click', function (e) {
        if ($('.product-single-tabs').length) {
          $('#product-tab-reviews').tab('show');
        } else if ($('.product-single-collapse').length) {
          $('#product-reviews-content').collapse('show');
        } else {
          return;
        }

        if ($('#product-reviews-content').length) {
          setTimeout(function () {
            var scrollTabPos = $('#product-reviews-content').offset().top - 60;

            $('html, body').stop().animate({
              'scrollTop': scrollTabPos
            }, 800);
          }, 250);
        }
        e.preventDefault();
      });
    },
    quantityInputs: function () {
      // Quantity input - cart - product pages
      if ($.fn.TouchSpin) {
        // Vertical Quantity
        $('.vertical-quantity').TouchSpin({
          verticalbuttons: true,
          verticalup: '',
          verticaldown: '',
          verticalupclass: 'icon-up-dir',
          verticaldownclass: 'icon-down-dir',
          buttondown_class: 'btn btn-outline',
          buttonup_class: 'btn btn-outline',
          initval: 1,
          min: 1
        });

        // Horizontal Quantity
        $('.horizontal-quantity').TouchSpin({
          verticalbuttons: false,
          buttonup_txt: '',
          buttondown_txt: '',
          buttondown_class: 'btn btn-outline btn-down-icon',
          buttonup_class: 'btn btn-outline btn-up-icon',
          initval: 1,
          min: 1
        });
      }
    },
    ajaxLoading: function () {
      $('body').append("<div class='ajax-overlay'><i class='porto-loading-icon'></i></div>");
    },
    ajaxLoadProduct: function () {
      var loadCount = 0;
      $loadButton.click(function (e) {
        e.preventDefault();
        $(this).text('Loading ...');
        $.ajax({
          url: "ajax/category-ajax-products.html",
          success: function (result) {
            var $newItems = $(result);
            setTimeout(function () {
              $newItems.appendTo('.product-ajax-grid');
              $loadButton.text('Load More');
              loadCount++;
              if (loadCount >= 2) {
                $loadButton.hide();
              }
            }, 350);
          },
          failure: function () {
            $loadButton.text("Sorry something went wrong.");
          }
        });
      });
    },
    toggleFilter: function () {
      // toggle sidebar filter
      $('.filter-toggle a').click(function (e) {
        e.preventDefault();
        $('.filter-toggle').toggleClass('opened');
        $('main').toggleClass('sidebar-opened');
      });

      // hide sidebar filter and sidebar overlay
      $('.sidebar-overlay').click(function (e) {
        $('.filter-toggle').removeClass('opened');
        $('main').removeClass('sidebar-opened');
      });

      // show/hide sort menu
      $('.sort-menu-trigger').click(function (e) {
        e.preventDefault();
        $('.select-custom').removeClass('opened');
        $(e.target).closest('.select-custom').toggleClass('opened');
      });
    },
    toggleSidebar: function () {
      $('.sidebar-toggle').click(function () {
        $('main').toggleClass('sidebar-opened');
      });
    },
    scrollToElement: function () {
      $('.scrolling-box a[href^="#"]').on('click', function (event) {
        var target = $(this.getAttribute('href'));

        if (target.length) {
          event.preventDefault();
          $('html, body').stop().animate({
            scrollTop: target.offset().top - 90
          }, 700);
        }
      });
    },
    loginPopup: function () {
      $('.login-link').click(function (e) {
        e.preventDefault();
        Porto.ajaxLoading();
        var ajaxUrl = "ajax/login-popup.html";
        setTimeout(function () {
          $.magnificPopup.open({
            type: 'ajax',
            mainClass: "login-popup",
            tLoading: '',
            preloader: false,
            removalDelay: 350,
            items: {
              src: ajaxUrl
            },
            callbacks: {
              beforeClose: function () {
                $('.ajax-overlay').remove();
              }
            },
            ajax: {
              tError: '',
            }
          });
        }, 1500);
      });
    },
    windowClick: function () {
      $(document).click(function (e) {
        // if click is happend outside of filter menu, hide it.
        if (!$(e.target).closest('.toolbox-item.select-custom').length) {
          $('.select-custom').removeClass('opened');
        }
      });
    }
  };

  // $('body').prepend('<div class="loading-overlay"><div class="bounce-loader"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>');

  //Variables
  var $loadButton = $('.loadmore .btn');

  // Ready Event
  jQuery(document).ready(function () {
    // Init our app
    Porto.init();
    if($(".product-list").length > 0){
      var swiper = new Swiper('.product-list', {
        slidesPerView: 1,
        
        navigation: {
          nextEl: '.product-list .swiper-button-next',
          prevEl: '.product-list .swiper-button-prev',
        },
        pagination: {
          el: '.product-list .swiper-pagination',
          type: 'bullets',
          clickable: true,
        },
        breakpoints: {
          // when window width is >= 320px
          320: {
            slidesPerView: 2,
          },
          // when window width is >= 640px
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          992: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 5,
          }
        }
      });
    }
    if($('.product-slider-wrapper').length > 0){
      var galleryThumbs = new Swiper('.gallery-thumbs', {
        spaceBetween: 10,
        slidesPerView: 9,
        // direction: 'vertical',
        // freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        breakpoints: {
          320: {
            direction: 'horizontal',
          },
          768:{
            direction: 'vertical',
          }
        },
        navigation: {
          nextEl: '.gallery-thumbs .swiper-button-next',
          prevEl: '.gallery-thumbs .swiper-button-prev',
        },
      });
      var galleryTop = new Swiper('.gallery-top', {
        spaceBetween: 10,
        on: {
          init: function () {
          var $source = $('.gallery-top .swiper-slide');

          if ($.fn.elevateZoom) {
            $source.find('img').each(function () {
              var $this = $(this),
                zoomConfig = {
                  responsive: true,
                  zoomWindowFadeIn: 350,
                  zoomWindowFadeOut: 200,
                  borderSize: 0,
                  zoomContainer: $this.parent(),
                  zoomType: 'inner',
                  cursor: 'grab'
                };
                if($(window).width() >= 1280){
                  $this.elevateZoom(zoomConfig);
                }
            });
          }
        }
        },
        thumbs: {
          swiper: galleryThumbs
        }
      });
    }
    if($(".main-slider").length > 0){
      var swiper2 = new Swiper('.main-slider', {
        effect: 'fade',
        autoplay: {
          delay: 5000,
        },
        pagination: {
          el: '.main-slider .swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.main-slider .swiper-button-next',
          prevEl: '.main-slider .swiper-button-prev',
        },
      });
    }
    if($(".ratingControl").length > 0){
        $(".ratingControl").each(function(){
          $(this).rateYo({
              // maxValue: 1,
              // numStars: 1,
              rtl: true,
              starWidth: "15px",
              normalFill: "#b3b3b3",
              ratedFill: "#eb2429",
              
          }).on("rateyo.set", function (e, data) {
 
            alert("The rating is set to " + data.rating + "!");
        });;
      });
      }
      $('.layout-modes .layout-btn').on('click', function(e){
        e.preventDefault();
        $('.layout-btn').removeClass('active');
        $(this).addClass('active');

        $('.products-category').removeClass('is-list');
        $('.products-category').removeClass('is-list');
        if($(this).attr('data-view') == 'list')
        $('.products-category').addClass('is-list');
      })

      
    });
    
    $('#filterBtn').on('click', function showFilter(){
      $('.sidebar-shop').addClass('is-show');
    }); 
    $('#closeFilterBtn').on('click', function showFilter(){
      $('.sidebar-shop').removeClass('is-show');
    }); 

    $("#btnShowPrice").on('click', function(e){
      e.preventDefault();
      $(".mobile-sidebar").addClass("is-shown");
    });
    $("#btnCloseFilter").on('click', function(e){
      e.preventDefault();
      $(".mobile-sidebar").removeClass("is-shown");
    });
    
  // Load Event
  $(window).on('load', function () {
    $('body').addClass("loaded");
    Porto.scrollBtnAppear();
  });

  // Scroll Event
  $(window).on('scroll', function () {
    Porto.scrollBtnAppear();
  });

  // side menu
  function openSideMenu() {
    $('.side-menu').addClass('side-menu--open');
    $('body').addClass('no-overflow');
  }
  function closeSideMenu() {
    $('.side-menu').removeClass('side-menu--open');
    $('body').removeClass('no-overflow');
  }

  $("#btnMenu").on('click', function () {
    openSideMenu();
  });
  $('.side-menu__overlay').on('click', function () {
    closeSideMenu();
  });

  $('#btnCloseMenu').on('click', function () {
    closeSideMenu();
  });

  // side shopping cart
  function openSideCart(id) {
    $(id).addClass('side-cart--open');
    $('body').addClass('no-overflow');
  }
  function closeSideCart() {
    $('.side-cart').removeClass('side-cart--open');
    $('body').removeClass('no-overflow');
  }

  $("#btnOpenCart").on('click', function () {
    openSideCart('#shoppingCart');
  });
  $('.side-cart__overlay').on('click', function () {
    closeSideCart();
  });

  $('#btnCloseCart').on('click', function () {
    closeSideCart();
  });
  $('#btnCloseCompare').on('click', function () {
    closeSideCart();
  });
  

  $(document).on('keydown', function (event) {
    if (event.keyCode == 27) {
      closeSideMenu();
      closeSideCart();
    }
  });
  function showSnackBar(message, time, isFullWidth){
    if(isFullWidth === true)
      $('#snackBar').addClass('snackbar--full-width');
    $('#snackBar').addClass('snackbar--open');

    (time != null || time != undefined) ? time = time : time = 5000;
    $('#snackBar .snackbar__label').text(message);
    setTimeout(() => {
      closeSnackBar();
    }, time);
  }
  function closeSnackBar(){
    $('#snackBar').removeClass('snackbar--open snackbar--full-width');
    $('#snackBar .snackbar__label').text('');
  }
  $("#btnCloseSnackBar").click(closeSnackBar);
  // example
  $("#showSnackBar").click(function(){
    showSnackBar('تم اضافه المنتج للعربه بنجاح', 5000, true)
  });

  $('.btn-buy-widget').on('click', function(){
    $('.product-price-modal').addClass('is-shown');
  });
  $('.btn-buy-close, .product-price-modal__backdrop').on('click', function(){
    $('.product-price-modal').removeClass('is-shown');
  });

  if ($('.accordion').length) {
    $('.accordion__title').on('click', function(){
      $(this).toggleClass('is-expanded');
      $(this).parent().find('.accordion__child').eq(0).slideToggle(200);
    });
  }
  $(".product-price__panel input[type='radio']").on('change', function () {
      $(".product-price__panel").removeClass('is-checked');
      $(this).parents('.product-price__panel').addClass('is-checked');
  });
})(jQuery);