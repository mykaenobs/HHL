const navbar = (function() {
    const menu = document.querySelector('.menu');
    const notFirst = document.querySelectorAll('.nav--list:not(:first-of-type)');
    const first = document.querySelector('.nav--list:first-of-type a');
    
    const nav = function() {

        menu.addEventListener('click', function() {
            for (let firsted of notFirst) {
                if (firsted.className === 'nav--list') {
                    firsted.className += ' myka';
                } else {
                    firsted.className = 'nav--list';
                }
            }
            
        });
    };


    return {
        init: function() {
            nav();
        }
    };
})();


const headerSlider = (function() {
    const imgs = Array.from(document.querySelectorAll('.header--img'));
    const prev = document.querySelector('.previous');
    const next = document.querySelector('.next');
    const dots = document.querySelectorAll('.header--dots span');
    let active;
    let newActive;
    let init;
    let clickable = true;

    const slider = function() {

        imgs.forEach(function(img) {
            img.addEventListener('transitionend', function() {
                if (img === active && !clickable) {
                    clickable = true
                    img.className = 'header--img';
                }
            });
        });
        
        next.addEventListener('click', function() { changeSlide(true) });
        prev.addEventListener('click', function() { changeSlide(false) });

        init = setInterval(function() { changeSlide(true) }, 15000);

        for (let dot of dots) {
            dot.addEventListener('click', function() {
                if (clickable) {
                    clickable = false;

                    active = document.querySelector('.header--img.active')
                    newActive = imgs[this.dataset.id];
                    active.classList.add('slider-out-left');
                    newActive.classList.add('slider-in-right', 'active');


                    clearInterval(init);
                    changeInterval();
                    slideDots(this);
                }
            });
        }
    };

    const slideDots = function(ts) {
        for (let dot of dots) 
            dot.classList.remove('active');
        
            
        ts.classList.add('active');
    };
    
    const changeInterval = function() {
        init = setInterval(function() { changeSlide(true) }, 15000);
    };


    const changeSlide = function(state) {
        if (clickable) {
            clickable = false
            active = document.querySelector('.header--img.active')
            const activeSlideIndex = imgs.indexOf(active);
            if (state) {
                newActive = imgs[(activeSlideIndex + 1) % imgs.length];

                active.classList.add('slider-out-left');
                newActive.classList.add('slider-in-right', 'active');

                slideDots(dots[(activeSlideIndex + 1) % imgs.length]);
            } else {
                newActive = imgs[(activeSlideIndex - 1 + imgs.length) % imgs.length];

                active.classList.add('slider-out-right');
                newActive.classList.add('slider-in-left', 'active');
                
                slideDots(dots[(activeSlideIndex - 1 + imgs.length) % imgs.length]);
            }
            clearInterval(init);
            changeInterval();
        }
    };

    return {
        init: function() {
            slider();
        }
    };
})();

const cardSlide = (function() {

    
    const left = document.querySelector('.left');
    const right = document.querySelector('.right');

    const gliders = function() {
        new Glider(document.querySelector('.glider'), {
            slidesToShow: 1,
            slidesToScroll: 1,
            draggable: true,
            arrows: {
                prev: '.left',
                next: '.right'
            },
            responsive: [
                {
                    breakpoint: 500,
                    settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    itemWidth: 150,
                    duration: 0.25
                    }
                }, 
                {
                    breakpoint: 775,
                    settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    itemWidth: 150,
                    duration: 0.25
                    }
                }, 
                {
                    breakpoint: 1024,
                    settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                    itemWidth: 150,
                    duration: 0.25
                    }
                }, 
                {
                    breakpoint: 1180,
                    settings: {
                    slidesToShow: 5,
                    slidesToScroll: 2,
                    itemWidth: 150,
                    duration: 0.25
                    }
                }
            ]
        });
    };

    return {
        init: function() {
            gliders();
        }
    };
})();


document.documentElement.style.overflow = 'hidden';
document.addEventListener('DOMContentLoaded', function() {
    navbar.init();
    headerSlider.init();
    cardSlide.init();

    document.documentElement.style.overflow = 'auto';
    document.querySelector('.loader').style.display = 'none';
    console.log('yes done loading');
})