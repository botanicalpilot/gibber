import { elements } from './base';
import * as searchView from './searchView';

export const renderItem = (growingChoice, crop) => {
    // startDate = splitDate(crop.start)
    // endDate = splitDate(crop.end)
    let markup = `
        <li class="crop__item" data-itemid=${crop.id}>
            <div class="crop">
                <figure>
                    <img class="cropImage" src="https://thallus-api.herokuapp.com/${crop.image}" alt="${crop.title}">
                </figure>
                <div class="cropTitle">${crop.title}</div>
                <div class="growingChoice">Growing Method: ${growingChoice}</div>
                <div class="cropButtons">
                    <div class=".new-cal" data-calid="${crop.id}"></div>
                </div>
                <div class="cropButtons">
                    <button class="crop__delete btn-inline">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-cross"></use>
                        </svg>
                    </button>
                </div>
            </div>
            <button class="cropMobile" onclick="showModal('${crop.id}')">
                <figure>
                    <img class="cropImage" src="https://thallus-api.herokuapp.com/${crop.image}" alt="${crop.title}">
                </figure>
                <div class="cropTitle">${crop.title}</div>
            </button>
            <div class="cropModal" id="modal-${crop.id}">
                <div class="modalContent">
                    <h1 class="cropTitle" id="modalTitle">${crop.title}</h1>
                    <div class="growingChoice">Growing Method: ${growingChoice}</div>
                    <div class="mobileButtonContainer">
                        <button class="cropButtons btn-inline">
                            <div class=".new-cal" mobile-calid="${crop.id}"></div>
                        </button>
                        <div class="cropButtons">
                            <button class="crop__delete btn-inline">Delete Crop</button>
                        </div>
                    </div>
                </div>
            </div>
        </li>
        
    `;
    elements.cropSelection.insertAdjacentHTML('beforeend', markup); 
};

export const deleteItem = id => {
    const item = document.querySelector(`[data-itemid="${id}"]`);
    if (item) item.parentElement.removeChild(item);
};

