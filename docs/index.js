const renderStat = (stat) => {
    let statTitle = stat.title.toLowerCase();
    statTitle = statTitle.replace(' ', '-');
    let timeframes = stat.timeframes.daily;
    let statContainer = document.getElementById(`${statTitle}-stat`);
    statContainer.innerHTML = `
        <div class="stat-bg bg-${statTitle}">
            <img src="./images/icon-${statTitle}.svg" alt="${stat.title} Icon">
        </div>
        <div class="stat-info">
            <div class="header">
                <h3 class="text-tab-medium color-white">${stat.title}</h3>
                <img src="./images/icon-ellipsis.svg" alt="More icon">
            </div>
            <div class="content">
                <p class="text-large color-white">${timeframes.current}hrs</p> <!-- daily -->
                <p class="text-caption color-pale-blue">
                Last week - <span>${timeframes.previous}</span>hrs
                </p>
            </div>
        </div>
    `;
}

function populateDOM(data) {
    data.forEach(renderStat);
}

fetch('./data.json').then((response) => {
    if (!response.ok) return console.log('Failed fetching json data');

    return response.json();
}).then((data) => {
    console.log('showing data', data);
    populateDOM(data);
});

