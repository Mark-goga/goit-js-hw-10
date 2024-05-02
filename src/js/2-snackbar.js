import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const formEl = document.querySelector(".form");
const inputDelay = formEl.querySelector('input[name="delay"]');
const fieldSetEl = formEl.querySelector("fieldset");
let valueDelay;
let valuePomise;
inputDelay.addEventListener('input', () => {
    valueDelay = inputDelay.value;
});
fieldSetEl.addEventListener('click', evn => {
    valuePomise = evn.target.value;
})
formEl.addEventListener('submit', (evn) => {
    evn.preventDefault();
    const promise = new Promise((resolve, reject) => {
        if (valuePomise === "fulfilled") {
            resolve(`✅ Fulfilled promise in ${valueDelay}ms`);
        } else {
            reject(`❌ Rejected promise in ${valueDelay}ms`);
        }
    });

    setTimeout(() => {
        promise.then(value => {
            iziToast.show({title: value , position: 'topRight' , backgroundColor: 'green'});
        }).catch(error => {
            iziToast.show({title: error , position: 'topRight' , backgroundColor: 'red'});
        });
    }, valueDelay);
    formEl.reset();
})
