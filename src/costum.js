const costumizeByTime = (time) => {
    const dawn = "#ffb700";
    const day = "#ffea00";
    const night = "#023047";

    const app = document.querySelector('.App');
    console.log(typeof time);
    let bgColor = "";
    let col = ""

    switch (true) {
        case (time > 18 || time < 6):
            bgColor = night;
            col = "#dee2e6";
            break;
        case (time >= 6 && time < 9):
            bgColor = dawn;
            break;
        case (time >= 9 && time <= 18):
            bgColor = day;
            break;
    }
    app.style.backgroundColor = bgColor;
    app.style.color = col;
}

export default costumizeByTime;