let rootTableDivElement;
let cars;
let currentDataFile;
let preloader;
const keysCount = 9;

window.onload = function () {
    currentDataFile = 1;
    rootTableDivElement = document.getElementsByClassName('table')[0];
    preloader = document.getElementById('preloader');
    loadData();
}

//создание элемента машины
function createCar(car) {
    if (Object.keys(car).length === keysCount) {
        let carDivElement = createElementWithClasses('div',['table__row']);

        for (key in car) {
            let currentPropertyDivElement = createElementWithClasses('div',['table__cell']);

            if (car[key] != null) {
                currentPropertyDivElement.innerHTML = car[key];
            } else {
                currentPropertyDivElement.innerHTML = '-';
            }

            carDivElement.append(currentPropertyDivElement);
        }

        return carDivElement;
    } else {
        return null;
    }
}


window.onscroll = checkPageEnd;

//проверка скролла до конца страницы и подгрузка данных
function checkPageEnd() {
    const bottom = Math.floor(document.documentElement.getBoundingClientRect().bottom);
    const windowHeight = document.documentElement.clientHeight;

    if (bottom <= windowHeight) {
        loadData();
    }
}

//подгрузка данных с сервера
async function loadData() {
    preloader.style.display = 'block';
    rootTableDivElement.style.opacity = '0.5';

    let cars = await getNextCars(currentDataFile);

    if (cars != '' && cars != null) {
        try {
            addCarsToPage(cars);
            currentDataFile++;
        } catch (err) {
            console.log(err);
        }
    }

    preloader.style.display = 'none';
    rootTableDivElement.style.opacity = '1';

}

function addCarsToPage(cars) {
    let currencCar;
    cars = JSON.parse(cars);

    for (let i = 0; i < cars.length; i++) {
        currencCar = createCar(cars[i]);

        if (currencCar != null) {
            rootTableDivElement.append(currencCar);
        }
    }
}

function createElementWithClasses(tagName, classes) {
    element = document.createElement(tagName);

    for (let i = 0; i < classes.length; i++) {
        element.classList.add(classes[i]);
        
    }

    return element;
}