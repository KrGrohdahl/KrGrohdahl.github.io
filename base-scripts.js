$(document).ready(function () {
  if (localStorage.getItem("basev2") == "1") {
    $("#sidebar").addClass("TOGGLE1");
    $("body").addClass("BTOGGLE1");
  }

  if (localStorage.getItem("basev2") !== "1") {
    $("#sidebar").removeClass("TOGGLE1");
    $("body").removeClass("BTOGGLE1");
  }

  $(".cboxtog").on("click", function () {
    if (localStorage.getItem("basev2") !== "1") {
      localStorage.setItem("basev2", "1");
      $("#sidebar").addClass("TOGGLE");
      $("body").addClass("BTOGGLE");
    } else {
      localStorage.setItem("basev2", "0");
      $("#sidebar").removeClass("TOGGLE1 TOGGLE");
      $("body").removeClass("BTOGGLE1 BTOGGLE");
    }
  });
});

$(document).ready(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 600) {
      $("#scrolltotop").addClass("slidein");
    } else {
      $("#scrolltotop").removeClass("slidein");
    }
  });

  $("#scrolltotop").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 400);
    return false;
  });
});

$("#recents").html(function () {
  var str = "";
  $(".recent-topics-info").each(function () {
    str = str + "<div class='holdrec'>" + $(this).html() + "</div>";
  });
  $("#recents").append(str);
});

$(function () {
  var replace = $(".topic-desc").text().replace(",", "");
  $(".topic-desc").text(replace);
});

//deleting or moving my base credits is against my terms of usage
$(document).ready(function () {
  $(".copyright").append(
    "<div class='credits' style='display: block!important'>base coded exclusively by <a href='https://sourced.jcink.net/index.php?showuser=1'>essi</a></div>"
  );
  if (parseInt($(".credits").css("fontSize")) < 7) {
    $(".credits").css({ "font-size": "7px" });
  }
});

//personal credits
$(document).ready(function () {
  $(".copyright").append(
    "<div class='credits' style='display: block!important'>skin coded by kris for use only on naruto-saga.com</a></div>"
  );
  if (parseInt($(".credits").css("fontSize")) < 7) {
    $(".credits").css({ "font-size": "7px" });
  }
});

//style-my-tootltips by malihu (http://manos.malihu.gr)
//plugin home http://manos.malihu.gr/style-my-tooltips-jquery-plugin
(function ($) {
  var methods = {
    init: function (options) {
      var defaults = {
          tip_follows_cursor: false, //tooltip follows cursor: boolean
          tip_delay_time: 700, //tooltip delay before displaying: milliseconds
          tip_fade_speed: 500, //tooltip fade in/out speed: milliseconds
          attribute: "title", //tooltip text come from this attribute
        },
        options = $.extend(defaults, options);
      if ($("#s-m-t-tooltip").length === 0) {
        $("body").append("<div id='s-m-t-tooltip'><div></div></div>");
      }
      var smtTooltip = $("#s-m-t-tooltip");
      smtTooltip
        .css({ position: "absolute", display: "none" })
        .data("smt-z-index", smtTooltip.css("z-index"))
        .children("div")
        .css({ width: "100%", height: "100%" });
      function smtGetCursorCoords(event) {
        var smtCursorCoordsX = event.pageX,
          smtCursorCoordsY = event.pageY;
        smtTooltip.style_my_tooltips("position", {
          smtCursorCoordsX: smtCursorCoordsX,
          smtCursorCoordsY: smtCursorCoordsY,
        });
      }
      $(".smt-current-element").live("mouseout mousedown click", function () {
        var $this = $(this);
        clearTimeout(smtTooltip_delay);
        smtTooltip.style_my_tooltips("hide", {
          speed: $this.data("smt-fade-speed"),
        });
        $(document).unbind("mousemove");
        $this.removeClass("smt-current-element");
        if ($this.attr(options.attribute) === "") {
          $this.attr(options.attribute, $this.data("smt-title"));
        }
      });
      return this["live"]("mouseover", function (event) {
        var $this = $(this),
          title = $this.attr(options.attribute);
        $this
          .addClass("smt-current-element")
          .data({
            "smt-title": title,
            "smt-fade-speed": options.tip_fade_speed,
          })
          .attr(options.attribute, "");
        smtTooltip.style_my_tooltips("update", {
          title: title,
          speed: options.tip_fade_speed,
          delay: options.tip_delay_time,
          tip_follows_cursor: options.tip_follows_cursor,
        });
        $(document).bind("mousemove", function (event) {
          smtGetCursorCoords(event);
        });
      });
    },
    update: function (options) {
      var $this = $(this);
      $this
        .stop()
        .css({ display: "none", "z-index": $this.data("smt-z-index") })
        .children("div")
        .text(options.title);
      smtTooltip_delay = setTimeout(function () {
        $this.style_my_tooltips("show", {
          speed: options.speed,
          tip_follows_cursor: options.tip_follows_cursor,
        });
      }, options.delay);
    },
    show: function (options) {
      var $this = $(this);
      $this.stop().fadeTo(options.speed, 1);
      if (!options.tip_follows_cursor) {
        $(document).unbind("mousemove");
      }
    },
    hide: function (options) {
      var $this = $(this);
      $this.stop().fadeTo(options.speed, 0, function () {
        $this.css({ "z-index": "-1" });
      });
    },
    position: function (options) {
      var $this = $(this),
        winScrollX = $(window).scrollLeft(),
        winScrollY = $(window).scrollTop(),
        tipWidth = $this.outerWidth(true),
        tipHeight = $this.outerHeight(true),
        leftOffset = options.smtCursorCoordsX + tipWidth - winScrollX,
        topOffset = options.smtCursorCoordsY + tipHeight - winScrollY;
      if (
        leftOffset <= $(window).width() &&
        leftOffset <= $(document).width()
      ) {
        $this.css("left", options.smtCursorCoordsX);
      } else {
        var thePosX = options.smtCursorCoordsX - tipWidth;
        if (thePosX >= winScrollX) {
          $this.css("left", thePosX);
        } else {
          $this.css("left", winScrollX);
        }
      }
      if (
        topOffset <= $(window).height() &&
        topOffset <= $(document).height()
      ) {
        $this.css("top", options.smtCursorCoordsY);
      } else {
        var thePosY = options.smtCursorCoordsY - tipHeight;
        if (thePosY >= winScrollY) {
          $this.css("top", thePosY);
        } else {
          $this.css("top", winScrollY);
        }
      }
    },
  };
  $.fn.style_my_tooltips = function (method) {
    if (methods[method]) {
      return methods[method].apply(
        this,
        Array.prototype.slice.call(arguments, 1)
      );
    } else if (typeof method === "object" || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error("Method " + method + " does not exist");
    }
  };
})(jQuery);

(function ($) {
  $(document).ready(function () {
    $("[title]").style_my_tooltips({
      tip_follows_cursor: true,
      tip_delay_time: 0,
      tip_fade_speed: 300,
    });
  });
})(jQuery);

// on-scroll event listener that adds "bottomborder" class to "top-navigation-bar" when scrolled past the "divider" div

window.addEventListener("scroll", function () {
  var elementTarget = document.getElementById("divider");
  if (
    window.scrollY >
    elementTarget.offsetTop + elementTarget.offsetHeight - 100
  ) {
    $(".top-navigation-bar").addClass("bottomborder");
  } else {
    $(".top-navigation-bar").removeClass("bottomborder");
  }
});

// on-scroll event listener that adds "side-bar-slide" class to "side-bar-container" when scrolled past the "divider" div

window.addEventListener("scroll", function () {
  var elementTarget = document.getElementById("divider");
  if (
    window.scrollY >
    elementTarget.offsetTop + elementTarget.offsetHeight - 500
  ) {
    $(".side-bar-container i").addClass("side-bar-slide");
  } else {
    $(".side-bar-container i").removeClass("side-bar-slide");
  }
});

// board statistics HTML page with recent topics clip by ESSI

var topic = "/index.php?act=idx";
$.get(topic, function (data) {
  $(".inner-stats", data).each(function () {
    str = $(this).html();
  });
  $("#recent-topics", data).each(function () {
    topics = $(this).html();
  });
  $("#stats").append(str);
  $("#recents").append(topics);
});

/** popout profile script by ESSI
http://sourced.jcink.net
**/

$(document).ready(function () {
  $("a").on("click", function () {
    if (
      $(this).attr("href").indexOf("showuser") > -1 ||
      $(this).attr("href").indexOf("index.php?act=Profile") > -1
    ) {
      var href = $(this).attr("href");
      $("#profile").addClass("popout");
      $(".main-navigation").addClass("modal-colour-swap");
      $.get(href, function (data) {
        $("#outerprofile", data).each(function () {
          profile = $(this).html();
          $("#profile-content").html(profile);
        });
      });

      return false;
    }
  });
  $(".close-pro, .exit-pro").on("click", function () {
    if ($("#profile").hasClass("popout")) {
      $("#profile").removeClass("popout");
      $(".main-navigation").removeClass("modal-colour-swap");
      $("#profile-content").html("loading...");
    }
  });
});

$(document).on("keyup", function () {
  if (event.keyCode === 27 && $("#profile").hasClass("popout")) {
    $("#profile").removeClass("popout");
    $(".main-navigation").removeClass("modal-colour-swap");
  }
});
