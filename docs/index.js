const stats = [];
let frequency = 'daily';

const renderStat = (stat, frequency) => {
    let statTitle = stat.title.toLowerCase();
    statTitle = statTitle.replace(' ', '-');
    let timeframes = stat.timeframes[frequency];
    let labelFrequency = frequency === 'daily' ? 'day' : frequency === 'weekly' ? 'week' : 'month';
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
                Last ${labelFrequency} - <span>${timeframes.previous}</span>hrs
                </p>
            </div>
        </div>
    `;
}

function populateDOM(data, frequency='daily') {
    data.forEach((stat) => renderStat(stat, frequency));
}

fetch('./data.json').then((response) => {
    if (!response.ok) return console.log('Failed fetching json data');

    return response.json();
}).then((data) => {
    data.forEach((stat) => {
        stats.push(stat);
    });
    populateDOM(stats, frequency);
});

const frequenciesContainer = document.getElementById('frequencies');
const tabs = frequenciesContainer.querySelectorAll('div');

tabs.forEach((tab) => {
   tab.addEventListener('click', function () {
    let freqClicked = this.innerHTML.toLowerCase();
    if (freqClicked !== frequency) {
        let lastTabClicked = document.getElementById(`tab-${frequency}`);
        // update the stat cards
        frequency = freqClicked;
        populateDOM(stats, frequency);
        // update the tab selected color
        this.classList.add('freq-selected');
        lastTabClicked.classList.remove('freq-selected');
    }
   }) ;
});
