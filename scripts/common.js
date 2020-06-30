var toArray = function (obj) {
  return Array.prototype.slice.call(obj)
}

  ; (function () {
    document.addEventListener('DOMContentLoaded', function () {
      function throttle(fn, threshhold) {
        var last
        var timer
        threshhold || (threshhold = 250)

        return function () {
          var context = this
          var args = arguments
          var now = +new Date()

          if (last && now < last + threshhold) {
            clearTimeout(timer)
            timer = setTimeout(function () {
              last = now
              fn.apply(context, args)
            }, threshhold)
          } else {
            last = now
            fn.apply(context, args)
          }
        }
      }

      setTimeout(() => {
        // Click navbar mobile menu
        var navbarMobileContainer = document.getElementById('navbar-mobile-container')
        var navbarMobileMenuBtn = document.getElementById('navbar-mobile-menu-btn')
        if (navbarMobileContainer && navbarMobileMenuBtn) {
          navbarMobileMenuBtn.onclick = function () {
            var isActive = navbarMobileContainer.classList.contains('active')
            if (isActive) {
              navbarMobileMenuBtn.classList.remove('is-active')
              navbarMobileContainer.classList.remove('active')
            } else {
              navbarMobileMenuBtn.classList.add('is-active')
              navbarMobileContainer.classList.add('active')
            }
          }
        }

        // Select navbar
        var navbarLinks = toArray(document.querySelectorAll('.navbar-link'))
        var currentURL = window.location.href
        if (navbarLinks) {
          navbarLinks.forEach(function (item) {
            if (currentURL.indexOf(item.href) !== -1) {
              item.classList.add('active')
            } else {
              item.classList.remove('acitve')
            }
          })
        }

        // QRCODE
        function handleClass(ele, reg, newcls) {
          ele.className = ele.className.replace(reg, '')
          ele.className += (' ' + newcls)
        }
        // on PC, hover & show QR code
        const stakeNow = toArray(document.querySelectorAll('.imbtc-qrcode'))
        let tick = null
        if (stakeNow) {
          stakeNow.forEach(function (item) {
            item.addEventListener('mouseover', function () {
              const qrcodeImg = item.querySelector('.qrcode img')
              const qrcode = item.querySelector('.qrcode')
              handleClass(qrcodeImg, / fade-out/g, 'fade-in-qrcode')
              handleClass(qrcode, / fade-out/g, 'fade-in')
              qrcode.setAttribute('style', 'display:block')
              if (tick) {
                clearTimeout(tick)
              }
            })

            item.addEventListener('mouseout', function (event) {
              const qrcodeImg = item.querySelector('.qrcode img')
              const qrcode = item.querySelector('.qrcode')
              handleClass(qrcode, / fade-in/g, 'fade-out')
              handleClass(qrcodeImg, / fade-in-qrcode/g, 'fade-out')
              tick = setTimeout(() => {
                qrcode.setAttribute('style', 'display:none')
              }, 500)
            }, true)
          })
        }
      }, 1000);
    })
  })()