$('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    dots:true,
    responsive:{
        400:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:5
        }
    }
})


let webMenu = document.getElementsByClassName('right_thead');
let menu = document.getElementsByClassName('menu__btn__mobile');
menu[0].addEventListener('click', mobileMenu, false);

function mobileMenu(){
    // webMenu[0].classList.add('class', 'menu__mobile');
    webMenu[0].setAttribute('class', 'menu__mobile');
       menu[0].setAttribute('class', 'none');
    webMenu[0].style.alignItems = 'flex-end';
    // webMenu[0].style.flexDirection = 'column-reverse';
}