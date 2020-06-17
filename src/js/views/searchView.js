import { elements } from './base';



export const getInput = () =>
    elements.searchInput.value;
export const getParam = () =>                     elements.searchParam.value;
export const clearInput = () => {
    elements.searchInput.value = ''
};
export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
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
          if (!this.classList.contains("active") ){
              clearAccordion();
          }

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

export const clearAccordion = () => {
    let i;
    for (i = 0; i < elements.accordionBtn.length; i++) {
        elements.accordionBtn[i].classList.remove("active");
        elements.accordionBtn[i].nextElementSibling.style.display = "none";
    }
}

export const splitDate = rawDate => {
    let current = new Date()
    let year  = current.getFullYear()
    // 
    return rawDate.replace('T00:00:00.000Z', '').replace("2020", year).split('-').reverse().join('-')
}

const monthFormat = numDate => {

    let m1 = numDate.charAt(3)
    let m2 = numDate.charAt(4)
    let month;
    if(m1 === '0'){
        month = parseInt(m2)
    } else if (m1 === '1'){
        month = parseInt(m1.concat(m2))
    }

    const monthKey = new Array();
    monthKey[1] = "Jan";
    monthKey[2] = "Feb";
    monthKey[3] = "Mar";
    monthKey[4] = "Apr";
    monthKey[5] = "May";
    monthKey[6] = "Jun";
    monthKey[7] = "Jul";
    monthKey[8] = "Aug";
    monthKey[9] = "Sept";
    monthKey[10] = "Oct";
    monthKey[11] = "Nov";
    monthKey[12] = "Dec";

    let currentMonth = monthKey[month]

    return numDate.replace(`-${m1}${m2}-`, ` ${currentMonth} `)
}


const renderCrop = crop => {
    // let users know planting intervals. 
    let cropBoolean = ''
    if(crop.sow_all_season && crop.start_all_season === true){
       cropBoolean =  `<div class="results__boolean">Plant Crop in intervals all season from either starts or seeds.</div>` 
    } else if(crop.sow_all_season === true && crop.start_all_season === false){ cropBoolean = `<div class="results__boolean">Crop may be sown in intervals throughout the growing season.</div>`
    } else {
        cropBoolean = `<div class="results__boolean">Crops may only be planted between the dates below.</div>`
    }

    // check if null/reformat dates for indoor planting dates 
    let cropIndoorStart = ''
    let cropIndoorEnd = ''
    let indoorClass = ''
    if(crop.sow_indoor_start && crop.sow_indoor_end != null){
        cropIndoorStart = monthFormat(splitDate(crop.sow_indoor_start))
        cropIndoorEnd = monthFormat(splitDate(crop.sow_indoor_end))
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
        cropSowStart = monthFormat(splitDate(crop.sow_outdoor_start))
        cropSowEnd = monthFormat(splitDate(crop.sow_outdoor_end))
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
        startBegin = monthFormat(splitDate(crop.start_outdoor_start))
        startEnd = monthFormat(splitDate(crop.start_outdoor_end))
        startClass = 'start_outdoor'
    } else {
        startBegin = crop.start_outdoor_start
        startEnd = crop.start_outdoor_end
        startClass = 'start_outdoor_hide'
    }

    const markup = 
        `
            <li>
            <a class="results__link" href="#${crop.id}">
                <button class="results__data">
                    <h2 id="cn_style">${crop.common_name}  </h2><h2 id="sn_style">${crop.scientific_name}</h2>
                    
                </button>
                <div class="results__panel">
                    ${cropBoolean} 
                    <div class="results__dates">
                        <div class=${indoorClass}>
                            <p>Sow indoors <br>${cropIndoorStart} - <br>${cropIndoorEnd}</p>
                            <button class="btn-inline">
                            <svg class="indoorAdd">
                                <use href="img/icons.svg#icon-circle-with-plus"></use>
                            </svg>
                        </button>
                        </div>
                        <div class="${outdoorClass}">
                        <p>Sow outdoors <br>${cropSowStart} - <br>${cropSowEnd}</p>
                        <button class="btn-inline">
                            <svg class="sowAdd">
                                <use href="img/icons.svg#icon-circle-with-plus"></use>
                            </svg>
                        </button>
                        </div>
                        <div class="${startClass}">
                            <p>Plant starts <br>${startBegin} - <br>${startEnd}</p>
                            <button class="btn-inline">
                            <svg class="startAdd">
                                <use href="img/icons.svg#icon-circle-with-plus"></use>
                            </svg>
                        </button>
                        </div>
                    </div>
                </div>
            </a>
        </li>`;

        elements.searchResList.insertAdjacentHTML('beforeend', markup);

}

const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page-1 : page + 1}></span>
        <span>Page ${type==='prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);
    let button;
    if(page === 1 && pages > 1 ){
        button = createButton(page, 'next');
    } else if (page < pages) {
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
    } else if (page === pages && pages > 1) {
        button = createButton(page, 'prev');
    } 
    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};


export const renderResults = (crops, page = 1, resPerPage = 10) => {
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    crops.slice(start, end).forEach(renderCrop);
    if(crops.length > 9){
        renderButtons(page, crops.length, resPerPage)
    }
    buildAccordion()
    
}