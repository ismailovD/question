 
class Continue  {
    constructor(option){
        this.btns = document.querySelectorAll(option.el); 
        this.dashboards = document.querySelectorAll('.dashboard'); 
        this.title = document.querySelector('.title');
        this.panel =  document.querySelector('.bottom__panel');
        this.parent = option.parent;
        this.curentPage = document.querySelector('.curent__page');
        this.maxPage = document.querySelector('.max__page');
        this.max = document.querySelectorAll('.' + this.parent).length - 1;  
        this.sample = document.querySelector('template').content.cloneNode(true); 
        this.btns.forEach(btn => {
            
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.changeContent(btn)
            })
        })
         
    } 
    hideDashboard(){
        for(let i = 0; i< this.dashboards.length; i++){
            setTimeout(() => {
                this.dashboards[i].classList.add('hide')
            }, ((200/(i + 1))))
            setTimeout(() => {
                this.dashboards[i].classList.remove('hide')
            }, ((i * 100) + 400))
        }
    }
    changeContent(item){
        let parent = item.closest('.' + this.parent),
        nextElemeent = parent.nextElementSibling; 
        if(nextElemeent){
        let index = [...parent.parentNode.children].indexOf(parent); 
        let     parentId = nextElemeent.getAttribute('id'),
                text = this.sample.querySelector(`[data-id=${parentId}]`);
        parent.classList.remove('show');
        parent.classList.add('slide-up');
        nextElemeent.classList.add('show'); 
        nextElemeent.classList.remove('slide-down'); 
        this.title.classList.add('hide') 
        setTimeout(() => {  this.title.innerHTML = text.innerHTML; this.title.classList.add('change__size') }, 200) 
        setTimeout(() => { this.title.classList.remove('hide');this.panel.classList.remove('dont-show');}, 300) 
        this.curentPage.innerHTML = ++index;
        this.maxPage.innerHTML = this.max;
        this.hideDashboard()
    };
    }
}

const btnContinue = new Continue({
    el: '.btn__continue',
    parent : 'right__content', 
})
 

class FillNum{
    constructor(option){
        this.numInp = document.querySelectorAll(option.el); 
        this.min = 0; 
        this.numInp.forEach(elem => {
            let input = elem.querySelector('input'),
                btnTop = elem.querySelector('.number__top'),  
                btnBottom = elem.querySelector('.number__bottom');   
            input.addEventListener('input', () => {
                let Temp = input.value.replace(/[^\d]/g, '').substring(0,16); 
                input.value = Temp;
            })  
            btnTop.addEventListener('click', () => {
                 input.value = Number(input.value) + 1
            })
            btnBottom.addEventListener('click', () => {
                if(input.value > this.min) {
                     input.value -= 1
                }
                
            })
        })
       
    }
     
     
}

const inpNum = new FillNum({
    el: '.number'
})

class Time {
    constructor(option){
        this.elem = document.querySelector(option.el); 
        this.setTime();
    }
    setTime(){
       let  date = new Date(),
            hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours(),
            minutes =  date.getMinutes(),
            seconds =  date.getSeconds(); 
        this.elem.innerHTML = `${hours}:${minutes}:${seconds}`; 
        
    }
}

const curentTime = document.querySelector('.time');

function setTime () {
    let     date = new Date(),
            hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours(),
            minutes =  date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes(),
            seconds =  date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds(); 
    curentTime.innerHTML = `${hours}:${minutes}:${seconds}`;
    setTimeout(setTime, 1000)
}

setTime ();