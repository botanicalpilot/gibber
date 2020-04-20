import { elements } from './base';

export const getInput = () =>
    elements.searchInput.value;
export const getParam = () =>                     elements.searchParam.value;
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
    <a class="results__link results__link--active" href="#23456">
        <button class="results__data">
            ${crop.common_name}/
            ${crop.scientific_name}
        </button>
        <div class="results__panel">
            <div class="results_boolean">${crop.sow_all_season}</div>
            <div class="results_boolean">${crop.start_all_season}</div>
            <div class="results__dates">
                <div class="sow_indoor">
                    <p>Sow Indoor Start: ${crop.sow_indoor_start}</p>
                    <p>end: Sow Indoor End: ${crop.sow_indoor_end}</p>
                    <button>add</button>
                </div>
                <div class="sow_outdoor">
                    <p>Sow Outdoor Start: ${crop.sow_outdoor_start}</p>
                    <p>Sow Outdoor End: ${crop.sow_outdoor_end}</p>
                    <button>add</button>
                </div>
                <div class="start_outdoor">
                <p>Plant Starts Outdoor: ${crop.start_outdoor_start}</p>
                <p>Plant Starts Outdoor End: ${crop.start_outdoor_end}</p>
                <button>add</button>
                </div>
            </div>
        </div>
    </a>
</li>`;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
}

export const buildAccordion = () => {
    let accordionBtn = document.querySelector('.results__data')
    accordionBtn.addEventListener("click", function() {
          /* Toggle between adding and removing the "active" class,
          to highlight the button that controls the panel */
        this.classList.toggle("active");
      
          /* Toggle between hiding and showing the active panel */
        let panel = this.nextElementSibling;
          if (panel.style.display === "block") {
            panel.style.display = "none";
          } else {
            panel.style.display = "block";
          }
        });
}


export const renderResults = crops => {
    console.log(crops)
    crops.forEach(renderCrop)
}