var $start = document.querySelector('#start')
var $game = document.querySelector('#game')
var $time = document.querySelector('#time')
var $timeHeader = document.querySelector('#time-header')
var $resultHeader = document.querySelector('#result-header')
var $result = document.querySelector('#result')
var $gameTime = document.querySelector('#game-time')

var colors = ['red', 'pink', 'blue', 'gray', 'green', 'yellow', 'purple']
var score = 0
var isGamestarted = false //по умолчанию игра не идет - false

$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener('input', setGameTime)

function show($el) {
    $el.classList.remove('hide')
}

function hide($el) {
    $el.classList.add('hide')
}

function startGame(){
    score = 0
    setGameTime()
    $gameTime.setAttribute('disabled', 'true') //предотвращает изменение времени игры в процессе игры
    isGamestarted = true // когда ф-ция игра началась запустилась значение по умолчанию становится true - запускает игру
    $game.style.backgroundColor = '#fff'
    hide($start)

    var interval = setInterval(function() { //setInterval - метод уст.интервал, 1000 - второй параметр кол-во млсек через кот. нам нужн запускать интервал
        var time = parseFloat($time.textContent)//$time.textContent - вытаскивает значение id time. parseFloat - парсит строку 5.0 в число 
        
        if (time<=0){ //если время 5.0 меньше или равно 0, то игра прекратится
            clearInterval(interval) // clearInterval - останавливает интервал 
            endGame()
        } else{
            $time.textContent = (time - 0.1).toFixed(1)  // 0.1 - это 100 млсек в секундах. Или 5 сек - 100 млсек. toFixed - убирает лишние цифры в таймере после , и оставляет одно число
        }

    }, 100) 

    renderBox()
}

function setGameScore() { //вывод очков
    $result.textContent = score.toString()
}

function setGameTime() { //переустановка времени для повторного запуска игры
    var time = +$gameTime.value //берет время из input, + приводит строку к числу
    $time.textContent = time.toFixed(1)
    show($timeHeader)
    hide($resultHeader)
}

function endGame() {
    isGamestarted = false //когда ф-ция игра закончилась запустилась значение по умолчанию становится false - прекращает игру
    setGameScore()
    $gameTime.removeAttribute('disabled')
    show($start) //убирая класс hide мы вновь показываем кнопку Начать
    $game.innerHTML = ''
    $game.style.backgroundColor = '#ccc'
    hide($timeHeader)
    show($resultHeader)
}

function handleBoxClick(event) {
    if (!isGamestarted) { //когда обрабатывается клик по квадрату handleBoxClick сначала нужно проверить, что isGamestarted = true 
        return  // return пустой, чтобы ф-ция не выполнялась
    }

    if (event.target.dataset.box){ // проверяет является ли это квадратом при клике: event.target.dataset - цель ивента. dataset - устанавливает аттрибут box:true
        score++                //считает сколько раз кликнули по квадрату
        renderBox()
    }
}


function renderBox() {
    $game.innerHTML = '' //очищает содержание контейнера с Id game, так как при клике генерится новый квадрат
    var box = document.createElement('div')
    var boxSize = getRandom(30, 100)
    var gameSize = $game.getBoundingClientRect() //вычисляет величину квадрата id game
    var maxTop = gameSize.height - boxSize //макс отклонение от верхней стороны квадрата
    var maxLeft = gameSize.width - boxSize //макс отклонение от левой стороны квадрата
    var randomColorIndex = getRandom(0, colors.length) //[1, 2, 3] length ==3, если бы не было фукнции округления в меньшую сторону Math.floor нужно было бы писать colors.lengt - 1

    box.style.height = box.style.width = boxSize + 'px'
    box.style.position = 'absolute'
    box.style.backgroundColor = colors[randomColorIndex]
    box.style.top = getRandom (0, maxTop) + 'px'
    box.style.left = getRandom (0, maxLeft) + 'px'
    box.style.cursor = 'pointer'
    box.setAttribute('data-box', 'true') //setAttribute - устанавливает аттрибут внутри тега квадрата Box, чтобы убедиться, что кликаем именно по квадрату

    $game.insertAdjacentElement('afterbegin', box) //insertAdjacentElement вставляет элемент в html, afterbegin - позиция вставки тега div внутрь тега с id game - сразу после открывающего тега


}





function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min) //Math.random() * (max - min) + min - чтобы выводилось целое число, 
}