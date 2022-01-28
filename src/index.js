import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import heandleCountry from './country.hbs';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box')
}

console.log(fetchCountries('ukraine'))