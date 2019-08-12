var serverEnvironemt = 'http://localhost:3030';
var flag = true;

async function makeGetRequest(path) {
    let response = await fetch(serverEnvironemt + path);

    if (response.ok) {
        flag = true;
        return response.text();
    } else {
        console.log(response.status);
        flag = true;
        return null;
    }
}

function getNextCars(currentDataFile) {
    if (flag) {
        flag = false;
        return makeGetRequest('/cars' + currentDataFile);
    } else {
        return null;
    }
}