//Создаем функцию move
function move() {
  //Получаем доступ к элементу myBar
  let elem = document.getElementById('myBar');
  //Создаем переменную width
  let width = 10;
  //Создаем переменную id и присваеваем ей функцию setInterval
  let id = setInterval(frame, 10);
  //Создаем фукцию frame для изменения заполнения полосы Progress-bar
  function frame() {
    //Описываем условия работы
    if (width >= 100) {
      //Очищаем переменную id
      clearInterval(id);
    } else {
      //Иначе инкрементируеи переменную width
      width++;
      //Визуально стилизуем заполнение Progress-bar
      elem.style.width = width + '%';
      //Выводим результат в HTML в элемент label
      document.getElementById('label').innerHTML = width * 1 + '%';
    }
  }
}
