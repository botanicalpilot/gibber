import { elements } from './base';
import * as searchView from './searchView';

export const renderItem = (growingChoice, crop) => {
    // startDate = splitDate(crop.start)
    // endDate = splitDate(crop.end)
    let markup = `
        <li class="crop__item" data-itemid=${crop.id}>
            <div class="crop">
                <div class="cropTitle">${crop.title}</div>
                <div class="growingChoice">${growingChoice}</div>
                <div class="cropButtons">
                    <button class="crop__delete btn-inline">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-cross"></use>
                        </svg>
                    </button>
                    <div class=".new-cal" data-calid=${crop.id}></div>
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

