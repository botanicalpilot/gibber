import { elements } from './base';

export const renderItem = item => {
    const markup = `
    <li class="indoor__item">
        <div>${item.crop}
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
    elements.shopping.insertAdjacentHTML('beforeend', markup);
};

export const deleteItem = id => {
    const item = document.querySelector(`[data-itemid="${id}"]`);
    if (item) item.parentElement.removeChild(item);
};