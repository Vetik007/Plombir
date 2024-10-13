!(function (e) {
  'function' != typeof e.matches &&
    (e.matches =
      e.msMatchesSelector ||
      e.mozMatchesSelector ||
      e.webkitMatchesSelector ||
      function (e) {
        for (
          var t = this,
            o = (t.document || t.ownerDocument).querySelectorAll(e),
            n = 0;
          o[n] && o[n] !== t;

        )
          ++n;
        return Boolean(o[n]);
      }),
    'function' != typeof e.closest &&
      (e.closest = function (e) {
        for (var t = this; t && 1 === t.nodeType; ) {
          if (t.matches(e)) return t;
          t = t.parentNode;
        }
        return null;
      });
})(window.Element.prototype);

document.addEventListener('DOMContentLoaded', function () {
  /* Записываем в переменные массив элементов-кнопок и подложку.
       Подложке зададим id, чтобы не влиять на другие элементы с классом overlay*/
  var modalButtons = document.querySelectorAll('.js-open-modal'),
    overlay = document.querySelector('.js-overlay-modal'),
    backdrup = document.querySelector('.backdrup'),
    closeButtons = document.querySelectorAll('.js-modal-close');

  /* Перебираем массив кнопок */
  modalButtons.forEach(function (item) {
    /* Назначаем каждой кнопке обработчик клика */
    item.addEventListener('click', function (e) {
      /* Предотвращаем стандартное действие элемента. Так как кнопку разные
             люди могут сделать по-разному. Кто-то сделает ссылку, кто-то кнопку.
             Нужно подстраховаться. */
      e.preventDefault();

      /* При каждом клике на кнопку мы будем забирать содержимое атрибута data-modal
             и будем искать модальное окно с таким же атрибутом. */
      var modalId = this.getAttribute('data-modal'),
        modalElem = document.querySelector(
          '.modal[data-modal="' + modalId + '"]'
        ),
        modElem = document.querySelector('.mod[data-modal="' + modalId + '"]');

      /* После того как нашли нужное модальное окно, добавим классы
             подложке и окну чтобы показать их. */
      // modalElem.classList.add('active');

      /* Если нашли элемент с классом .modal или .mod, добавляем им класс 'active' */
      if (modalElem) {
        modalElem.classList.add('active');
      } else if (modElem) {
        modElem.classList.add('active');
      }

      overlay.classList.add('active');
      backdrup.classList.add('open');
    }); // end click
  }); // end foreach

  closeButtons.forEach(function (item) {
    item.addEventListener('click', function (e) {
      var parentModal = this.closest('.modal'),
        parentMod = this.closest('.mod');

      // parentModal.classList.remove('active');
      if (parentModal) {
        parentModal.classList.remove('active');
      } else if (parentMod) {
        parentMod.classList.remove('active');
      }

      overlay.classList.remove('active');
      backdrup.classList.remove('open');
    });
  }); // end foreach

  /* Закрытие по клавише Esc */
  document.body.addEventListener(
    'keyup',
    function (e) {
      var key = e.keyCode;

      //   if (key == 27) {
      //     document.querySelector('.modal.active').classList.remove('active');
      //     // document.querySelector('.mod.active').classList.remove('active');
      //     document.querySelector('.overlay').classList.remove('active');
      //   }
      // },
      // false

      if (key == 27) {
        var activeModal = document.querySelector('.modal.active'),
          activeMod = document.querySelector('.mod.active');

        if (activeModal) {
          activeModal.classList.remove('active');
        } else if (activeMod) {
          activeMod.classList.remove('active');
        }

        overlay.classList.remove('active');
        backdrup.classList.remove('open');
      }
    },
    false
  );

  /* Закрытие по клику на подложку */
  // overlay.addEventListener('click', function () {
  //   document.querySelector('.modal.active').classList.remove('active');
  //   // document.querySelector('.mod.active').classList.remove('active');
  //   this.classList.remove('active');
  // });

  overlay.addEventListener('click', function () {
    var activeModal = document.querySelector('.modal.active'),
      activeMod = document.querySelector('.mod.active');

    if (activeModal) {
      activeModal.classList.remove('active');
    } else if (activeMod) {
      activeMod.classList.remove('active');
    }

    this.classList.remove('active');
    backdrup.classList.remove('open');
  });
}); // end ready
