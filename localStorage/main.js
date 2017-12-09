window.onload = function(){
  //==========Начало
  //Проверяем наличие ключа 'bgcolor' в localStorege
  if (localStorage.getItem('bgcolor') !== null) {
    //Если имеется то присваеваем ее значение переменной color
    let color = localStorage.getItem('bgcolor');
    //Присваеваем тегу body переменную color
    document.getElementsByTagName('body')[0].style.background = color;
  }

  //Получаем доступ к тегу button по id="green" и вешаем на нее анонимную функцию
  document.getElementById('green').onclick = function () {
    //По клику присваеваеи тегу body цвет green
    document.getElementsByTagName('body')[0].style.background = 'green';
    //Создаем ключ и значения в localStorage
    localStorage.setItem('bgcolor', 'green');
  };

  //Получаем доступ к тегу button по id="red" и вешаем на нее анонимную функцию
  document.getElementById('red').onclick = function () {
    ////По клику присваеваеи тегу body цвет red
    document.getElementsByTagName('body')[0].style.background = 'red';
    ////Создаем ключ и значения в localStorage
    localStorage.setItem('bgcolor', 'red');
  };
  //==========Конец
};
