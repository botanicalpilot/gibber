export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchRes: document.querySelector('.results'),
    searchResList: document.querySelector('.results__list'),
    searchResPages: document.querySelector('.results__pages'),
    accordionBtn: document.getElementsByClassName('results__data'),
    cropSelection: document.querySelector('.crop_selection'),
    sowSelection: document.querySelector('.sow_selection'),
    startSelection: document.querySelector('.start_selection'),
    calendarMonth: document.querySelector('#calendarMonth'),
    calendarButtonInsert: document.querySelector('.new-cal'),
    indoorAddButton: document.querySelector('.indoorAdd'),
    sowAddButton: document.querySelector('.sowAdd'),
    startAddButton: document.querySelector('.startAdd'),
}


export const elementStrings = {
    loader: 'loader'
};

export const renderLoader = parent => {
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-circles-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if(loader) loader.parentElement.removeChild(loader);
};