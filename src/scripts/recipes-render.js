const { API } = require('@/lib/api');

const recipesList = document.querySelector('.recipe-cards_wrapper');

populateRecipesList();

async function populateRecipesList() {
  try {
    const recipesData = await API.fetchRecipes();
    const recipeResult = recipesData.results;

    const elements = recipeResult.map(renderRecipeCard);

    recipesList.append(...elements);
  } catch (error) {
    console.error('Error fetching recipes;', error);
    throw error;
  }
}

function renderRecipeCard(recipeData) {
  const recipeCard = document.createElement('li');
  recipeCard.classList.add('recipe-card');
  recipeCard.style.backgroundImage = `linear-gradient(
          1deg,
          rgba(5, 5, 5, 0.6) 0%,
          rgba(5, 5, 5, 0) 100%
        ),
        url(${recipeData.preview})`;

  const recipeCardTitle = document.createElement('h2');
  recipeCardTitle.textContent = recipeData.title;
  recipeCard.appendChild(recipeCardTitle);

  const recipeCardParagraph = document.createElement('p');
  recipeCardParagraph.textContent = recipeData.description;
  recipeCard.appendChild(recipeCardParagraph);

  const svgHeart = document.createElement('span');
  svgHeart.classList.add('favourite-heart');
  svgHeart.innerHTML = `
        <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.9937 4.70783C9.16096 2.5652 6.10475 1.98884 3.80845 3.95085C1.51215 5.91285 1.18887 9.19323 2.99216 11.5137C4.49148 13.443 9.02894 17.5121 10.5161 18.8291C10.6825 18.9764 10.7656 19.0501 10.8627 19.0791C10.9474 19.1043 11.04 19.1043 11.1247 19.0791C11.2218 19.0501 11.305 18.9764 11.4713 18.8291C12.9585 17.5121 17.4959 13.443 18.9952 11.5137C20.7985 9.19323 20.5147 5.89221 18.179 3.95085C15.8432 2.00948 12.8264 2.5652 10.9937 4.70783Z"
        stroke="#F8F8F8"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>`;
  recipeCard.appendChild(svgHeart);

  ///////////////////////////////////////////////////////
  const cardBottomWrapper = document.createElement('div');
  cardBottomWrapper.classList.add('card-bottom__block-wrapper');
  recipeCard.appendChild(cardBottomWrapper);
  ///////////////////////////////////////////

  const ratingWrapper = document.createElement('div');
  ratingWrapper.classList.add('card-bottom__rating-wrapper');
  cardBottomWrapper.appendChild(ratingWrapper);

  const ratingNumber = document.createElement('span');
  ratingNumber.classList.add('rating-number');
  ratingNumber.textContent = recipeData.rating;
  ratingWrapper.appendChild(ratingNumber);

  const ratingStarsList = document.createElement('ul');
  ratingStarsList.classList.add('recipe-card_rating-stars-list');
  ratingWrapper.appendChild(ratingStarsList);

  // stars
  const numStars = Math.round(recipeData.rating);
  for (let i = 0; i < 5; i += 1) {
    const starElement = document.createElement('li');
    starElement.classList.add('star');
    starElement.innerHTML = `
                    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
    >
      <path
        d="M6.04894 1.42705C6.3483 0.505742 7.6517 0.505741 7.95106 1.42705L8.79611 4.02786C8.92999 4.43989 9.31394 4.71885 9.74717 4.71885H12.4818C13.4505 4.71885 13.8533 5.95846 13.0696 6.52786L10.8572 8.13525C10.5067 8.3899 10.3601 8.84127 10.494 9.25329L11.339 11.8541C11.6384 12.7754 10.5839 13.5415 9.80017 12.9721L7.58779 11.3647C7.2373 11.1101 6.7627 11.1101 6.41222 11.3647L4.19983 12.9721C3.41612 13.5415 2.36164 12.7754 2.66099 11.8541L3.50604 9.25329C3.63992 8.84127 3.49326 8.3899 3.14277 8.13525L0.930391 6.52787C0.146677 5.95846 0.549452 4.71885 1.51818 4.71885H4.25283C4.68606 4.71885 5.07001 4.43989 5.20389 4.02786L6.04894 1.42705Z"
      />
    </svg>`;

    if (i < numStars) {
      starElement.classList.add('filled');
    }
    ratingStarsList.appendChild(starElement);
  }

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.textContent = 'See recipe';
  btn.classList.add('see-recipe_button');
  cardBottomWrapper.appendChild(btn);

  return recipeCard;
}

/////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

// document.addEventListener('DOMContentLoaded', function () {
//   new SlimSelect({
//     select: '#selectElement',
//   });

//   const select = document.querySelector('#selectElement');
//   console.log(select);

//   const addOption = document.createElement('option');
//   addOption.textContent = 'bebra';

//   select.appendChild(addOption);
// });

document.addEventListener('DOMContentLoaded', function () {
  new SlimSelect({
    select: '#time',
  });

  new SlimSelect({
    select: '#area',
  });

  new SlimSelect({
    select: '#ingredients',
  });
});
