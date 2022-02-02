import { fetchCountries } from './js/fetchCountries';
import heandleCountry from './country.hbs';
import countryInfo from './current_country.hbs';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    list: document.querySelector('.country-list'),
    divContainer: document.querySelector('.country-info')
}

function onInput(event) {

    const value = event.target.value.trim();
    
    clearHtml()
    
    fetchCountries(value)
        .then(country => {

            const countryLength = country.length;

            inputChackValue(value);

            clearHtml();

            if (!countryLength) {

                Notiflix.Notify.failure("Oops, there is no country with that name");

            } else if (countryLength >= 2 && countryLength < 10) {
                refs.list.insertAdjacentHTML('beforeend', heandleCountry(country));

            } else if (countryLength === 1) {

                refs.divContainer.insertAdjacentHTML('beforeend', countryInfo(country));

            } else if (countryLength > 10) {

                Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");

            }
            
        })
}

function clearHtml() {
    refs.divContainer.innerHTML = '';
    refs.list.innerHTML = '';
}

function inputChackValue(value) {
    if (value === '') {
        Notiflix.Notify.info('Please enter country');
    }
}

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));