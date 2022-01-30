import { fetchCountries } from './js/fetchCountries';
import heandleCountry from './country.hbs';
import countryInfo from './current_country.hbs'
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
            
            clearHtml()

            const countryLength = country.length;

            if (countryLength > 1 && countryLength < 10) {

                refs.list.insertAdjacentHTML('beforeend', heandleCountry(country));

            } else if (countryLength === 1) {

                refs.divContainer.insertAdjacentHTML('beforeend', countryInfo(country));

            } else if (countryLength > 10) {

                Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
                
            } else {

                Notiflix.Notify.failure("Oops, there is no country with that name")
                
            }
            
        })
        // .catch(Notiflix.Notify.failure("Oops, there is no country with that name"))
        // Не работает помоги)))
}

function clearHtml() {
    refs.divContainer.innerHTML = '';
    refs.list.innerHTML = '';
}

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));