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

// export const highlightSelected  = id => {
//     const resultsArr = Array.from(document.querySelectorAll('.results__link'));
//     resultsArr.forEach(el => {
//         el.classList.remove('results__link--active');
//     });
//     document.querySelector(`.results__link[href*=${id}"]`).classList.add('results__link--active');
// };


export const buildAccordion = id => {
    // const accordionBtn = document.getElementsByClassName('results__data');
    let i;
    
    for(i = 0; i < elements.accordionBtn.length; i++){
        elements.accordionBtn[i].addEventListener("click",function() {
            /* Toggle between adding and removing the "active" class,
            to highlight the button that controls the panel */
          this.classList.toggle("active");
          
            /* Toggle between hiding and showing the active panel */
          let panel = this.nextElementSibling;
            if (panel.style.display === "block"){
              panel.style.display = "none";
            } else {
              panel.style.display = "block";
            }
          });
    }     
}

export const splitDate = rawDate => {
    return rawDate.replace('T00:00:00.000Z', '').split('-').reverse().join('-')
}


const renderCrop = crop => {
    // let users know planting intervals. 
    let cropBoolean = ''
    if(crop.sow_all_season && crop.start_all_season === true){
       cropBoolean =  `<div class="results_boolean">Plant Crop in intervals all season from either starts or seeds.</div>` 
    } else if(crop.sow_all_season === true && crop.start_all_season === false){ cropBoolean = `<div class="results_boolean">Crop may be sown in intervals throughout the growing season.</div>`
    } else {
        cropBoolean = `<div class="results__boolean">Crops may only be planted between the dates below.</div>`
    }

    // check if null/reformat dates for indoor planting dates 
    let cropIndoorStart = ''
    let cropIndoorEnd = ''
    let indoorClass = ''
    if(crop.sow_indoor_start && crop.sow_indoor_end != null){
        cropIndoorStart = splitDate(crop.sow_indoor_start)
        cropIndoorEnd = splitDate(crop.sow_indoor_end)
        indoorClass = 'sow_indoor'
    } else {
        cropIndoorStart = crop.sow_indoor_start
        cropIndoorEnd = crop.sow_indoor_end
        indoorClass = 'sow_indoor_hide'
    }

    // check if null/reformat dates for sowing dates 
    let cropSowStart = ''
    let cropSowEnd = ''
    let outdoorClass = ''
    if(crop.sow_outdoor_start && crop.sow_outdoor_end != null){
        cropSowStart = splitDate(crop.sow_outdoor_start)
        cropSowEnd = splitDate(crop.sow_outdoor_end)
        outdoorClass = 'sow_outdoor'
    } else {
        cropSowStart = crop.sow_outdoor_start
        cropSowEnd = crop.sow_outdoor_end
        outdoorClass = 'sow_outdoor_hide'
    }

    // check if null/reformat dates for start dates 
    let startBegin = ''
    let startEnd = ''
    let startClass = ''
    if(crop.start_outdoor_start && crop.start_outdoor_end != null){
        startBegin = splitDate(crop.start_outdoor_start)
        startEnd = splitDate(crop.start_outdoor_end)
        startClass = 'start_outdoor'
    } else {
        startBegin = crop.start_outdoor_start
        startEnd = crop.start_outdoor_end
        startClass = 'start_outdoor_hide'
    }


    

    const markup = `
    <li>
    <a class="results__link" href="#${crop.id}">
        <button class="results__data">
            <div id="cn_style">${crop.common_name}</div><br>
            <div id="sn_style">${crop.scientific_name}</div>
        </button>
        <div class="results__panel">
            ${cropBoolean} 
            <div class="results__dates">
                <div class=${indoorClass}>
                    <p>Sow Indoor Start: ${cropIndoorStart}</p>
                    <p>Sow Indoor End: ${cropIndoorEnd}</p>
                    <button class="indoorAdd">add</button>
                </div>
                <div class="${outdoorClass}">
                    <p>Sow Outdoor Start:<br> ${cropSowStart}</p>
                    <p>Sow Outdoor End: ${cropSowEnd}</p>
                    <button class="sowAdd">add</button>
                </div>
                <div class="${startClass}">
                    <p>Plant Starts Outdoor: ${startBegin}</p>
                    <p>Plant Starts Outdoor End: ${startEnd}
                    <button class="startAdd">add</button>
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
    buildAccordion()
    
}