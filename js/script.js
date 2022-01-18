 

const timer = document.querySelector('.timer');
let maxTime = timer.getAttribute('data-time');
 
function changeTime () { 
        timer.innerText = maxTime;
        if(maxTime > 0) {
            maxTime--;
        }else {
            location.reload()
        } 
        setTimeout(changeTime, 1000)
}
class Continue {
    constructor(option) {
        this.btns = document.querySelectorAll(option.el);
        this.dashboards = document.querySelectorAll('.dashboard');
        this.title = document.querySelector('.title');
        this.panel = document.querySelector('.bottom__panel');
        this.parent = option.parent;
        this.curentPage = document.querySelector('.curent__page');
        this.maxPage = document.querySelector('.max__page');
        this.max = document.querySelectorAll('.' + this.parent).length - 1;
        this.sample = document.querySelector('template').content.cloneNode(true);
        this.mainContent = document.querySelector('.content');
        this.finalyContent = document.querySelector('.finaly');

        this.btns.forEach(btn => {
            if(btn.hasAttribute('id')){
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.changeMainContent()
                })
            }else {
                 btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.changeContent(btn)
                })
            }
           
        })

    }
    hideDashboard() {
        let src1 = this.dashboards[0].getAttribute('src'),
            src2 = this.dashboards[1].getAttribute('src');
       
        for (let i = 0; i < this.dashboards.length; i++) {
            setTimeout(() => {
                this.dashboards[i].classList.add('hide');
                
            }, ((200 / (i + 1))))
            setTimeout(() => { 
                this.dashboards[0].setAttribute('src', src2) 
                this.dashboards[1].setAttribute('src', src1) 
                this.dashboards[i].classList.remove('hide')
            }, ((i * 100) + 400))
        }
    }
    changeContent(item) {
        let parent = item.closest('.' + this.parent),
            nextElemeent = parent.nextElementSibling;
        if (nextElemeent) {
            let index = [...parent.parentNode.children].indexOf(parent);
            let parentId = nextElemeent.getAttribute('id'),
                text = this.sample.querySelector(`[data-id=${parentId}]`);
            parent.classList.remove('show');
            parent.classList.add('slide-up');
            nextElemeent.classList.add('show');
            nextElemeent.classList.remove('slide-down');
            this.title.classList.add('hide')
            setTimeout(() => { this.title.innerHTML = text.innerHTML; }, 200)
            setTimeout(() => { this.title.classList.remove('hide'); this.panel.classList.remove('dont-show'); }, 300)
            this.curentPage.innerHTML = ++index;
            this.maxPage.innerHTML = this.max;
            this.hideDashboard()
        };
    }
    changeMainContent(){
        this.mainContent.classList.add('slide-up');
        this.finalyContent.classList.remove('hidden');
        setTimeout(()=> {
            this.mainContent.classList.add('hidden');
            this.finalyContent.classList.remove('slide-down');
        },100)
        changeTime ()
    }
}

const btnContinue = new Continue({
    el: '.btn__continue',
    parent: 'right__content',
})


class FillNum {
    constructor(option) {
        this.numInp = document.querySelectorAll(option.el); 
        this.numInp.forEach(elem => {
            let input = elem.querySelector('input'),
                btnTop = elem.querySelector('.number__top'),
                btnBottom = elem.querySelector('.number__bottom');
            input.addEventListener('change', () => {
                let Temp = input.value.replace(/[^\d]/g, '').substring(0, 16);
                if(Temp > 1){
                    input.value = Temp + ' days';
                }else {
                    input.value = Temp + ' day';
                }
            })
            btnTop.addEventListener('click', () => {
                let Temp = Number(input.value.split(" ")[0]);  
                console.log(Temp);
                if(Temp > 0) {
                    input.value = Temp + 1 + ' days';
                }else {
                    input.value = Temp + 1 + ' day';
                }
            })
            btnBottom.addEventListener('click', () => {
                let Temp = Number(input.value.split(" ")[0]);  
                console.log(Temp);
                if(Temp > 2) {
                    input.value = Temp - 1 + ' days';
                }else if(Temp <= 2 && Temp > 0) {
                    input.value = Temp - 1 + ' day';
                }
            })
        })

    }


}

const inpNum = new FillNum({
    el: '.number'
})

class Time {
    constructor(option) {
        this.elem = document.querySelector(option.el);
        this.setTime();
    }
    setTime() {
        let date = new Date(),
            hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours(),
            minutes = date.getMinutes(),
            seconds = date.getSeconds();
        this.elem.innerHTML = `${hours}:${minutes}:${seconds}`;

    }
}

const curentTime = document.querySelector('.time');

function setTime() {
    let date = new Date(),
        hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours(),
        minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes(),
        seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
    curentTime.innerHTML = `${hours}:${minutes}:${seconds}`;
    setTimeout(setTime, 1000)
}

setTime();


class Question {
    constructor(option) {
        this.question = document.querySelectorAll(option.el);
        this.answer = option.answer;
        this.question.forEach(quest => {
            let inpRadio = quest.querySelectorAll('input[type=radio]');
            inpRadio.forEach(input => {
                input.addEventListener('change', () => { 
                    if (input.value === 'yes' && input.checked) {
                        quest.querySelector(this.answer).classList.add('show');
                        setTimeout(() => {
                            quest.querySelector(this.answer).classList.add('visible');
                        }, 200)
                    } else {
                        quest.querySelector(this.answer).classList.remove('visible')
                        setTimeout(() => {
                            quest.querySelector(this.answer).classList.remove('show');
                        }, 200)
                    };
                })
            })
        })
    }
}

const newQuestion = new Question({
    el: '.question',
    answer: '.answer'
})

const brands = ['DHL', 'SHIPPO', 'WareIQ', 'USPS', 'Walmart', 'Amazon', 'eBay', 'FedEx', 'Target', 'Lowe`s'];

class Add {
    constructor(option) {
        this.add = document.querySelector(option.el);
        this.input = this.add.querySelector('input');
        this.list = this.add.querySelector('.add__list');
        this.targetList = this.add.querySelector('#target__list')
        this.btn = this.add.querySelector('button');
        this.items = [];
        this.addElements = [];
        this.warning = this.add.querySelector('.add__warning');
        this.targetDelete = undefined;

        this.input.addEventListener('input', () => {
            if (this.items.length > 0) {
                this.removeItems();
            }
            if (this.input.value.length > 0) {
                let filterArr = this.filterItems(brands, this.input.value);
                if (filterArr.length > 0) {
                    this.showList(filterArr)
                } else this.hideList()
            } else this.hideList()

        })
        window.addEventListener('keydown', (e) => {
            if (this.input.value.length > 0) {
                if(e.keyCode == "13"){
                this.targetShow();
                } 
            }
            
        })
        this.btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (this.input.value.length > 0) {
                this.targetShow();
            }
        })
    }
    filterItems(arr, query) {
        return arr.filter(el => el.toLowerCase().indexOf(query.toLowerCase()) !== -1 && el[0].toLowerCase() == query[0].toLowerCase());
    }
    showList(arr) {
        this.list.classList.add('visible')
        arr = arr.sort((a, b) => {
            if (a.length > b.length) {
                return 1
            } else if (a.length < b.length) {
                return -1
            } else return 0
        })
        arr.forEach(item => {
            let sample = document.createElement('li');
            sample.classList.add('add__item');
            sample.innerText = item;
            this.list.appendChild(sample)
        })
        this.selectItem()
    }
    hideList() {
        this.list.classList.remove('visible');
        this.removeItems()
    }
    selectItem() {
        this.items = this.add.querySelectorAll('.add__item');
        this.items.forEach(el => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                this.input.value = el.textContent;
                this.hideList()
            })
        })

    }
    removeItems() {
        if (this.items.length > 0) {
            this.items.forEach(elem => {
                elem.parentNode.removeChild(elem)
            })
        }
        this.items = [];
    }
    targetShow() {

        let checkArr = this.addElements.some(el => this.input.value.toLowerCase() === el.toLowerCase() ); 
        if (checkArr) {
            this.warning.classList.add('show');
            setTimeout(() => {
                this.warning.classList.remove('show');
            }, 2000)
        } else {
            let targetELement = document.createElement('li'); 
            targetELement.classList.add('target__item');
            targetELement.innerHTML = `
            ${this.input.value}
            <button class="target__btn circle">
                <svg class="target__icon">
                    <use xlink:href="./svg/sprite.svg#close"></use>
                </svg> 
            </button>  
        `
            this.targetList.appendChild(targetELement);
            this.addElements.push(this.input.value);
            this.input.value = '';

            let deleteBtn = targetELement.querySelector('.target__btn');
            deleteBtn.addEventListener('click', () => {
                this.addElements = this.addElements.filter(check => check !== targetELement.innerText);
                targetELement.parentNode.removeChild(targetELement); 
            })
           
        }
        
    }
     
}


const formSelect = new Add({
    el: '.add'
})

const mySwipe = new Swiper('.bookingSwiper', {
    slidesPerView: 1,
    spaceBetween: 30, 
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        450: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 3,
            
        }
    }
})


