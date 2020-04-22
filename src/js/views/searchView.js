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


const buildAccordion = () => {
    const accordionBtn = document.querySelector('.results__data');
    
        accordionBtn.addEventListener("click",function() {
            /* Toggle between adding and removing the "active" class,
            to highlight the button that controls the panel */
          this.classList.toggle("active");
        
            /* Toggle between hiding and showing the active panel */
          let panel = document.querySelector('.results__panel');
            if (panel.style.display === "block"){
              panel.style.display = "none";
            } else {
              panel.style.display = "block";
            }
          });
}

const renderCrop = crop => {
    // let users know planting intervals. 
    let cropBoolean = ''
    if(crop.sow_all_season && crop.start_all_season === true){
       cropBoolean =  `<div class="results_boolean">Plant Crop in intervals all season from either starts or seeds.</div>` 
    } else if(crop.sow_all_season === true && crop.start_all_season === false){ cropBoolean = `<div class="results_boolean">Crops may be sown in intervals throughout the growing season.</div>`
    } else {
        cropBoolean = `<div class="results__boolean">Crops may only be planted between the dates below.</div>`
    }

    // reformat dates from API
    // console.log(new Date(crop.sow_outdoor_start))

    const markup = `
    <li>
    <a class="results__link results__link--active" href="#23456">
        <button class="results__data">
            ${crop.common_name}<br>
            <div id="sn_style">${crop.scientific_name}</div>
        </button>
        <div class="results__panel">
            ${cropBoolean} 
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



export const renderResults = crops => {
    console.log(crops)
    crops.forEach(renderCrop)
    buildAccordion(); 
}