async function getBlock1(){
    let response = await fetch('/api/data');
    let data = await response.json();
    return data;
}

getBlock1()