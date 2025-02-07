const cuteTexts = [
    `<div class="slider_caption">
        <span>
            Desde que estás a mi lado, mi vida empezó a sonar así y quisiera saber si quisieras escchar esta canción conmigo en vivo 🥰
        </span>
        <div class="btn-container">
            <button id="next" class="btn btn-primary btn_slide">¡Claro que sí!</button>
        </div>
    </div>`,
    `<div class="slider_caption">
    <span>
        Ha sido un viaje increíble contigo y hay un evento cercano ahora. y esta es la pregunta más importante<BR>
        <h2>¿Serías mi valentin?</h2>
    </span>
    <div class="btn-container">
        <button id="si" class="btn btn-primary btn_slide">¡Me encantaría, amor! 💕</button>
        <button id="no" class="btn btn-danger btn_slide">Nope 😌</button>
    </div>
    </div>`,
]

const messagesTryAgain = [
    'Vaya parece que no viste el botón',
    'Okay ahora ya es más grande',
    'Vuelve a intentarlo, encontrarás la respuesta correcta',
    '¡Vaya! de verdad quieres ir por este camino',
    'Tienes otra oportunidad 😁'
]

const images = [
    "./assets/media/be_my_valentine.jpg",
    "./assets/media/fireworks.gif"
];

const animateClasses = [
    'animate__backInLeft',
    'animate__backInRight',
    'animate__bounceInDown',
    'animate__rotateIn',
    'animate__zoomInUp'
]

const heights = [25, 30, 45, 65, 70, 100];
const widths = [30, 40, 60, 85, 90, 100];

const container = document.querySelector('#container');

let counterQuestion = 0;

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

const changeSlide = () => {
    if( counterQuestion > 0 ) {
        container.removeChild( document.querySelector('.slider-area') );
    }
    const sliderArea = document.createElement('div');
    sliderArea.className = `slider-area animate__animated ${ animateClasses[( Math.random() * 73437 | 0 ) % 5] }`;
    sliderArea.innerHTML = cuteTexts[counterQuestion];

    document.body.style = `
    background-image: url("${images[counterQuestion]}");
    margin-top: 0px;
    background-repeat: no-repeat;
    background-position: center 80%;
    background-size: cover;
    background-attachment: fixed;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px;
    margin: 0px;
    `;

    container.appendChild( sliderArea );

    let msgNoCounter = 0

    const buttonNext = document.querySelector('#next');
    const buttonSi = document.querySelector('#si');
    const buttonNo = document.querySelector('#no');
    const btnNoWidth = buttonNo?.offsetWidth;
    const btnNoHeight = buttonNo?.offsetHeight;

    const maxWidth = windowWidth - btnNoWidth;
    const maxHeigth = windowHeight - btnNoHeight;

    
    if(counterQuestion < 1) {
        buttonNext.addEventListener( 'click', (e) => {
            e.preventDefault();
            counterQuestion++;
            changeSlide()
        });
    }
    else {
        buttonSi.addEventListener( 'click', (e) => {
            e.preventDefault();
            console.log("change page");
            window.location.replace('said_yes.html');
        })

        buttonNo.addEventListener( 'click', (e) => {
            e.preventDefault();
            buttonNo.style = "background-color: transparent"
            buttonNo.style.position = 'absolute';
            buttonNo.style.right = `${ ( Math.random() * 73437 | 0 ) % maxWidth }px`;
            buttonNo.style.top = `${ ( Math.random() * 73437 | 0 ) % maxHeigth }px`;
            buttonNo.classList.add( 'btn-no-click' )
            console.log("width: ", ( Math.abs((widths[msgNoCounter < 5 ? msgNoCounter : 5] / 2) - 50)));
            console.log("heigth: ", ( Math.abs((heights[msgNoCounter < 5 ? msgNoCounter : 5] / 2) - 50)));
            buttonSi.style["margin-top"] = '0px';
            buttonSi.style.position = 'absolute';
            buttonSi.style.right = `${ Math.abs((widths[msgNoCounter < 5 ? msgNoCounter : 5] / 2) - 50) }vw`
            buttonSi.style.top = `${ Math.abs((heights[msgNoCounter < 5 ? msgNoCounter : 5] / 2) - 50) }vh`
            buttonSi.style.height = `${ heights[msgNoCounter < 5 ? msgNoCounter : 5] }vh`;
            buttonSi.style.width = `${ widths[msgNoCounter < 5 ? msgNoCounter : 5] }vw`;
    
            setTimeout( () => {
                buttonNo.classList.remove( 'btn-no-click' );
                alert(messagesTryAgain[msgNoCounter % 5]);
                msgNoCounter ++;
            }, 300);
        })

    }

}

changeSlide();