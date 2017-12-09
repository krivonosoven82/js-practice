function fun1() {
//Получаем доступ к элементу input-range и его значению
  let rangeTopLeft = document.getElementById('rtl').value;
  let rangeTopRight = document.getElementById('rtr').value;
  let rangeBottomRight = document.getElementById('rbr').value;
  let rangeBottomLeft = document.getElementById('rbl').value;
// Получаем доступ к элементу p и присваеваем в переменную значение range
// для вывода на экран
  let textTopLeft = document.getElementById('ttl')
  .innerHTML = rangeTopLeft;
  let textTopRight = document.getElementById('ttr')
  .innerHTML = rangeTopRight;
  let textBottomRight = document.getElementById('tbr')
  .innerHTML = rangeBottomRight;
  let textBottomLeft = document.getElementById('tbl')
  .innerHTML = rangeBottomLeft;
//Получаем доступ к элементу div по id - block
  let block = document.getElementById('block');
//Задаем стиль элементу div по значению input-range
  block.style.borderRadius = rangeTopLeft + 'px ' + rangeTopRight + 'px '
  + rangeBottomRight + 'px ' + rangeBottomLeft + 'px ';
}
