import { elements } from './base';

export const renderItem = (growingChoice, crop) => {
    if(growingChoice === 'indoor'){
    let markup = `
        <li class="indoor__item" data-itemid=${crop.id}>
            <div>${crop.common}
                <!-- <div class="indoor__date__start">
                </div>
                <div class="indoor__date__end">
                </div> -->
                <button class="indoor__delete btn-tiny">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-cross"></use>
                    </svg>
                </button>
            </div>
        </li>
    `;
    elements.indoorSelection.insertAdjacentHTML('beforeend', markup);} else if(growingChoice === 'sow'){
        let markup = `
        <li class="sow__item" data-itemid=${crop.id}>
            <div>${crop.common}
                <!-- <div class="sow__date__start"></div>
                <div class="sow__date__end"></div> -->
                <button class="sow__delete btn-tiny">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-cross"></use>
                    </svg>
                </button>
            </div>
        </li>
        `;
        elements.sowSelection.insertAdjacentHTML('beforeend', markup);
    } else if (growingChoice === 'start'){
        let markup = `
        <li class="start__item" data-itemid=${crop.id}>
            <div>${crop.common}
                <!-- <div class="start__date__start"></div>
                <div class="start__date__end"></div> -->
                <button class="start__delete btn-tiny">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-cross"></use>
                    </svg>
                </button>
            </div>
        </li>
        `;
        elements.startSelection.insertAdjacentHTML('beforeend', markup);
        }
};

export const deleteItem = id => {
    const item = document.querySelector(`[data-itemid="${id}"]`);
    if (item) item.parentElement.removeChild(item);
};
