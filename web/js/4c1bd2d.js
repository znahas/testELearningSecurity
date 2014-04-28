/* ========================================================================
 * Bootstrap: transition.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#transitions
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      'WebkitTransition' : 'webkitTransitionEnd'
    , 'MozTransition'    : 'transitionend'
    , 'OTransition'      : 'oTransitionEnd otransitionend'
    , 'transition'       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false, $el = this
    $(this).one($.support.transition.end, function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()
  })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#alerts
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.hasClass('alert') ? $this : $this.parent()
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      $parent.trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one($.support.transition.end, removeElement)
        .emulateTransitionEnd(150) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  var old = $.fn.alert

  $.fn.alert = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(window.jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#buttons
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element = $(element)
    this.options  = $.extend({}, Button.DEFAULTS, options)
  }

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state = state + 'Text'

    if (!data.resetText) $el.data('resetText', $el[val]())

    $el[val](data[state] || this.options[state])

    // push to event loop to allow forms to submit
    setTimeout(function () {
      state == 'loadingText' ?
        $el.addClass(d).attr(d, d) :
        $el.removeClass(d).removeAttr(d);
    }, 0)
  }

  Button.prototype.toggle = function () {
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
        .prop('checked', !this.$element.hasClass('active'))
        .trigger('change')
      if ($input.prop('type') === 'radio') $parent.find('.active').removeClass('active')
    }

    this.$element.toggleClass('active')
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  var old = $.fn.button

  $.fn.button = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document).on('click.bs.button.data-api', '[data-toggle^=button]', function (e) {
    var $btn = $(e.target)
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
    $btn.button('toggle')
    e.preventDefault()
  })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#carousel
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      =
    this.sliding     =
    this.interval    =
    this.$active     =
    this.$items      = null

    this.options.pause == 'hover' && this.$element
      .on('mouseenter', $.proxy(this.pause, this))
      .on('mouseleave', $.proxy(this.cycle, this))
  }

  Carousel.DEFAULTS = {
    interval: 5000
  , pause: 'hover'
  , wrap: true
  }

  Carousel.prototype.cycle =  function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getActiveIndex = function () {
    this.$active = this.$element.find('.item.active')
    this.$items  = this.$active.parent().children()

    return this.$items.index(this.$active)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getActiveIndex()

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid', function () { that.to(pos) })
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition.end) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || $active[type]()
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var fallback  = type == 'next' ? 'first' : 'last'
    var that      = this

    if (!$next.length) {
      if (!this.options.wrap) return
      $next = this.$element.find('.item')[fallback]()
    }

    this.sliding = true

    isCycling && this.pause()

    var e = $.Event('slide.bs.carousel', { relatedTarget: $next[0], direction: direction })

    if ($next.hasClass('active')) return

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      this.$element.one('slid', function () {
        var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()])
        $nextIndicator && $nextIndicator.addClass('active')
      })
    }

    if ($.support.transition && this.$element.hasClass('slide')) {
      this.$element.trigger(e)
      if (e.isDefaultPrevented()) return
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one($.support.transition.end, function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () { that.$element.trigger('slid') }, 0)
        })
        .emulateTransitionEnd(600)
    } else {
      this.$element.trigger(e)
      if (e.isDefaultPrevented()) return
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger('slid')
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  var old = $.fn.carousel

  $.fn.carousel = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  $(document).on('click.bs.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
    var $this   = $(this), href
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    $target.carousel(options)

    if (slideIndex = $this.attr('data-slide-to')) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  })

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      $carousel.carousel($carousel.data())
    })
  })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#collapse
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.transitioning = null

    if (this.options.parent) this.$parent = $(this.options.parent)
    if (this.options.toggle) this.toggle()
  }

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var actives = this.$parent && this.$parent.find('> .panel > .in')

    if (actives && actives.length) {
      var hasData = actives.data('bs.collapse')
      if (hasData && hasData.transitioning) return
      actives.collapse('hide')
      hasData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')
      [dimension](0)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('in')
        [dimension]('auto')
      this.transitioning = 0
      this.$element.trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
      [dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element
      [dimension](this.$element[dimension]())
      [0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse')
      .removeClass('in')

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .trigger('hidden.bs.collapse')
        .removeClass('collapsing')
        .addClass('collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  var old = $.fn.collapse

  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle=collapse]', function (e) {
    var $this   = $(this), href
    var target  = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
    var $target = $(target)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()
    var parent  = $this.attr('data-parent')
    var $parent = parent && $(parent)

    if (!data || !data.transitioning) {
      if ($parent) $parent.find('[data-toggle=collapse][data-parent="' + parent + '"]').not($this).addClass('collapsed')
      $this[$target.hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    }

    $target.collapse(option)
  })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#dropdowns
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle=dropdown]'
  var Dropdown = function (element) {
    var $el = $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we we use a backdrop because click events don't delegate
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
      }

      $parent.trigger(e = $.Event('show.bs.dropdown'))

      if (e.isDefaultPrevented()) return

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown')

      $this.focus()
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27)/.test(e.keyCode)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive || (isActive && e.keyCode == 27)) {
      if (e.which == 27) $parent.find(toggle).focus()
      return $this.click()
    }

    var $items = $('[role=menu] li:not(.divider):visible a', $parent)

    if (!$items.length) return

    var index = $items.index($items.filter(':focus'))

    if (e.keyCode == 38 && index > 0)                 index--                        // up
    if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
    if (!~index)                                      index=0

    $items.eq(index).focus()
  }

  function clearMenus() {
    $(backdrop).remove()
    $(toggle).each(function (e) {
      var $parent = getParent($(this))
      if (!$parent.hasClass('open')) return
      $parent.trigger(e = $.Event('hide.bs.dropdown'))
      if (e.isDefaultPrevented()) return
      $parent.removeClass('open').trigger('hidden.bs.dropdown')
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  var old = $.fn.dropdown

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('dropdown')

      if (!data) $this.data('dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api'  , toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle + ', [role=menu]' , Dropdown.prototype.keydown)

}(window.jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#modals
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options   = options
    this.$element  = $(element)
    this.$backdrop =
    this.isShown   = null

    if (this.options.remote) this.$element.load(this.options.remote)
  }

  Modal.DEFAULTS = {
      backdrop: true
    , keyboard: true
    , show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this[!this.isShown ? 'show' : 'hide'](_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.escape()

    this.$element.on('click.dismiss.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(document.body) // don't move modals dom position
      }

      that.$element.show()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$element.find('.modal-dialog') // wait for modal to slide in
          .one($.support.transition.end, function () {
            that.$element.focus().trigger(e)
          })
          .emulateTransitionEnd(300) :
        that.$element.focus().trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)
      .off('click.dismiss.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one($.support.transition.end, $.proxy(this.hideModal, this))
        .emulateTransitionEnd(300) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.focus()
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keyup.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keyup.dismiss.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.removeBackdrop()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that    = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(document.body)

      this.$element.on('click.dismiss.modal', $.proxy(function (e) {
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus.call(this.$element[0])
          : this.hide.call(this)
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      $.support.transition && this.$element.hasClass('fade')?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (callback) {
      callback()
    }
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  var old = $.fn.modal

  $.fn.modal = function (option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
    var option  = $target.data('modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    e.preventDefault()

    $target
      .modal(option, this)
      .one('hide', function () {
        $this.is(':visible') && $this.focus()
      })
  })

  $(document)
    .on('show.bs.modal',  '.modal', function () { $(document.body).addClass('modal-open') })
    .on('hidden.bs.modal', '.modal', function () { $(document.body).removeClass('modal-open') })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       =
    this.options    =
    this.enabled    =
    this.timeout    =
    this.hoverState =
    this.$element   = null

    this.init('tooltip', element, options)
  }

  Tooltip.DEFAULTS = {
    animation: true
  , placement: 'top'
  , selector: false
  , template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
  , trigger: 'hover focus'
  , title: ''
  , delay: 0
  , html: false
  , container: false
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled  = true
    this.type     = type
    this.$element = $(element)
    this.options  = this.getOptions(options)

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focus'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'blur'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay
      , hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.'+ this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      var $tip = this.tip()

      this.setContent()

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var $parent = this.$element.parent()

        var orgPlacement = placement
        var docScroll    = document.documentElement.scrollTop || document.body.scrollTop
        var parentWidth  = this.options.container == 'body' ? window.innerWidth  : $parent.outerWidth()
        var parentHeight = this.options.container == 'body' ? window.innerHeight : $parent.outerHeight()
        var parentLeft   = this.options.container == 'body' ? 0 : $parent.offset().left

        placement = placement == 'bottom' && pos.top   + pos.height  + actualHeight - docScroll > parentHeight  ? 'top'    :
                    placement == 'top'    && pos.top   - docScroll   - actualHeight < 0                         ? 'bottom' :
                    placement == 'right'  && pos.right + actualWidth > parentWidth                              ? 'left'   :
                    placement == 'left'   && pos.left  - actualWidth < parentLeft                               ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)
      this.$element.trigger('shown.bs.' + this.type)
    }
  }

  Tooltip.prototype.applyPlacement = function(offset, placement) {
    var replace
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  = offset.top  + marginTop
    offset.left = offset.left + marginLeft

    $tip
      .offset(offset)
      .addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      replace = true
      offset.top = offset.top + height - actualHeight
    }

    if (/bottom|top/.test(placement)) {
      var delta = 0

      if (offset.left < 0) {
        delta       = offset.left * -2
        offset.left = 0

        $tip.offset(offset)

        actualWidth  = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight
      }

      this.replaceArrow(delta - width + actualWidth, actualWidth, 'left')
    } else {
      this.replaceArrow(actualHeight - height, actualHeight, 'top')
    }

    if (replace) $tip.offset(offset)
  }

  Tooltip.prototype.replaceArrow = function(delta, dimension, position) {
    this.arrow().css(position, delta ? (50 * (1 - delta / dimension) + "%") : '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function () {
    var that = this
    var $tip = this.tip()
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && this.$tip.hasClass('fade') ?
      $tip
        .one($.support.transition.end, complete)
        .emulateTransitionEnd(150) :
      complete()

    this.$element.trigger('hidden.bs.' + this.type)

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function () {
    var el = this.$element[0]
    return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
      width: el.offsetWidth
    , height: el.offsetHeight
    }, this.$element.offset())
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width   }
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.tip = function () {
    return this.$tip = this.$tip || $(this.options.template)
  }

  Tooltip.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow')
  }

  Tooltip.prototype.validate = function () {
    if (!this.$element[0].parentNode) {
      this.hide()
      this.$element = null
      this.options  = null
    }
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = e ? $(e.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type) : this
    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
  }

  Tooltip.prototype.destroy = function () {
    this.hide().$element.off('.' + this.type).removeData('bs.' + this.type)
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  var old = $.fn.tooltip

  $.fn.tooltip = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(window.jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#popovers
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.DEFAULTS = $.extend({} , $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right'
  , trigger: 'click'
  , content: ''
  , template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content')[this.options.html ? 'html' : 'text'](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.arrow')
  }

  Popover.prototype.tip = function () {
    if (!this.$tip) this.$tip = $(this.options.template)
    return this.$tip
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  var old = $.fn.popover

  $.fn.popover = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(window.jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#scrollspy
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    var href
    var process  = $.proxy(this.process, this)

    this.$element       = $(element).is('body') ? $(window) : $(element)
    this.$body          = $('body')
    this.$scrollElement = this.$element.on('scroll.bs.scroll-spy.data-api', process)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target
      || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      || '') + ' .nav li > a'
    this.offsets        = $([])
    this.targets        = $([])
    this.activeTarget   = null

    this.refresh()
    this.process()
  }

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.refresh = function () {
    var offsetMethod = this.$element[0] == window ? 'offset' : 'position'

    this.offsets = $([])
    this.targets = $([])

    var self     = this
    var $targets = this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#\w/.test(href) && $(href)

        return ($href
          && $href.length
          && [[ $href[offsetMethod]().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()), href ]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        self.offsets.push(this[0])
        self.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight
    var maxScroll    = scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets.last()[0]) && this.activate(i)
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
        && this.activate( targets[i] )
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    $(this.selector)
      .parents('.active')
      .removeClass('active')

    var selector = this.selector
      + '[data-target="' + target + '"],'
      + this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length)  {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  var old = $.fn.scrollspy

  $.fn.scrollspy = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      $spy.scrollspy($spy.data())
    })
  })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#tabs
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var previous = $ul.find('.active:last a')[0]
    var e        = $.Event('show.bs.tab', {
      relatedTarget: previous
    })

    $this.trigger(e)

    if (e.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.parent('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $this.trigger({
        type: 'shown.bs.tab'
      , relatedTarget: previous
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && $active.hasClass('fade')

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
        .removeClass('active')

      element.addClass('active')

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu')) {
        element.closest('li.dropdown').addClass('active')
      }

      callback && callback()
    }

    transition ?
      $active
        .one($.support.transition.end, next)
        .emulateTransitionEnd(150) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  var old = $.fn.tab

  $.fn.tab = function ( option ) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  $(document).on('click.bs.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#affix
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)
    this.$window = $(window)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element = $(element)
    this.affixed  =
    this.unpin    = null

    this.checkPosition()
  }

  Affix.RESET = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var scrollHeight = $(document).height()
    var scrollTop    = this.$window.scrollTop()
    var position     = this.$element.offset()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top()
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom()

    var affix = this.unpin   != null && (scrollTop + this.unpin <= position.top) ? false :
                offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ? 'bottom' :
                offsetTop    != null && (scrollTop <= offsetTop) ? 'top' : false

    if (this.affixed === affix) return
    if (this.unpin) this.$element.css('top', '')

    this.affixed = affix
    this.unpin   = affix == 'bottom' ? position.top - scrollTop : null

    this.$element.removeClass(Affix.RESET).addClass('affix' + (affix ? '-' + affix : ''))

    if (affix == 'bottom') {
      this.$element.offset({ top: document.body.offsetHeight - offsetBottom - this.$element.height() })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  var old = $.fn.affix

  $.fn.affix = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom) data.offset.bottom = data.offsetBottom
      if (data.offsetTop)    data.offset.top    = data.offsetTop

      $spy.affix(data)
    })
  })

}(window.jQuery);

/* ==========================================================
 * bc-bootstrap-collection.js
 * http://bootstrap.braincrafted.com
 * ==========================================================
 * Copyright 2013 Florian Eckerstorfer
 *
 * ========================================================== */


!function ($) {

    "use strict"; // jshint ;_;

    /* COLLECTION CLASS DEFINITION
     * ====================== */

    var addField = '[data-addfield="collection"]',
        removeField = '[data-removefield="collection"]',
        CollectionAdd = function (el) {
            $(el).on('click', addField, this.addField);
        },
        CollectionRemove = function (el) {
            $(el).on('click', removeField, this.removeField);
        }
    ;

    CollectionAdd.prototype.addField = function (e) {
        var $this = $(this),
            selector = $this.attr('data-collection'),
            $parent
        ;

        $parent = $(selector);

        e && e.preventDefault();

        var collection = $('#'+selector),
            list = collection.find('ul'),
            count = list.find('li').size()
        ;

        var newWidget = collection.attr('data-prototype');

        // Check if an element with this ID already exists.
        // If it does, increase the count by one and try again
        var newName = newWidget.match(/id="(.*?)"/);
        while ($('#' + newName[1].replace(/__name__/g, count)).size() > 0) {
            count++;
        }
        newWidget = newWidget.replace(/__name__/g, count);
        newWidget = newWidget.replace(/__id__/g, newName[1].replace(/__name__/g, count));
        var newLi = $('<li></li>').html(newWidget);
        newLi.appendTo(list);
    };

    CollectionRemove.prototype.removeField = function (e) {
        var $this = $(this);

        e && e.preventDefault();

        var listElement = $this.closest('li').remove();
    }


    /* COLLECTION PLUGIN DEFINITION
     * ======================= */

    var oldAdd = $.fn.addField;
    var oldRemove = $.fn.removeField;

    $.fn.addField = function (option) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('addfield')
            ;
            if (!data) {
                $this.data('addfield', (data = new CollectionAdd(this)));
            }
            if (typeof option == 'string') {
                data[option].call($this);
            }
        });
    };

    $.fn.removeField = function (option) {
        return this.each(function() {
            var $this = $(this),
                data = $this.data('removefield')
            ;
            if (!data) {
                $this.data('removefield', (data = new CollectionRemove(this)));
            }
            if (typeof option == 'string') {
                data[option].call($this);
            }
        });
    };

    $.fn.addField.Constructor = CollectionAdd;
    $.fn.removeField.Constructor = CollectionRemove;


    /* COLLECTION NO CONFLICT
     * ================= */

    $.fn.addField.noConflict = function () {
        $.fn.addField = oldAdd;
        return this;
    }
    $.fn.removeField.noConflict = function () {
        $.fn.removeField = oldRemove;
        return this;
    }


    /* COLLECTION DATA-API
     * ============== */

    $(document).on('click.addfield.data-api', addField, CollectionAdd.prototype.addField);
    $(document).on('click.removefield.data-api', removeField, CollectionRemove.prototype.removeField);

 }(window.jQuery);

/*
 *
 * Copyright (c) 2006-2011 Sam Collett (http://www.texotela.co.uk)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version 1.3
 * Demo: http://www.texotela.co.uk/code/jquery/numeric/
 *
 */
(function($)
{
    /*
     * Allows only valid characters to be entered into input boxes.
     * Note: fixes value when pasting via Ctrl+V, but not when using the mouse to paste
     *      side-effect: Ctrl+A does not work, though you can still use the mouse to select (or double-click to select all)
     *
     * @name     numeric
     * @param    config      { decimal : "." , negative : true }
     * @param    callback     A function that runs if the number is not valid (fires onblur)
     * @author   Sam Collett (http://www.texotela.co.uk)
     * @example  $(".numeric").numeric();
     * @example  $(".numeric").numeric(","); // use , as separater
     * @example  $(".numeric").numeric({ decimal : "," }); // use , as separator
     * @example  $(".numeric").numeric({ negative : false }); // do not allow negative values
     * @example  $(".numeric").numeric(null, callback); // use default values, pass on the 'callback' function
     *
     */
    $.fn.numeric = function(config, callback)
    {
        if (typeof config === 'boolean') {
            config = { decimal: config };
        }
        config = config || {};
        // if config.negative undefined, set to true (default is to allow negative numbers)
        if (typeof config.negative == "undefined") {
            config.negative = true;
        }
        // set decimal point
        var decimal = (config.decimal === false) ? "" : config.decimal || ".";
        // allow negatives
        var negative = !!((config.negative === true));
        // callback function
        callback = typeof callback == "function" ? callback : function()
        {
        };
        // set data and methods
        return this.data("numeric.decimal", decimal).data("numeric.negative", negative).data("numeric.callback", callback).keypress($.fn.numeric.keypress).keyup($.fn.numeric.keyup).blur($.fn.numeric.blur);
    };

    $.fn.numeric.keypress = function(e)
    {
        // get decimal character and determine if negatives are allowed
        var decimal = $.data(this, "numeric.decimal");
        var negative = $.data(this, "numeric.negative");
        // get the key that was pressed
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        // allow enter/return key (only when in an input box)
        if (key == 13 && this.nodeName.toLowerCase() == "input") {
            return true;
        }
        else {
            if (key == 13) {
                return false;
            }
        }
        var allow = false;
        // allow Ctrl+A
        if ((e.ctrlKey && key == 97 /* firefox */) || (e.ctrlKey && key == 65) /* opera */) {
            return true;
        }
        // allow Ctrl+X (cut)
        if ((e.ctrlKey && key == 120 /* firefox */) || (e.ctrlKey && key == 88) /* opera */) {
            return true;
        }
        // allow Ctrl+C (copy)
        if ((e.ctrlKey && key == 99 /* firefox */) || (e.ctrlKey && key == 67) /* opera */) {
            return true;
        }
        // allow Ctrl+Z (undo)
        if ((e.ctrlKey && key == 122 /* firefox */) || (e.ctrlKey && key == 90) /* opera */) {
            return true;
        }
        // allow or deny Ctrl+V (paste), Shift+Ins
        if ((e.ctrlKey && key == 118 /* firefox */) || (e.ctrlKey && key == 86) /* opera */
            || (e.shiftKey && key == 45)) {
            return true;
        }
        // if a number was not pressed
        if (key < 48 || key > 57) {
            /* '-' only allowed at start and if negative numbers allowed */
            if (this.value.indexOf("-") != 0 && negative && key == 45 && (this.value.length == 0 || ($.fn.getSelectionStart(this)) == 0)) {
                return true;
            }
            /* only one decimal separator allowed */
            if (decimal && key == decimal.charCodeAt(0) && this.value.indexOf(decimal) != -1) {
                allow = false;
            }
            // check for other keys that have special purposes
            if (
                key != 8 /* backspace */ &&
                    key != 9 /* tab */ &&
                    key != 13 /* enter */ &&
                    key != 35 /* end */ &&
                    key != 36 /* home */ &&
                    key != 37 /* left */ &&
                    key != 39 /* right */ &&
                    key != 46 /* del */
                ) {
                allow = false;
            }
            else {
                // for detecting special keys (listed above)
                // IE does not support 'charCode' and ignores them in keypress anyway
                if (typeof e.charCode != "undefined") {
                    // special keys have 'keyCode' and 'which' the same (e.g. backspace)
                    if (e.keyCode == e.which && e.which != 0) {
                        allow = true;
                        // . and delete share the same code, don't allow . (will be set to true later if it is the decimal point)
                        if (e.which == 46) {
                            allow = false;
                        }
                    }
                    // or keyCode != 0 and 'charCode'/'which' = 0
                    else {
                        if (e.keyCode != 0 && e.charCode == 0 && e.which == 0) {
                            allow = true;
                        }
                    }
                }
            }
            // if key pressed is the decimal and it is not already in the field
            if (decimal && key == decimal.charCodeAt(0)) {
                allow = this.value.indexOf(decimal) == -1;
            }
        }
        else {
            allow = true;
        }
        return allow;
    };

    $.fn.numeric.keyup = function(e)
    {
        if (e.keyCode == 9) {
            return;
        }

        var val = this.value;
        if (val.length > 0) {
            // get carat (cursor) position
            var carat = $.fn.getSelectionStart(this);
            // get decimal character and determine if negatives are allowed
            var decimal = $.data(this, "numeric.decimal");
            var negative = $.data(this, "numeric.negative");

            // prepend a 0 if necessary
            if (decimal != "") {
                // find decimal point
                var dot = val.indexOf(decimal);
                // if dot at start, add 0 before
                if (dot == 0) {
                    this.value = "0" + val;
                }
                // if dot at position 1, check if there is a - symbol before it
                if (dot == 1 && val.charAt(0) == "-") {
                    this.value = "-0" + val.substring(1);
                }
                val = this.value;
            }

            // if pasted in, only allow the following characters
            var validChars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '-', decimal];
            // get length of the value (to loop through)
            var length = val.length;
            // loop backwards (to prevent going out of bounds)
            for (i = length - 1; i >= 0; i--) {
                ch = val.charAt(i);
                // remove '-' if it is in the wrong place
                if (i != 0 && ch == "-") {
                    val = val.substring(0, i) + val.substring(i + 1);
                }
                // remove character if it is at the start, a '-' and negatives aren't allowed
                else {
                    if (i == 0 && !negative && ch == "-") {
                        val = val.substring(1);
                    }
                }
                var validChar = false;
                // loop through validChars
                for (var j = 0; j < validChars.length; j++) {
                    // if it is valid, break out the loop
                    if (ch == validChars[j]) {
                        validChar = true;
                        break;
                    }
                }
                // if not a valid character, or a space, remove
                if (!validChar || ch == " ") {
                    val = val.substring(0, i) + val.substring(i + 1);
                }
            }
            // remove extra decimal characters
            var firstDecimal = val.indexOf(decimal);
            if (firstDecimal > 0) {
                for (var i = length - 1; i > firstDecimal; i--) {
                    var ch = val.charAt(i);
                    // remove decimal character
                    if (ch == decimal) {
                        val = val.substring(0, i) + val.substring(i + 1);
                    }
                }
            }
            // set the value and prevent the cursor moving to the end
            this.value = val;
            $.fn.setSelection(this, carat);
        }
    };

    $.fn.numeric.blur = function()
    {
        var decimal = $.data(this, "numeric.decimal");
        var callback = $.data(this, "numeric.callback");
        var val = this.value;
        if (val != "") {
            var re = new RegExp("^\\d+$|\\d*" + decimal + "\\d+");
            if (!re.exec(val)) {
                callback.apply(this);
            }
        }
    };

    $.fn.removeNumeric = function()
    {
        return this.data("numeric.decimal", null).data("numeric.negative", null).data("numeric.callback", null).unbind("keypress", $.fn.numeric.keypress).unbind("blur", $.fn.numeric.blur);
    };

    // Based on code from http://javascript.nwbox.com/cursor_position/ (Diego Perini <dperini@nwbox.com>)
    $.fn.getSelectionStart = function(o)
    {
        if (o.createTextRange) {
            var r = document.selection.createRange().duplicate();
            r.moveEnd('character', o.value.length);
            if (r.text == '') {
                return o.value.length;
            }
            return o.value.lastIndexOf(r.text);
        }
        else {
            return o.selectionStart;
        }
    };

    // set the selection, o is the object (input), p is the position ([start, end] or just start)
    $.fn.setSelection = function(o, p)
    {
        // if p is number, start and end are the same
        if (typeof p == "number") {
            p = [p, p];
        }
        // only set if p is an array of length 2
        if (p && p.constructor == Array && p.length == 2) {
            if (o.createTextRange) {
                var r = o.createTextRange();
                r.collapse(true);
                r.moveStart('character', p[0]);
                r.moveEnd('character', p[1]);
                r.select();
            }
            else {
                if (o.setSelectionRange) {
                    o.focus();
                    o.setSelectionRange(p[0], p[1]);
                }
            }
        }
    };
    $(".numeric").numeric();
    $(".integer").numeric(false, function()
    {
        alert("Integers only");
        this.value = "";
        this.focus();
    });
    $(".positive").numeric({ negative: false }, function()
    {
        alert("No negative values");
        this.value = "";
        this.focus();
    });
    $(".positive-integer").numeric({ decimal: false, negative: false }, function()
    {
        alert("Positive integers only");
        this.value = "";
        this.focus();
    });
    $("#remove").click(
        function(e)
        {
            e.preventDefault();
            $(".numeric,.integer,.positive").removeNumeric();
        }
    );


})(jQuery);

/*!
 * TableSorter 2.12.0 min - Client-side table sorting with ease!
 * Copyright (c) 2007 Christian Bach
 */
!(function(g)
{
    g.extend({tablesorter: new function()
    {
        function c(a)
        {
            "undefined" !== typeof console && "undefined" !== typeof console.log ? console.log(a) : alert(a)
        }

        function l(a, b)
        {
            c(a + " (" + ((new Date).getTime() - b.getTime()) + "ms)")
        }

        function m(a)
        {
            for (var b in a) {
                return!1;
            }
            return!0
        }

        function p(a, b, d)
        {
            if (!b) {
                return"";
            }
            var h = a.config, c = h.textExtraction, f = "", f = "simple" === c ? h.supportsTextContent ? b.textContent : g(b).text() : "function" === typeof c ? c(b, a, d) : "object" === typeof c && c.hasOwnProperty(d) ? c[d](b, a, d) : h.supportsTextContent ? b.textContent : g(b).text();
            return g.trim(f)
        }

        function x(a)
        {
            var b = a.config, d = b.$tbodies = b.$table.children("tbody:not(." + b.cssInfoBlock + ")"), h, y, f, k, r, g, n = "";
            if (0 === d.length) {
                return b.debug ? c("*Empty table!* Not building a parser cache") : "";
            }
            d = d[0].rows;
            if (d[0]) {
                for (h = [], y = d[0].cells.length, f = 0; f < y; f++) {
                    k = b.$headers.filter(":not([colspan])");
                    k = k.add(b.$headers.filter('[colspan="1"]')).filter('[data-column="' + f + '"]:last');
                    r = b.headers[f];
                    g = e.getParserById(e.getData(k, r, "sorter"));
                    b.empties[f] = e.getData(k, r, "empty") || b.emptyTo || (b.emptyToBottom ? "bottom" : "top");
                    b.strings[f] = e.getData(k, r, "string") || b.stringTo || "max";
                    if (!g) {
                        a:{
                            k = a;
                            r = d;
                            g = -1;
                            for (var A = f, l = void 0, m = e.parsers.length, t = !1, v = "", l = !0; "" === v && l;) {
                                g++, r[g] ? (t = r[g].cells[A], v = p(k, t, A), k.config.debug && c("Checking if value was empty on row " + g + ", column: " + A + ': "' + v + '"')) : l = !1;
                            }
                            for (; 0 <= --m;) {
                                if ((l = e.parsers[m]) && "text" !== l.id && l.is && l.is(v, k, t)) {
                                    g = l;
                                    break a
                                }
                            }
                            g = e.getParserById("text")
                        }
                    }
                    b.debug && (n += "column:" + f + "; parser:" + g.id + "; string:" + b.strings[f] + "; empty: " + b.empties[f] + "\n");
                    h.push(g)
                }
            }
            b.debug && c(n);
            b.parsers = h
        }

        function z(a)
        {
            var b = a.tBodies, d = a.config, h, y, f = d.parsers, k, r, q, n, A, m, w, t = [];
            d.cache = {};
            if (!f) {
                return d.debug ? c("*Empty table!* Not building a cache") : "";
            }
            d.debug && (w = new Date);
            d.showProcessing && e.isProcessing(a, !0);
            for (n = 0; n < b.length; n++) {
                if (d.cache[n] = {row: [], normalized: []}, !g(b[n]).hasClass(d.cssInfoBlock)) {
                    h = b[n] && b[n].rows.length || 0;
                    y = b[n].rows[0] && b[n].rows[0].cells.length || 0;
                    for (r = 0; r < h; ++r) {
                        if (A = g(b[n].rows[r]), m = [], A.hasClass(d.cssChildRow)) {
                            d.cache[n].row[d.cache[n].row.length - 1] = d.cache[n].row[d.cache[n].row.length - 1].add(A);
                        } else {
                            d.cache[n].row.push(A);
                            for (q = 0; q < y; ++q) {
                                k = p(a, A[0].cells[q], q), k = f[q].format(k, a, A[0].cells[q], q), m.push(k), "numeric" === (f[q].type || "").toLowerCase() && (t[q] = Math.max(Math.abs(k) || 0, t[q] || 0));
                            }
                            m.push(d.cache[n].normalized.length);
                            d.cache[n].normalized.push(m)
                        }
                    }
                    d.cache[n].colMax = t
                }
            }
            d.showProcessing && e.isProcessing(a);
            d.debug && l("Building cache for " + h + " rows", w)
        }

        function B(a, b)
        {
            var d = a.config, h = a.tBodies, c = [], f = d.cache, k, r, q, n, A, p, w, t, v, s, u;
            if (!m(f)) {
                d.debug && (u = new Date);
                for (t = 0; t < h.length; t++) {
                    if (k = g(h[t]), k.length && !k.hasClass(d.cssInfoBlock)) {
                        A = e.processTbody(a, k, !0);
                        k = f[t].row;
                        r = f[t].normalized;
                        n = (q = r.length) ? r[0].length - 1 : 0;
                        for (p = 0; p < q; p++) {
                            if (s = r[p][n], c.push(k[s]), !d.appender || !d.removeRows) {
                                for (v = k[s].length, w = 0; w < v; w++) {
                                    A.append(k[s][w]);
                                }
                            }
                        }
                        e.processTbody(a, A, !1)
                    }
                }
                d.appender && d.appender(a, c);
                d.debug && l("Rebuilt table", u);
                b || e.applyWidget(a);
                g(a).trigger("sortEnd", a);
                g(a).trigger("updateComplete", a)
            }
        }

        function E(a)
        {
            var b = [], d = {}, h = 0, c = g(a).find("thead:eq(0), tfoot").children("tr"), f, k, e, q, n, l, m, p, t, v;
            for (f = 0; f < c.length; f++) {
                for (n = c[f].cells, k = 0; k < n.length; k++) {
                    q = n[k];
                    l = q.parentNode.rowIndex;
                    m = l + "-" + q.cellIndex;
                    p = q.rowSpan || 1;
                    t = q.colSpan || 1;
                    "undefined" === typeof b[l] && (b[l] = []);
                    for (e = 0; e < b[l].length + 1; e++) {
                        if ("undefined" === typeof b[l][e]) {
                            v = e;
                            break
                        }
                    }
                    d[m] = v;
                    h = Math.max(v, h);
                    g(q).attr({"data-column": v});
                    for (e = l; e < l + p; e++) {
                        for ("undefined" === typeof b[e] && (b[e] = []), m = b[e], q = v; q < v + t; q++) {
                            m[q] = "x"
                        }
                    }
                }
            }
            a.config.columns = h + 1;
            return d
        }

        function C(a)
        {
            var b = E(a), d, h, y, f, k, r, q, n = a.config;
            n.headerList = [];
            n.headerContent = [];
            n.debug && (q = new Date);
            f = n.cssIcon ? '<i class="' + n.cssIcon + " " + e.css.icon + '"></i>' : "";
            n.$headers = g(a).find(n.selectorHeaders).each(function(a)
            {
                h = g(this);
                d = n.headers[a];
                n.headerContent[a] = g(this).html();
                k = n.headerTemplate.replace(/\{content\}/g, g(this).html()).replace(/\{icon\}/g, f);
                n.onRenderTemplate && (y = n.onRenderTemplate.apply(h, [a, k])) && "string" === typeof y && (k = y);
                g(this).html('<div class="tablesorter-header-inner">' + k + "</div>");
                n.onRenderHeader && n.onRenderHeader.apply(h, [a]);
                this.column = b[this.parentNode.rowIndex + "-" + this.cellIndex];
                var c = e.getData(h, d, "sortInitialOrder") || n.sortInitialOrder;
                this.order = /^d/i.test(c) || 1 === c ? [1, 0, 2] : [0, 1, 2];
                this.count = -1;
                this.lockedOrder = !1;
                r = e.getData(h, d, "lockedOrder") || !1;
                "undefined" !== typeof r && !1 !== r && (this.order = this.lockedOrder = /^d/i.test(r) || 1 === r ? [1, 1, 1] : [0, 0, 0]);
                h.addClass(e.css.header + " " + n.cssHeader);
                n.headerList[a] = this;
                h.parent().addClass(e.css.headerRow + " " + n.cssHeaderRow);
                h.attr("tabindex", 0)
            });
            D(a);
            n.debug && (l("Built headers:", q), c(n.$headers))
        }

        function F(a, b, d)
        {
            var h = a.config;
            h.$table.find(h.selectorRemove).remove();
            x(a);
            z(a);
            G(h.$table, b, d)
        }

        function D(a)
        {
            var b, d = a.config;
            d.$headers.each(function(a, c)
            {
                b = "false" === e.getData(c, d.headers[a], "sorter");
                c.sortDisabled = b;
                g(c)[b ? "addClass" : "removeClass"]("sorter-false")
            })
        }

        function H(a)
        {
            var b, d, h, c = a.config, f = c.sortList, k = [e.css.sortAsc + " " + c.cssAsc, e.css.sortDesc + " " + c.cssDesc], r = g(a).find("tfoot tr").children().removeClass(k.join(" "));
            c.$headers.removeClass(k.join(" "));
            h = f.length;
            for (b = 0; b < h; b++) {
                if (2 !== f[b][1] && (a = c.$headers.not(".sorter-false").filter('[data-column="' + f[b][0] + '"]' + (1 === h ? ":last" : "")), a.length)) {
                    for (d = 0; d < a.length; d++) {
                        a[d].sortDisabled || (a.eq(d).addClass(k[f[b][1]]), r.length && r.filter('[data-column="' + f[b][0] + '"]').eq(d).addClass(k[f[b][1]]))
                    }
                }
            }
        }

        function L(a)
        {
            if (a.config.widthFixed && 0 === g(a).find("colgroup").length) {
                var b = g("<colgroup>"), d = g(a).width();
                g(a.tBodies[0]).find("tr:first").children("td:visible").each(function()
                {
                    b.append(g("<col>").css("width", parseInt(g(this).width() / d * 1E3, 10) / 10 + "%"))
                });
                g(a).prepend(b)
            }
        }

        function M(a, b)
        {
            var d, h, c, f = a.config, e = b || f.sortList;
            f.sortList = [];
            g.each(e, function(a, b)
            {
                d = [parseInt(b[0], 10), parseInt(b[1], 10)];
                if (c = f.headerList[d[0]]) {
                    f.sortList.push(d), h = g.inArray(d[1], c.order), c.count = 0 <= h ? h : d[1] % (f.sortReset ? 3 : 2)
                }
            })
        }

        function N(a, b, d)
        {
            var h, c, f = a.config, k = !d[f.sortMultiSortKey], r = g(a);
            r.trigger("sortStart", a);
            b.count = d[f.sortResetKey] ? 2 : (b.count + 1) % (f.sortReset ? 3 : 2);
            f.sortRestart && (c = b, f.$headers.each(function()
            {
                this === c || !k && g(this).is("." + e.css.sortDesc + ",." + e.css.sortAsc) || (this.count = -1)
            }));
            c = b.column;
            if (k) {
                f.sortList = [];
                if (null !== f.sortForce) {
                    for (h = f.sortForce, d = 0; d < h.length; d++) {
                        h[d][0] !== c && f.sortList.push(h[d]);
                    }
                }
                h = b.order[b.count];
                if (2 > h && (f.sortList.push([c, h]), 1 < b.colSpan)) {
                    for (d = 1; d < b.colSpan; d++) {
                        f.sortList.push([c + d, h])
                    }
                }
            } else if (f.sortAppend && 1 < f.sortList.length && e.isValueInArray(f.sortAppend[0][0], f.sortList) && f.sortList.pop(), e.isValueInArray(c, f.sortList)) {
                for (d = 0; d < f.sortList.length; d++) {
                    b = f.sortList[d], h = f.headerList[b[0]], b[0] === c && (b[1] = h.order[h.count], 2 === b[1] && (f.sortList.splice(d, 1), h.count = -1));
                }
            } else if (h = b.order[b.count], 2 > h && (f.sortList.push([c, h]), 1 < b.colSpan)) {
                for (d = 1; d < b.colSpan; d++) {
                    f.sortList.push([c + d, h]);
                }
            }
            if (null !== f.sortAppend) {
                for (h = f.sortAppend, d = 0; d < h.length; d++) {
                    h[d][0] !== c && f.sortList.push(h[d]);
                }
            }
            r.trigger("sortBegin", a);
            setTimeout(function()
            {
                H(a);
                I(a);
                B(a)
            }, 1)
        }

        function I(a)
        {
            var b, d, h, c, f, k, g, q, n, p, u, w, t, v = 0, s = a.config, x = s.textSorter || "", z = s.sortList, B = z.length, C = a.tBodies.length;
            if (!s.serverSideSorting && !m(s.cache)) {
                s.debug && (p = new Date);
                for (d = 0; d < C; d++) {
                    k = s.cache[d].colMax, n = (g = s.cache[d].normalized) && g[0] ? g[0].length - 1 : 0, g.sort(function(d, g)
                    {
                        for (b = 0; b < B; b++) {
                            f = z[b][0];
                            q = z[b][1];
                            w = (v = 0 === q) ? d : g;
                            t = v ? g : d;
                            h = s.string[s.empties[f] || s.emptyTo];
                            if ("" === w[f] && 0 !== h) {
                                return("boolean" === typeof h ? h ? -1 : 1 : h || 1) * (v ? 1 : -1);
                            }
                            if ("" === t[f] && 0 !== h) {
                                return("boolean" === typeof h ? h ? 1 : -1 : -h || -1) * (v ? 1 : -1);
                            }
                            (c = /n/i.test(s.parsers && s.parsers[f] ? s.parsers[f].type || "" : "")) && s.strings[f] ? (c = "boolean" === typeof s.string[s.strings[f]] ? (v ? 1 : -1) * (s.string[s.strings[f]] ? -1 : 1) : s.strings[f] ? s.string[s.strings[f]] || 0 : 0, u = s.numberSorter ? s.numberSorter(w[f], t[f], v, k[f], a) : e.sortNumeric(w[f], t[f], c, k[f])) : u = "function" === typeof x ? x(w[f], t[f], v, f, a) : "object" === typeof x && x.hasOwnProperty(f) ? x[f](w[f], t[f], v, f, a) : e.sortNatural(w[f], t[f]);
                            if (u) {
                                return u
                            }
                        }
                        return d[n] - g[n]
                    });
                }
                s.debug && l("Sorting on " + z.toString() + " and dir " + q + " time", p)
            }
        }

        function J(a, b)
        {
            var d = a[0].config;
            d.pager && !d.pager.ajax && a.trigger("updateComplete");
            "function" === typeof b && b(a[0])
        }

        function G(a, b, d)
        {
            !1 === b || a[0].isProcessing ? J(a, d) : a.trigger("sorton", [a[0].config.sortList, function()
            {
                J(a, d)
            }])
        }

        function K(a)
        {
            var b = a.config, d = b.$table, h, c;
            b.$headers.find(b.selectorSort).add(b.$headers.filter(b.selectorSort)).unbind("mousedown.tablesorter mouseup.tablesorter sort.tablesorter keypress.tablesorter").bind("mousedown.tablesorter mouseup.tablesorter sort.tablesorter keypress.tablesorter", function(d, h)
            {
                if (!(1 !== (d.which || d.button) && !/sort|keypress/.test(d.type) || "keypress" === d.type && 13 !== d.which || "mouseup" === d.type && !0 !== h && 250 < (new Date).getTime() - c)) {
                    if ("mousedown" === d.type) {
                        return c = (new Date).getTime(), "INPUT" === d.target.tagName ? "" : !b.cancelSelection;
                    }
                    b.delayInit && m(b.cache) && z(a);
                    var e = (/TH|TD/.test(this.tagName) ? g(this) : g(this).parents("th, td").filter(":first"))[0];
                    e.sortDisabled || N(a, e, d)
                }
            });
            b.cancelSelection && b.$headers.attr("unselectable", "on").bind("selectstart", !1).css({"user-select": "none", MozUserSelect: "none"});
            d.unbind("sortReset update updateRows updateCell updateAll addRows sorton appendCache applyWidgetId applyWidgets refreshWidgets destroy mouseup mouseleave ".split(" ").join(".tablesorter ")).bind("sortReset.tablesorter",function(d)
            {
                d.stopPropagation();
                b.sortList = [];
                H(a);
                I(a);
                B(a)
            }).bind("updateAll.tablesorter",function(b, d, h)
            {
                b.stopPropagation();
                e.refreshWidgets(a, !0, !0);
                e.restoreHeaders(a);
                C(a);
                K(a);
                F(a, d, h)
            }).bind("update.tablesorter updateRows.tablesorter",function(b, d, h)
            {
                b.stopPropagation();
                D(a);
                F(a, d, h)
            }).bind("updateCell.tablesorter",function(h, c, e, l)
            {
                h.stopPropagation();
                d.find(b.selectorRemove).remove();
                var n, y, m;
                n = d.find("tbody");
                h = n.index(g(c).parents("tbody").filter(":first"));
                var w = g(c).parents("tr").filter(":first");
                c = g(c)[0];
                n.length && 0 <= h && (y = n.eq(h).find("tr").index(w), m = c.cellIndex, n = b.cache[h].normalized[y].length - 1, b.cache[h].row[a.config.cache[h].normalized[y][n]] = w, b.cache[h].normalized[y][m] = b.parsers[m].format(p(a, c, m), a, c, m), G(d, e, l))
            }).bind("addRows.tablesorter",function(c, e, g, l)
            {
                c.stopPropagation();
                var n = e.filter("tr").length, y = [], m = e[0].cells.length, w = d.find("tbody").index(e.parents("tbody").filter(":first"));
                b.parsers || x(a);
                for (c = 0; c < n; c++) {
                    for (h = 0; h < m; h++) {
                        y[h] = b.parsers[h].format(p(a, e[c].cells[h], h), a, e[c].cells[h], h);
                    }
                    y.push(b.cache[w].row.length);
                    b.cache[w].row.push([e[c]]);
                    b.cache[w].normalized.push(y);
                    y = []
                }
                G(d, g, l)
            }).bind("sorton.tablesorter",function(b, c, h, e)
            {
                var g = a.config;
                b.stopPropagation();
                d.trigger("sortStart", this);
                M(a, c);
                H(a);
                g.delayInit && m(g.cache) && z(a);
                d.trigger("sortBegin", this);
                I(a);
                B(a, e);
                "function" === typeof h && h(a)
            }).bind("appendCache.tablesorter",function(b, d, c)
            {
                b.stopPropagation();
                B(a, c);
                "function" === typeof d && d(a)
            }).bind("applyWidgetId.tablesorter",function(d, c)
            {
                d.stopPropagation();
                e.getWidgetById(c).format(a, b, b.widgetOptions)
            }).bind("applyWidgets.tablesorter",function(b, d)
            {
                b.stopPropagation();
                e.applyWidget(a, d)
            }).bind("refreshWidgets.tablesorter",function(b, d, c)
            {
                b.stopPropagation();
                e.refreshWidgets(a, d, c)
            }).bind("destroy.tablesorter", function(b, d, c)
            {
                b.stopPropagation();
                e.destroy(a, d, c)
            })
        }

        var e = this;
        e.version = "2.12.0";
        e.parsers = [];
        e.widgets = [];
        e.defaults = {theme: "default", widthFixed: !1, showProcessing: !1, headerTemplate: "{content}", onRenderTemplate: null, onRenderHeader: null, cancelSelection: !0, dateFormat: "mmddyyyy", sortMultiSortKey: "shiftKey", sortResetKey: "ctrlKey", usNumberFormat: !0, delayInit: !1, serverSideSorting: !1, headers: {}, ignoreCase: !0, sortForce: null, sortList: [], sortAppend: null, sortInitialOrder: "asc", sortLocaleCompare: !1, sortReset: !1, sortRestart: !1, emptyTo: "bottom", stringTo: "max", textExtraction: "simple", textSorter: null, numberSorter: null, widgets: [], widgetOptions: {zebra: ["even", "odd"]}, initWidgets: !0, initialized: null, tableClass: "", cssAsc: "", cssDesc: "", cssHeader: "", cssHeaderRow: "", cssProcessing: "", cssChildRow: "tablesorter-childRow", cssIcon: "tablesorter-icon", cssInfoBlock: "tablesorter-infoOnly", selectorHeaders: "> thead th, > thead td", selectorSort: "th, td", selectorRemove: ".remove-me", debug: !1, headerList: [], empties: {}, strings: {}, parsers: []};
        e.css = {table: "tablesorter", childRow: "tablesorter-childRow", header: "tablesorter-header", headerRow: "tablesorter-headerRow", icon: "tablesorter-icon", info: "tablesorter-infoOnly", processing: "tablesorter-processing", sortAsc: "tablesorter-headerAsc", sortDesc: "tablesorter-headerDesc"};
        e.log = c;
        e.benchmark = l;
        e.construct = function(a)
        {
            return this.each(function()
            {
                var b = g.extend(!0, {}, e.defaults, a);
                !this.hasInitialized && e.buildTable && "TABLE" !== this.tagName && e.buildTable(this, b);
                e.setup(this, b)
            })
        };
        e.setup = function(a, b)
        {
            if (!a || !a.tHead || 0 === a.tBodies.length || !0 === a.hasInitialized) {
                return b.debug ? c("stopping initialization! No table, thead, tbody or tablesorter has already been initialized") : "";
            }
            var d = "", h = g(a), l = g.metadata;
            a.hasInitialized = !1;
            a.isProcessing = !0;
            a.config = b;
            g.data(a, "tablesorter", b);
            b.debug && g.data(a, "startoveralltimer", new Date);
            b.supportsTextContent = "x" === g("<span>x</span>")[0].textContent;
            b.supportsDataObject = function(a)
            {
                a[0] = parseInt(a[0], 10);
                return 1 < a[0] || 1 === a[0] && 4 <= parseInt(a[1], 10)
            }(g.fn.jquery.split("."));
            b.string = {max: 1, min: -1, "max+": 1, "max-": -1, zero: 0, none: 0, "null": 0, top: !0, bottom: !1};
            /tablesorter\-/.test(h.attr("class")) || (d = "" !== b.theme ? " tablesorter-" + b.theme : "");
            b.$table = h.addClass(e.css.table + " " + b.tableClass + d);
            b.$tbodies = h.children("tbody:not(." + b.cssInfoBlock + ")");
            b.widgetInit = {};
            C(a);
            L(a);
            x(a);
            b.delayInit || z(a);
            K(a);
            b.supportsDataObject && "undefined" !== typeof h.data().sortlist ? b.sortList = h.data().sortlist : l && h.metadata() && h.metadata().sortlist && (b.sortList = h.metadata().sortlist);
            e.applyWidget(a, !0);
            0 < b.sortList.length ? h.trigger("sorton", [b.sortList, {}, !b.initWidgets]) : b.initWidgets && e.applyWidget(a);
            b.showProcessing && h.unbind("sortBegin.tablesorter sortEnd.tablesorter").bind("sortBegin.tablesorter sortEnd.tablesorter", function(b)
            {
                e.isProcessing(a, "sortBegin" === b.type)
            });
            a.hasInitialized = !0;
            a.isProcessing = !1;
            b.debug && e.benchmark("Overall initialization time", g.data(a, "startoveralltimer"));
            h.trigger("tablesorter-initialized", a);
            "function" === typeof b.initialized && b.initialized(a)
        };
        e.isProcessing = function(a, b, d)
        {
            a = g(a);
            var c = a[0].config;
            a = d || a.find("." + e.css.header);
            b ? (0 < c.sortList.length && (a = a.filter(function()
            {
                return this.sortDisabled ? !1 : e.isValueInArray(parseFloat(g(this).attr("data-column")), c.sortList)
            })), a.addClass(e.css.processing + " " + c.cssProcessing)) : a.removeClass(e.css.processing + " " + c.cssProcessing)
        };
        e.processTbody = function(a, b, d)
        {
            if (d) {
                return a.isProcessing = !0, b.before('<span class="tablesorter-savemyplace"/>'), d = g.fn.detach ? b.detach() : b.remove();
            }
            d = g(a).find("span.tablesorter-savemyplace");
            b.insertAfter(d);
            d.remove();
            a.isProcessing = !1
        };
        e.clearTableBody = function(a)
        {
            g(a)[0].config.$tbodies.empty()
        };
        e.restoreHeaders = function(a)
        {
            var b = a.config;
            b.$table.find(b.selectorHeaders).each(function(a)
            {
                g(this).find(".tablesorter-header-inner").length && g(this).html(b.headerContent[a])
            })
        };
        e.destroy = function(a, b, d)
        {
            a = g(a)[0];
            if (a.hasInitialized) {
                e.refreshWidgets(a, !0, !0);
                var c = g(a), l = a.config, f = c.find("thead:first"), k = f.find("tr." + e.css.headerRow).removeClass(e.css.headerRow + " " + l.cssHeaderRow), m = c.find("tfoot:first > tr").children("th, td");
                f.find("tr").not(k).remove();
                c.removeData("tablesorter").unbind("sortReset update updateAll updateRows updateCell addRows sorton appendCache applyWidgetId applyWidgets refreshWidgets destroy mouseup mouseleave keypress sortBegin sortEnd ".split(" ").join(".tablesorter "));
                l.$headers.add(m).removeClass([e.css.header, l.cssHeader, l.cssAsc, l.cssDesc, e.css.sortAsc, e.css.sortDesc].join(" ")).removeAttr("data-column");
                k.find(l.selectorSort).unbind("mousedown.tablesorter mouseup.tablesorter keypress.tablesorter");
                e.restoreHeaders(a);
                !1 !== b && c.removeClass(e.css.table + " " + l.tableClass + " tablesorter-" + l.theme);
                a.hasInitialized = !1;
                "function" === typeof d && d(a)
            }
        };
        e.regex = {chunk: /(^([+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi, hex: /^0x[0-9a-f]+$/i};
        e.sortNatural = function(a, b)
        {
            if (a === b) {
                return 0;
            }
            var d, c, g, f, k, l;
            c = e.regex;
            if (g = parseInt(b.match(c.hex), 16)) {
                d = parseInt(a.match(c.hex), 16);
                if (d < g) {
                    return-1;
                }
                if (d > g) {
                    return 1
                }
            }
            d = a.replace(c.chunk, "\\0$1\\0").replace(/\\0$/, "").replace(/^\\0/, "").split("\\0");
            c = b.replace(c.chunk, "\\0$1\\0").replace(/\\0$/, "").replace(/^\\0/, "").split("\\0");
            l = Math.max(d.length, c.length);
            for (k = 0; k < l; k++) {
                g = isNaN(d[k]) ? d[k] || 0 : parseFloat(d[k]) || 0;
                f = isNaN(c[k]) ? c[k] || 0 : parseFloat(c[k]) || 0;
                if (isNaN(g) !== isNaN(f)) {
                    return isNaN(g) ? 1 : -1;
                }
                typeof g !== typeof f && (g += "", f += "");
                if (g < f) {
                    return-1;
                }
                if (g > f) {
                    return 1
                }
            }
            return 0
        };
        e.sortText = function(a, b)
        {
            return a > b ? 1 : a < b ? -1 : 0
        };
        e.getTextValue = function(a, b, d)
        {
            if (d) {
                var c = a ? a.length : 0, e = d + b;
                for (d = 0; d < c; d++) {
                    e += a.charCodeAt(d);
                }
                return b * e
            }
            return 0
        };
        e.sortNumeric = function(a, b, d, c)
        {
            if (a === b) {
                return 0;
            }
            isNaN(a) && (a = e.getTextValue(a, d, c));
            isNaN(b) && (b = e.getTextValue(b, d, c));
            return a - b
        };
        e.characterEquivalents = {a: "\u00e1\u00e0\u00e2\u00e3\u00e4\u0105\u00e5", A: "\u00c1\u00c0\u00c2\u00c3\u00c4\u0104\u00c5", c: "\u00e7\u0107\u010d", C: "\u00c7\u0106\u010c", e: "\u00e9\u00e8\u00ea\u00eb\u011b\u0119", E: "\u00c9\u00c8\u00ca\u00cb\u011a\u0118", i: "\u00ed\u00ec\u0130\u00ee\u00ef\u0131", I: "\u00cd\u00cc\u0130\u00ce\u00cf", o: "\u00f3\u00f2\u00f4\u00f5\u00f6", O: "\u00d3\u00d2\u00d4\u00d5\u00d6", ss: "\u00df", SS: "\u1e9e", u: "\u00fa\u00f9\u00fb\u00fc\u016f", U: "\u00da\u00d9\u00db\u00dc\u016e"};
        e.replaceAccents = function(a)
        {
            var b, d = "[", c = e.characterEquivalents;
            if (!e.characterRegex) {
                e.characterRegexArray = {};
                for (b in c) {
                    "string" === typeof b && (d += c[b], e.characterRegexArray[b] = RegExp("[" + c[b] + "]", "g"));
                }
                e.characterRegex = RegExp(d + "]")
            }
            if (e.characterRegex.test(a)) {
                for (b in c) {
                    "string" === typeof b && (a = a.replace(e.characterRegexArray[b], b));
                }
            }
            return a
        };
        e.isValueInArray = function(a, b)
        {
            var d, c = b.length;
            for (d = 0; d < c; d++) {
                if (b[d][0] === a) {
                    return!0;
                }
            }
            return!1
        };
        e.addParser = function(a)
        {
            var b, d = e.parsers.length, c = !0;
            for (b = 0; b < d; b++) {
                e.parsers[b].id.toLowerCase() === a.id.toLowerCase() && (c = !1);
            }
            c && e.parsers.push(a)
        };
        e.getParserById = function(a)
        {
            var b, d = e.parsers.length;
            for (b = 0; b < d; b++) {
                if (e.parsers[b].id.toLowerCase() === a.toString().toLowerCase()) {
                    return e.parsers[b];
                }
            }
            return!1
        };
        e.addWidget = function(a)
        {
            e.widgets.push(a)
        };
        e.getWidgetById = function(a)
        {
            var b, d, c = e.widgets.length;
            for (b = 0; b < c; b++) {
                if ((d = e.widgets[b]) && d.hasOwnProperty("id") && d.id.toLowerCase() === a.toLowerCase()) {
                    return d
                }
            }
        };
        e.applyWidget = function(a, b)
        {
            a = g(a)[0];
            var d = a.config, c = d.widgetOptions, m = [], f, k, p;
            d.debug && (f = new Date);
            d.widgets.length && (d.widgets = g.grep(d.widgets, function(a, b)
            {
                return g.inArray(a, d.widgets) === b
            }), g.each(d.widgets || [], function(a, b)
            {
                (p = e.getWidgetById(b)) && p.id && (p.priority || (p.priority = 10), m[a] = p)
            }), m.sort(function(a, b)
            {
                return a.priority < b.priority ? -1 : a.priority === b.priority ? 0 : 1
            }), g.each(m, function(e, f)
            {
                if (f) {
                    if (b || !d.widgetInit[f.id]) {
                        f.hasOwnProperty("options") && (c = a.config.widgetOptions = g.extend(!0, {}, f.options, c), d.widgetInit[f.id] = !0), f.hasOwnProperty("init") && f.init(a, f, d, c);
                    }
                    !b && f.hasOwnProperty("format") && f.format(a, d, c, !1)
                }
            }));
            d.debug && (k = d.widgets.length, l("Completed " + (!0 === b ? "initializing " : "applying ") + k + " widget" + (1 !== k ? "s" : ""), f))
        };
        e.refreshWidgets = function(a, b, d)
        {
            a = g(a)[0];
            var h, l = a.config, f = l.widgets, k = e.widgets, m = k.length;
            for (h = 0; h < m; h++) {
                k[h] && k[h].id && (b || 0 > g.inArray(k[h].id, f)) && (l.debug && c("Refeshing widgets: Removing " + k[h].id), k[h].hasOwnProperty("remove") && (k[h].remove(a, l, l.widgetOptions), l.widgetInit[k[h].id] = !1));
            }
            !0 !== d && e.applyWidget(a, b)
        };
        e.getData = function(a, b, d)
        {
            var c = "";
            a = g(a);
            var e, f;
            if (!a.length) {
                return"";
            }
            e = g.metadata ? a.metadata() : !1;
            f = " " + (a.attr("class") || "");
            "undefined" !== typeof a.data(d) || "undefined" !== typeof a.data(d.toLowerCase()) ? c += a.data(d) || a.data(d.toLowerCase()) : e && "undefined" !== typeof e[d] ? c += e[d] : b && "undefined" !== typeof b[d] ? c += b[d] : " " !== f && f.match(" " + d + "-") && (c = f.match(RegExp("\\s" + d + "-([\\w-]+)"))[1] || "");
            return g.trim(c)
        };
        e.formatFloat = function(a, b)
        {
            if ("string" !== typeof a || "" === a) {
                return a;
            }
            var c;
            a = (b && b.config ? !1 !== b.config.usNumberFormat : "undefined" !== typeof b ? b : 1) ? a.replace(/,/g, "") : a.replace(/[\s|\.]/g, "").replace(/,/g, ".");
            /^\s*\([.\d]+\)/.test(a) && (a = a.replace(/^\s*\(/, "-").replace(/\)/, ""));
            c = parseFloat(a);
            return isNaN(c) ? g.trim(a) : c
        };
        e.isDigit = function(a)
        {
            return isNaN(a) ? /^[\-+(]?\d+[)]?$/.test(a.toString().replace(/[,.'"\s]/g, "")) : !0
        }
    }});
    var p = g.tablesorter;
    g.fn.extend({tablesorter: p.construct});
    p.addParser({id: "text", is: function()
    {
        return!0
    }, format      : function(c, l)
    {
        var m = l.config;
        c && (c = g.trim(m.ignoreCase ? c.toLocaleLowerCase() : c), c = m.sortLocaleCompare ? p.replaceAccents(c) : c);
        return c
    }, type        : "text"});
    p.addParser({id: "digit", is: function(c)
    {
        return p.isDigit(c)
    }, format      : function(c, l)
    {
        var m = p.formatFloat((c || "").replace(/[^\w,. \-()]/g, ""), l);
        return c && "number" === typeof m ? m : c ? g.trim(c && l.config.ignoreCase ? c.toLocaleLowerCase() : c) : c
    }, type        : "numeric"});
    p.addParser({id: "currency", is: function(c)
    {
        return/^\(?\d+[\u00a3$\u20ac\u00a4\u00a5\u00a2?.]|[\u00a3$\u20ac\u00a4\u00a5\u00a2?.]\d+\)?$/.test((c || "").replace(/[,. ]/g, ""))
    }, format      : function(c, l)
    {
        var m = p.formatFloat((c || "").replace(/[^\w,. \-()]/g, ""), l);
        return c && "number" === typeof m ? m : c ? g.trim(c && l.config.ignoreCase ? c.toLocaleLowerCase() : c) : c
    }, type        : "numeric"});
    p.addParser({id: "ipAddress", is: function(c)
    {
        return/^\d{1,3}[\.]\d{1,3}[\.]\d{1,3}[\.]\d{1,3}$/.test(c)
    }, format      : function(c, g)
    {
        var m, u = c ? c.split(".") : "", x = "", z = u.length;
        for (m = 0; m < z; m++) {
            x += ("00" + u[m]).slice(-3);
        }
        return c ? p.formatFloat(x, g) : c
    }, type        : "numeric"});
    p.addParser({id: "url", is: function(c)
    {
        return/^(https?|ftp|file):\/\//.test(c)
    }, format      : function(c)
    {
        return c ? g.trim(c.replace(/(https?|ftp|file):\/\//, "")) : c
    }, type        : "text"});
    p.addParser({id: "isoDate", is: function(c)
    {
        return/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}/.test(c)
    }, format      : function(c, g)
    {
        return c ? p.formatFloat("" !== c ? (new Date(c.replace(/-/g, "/"))).getTime() || "" : "", g) : c
    }, type        : "numeric"});
    p.addParser({id: "percent", is: function(c)
    {
        return/(\d\s*?%|%\s*?\d)/.test(c) && 15 > c.length
    }, format      : function(c, g)
    {
        return c ? p.formatFloat(c.replace(/%/g, ""), g) : c
    }, type        : "numeric"});
    p.addParser({id: "usLongDate", is: function(c)
    {
        return/^[A-Z]{3,10}\.?\s+\d{1,2},?\s+(\d{4})(\s+\d{1,2}:\d{2}(:\d{2})?(\s+[AP]M)?)?$/i.test(c) || /^\d{1,2}\s+[A-Z]{3,10}\s+\d{4}/i.test(c)
    }, format      : function(c, g)
    {
        return c ? p.formatFloat((new Date(c.replace(/(\S)([AP]M)$/i, "$1 $2"))).getTime() || "", g) : c
    }, type        : "numeric"});
    p.addParser({id: "shortDate", is: function(c)
    {
        return/(^\d{1,2}[\/\s]\d{1,2}[\/\s]\d{4})|(^\d{4}[\/\s]\d{1,2}[\/\s]\d{1,2})/.test((c || "").replace(/\s+/g, " ").replace(/[\-.,]/g, "/"))
    }, format      : function(c, g, m, u)
    {
        if (c) {
            m = g.config;
            var x = m.headerList[u];
            u = x.dateFormat || p.getData(x, m.headers[u], "dateFormat") || m.dateFormat;
            c = c.replace(/\s+/g, " ").replace(/[\-.,]/g, "/");
            "mmddyyyy" === u ? c = c.replace(/(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{4})/, "$3/$1/$2") : "ddmmyyyy" === u ? c = c.replace(/(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{4})/, "$3/$2/$1") : "yyyymmdd" === u && (c = c.replace(/(\d{4})[\/\s](\d{1,2})[\/\s](\d{1,2})/, "$1/$2/$3"))
        }
        return c ? p.formatFloat((new Date(c)).getTime() || "", g) : c
    }, type        : "numeric"});
    p.addParser({id: "time", is: function(c)
    {
        return/^(([0-2]?\d:[0-5]\d)|([0-1]?\d:[0-5]\d\s?([AP]M)))$/i.test(c)
    }, format      : function(c, g)
    {
        return c ? p.formatFloat((new Date("2000/01/01 " + c.replace(/(\S)([AP]M)$/i, "$1 $2"))).getTime() || "", g) : c
    }, type        : "numeric"});
    p.addParser({id: "metadata", is: function()
    {
        return!1
    }, format      : function(c, l, m)
    {
        c = l.config;
        c = c.parserMetadataName ? c.parserMetadataName : "sortValue";
        return g(m).metadata()[c]
    }, type        : "numeric"});
    p.addWidget({id: "zebra", priority: 90, format: function(c, l, m)
    {
        var u, x, z, B, E, C, F = RegExp(l.cssChildRow, "i"), D = l.$tbodies;
        l.debug && (E = new Date);
        for (c = 0; c < D.length; c++) {
            u = D.eq(c), C = u.children("tr").length, 1 < C && (z = 0, u = u.children("tr:visible"), u.each(function()
            {
                x = g(this);
                F.test(this.className) || z++;
                B = 0 === z % 2;
                x.removeClass(m.zebra[B ? 1 : 0]).addClass(m.zebra[B ? 0 : 1])
            }));
        }
        l.debug && p.benchmark("Applying Zebra widget", E)
    }, remove      : function(c, l, m)
    {
        var p;
        l = l.$tbodies;
        var x = (m.zebra || ["even", "odd"]).join(" ");
        for (m = 0; m < l.length; m++) {
            p = g.tablesorter.processTbody(c, l.eq(m), !0), p.children().removeClass(x), g.tablesorter.processTbody(c, p, !1)
        }
    }})
})(jQuery);

/*! Filter widget formatter functions - updated 10/10/2013
 * requires: tableSorter 2.7.7+ and jQuery 1.4.3+
 * jQuery UI spinner, silder, range slider & datepicker (range)
 * HTML5 number (spinner), range slider & color selector
 */
;(function(k){k.tablesorter=k.tablesorter||{};k.tablesorter.filterFormatter={uiSpinner:function(b,e,h){var a=k.extend({min:0,max:100,step:1,value:1,delayed:!0,addToggle:!0,disabled:!1,exactMatch:!0,compare:""},h);h=k('<input class="filter" type="hidden">').appendTo(b).bind("change.tsfilter",function(){c({value:this.value,delayed:!1})});var d=[],l=b.closest("table")[0].config,c=function(f){var g=!0,c,e=f&&f.value&&k.tablesorter.formatFloat((f.value+"").replace(/[><=]/g,""))||b.find(".spinner").val()|| a.value;a.addToggle&&(g=b.find(".toggle").is(":checked"));c=a.disabled||!g?"disable":"enable";b.find(".filter").val(g?(a.compare?a.compare:a.exactMatch?"=":"")+e:"").trigger("search",f&&"boolean"===typeof f.delayed?f.delayed:a.delayed).end().find(".spinner").spinner(c).val(e);d.length&&(d.find(".spinner").spinner(c).val(e),a.addToggle&&(d.find(".toggle")[0].checked=g))};a.oldcreate=a.create;a.oldspin=a.spin;a.create=function(b,g){c();"function"===typeof a.oldcreate&&a.oldcreate(b,g)};a.spin=function(b, g){c(g);"function"===typeof a.oldspin&&a.oldspin(b,g)};a.addToggle&&k('<div class="button"><input id="uispinnerbutton'+e+'" type="checkbox" class="toggle" /><label for="uispinnerbutton'+e+'"></label></div>').appendTo(b).find(".toggle").bind("change",function(){c()});b.closest("thead").find("th[data-column="+e+"]").addClass("filter-parsed");k('<input class="spinner spinner'+e+'" />').val(a.value).appendTo(b).spinner(a).bind("change keyup",function(a){c()});l.$table.bind("stickyHeadersInit",function(){d= l.widgetOptions.$sticky.find(".tablesorter-filter-row").children().eq(e).empty();a.addToggle&&k('<div class="button"><input id="stickyuispinnerbutton'+e+'" type="checkbox" class="toggle" /><label for="stickyuispinnerbutton'+e+'"></label></div>').appendTo(d).find(".toggle").bind("change",function(){b.find(".toggle")[0].checked=this.checked;c()});k('<input class="spinner spinner'+e+'" />').val(a.value).appendTo(d).spinner(a).bind("change keyup",function(a){b.find(".spinner").val(this.value);c()})}); l.$table.bind("filterReset",function(){a.addToggle&&(b.find(".toggle")[0].checked=!1);c()});c();return h},uiSlider:function(b,e,h){var a=k.extend({value:0,min:0,max:100,step:1,range:"min",delayed:!0,valueToHeader:!1,exactMatch:!0,compare:"",allText:"all"},h);h=k('<input class="filter" type="hidden">').appendTo(b).bind("change.tsfilter",function(){c({value:this.value})});var d=[],l=b.closest("table")[0].config,c=function(f){var c="undefined"!==typeof f?k.tablesorter.formatFloat((f.value+"").replace(/[><=]/g, ""))||a.min:a.value,h=a.compare+(a.compare?c:c===a.min?a.allText:c);a.valueToHeader?b.closest("thead").find("th[data-column="+e+"]").find(".curvalue").html(" ("+h+")"):b.find(".ui-slider-handle").addClass("value-popup").attr("data-value",h);b.find(".filter").val(a.compare?a.compare+c:c===a.min?"":(a.exactMatch?"=":"")+c).trigger("search",f&&"boolean"===typeof f.delayed?f.delayed:a.delayed).end().find(".slider").slider("value",c);d.length&&(d.find(".slider").slider("value",c),a.valueToHeader?d.closest("thead").find("th[data-column="+ e+"]").find(".curvalue").html(" ("+h+")"):d.find(".ui-slider-handle").addClass("value-popup").attr("data-value",h))};b.closest("thead").find("th[data-column="+e+"]").addClass("filter-parsed");a.valueToHeader&&b.closest("thead").find("th[data-column="+e+"]").find(".tablesorter-header-inner").append('<span class="curvalue" />');a.oldcreate=a.create;a.oldslide=a.slide;a.create=function(b,d){c();"function"===typeof a.oldcreate&&a.oldcreate(b,d)};a.slide=function(b,d){c(d);"function"===typeof a.oldslide&& a.oldslide(b,d)};k('<div class="slider slider'+e+'"/>').appendTo(b).slider(a);l.$table.bind("filterReset",function(){b.find(".slider").slider("value",a.value);c()});l.$table.bind("stickyHeadersInit",function(){d=l.widgetOptions.$sticky.find(".tablesorter-filter-row").children().eq(e).empty();k('<div class="slider slider'+e+'"/>').val(a.value).appendTo(d).slider(a).bind("change keyup",function(a){b.find(".slider").val(this.value);c()})});return h},uiRange:function(b,e,h){var a=k.extend({values:[0, 100],min:0,max:100,range:!0,delayed:!0,valueToHeader:!1},h);h=k('<input class="filter" type="hidden">').appendTo(b).bind("change.tsfilter",function(){var b=this.value.split(" - ");""===this.value&&(b=[a.min,a.max]);b&&b[1]&&c({values:b,delay:!1})});var d=[],l=b.closest("table")[0].config,c=function(c){var g=c&&c.values||a.values,h=g[0]+" - "+g[1],m=g[0]===a.min&&g[1]===a.max?"":h;a.valueToHeader?b.closest("thead").find("th[data-column="+e+"]").find(".currange").html(" ("+h+")"):b.find(".ui-slider-handle").addClass("value-popup").eq(0).attr("data-value", g[0]).end().eq(1).attr("data-value",g[1]);b.find(".filter").val(m).trigger("search",c&&"boolean"===typeof c.delayed?c.delayed:a.delayed).end().find(".range").slider("values",g);d.length&&(d.find(".range").slider("values",g),a.valueToHeader?d.closest("thead").find("th[data-column="+e+"]").find(".currange").html(" ("+h+")"):d.find(".ui-slider-handle").addClass("value-popup").eq(0).attr("data-value",g[0]).end().eq(1).attr("data-value",g[1]))};b.closest("thead").find("th[data-column="+e+"]").addClass("filter-parsed"); a.valueToHeader&&b.closest("thead").find("th[data-column="+e+"]").find(".tablesorter-header-inner").append('<span class="currange"/>');a.oldcreate=a.create;a.oldslide=a.slide;a.create=function(b,d){c();"function"===typeof a.oldcreate&&a.oldcreate(b,d)};a.slide=function(b,d){c(d);"function"===typeof a.oldslide&&a.oldslide(b,d)};k('<div class="range range'+e+'"/>').appendTo(b).slider(a);l.$table.bind("filterReset",function(){b.find(".range").slider("values",a.values);c()});l.$table.bind("stickyHeadersInit", function(){d=l.widgetOptions.$sticky.find(".tablesorter-filter-row").children().eq(e).empty();k('<div class="range range'+e+'"/>').val(a.value).appendTo(d).slider(a).bind("change keyup",function(a){b.find(".range").val(this.value);c()})});return h},uiDateCompare:function(b,e,h){var a=k.extend({defaultDate:"",cellText:"",changeMonth:!0,changeYear:!0,numberOfMonths:1,compare:"",compareOptions:!1},h);h=b.closest("thead").find("th[data-column="+e+"]");var d=k('<input class="dateCompare" type="hidden">').appendTo(b).bind("change.tsfilter", function(){var b=this.value;if(b)a.onClose(b)}),l,c,f=[],g=b.closest("table")[0].config,n=function(c){var d=(new Date(b.find(".date").datepicker("getDate"))).getTime();b.find(".compare").val(c);b.find(".dateCompare").val(c+d).trigger("search",a.delayed).end();f.length&&f.find(".compare").val(c)};h.addClass("filter-parsed");if(a.compareOptions){c='<select class="compare">';for(var m in a.compareOptions)c+='<option value="'+m+'"',m===a.compare&&(c+=' selected="selected"'),c+=">"+m+"</option>";c+="</select>"; b.append(c).find(".compare").bind("change",function(){n(k(this).val())})}else a.cellText&&(c="<label>"+a.cellText+"</label>",b.append(c));l='<input type="text" class="date date'+e+'" placeholder="'+(h.data("placeholder")||h.attr("data-placeholder")||"")+'" />';k(l).appendTo(b);a.oldonClose=a.onClose;a.onClose=function(c,d){var g=(new Date(b.find(".date").datepicker("getDate"))).getTime()||"",e=b.find(".compare").val()||a.compare;b.find(".dateCompare").val(e+g).trigger("search").end().find(".date").datepicker("setDate", c);f.length&&f.find(".date").datepicker("setDate",c);"function"===typeof a.oldonClose&&a.oldonClose(c,d)};b.find(".date").datepicker(a);a.filterDate&&b.find(".date").datepicker("setDate",a.filterDate);g.$table.bind("filterReset",function(){b.find(".date").val("").datepicker("option","currentText","");f.length&&f.find(".date").val("").datepicker("option","currentText","")});g.$table.bind("stickyHeadersInit",function(){f=g.widgetOptions.$sticky.find(".tablesorter-filter-row").children().eq(e).empty(); a.compareOptions?f.append(c).find(".compare").bind("change",function(){n(k(this).val())}):a.cellText&&f.append(c);f.append(l).find(".date").datepicker(a)});return d.val(a.defaultDate?a.defaultDate:"")},uiDatepicker:function(b,e,h){var a=k.extend({from:"",to:"",textFrom:"from",textTo:"to",changeMonth:!0,changeYear:!0,numberOfMonths:1},h),d,l,c,f=[];h=k('<input class="dateRange" type="hidden">').appendTo(b).bind("change.tsfilter",function(){var a=this.value;a.match(" - ")?(a=a.split(" - "),b.find(".dateTo").val(a[1]), c(a[0])):a.match(">=")?c(a.replace(">=","")):a.match("<=")&&l(a.replace("<=",""))});var g=b.closest("table")[0].config;b.closest("thead").find("th[data-column="+e+"]").addClass("filter-parsed");d="<label>"+a.textFrom+'</label><input type="text" class="dateFrom" /><label>'+a.textTo+'</label><input type="text" class="dateTo" />';k(d).appendTo(b);a.oldonClose=a.onClose;var n=a.defaultDate=a.from||a.defaultDate;c=a.onClose=function(c,d){var g=(new Date(c)).getTime()||"",e=(new Date(b.find(".dateTo").datepicker("getDate"))).getTime()|| "",g=g?e?g+" - "+e:">="+g:e?"<="+e:"";b.find(".dateRange").val(g).trigger("search").end().find(".dateTo").datepicker("option","minDate",c).end().find(".dateFrom").val(c);f.length&&f.find(".dateTo").datepicker("option","minDate",c).end().find(".dateFrom").val(c);"function"===typeof a.oldonClose&&a.oldonClose(c,d)};b.find(".dateFrom").datepicker(a);a.defaultDate=a.to||"+7d";l=a.onClose=function(c,d){var g=(new Date(b.find(".dateFrom").datepicker("getDate"))).getTime()||"",e=(new Date(c)).getTime()|| "",g=g?e?g+" - "+e:">="+g:e?"<="+e:"";b.find(".dateRange").val(g).trigger("search").end().find(".dateFrom").datepicker("option","maxDate",c).end().find(".dateTo").val(c);f.length&&f.find(".dateFrom").datepicker("option","maxDate",c).end().find(".dateTo").val(c);"function"===typeof a.oldonClose&&a.oldonClose(c,d)};b.find(".dateTo").datepicker(a);g.$table.bind("stickyHeadersInit",function(){f=g.widgetOptions.$sticky.find(".tablesorter-filter-row").children().eq(e).empty();f.append(d);a.onClose=l;f.find(".dateTo").datepicker(a); a.defaultDate=n;a.onClose=c;f.find(".dateFrom").datepicker(a)});b.closest("table").bind("filterReset",function(){b.find(".dateFrom, .dateTo").val("").datepicker("option","currentText","");f.length&&f.find(".dateFrom, .dateTo").val("").datepicker("option","currentText","")});return h.val(a.from?a.to?a.from+" - "+a.to:">="+a.from:a.to?"<="+a.to:"")},html5Number:function(b,e,h){var a,d=k.extend({value:0,min:0,max:100,step:1,delayed:!0,disabled:!1,addToggle:!0,exactMatch:!0,compare:"",compareOptions:!1, skipTest:!1},h);h=k('<input type="number" style="visibility:hidden;" value="test">').appendTo(b);var l=d.skipTest||"number"===h.attr("type")&&"test"!==h.val(),c,f=[],g=b.closest("table")[0].config,n=function(a){var c=b.find(".number").val();b.find(".compare").val(a);b.find("input[type=hidden]").val(a+c).trigger("search",d.delayed).end();f.length&&f.find(".compare").val(a)},m=function(a,c){var g=d.addToggle?b.find(".toggle").is(":checked"):!0,e=b.find(".compare").val()||d.compare;b.find("input[type=hidden]").val(!d.addToggle|| g?(d.compare?d.compare:d.exactMatch?"=":"")+a:"").val(!d.addToggle||g?e+a:"").trigger("search",c?c:d.delayed).end().find(".number").val(a);b.find(".number").length&&(b.find(".number")[0].disabled=d.disabled||!g);f.length&&(f.find(".number").val(a)[0].disabled=d.disabled||!g,d.addToggle&&(f.find(".toggle")[0].checked=g))};h.remove();l&&(c=d.addToggle?'<div class="button"><input id="html5button'+e+'" type="checkbox" class="toggle" /><label for="html5button'+e+'"></label></div>':"");if(d.compareOptions){c= '<select class="compare">';for(var p in d.compareOptions)c+='<option value="'+p+'"',p===d.compare&&(c+=' selected="selected"'),c+=">"+p+"</option>";c+="</select>";b.append(c).find(".compare").bind("change",function(){n(k(this).val())})}else c&&b.append(c);l&&(a='<input class="number" type="number" min="'+d.min+'" max="'+d.max+'" value="'+d.value+'" step="'+d.step+'" />',b.append(a+'<input type="hidden" />').find(".toggle, .number").bind("change",function(){m(b.find(".number").val())}).closest("thead").find("th[data-column="+ e+"]").addClass("filter-parsed").closest("table").bind("filterReset",function(){d.addToggle&&(b.find(".toggle")[0].checked=!1,f.length&&(f.find(".toggle")[0].checked=!1));m(b.find(".number").val())}),g.$table.bind("stickyHeadersInit",function(){f=g.widgetOptions.$sticky.find(".tablesorter-filter-row").children().eq(e).empty();d.compareOptions?f.append(c).find(".compare").bind("change",function(){n(k(this).val())}):f.append(c);f.append(a).find(".toggle, .number").bind("change",function(){m(f.find(".number").val())}); m(b.find(".number").val())}),m(b.find(".number").val()));return l?b.find('input[type="hidden"]'):k('<input type="search">')},html5Range:function(b,e,h){var a=k.extend({value:0,min:0,max:100,step:1,delayed:!0,valueToHeader:!0,exactMatch:!0,compare:"",allText:"all",skipTest:!1},h);h=k('<input type="range" style="visibility:hidden;" value="test">').appendTo(b);var d=a.skipTest||"range"===h.attr("type")&&"test"!==h.val(),l=[],c=b.closest("table")[0].config,f=function(c,d){c=(c+"").replace(/[<>=]/g,"")|| a.min;var f=" ("+(a.compare?a.compare+c:c==a.min?a.allText:c)+")";b.find("input[type=hidden]").val(a.compare?a.compare+c:c==a.min?"":(a.exactMatch?"=":"")+c).trigger("search",d?d:a.delayed).end().find(".range").val(c);b.closest("thead").find("th[data-column="+e+"]").find(".curvalue").html(f);l.length&&(l.find(".range").val(c),l.closest("thead").find("th[data-column="+e+"]").find(".curvalue").html(f))};h.remove();d&&(b.html('<input type="hidden"><input class="range" type="range" min="'+a.min+'" max="'+ a.max+'" value="'+a.value+'" />').closest("thead").find("th[data-column="+e+"]").addClass("filter-parsed").find(".tablesorter-header-inner").append('<span class="curvalue" />'),b.find(".range").bind("change",function(){f(this.value)}),b.find("input[type=hidden]").bind("change.tsfilter",function(){var b=this.value;b!==this.lastValue&&(this.value=this.lastValue=a.compare?a.compare+b:b==a.min?"":(a.exactMatch?"=":"")+b,f(b))}),c.$table.bind("stickyHeadersInit",function(){l=c.widgetOptions.$sticky.find(".tablesorter-filter-row").children().eq(e).empty(); l.html('<input class="range" type="range" min="'+a.min+'" max="'+a.max+'" value="'+a.value+'" />').find(".range").bind("change",function(){f(l.find(".range").val())});f(b.find(".range").val())}),b.closest("table").bind("filterReset",function(){f(a.value)}),f(b.find(".range").val()));return d?b.find('input[type="hidden"]'):k('<input type="search">')},html5Color:function(b,e,h){var a,d=k.extend({value:"#000000",disabled:!1,addToggle:!0,exactMatch:!0,valueToHeader:!1,skipTest:!1},h);h=k('<input type="color" style="visibility:hidden;" value="test">').appendTo(b); var l=d.skipTest||"color"===h.attr("type")&&"test"!==h.val(),c=[],f=b.closest("table")[0].config,g=function(a){a=a||d.value;var f=!0,g=" ("+a+")";d.addToggle&&(f=b.find(".toggle").is(":checked"));b.find(".colorpicker").length&&(b.find(".colorpicker").val(a)[0].disabled=d.disabled||!f);b.find("input[type=hidden]").val(f?a+(d.exactMatch?"=":""):"").trigger("search");d.valueToHeader?b.closest("thead").find("th[data-column="+e+"]").find(".curcolor").html(g):b.find(".currentColor").html(g);c.length&&(c.find(".colorpicker").val(a)[0].disabled= d.disabled||!f,d.addToggle&&(c.find(".toggle")[0].checked=f),d.valueToHeader?c.closest("thead").find("th[data-column="+e+"]").find(".curcolor").html(g):c.find(".currentColor").html(g))};h.remove();l&&(a='<div class="color-controls-wrapper">',a+=d.addToggle?'<div class="button"><input id="colorbutton'+e+'" type="checkbox" class="toggle" /><label for="colorbutton'+e+'"></label></div>':"",a+='<input type="hidden"><input class="colorpicker" type="color" />',a+=(d.valueToHeader?"":'<span class="currentColor">(#000000)</span>')+ "</div>",b.html(a),d.valueToHeader&&b.closest("thead").find("th[data-column="+e+"]").find(".tablesorter-header-inner").append('<span class="curcolor" />'),b.find(".toggle, .colorpicker").bind("change",function(){g(b.find(".colorpicker").val())}),b.find("input[type=hidden]").bind("change.tsfilter",function(){g(this.value)}),b.closest("table").bind("filterReset",function(){b.find(".toggle")[0].checked=!1;g(b.find(".colorpicker").val())}),f.$table.bind("stickyHeadersInit",function(){c=f.widgetOptions.$sticky.find(".tablesorter-filter-row").children().eq(e); c.html(a).find(".toggle, .colorpicker").bind("change",function(){g(c.find(".colorpicker").val())});g(c.find(".colorpicker").val())}),g(d.value));return l?b.find('input[type="hidden"]'):k('<input type="search">')}}})(jQuery);

/*! tableSorter 2.8+ widgets - updated 10/18/2013 */
;(function(g){
var d=g.tablesorter=g.tablesorter||{};
d.themes={bootstrap:{table:"table table-bordered table-striped",header:"bootstrap-header",footerRow:"",footerCells:"",icons:"",sortNone:"bootstrap-icon-unsorted",sortAsc:"icon-chevron-up glyphicon glyphicon-chevron-up",sortDesc:"icon-chevron-down glyphicon glyphicon-chevron-down",active:"",hover:"",filterRow:"",even:"",odd:""},jui:{table:"ui-widget ui-widget-content ui-corner-all",header:"ui-widget-header ui-corner-all ui-state-default",footerRow:"", footerCells:"",icons:"ui-icon",sortNone:"ui-icon-carat-2-n-s",sortAsc:"ui-icon-carat-1-n",sortDesc:"ui-icon-carat-1-s",active:"ui-state-active",hover:"ui-state-hover",filterRow:"",even:"ui-widget-content",odd:"ui-state-default"}};
d.storage=function(f,c,b,a){var e,d=!1;e={};var k=f.config,m=a&&a.id||g(f).attr(a&&a.group||"data-table-group")||f.id||g(".tablesorter").index(g(f));a=a&&a.url||g(f).attr(a&&a.page||"data-table-page")||k&&k.fixedUrl||window.location.pathname;if("localStorage"in window)try{window.localStorage.setItem("_tmptest", "temp"),d=!0,window.localStorage.removeItem("_tmptest")}catch(q){}g.parseJSON&&(d?e=g.parseJSON(localStorage[c]||"{}"):(e=document.cookie.split(/[;\s|=]/),f=g.inArray(c,e)+1,e=0!==f?g.parseJSON(e[f]||"{}"):{}));if((b||""===b)&&window.JSON&&JSON.hasOwnProperty("stringify"))e[a]||(e[a]={}),e[a][m]=b,d?localStorage[c]=JSON.stringify(e):(f=new Date,f.setTime(f.getTime()+31536E6),document.cookie=c+"="+JSON.stringify(e).replace(/\"/g,'"')+"; expires="+f.toGMTString()+"; path=/");else return e&&e[a]?e[a][m]: {}};
d.addHeaderResizeEvent=function(f,c,b){b=g.extend({},{timer:250},b);var a=f.config,e=a.widgetOptions,d,k=function(){e.resize_flag=!0;d=[];a.$headers.each(function(){var a=g.data(this,"savedSizes"),b=this.offsetWidth,c=this.offsetHeight;if(b!==a[0]||c!==a[1])g.data(this,"savedSizes",[b,c]),d.push(this)});d.length&&a.$table.trigger("resize",[d]);e.resize_flag=!1};clearInterval(e.resize_timer);if(c)return e.resize_flag=!1;a.$headers.each(function(){g.data(this,"savedSizes",[this.offsetWidth,this.offsetHeight])}); e.resize_timer=setInterval(function(){e.resize_flag||k()},b.timer)};
d.addWidget({id:"uitheme",priority:10,options:{uitheme:"jui"},format:function(f,c,b){var a,e,l,k,m=d.themes,q=c.$table,u="default"!==c.theme?c.theme:b.uitheme||"jui",h=m[m[u]?u:m[b.uitheme]?b.uitheme:"jui"],p=c.$headers,B="tr."+(b.stickyHeaders||"tablesorter-stickyHeader"),v=h.sortNone+" "+h.sortDesc+" "+h.sortAsc;c.debug&&(a=new Date);q.hasClass("tablesorter-"+u)&&c.theme!==u&&f.hasInitialized||(""!==h.even&&(b.zebra[0]+=" "+h.even), ""!==h.odd&&(b.zebra[1]+=" "+h.odd),m=q.removeClass(""===c.theme?"":"tablesorter-"+c.theme).addClass("tablesorter-"+u+" "+h.table).find("tfoot"),m.length&&m.find("tr").addClass(h.footerRow).children("th, td").addClass(h.footerCells),p.addClass(h.header).filter(":not(.sorter-false)").bind("mouseenter.tsuitheme mouseleave.tsuitheme",function(a){g(this)["mouseenter"===a.type?"addClass":"removeClass"](h.hover)}),p.find(".tablesorter-wrapper").length||p.wrapInner('<div class="tablesorter-wrapper" style="position:relative;height:100%;width:100%"></div>'), c.cssIcon&&p.find("."+d.css.icon).addClass(h.icons),q.hasClass("hasFilters")&&p.find(".tablesorter-filter-row").addClass(h.filterRow));g.each(p,function(a){l=g(this);k=d.css.icon?l.find("."+d.css.icon):l;this.sortDisabled?(l.removeClass(v),k.removeClass(v+" tablesorter-icon "+h.icons)):(m=q.hasClass("hasStickyHeaders")?q.find(B).find("th").eq(a).add(l):l,e=l.hasClass(d.css.sortAsc)?h.sortAsc:l.hasClass(d.css.sortDesc)?h.sortDesc:l.hasClass(d.css.header)?h.sortNone:"",l[e===h.sortNone?"removeClass": "addClass"](h.active),k.removeClass(v).addClass(e))});c.debug&&d.benchmark("Applying "+u+" theme",a)},remove:function(f,c,b){f=c.$table;c="object"===typeof b.uitheme?"jui":b.uitheme||"jui";b="object"===typeof b.uitheme?b.uitheme:d.themes[d.themes.hasOwnProperty(c)?c:"jui"];var a=f.children("thead").children(),e=b.sortNone+" "+b.sortDesc+" "+b.sortAsc;f.removeClass("tablesorter-"+c+" "+b.table).find(d.css.header).removeClass(b.header);a.unbind("mouseenter.tsuitheme mouseleave.tsuitheme").removeClass(b.hover+ " "+e+" "+b.active).find(".tablesorter-filter-row").removeClass(b.filterRow);a.find(".tablesorter-icon").removeClass(b.icons)}});
d.addWidget({id:"columns",priority:30,options:{columns:["primary","secondary","tertiary"]},format:function(f,c,b){var a,e,l,k,m,q,u,h,p,B=c.$table,v=c.$tbodies,t=c.sortList,x=t.length,r=c.widgetColumns&&c.widgetColumns.hasOwnProperty("css")?c.widgetColumns.css||r:b&&b.hasOwnProperty("columns")?b.columns||r:r;q=r.length-1;u=r.join(" ");c.debug&&(m=new Date);for(p=0;p<v.length;p++)a= d.processTbody(f,v.eq(p),!0),e=a.children("tr"),e.each(function(){k=g(this);if("none"!==this.style.display&&(l=k.children().removeClass(u),t&&t[0]&&(l.eq(t[0][0]).addClass(r[0]),1<x)))for(h=1;h<x;h++)l.eq(t[h][0]).addClass(r[h]||r[q])}),d.processTbody(f,a,!1);e=!1!==b.columns_thead?["thead tr"]:[];!1!==b.columns_tfoot&&e.push("tfoot tr");if(e.length&&(k=B.find(e.join(",")).children().removeClass(u),x))for(h=0;h<x;h++)k.filter('[data-column="'+t[h][0]+'"]').addClass(r[h]||r[q]);c.debug&&d.benchmark("Applying Columns widget", m)},remove:function(f,c,b){var a=c.$tbodies,e=(b.columns||["primary","secondary","tertiary"]).join(" ");c.$headers.removeClass(e);c.$table.children("tfoot").children("tr").children("th, td").removeClass(e);for(c=0;c<a.length;c++)b=d.processTbody(f,a.eq(c),!0),b.children("tr").each(function(){g(this).children().removeClass(e)}),d.processTbody(f,b,!1)}});
d.addWidget({id:"filter",priority:50,options:{filter_childRows:!1,filter_columnFilters:!0,filter_cssFilter:"",filter_filteredRow:"filtered",filter_formatter:null, filter_functions:null,filter_hideFilters:!1,filter_ignoreCase:!0,filter_liveSearch:!0,filter_onlyAvail:"filter-onlyAvail",filter_reset:null,filter_searchDelay:300,filter_startsWith:!1,filter_useParsedData:!1,filter_serversideFiltering:!1,filter_defaultAttrib:"data-value",filter_regex:{regex:/^\/((?:\\\/|[^\/])+)\/([mig]{0,3})?$/,child:/tablesorter-childRow/,filtered:/filtered/,type:/undefined|number/,exact:/(^[\"|\'|=]+)|([\"|\'|=]+$)/g,nondigit:/[^\w,. \-()]/g,operators:/[<>=]/g}},format:function(f, c,b){if(!c.$table.hasClass("hasFilters")&&(c.parsers||!c.parsers&&b.filter_serversideFiltering)){var a,e,l,k,m,q,u,h,p,B,v,t,x,r,w,s,n,E,A,F=d.formatFloat,N="",C=c.$headers,y=c.$table.addClass("hasFilters"),I=c.$tbodies,J=c.columns||c.$headers.filter("th").length,G,O,P,H=function(a){var e=g.isArray(a),s=e?a:d.getFilters(f),l=(s||[]).join("");e&&d.setFilters(y,s);b.filter_hideFilters&&y.find(".tablesorter-filter-row").trigger(""===l?"mouseleave":"mouseenter");if(N!==l||!1===a)if(y.trigger("filterStart", [s]),c.showProcessing)setTimeout(function(){Q(a,s,l);return!1},30);else return Q(a,s,l),!1},Q=function(K,k,q){var p,t,v,r,x,z,B,D,A,E;c.debug&&(B=new Date);for(l=0;l<I.length;l++)if(!I.eq(l).hasClass(d.css.info)){K=d.processTbody(f,I.eq(l),!0);p=K.children("tr:not(."+c.cssChildRow+")");x=p.length;if(""===q||b.filter_serversideFiltering)K.children().show().removeClass(b.filter_filteredRow);else for(E=!0,r=y.data("lastSearch")||[],g.each(k,function(a,b){E=0===(b||"").indexOf(r[a]||"")&&E&&!/(\s+or\s+|\|)/g.test(b|| "")}),E&&0===p.filter(":visible").length&&(E=!1),e=0;e<x;e++)if(r=p[e].className,!(b.filter_regex.child.test(r)||E&&b.filter_regex.filtered.test(r))){r=!0;v=p.eq(e).nextUntil("tr:not(."+c.cssChildRow+")");n=v.length&&b.filter_childRows?v.text():"";n=b.filter_ignoreCase?n.toLocaleLowerCase():n;t=p.eq(e).children("td");for(a=0;a<J;a++)if(k[a]){u=b.filter_useParsedData||G[a]?c.cache[l].normalized[e][a]:g.trim(t.eq(a).text());h=!b.filter_regex.type.test(typeof u)&&b.filter_ignoreCase?u.toLocaleLowerCase(): u;z=r;k[a]=c.sortLocaleCompare?d.replaceAccents(k[a]):k[a];m=b.filter_ignoreCase?k[a].toLocaleLowerCase():k[a];if(b.filter_functions&&b.filter_functions[a])!0===b.filter_functions[a]?z=C.filter('[data-column="'+a+'"]:last').hasClass("filter-match")?0<=h.search(m):k[a]===u:"function"===typeof b.filter_functions[a]?z=b.filter_functions[a](u,c.cache[l].normalized[e][a],k[a],a,p.eq(e)):"function"===typeof b.filter_functions[a][k[a]]&&(z=b.filter_functions[a][k[a]](u,c.cache[l].normalized[e][a],k[a],a, p.eq(e)));else if(b.filter_regex.regex.test(m)){w=b.filter_regex.regex.exec(m);try{z=RegExp(w[1],w[2]).test(h)}catch(H){z=!1}}else if(m.replace(b.filter_regex.exact,"")==h)z=!0;else if(/^\!/.test(m))m=m.replace("!",""),s=h.search(g.trim(m)),z=""===m?!0:!(b.filter_startsWith?0===s:0<=s);else if(/^[<>]=?/.test(m)){s=F(m.replace(b.filter_regex.nondigit,"").replace(b.filter_regex.operators,""),f);if(G[a]||"numeric"===c.parsers[a].type)w=c.parsers[a].format(""+m.replace(b.filter_regex.operators,""),f, C.eq(a),a),s=""===w||isNaN(w)?s:w;w=!G[a]&&"numeric"!==c.parsers[a].type||isNaN(s)||!c.cache[l].normalized[e]?isNaN(h)?F(h.replace(b.filter_regex.nondigit,""),f):F(h,f):c.cache[l].normalized[e][a];/>/.test(m)&&(z=/>=/.test(m)?w>=s:w>s);/</.test(m)&&(z=/<=/.test(m)?w<=s:w<s);""===s&&(z=!0)}else if(/\s+(AND|&&)\s+/g.test(k[a]))for(s=m.split(/(?:\s+(?:and|&&)\s+)/g),z=0<=h.search(g.trim(s[0])),D=s.length-1;z&&D;)z=z&&0<=h.search(g.trim(s[D])),D--;else if(/\s+(-|to)\s+/.test(m)){s=m.split(/(?: - | to )/); D=F(s[0].replace(b.filter_regex.nondigit,""),f);A=F(s[1].replace(b.filter_regex.nondigit,""),f);if(G[a]||"numeric"===c.parsers[a].type)w=c.parsers[a].format(""+s[0],f,C.eq(a),a),D=""===w||isNaN(w)?D:w,w=c.parsers[a].format(""+s[1],f,C.eq(a),a),A=""===w||isNaN(w)?A:w;w=!G[a]&&"numeric"!==c.parsers[a].type||isNaN(D)||isNaN(A)?isNaN(h)?F(h.replace(b.filter_regex.nondigit,""),f):F(h,f):c.cache[l].normalized[e][a];D>A&&(z=D,D=A,A=z);z=w>=D&&w<=A||""===D||""===A?!0:!1}else/[\?|\*]/.test(m)||/\s+OR\s+/.test(k[a])? (s=m.replace(/\s+OR\s+/gi,"|"),!C.filter('[data-column="'+a+'"]:last').hasClass("filter-match")&&/\|/.test(s)&&(s="^("+s+")$"),z=RegExp(s.replace(/\?/g,"\\S{1}").replace(/\*/g,"\\S*")).test(h)):(u=(h+n).indexOf(m),z=!b.filter_startsWith&&0<=u||b.filter_startsWith&&0===u);r=z?r?!0:!1:!1}p[e].style.display=r?"":"none";p.eq(e)[r?"removeClass":"addClass"](b.filter_filteredRow);if(v.length)v[r?"show":"hide"]()}d.processTbody(f,K,!1)}N=q;y.data("lastSearch",k);c.debug&&d.benchmark("Completed filter widget search", B);y.trigger("applyWidgets");y.trigger("filterEnd")},R=function(a,f,s){var m,h,n=[];a=parseInt(a,10);h=C.filter('[data-column="'+a+'"]:last');m='<option value="">'+(h.data("placeholder")||h.attr("data-placeholder")||"")+"</option>";for(l=0;l<I.length;l++)for(k=c.cache[l].row.length,e=0;e<k;e++)s&&c.cache[l].row[e][0].className.match(b.filter_filteredRow)||(b.filter_useParsedData?n.push(""+c.cache[l].normalized[e][a]):(h=c.cache[l].row[e][0].cells[a])&&n.push(g.trim(c.supportsTextContent?h.textContent: g(h).text())));n=g.grep(n,function(a,b){return g.inArray(a,n)===b});n=d.sortNatural?n.sort(function(a,b){return d.sortNatural(a,b)}):n.sort(!0);s=y.find("thead").find('select.tablesorter-filter[data-column="'+a+'"]').val();for(l=0;l<n.length;l++)h=n[l].replace(/\"/g,"&quot;"),m+=""!==n[l]?'<option value="'+h+'"'+(s===h?' selected="selected"':"")+">"+n[l]+"</option>":"";y.find("thead").find('select.tablesorter-filter[data-column="'+a+'"]')[f?"html":"append"](m)},L=function(c){for(a=0;a<J;a++)n=C.filter('[data-column="'+ a+'"]:last'),(n.hasClass("filter-select")||b.filter_functions&&!0===b.filter_functions[a])&&!n.hasClass("filter-false")&&(b.filter_functions||(b.filter_functions={}),b.filter_functions[a]=!0,R(a,c,n.hasClass(b.filter_onlyAvail)))},M=function(a){"undefined"===typeof a||!0===a?(clearTimeout(P),P=setTimeout(function(){H(a)},b.filter_liveSearch?b.filter_searchDelay:10)):H(a)};c.debug&&(O=new Date);b.filter_regex.child=RegExp(c.cssChildRow);b.filter_regex.filtered=RegExp(b.filter_filteredRow);if(!1!== b.filter_columnFilters&&C.filter(".filter-false").length!==C.length){n='<tr class="tablesorter-filter-row">';for(a=0;a<J;a++)n+="<td></td>";c.$filters=g(n+="</tr>").appendTo(y.find("thead").eq(0)).find("td");for(a=0;a<J;a++)E=!1,r=C.filter('[data-column="'+a+'"]:last'),B=b.filter_functions&&b.filter_functions[a]&&"function"!==typeof b.filter_functions[a]||r.hasClass("filter-select"),E=d.getData?"false"===d.getData(r[0],c.headers[a],"filter"):c.headers[a]&&c.headers[a].hasOwnProperty("filter")&&!1=== c.headers[a].filter||r.hasClass("filter-false"),B?n=g("<select>").appendTo(c.$filters.eq(a)):(b.filter_formatter&&g.isFunction(b.filter_formatter[a])?((n=b.filter_formatter[a](c.$filters.eq(a),a))&&0===n.length&&(n=c.$filters.eq(a).children("input")),n&&(0===n.parent().length||n.parent().length&&n.parent()[0]!==c.$filters[a])&&c.$filters.eq(a).append(n)):n=g('<input type="search">').appendTo(c.$filters.eq(a)),n&&n.attr("placeholder",r.data("placeholder")||r.attr("data-placeholder")||"")),n&&(n.addClass("tablesorter-filter "+ b.filter_cssFilter).attr("data-column",a),E&&(n.addClass("disabled")[0].disabled=!0))}y.bind("addRows updateCell update updateRows updateComplete appendCache filterReset filterEnd search ".split(" ").join(".tsfilter "),function(a,b){/(search|filterReset|filterEnd)/.test(a.type)||(a.stopPropagation(),L(!0));"filterReset"===a.type&&M([]);"filterEnd"===a.type?L(!0):(b="search"===a.type?b:"updateComplete"===a.type?y.data("lastSearch"):"",M(b));return!1}).find("input.tablesorter-filter").bind("keyup search", function(a,c){if(27===a.which)this.value="";else if("number"===typeof b.filter_liveSearch&&this.value.length<b.filter_liveSearch&&""!==this.value||"keyup"===a.type&&(32>a.which&&8!==a.which&&!0===b.filter_liveSearch&&13!==a.which||37<=a.which&&40>=a.which||13!==a.which&&!1===b.filter_liveSearch))return;M(c)});G=C.map(function(a){return d.getData?"parsed"===d.getData(C.filter('[data-column="'+a+'"]:last'),c.headers[a],"filter"):g(this).hasClass("filter-parsed")}).get();b.filter_reset&&g(document).delegate(b.filter_reset, "click.tsfilter",function(){y.trigger("filterReset")});if(b.filter_functions)for(A in b.filter_functions)if(b.filter_functions.hasOwnProperty(A)&&"string"===typeof A)if(n=C.filter('[data-column="'+A+'"]:last'),q="",!0===b.filter_functions[A]&&!n.hasClass("filter-false"))R(A);else if("string"===typeof A&&!n.hasClass("filter-false")){for(v in b.filter_functions[A])"string"===typeof v&&(q+=""===q?'<option value="">'+(n.data("placeholder")||n.attr("data-placeholder")||"")+"</option>":"",q+='<option value="'+ v+'">'+v+"</option>");y.find("thead").find('select.tablesorter-filter[data-column="'+A+'"]').append(q)}L(!0);y.find("select.tablesorter-filter").bind("change search",function(a,b){H(b)});b.filter_hideFilters&&y.find(".tablesorter-filter-row").addClass("hideme").bind("mouseenter mouseleave",function(a){var b;t=g(this);clearTimeout(p);p=setTimeout(function(){/enter|over/.test(a.type)?t.removeClass("hideme"):g(document.activeElement).closest("tr")[0]!==t[0]&&(b=y.find(".tablesorter-filter").map(function(){return g(this).val()|| ""}).get().join(""),""===b&&t.addClass("hideme"))},200)}).find("input, select").bind("focus blur",function(a){x=g(this).closest("tr");clearTimeout(p);p=setTimeout(function(){if(""===y.find(".tablesorter-filter").map(function(){return g(this).val()||""}).get().join(""))x["focus"===a.type?"removeClass":"addClass"]("hideme")},200)});c.showProcessing&&y.bind("filterStart.tsfilter filterEnd.tsfilter",function(a,b){var c=b?y.find("."+d.css.header).filter("[data-column]").filter(function(){return""!==b[g(this).data("column")]}): "";d.isProcessing(y[0],"filterStart"===a.type,b?c:"")});c.debug&&d.benchmark("Applying Filter widget",O);y.bind("tablesorter-initialized",function(){if(q=d.getFilters(f)){for(a=0;a<q.length;a++)q[a]=C.filter('[data-column="'+a+'"]:last').attr(b.filter_defaultAttrib)||q[a];d.setFilters(f,q,!0)}});y.trigger("filterInit");H()}},remove:function(f,c,b){var a,e=c.$tbodies;c.$table.removeClass("hasFilters").unbind("addRows updateCell update updateComplete appendCache search filterStart filterEnd ".split(" ").join(".tsfilter ")).find(".tablesorter-filter-row").remove(); for(c=0;c<e.length;c++)a=d.processTbody(f,e.eq(c),!0),a.children().removeClass(b.filter_filteredRow).show(),d.processTbody(f,a,!1);b.filterreset&&g(document).undelegate(b.filter_reset,"click.tsfilter")}});
d.getFilters=function(d){var c=d?g(d)[0].config:{};return c&&c.widgetOptions&&!c.widgetOptions.filter_columnFilters?g(d).data("lastSearch"):c&&c.$filters?c.$filters.find(".tablesorter-filter").map(function(b,a){return g(a).val()}).get()||[]:!1};
d.setFilters=function(d,c,b){d=g(d);var a=d.length? d[0].config:{},a=a&&a.$filters?a.$filters.find(".tablesorter-filter").each(function(a,b){g(b).val(c[a]||"")}).trigger("change.tsfilter")||!1:!1;b&&d.trigger("search",[c,!1]);return!!a};
d.addWidget({id:"stickyHeaders",priority:60,options:{stickyHeaders:"",stickyHeaders_offset:0,stickyHeaders_cloneId:"-sticky",stickyHeaders_addResizeEvent:!0,stickyHeaders_includeCaption:!0,stickyHeaders_zIndex:2},format:function(f,c,b){if(!c.$table.hasClass("hasStickyHeaders")){var a=c.$table,e=g(window),l=a.children("thead:first"), k=l.children("tr:not(.sticky-false)").children(),m=a.find("tfoot"),q=isNaN(b.stickyHeaders_offset)?g(b.stickyHeaders_offset):"",u=q.length?q.height()||0:parseInt(b.stickyHeaders_offset,10)||0,h=b.stickyHeaders_zIndex?b.stickyHeaders_zIndex:2,p=b.$sticky=a.clone().addClass("containsStickyHeaders").css({position:"fixed",margin:0,top:u,visibility:"hidden",zIndex:h}),B=p.children("thead:first").addClass("tablesorter-stickyHeader "+b.stickyHeaders),v,t="",x=0,r=!1,w=function(){u=q.length?q.height()||0: parseInt(b.stickyHeaders_offset,10)||0;var c=navigator.userAgent;x=0;"collapse"===a.css("border-collapse")||/(webkit|msie)/i.test(c)||(x=2*parseInt(k.eq(0).css("border-left-width"),10));p.css({left:l.offset().left-e.scrollLeft()-x,width:a.width()});v.filter(":visible").each(function(a){a=k.filter(":visible").eq(a);g(this).css({width:a.width()-x,height:a.height()}).find(".tablesorter-header-inner").width(a.find(".tablesorter-header-inner").width())})};p.attr("id")&&(p[0].id+=b.stickyHeaders_cloneId); p.find("thead:gt(0), tr.sticky-false, tbody, tfoot").remove();b.stickyHeaders_includeCaption||p.find("caption").remove();v=B.children().children();p.css({height:0,width:0,padding:0,margin:0,border:0});v.find(".tablesorter-resizer").remove();a.addClass("hasStickyHeaders").bind("sortEnd.tsSticky",function(){k.filter(":visible").each(function(a){a=v.filter(":visible").eq(a);a.attr("class",g(this).attr("class")).removeClass(d.css.processing+" "+c.cssProcessing);c.cssIcon&&a.find("."+d.css.icon).attr("class", g(this).find("."+d.css.icon).attr("class"))})}).bind("pagerComplete.tsSticky",function(){w()});k.find(c.selectorSort).add(c.$headers.filter(c.selectorSort)).each(function(a){var b=g(this);a=B.children("tr.tablesorter-headerRow").children().eq(a).bind("mouseup",function(a){b.trigger(a,!0)});c.cancelSelection&&a.attr("unselectable","on").bind("selectstart",!1).css({"user-select":"none",MozUserSelect:"none"})});a.after(p);e.bind("scroll.tsSticky resize.tsSticky",function(c){if(a.is(":visible")){var d= a.offset(),f=b.stickyHeaders_includeCaption?0:a.find("caption").outerHeight(!0),f=e.scrollTop()+u-f,g=a.height()-(p.height()+(m.height()||0)),d=f>d.top&&f<d.top+g?"visible":"hidden";p.removeClass("tablesorter-sticky-visible tablesorter-sticky-hidden").addClass("tablesorter-sticky-"+d).css({left:l.offset().left-e.scrollLeft()-x,visibility:d});if(d!==t||"resize"===c.type)w(),t=d}});b.stickyHeaders_addResizeEvent&&d.addHeaderResizeEvent(f);a.bind("filterEnd",function(){r||B.find(".tablesorter-filter-row").children().each(function(a){g(this).find(".tablesorter-filter").val(c.$filters.find(".tablesorter-filter").eq(a).val())})}); v.find(".tablesorter-filter").bind("keyup search change",function(a){if(!(32>a.which&&8!==a.which||37<=a.which&&40>=a.which)){r=!0;a=g(this);var d=a.attr("data-column");c.$filters.find(".tablesorter-filter").eq(d).val(a.val()).trigger("search");setTimeout(function(){r=!1},b.filter_searchDelay)}});a.trigger("stickyHeadersInit")}},remove:function(f,c,b){c.$table.removeClass("hasStickyHeaders").unbind("sortEnd.tsSticky pagerComplete.tsSticky").find(".tablesorter-stickyHeader").remove();b.$sticky&&b.$sticky.length&& b.$sticky.remove();g(".hasStickyHeaders").length||g(window).unbind("scroll.tsSticky resize.tsSticky");d.addHeaderResizeEvent(f,!1)}});
d.addWidget({id:"resizable",priority:40,options:{resizable:!0,resizable_addLastColumn:!1},format:function(f,c,b){if(!c.$table.hasClass("hasResizable")){c.$table.addClass("hasResizable");var a,e,l,k,m={},q,u,h,p,B=c.$table,v=0,t=null,x=null,r=20>Math.abs(B.parent().width()-B.width()),w=function(){d.storage&&t&&(m[t.index()]=t.width(),m[x.index()]=x.width(),t.width(m[t.index()]), x.width(m[x.index()]),!1!==b.resizable&&d.storage(f,"tablesorter-resizable",m));v=0;t=x=null;g(window).trigger("resize")};if(m=d.storage&&!1!==b.resizable?d.storage(f,"tablesorter-resizable"):{})for(k in m)!isNaN(k)&&k<c.$headers.length&&c.$headers.eq(k).width(m[k]);a=B.children("thead:first").children("tr");a.children().each(function(){e=g(this);l=e.attr("data-column");k="false"===d.getData(e,c.headers[l],"resizable");a.children().filter('[data-column="'+l+'"]').toggleClass("resizable-false",k)}); a.each(function(){q=g(this).children(":not(.resizable-false)");g(this).find(".tablesorter-wrapper").length||q.wrapInner('<div class="tablesorter-wrapper" style="position:relative;height:100%;width:100%"></div>');b.resizable_addLastColumn||(q=q.slice(0,-1));u=u?u.add(q):q});u.each(function(){a=g(this);k=parseInt(a.css("padding-right"),10)+10;e='<div class="tablesorter-resizer" style="cursor:w-resize;position:absolute;z-index:1;right:-'+k+'px;top:0;height:100%;width:20px;"></div>';a.find(".tablesorter-wrapper").append(e)}).bind("mousemove.tsresize", function(a){0!==v&&t&&(h=a.pageX-v,p=t.width(),t.width(p+h),t.width()!==p&&r&&x.width(x.width()-h),v=a.pageX)}).bind("mouseup.tsresize",function(){w()}).find(".tablesorter-resizer,.tablesorter-resizer-grip").bind("mousedown",function(a){t=g(a.target).closest("th");e=c.$headers.filter('[data-column="'+t.attr("data-column")+'"]');1<e.length&&(t=t.add(e));x=a.shiftKey?t.parent().find("th:not(.resizable-false)").filter(":last"):t.nextAll(":not(.resizable-false)").eq(0);v=a.pageX});B.find("thead:first").bind("mouseup.tsresize mouseleave.tsresize", function(){w()}).bind("contextmenu.tsresize",function(){d.resizableReset(f);var a=g.isEmptyObject?g.isEmptyObject(m):m==={};m={};return a})}},remove:function(f,c,b){c.$table.removeClass("hasResizable").find("thead").unbind("mouseup.tsresize mouseleave.tsresize contextmenu.tsresize").find("tr").children().unbind("mousemove.tsresize mouseup.tsresize").find(".tablesorter-resizer,.tablesorter-resizer-grip").remove();d.resizableReset(f)}});
d.resizableReset=function(f){f.config.$headers.filter(":not(.resizable-false)").css("width", "");d.storage&&d.storage(f,"tablesorter-resizable",{})};
d.addWidget({id:"saveSort",priority:20,options:{saveSort:!0},init:function(d,c,b,a){c.format(d,b,a,!0)},format:function(f,c,b,a){var e,l=c.$table;b=!1!==b.saveSort;var k={sortList:c.sortList};c.debug&&(e=new Date);l.hasClass("hasSaveSort")?b&&f.hasInitialized&&d.storage&&(d.storage(f,"tablesorter-savesort",k),c.debug&&d.benchmark("saveSort widget: Saving last sort: "+c.sortList,e)):(l.addClass("hasSaveSort"),k="",d.storage&&(k=(b=d.storage(f, "tablesorter-savesort"))&&b.hasOwnProperty("sortList")&&g.isArray(b.sortList)?b.sortList:"",c.debug&&d.benchmark('saveSort: Last sort loaded: "'+k+'"',e),l.bind("saveSortReset",function(a){a.stopPropagation();d.storage(f,"tablesorter-savesort","")})),a&&k&&0<k.length?c.sortList=k:f.hasInitialized&&k&&0<k.length&&l.trigger("sorton",[k]))},remove:function(f){d.storage&&d.storage(f,"tablesorter-savesort","")}})
})(jQuery);
/*! tablesorter pager plugin minified - updated 10/18/2013 */
;(function(g){var l=g.tablesorter;g.extend({tablesorterPager:new function(){this.defaults={container:null,ajaxUrl:null,customAjaxUrl:function(b,a){return a},ajaxObject:{dataType:"json"},ajaxProcessing:function(b){return[0,[],null]},output:"{startRow} to {endRow} of {totalRows} rows",updateArrows:!0,page:0,size:10,savePages:!0,fixedHeight:!1,removeRows:!1,cssFirst:".first",cssPrev:".prev",cssNext:".next",cssLast:".last",cssGoto:".gotoPage",cssPageDisplay:".pagedisplay",cssPageSize:".pagesize",cssErrorRow:"tablesorter-errorRow", cssDisabled:"disabled",totalRows:0,totalPages:0,filteredRows:0,filteredPages:0,currentFilters:[],startRow:0,endRow:0,$size:null,last:{}};var w=this,x=function(b,a){var c=b.cssDisabled,f=!!a,e=Math.min(b.totalPages,b.filteredPages);b.updateArrows&&(b.$container.find(b.cssFirst+","+b.cssPrev)[f||0===b.page?"addClass":"removeClass"](c),b.$container.find(b.cssNext+","+b.cssLast)[f||b.page===e-1?"addClass":"removeClass"](c))},r=function(b,a,c){var f,e,h,d=b.config;f=d.$table.hasClass("hasFilters")&&!a.ajaxUrl; h=(d.widgetOptions&&d.widgetOptions.filter_filteredRow||"filtered")+","+d.selectorRemove;e=a.size||10;a.totalPages=Math.ceil(a.totalRows/e);a.filteredRows=f?d.$tbodies.eq(0).children("tr:not(."+h+")").length:a.totalRows;a.filteredPages=f?Math.ceil(a.filteredRows/e)||1:a.totalPages;if(0<=Math.min(a.totalPages,a.filteredPages)&&(h=a.size*a.page>a.filteredRows,a.startRow=h?1:0===a.filteredRows?0:a.size*a.page+1,a.page=h?0:a.page,a.endRow=Math.min(a.filteredRows,a.totalRows,a.size*(a.page+1)),f=a.$container.find(a.cssPageDisplay), h=(a.ajaxData&&a.ajaxData.output?a.ajaxData.output||a.output:a.output).replace(/\{page([\-+]\d+)?\}/gi,function(b,c){return a.page+(c?parseInt(c,10):1)}).replace(/\{\w+(\s*:\s*\w+)?\}/gi,function(b){b=b.replace(/[{}\s]/g,"");var c=b.split(":"),d=a.ajaxData;return 1<c.length&&d&&d[c[0]]?d[c[0]][c[1]]:a[b]||(d?d[b]:"")||""}),f.length&&(f["INPUT"===f[0].tagName?"val":"html"](h),a.$goto.length))){h="";e=Math.min(a.totalPages,a.filteredPages);for(f=1;f<=e;f++)h+="<option>"+f+"</option>";a.$goto.html(h).val(a.page+ 1)}x(a);a.initialized&&!1!==c&&(d.$table.trigger("pagerComplete",a),a.savePages&&l.storage&&l.storage(b,"tablesorter-pager",{page:a.page,size:a.size}))},t=function(b,a){var c,f=b.config,e=f.$tbodies.eq(0);a.fixedHeight&&(e.find("tr.pagerSavedHeightSpacer").remove(),c=g.data(b,"pagerSavedHeight"))&&(c-=e.height(),5<c&&g.data(b,"pagerLastSize")===a.size&&e.children("tr:visible").length<a.size&&e.append('<tr class="pagerSavedHeightSpacer '+f.selectorRemove.replace(/(tr)?\./g,"")+'" style="height:'+c+ 'px;"></tr>'))},A=function(b,a){var c=b.config.$tbodies.eq(0);c.find("tr.pagerSavedHeightSpacer").remove();g.data(b,"pagerSavedHeight",c.height());t(b,a);g.data(b,"pagerLastSize",a.size)},u=function(b,a){if(!a.ajaxUrl){var c,f=b.config,e=f.$tbodies.eq(0).children(),h=e.length,d=a.page*a.size,g=d+a.size,n=f.widgetOptions&&f.widgetOptions.filter_filteredRow||"filtered",m=0;for(c=0;c<h;c++)e[c].className.match(n)||(e[c].style.display=m>=d&&m<g?"":"none",m+=e[c].className.match(f.cssChildRow+"|"+f.selectorRemove.slice(1))? 0:1)}},B=function(b,a){a.size=parseInt(a.$size.val(),10)||a.size;g.data(b,"pagerLastSize",a.size);x(a);a.removeRows||(u(b,a),g(b).bind("sortEnd.pager filterEnd.pager",function(){u(b,a)}))},C=function(b,a,c,f,e){if("function"===typeof c.ajaxProcessing){var h,d,s,n,m,v,k=a.config,p=k.$table,q="";h=c.ajaxProcessing(b,a)||[0,[]];b=p.find("thead th").length;p.find("thead tr."+c.cssErrorRow).remove();if(e)g('<tr class="'+c.cssErrorRow+'"><td style="text-align:center;" colspan="'+b+'">'+(0===f.status?"Not connected, verify Network": 404===f.status?"Requested page not found [404]":500===f.status?"Internal Server Error [500]":"parsererror"===e?"Requested JSON parse failed":"timeout"===e?"Time out error":"abort"===e?"Ajax Request aborted":"Uncaught error: "+f.statusText+" ["+f.status+"]")+"</td></tr>").click(function(){g(this).remove()}).appendTo(p.find("thead:first")),k.$tbodies.eq(0).empty();else{g.isArray(h)?(f=isNaN(h[0])&&!isNaN(h[1]),e=h[f?1:0],c.totalRows=isNaN(e)?c.totalRows||0:e,f=h[f?0:1]||[],m=h[2]):(c.ajaxData=h,c.totalRows= h.total,m=h.headers,f=h.rows);v=f.length;if(f instanceof jQuery)k.$tbodies.eq(0).empty().append(f);else if(v){if(0<v)for(h=0;h<v;h++){q+="<tr>";for(e=0;e<f[h].length;e++)q+="<td>"+f[h][e]+"</td>";q+="</tr>"}k.$tbodies.eq(0).html(q)}m&&m.length===b&&(n=(d=p.hasClass("hasStickyHeaders"))?k.$sticky.children("thead:first").children().children():"",s=p.find("tfoot tr:first").children(),k.$headers.filter("th").each(function(a){var b=g(this),c;b.find("."+l.css.icon).length?(c=b.find("."+l.css.icon).clone(!0), b.find(".tablesorter-header-inner").html(m[a]).append(c),d&&n.length&&(c=n.eq(a).find("."+l.css.icon).clone(!0),n.eq(a).find(".tablesorter-header-inner").html(m[a]).append(c))):(b.find(".tablesorter-header-inner").html(m[a]),d&&n.length&&n.eq(a).find(".tablesorter-header-inner").html(m[a]));s.eq(a).html(m[a])}))}k.showProcessing&&l.isProcessing(a);c.totalPages=Math.ceil(c.totalRows/(c.size||10));r(a,c);t(a,c);c.initialized?(p.trigger("pagerChange",c),p.trigger("updateComplete")):p.trigger("update")}c.initialized|| (c.initialized=!0,g(a).trigger("pagerInitialized",c))},H=function(b,a){var c=G(b,a),f=g(document),e=b.config;""!==c&&(e.showProcessing&&l.isProcessing(b,!0),f.bind("ajaxError.pager",function(c,d,e,g){C(null,b,a,d,g);f.unbind("ajaxError.pager")}),a.ajaxObject.url=c,a.ajaxObject.success=function(c){C(c,b,a);f.unbind("ajaxError.pager");"function"===typeof a.oldAjaxSuccess&&a.oldAjaxSuccess(c)},g.ajax(a.ajaxObject))},G=function(b,a){var c=a.ajaxUrl?a.ajaxUrl.replace(/\{page([\-+]\d+)?\}/,function(c,b){return a.page+ (b?parseInt(b,10):0)}).replace(/\{size\}/g,a.size):"",f=b.config.sortList,e=a.currentFilters||[],h=c.match(/\{\s*sort(?:List)?\s*:\s*(\w*)\s*\}/),d=c.match(/\{\s*filter(?:List)?\s*:\s*(\w*)\s*\}/),k=[];h&&(h=h[1],g.each(f,function(a,b){k.push(h+"["+b[0]+"]="+b[1])}),c=c.replace(/\{\s*sort(?:List)?\s*:\s*(\w*)\s*\}/g,k.length?k.join("&"):h),k=[]);d&&(d=d[1],g.each(e,function(a,b){b&&k.push(d+"["+a+"]="+encodeURIComponent(b))}),c=c.replace(/\{\s*filter(?:List)?\s*:\s*(\w*)\s*\}/g,k.length?k.join("&"): d));"function"===typeof a.customAjaxUrl&&(c=a.customAjaxUrl(b,c));return c},y=function(b,a,c){var f,e;f=c.page*c.size;var h=f+c.size;if(!(1>(a&&a.length||0))){c.page>=c.totalPages&&D(b,c);c.isDisabled=!1;c.initialized&&g(b).trigger("pagerChange",c);if(c.removeRows){h>a.length&&(h=a.length);l.clearTableBody(b);for(e=l.processTbody(b,b.config.$tbodies.eq(0),!0);f<h;f++)e.append(a[f]);l.processTbody(b,e,!1)}else u(b,c);r(b,c);c.isDisabled||t(b,c);g(b).trigger("applyWidgets")}},E=function(b,a){a.ajax? x(a,!0):(a.isDisabled=!0,g.data(b,"pagerLastPage",a.page),g.data(b,"pagerLastSize",a.size),a.page=0,a.size=a.totalRows,a.totalPages=1,g(b).addClass("pagerDisabled").find("tr.pagerSavedHeightSpacer").remove(),y(b,b.config.rowsCopy,a));a.$size.add(a.$goto).each(function(){g(this).addClass(a.cssDisabled)[0].disabled=!0})},k=function(b,a,c){if(!a.isDisabled){var f=a.last,e=Math.min(a.totalPages,a.filteredPages);0>a.page&&(a.page=0);a.page>e-1&&0!==e&&(a.page=e-1);if(f.page!==a.page||f.size!==a.size|| f.total!==a.totalPages||f.filters!==a.currentFilters)a.last={page:a.page,size:a.size,totalPages:a.totalPages,currentFilters:a.currentFilters},a.ajax?H(b,a):a.ajax||y(b,b.config.rowsCopy,a),g.data(b,"pagerLastPage",a.page),g.data(b,"pagerUpdateTriggered",!0),a.initialized&&!1!==c&&g(b).trigger("pageMoved",a)}},z=function(b,a,c){c.size=a;c.$size.val(a);g.data(b,"pagerLastPage",c.page);g.data(b,"pagerLastSize",c.size);c.totalPages=Math.ceil(c.totalRows/(c.size||10));k(b,c)},I=function(b,a){a.page=0; k(b,a)},D=function(b,a){a.page=Math.min(a.totalPages,a.filteredPages)-1;k(b,a)},J=function(b,a){a.page++;a.page>=Math.min(a.totalPages,a.filteredPages)-1&&(a.page=Math.min(a.totalPages,a.filteredPages)-1);k(b,a)},K=function(b,a){a.page--;0>=a.page&&(a.page=0);k(b,a)},F=function(b,a,c){var f=a.$size.removeClass(a.cssDisabled).removeAttr("disabled");a.$goto.removeClass(a.cssDisabled).removeAttr("disabled");a.isDisabled=!1;a.page=g.data(b,"pagerLastPage")||a.page||0;a.size=g.data(b,"pagerLastSize")|| parseInt(f.find("option[selected]").val(),10)||a.size;f.val(a.size);a.totalPages=Math.ceil(Math.min(a.totalPages,a.filteredPages)/(a.size||10));c&&(g(b).trigger("update"),z(b,a.size,a),B(b,a),t(b,a))};w.appender=function(b,a){var c=b.config.pager;c.ajax||(b.config.rowsCopy=a,c.totalRows=a.length,c.size=g.data(b,"pagerLastSize")||c.size,c.totalPages=Math.ceil(c.totalRows/(c.size||10)),y(b,a,c))};w.construct=function(b){return this.each(function(){if(this.config&&this.hasInitialized){var a,c,f,e=this, h=e.config,d=h.pager=g.extend({},g.tablesorterPager.defaults,b),s=h.$table,n=d.$container=g(d.container).addClass("tablesorter-pager").show();d.oldAjaxSuccess=d.oldAjaxSuccess||d.ajaxObject.success;h.appender=w.appender;d.savePages&&l.storage&&(a=l.storage(e,"tablesorter-pager")||{},d.page=isNaN(a.page)?d.page:a.page,d.size=(isNaN(a.size)?d.size:a.size)||10);s.unbind("filterStart.pager filterEnd.pager sortEnd.pager disable.pager enable.pager destroy.pager update.pager pageSize.pager").bind("filterStart.pager", function(a,b){g.data(e,"pagerUpdateTriggered",!1);d.currentFilters=b}).bind("filterEnd.pager sortEnd.pager",function(a){g.data(e,"pagerUpdateTriggered")?g.data(e,"pagerUpdateTriggered",!1):(("filterEnd"===a.type||"sortEnd"===a.type&&h.serverSideSorting)&&k(e,d,!1),r(e,d,!1),t(e,d))}).bind("disable.pager",function(a){a.stopPropagation();E(e,d)}).bind("enable.pager",function(a){a.stopPropagation();F(e,d,!0)}).bind("destroy.pager",function(a){a.stopPropagation();E(e,d);d.$container.hide();e.config.appender= null;d.initialized=!1;g(e).unbind("destroy.pager sortEnd.pager filterEnd.pager enable.pager disable.pager");l.storage&&l.storage(e,"tablesorter-pager","")}).bind("update.pager",function(a){a.stopPropagation();u(e,d)}).bind("pageSize.pager",function(a,b){a.stopPropagation();z(e,parseInt(b,10)||10,d);u(e,d);r(e,d,!1);d.$size.length&&d.$size.val(d.size)}).bind("pageSet.pager",function(a,b){a.stopPropagation();d.page=(parseInt(b,10)||1)-1;d.$goto.length&&d.$goto.val(d.size);k(e,d);r(e,d,!1)});c=[d.cssFirst, d.cssPrev,d.cssNext,d.cssLast];f=[I,K,J,D];n.find(c.join(",")).unbind("click.pager").bind("click.pager",function(a){var b=g(this),h=c.length;if(!b.hasClass(d.cssDisabled))for(a=0;a<h;a++)if(b.is(c[a])){f[a](e,d);break}return!1});d.$goto=n.find(d.cssGoto);d.$goto.length&&d.$goto.unbind("change").bind("change",function(){d.page=g(this).val()-1;k(e,d);r(e,d,!1)});d.$size=n.find(d.cssPageSize);d.$size.length&&d.$size.unbind("change.pager").bind("change.pager",function(){d.$size.val(g(this).val());g(this).hasClass(d.cssDisabled)|| (z(e,parseInt(g(this).val(),10),d),A(e,d));return!1});d.initialized=!1;s.trigger("pagerBeforeInitialized",d);F(e,d,!1);"string"===typeof d.ajaxUrl?(d.ajax=!0,h.widgetOptions.filter_serversideFiltering=!0,h.serverSideSorting=!0,k(e,d)):(d.ajax=!1,g(this).trigger("appendCache",!0),B(e,d));A(e,d);d.ajax||(d.initialized=!0,g(e).trigger("pagerInitialized",d))}})}}});g.fn.extend({tablesorterPager:g.tablesorterPager.construct})})(jQuery);

/*!
 * typeahead.js 0.9.3
 * https://github.com/twitter/typeahead
 * Copyright 2013 Twitter, Inc. and other contributors; Licensed MIT
 */

(function($)
{
    var VERSION = "0.9.3";
    var utils = {
        isMsie          : function()
        {
            var match = /(msie) ([\w.]+)/i.exec(navigator.userAgent);
            return match ? parseInt(match[2], 10) : false;
        },
        isBlankString   : function(str)
        {
            return !str || /^\s*$/.test(str);
        },
        escapeRegExChars: function(str)
        {
            return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        },
        isString        : function(obj)
        {
            return typeof obj === "string";
        },
        isNumber        : function(obj)
        {
            return typeof obj === "number";
        },
        isArray         : $.isArray,
        isFunction      : $.isFunction,
        isObject        : $.isPlainObject,
        isUndefined     : function(obj)
        {
            return typeof obj === "undefined";
        },
        bind            : $.proxy,
        bindAll         : function(obj)
        {
            var val;
            for (var key in obj) {
                $.isFunction(val = obj[key]) && (obj[key] = $.proxy(val, obj));
            }
        },
        indexOf         : function(haystack, needle)
        {
            for (var i = 0; i < haystack.length; i++) {
                if (haystack[i] === needle) {
                    return i;
                }
            }
            return -1;
        },
        each            : $.each,
        map             : $.map,
        filter          : $.grep,
        every           : function(obj, test)
        {
            var result = true;
            if (!obj) {
                return result;
            }
            $.each(obj, function(key, val)
            {
                if (!(result = test.call(null, val, key, obj))) {
                    return false;
                }
            });
            return !!result;
        },
        some            : function(obj, test)
        {
            var result = false;
            if (!obj) {
                return result;
            }
            $.each(obj, function(key, val)
            {
                if (result = test.call(null, val, key, obj)) {
                    return false;
                }
            });
            return !!result;
        },
        mixin           : $.extend,
        getUniqueId     : function()
        {
            var counter = 0;
            return function()
            {
                return counter++;
            };
        }(),
        defer           : function(fn)
        {
            setTimeout(fn, 0);
        },
        debounce        : function(func, wait, immediate)
        {
            var timeout, result;
            return function()
            {
                var context = this, args = arguments, later, callNow;
                later = function()
                {
                    timeout = null;
                    if (!immediate) {
                        result = func.apply(context, args);
                    }
                };
                callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) {
                    result = func.apply(context, args);
                }
                return result;
            };
        },
        throttle        : function(func, wait)
        {
            var context, args, timeout, result, previous, later;
            previous = 0;
            later = function()
            {
                previous = new Date();
                timeout = null;
                result = func.apply(context, args);
            };
            return function()
            {
                var now = new Date(), remaining = wait - (now - previous);
                context = this;
                args = arguments;
                if (remaining <= 0) {
                    clearTimeout(timeout);
                    timeout = null;
                    previous = now;
                    result = func.apply(context, args);
                } else if (!timeout) {
                    timeout = setTimeout(later, remaining);
                }
                return result;
            };
        },
        tokenizeQuery   : function(str)
        {
            return $.trim(str).toLowerCase().split(/[\s]+/);
        },
        tokenizeText    : function(str)
        {
            return $.trim(str).toLowerCase().split(/[\s\-_]+/);
        },
        getProtocol     : function()
        {
            return location.protocol;
        },
        noop            : function()
        {
        }
    };
    var EventTarget = function()
    {
        var eventSplitter = /\s+/;
        return {
            on     : function(events, callback)
            {
                var event;
                if (!callback) {
                    return this;
                }
                this._callbacks = this._callbacks || {};
                events = events.split(eventSplitter);
                while (event = events.shift()) {
                    this._callbacks[event] = this._callbacks[event] || [];
                    this._callbacks[event].push(callback);
                }
                return this;
            },
            trigger: function(events, data)
            {
                var event, callbacks;
                if (!this._callbacks) {
                    return this;
                }
                events = events.split(eventSplitter);
                while (event = events.shift()) {
                    if (callbacks = this._callbacks[event]) {
                        for (var i = 0; i < callbacks.length; i += 1) {
                            callbacks[i].call(this, {
                                type: event,
                                data: data
                            });
                        }
                    }
                }
                return this;
            }
        };
    }();
    var EventBus = function()
    {
        var namespace = "typeahead:";

        function EventBus(o)
        {
            if (!o || !o.el) {
                $.error("EventBus initialized without el");
            }
            this.$el = $(o.el);
        }

        utils.mixin(EventBus.prototype, {
            trigger: function(type)
            {
                var args = [].slice.call(arguments, 1);
                this.$el.trigger(namespace + type, args);
            }
        });
        return EventBus;
    }();
    var PersistentStorage = function()
    {
        var ls, methods;
        try {
            ls = window.localStorage;
            ls.setItem("~~~", "!");
            ls.removeItem("~~~");
        } catch (err) {
            ls = null;
        }
        function PersistentStorage(namespace)
        {
            this.prefix = [ "__", namespace, "__" ].join("");
            this.ttlKey = "__ttl__";
            this.keyMatcher = new RegExp("^" + this.prefix);
        }

        if (ls && window.JSON) {
            methods = {
                _prefix  : function(key)
                {
                    return this.prefix + key;
                },
                _ttlKey  : function(key)
                {
                    return this._prefix(key) + this.ttlKey;
                },
                get      : function(key)
                {
                    if (this.isExpired(key)) {
                        this.remove(key);
                    }
                    return decode(ls.getItem(this._prefix(key)));
                },
                set      : function(key, val, ttl)
                {
                    if (utils.isNumber(ttl)) {
                        ls.setItem(this._ttlKey(key), encode(now() + ttl));
                    } else {
                        ls.removeItem(this._ttlKey(key));
                    }
                    return ls.setItem(this._prefix(key), encode(val));
                },
                remove   : function(key)
                {
                    ls.removeItem(this._ttlKey(key));
                    ls.removeItem(this._prefix(key));
                    return this;
                },
                clear    : function()
                {
                    var i, key, keys = [], len = ls.length;
                    for (i = 0; i < len; i++) {
                        if ((key = ls.key(i)).match(this.keyMatcher)) {
                            keys.push(key.replace(this.keyMatcher, ""));
                        }
                    }
                    for (i = keys.length; i--;) {
                        this.remove(keys[i]);
                    }
                    return this;
                },
                isExpired: function(key)
                {
                    var ttl = decode(ls.getItem(this._ttlKey(key)));
                    return utils.isNumber(ttl) && now() > ttl ? true : false;
                }
            };
        } else {
            methods = {
                get      : utils.noop,
                set      : utils.noop,
                remove   : utils.noop,
                clear    : utils.noop,
                isExpired: utils.noop
            };
        }
        utils.mixin(PersistentStorage.prototype, methods);
        return PersistentStorage;
        function now()
        {
            return new Date().getTime();
        }

        function encode(val)
        {
            return JSON.stringify(utils.isUndefined(val) ? null : val);
        }

        function decode(val)
        {
            return JSON.parse(val);
        }
    }();
    var RequestCache = function()
    {
        function RequestCache(o)
        {
            utils.bindAll(this);
            o = o || {};
            this.sizeLimit = o.sizeLimit || 10;
            this.cache = {};
            this.cachedKeysByAge = [];
        }

        utils.mixin(RequestCache.prototype, {
            get: function(url)
            {
                return this.cache[url];
            },
            set: function(url, resp)
            {
                var requestToEvict;
                if (this.cachedKeysByAge.length === this.sizeLimit) {
                    requestToEvict = this.cachedKeysByAge.shift();
                    delete this.cache[requestToEvict];
                }
                this.cache[url] = resp;
                this.cachedKeysByAge.push(url);
            }
        });
        return RequestCache;
    }();
    var Transport = function()
    {
        var pendingRequestsCount = 0, pendingRequests = {}, maxPendingRequests, requestCache;

        function Transport(o)
        {
            utils.bindAll(this);
            o = utils.isString(o) ? {
                url: o
            } : o;
            requestCache = requestCache || new RequestCache();
            maxPendingRequests = utils.isNumber(o.maxParallelRequests) ? o.maxParallelRequests : maxPendingRequests || 6;
            this.url = o.url;
            this.wildcard = o.wildcard || "%QUERY";
            this.filter = o.filter;
            this.replace = o.replace;
            this.ajaxSettings = {
                type      : "get",
                cache     : o.cache,
                timeout   : o.timeout,
                dataType  : o.dataType || "json",
                beforeSend: o.beforeSend
            };
            this._get = (/^throttle$/i.test(o.rateLimitFn) ? utils.throttle : utils.debounce)(this._get, o.rateLimitWait || 300);
        }

        utils.mixin(Transport.prototype, {
            _get        : function(url, cb)
            {
                var that = this;
                if (belowPendingRequestsThreshold()) {
                    this._sendRequest(url).done(done);
                } else {
                    this.onDeckRequestArgs = [].slice.call(arguments, 0);
                }
                function done(resp)
                {
                    var data = that.filter ? that.filter(resp) : resp;
                    cb && cb(data);
                    requestCache.set(url, resp);
                }
            },
            _sendRequest: function(url)
            {
                var that = this, jqXhr = pendingRequests[url];
                if (!jqXhr) {
                    incrementPendingRequests();
                    jqXhr = pendingRequests[url] = $.ajax(url, this.ajaxSettings).always(always);
                }
                return jqXhr;
                function always()
                {
                    decrementPendingRequests();
                    pendingRequests[url] = null;
                    if (that.onDeckRequestArgs) {
                        that._get.apply(that, that.onDeckRequestArgs);
                        that.onDeckRequestArgs = null;
                    }
                }
            },
            get         : function(query, cb)
            {
                var that = this, encodedQuery = encodeURIComponent(query || ""), url, resp;
                cb = cb || utils.noop;
                url = this.replace ? this.replace(this.url, encodedQuery) : this.url.replace(this.wildcard, encodedQuery);
                if (resp = requestCache.get(url)) {
                    utils.defer(function()
                    {
                        cb(that.filter ? that.filter(resp) : resp);
                    });
                } else {
                    this._get(url, cb);
                }
                return !!resp;
            }
        });
        return Transport;
        function incrementPendingRequests()
        {
            pendingRequestsCount++;
        }

        function decrementPendingRequests()
        {
            pendingRequestsCount--;
        }

        function belowPendingRequestsThreshold()
        {
            return pendingRequestsCount < maxPendingRequests;
        }
    }();
    var Dataset = function()
    {
        var keys = {
            thumbprint   : "thumbprint",
            protocol     : "protocol",
            itemHash     : "itemHash",
            adjacencyList: "adjacencyList"
        };

        function Dataset(o)
        {
            utils.bindAll(this);
            if (utils.isString(o.template) && !o.engine) {
                $.error("no template engine specified");
            }
            if (!o.local && !o.prefetch && !o.remote) {
                $.error("one of local, prefetch, or remote is required");
            }
            this.name = o.name || utils.getUniqueId();
            this.limit = o.limit || 5;
            this.minLength = o.minLength || 1;
            this.header = o.header;
            this.footer = o.footer;
            this.valueKey = o.valueKey || "value";
            this.template = compileTemplate(o.template, o.engine, this.valueKey);
            this.local = o.local;
            this.prefetch = o.prefetch;
            this.remote = o.remote;
            this.itemHash = {};
            this.adjacencyList = {};
            this.storage = o.name ? new PersistentStorage(o.name) : null;
        }

        utils.mixin(Dataset.prototype, {
            _processLocalData   : function(data)
            {
                this._mergeProcessedData(this._processData(data));
            },
            _loadPrefetchData   : function(o)
            {
                var that = this, thumbprint = VERSION + (o.thumbprint || ""), storedThumbprint, storedProtocol, storedItemHash, storedAdjacencyList, isExpired, deferred;
                if (this.storage) {
                    storedThumbprint = this.storage.get(keys.thumbprint);
                    storedProtocol = this.storage.get(keys.protocol);
                    storedItemHash = this.storage.get(keys.itemHash);
                    storedAdjacencyList = this.storage.get(keys.adjacencyList);
                }
                isExpired = storedThumbprint !== thumbprint || storedProtocol !== utils.getProtocol();
                o = utils.isString(o) ? {
                    url: o
                } : o;
                o.ttl = utils.isNumber(o.ttl) ? o.ttl : 24 * 60 * 60 * 1e3;
                if (storedItemHash && storedAdjacencyList && !isExpired) {
                    this._mergeProcessedData({
                        itemHash     : storedItemHash,
                        adjacencyList: storedAdjacencyList
                    });
                    deferred = $.Deferred().resolve();
                } else {
                    deferred = $.getJSON(o.url).done(processPrefetchData);
                }
                return deferred;
                function processPrefetchData(data)
                {
                    var filteredData = o.filter ? o.filter(data) : data, processedData = that._processData(filteredData), itemHash = processedData.itemHash, adjacencyList = processedData.adjacencyList;
                    if (that.storage) {
                        that.storage.set(keys.itemHash, itemHash, o.ttl);
                        that.storage.set(keys.adjacencyList, adjacencyList, o.ttl);
                        that.storage.set(keys.thumbprint, thumbprint, o.ttl);
                        that.storage.set(keys.protocol, utils.getProtocol(), o.ttl);
                    }
                    that._mergeProcessedData(processedData);
                }
            },
            _transformDatum     : function(datum)
            {
                var value = utils.isString(datum) ? datum : datum[this.valueKey], tokens = datum.tokens || utils.tokenizeText(value), item = {
                    value : value,
                    tokens: tokens
                };
                if (utils.isString(datum)) {
                    item.datum = {};
                    item.datum[this.valueKey] = datum;
                } else {
                    item.datum = datum;
                }
                item.tokens = utils.filter(item.tokens, function(token)
                {
                    return !utils.isBlankString(token);
                });
                item.tokens = utils.map(item.tokens, function(token)
                {
                    return token.toLowerCase();
                });
                return item;
            },
            _processData        : function(data)
            {
                var that = this, itemHash = {}, adjacencyList = {};
                utils.each(data, function(i, datum)
                {
                    var item = that._transformDatum(datum), id = utils.getUniqueId(item.value);
                    itemHash[id] = item;
                    utils.each(item.tokens, function(i, token)
                    {
                        var character = token.charAt(0), adjacency = adjacencyList[character] || (adjacencyList[character] = [ id ]);
                        !~utils.indexOf(adjacency, id) && adjacency.push(id);
                    });
                });
                return {
                    itemHash     : itemHash,
                    adjacencyList: adjacencyList
                };
            },
            _mergeProcessedData : function(processedData)
            {
                var that = this;
                utils.mixin(this.itemHash, processedData.itemHash);
                utils.each(processedData.adjacencyList, function(character, adjacency)
                {
                    var masterAdjacency = that.adjacencyList[character];
                    that.adjacencyList[character] = masterAdjacency ? masterAdjacency.concat(adjacency) : adjacency;
                });
            },
            _getLocalSuggestions: function(terms)
            {
                var that = this, firstChars = [], lists = [], shortestList, suggestions = [];
                utils.each(terms, function(i, term)
                {
                    var firstChar = term.charAt(0);
                    !~utils.indexOf(firstChars, firstChar) && firstChars.push(firstChar);
                });
                utils.each(firstChars, function(i, firstChar)
                {
                    var list = that.adjacencyList[firstChar];
                    if (!list) {
                        return false;
                    }
                    lists.push(list);
                    if (!shortestList || list.length < shortestList.length) {
                        shortestList = list;
                    }
                });
                if (lists.length < firstChars.length) {
                    return [];
                }
                utils.each(shortestList, function(i, id)
                {
                    var item = that.itemHash[id], isCandidate, isMatch;
                    isCandidate = utils.every(lists, function(list)
                    {
                        return ~utils.indexOf(list, id);
                    });
                    isMatch = isCandidate && utils.every(terms, function(term)
                    {
                        return utils.some(item.tokens, function(token)
                        {
                            return token.indexOf(term) === 0;
                        });
                    });
                    isMatch && suggestions.push(item);
                });
                return suggestions;
            },
            initialize          : function()
            {
                var deferred;
                this.local && this._processLocalData(this.local);
                this.transport = this.remote ? new Transport(this.remote) : null;
                deferred = this.prefetch ? this._loadPrefetchData(this.prefetch) : $.Deferred().resolve();
                this.local = this.prefetch = this.remote = null;
                this.initialize = function()
                {
                    return deferred;
                };
                return deferred;
            },
            getSuggestions      : function(query, cb)
            {
                var that = this, terms, suggestions, cacheHit = false;
                if (query.length < this.minLength) {
                    return;
                }
                terms = utils.tokenizeQuery(query);
                suggestions = this._getLocalSuggestions(terms).slice(0, this.limit);
                if (suggestions.length < this.limit && this.transport) {
                    cacheHit = this.transport.get(query, processRemoteData);
                }
                !cacheHit && cb && cb(suggestions);
                function processRemoteData(data)
                {
                    suggestions = suggestions.slice(0);
                    utils.each(data, function(i, datum)
                    {
                        var item = that._transformDatum(datum), isDuplicate;
                        isDuplicate = utils.some(suggestions, function(suggestion)
                        {
                            return item.value === suggestion.value;
                        });
                        !isDuplicate && suggestions.push(item);
                        return suggestions.length < that.limit;
                    });
                    cb && cb(suggestions);
                }
            }
        });
        return Dataset;
        function compileTemplate(template, engine, valueKey)
        {
            var renderFn, compiledTemplate;
            if (utils.isFunction(template)) {
                renderFn = template;
            } else if (utils.isString(template)) {
                compiledTemplate = engine.compile(template);
                renderFn = utils.bind(compiledTemplate.render, compiledTemplate);
            } else {
                renderFn = function(context)
                {
                    return "<p>" + context[valueKey] + "</p>";
                };
            }
            return renderFn;
        }
    }();
    var InputView = function()
    {
        function InputView(o)
        {
            var that = this;
            utils.bindAll(this);
            this.specialKeyCodeMap = {
                9 : "tab",
                27: "esc",
                37: "left",
                39: "right",
                13: "enter",
                38: "up",
                40: "down"
            };
            this.$hint = $(o.hint);
            this.$input = $(o.input).on("blur.tt", this._handleBlur).on("focus.tt", this._handleFocus).on("keydown.tt", this._handleSpecialKeyEvent);
            if (!utils.isMsie()) {
                this.$input.on("input.tt", this._compareQueryToInputValue);
            } else {
                this.$input.on("keydown.tt keypress.tt cut.tt paste.tt", function($e)
                {
                    if (that.specialKeyCodeMap[$e.which || $e.keyCode]) {
                        return;
                    }
                    utils.defer(that._compareQueryToInputValue);
                });
            }
            this.query = this.$input.val();
            this.$overflowHelper = buildOverflowHelper(this.$input);
        }

        utils.mixin(InputView.prototype, EventTarget, {
            _handleFocus             : function()
            {
                this.trigger("focused");
            },
            _handleBlur              : function()
            {
                this.trigger("blured");
            },
            _handleSpecialKeyEvent   : function($e)
            {
                var keyName = this.specialKeyCodeMap[$e.which || $e.keyCode];
                keyName && this.trigger(keyName + "Keyed", $e);
            },
            _compareQueryToInputValue: function()
            {
                var inputValue = this.getInputValue(), isSameQuery = compareQueries(this.query, inputValue), isSameQueryExceptWhitespace = isSameQuery ? this.query.length !== inputValue.length : false;
                if (isSameQueryExceptWhitespace) {
                    this.trigger("whitespaceChanged", {
                        value: this.query
                    });
                } else if (!isSameQuery) {
                    this.trigger("queryChanged", {
                        value: this.query = inputValue
                    });
                }
            },
            destroy                  : function()
            {
                this.$hint.off(".tt");
                this.$input.off(".tt");
                this.$hint = this.$input = this.$overflowHelper = null;
            },
            focus                    : function()
            {
                this.$input.focus();
            },
            blur                     : function()
            {
                this.$input.blur();
            },
            getQuery                 : function()
            {
                return this.query;
            },
            setQuery                 : function(query)
            {
                this.query = query;
            },
            getInputValue            : function()
            {
                return this.$input.val();
            },
            setInputValue            : function(value, silent)
            {
                this.$input.val(value);
                !silent && this._compareQueryToInputValue();
            },
            getHintValue             : function()
            {
                return this.$hint.val();
            },
            setHintValue             : function(value)
            {
                this.$hint.val(value);
            },
            getLanguageDirection     : function()
            {
                return (this.$input.css("direction") || "ltr").toLowerCase();
            },
            isOverflow               : function()
            {
                this.$overflowHelper.text(this.getInputValue());
                return this.$overflowHelper.width() > this.$input.width();
            },
            isCursorAtEnd            : function()
            {
                var valueLength = this.$input.val().length, selectionStart = this.$input[0].selectionStart, range;
                if (utils.isNumber(selectionStart)) {
                    return selectionStart === valueLength;
                } else if (document.selection) {
                    range = document.selection.createRange();
                    range.moveStart("character", -valueLength);
                    return valueLength === range.text.length;
                }
                return true;
            }
        });
        return InputView;
        function buildOverflowHelper($input)
        {
            return $("<span></span>").css({
                position     : "absolute",
                left         : "-9999px",
                visibility   : "hidden",
                whiteSpace   : "nowrap",
                fontFamily   : $input.css("font-family"),
                fontSize     : $input.css("font-size"),
                fontStyle    : $input.css("font-style"),
                fontVariant  : $input.css("font-variant"),
                fontWeight   : $input.css("font-weight"),
                wordSpacing  : $input.css("word-spacing"),
                letterSpacing: $input.css("letter-spacing"),
                textIndent   : $input.css("text-indent"),
                textRendering: $input.css("text-rendering"),
                textTransform: $input.css("text-transform")
            }).insertAfter($input);
        }

        function compareQueries(a, b)
        {
            a = (a || "").replace(/^\s*/g, "").replace(/\s{2,}/g, " ");
            b = (b || "").replace(/^\s*/g, "").replace(/\s{2,}/g, " ");
            return a === b;
        }
    }();
    var DropdownView = function()
    {
        var html = {
            suggestionsList: '<span class="tt-suggestions"></span>'
        }, css = {
            suggestionsList: {
                display: "block"
            },
            suggestion     : {
                whiteSpace: "nowrap",
                cursor    : "pointer"
            },
            suggestionChild: {
                whiteSpace: "normal"
            }
        };

        function DropdownView(o)
        {
            utils.bindAll(this);
            this.isOpen = false;
            this.isEmpty = true;
            this.isMouseOverDropdown = false;
            this.$menu = $(o.menu).on("mouseenter.tt", this._handleMouseenter).on("mouseleave.tt", this._handleMouseleave).on("click.tt", ".tt-suggestion", this._handleSelection).on("mouseover.tt", ".tt-suggestion", this._handleMouseover);
        }

        utils.mixin(DropdownView.prototype, EventTarget, {
            _handleMouseenter             : function()
            {
                this.isMouseOverDropdown = true;
            },
            _handleMouseleave             : function()
            {
                this.isMouseOverDropdown = false;
            },
            _handleMouseover              : function($e)
            {
                var $suggestion = $($e.currentTarget);
                this._getSuggestions().removeClass("tt-is-under-cursor");
                $suggestion.addClass("tt-is-under-cursor");
            },
            _handleSelection              : function($e)
            {
                var $suggestion = $($e.currentTarget);
                this.trigger("suggestionSelected", extractSuggestion($suggestion));
            },
            _show                         : function()
            {
                this.$menu.css("display", "block");
            },
            _hide                         : function()
            {
                this.$menu.hide();
            },
            _moveCursor                   : function(increment)
            {
                var $suggestions, $cur, nextIndex, $underCursor;
                if (!this.isVisible()) {
                    return;
                }
                $suggestions = this._getSuggestions();
                $cur = $suggestions.filter(".tt-is-under-cursor");
                $cur.removeClass("tt-is-under-cursor");
                nextIndex = $suggestions.index($cur) + increment;
                nextIndex = (nextIndex + 1) % ($suggestions.length + 1) - 1;
                if (nextIndex === -1) {
                    this.trigger("cursorRemoved");
                    return;
                } else if (nextIndex < -1) {
                    nextIndex = $suggestions.length - 1;
                }
                $underCursor = $suggestions.eq(nextIndex).addClass("tt-is-under-cursor");
                this._ensureVisibility($underCursor);
                this.trigger("cursorMoved", extractSuggestion($underCursor));
            },
            _getSuggestions               : function()
            {
                return this.$menu.find(".tt-suggestions > .tt-suggestion");
            },
            _ensureVisibility             : function($el)
            {
                var menuHeight = this.$menu.height() + parseInt(this.$menu.css("paddingTop"), 10) + parseInt(this.$menu.css("paddingBottom"), 10), menuScrollTop = this.$menu.scrollTop(), elTop = $el.position().top, elBottom = elTop + $el.outerHeight(true);
                if (elTop < 0) {
                    this.$menu.scrollTop(menuScrollTop + elTop);
                } else if (menuHeight < elBottom) {
                    this.$menu.scrollTop(menuScrollTop + (elBottom - menuHeight));
                }
            },
            destroy                       : function()
            {
                this.$menu.off(".tt");
                this.$menu = null;
            },
            isVisible                     : function()
            {
                return this.isOpen && !this.isEmpty;
            },
            closeUnlessMouseIsOverDropdown: function()
            {
                if (!this.isMouseOverDropdown) {
                    this.close();
                }
            },
            close                         : function()
            {
                if (this.isOpen) {
                    this.isOpen = false;
                    this.isMouseOverDropdown = false;
                    this._hide();
                    this.$menu.find(".tt-suggestions > .tt-suggestion").removeClass("tt-is-under-cursor");
                    this.trigger("closed");
                }
            },
            open                          : function()
            {
                if (!this.isOpen) {
                    this.isOpen = true;
                    !this.isEmpty && this._show();
                    this.trigger("opened");
                }
            },
            setLanguageDirection          : function(dir)
            {
                var ltrCss = {
                    left : "0",
                    right: "auto"
                }, rtlCss = {
                    left : "auto",
                    right: " 0"
                };
                dir === "ltr" ? this.$menu.css(ltrCss) : this.$menu.css(rtlCss);
            },
            moveCursorUp                  : function()
            {
                this._moveCursor(-1);
            },
            moveCursorDown                : function()
            {
                this._moveCursor(+1);
            },
            getSuggestionUnderCursor      : function()
            {
                var $suggestion = this._getSuggestions().filter(".tt-is-under-cursor").first();
                return $suggestion.length > 0 ? extractSuggestion($suggestion) : null;
            },
            getFirstSuggestion            : function()
            {
                var $suggestion = this._getSuggestions().first();
                return $suggestion.length > 0 ? extractSuggestion($suggestion) : null;
            },
            renderSuggestions             : function(dataset, suggestions)
            {
                var datasetClassName = "tt-dataset-" + dataset.name, wrapper = '<div class="tt-suggestion">%body</div>', compiledHtml, $suggestionsList, $dataset = this.$menu.find("." + datasetClassName), elBuilder, fragment, $el;
                if ($dataset.length === 0) {
                    $suggestionsList = $(html.suggestionsList).css(css.suggestionsList);
                    $dataset = $("<div></div>").addClass(datasetClassName).append(dataset.header).append($suggestionsList).append(dataset.footer).appendTo(this.$menu);
                }
                if (suggestions.length > 0) {
                    this.isEmpty = false;
                    this.isOpen && this._show();
                    elBuilder = document.createElement("div");
                    fragment = document.createDocumentFragment();
                    utils.each(suggestions, function(i, suggestion)
                    {
                        suggestion.dataset = dataset.name;
                        compiledHtml = dataset.template(suggestion.datum);
                        elBuilder.innerHTML = wrapper.replace("%body", compiledHtml);
                        $el = $(elBuilder.firstChild).css(css.suggestion).data("suggestion", suggestion);
                        $el.children().each(function()
                        {
                            $(this).css(css.suggestionChild);
                        });
                        fragment.appendChild($el[0]);
                    });
                    $dataset.show().find(".tt-suggestions").html(fragment);
                } else {
                    this.clearSuggestions(dataset.name);
                }
                this.trigger("suggestionsRendered");
            },
            clearSuggestions              : function(datasetName)
            {
                var $datasets = datasetName ? this.$menu.find(".tt-dataset-" + datasetName) : this.$menu.find('[class^="tt-dataset-"]'), $suggestions = $datasets.find(".tt-suggestions");
                $datasets.hide();
                $suggestions.empty();
                if (this._getSuggestions().length === 0) {
                    this.isEmpty = true;
                    this._hide();
                }
            }
        });
        return DropdownView;
        function extractSuggestion($el)
        {
            return $el.data("suggestion");
        }
    }();
    var TypeaheadView = function()
    {
        var html = {
            wrapper : '<span class="twitter-typeahead"></span>',
            hint    : '<input class="tt-hint" type="text" autocomplete="off" spellcheck="off" disabled>',
            dropdown: '<span class="tt-dropdown-menu"></span>'
        }, css = {
            wrapper : {
                position: "relative",
                display : "inline-block"
            },
            hint    : {
                position   : "absolute",
                top        : "0",
                left       : "0",
                borderColor: "transparent",
                boxShadow  : "none"
            },
            query   : {
                position       : "relative",
                verticalAlign  : "top",
                backgroundColor: "transparent"
            },
            dropdown: {
                position: "absolute",
                top     : "100%",
                left    : "0",
                zIndex  : "100",
                display : "none"
            }
        };
        if (utils.isMsie()) {
            utils.mixin(css.query, {
                backgroundImage: "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"
            });
        }
        if (utils.isMsie() && utils.isMsie() <= 7) {
            utils.mixin(css.wrapper, {
                display: "inline",
                zoom   : "1"
            });
            utils.mixin(css.query, {
                marginTop: "-1px"
            });
        }
        function TypeaheadView(o)
        {
            var $menu, $input, $hint;
            utils.bindAll(this);
            this.$node = buildDomStructure(o.input);
            this.datasets = o.datasets;
            this.dir = null;
            this.eventBus = o.eventBus;
            $menu = this.$node.find(".tt-dropdown-menu");
            $input = this.$node.find(".tt-query");
            $hint = this.$node.find(".tt-hint");
            this.dropdownView = new DropdownView({
                menu: $menu
            }).on("suggestionSelected", this._handleSelection).on("cursorMoved", this._clearHint).on("cursorMoved", this._setInputValueToSuggestionUnderCursor).on("cursorRemoved", this._setInputValueToQuery).on("cursorRemoved", this._updateHint).on("suggestionsRendered", this._updateHint).on("opened", this._updateHint).on("closed", this._clearHint).on("opened closed", this._propagateEvent);
            this.inputView = new InputView({
                input: $input,
                hint : $hint
            }).on("focused", this._openDropdown).on("blured", this._closeDropdown).on("blured", this._setInputValueToQuery).on("enterKeyed tabKeyed", this._handleSelection).on("queryChanged", this._clearHint).on("queryChanged", this._clearSuggestions).on("queryChanged", this._getSuggestions).on("whitespaceChanged", this._updateHint).on("queryChanged whitespaceChanged", this._openDropdown).on("queryChanged whitespaceChanged", this._setLanguageDirection).on("escKeyed", this._closeDropdown).on("escKeyed", this._setInputValueToQuery).on("tabKeyed upKeyed downKeyed", this._managePreventDefault).on("upKeyed downKeyed", this._moveDropdownCursor).on("upKeyed downKeyed", this._openDropdown).on("tabKeyed leftKeyed rightKeyed", this._autocomplete);
        }

        utils.mixin(TypeaheadView.prototype, EventTarget, {
            _managePreventDefault                : function(e)
            {
                var $e = e.data, hint, inputValue, preventDefault = false;
                switch (e.type) {
                    case "tabKeyed":
                        hint = this.inputView.getHintValue();
                        inputValue = this.inputView.getInputValue();
                        preventDefault = hint && hint !== inputValue;
                        break;

                    case "upKeyed":
                    case "downKeyed":
                        preventDefault = !$e.shiftKey && !$e.ctrlKey && !$e.metaKey;
                        break;
                }
                preventDefault && $e.preventDefault();
            },
            _setLanguageDirection                : function()
            {
                var dir = this.inputView.getLanguageDirection();
                if (dir !== this.dir) {
                    this.dir = dir;
                    this.$node.css("direction", dir);
                    this.dropdownView.setLanguageDirection(dir);
                }
            },
            _updateHint                          : function()
            {
                var suggestion = this.dropdownView.getFirstSuggestion(), hint = suggestion ? suggestion.value : null, dropdownIsVisible = this.dropdownView.isVisible(), inputHasOverflow = this.inputView.isOverflow(), inputValue, query, escapedQuery, beginsWithQuery, match;
                if (hint && dropdownIsVisible && !inputHasOverflow) {
                    inputValue = this.inputView.getInputValue();
                    query = inputValue.replace(/\s{2,}/g, " ").replace(/^\s+/g, "");
                    escapedQuery = utils.escapeRegExChars(query);
                    beginsWithQuery = new RegExp("^(?:" + escapedQuery + ")(.*$)", "i");
                    match = beginsWithQuery.exec(hint);
                    this.inputView.setHintValue(inputValue + (match ? match[1] : ""));
                }
            },
            _clearHint                           : function()
            {
                this.inputView.setHintValue("");
            },
            _clearSuggestions                    : function()
            {
                this.dropdownView.clearSuggestions();
            },
            _setInputValueToQuery                : function()
            {
                this.inputView.setInputValue(this.inputView.getQuery());
            },
            _setInputValueToSuggestionUnderCursor: function(e)
            {
                var suggestion = e.data;
                this.inputView.setInputValue(suggestion.value, true);
            },
            _openDropdown                        : function()
            {
                this.dropdownView.open();
            },
            _closeDropdown                       : function(e)
            {
                this.dropdownView[e.type === "blured" ? "closeUnlessMouseIsOverDropdown" : "close"]();
            },
            _moveDropdownCursor                  : function(e)
            {
                var $e = e.data;
                if (!$e.shiftKey && !$e.ctrlKey && !$e.metaKey) {
                    this.dropdownView[e.type === "upKeyed" ? "moveCursorUp" : "moveCursorDown"]();
                }
            },
            _handleSelection                     : function(e)
            {
                var byClick = e.type === "suggestionSelected", suggestion = byClick ? e.data : this.dropdownView.getSuggestionUnderCursor();
                if (suggestion) {
                    this.inputView.setInputValue(suggestion.value);
                    byClick ? this.inputView.focus() : e.data.preventDefault();
                    byClick && utils.isMsie() ? utils.defer(this.dropdownView.close) : this.dropdownView.close();
                    this.eventBus.trigger("selected", suggestion.datum, suggestion.dataset);
                }
            },
            _getSuggestions                      : function()
            {
                var that = this, query = this.inputView.getQuery();
                if (utils.isBlankString(query)) {
                    return;
                }
                utils.each(this.datasets, function(i, dataset)
                {
                    dataset.getSuggestions(query, function(suggestions)
                    {
                        if (query === that.inputView.getQuery()) {
                            that.dropdownView.renderSuggestions(dataset, suggestions);
                        }
                    });
                });
            },
            _autocomplete                        : function(e)
            {
                var isCursorAtEnd, ignoreEvent, query, hint, suggestion;
                if (e.type === "rightKeyed" || e.type === "leftKeyed") {
                    isCursorAtEnd = this.inputView.isCursorAtEnd();
                    ignoreEvent = this.inputView.getLanguageDirection() === "ltr" ? e.type === "leftKeyed" : e.type === "rightKeyed";
                    if (!isCursorAtEnd || ignoreEvent) {
                        return;
                    }
                }
                query = this.inputView.getQuery();
                hint = this.inputView.getHintValue();
                if (hint !== "" && query !== hint) {
                    suggestion = this.dropdownView.getFirstSuggestion();
                    this.inputView.setInputValue(suggestion.value);
                    this.eventBus.trigger("autocompleted", suggestion.datum, suggestion.dataset);
                }
            },
            _propagateEvent                      : function(e)
            {
                this.eventBus.trigger(e.type);
            },
            destroy                              : function()
            {
                this.inputView.destroy();
                this.dropdownView.destroy();
                destroyDomStructure(this.$node);
                this.$node = null;
            },
            setQuery                             : function(query)
            {
                this.inputView.setQuery(query);
                this.inputView.setInputValue(query);
                this._clearHint();
                this._clearSuggestions();
                this._getSuggestions();
            }
        });
        return TypeaheadView;
        function buildDomStructure(input)
        {
            var $wrapper = $(html.wrapper), $dropdown = $(html.dropdown), $input = $(input), $hint = $(html.hint);
            $wrapper = $wrapper.css(css.wrapper);
            $dropdown = $dropdown.css(css.dropdown);
            $hint.css(css.hint).css({
                backgroundAttachment: $input.css("background-attachment"),
                backgroundClip      : $input.css("background-clip"),
                backgroundColor     : $input.css("background-color"),
                backgroundImage     : $input.css("background-image"),
                backgroundOrigin    : $input.css("background-origin"),
                backgroundPosition  : $input.css("background-position"),
                backgroundRepeat    : $input.css("background-repeat"),
                backgroundSize      : $input.css("background-size")
            });
            $input.data("ttAttrs", {
                dir         : $input.attr("dir"),
                autocomplete: $input.attr("autocomplete"),
                spellcheck  : $input.attr("spellcheck"),
                style       : $input.attr("style")
            });
            $input.addClass("tt-query").attr({
                autocomplete: "off",
                spellcheck  : false
            }).css(css.query);
            try {
                !$input.attr("dir") && $input.attr("dir", "auto");
            } catch (e) {
            }
            return $input.wrap($wrapper).parent().prepend($hint).append($dropdown);
        }

        function destroyDomStructure($node)
        {
            var $input = $node.find(".tt-query");
            utils.each($input.data("ttAttrs"), function(key, val)
            {
                utils.isUndefined(val) ? $input.removeAttr(key) : $input.attr(key, val);
            });
            $input.detach().removeData("ttAttrs").removeClass("tt-query").insertAfter($node);
            $node.remove();
        }
    }();
    (function()
    {
        var cache = {}, viewKey = "ttView", methods;
        methods = {
            initialize: function(datasetDefs)
            {
                var datasets;
                datasetDefs = utils.isArray(datasetDefs) ? datasetDefs : [ datasetDefs ];
                if (datasetDefs.length === 0) {
                    $.error("no datasets provided");
                }
                datasets = utils.map(datasetDefs, function(o)
                {
                    var dataset = cache[o.name] ? cache[o.name] : new Dataset(o);
                    if (o.name) {
                        cache[o.name] = dataset;
                    }
                    return dataset;
                });
                return this.each(initialize);
                function initialize()
                {
                    var $input = $(this), deferreds, eventBus = new EventBus({
                        el: $input
                    });
                    deferreds = utils.map(datasets, function(dataset)
                    {
                        return dataset.initialize();
                    });
                    $input.data(viewKey, new TypeaheadView({
                        input   : $input,
                        eventBus: eventBus = new EventBus({
                            el: $input
                        }),
                        datasets: datasets
                    }));
                    $.when.apply($, deferreds).always(function()
                    {
                        utils.defer(function()
                        {
                            eventBus.trigger("initialized");
                        });
                    });
                }
            },
            destroy   : function()
            {
                return this.each(destroy);
                function destroy()
                {
                    var $this = $(this), view = $this.data(viewKey);
                    if (view) {
                        view.destroy();
                        $this.removeData(viewKey);
                    }
                }
            },
            setQuery  : function(query)
            {
                return this.each(setQuery);
                function setQuery()
                {
                    var view = $(this).data(viewKey);
                    view && view.setQuery(query);
                }
            }
        };
        jQuery.fn.typeahead = function(method)
        {
            if (methods[method]) {
                return methods[method].apply(this, [].slice.call(arguments, 1));
            } else {
                return methods.initialize.apply(this, arguments);
            }
        };
    })();
})(window.jQuery);

/* =============================================================
 * bootstrap-combobox.js v1.1.5
 * =============================================================
 * Copyright 2012 Daniel Farrell
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */

!function($)
{

    "use strict";

    /* COMBOBOX PUBLIC CLASS DEFINITION
     * ================================ */

    var Combobox = function(element, options)
    {
        this.options = $.extend({}, $.fn.combobox.defaults, options);
        this.$source = $(element);
        this.$container = this.setup();
        this.$element = this.$container.find('input[type=text]');
        this.$target = this.$container.find('input[type=hidden]');
        this.$button = this.$container.find('.dropdown-toggle');
        this.$menu = $(this.options.menu).appendTo('body');
        this.matcher = this.options.matcher || this.matcher;
        this.sorter = this.options.sorter || this.sorter;
        this.highlighter = this.options.highlighter || this.highlighter;
        this.shown = false;
        this.selected = false;
        this.refresh();
        this.transferAttributes();
        this.listen();
    };

    Combobox.prototype = {

        constructor          : Combobox, setup: function()
        {
            var combobox = $(this.options.template);
            this.$source.before(combobox);
            this.$source.hide();
            return combobox;
        }, parse             : function()
        {
            var that = this
                , map = {}
                , source = []
                , selected = false
                , selectedValue = '';
            this.$source.find('option').each(function()
            {
                var option = $(this);
                if (option.val() === '') {
                    that.options.placeholder = option.text();
                    return;
                }
                map[option.text()] = option.val();
                source.push(option.text());
                if (option.prop('selected')) {
                    selected = option.text();
                    selectedValue = option.val();
                }
            });
            this.map = map;
            if (selected) {
                this.$element.val(selected);
                this.$target.val(selectedValue);
                this.$container.addClass('combobox-selected');
                this.selected = true;
            }
            return source;
        }, transferAttributes: function()
        {
            this.options.placeholder = this.$source.attr('data-placeholder') || this.options.placeholder;
            this.$element.attr('placeholder', this.options.placeholder);
            this.$target.prop('name', this.$source.prop('name'));
            this.$target.val(this.$source.val());
            this.$source.removeAttr('name');  // Remove from source otherwise form will pass parameter twice.
            this.$element.attr('required', this.$source.attr('required'));
            this.$element.attr('rel', this.$source.attr('rel'));
            this.$element.attr('title', this.$source.attr('title'));
            this.$element.attr('class', this.$source.attr('class'));
            this.$element.attr('tabindex', this.$source.attr('tabindex'));
            this.$source.removeAttr('tabindex');
        }, select            : function()
        {
            var val = this.$menu.find('.active').attr('data-value');
            this.$element.val(this.updater(val)).trigger('change');
            this.$target.val(this.map[val]).trigger('change');
            this.$source.val(this.map[val]).trigger('change');
            this.$container.addClass('combobox-selected');
            this.selected = true;
            return this.hide();
        }, updater           : function(item)
        {
            return item;
        }, show              : function()
        {
            var pos = $.extend({}, this.$element.position(), {
                height: this.$element[0].offsetHeight
            });

            this.$menu
                .insertAfter(this.$element)
                .css({
                    top: pos.top + pos.height, left: pos.left
                })
                .show();

            this.shown = true;
            return this;
        }, hide              : function()
        {
            this.$menu.hide();
            this.shown = false;
            return this;
        }, lookup            : function(event)
        {
            this.query = this.$element.val();
            return this.process(this.source);
        }, process           : function(items)
        {
            var that = this;

            items = $.grep(items, function(item)
            {
                return that.matcher(item);
            });

            items = this.sorter(items);

            if (!items.length) {
                return this.shown ? this.hide() : this;
            }

            return this.render(items.slice(0, this.options.items)).show();
        }, matcher           : function(item)
        {
            return ~item.toLowerCase().indexOf(this.query.toLowerCase());
        }, sorter            : function(items)
        {
            var beginswith = []
                , caseSensitive = []
                , caseInsensitive = []
                , item;

            while (item = items.shift()) {
                if (!item.toLowerCase().indexOf(this.query.toLowerCase())) {
                    beginswith.push(item);
                }
                else if (~item.indexOf(this.query)) {
                    caseSensitive.push(item);
                }
                else {
                    caseInsensitive.push(item);
                }
            }

            return beginswith.concat(caseSensitive, caseInsensitive);
        }, highlighter       : function(item)
        {
            var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
            return item.replace(new RegExp('(' + query + ')', 'ig'), function($1, match)
            {
                return '<strong>' + match + '</strong>';
            })
        }, render            : function(items)
        {
            var that = this;

            items = $(items).map(function(i, item)
            {
                i = $(that.options.item).attr('data-value', item);
                i.find('a').html(that.highlighter(item));
                return i[0];
            });

            items.first().addClass('active');
            this.$menu.html(items);
            return this;
        }, next              : function(event)
        {
            var active = this.$menu.find('.active').removeClass('active')
                , next = active.next();

            if (!next.length) {
                next = $(this.$menu.find('li')[0]);
            }

            next.addClass('active');
        }, prev              : function(event)
        {
            var active = this.$menu.find('.active').removeClass('active')
                , prev = active.prev();

            if (!prev.length) {
                prev = this.$menu.find('li').last();
            }

            prev.addClass('active');
        }, toggle            : function()
        {
            if (this.$container.hasClass('combobox-selected')) {
                this.clearTarget();
                this.triggerChange();
                this.clearElement();
            } else {
                if (this.shown) {
                    this.hide();
                } else {
                    this.clearElement();
                    this.lookup();
                }
            }
        }, clearElement      : function()
        {
            this.$element.val('').focus();
        }, clearTarget       : function()
        {
            this.$source.val('');
            this.$target.val('');
            this.$container.removeClass('combobox-selected');
            this.selected = false;
        }, triggerChange     : function()
        {
            this.$source.trigger('change');
        }, refresh           : function()
        {
            this.source = this.parse();
            this.options.items = this.source.length;
        }, listen            : function()
        {
            this.$element
                .on('focus', $.proxy(this.focus, this))
                .on('blur', $.proxy(this.blur, this))
                .on('keypress', $.proxy(this.keypress, this))
                .on('keyup', $.proxy(this.keyup, this));

            if (this.eventSupported('keydown')) {
                this.$element.on('keydown', $.proxy(this.keydown, this));
            }

            this.$menu
                .on('click', $.proxy(this.click, this))
                .on('mouseenter', 'li', $.proxy(this.mouseenter, this))
                .on('mouseleave', 'li', $.proxy(this.mouseleave, this));

            this.$button
                .on('click', $.proxy(this.toggle, this));
        }, eventSupported    : function(eventName)
        {
            var isSupported = eventName in this.$element;
            if (!isSupported) {
                this.$element.setAttribute(eventName, 'return;');
                isSupported = typeof this.$element[eventName] === 'function';
            }
            return isSupported;
        }, move              : function(e)
        {
            if (!this.shown) {
                return;
            }

            switch (e.keyCode) {
                case 9: // tab
                case 13: // enter
                case 27: // escape
                    e.preventDefault();
                    break;

                case 38: // up arrow
                    e.preventDefault();
                    this.prev();
                    break;

                case 40: // down arrow
                    e.preventDefault();
                    this.next();
                    break;
            }

            e.stopPropagation();
        }, keydown           : function(e)
        {
            this.suppressKeyPressRepeat = ~$.inArray(e.keyCode, [40, 38, 9, 13, 27]);
            this.move(e);
        }, keypress          : function(e)
        {
            if (this.suppressKeyPressRepeat) {
                return;
            }
            this.move(e);
        }, keyup             : function(e)
        {
            switch (e.keyCode) {
                case 40: // down arrow
                case 39: // right arrow
                case 38: // up arrow
                case 37: // left arrow
                case 36: // home
                case 35: // end
                case 16: // shift
                case 17: // ctrl
                case 18: // alt
                    break;

                case 9: // tab
                case 13: // enter
                    if (!this.shown) {
                        return;
                    }
                    this.select();
                    break;

                case 27: // escape
                    if (!this.shown) {
                        return;
                    }
                    this.hide();
                    break;

                default:
                    this.clearTarget();
                    this.lookup();
            }

            e.stopPropagation();
            e.preventDefault();
        }, focus             : function(e)
        {
            this.focused = true;
        }, blur              : function(e)
        {
            var that = this;
            this.focused = false;
            var val = this.$element.val();
            if (!this.selected && val !== '') {
                this.$element.val('');
                this.$source.val('').trigger('change');
                this.$target.val('').trigger('change');
            }
            if (!this.mousedover && this.shown) {
                setTimeout(function()
                {
                    that.hide();
                }, 200);
            }
        }, click             : function(e)
        {
            e.stopPropagation();
            e.preventDefault();
            this.select();
            this.$element.focus();
        }, mouseenter        : function(e)
        {
            this.mousedover = true;
            this.$menu.find('.active').removeClass('active');
            $(e.currentTarget).addClass('active');
        }, mouseleave        : function(e)
        {
            this.mousedover = false;
        }
    };

    /* COMBOBOX PLUGIN DEFINITION
     * =========================== */

    $.fn.combobox = function(option)
    {
        return this.each(function()
        {
            var $this = $(this)
                , data = $this.data('combobox')
                , options = typeof option == 'object' && option;
            if (!data) {
                $this.data('combobox', (data = new Combobox(this, options)));
            }
            if (typeof option == 'string') {
                data[option]();
            }
        });
    };

    $.fn.combobox.defaults = {
        template: '<div class="combobox-container">' +
            '<input type="hidden" />' +
            '<div class="input-group">' +
            '   <input type="text" autocomplete="off" class="form-control" />' +
            '   <span class="input-group-addon btn btn-default glyphicon glyphicon- dropdown-toggle" data-dropdown="dropdown">' +
            '       <span class="caret"/>' +
            '       <span class="combobox-clear">' +
            '           <i class="glyphicon glyphicon-remove"/>' +
            '       </span>' +
            '   </span>' +
            '</div>' +
            '</div>',
        menu    : '<ul class="typeahead typeahead-long dropdown-menu"></ul>',
        item    : '<li><a href="#"></a></li>'
    };

    $.fn.combobox.Constructor = Combobox;

}(window.jQuery);

/* =========================================================
 * bootstrap-datepicker.js
 * http://www.eyecon.ro/bootstrap-datepicker
 * =========================================================
 * Copyright 2012 Stefan Petre
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */

!function($)
{

    // Picker object

    var Datepicker = function(element, options)
    {
        this.element = $(element);
        this.format = DPGlobal.parseFormat(options.format || this.element.data('date-format') || 'mm/dd/yyyy');
        this.picker = $(DPGlobal.template)
            .appendTo('body')
            .on({
                click: $.proxy(this.click, this)
                //,mousedown: $.proxy(this.mousedown, this)
            });
        this.isInput = this.element.is('input');
        this.component = this.element.is('.date') ? this.element.find('.input-group-addon') : false;

        if (this.isInput) {
            this.element.on({
                focus: $.proxy(this.show, this),
                //blur: $.proxy(this.hide, this),
                keyup: $.proxy(this.update, this)
            });
        } else {
            if (this.component) {
                this.component.on('click', $.proxy(this.show, this));
            } else {
                this.element.on('click', $.proxy(this.show, this));
            }
        }

        this.minViewMode = options.minViewMode || this.element.data('date-minviewmode') || 0;
        if (typeof this.minViewMode === 'string') {
            switch (this.minViewMode) {
                case 'months':
                    this.minViewMode = 1;
                    break;
                case 'years':
                    this.minViewMode = 2;
                    break;
                default:
                    this.minViewMode = 0;
                    break;
            }
        }
        this.viewMode = options.viewMode || this.element.data('date-viewmode') || 0;
        if (typeof this.viewMode === 'string') {
            switch (this.viewMode) {
                case 'months':
                    this.viewMode = 1;
                    break;
                case 'years':
                    this.viewMode = 2;
                    break;
                default:
                    this.viewMode = 0;
                    break;
            }
        }
        this.startViewMode = this.viewMode;
        this.weekStart = options.weekStart || this.element.data('date-weekstart') || 0;
        this.weekEnd = this.weekStart === 0 ? 6 : this.weekStart - 1;
        this.onRender = options.onRender;
        this.fillDow();
        this.fillMonths();
        this.update();
        this.showMode();
    };

    Datepicker.prototype = {
        constructor: Datepicker,

        show: function(e)
        {
            this.picker.show();
            this.height = this.component ? this.component.outerHeight() : this.element.outerHeight();
            this.place();
            $(window).on('resize', $.proxy(this.place, this));
            if (e) {
                e.stopPropagation();
                e.preventDefault();
            }
            if (!this.isInput) {
            }
            var that = this;
            $(document).on('mousedown', function(ev)
            {
                if ($(ev.target).closest('.datepicker').length == 0) {
                    that.hide();
                }
            });
            this.element.trigger({
                type: 'show',
                date: this.date
            });
        },

        hide: function()
        {
            this.picker.hide();
            $(window).off('resize', this.place);
            this.viewMode = this.startViewMode;
            this.showMode();
            if (!this.isInput) {
                $(document).off('mousedown', this.hide);
            }
            //this.set();
            this.element.trigger({
                type: 'hide',
                date: this.date
            });
        },

        set: function()
        {
            var formated = DPGlobal.formatDate(this.date, this.format);
            if (!this.isInput) {
                if (this.component) {
                    this.element.find('input').prop('value', formated);
                }
                this.element.data('date', formated);
            } else {
                this.element.prop('value', formated);
            }
            this.hide();
            //alert('set:' + formated);
        },

        setValue: function(newDate)
        {
            if (typeof newDate === 'string') {
                this.date = DPGlobal.parseDate(newDate, this.format);
            } else {
                this.date = new Date(newDate);
            }
            this.set();
            this.viewDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1, 0, 0, 0, 0);
            this.fill();
            alert(newDate);
        },

        place: function()
        {
            var offset = this.component ? this.component.offset() : this.element.offset();
            this.picker.css({
                top : offset.top + this.height,
                left: offset.left
            });
        },

        update: function(newDate)
        {
            this.date = DPGlobal.parseDate(
                typeof newDate === 'string' ? newDate : (this.isInput ? this.element.prop('value') : this.element.data('date')),
                this.format
            );
            this.viewDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1, 0, 0, 0, 0);
            this.fill();
            //alert('update:' + newDate);
        },

        fillDow: function()
        {
            var dowCnt = this.weekStart;
            var html = '<tr>';
            while (dowCnt < this.weekStart + 7) {
                html += '<th class="dow">' + DPGlobal.dates.daysMin[(dowCnt++) % 7] + '</th>';
            }
            html += '</tr>';
            this.picker.find('.datepicker-days thead').append(html);
        },

        fillMonths: function()
        {
            var html = '';
            var i = 0;
            while (i < 12) {
                html += '<span class="month">' + DPGlobal.dates.monthsShort[i++] + '</span>';
            }
            this.picker.find('.datepicker-months td').append(html);
        },

        fill: function()
        {
            var d = new Date(this.viewDate),
                year = d.getFullYear(),
                month = d.getMonth(),
                currentDate = this.date.valueOf();
            this.picker.find('.datepicker-days th:eq(1)')
                .text(DPGlobal.dates.months[month] + ' ' + year);
            var prevMonth = new Date(year, month - 1, 28, 0, 0, 0, 0),
                day = DPGlobal.getDaysInMonth(prevMonth.getFullYear(), prevMonth.getMonth());
            prevMonth.setDate(day);
            prevMonth.setDate(day - (prevMonth.getDay() - this.weekStart + 7) % 7);
            var nextMonth = new Date(prevMonth);
            nextMonth.setDate(nextMonth.getDate() + 42);
            nextMonth = nextMonth.valueOf();
            var html = [];
            var clsName,
                prevY,
                prevM;
            while (prevMonth.valueOf() < nextMonth) {
                if (prevMonth.getDay() === this.weekStart) {
                    html.push('<tr>');
                }
                clsName = this.onRender(prevMonth);
                prevY = prevMonth.getFullYear();
                prevM = prevMonth.getMonth();
                if ((prevM < month && prevY === year) || prevY < year) {
                    clsName += ' old';
                } else if ((prevM > month && prevY === year) || prevY > year) {
                    clsName += ' new';
                }
                if (prevMonth.valueOf() === currentDate) {
                    clsName += ' active';
                }
                html.push('<td class="day ' + clsName + '">' + prevMonth.getDate() + '</td>');
                if (prevMonth.getDay() === this.weekEnd) {
                    html.push('</tr>');
                }
                prevMonth.setDate(prevMonth.getDate() + 1);
            }
            this.picker.find('.datepicker-days tbody').empty().append(html.join(''));
            var currentYear = this.date.getFullYear();

            var months = this.picker.find('.datepicker-months')
                .find('th:eq(1)')
                .text(year)
                .end()
                .find('span').removeClass('active');
            if (currentYear === year) {
                months.eq(this.date.getMonth()).addClass('active');
            }

            html = '';
            year = parseInt(year / 10, 10) * 10;
            var yearCont = this.picker.find('.datepicker-years')
                .find('th:eq(1)')
                .text(year + '-' + (year + 9))
                .end()
                .find('td');
            year -= 1;
            for (var i = -1; i < 11; i++) {
                html += '<span class="year' + (i === -1 || i === 10 ? ' old' : '') + (currentYear === year ? ' active' : '') + '">' + year + '</span>';
                year += 1;
            }
            yearCont.html(html);
        },

        click: function(e)
        {
            e.stopPropagation();
            e.preventDefault();
            var target = $(e.target).closest('span, td, th');
            if (target.length === 1) {
                switch (target[0].nodeName.toLowerCase()) {
                    case 'th':
                        switch (target[0].className) {
                            case 'switch':
                                this.showMode(1);
                                break;
                            case 'prev':
                            case 'next':
                                this.viewDate['set' + DPGlobal.modes[this.viewMode].navFnc].call(
                                    this.viewDate,
                                    this.viewDate['get' + DPGlobal.modes[this.viewMode].navFnc].call(this.viewDate) +
                                        DPGlobal.modes[this.viewMode].navStep * (target[0].className === 'prev' ? -1 : 1)
                                );
                                this.fill();
                                //this.set();
                                break;
                        }
                        break;
                    case 'span':
                        if (target.is('.month')) {
                            month = target.parent().find('span').index(target);
                            this.viewDate.setMonth(month);
                        } else {
                            year = parseInt(target.text(), 10) || 0;
                            this.viewDate.setFullYear(year);
                        }
                        if (this.viewMode !== 0) {
                            this.date = new Date(this.viewDate);
                            this.element.trigger({
                                type    : 'changeDate',
                                date    : this.date,
                                viewMode: DPGlobal.modes[this.viewMode].clsName
                            });
                        }
                        this.showMode(-1);
                        this.fill();
                        //this.set();
                        break;
                    case 'td':
                        if (target.is('.day') && !target.is('.disabled')) {
                            var day = parseInt(target.text(), 10) || 1;
                            var month = this.viewDate.getMonth();
                            if (target.is('.old')) {
                                month -= 1;
                            } else if (target.is('.new')) {
                                month += 1;
                            }
                            var year = this.viewDate.getFullYear();
                            this.date = new Date(year, month, day, 0, 0, 0, 0);
                            this.viewDate = new Date(year, month, Math.min(28, day), 0, 0, 0, 0);
                            this.fill();
                            this.set();
                            this.element.trigger({
                                type    : 'changeDate',
                                date    : this.date,
                                viewMode: DPGlobal.modes[this.viewMode].clsName
                            });
                        }
                        break;
                }
            }
        },

        mousedown: function(e)
        {
            alert('mouse down');
            e.stopPropagation();
            e.preventDefault();
        },

        showMode: function(dir)
        {
            if (dir) {
                this.viewMode = Math.max(this.minViewMode, Math.min(2, this.viewMode + dir));
            }
            this.picker.find('>div').hide().filter('.datepicker-' + DPGlobal.modes[this.viewMode].clsName).show();
        }
    };

    $.fn.datepicker = function(option, val)
    {
        return this.each(function()
        {
            var $this = $(this),
                data = $this.data('datepicker'),
                options = typeof option === 'object' && option;
            if (!data) {
                $this.data('datepicker', (data = new Datepicker(this, $.extend({}, $.fn.datepicker.defaults, options))));
            }
            if (typeof option === 'string') {
                data[option](val);
            }
        });
    };

    $.fn.datepicker.defaults = {
        onRender: function(date)
        {
            return '';
        }
    };
    $.fn.datepicker.Constructor = Datepicker;

    var DPGlobal = {
        modes         : [
            {
                clsName: 'days',
                navFnc : 'Month',
                navStep: 1
            },
            {
                clsName: 'months',
                navFnc : 'FullYear',
                navStep: 1
            },
            {
                clsName: 'years',
                navFnc : 'FullYear',
                navStep: 10
            }
        ],
        dates         : {
            days       : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            daysShort  : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            daysMin    : ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
            months     : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        },
        isLeapYear    : function(year)
        {
            return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0))
        },
        getDaysInMonth: function(year, month)
        {
            return [31, (DPGlobal.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]
        },
        parseFormat   : function(format)
        {
            var separator = format.match(/[.\/\-\s].*?/),
                parts = format.split(/\W+/);
            if (!separator || !parts || parts.length === 0) {
                throw new Error("Invalid date format.");
            }
            return {separator: separator, parts: parts};
        },
        parseDate     : function(date, format)
        {
            var parts = date.split(format.separator), val;
            date = new Date();

            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);
            if (parts.length === format.parts.length) {
                var year = date.getFullYear(), day = date.getDate(), month = date.getMonth();
                for (var i = 0, cnt = format.parts.length; i < cnt; i++) {
                    val = parseInt(parts[i], 10) || 1;
                    switch (format.parts[i]) {
                        case 'dd':
                        case 'd':
                            day = val;
                            date.setDate(val);
                            break;
                        case 'mm':
                        case 'm':
                            month = val - 1;
                            date.setMonth(val - 1);
                            break;
                        case 'yy':
                            year = 2000 + val;
                            date.setFullYear(2000 + val);
                            break;
                        case 'yyyy':
                            year = val;
                            date.setFullYear(val);
                            break;
                    }
                }
                date = new Date(year, month, day, 0, 0, 0);
            }
            return date;
        },
        formatDate    : function(date, format)
        {
            var val = {
                d   : date.getDate(),
                m   : date.getMonth() + 1,
                yy  : date.getFullYear().toString().substring(2),
                yyyy: date.getFullYear()
            };
            val.dd = (val.d < 10 ? '0' : '') + val.d;
            val.mm = (val.m < 10 ? '0' : '') + val.m;
            date = [];
            for (var i = 0, cnt = format.parts.length; i < cnt; i++) {
                date.push(val[format.parts[i]]);
            }
            return date.join(format.separator);
        },
        headTemplate  : '<thead>' +
            '<tr>' +
            '<th class="prev">&lsaquo;</th>' +
            '<th colspan="5" class="switch"></th>' +
            '<th class="next">&rsaquo;</th>' +
            '</tr>' +
            '</thead>',
        contTemplate  : '<tbody><tr><td colspan="7"></td></tr></tbody>'
    };
    DPGlobal.template = '<div class="datepicker dropdown-menu">' +
        '<div class="datepicker-days">' +
        '<table class=" table-condensed">' +
        DPGlobal.headTemplate +
        '<tbody></tbody>' +
        '</table>' +
        '</div>' +
        '<div class="datepicker-months">' +
        '<table class="table-condensed">' +
        DPGlobal.headTemplate +
        DPGlobal.contTemplate +
        '</table>' +
        '</div>' +
        '<div class="datepicker-years">' +
        '<table class="table-condensed">' +
        DPGlobal.headTemplate +
        DPGlobal.contTemplate +
        '</table>' +
        '</div>' +
        '</div>';

}(window.jQuery);

﻿/* =========================================================
 * bootstrap-datetimepicker.js
 * =========================================================
 * Copyright 2012 Stefan Petre
 * Improvements by Andrew Rowls
 * Improvements by Sébastien Malot
 * Project URL : http://www.malot.fr/bootstrap-datetimepicker
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */

!function($)
{

    function UTCDate()
    {
        return new Date(Date.UTC.apply(Date, arguments));
    }

    function UTCToday()
    {
        var today = new Date();
        return UTCDate(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), today.getUTCHours(), today.getUTCMinutes(), today.getUTCSeconds(), 0);
    }

    // Picker object

    var Datetimepicker = function(element, options)
    {
        var that = this;

        this.element = $(element);
        this.language = options.language || this.element.data('date-language') || "en";
        this.language = this.language in dates ? this.language : "en";
        this.isRTL = dates[this.language].rtl || false;
        this.formatType = options.formatType || this.element.data('format-type') || 'standard';
        this.format = DPGlobal.parseFormat(options.format || this.element.data('date-format') || DPGlobal.getDefaultFormat(this.formatType, 'input'), this.formatType);
        this.isInline = false;
        this.isVisible = false;
        this.isInput = this.element.is('input');
        this.component = this.element.is('.date') ? this.element.find('.input-group-addon .glyphicon-th, .input-group-addon .glyphicon-time, .input-group-addon .glyphicon-calendar').parent() : false;
        this.componentReset = this.element.is('.date') ? this.element.find('.input-group-addon .glyphicon-remove').parent() : false;
        this.hasInput = this.component && this.element.find('input').length;
        if (this.component && this.component.length === 0) {
            this.component = false;
        }
        this.linkField = options.linkField || this.element.data('link-field') || false;
        this.linkFormat = DPGlobal.parseFormat(options.linkFormat || this.element.data('link-format') || DPGlobal.getDefaultFormat(this.formatType, 'link'), this.formatType);
        this.minuteStep = options.minuteStep || this.element.data('minute-step') || 5;
        this.pickerPosition = options.pickerPosition || this.element.data('picker-position') || 'bottom-right';
        this.showMeridian = options.showMeridian || this.element.data('show-meridian') || false;
        this.initialDate = options.initialDate || new Date();

        this._attachEvents();

        this.formatViewType = "datetime";
        if ('formatViewType' in options) {
            this.formatViewType = options.formatViewType;
        } else if ('formatViewType' in this.element.data()) {
            this.formatViewType = this.element.data('formatViewType');
        }

        this.minView = 0;
        if ('minView' in options) {
            this.minView = options.minView;
        } else if ('minView' in this.element.data()) {
            this.minView = this.element.data('min-view');
        }
        this.minView = DPGlobal.convertViewMode(this.minView);

        this.maxView = DPGlobal.modes.length - 1;
        if ('maxView' in options) {
            this.maxView = options.maxView;
        } else if ('maxView' in this.element.data()) {
            this.maxView = this.element.data('max-view');
        }
        this.maxView = DPGlobal.convertViewMode(this.maxView);

        this.startViewMode = 2;
        if ('startView' in options) {
            this.startViewMode = options.startView;
        } else if ('startView' in this.element.data()) {
            this.startViewMode = this.element.data('start-view');
        }
        this.startViewMode = DPGlobal.convertViewMode(this.startViewMode);
        this.viewMode = this.startViewMode;

        this.viewSelect = this.minView;
        if ('viewSelect' in options) {
            this.viewSelect = options.viewSelect;
        } else if ('viewSelect' in this.element.data()) {
            this.viewSelect = this.element.data('view-select');
        }
        this.viewSelect = DPGlobal.convertViewMode(this.viewSelect);

        this.forceParse = true;
        if ('forceParse' in options) {
            this.forceParse = options.forceParse;
        } else if ('dateForceParse' in this.element.data()) {
            this.forceParse = this.element.data('date-force-parse');
        }

        this.picker = $(DPGlobal.template)
            .appendTo(this.isInline ? this.element : 'body')
            .on({
                click    : $.proxy(this.click, this),
                mousedown: $.proxy(this.mousedown, this)
            });

        if (this.isInline) {
            this.picker.addClass('datetimepicker-inline');
        } else {
            this.picker.addClass('datetimepicker-dropdown-' + this.pickerPosition + ' dropdown-menu');
        }
        if (this.isRTL) {
            this.picker.addClass('datetimepicker-rtl');
            this.picker.find('.prev i, .next i')
                .toggleClass('glyphicon-arrow-left glyphicon-arrow-right');
        }
        $(document).on('mousedown', function(e)
        {
            // Clicked outside the datetimepicker, hide it
            if ($(e.target).closest('.datetimepicker').length === 0) {
                that.hide();
            }
        });

        this.autoclose = false;
        if ('autoclose' in options) {
            this.autoclose = options.autoclose;
        } else if ('dateAutoclose' in this.element.data()) {
            this.autoclose = this.element.data('date-autoclose');
        }

        this.keyboardNavigation = true;
        if ('keyboardNavigation' in options) {
            this.keyboardNavigation = options.keyboardNavigation;
        } else if ('dateKeyboardNavigation' in this.element.data()) {
            this.keyboardNavigation = this.element.data('date-keyboard-navigation');
        }

        this.todayBtn = (options.todayBtn || this.element.data('date-today-btn') || false);
        this.todayHighlight = (options.todayHighlight || this.element.data('date-today-highlight') || false);

        this.weekStart = ((options.weekStart || this.element.data('date-weekstart') || dates[this.language].weekStart || 0) % 7);
        this.weekEnd = ((this.weekStart + 6) % 7);
        this.startDate = -Infinity;
        this.endDate = Infinity;
        this.daysOfWeekDisabled = [];
        this.setStartDate(options.startDate || this.element.data('date-startdate'));
        this.setEndDate(options.endDate || this.element.data('date-enddate'));
        this.setDaysOfWeekDisabled(options.daysOfWeekDisabled || this.element.data('date-days-of-week-disabled'));
        this.fillDow();
        this.fillMonths();
        this.update();
        this.showMode();

        if (this.isInline) {
            this.show();
        }
    };

    Datetimepicker.prototype = {
        constructor: Datetimepicker,

        _events      : [],
        _attachEvents: function()
        {
            this._detachEvents();
            if (this.isInput) { // single input
                this._events = [
                    [this.element, {
                        focus  : $.proxy(this.show, this),
                        keyup  : $.proxy(this.update, this),
                        keydown: $.proxy(this.keydown, this)
                    }]
                ];
            }
            else if (this.component && this.hasInput) { // component: input + button
                this._events = [
                    // For components that are not readonly, allow keyboard nav
                    [this.element.find('input'), {
                        focus  : $.proxy(this.show, this),
                        keyup  : $.proxy(this.update, this),
                        keydown: $.proxy(this.keydown, this)
                    }],
                    [this.component, {
                        click: $.proxy(this.show, this)
                    }]
                ];
                if (this.componentReset) {
                    this._events.push([
                        this.componentReset,
                        {click: $.proxy(this.reset, this)}
                    ]);
                }
            }
            else if (this.element.is('div')) {  // inline datetimepicker
                this.isInline = true;
            }
            else {
                this._events = [
                    [this.element, {
                        click: $.proxy(this.show, this)
                    }]
                ];
            }
            for (var i = 0, el, ev; i < this._events.length; i++) {
                el = this._events[i][0];
                ev = this._events[i][1];
                el.on(ev);
            }
        },

        _detachEvents: function()
        {
            for (var i = 0, el, ev; i < this._events.length; i++) {
                el = this._events[i][0];
                ev = this._events[i][1];
                el.off(ev);
            }
            this._events = [];
        },

        show: function(e)
        {
            this.picker.show();
            this.height = this.component ? this.component.outerHeight() : this.element.outerHeight();
            if (this.forceParse) {
                this.update();
            }
            this.place();
            $(window).on('resize', $.proxy(this.place, this));
            if (e) {
                e.stopPropagation();
                e.preventDefault();
            }
            this.isVisible = true;
            this.element.trigger({
                type: 'show',
                date: this.date
            });
        },

        hide: function(e)
        {
            if (!this.isVisible) {
                return;
            }
            if (this.isInline) {
                return;
            }
            this.picker.hide();
            $(window).off('resize', this.place);
            this.viewMode = this.startViewMode;
            this.showMode();
            if (!this.isInput) {
                $(document).off('mousedown', this.hide);
            }

            if (
                this.forceParse &&
                    (
                        this.isInput && this.element.val() ||
                            this.hasInput && this.element.find('input').val()
                        )
                ) {
                this.setValue();
            }
            this.isVisible = false;
            this.element.trigger({
                type: 'hide',
                date: this.date
            });
        },

        remove: function()
        {
            this._detachEvents();
            this.picker.remove();
            delete this.element.data().datetimepicker;
        },

        getDate: function()
        {
            var d = this.getUTCDate();
            return new Date(d.getTime() + (d.getTimezoneOffset() * 60000));
        },

        getUTCDate: function()
        {
            return this.date;
        },

        setDate: function(d)
        {
            this.setUTCDate(new Date(d.getTime() - (d.getTimezoneOffset() * 60000)));
        },

        setUTCDate: function(d)
        {
            if (d >= this.startDate && d <= this.endDate) {
                this.date = d;
                this.setValue();
                this.viewDate = this.date;
                this.fill();
            } else {
                this.element.trigger({
                    type     : 'outOfRange',
                    date     : d,
                    startDate: this.startDate,
                    endDate  : this.endDate
                });
            }
        },

        setFormat: function(format)
        {
            this.format = DPGlobal.parseFormat(format, this.formatType);
            var element;
            if (this.isInput) {
                element = this.element;
            } else if (this.component) {
                element = this.element.find('input');
            }
            if (element && element.val()) {
                this.setValue();
            }
        },

        setValue: function()
        {
            var formatted = this.getFormattedDate();
            if (!this.isInput) {
                if (this.component) {
                    this.element.find('input').val(formatted);
                }
                this.element.data('date', formatted);
            } else {
                this.element.val(formatted);
            }
            if (this.linkField) {
                $('#' + this.linkField).val(this.getFormattedDate(this.linkFormat));
            }
        },

        getFormattedDate: function(format)
        {
            if (format == undefined) {
                format = this.format;
            }
            return DPGlobal.formatDate(this.date, format, this.language, this.formatType);
        },

        setStartDate: function(startDate)
        {
            this.startDate = startDate || -Infinity;
            if (this.startDate !== -Infinity) {
                this.startDate = DPGlobal.parseDate(this.startDate, this.format, this.language, this.formatType);
            }
            this.update();
            this.updateNavArrows();
        },

        setEndDate: function(endDate)
        {
            this.endDate = endDate || Infinity;
            if (this.endDate !== Infinity) {
                this.endDate = DPGlobal.parseDate(this.endDate, this.format, this.language, this.formatType);
            }
            this.update();
            this.updateNavArrows();
        },

        setDaysOfWeekDisabled: function(daysOfWeekDisabled)
        {
            this.daysOfWeekDisabled = daysOfWeekDisabled || [];
            if (!$.isArray(this.daysOfWeekDisabled)) {
                this.daysOfWeekDisabled = this.daysOfWeekDisabled.split(/,\s*/);
            }
            this.daysOfWeekDisabled = $.map(this.daysOfWeekDisabled, function(d)
            {
                return parseInt(d, 10);
            });
            this.update();
            this.updateNavArrows();
        },

        place: function()
        {
            if (this.isInline) {
                return;
            }
            var zIndex = parseInt(this.element.parents().filter(function()
            {
                return $(this).css('z-index') != 'auto';
            }).first().css('z-index')) + 10;
            var offset, top, left;
            if (this.component) {
                offset = this.component.offset();
                left = offset.left;
                if (this.pickerPosition == 'bottom-left' || this.pickerPosition == 'top-left') {
                    left += this.component.outerWidth() - this.picker.outerWidth();
                }
            } else {
                offset = this.element.offset();
                left = offset.left;
            }
            if (this.pickerPosition == 'top-left' || this.pickerPosition == 'top-right') {
                top = offset.top - this.picker.outerHeight();
            } else {
                top = offset.top + this.height;
            }
            this.picker.css({
                top   : top,
                left  : left,
                zIndex: zIndex
            });
        },

        update: function()
        {
            var date, fromArgs = false;
            if (arguments && arguments.length && (typeof arguments[0] === 'string' || arguments[0] instanceof Date)) {
                date = arguments[0];
                fromArgs = true;
            } else {
                date = this.element.data('date') || (this.isInput ? this.element.val() : this.element.find('input').val()) || this.initialDate;
            }

            if (!date) {
                date = new Date();
                fromArgs = false;
            }

            this.date = DPGlobal.parseDate(date, this.format, this.language, this.formatType);

            if (fromArgs) {
                this.setValue();
            }

            if (this.date < this.startDate) {
                this.viewDate = new Date(this.startDate);
            } else if (this.date > this.endDate) {
                this.viewDate = new Date(this.endDate);
            } else {
                this.viewDate = new Date(this.date);
            }
            this.fill();
        },

        fillDow: function()
        {
            var dowCnt = this.weekStart,
                html = '<tr>';
            while (dowCnt < this.weekStart + 7) {
                html += '<th class="dow">' + dates[this.language].daysMin[(dowCnt++) % 7] + '</th>';
            }
            html += '</tr>';
            this.picker.find('.datetimepicker-days thead').append(html);
        },

        fillMonths: function()
        {
            var html = '',
                i = 0;
            while (i < 12) {
                html += '<span class="month">' + dates[this.language].monthsShort[i++] + '</span>';
            }
            this.picker.find('.datetimepicker-months td').html(html);
        },

        fill: function()
        {
            if (this.date == null || this.viewDate == null) {
                return;
            }
            var d = new Date(this.viewDate),
                year = d.getUTCFullYear(),
                month = d.getUTCMonth(),
                dayMonth = d.getUTCDate(),
                hours = d.getUTCHours(),
                minutes = d.getUTCMinutes(),
                startYear = this.startDate !== -Infinity ? this.startDate.getUTCFullYear() : -Infinity,
                startMonth = this.startDate !== -Infinity ? this.startDate.getUTCMonth() : -Infinity,
                endYear = this.endDate !== Infinity ? this.endDate.getUTCFullYear() : Infinity,
                endMonth = this.endDate !== Infinity ? this.endDate.getUTCMonth() : Infinity,
                currentDate = (new UTCDate(this.date.getUTCFullYear(), this.date.getUTCMonth(), this.date.getUTCDate())).valueOf(),
                today = new Date();
            this.picker.find('.datetimepicker-days thead th:eq(1)')
                .text(dates[this.language].months[month] + ' ' + year);
            if (this.formatViewType == "time") {
                var hourConverted = hours % 12 ? hours % 12 : 12;
                var hoursDisplay = (hourConverted < 10 ? '0' : '') + hourConverted;
                var minutesDisplay = (minutes < 10 ? '0' : '') + minutes;
                var meridianDisplay = dates[this.language].meridiem[hours < 12 ? 0 : 1];
                this.picker.find('.datetimepicker-hours thead th:eq(1)')
                    .text(hoursDisplay + ':' + minutesDisplay + ' ' + meridianDisplay.toUpperCase());
                this.picker.find('.datetimepicker-minutes thead th:eq(1)')
                    .text(hoursDisplay + ':' + minutesDisplay + ' ' + meridianDisplay.toUpperCase());
            } else {
                this.picker.find('.datetimepicker-hours thead th:eq(1)')
                    .text(dayMonth + ' ' + dates[this.language].months[month] + ' ' + year);
                this.picker.find('.datetimepicker-minutes thead th:eq(1)')
                    .text(dayMonth + ' ' + dates[this.language].months[month] + ' ' + year);
            }
            this.picker.find('tfoot th.today')
                .text(dates[this.language].today)
                .toggle(this.todayBtn !== false);
            this.updateNavArrows();
            this.fillMonths();
            /*var prevMonth = UTCDate(year, month, 0,0,0,0,0);
             prevMonth.setUTCDate(prevMonth.getDate() - (prevMonth.getUTCDay() - this.weekStart + 7)%7);*/
            var prevMonth = UTCDate(year, month - 1, 28, 0, 0, 0, 0),
                day = DPGlobal.getDaysInMonth(prevMonth.getUTCFullYear(), prevMonth.getUTCMonth());
            prevMonth.setUTCDate(day);
            prevMonth.setUTCDate(day - (prevMonth.getUTCDay() - this.weekStart + 7) % 7);
            var nextMonth = new Date(prevMonth);
            nextMonth.setUTCDate(nextMonth.getUTCDate() + 42);
            nextMonth = nextMonth.valueOf();
            var html = [];
            var clsName;
            while (prevMonth.valueOf() < nextMonth) {
                if (prevMonth.getUTCDay() == this.weekStart) {
                    html.push('<tr>');
                }
                clsName = '';
                if (prevMonth.getUTCFullYear() < year || (prevMonth.getUTCFullYear() == year && prevMonth.getUTCMonth() < month)) {
                    clsName += ' old';
                } else if (prevMonth.getUTCFullYear() > year || (prevMonth.getUTCFullYear() == year && prevMonth.getUTCMonth() > month)) {
                    clsName += ' new';
                }
                // Compare internal UTC date with local today, not UTC today
                if (this.todayHighlight &&
                    prevMonth.getUTCFullYear() == today.getFullYear() &&
                    prevMonth.getUTCMonth() == today.getMonth() &&
                    prevMonth.getUTCDate() == today.getDate()) {
                    clsName += ' today';
                }
                if (prevMonth.valueOf() == currentDate) {
                    clsName += ' active';
                }
                if ((prevMonth.valueOf() + 86400000) <= this.startDate || prevMonth.valueOf() > this.endDate ||
                    $.inArray(prevMonth.getUTCDay(), this.daysOfWeekDisabled) !== -1) {
                    clsName += ' disabled';
                }
                html.push('<td class="day' + clsName + '">' + prevMonth.getUTCDate() + '</td>');
                if (prevMonth.getUTCDay() == this.weekEnd) {
                    html.push('</tr>');
                }
                prevMonth.setUTCDate(prevMonth.getUTCDate() + 1);
            }
            this.picker.find('.datetimepicker-days tbody').empty().append(html.join(''));

            html = [];
            var txt = '', meridian = '', meridianOld = '';
            for (var i = 0; i < 24; i++) {
                var actual = UTCDate(year, month, dayMonth, i);
                clsName = '';
                // We want the previous hour for the startDate
                if ((actual.valueOf() + 3600000) <= this.startDate || actual.valueOf() > this.endDate) {
                    clsName += ' disabled';
                } else if (hours == i) {
                    clsName += ' active';
                }
                if (this.showMeridian && dates[this.language].meridiem.length == 2) {
                    meridian = (i < 12 ? dates[this.language].meridiem[0] : dates[this.language].meridiem[1]);
                    if (meridian != meridianOld) {
                        if (meridianOld != '') {
                            html.push('</fieldset>');
                        }
                        html.push('<fieldset class="hour"><legend>' + meridian.toUpperCase() + '</legend>');
                    }
                    meridianOld = meridian;
                    txt = (i % 12 ? i % 12 : 12);
                    html.push('<span class="hour' + clsName + ' hour_' + (i < 12 ? 'am' : 'pm') + '">' + txt + '</span>');
                    if (i == 23) {
                        html.push('</fieldset>');
                    }
                } else {
                    txt = i + ':00';
                    html.push('<span class="hour' + clsName + '">' + txt + '</span>');
                }
            }
            this.picker.find('.datetimepicker-hours td').html(html.join(''));

            html = [];
            txt = '', meridian = '', meridianOld = '';
            for (var i = 0; i < 60; i += this.minuteStep) {
                var actual = UTCDate(year, month, dayMonth, hours, i, 0);
                clsName = '';
                if (actual.valueOf() < this.startDate || actual.valueOf() > this.endDate) {
                    clsName += ' disabled';
                } else if (Math.floor(minutes / this.minuteStep) == Math.floor(i / this.minuteStep)) {
                    clsName += ' active';
                }
                if (this.showMeridian && dates[this.language].meridiem.length == 2) {
                    meridian = (hours < 12 ? dates[this.language].meridiem[0] : dates[this.language].meridiem[1]);
                    if (meridian != meridianOld) {
                        if (meridianOld != '') {
                            html.push('</fieldset>');
                        }
                        html.push('<fieldset class="minute"><legend>' + meridian.toUpperCase() + '</legend>');
                    }
                    meridianOld = meridian;
                    txt = (hours % 12 ? hours % 12 : 12);
                    //html.push('<span class="minute'+clsName+' minute_'+(hours<12?'am':'pm')+'">'+txt+'</span>');
                    html.push('<span class="minute' + clsName + '">' + txt + ':' + (i < 10 ? '0' + i : i) + '</span>');
                    if (i == 59) {
                        html.push('</fieldset>');
                    }
                } else {
                    txt = i + ':00';
                    //html.push('<span class="hour'+clsName+'">'+txt+'</span>');
                    html.push('<span class="minute' + clsName + '">' + hours + ':' + (i < 10 ? '0' + i : i) + '</span>');
                }
            }
            this.picker.find('.datetimepicker-minutes td').html(html.join(''));

            var currentYear = this.date.getUTCFullYear();
            var months = this.picker.find('.datetimepicker-months')
                .find('th:eq(1)')
                .text(year)
                .end()
                .find('span').removeClass('active');
            if (currentYear == year) {
                months.eq(this.date.getUTCMonth()).addClass('active');
            }
            if (year < startYear || year > endYear) {
                months.addClass('disabled');
            }
            if (year == startYear) {
                months.slice(0, startMonth).addClass('disabled');
            }
            if (year == endYear) {
                months.slice(endMonth + 1).addClass('disabled');
            }

            html = '';
            year = parseInt(year / 10, 10) * 10;
            var yearCont = this.picker.find('.datetimepicker-years')
                .find('th:eq(1)')
                .text(year + '-' + (year + 9))
                .end()
                .find('td');
            year -= 1;
            for (var i = -1; i < 11; i++) {
                html += '<span class="year' + (i == -1 || i == 10 ? ' old' : '') + (currentYear == year ? ' active' : '') + (year < startYear || year > endYear ? ' disabled' : '') + '">' + year + '</span>';
                year += 1;
            }
            yearCont.html(html);
            this.place();
        },

        updateNavArrows: function()
        {
            var d = new Date(this.viewDate),
                year = d.getUTCFullYear(),
                month = d.getUTCMonth(),
                day = d.getUTCDate(),
                hour = d.getUTCHours();
            switch (this.viewMode) {
                case 0:
                    if (this.startDate !== -Infinity && year <= this.startDate.getUTCFullYear()
                        && month <= this.startDate.getUTCMonth()
                        && day <= this.startDate.getUTCDate()
                        && hour <= this.startDate.getUTCHours()) {
                        this.picker.find('.prev').css({visibility: 'hidden'});
                    } else {
                        this.picker.find('.prev').css({visibility: 'visible'});
                    }
                    if (this.endDate !== Infinity && year >= this.endDate.getUTCFullYear()
                        && month >= this.endDate.getUTCMonth()
                        && day >= this.endDate.getUTCDate()
                        && hour >= this.endDate.getUTCHours()) {
                        this.picker.find('.next').css({visibility: 'hidden'});
                    } else {
                        this.picker.find('.next').css({visibility: 'visible'});
                    }
                    break;
                case 1:
                    if (this.startDate !== -Infinity && year <= this.startDate.getUTCFullYear()
                        && month <= this.startDate.getUTCMonth()
                        && day <= this.startDate.getUTCDate()) {
                        this.picker.find('.prev').css({visibility: 'hidden'});
                    } else {
                        this.picker.find('.prev').css({visibility: 'visible'});
                    }
                    if (this.endDate !== Infinity && year >= this.endDate.getUTCFullYear()
                        && month >= this.endDate.getUTCMonth()
                        && day >= this.endDate.getUTCDate()) {
                        this.picker.find('.next').css({visibility: 'hidden'});
                    } else {
                        this.picker.find('.next').css({visibility: 'visible'});
                    }
                    break;
                case 2:
                    if (this.startDate !== -Infinity && year <= this.startDate.getUTCFullYear()
                        && month <= this.startDate.getUTCMonth()) {
                        this.picker.find('.prev').css({visibility: 'hidden'});
                    } else {
                        this.picker.find('.prev').css({visibility: 'visible'});
                    }
                    if (this.endDate !== Infinity && year >= this.endDate.getUTCFullYear()
                        && month >= this.endDate.getUTCMonth()) {
                        this.picker.find('.next').css({visibility: 'hidden'});
                    } else {
                        this.picker.find('.next').css({visibility: 'visible'});
                    }
                    break;
                case 3:
                case 4:
                    if (this.startDate !== -Infinity && year <= this.startDate.getUTCFullYear()) {
                        this.picker.find('.prev').css({visibility: 'hidden'});
                    } else {
                        this.picker.find('.prev').css({visibility: 'visible'});
                    }
                    if (this.endDate !== Infinity && year >= this.endDate.getUTCFullYear()) {
                        this.picker.find('.next').css({visibility: 'hidden'});
                    } else {
                        this.picker.find('.next').css({visibility: 'visible'});
                    }
                    break;
            }
        },

        click: function(e)
        {
            e.stopPropagation();
            e.preventDefault();
            var target = $(e.target).closest('span, td, th, legend');
            if (target.length == 1) {
                if (target.is('.disabled')) {
                    this.element.trigger({
                        type     : 'outOfRange',
                        date     : this.viewDate,
                        startDate: this.startDate,
                        endDate  : this.endDate
                    });
                    return;
                }
                switch (target[0].nodeName.toLowerCase()) {
                    case 'th':
                        switch (target[0].className) {
                            case 'switch':
                                this.showMode(1);
                                break;
                            case 'prev':
                            case 'next':
                                var dir = DPGlobal.modes[this.viewMode].navStep * (target[0].className == 'prev' ? -1 : 1);
                                switch (this.viewMode) {
                                    case 0:
                                        this.viewDate = this.moveHour(this.viewDate, dir);
                                        break;
                                    case 1:
                                        this.viewDate = this.moveDate(this.viewDate, dir);
                                        break;
                                    case 2:
                                        this.viewDate = this.moveMonth(this.viewDate, dir);
                                        break;
                                    case 3:
                                    case 4:
                                        this.viewDate = this.moveYear(this.viewDate, dir);
                                        break;
                                }
                                this.fill();
                                break;
                            case 'today':
                                var date = new Date();
                                date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), 0);

                                this.viewMode = this.startViewMode;
                                this.showMode(0);
                                this._setDate(date);
                                this.fill();
                                if (this.autoclose) {
                                    this.hide();
                                }
                                break;
                        }
                        break;
                    case 'span':
                        if (!target.is('.disabled')) {
                            var year = this.viewDate.getUTCFullYear(),
                                month = this.viewDate.getUTCMonth(),
                                day = this.viewDate.getUTCDate(),
                                hours = this.viewDate.getUTCHours(),
                                minutes = this.viewDate.getUTCMinutes(),
                                seconds = this.viewDate.getUTCSeconds();

                            if (target.is('.month')) {
                                this.viewDate.setUTCDate(1);
                                month = target.parent().find('span').index(target);
                                day = this.viewDate.getUTCDate();
                                this.viewDate.setUTCMonth(month);
                                this.element.trigger({
                                    type: 'changeMonth',
                                    date: this.viewDate
                                });
                                if (this.viewSelect >= 3) {
                                    this._setDate(UTCDate(year, month, day, hours, minutes, seconds, 0));
                                }
                            } else if (target.is('.year')) {
                                this.viewDate.setUTCDate(1);
                                year = parseInt(target.text(), 10) || 0;
                                this.viewDate.setUTCFullYear(year);
                                this.element.trigger({
                                    type: 'changeYear',
                                    date: this.viewDate
                                });
                                if (this.viewSelect >= 4) {
                                    this._setDate(UTCDate(year, month, day, hours, minutes, seconds, 0));
                                }
                            } else if (target.is('.hour')) {
                                hours = parseInt(target.text(), 10) || 0;
                                if (target.hasClass('hour_am') || target.hasClass('hour_pm')) {
                                    if (hours == 12 && target.hasClass('hour_am')) {
                                        hours = 0;
                                    } else if (hours != 12 && target.hasClass('hour_pm')) {
                                        hours += 12;
                                    }
                                }
                                this.viewDate.setUTCHours(hours);
                                this.element.trigger({
                                    type: 'changeHour',
                                    date: this.viewDate
                                });
                                if (this.viewSelect >= 1) {
                                    this._setDate(UTCDate(year, month, day, hours, minutes, seconds, 0));
                                }
                            } else if (target.is('.minute')) {
                                minutes = parseInt(target.text().substr(target.text().indexOf(':') + 1), 10) || 0;
                                this.viewDate.setUTCMinutes(minutes);
                                this.element.trigger({
                                    type: 'changeMinute',
                                    date: this.viewDate
                                });
                                if (this.viewSelect >= 0) {
                                    this._setDate(UTCDate(year, month, day, hours, minutes, seconds, 0));
                                }
                            }
                            if (this.viewMode != 0) {
                                var oldViewMode = this.viewMode;
                                this.showMode(-1);
                                this.fill();
                                if (oldViewMode == this.viewMode && this.autoclose) {
                                    this.hide();
                                }
                            } else {
                                this.fill();
                                if (this.autoclose) {
                                    this.hide();
                                }
                            }
                        }
                        break;
                    case 'td':
                        if (target.is('.day') && !target.is('.disabled')) {
                            var day = parseInt(target.text(), 10) || 1;
                            var year = this.viewDate.getUTCFullYear(),
                                month = this.viewDate.getUTCMonth(),
                                hours = this.viewDate.getUTCHours(),
                                minutes = this.viewDate.getUTCMinutes(),
                                seconds = this.viewDate.getUTCSeconds();
                            if (target.is('.old')) {
                                if (month === 0) {
                                    month = 11;
                                    year -= 1;
                                } else {
                                    month -= 1;
                                }
                            } else if (target.is('.new')) {
                                if (month == 11) {
                                    month = 0;
                                    year += 1;
                                } else {
                                    month += 1;
                                }
                            }
                            this.viewDate.setUTCDate(day);
                            this.viewDate.setUTCMonth(month);
                            this.viewDate.setUTCFullYear(year);
                            this.element.trigger({
                                type: 'changeDay',
                                date: this.viewDate
                            });
                            if (this.viewSelect >= 2) {
                                this._setDate(UTCDate(year, month, day, hours, minutes, seconds, 0));
                            }
                        }
                        var oldViewMode = this.viewMode;
                        this.showMode(-1);
                        this.fill();
                        if (oldViewMode == this.viewMode && this.autoclose) {
                            this.hide();
                        }
                        break;
                }
            }
        },

        _setDate: function(date, which)
        {
            if (!which || which == 'date') {
                this.date = date;
            }
            if (!which || which == 'view') {
                this.viewDate = date;
            }
            this.fill();
            this.setValue();
            var element;
            if (this.isInput) {
                element = this.element;
            } else if (this.component) {
                element = this.element.find('input');
            }
            if (element) {
                element.change();
                if (this.autoclose && (!which || which == 'date')) {
                    //this.hide();
                }
            }
            this.element.trigger({
                type: 'changeDate',
                date: this.date
            });
        },

        moveMinute: function(date, dir)
        {
            if (!dir) {
                return date;
            }
            var new_date = new Date(date.valueOf());
            //dir = dir > 0 ? 1 : -1;
            new_date.setUTCMinutes(new_date.getUTCMinutes() + (dir * this.minuteStep));
            return new_date;
        },

        moveHour: function(date, dir)
        {
            if (!dir) {
                return date;
            }
            var new_date = new Date(date.valueOf());
            //dir = dir > 0 ? 1 : -1;
            new_date.setUTCHours(new_date.getUTCHours() + dir);
            return new_date;
        },

        moveDate: function(date, dir)
        {
            if (!dir) {
                return date;
            }
            var new_date = new Date(date.valueOf());
            //dir = dir > 0 ? 1 : -1;
            new_date.setUTCDate(new_date.getUTCDate() + dir);
            return new_date;
        },

        moveMonth: function(date, dir)
        {
            if (!dir) {
                return date;
            }
            var new_date = new Date(date.valueOf()),
                day = new_date.getUTCDate(),
                month = new_date.getUTCMonth(),
                mag = Math.abs(dir),
                new_month, test;
            dir = dir > 0 ? 1 : -1;
            if (mag == 1) {
                test = dir == -1
                    // If going back one month, make sure month is not current month
                    // (eg, Mar 31 -> Feb 31 == Feb 28, not Mar 02)
                    ? function()
                {
                    return new_date.getUTCMonth() == month;
                }
                    // If going forward one month, make sure month is as expected
                    // (eg, Jan 31 -> Feb 31 == Feb 28, not Mar 02)
                    : function()
                {
                    return new_date.getUTCMonth() != new_month;
                };
                new_month = month + dir;
                new_date.setUTCMonth(new_month);
                // Dec -> Jan (12) or Jan -> Dec (-1) -- limit expected date to 0-11
                if (new_month < 0 || new_month > 11) {
                    new_month = (new_month + 12) % 12;
                }
            } else {
                // For magnitudes >1, move one month at a time...
                for (var i = 0; i < mag; i++)
                    // ...which might decrease the day (eg, Jan 31 to Feb 28, etc)...
                {
                    new_date = this.moveMonth(new_date, dir);
                }
                // ...then reset the day, keeping it in the new month
                new_month = new_date.getUTCMonth();
                new_date.setUTCDate(day);
                test = function()
                {
                    return new_month != new_date.getUTCMonth();
                };
            }
            // Common date-resetting loop -- if date is beyond end of month, make it
            // end of month
            while (test()) {
                new_date.setUTCDate(--day);
                new_date.setUTCMonth(new_month);
            }
            return new_date;
        },

        moveYear: function(date, dir)
        {
            return this.moveMonth(date, dir * 12);
        },

        dateWithinRange: function(date)
        {
            return date >= this.startDate && date <= this.endDate;
        },

        keydown: function(e)
        {
            if (this.picker.is(':not(:visible)')) {
                if (e.keyCode == 27) // allow escape to hide and re-show picker
                {
                    this.show();
                }
                return;
            }
            var dateChanged = false,
                dir, day, month,
                newDate, newViewDate;
            switch (e.keyCode) {
                case 27: // escape
                    this.hide();
                    e.preventDefault();
                    break;
                case 37: // left
                case 39: // right
                    if (!this.keyboardNavigation) {
                        break;
                    }
                    dir = e.keyCode == 37 ? -1 : 1;
                    viewMode = this.viewMode;
                    if (e.ctrlKey) {
                        viewMode += 2;
                    } else if (e.shiftKey) {
                        viewMode += 1;
                    }
                    if (viewMode == 4) {
                        newDate = this.moveYear(this.date, dir);
                        newViewDate = this.moveYear(this.viewDate, dir);
                    } else if (viewMode == 3) {
                        newDate = this.moveMonth(this.date, dir);
                        newViewDate = this.moveMonth(this.viewDate, dir);
                    } else if (viewMode == 2) {
                        newDate = this.moveDate(this.date, dir);
                        newViewDate = this.moveDate(this.viewDate, dir);
                    } else if (viewMode == 1) {
                        newDate = this.moveHour(this.date, dir);
                        newViewDate = this.moveHour(this.viewDate, dir);
                    } else if (viewMode == 0) {
                        newDate = this.moveMinute(this.date, dir);
                        newViewDate = this.moveMinute(this.viewDate, dir);
                    }
                    if (this.dateWithinRange(newDate)) {
                        this.date = newDate;
                        this.viewDate = newViewDate;
                        this.setValue();
                        this.update();
                        e.preventDefault();
                        dateChanged = true;
                    }
                    break;
                case 38: // up
                case 40: // down
                    if (!this.keyboardNavigation) {
                        break;
                    }
                    dir = e.keyCode == 38 ? -1 : 1;
                    viewMode = this.viewMode;
                    if (e.ctrlKey) {
                        viewMode += 2;
                    } else if (e.shiftKey) {
                        viewMode += 1;
                    }
                    if (viewMode == 4) {
                        newDate = this.moveYear(this.date, dir);
                        newViewDate = this.moveYear(this.viewDate, dir);
                    } else if (viewMode == 3) {
                        newDate = this.moveMonth(this.date, dir);
                        newViewDate = this.moveMonth(this.viewDate, dir);
                    } else if (viewMode == 2) {
                        newDate = this.moveDate(this.date, dir * 7);
                        newViewDate = this.moveDate(this.viewDate, dir * 7);
                    } else if (viewMode == 1) {
                        if (this.showMeridian) {
                            newDate = this.moveHour(this.date, dir * 6);
                            newViewDate = this.moveHour(this.viewDate, dir * 6);
                        } else {
                            newDate = this.moveHour(this.date, dir * 4);
                            newViewDate = this.moveHour(this.viewDate, dir * 4);
                        }
                    } else if (viewMode == 0) {
                        newDate = this.moveMinute(this.date, dir * 4);
                        newViewDate = this.moveMinute(this.viewDate, dir * 4);
                    }
                    if (this.dateWithinRange(newDate)) {
                        this.date = newDate;
                        this.viewDate = newViewDate;
                        this.setValue();
                        this.update();
                        e.preventDefault();
                        dateChanged = true;
                    }
                    break;
                case 13: // enter
                    if (this.viewMode != 0) {
                        var oldViewMode = this.viewMode;
                        this.showMode(-1);
                        this.fill();
                        if (oldViewMode == this.viewMode && this.autoclose) {
                            this.hide();
                        }
                    } else {
                        this.fill();
                        if (this.autoclose) {
                            this.hide();
                        }
                    }
                    e.preventDefault();
                    break;
                case 9: // tab
                    this.hide();
                    break;
            }
            if (dateChanged) {
                var element;
                if (this.isInput) {
                    element = this.element;
                } else if (this.component) {
                    element = this.element.find('input');
                }
                if (element) {
                    element.change();
                }
                this.element.trigger({
                    type: 'changeDate',
                    date: this.date
                });
            }
        },

        showMode: function(dir)
        {
            if (dir) {
                var newViewMode = Math.max(0, Math.min(DPGlobal.modes.length - 1, this.viewMode + dir));
                if (newViewMode >= this.minView && newViewMode <= this.maxView) {
                    this.element.trigger({
                        type       : 'changeMode',
                        date       : this.viewDate,
                        oldViewMode: this.viewMode,
                        newViewMode: newViewMode
                    });

                    this.viewMode = newViewMode;
                }
            }
            /*
             vitalets: fixing bug of very special conditions:
             jquery 1.7.1 + webkit + show inline datetimepicker in bootstrap popover.
             Method show() does not set display css correctly and datetimepicker is not shown.
             Changed to .css('display', 'block') solve the problem.
             See https://github.com/vitalets/x-editable/issues/37

             In jquery 1.7.2+ everything works fine.
             */
            //this.picker.find('>div').hide().filter('.datetimepicker-'+DPGlobal.modes[this.viewMode].clsName).show();
            this.picker.find('>div').hide().filter('.datetimepicker-' + DPGlobal.modes[this.viewMode].clsName).css('display', 'block');
            this.updateNavArrows();
        },

        reset: function(e)
        {
            this._setDate(null, 'date');
        }
    };

    $.fn.datetimepicker = function(option)
    {
        var args = Array.apply(null, arguments);
        args.shift();
        return this.each(function()
        {
            var $this = $(this),
                data = $this.data('datetimepicker'),
                options = typeof option == 'object' && option;
            if (!data) {
                $this.data('datetimepicker', (data = new Datetimepicker(this, $.extend({}, $.fn.datetimepicker.defaults, options))));
            }
            if (typeof option == 'string' && typeof data[option] == 'function') {
                data[option].apply(data, args);
            }
        });
    };

    $.fn.datetimepicker.defaults = {
    };
    $.fn.datetimepicker.Constructor = Datetimepicker;
    var dates = $.fn.datetimepicker.dates = {
        en: {
            days       : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            daysShort  : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            daysMin    : ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
            months     : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            meridiem   : ["am", "pm"],
            suffix     : ["st", "nd", "rd", "th"],
            today      : "Today"
        }
    };

    var DPGlobal = {
        modes           : [
            {
                clsName: 'minutes',
                navFnc : 'Hours',
                navStep: 1
            },
            {
                clsName: 'hours',
                navFnc : 'Date',
                navStep: 1
            },
            {
                clsName: 'days',
                navFnc : 'Month',
                navStep: 1
            },
            {
                clsName: 'months',
                navFnc : 'FullYear',
                navStep: 1
            },
            {
                clsName: 'years',
                navFnc : 'FullYear',
                navStep: 10
            }
        ],
        isLeapYear      : function(year)
        {
            return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0))
        },
        getDaysInMonth  : function(year, month)
        {
            return [31, (DPGlobal.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]
        },
        getDefaultFormat: function(type, field)
        {
            if (type == "standard") {
                if (field == 'input') {
                    return 'yyyy-mm-dd hh:ii';
                }
                else {
                    return 'yyyy-mm-dd hh:ii:ss';
                }
            } else if (type == "php") {
                if (field == 'input') {
                    return 'Y-m-d H:i';
                }
                else {
                    return 'Y-m-d H:i:s';
                }
            } else {
                throw new Error("Invalid format type.");
            }
        },
        validParts      : function(type)
        {
            if (type == "standard") {
                return /hh?|HH?|p|P|ii?|ss?|dd?|DD?|mm?|MM?|yy(?:yy)?/g;
            } else if (type == "php") {
                return /[dDjlNwzFmMnStyYaABgGhHis]/g;
            } else {
                throw new Error("Invalid format type.");
            }
        },
        nonpunctuation  : /[^ -\/:-@\[-`{-~\t\n\rTZ]+/g,
        parseFormat     : function(format, type)
        {
            // IE treats \0 as a string end in inputs (truncating the value),
            // so it's a bad format delimiter, anyway
            var separators = format.replace(this.validParts(type), '\0').split('\0'),
                parts = format.match(this.validParts(type));
            if (!separators || !separators.length || !parts || parts.length == 0) {
                throw new Error("Invalid date format.");
            }
            return {separators: separators, parts: parts};
        },
        parseDate       : function(date, format, language, type)
        {
            if (date instanceof Date) {
                var dateUTC = new Date(date.valueOf() - date.getTimezoneOffset() * 60000);
                dateUTC.setMilliseconds(0);
                return dateUTC;
            }
            if (/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(date)) {
                format = this.parseFormat('yyyy-mm-dd', type);
            }
            if (/^\d{4}\-\d{1,2}\-\d{1,2}[T ]\d{1,2}\:\d{1,2}$/.test(date)) {
                format = this.parseFormat('yyyy-mm-dd hh:ii', type);
            }
            if (/^\d{4}\-\d{1,2}\-\d{1,2}[T ]\d{1,2}\:\d{1,2}\:\d{1,2}[Z]{0,1}$/.test(date)) {
                format = this.parseFormat('yyyy-mm-dd hh:ii:ss', type);
            }
            if (/^[-+]\d+[dmwy]([\s,]+[-+]\d+[dmwy])*$/.test(date)) {
                var part_re = /([-+]\d+)([dmwy])/,
                    parts = date.match(/([-+]\d+)([dmwy])/g),
                    part, dir;
                date = new Date();
                for (var i = 0; i < parts.length; i++) {
                    part = part_re.exec(parts[i]);
                    dir = parseInt(part[1]);
                    switch (part[2]) {
                        case 'd':
                            date.setUTCDate(date.getUTCDate() + dir);
                            break;
                        case 'm':
                            date = Datetimepicker.prototype.moveMonth.call(Datetimepicker.prototype, date, dir);
                            break;
                        case 'w':
                            date.setUTCDate(date.getUTCDate() + dir * 7);
                            break;
                        case 'y':
                            date = Datetimepicker.prototype.moveYear.call(Datetimepicker.prototype, date, dir);
                            break;
                    }
                }
                return UTCDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), 0);
            }
            var parts = date && date.match(this.nonpunctuation) || [],
                date = new Date(0, 0, 0, 0, 0, 0, 0),
                parsed = {},
                setters_order = ['hh', 'h', 'ii', 'i', 'ss', 's', 'yyyy', 'yy', 'M', 'MM', 'm', 'mm', 'D', 'DD', 'd', 'dd', 'H', 'HH', 'p', 'P'],
                setters_map = {
                    hh  : function(d, v)
                    {
                        return d.setUTCHours(v);
                    },
                    h   : function(d, v)
                    {
                        return d.setUTCHours(v);
                    },
                    HH  : function(d, v)
                    {
                        return d.setUTCHours(v == 12 ? 0 : v);
                    },
                    H   : function(d, v)
                    {
                        return d.setUTCHours(v == 12 ? 0 : v);
                    },
                    ii  : function(d, v)
                    {
                        return d.setUTCMinutes(v);
                    },
                    i   : function(d, v)
                    {
                        return d.setUTCMinutes(v);
                    },
                    ss  : function(d, v)
                    {
                        return d.setUTCSeconds(v);
                    },
                    s   : function(d, v)
                    {
                        return d.setUTCSeconds(v);
                    },
                    yyyy: function(d, v)
                    {
                        return d.setUTCFullYear(v);
                    },
                    yy  : function(d, v)
                    {
                        return d.setUTCFullYear(2000 + v);
                    },
                    m   : function(d, v)
                    {
                        v -= 1;
                        while (v < 0) {
                            v += 12;
                        }
                        v %= 12;
                        d.setUTCMonth(v);
                        while (d.getUTCMonth() != v) {
                            d.setUTCDate(d.getUTCDate() - 1);
                        }
                        return d;
                    },
                    d   : function(d, v)
                    {
                        return d.setUTCDate(v);
                    },
                    p   : function(d, v)
                    {
                        return d.setUTCHours(v == 1 ? d.getUTCHours() + 12 : d.getUTCHours());
                    }
                },
                val, filtered, part;
            setters_map['M'] = setters_map['MM'] = setters_map['mm'] = setters_map['m'];
            setters_map['dd'] = setters_map['d'];
            setters_map['P'] = setters_map['p'];
            date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
            if (parts.length == format.parts.length) {
                for (var i = 0, cnt = format.parts.length; i < cnt; i++) {
                    val = parseInt(parts[i], 10);
                    part = format.parts[i];
                    if (isNaN(val)) {
                        switch (part) {
                            case 'MM':
                                filtered = $(dates[language].months).filter(function()
                                {
                                    var m = this.slice(0, parts[i].length),
                                        p = parts[i].slice(0, m.length);
                                    return m == p;
                                });
                                val = $.inArray(filtered[0], dates[language].months) + 1;
                                break;
                            case 'M':
                                filtered = $(dates[language].monthsShort).filter(function()
                                {
                                    var m = this.slice(0, parts[i].length),
                                        p = parts[i].slice(0, m.length);
                                    return m == p;
                                });
                                val = $.inArray(filtered[0], dates[language].monthsShort) + 1;
                                break;
                            case 'p':
                            case 'P':
                                val = $.inArray(parts[i].toLowerCase(), dates[language].meridiem);
                                break;
                        }
                    }
                    parsed[part] = val;
                }
                for (var i = 0, s; i < setters_order.length; i++) {
                    s = setters_order[i];
                    if (s in parsed && !isNaN(parsed[s])) {
                        setters_map[s](date, parsed[s])
                    }
                }
            }
            return date;
        },
        formatDate      : function(date, format, language, type)
        {
            if (date == null) {
                return '';
            }
            var val;
            if (type == 'standard') {
                val = {
                    // year
                    yy  : date.getUTCFullYear().toString().substring(2),
                    yyyy: date.getUTCFullYear(),
                    // month
                    m   : date.getUTCMonth() + 1,
                    M   : dates[language].monthsShort[date.getUTCMonth()],
                    MM  : dates[language].months[date.getUTCMonth()],
                    // day
                    d   : date.getUTCDate(),
                    D   : dates[language].daysShort[date.getUTCDay()],
                    DD  : dates[language].days[date.getUTCDay()],
                    p   : (dates[language].meridiem.length == 2 ? dates[language].meridiem[date.getUTCHours() < 12 ? 0 : 1] : ''),
                    // hour
                    h   : date.getUTCHours(),
                    // minute
                    i   : date.getUTCMinutes(),
                    // second
                    s   : date.getUTCSeconds()
                };
                val.H = (val.h % 12 == 0 ? 12 : val.h % 12);
                val.HH = (val.H < 10 ? '0' : '') + val.H;
                val.P = val.p.toUpperCase();
                val.hh = (val.h < 10 ? '0' : '') + val.h;
                val.ii = (val.i < 10 ? '0' : '') + val.i;
                val.ss = (val.s < 10 ? '0' : '') + val.s;
                val.dd = (val.d < 10 ? '0' : '') + val.d;
                val.mm = (val.m < 10 ? '0' : '') + val.m;
            } else if (type == 'php') {
                // php format
                val = {
                    // year
                    y: date.getUTCFullYear().toString().substring(2),
                    Y: date.getUTCFullYear(),
                    // month
                    F: dates[language].months[date.getUTCMonth()],
                    M: dates[language].monthsShort[date.getUTCMonth()],
                    n: date.getUTCMonth() + 1,
                    t: DPGlobal.getDaysInMonth(date.getUTCFullYear(), date.getUTCMonth()),
                    // day
                    j: date.getUTCDate(),
                    l: dates[language].days[date.getUTCDay()],
                    D: dates[language].daysShort[date.getUTCDay()],
                    w: date.getUTCDay(), // 0 -> 6
                    N: (date.getUTCDay() == 0 ? 7 : date.getUTCDay()),       // 1 -> 7
                    S: (date.getUTCDate() % 10 <= dates[language].suffix.length ? dates[language].suffix[date.getUTCDate() % 10 - 1] : ''),
                    // hour
                    a: (dates[language].meridiem.length == 2 ? dates[language].meridiem[date.getUTCHours() < 12 ? 0 : 1] : ''),
                    g: (date.getUTCHours() % 12 == 0 ? 12 : date.getUTCHours() % 12),
                    G: date.getUTCHours(),
                    // minute
                    i: date.getUTCMinutes(),
                    // second
                    s: date.getUTCSeconds()
                };
                val.m = (val.n < 10 ? '0' : '') + val.n;
                val.d = (val.j < 10 ? '0' : '') + val.j;
                val.A = val.a.toString().toUpperCase();
                val.h = (val.g < 10 ? '0' : '') + val.g;
                val.H = (val.G < 10 ? '0' : '') + val.G;
                val.i = (val.i < 10 ? '0' : '') + val.i;
                val.s = (val.s < 10 ? '0' : '') + val.s;
            } else {
                throw new Error("Invalid format type.");
            }
            var date = [],
                seps = $.extend([], format.separators);
            for (var i = 0, cnt = format.parts.length; i < cnt; i++) {
                if (seps.length) {
                    date.push(seps.shift())
                }
                date.push(val[format.parts[i]]);
            }
            return date.join('');
        },
        convertViewMode : function(viewMode)
        {
            switch (viewMode) {
                case 4:
                case 'decade':
                    viewMode = 4;
                    break;
                case 3:
                case 'year':
                    viewMode = 3;
                    break;
                case 2:
                case 'month':
                    viewMode = 2;
                    break;
                case 1:
                case 'day':
                    viewMode = 1;
                    break;
                case 0:
                case 'hour':
                    viewMode = 0;
                    break;
            }

            return viewMode;
        },
        headTemplate    : '<thead>' +
            '<tr>' +
            '<th class="prev"><i class="glyphicon glyphicon-arrow-left"/></th>' +
            '<th colspan="5" class="switch"></th>' +
            '<th class="next"><i class="glyphicon glyphicon-arrow-right"/></th>' +
            '</tr>' +
            '</thead>',
        contTemplate    : '<tbody><tr><td colspan="7"></td></tr></tbody>',
        footTemplate    : '<tfoot><tr><th colspan="7" class="today"></th></tr></tfoot>'
    };
    DPGlobal.template = '<div class="datetimepicker">' +
        '<div class="datetimepicker-minutes">' +
        '<table class=" table-condensed">' +
        DPGlobal.headTemplate +
        DPGlobal.contTemplate +
        DPGlobal.footTemplate +
        '</table>' +
        '</div>' +
        '<div class="datetimepicker-hours">' +
        '<table class=" table-condensed">' +
        DPGlobal.headTemplate +
        DPGlobal.contTemplate +
        DPGlobal.footTemplate +
        '</table>' +
        '</div>' +
        '<div class="datetimepicker-days">' +
        '<table class=" table-condensed">' +
        DPGlobal.headTemplate +
        '<tbody></tbody>' +
        DPGlobal.footTemplate +
        '</table>' +
        '</div>' +
        '<div class="datetimepicker-months">' +
        '<table class="table-condensed">' +
        DPGlobal.headTemplate +
        DPGlobal.contTemplate +
        DPGlobal.footTemplate +
        '</table>' +
        '</div>' +
        '<div class="datetimepicker-years">' +
        '<table class="table-condensed">' +
        DPGlobal.headTemplate +
        DPGlobal.contTemplate +
        DPGlobal.footTemplate +
        '</table>' +
        '</div>' +
        '</div>';

    $.fn.datetimepicker.DPGlobal = DPGlobal;

}(window.jQuery);

$.tablesorter.addParser({
    id    : "fancyNumber",
    is    : function(s)
    {
        return /^[0-9]?[0-9,\.]*$/.test(s);
    },
    format: function(s)
    {
        return jQuery.tablesorter.formatFloat(s.replace(/,/g, ''));
    },
    type  : "numeric"
});


$(document).ready(function()
    {
        onLoadJquery();
    }
); //EOF $(document).ready(function()


function onLoadJquery()
{

    $.extend($.tablesorter.themes.bootstrap, {
        // these classes are added to the table. To see other table classes available,
        // look here: http://twitter.github.com/bootstrap/base-css.html#tables
        table      : 'table table-bordered',
        header     : 'bootstrap-header', // give the header a gradient background
        footerRow  : '',
        footerCells: '',
        icons      : '', // add "icon-white" to make them white; this icon class is added to the <i> in the header
        sortNone   : 'bootstrap-icon-unsorted ',
        sortAsc    : 'icon-chevron-up glyphicon glyphicon-chevron-up',     // includes classes for Bootstrap v2 & v3
        sortDesc   : 'icon-chevron-down glyphicon glyphicon-chevron-down', // includes classes for Bootstrap v2 & v3
        active     : '', // applied when column is sorted
        hover      : '', // use custom css here - bootstrap class may not override it
        filterRow  : '', // filter row class
        even       : '', // odd row zebra striping
        odd        : ''  // even row zebra striping
    });

    // call the tablesorter plugin and apply the uitheme widget
    $(".tablesorter").tablesorter({
        // this will apply the bootstrap theme if "uitheme" widget is included
        // the widgetOptions.uitheme is no longer required to be set
        theme: "bootstrap",

        widthFixed: true,
        showProcessing: true,

        headerTemplate: '{content} {icon}', // new in v2.7. Needed to add the bootstrap icon!

        // widget code contained in the jquery.tablesorter.widgets.js file
        // use the zebra stripe widget if you plan on hiding any rows (filter widget)
        widgets       : [
            "uitheme",
            "stickyHeaders",
            "zebra"//,'filter'
        ],

        widgetOptions: {
            // using the default zebra striping class name, so it actually isn't included in the theme variable above
            // this is ONLY needed for bootstrap theming if you are using the filter widget, because rows are hidden
            zebra       : ["even", "odd"],

            // If there are child rows in the table (rows with class name from "cssChildRow" option)
            // and this option is true and a match is found anywhere in the child row, then it will make that row
            // visible; default is false
            filter_childRows : false,

            // if true, a filter will be added to the top of each table column;
            // disabled by using -> headers: { 1: { filter: false } } OR add class="filter-false"
            // if you set this to false, make sure you perform a search using the second method below
            filter_columnFilters : true,

            // extra css class applied to the table row containing the filters & the inputs within that row
            filter_cssFilter : 'tablesorter-filter',

            // class added to filtered rows (rows that are not showing); needed by pager plugin
            filter_filteredRow   : 'filtered',

            // add custom filter elements to the filter row
            // see the filter formatter demos for more specifics
            filter_formatter : null,

            // add custom filter functions using this option
            // see the filter widget custom demo for more specifics on how to use this option
            filter_functions : null,

            // if true, filters are collapsed initially, but can be revealed by hovering over the grey bar immediately
            // below the header row. Additionally, tabbing through the document will open the filter row when an input gets focus
            filter_hideFilters : false,

            // Set this option to false to make the searches case sensitive
            filter_ignoreCase : true,

            // if true, search column content while the user types (with a delay)
            filter_liveSearch : true,

            // jQuery selector string of an element used to reset the filters
            filter_reset : 'button.reset',

            // Use the $.tablesorter.storage utility to save the most recent filters (default setting is false)
            filter_saveFilters : true,

            // Delay in milliseconds before the filter widget starts searching; This option prevents searching for
            // every character while typing and should make searching large tables faster.
            filter_searchDelay : 300,

            // if true, server-side filtering should be performed because client-side filtering will be disabled, but
            // the ui and events will still be used.
            filter_serversideFiltering: false,

            // Set this option to true to use the filter to find text from the start of the column
            // So typing in "a" will find "albert" but not "frank", both have a's; default is false
            filter_startsWith : false,

            // Filter using parsed content for ALL columns
            // be careful on using this on date columns as the date is parsed and stored as time in seconds
            filter_useParsedData : false

        }
    });

    $(".ts-pager").html(
        '<button type="button" class="btn first disabled">' +
            '<i class="icon-step-backward glyphicon glyphicon-step-backward"></i></button>' +
            '<button type="button" class="btn prev disabled">' +
            '<i class="icon-arrow-left glyphicon glyphicon-backward"></i></button>' +
            '<span class="pagedisplay"></span>' +
            '<button type="button" class="btn next disabled">' +
            '<i class="icon-arrow-right glyphicon glyphicon-forward"></i></button>' +
            '<button type="button" class="btn last disabled">' +
            '    <i class="icon-step-forward glyphicon glyphicon-step-forward"></i></button>' +
            '<select class="pagesize" title="Select page size">' +
            '<option selected="selected" value="10">10</option>' +
            '<option value="20">20</option>' +
            '<option value="30">30</option>' +
            '<option value="40">40</option>' +
            '</select>' +
            '<select class="pagenum" title="Select page number"></select>'
    );

    $(".tablesorter.pager").tablesorterPager({

        // target the pager markup - see the HTML block below
        container : $(".ts-pager"),

        // target the pager page select dropdown - choose a page
        cssGoto   : ".pagenum",

        // remove rows from the table to speed up the sort of large tables.
        // setting this to false, only hides the non-visible rows; needed if you plan to add/remove rows with the pager enabled.
        removeRows: false,

        // output string - default is '{page}/{totalPages}';
        // possible variables: {page}, {totalPages}, {filteredPages}, {startRow}, {endRow}, {filteredRows} and {totalRows}
        output    : '{startRow} - {endRow} / {filteredRows} ({totalRows})'

    });

    // Disable / Enable Pager
    // **************
    $('.togglePager').click(function(){
        var mode = /Disable/.test( $(this).text() );
        $('table').trigger( (mode ? 'disable' : 'enable') + '.pager');
        $(this).text( (mode ? 'Enable' : 'Disable') + 'Pager');
        return false;
    });

    $('table').bind('pagerChange', function(){
        // pager automatically enables when table is sorted.
        $('.togglePager').text('Disable');
    });


    $(".datepicker").datepicker({ format: "yyyy-mm-dd"});
    $(".datetimepicker").datetimepicker({ format: "yyyy-mm-dd hh:ii:ss"});

    // Enable combobox
    $('select.combobox').combobox();


    /* jquery.numeric function types */
    $("input.numeric").numeric();
    $("input.integer").numeric(false, function()
    {
        alert("Integers only");
        this.value = "";
        this.focus();
    });
    $("input.positive").numeric({ negative: false }, function()
    {
        alert("No negative values");
        this.value = "";
        this.focus();
    });
    $("input.positive-integer").numeric({ decimal: false, negative: false }, function()
    {
        alert("Positive integers only");
        this.value = "";
        this.focus();
    });
    /*******  EOF jquery.numeric  ******/

        //Prevent the double sumition of forms
    $('form').submit(function(e)
    {
        var $submit = $(this).find('input[type="submit"]');

        //Get the actual submit value
        var submitVal = $submit.val();
        var submitName = $submit.attr('name');

        //Disable the button and show "Processing"
        $submit.val('Processing').attr('disabled', true);

        //Append the submit value
        $(this).append("<input type='hidden' name='" + submitName + "' value='" + submitVal + "' />");

    });

    // Checkbox checkall class
    $('input.checkall').click(function()
    {
        var table = $(this).closest('table');
        var checkboxes = table.find('input:checkbox');
        var self = this;

        checkboxes.each(function()
        {
            $(this).prop('checked', self.checked);
        });
    });
}

function getProgramRate(programId, callback)
{
    $.post(
        '/ajax/loanprogram/getRate/' + programId,
        function(data)
        {
            callback(data);
        });
}

function getGlobalLoanSplit(callback)
{
    $.post(
        '/ajax/loan/getGlobalSplit',
        function(data)
        {
            callback(data);
        });
}


/**
 * Changes the value of the combobox dropdows using jquery
 *
 * @param {string} selected
 * @param value
 * @param {string|null} destination
 */
function comboboxChangeValue(selected, value, destination)
{
    if (typeof destination == 'undefined') {
        destination = selected;
    }

    var comboboxInput = $('input[name="' + selected + '"]');

    $('#' + destination).val(value);
    comboboxInput.val(value);
    comboboxInput.next().val($('#' + destination + ' option:selected').text());
}

