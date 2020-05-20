import { elements } from './base';
import * as searchView from './searchView';



export const renderItem = (growingChoice, crop) => {
    // startDate = splitDate(crop.start)
    // endDate = splitDate(crop.end)
    let markup = `
        <li class="crop__item" data-itemid=${crop.id}>
            <div class="crop">${crop.title}
                <div class="growingChoice">${growingChoice}</div>
                <div class="cropDates">${crop.start} - ${crop.end}
                </div>
                <button class="crop__delete btn-tiny">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-cross"></use>
                    </svg>
                </button>
            </div>
        </li>
        
    `;
    elements.cropSelection.insertAdjacentHTML('beforeend', markup); 
};

export const deleteItem = id => {
    const item = document.querySelector(`[data-itemid="${id}"]`);
    if (item) item.parentElement.removeChild(item);
};

