// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits

  const fruitsList = document.getElementById('fruitsList');

  fruitsList.innerHTML = "";


  for (let i = 0; i < fruits.length; i++) {
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild

    let $newLi = document.createElement('li');
    if (fruits[i].color == "фиолетовый") {
      $newLi.className = "fruit__item fruit_violet"
    } else if (fruits[i].color == "зеленый") {
      $newLi.className = "fruit__item fruit_green"
    } else if (fruits[i].color == "розово-красный") {
      $newLi.className = "fruit__item fruit_carmazin"
    } else if (fruits[i].color == "желтый") {
      $newLi.className = "fruit__item fruit_yellow"
    } else if (fruits[i].color == "светло-коричневый") {
      $newLi.className = "fruit__item fruit_lightbrown"
    } else {
      $newLi.className = "fruit__item fruit_gray"
    }

    fruitsList.appendChild($newLi);
    
    let $fruitInfo = document.createElement('div');
    $fruitInfo.className = "fruit__info"
    $newLi.appendChild($fruitInfo);

    let $newDivIndex = document.createElement('div');
    $newDivIndex.textContent = 'index: ' + i;
    $fruitInfo.appendChild($newDivIndex);

    let $newDivKind = document.createElement('div');
    $newDivKind.textContent = 'kind: ' + fruits[i].kind;
    $fruitInfo.appendChild($newDivKind);

    let $newDivColor = document.createElement('div');
    $newDivColor.textContent = 'color: ' + fruits[i].color;
    $fruitInfo.appendChild($newDivColor);

    let $newDivWeight = document.createElement('div');
    $newDivWeight.textContent = 'weight (кг): ' + fruits[i].weight;
    $fruitInfo.appendChild($newDivWeight);

  }
};



// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  let fruitsFoCheck = fruits;


  // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
  while (fruits.length > 0) {
    // TODO: допишите функцию перемешивания массива
    //
    // Подсказка: находим случайный элемент из fruits, используя getRandomInt
    // вырезаем его из fruits и вставляем в result.
    // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
    // (массив fruits будет уменьшатся, а result заполняться)
  
    fruitIndex = getRandomInt(0, fruits.length - 1)
    elementForAdd = fruits[fruitIndex];
    result.unshift(elementForAdd);
    fruits.splice(fruitIndex, 1);

  }

  fruits = result;

  if (fruits == fruitsFoCheck){
    alert("Порядок не изменился.")
  }
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  fruits.filter((item) => {
    // TODO: допишите функцию

    const minWeightInput = document.getElementById('minWeightInput');
    const maxWeightInput = document.getElementById('maxWeightInput');
    const maxWeightInputForCheck = parseInt(maxWeightInput.value);
    const minWeightInputForCheck = parseInt(minWeightInput.value);

    let result = []
    if (minWeightInput.value == null || maxWeightInput.value == null){
      alert("Заполните поля min weight и max weight");
    } else {
      for (let i = 0; i < fruits.length; i++){
        if (fruits[i].weight > minWeightInputForCheck && fruits[i].weight < maxWeightInputForCheck){
          result.unshift(fruits[i]);
        }
      }
    }

    if (result.length > 0){
      fruits = result;
    }
    display();
  });
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  // TODO: допишите функцию сравнения двух элементов по цвету

const priority = ["белый", "черный", "серый", "красный", "розовый", "желтый", "оранжевый", "зеленый", "синий", "голубой", "фиолетовый", "коричневый"]
const priority1 = priority.indexOf(a);
const priority2 = priority.indexOf(b);
return priority1 > priority2;
};

const sortAPI = {
  bubbleSort(arr, comparation) {
    // TODO: допишите функцию сортировки пузырьком
    
    {
      const n = arr.length;
      // внешняя итерация по элементам
      for (let i = 0; i < n-1; i++) {
        // внутренняя итерация для перестоновки элемента в конец массива
        for (let j = 0; j < n-1; j++) {
          // сравниваем элементы
          if (comparation(arr[i].color, arr[j+1].color)) {
            // делаем обмен элементов
            let temp = arr[j+1];
            arr[j+1] = arr[j];
            arr[j] = temp;
          }
        }
      }
    }
  },



  quickSort(arr, comparation) {
    // TODO: допишите функцию быстрой сортировки

    if (arr.length <= 1) {
      return arr;
    }
    
    const pivot = arr[arr.length - 1];
    const leftArr = [];
    const rightArr = [];

    for (let i = 0; i < arr.length - 1; i++) {
      if (comparation([i], pivot)) {
        leftList.push(arr[i]);
      }
      else {
        rightList.push(arr[i])
      }
    }
    
    return [...quickSort(leftArr), pivot, ...quickSort(rightArr)];

  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
  if (sortKindLabel.textContent == "bubbleSort"){
    sortKindLabel.textContent = "quickSort";
  } else if (sortKindLabel.textContent == "quickSort"){
    sortKindLabel.textContent = "bubbleSort";
  }
});


sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  // TODO: вывести в sortTimeLabel значение sortTime
  sortTimeLabel.textContent = sortTime;
});



/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  if (kindInput.value == '' || colorInput.value == '' || weightInput.value == '') {
    alert("Заполните поля kind, color, weight!")
  } else {
    let fruitForAdd = {kind: kindInput.value, color: colorInput.value, weight: parseInt(weightInput.value)};
    fruits.push(fruitForAdd);
  
  }
  display();
});