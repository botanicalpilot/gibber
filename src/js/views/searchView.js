import { elements } from './base';

export const getInput = () =>
    elements.searchInput.value;
export const clearInput = () => {
    elements.searchInput.value = ''
};
export const clearResults = () => {
    elements.searchResList.innerHTML = '';
};

export const highlightSelected  = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => {
        el.classList.remove('results__link--active');
    });
    document.querySelector(`.results__link[href*=${id}"]`).classList.add('results__link--active');
};

const renderCrop = crop => {
    const markup = `
    <li>
        <a class="results__link results__link--active" href="#${crop.id}">
            <div class="results__data">
                <h3 class="results__name">${crop.common_name}</h3>
                <h4 class="results__name">${crop.scientific_name}</h4>
            </div>
        </a>
    </li>`;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
}

export const renderResults = crops => {
    console.log(crops)
    crops.forEach(renderCrop)
}