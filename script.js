let searchform = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchform.classList.toggle('active');
    navbar.classList.remove('active');
}

let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchform.classList.remove('active');
}

let slides = document.querySelectorAll('.home .slides-container .slide');
let index = 0

function next(){
    slides[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
}

function prev(){
    slides[index].classList.remove('active');
    index = (index - 1 + slides.length) % slides.length;
    slides[index].classList.add('active');
}

window.onscroll = () =>{
    searchform.classList.remove('active');
    navbar.classList.remove('active');

    if(window.scrollY > 30){
        document.querySelector('header').classList.add('header-active');
    }
    else{
        document.querySelector('header').classList.remove('header-active');
    }

}

var swiper = new Swiper(".featured-slider", {
    loop: true,
    centeredSlides: true,
    spaceBetween: 20,
    autoplay:{
        delay: 9500,
        disableOnInteraction:false,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    breakpoints:{
        0:{
            slidesPerView: 1,
        },
        450:{
            slidesPerView: 2,
        },
        768:{
            slidesPerView: 3,
        },
        1200:{
            slidesPerView: 4,
        },
    },
});


const cart = JSON.parse(localStorage.getItem('cart')) || [];


const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const cartButton = document.getElementById('cart-btn');
const closeCartModal = document.getElementById('close-cart-modal');
const checkoutButton = document.getElementById('checkout-button');


function updateCartUI() {
    cartItemsContainer.innerHTML = ''; 
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Корзина порожня</p>';
        totalPriceElement.innerText = 'Загальна сума: 0 ₴';
        return;
    }

    let total = 0;
    cart.forEach((item, index) => {
        const itemRow = document.createElement('div');
        itemRow.classList.add('cart-item');
        itemRow.innerHTML = `
            <p>${item.name} - ${item.quantity} x ${item.price} ₴</p>
            <button class="btn remove-btn" data-index="${index}">Видалити</button>
        `;
        cartItemsContainer.appendChild(itemRow);
        total += item.quantity * item.price;
    });

    totalPriceElement.innerText = `Загальна сума: ${total} ₴`;

    
    document.querySelectorAll('.remove-btn').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartUI();
        });
    });
}


cartButton.addEventListener('click', () => {
    updateCartUI();
    cartModal.style.display = 'flex';
});


closeCartModal.addEventListener('click', () => {
    cartModal.style.display = 'none';
});


document.querySelectorAll('.btn[data-lang-key="cart"]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const productCard = e.target.closest('.box');
        if (!productCard) {
            console.error('Не знайдено елемент товару');
            return;
        }

        const productName = productCard.querySelector('h3')?.innerText || "Без назви";
        const productPrice = parseFloat(
            productCard.querySelector('.price')?.innerText.replace(/[^\d]/g, '') || 0
        );

        const existingProduct = cart.find((item) => item.name === productName);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({ name: productName, price: productPrice, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${productName} додано до кошика!`);
    });
});


checkoutButton.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Корзина порожня. Додайте товари!');
        return;
    }

    alert('Дякуємо за ваше замовлення!');
    cart.length = 0;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
});





document.getElementById('language-select').addEventListener('change', function() {
    const lang = this.value;
    document.querySelectorAll('[data-lang-key]').forEach(el => {
        const key = el.getAttribute('data-lang-key');
        el.innerText = translations[lang][key];
    });});
    const translations = {
        en: {
            title: "TechnoMax",
            home: "Home",
            products: "Products",
            rec_products: "Recommended products",
            contact: "Contact",
           
            action: "New holiday promotion",
            action2: "SUPER DISCOUNT",
            asus:"Asus Vivobook Go 15 is a light and stylish laptop with a 15.6-inch display that provides a clear image. equipped with a modern processor that guarantees fast and stable performance, it is suitable for study, work and entertainment. thanks to the ergonomic keyboard and long battery life, the device is convenient for everyday use",
            playst:"PlayStation 5 (PS5) is a modern game console from Sony, released in 2020. It provides powerful graphics thanks to ray tracing technology, support for 4K resolution, fast loading thanks to SSD storage, as well as an innovative DualSense gamepad with adaptive triggers and tactile feedback",
            buy:"Buy now",
            last:"Latest products",
            planshet:"Tablet Lenovo Tab P12",
             phone:"Smartphone Xiaomi Redmi Note 13 8/256Gb Midnight Black",
             drone:"Quadcopter DJI Mini 3 Pro + remote control DJI RC",
             notebook:"Laptop Dell XPS 13",
             pk:"Gaming PC ASUS ROG Strix G15",
             moni:"Monitor LG UltraGear 27GN950",
             rec:"Recommended products",
             clava:"Mechanical keyboard Razer BlackWidow V3 Pro",
             cart:"Add to cart",
             mouse:"Mouse Logitech MX Master 3",
             proc:"Processor Intel Core i9-13900K",
             videocard:"Video card NVIDIA GeForce RTX 4080",
             ssd:"SSD Samsung 980 PRO 2TB",
             nau:"Headphone HyperX Cloud Alpha Wireless",
             get:"Contact us",
             fill:"Fill in",
             about:"About us",
             techno:"CubeTech is your reliable partner in the world of modern technologies. We offer a wide selection of computer equipment, gadgets and accessories from leading manufacturers. Our values ​​are quality, availability and customer orientation",
             pos:"Quick calls",
             posu:"Call to the social network",
             footer:"CubeTech © 2025. All rights reserved",
             
        },
            
           
        uk: {
            title: "TechnoMax",
            home: "Головна",
            products: "Продукція",
            contact: "Контакти",
            rec_products: "Рекомендовані товари",
            action: "Нова святкова акція",
            action2:"СУПЕР ЗНИЖКА",
            asus:"Asus Vivobook Go 15-це легкий та стильний ноутбук із 15.6-дюймовим дисплеєм, що забезпечує чітке зображення. оснащений сучасним процесором, який гарантує швидку та стабільну роботу, він підходить для навчання, роботи й розваг. завдяки ергономічній клавіатурі та тривалому часу автономної роботи, пристрій зручний в повсякденному використанні",
            playst:"PlayStation 5 (PS5) — це сучасна ігрова консоль від Sony, випущена в 2020 році. Вона забезпечує потужну графіку завдяки технології трасування променів, підтримку 4K-роздільної здатності, швидке завантаження завдяки SSD-накопичувачу, також інноваційний геймпад DualSense з адаптивними тригерами й тактильною віддачею",
            buy:"Придбати",
        last:"Остання продукція",
        planshet:"Планшет Lenovo Tab P12",
        phone:"Смартфон Xiaomi Redmi Note 13 8/256Gb Midnight Black",
        drone:"Квадрокоптер DJI Mini 3 Pro + пульт DJI RC",
        notebook:"Ноутбук Dell XPS 13",
        pk:"Ігровий ПК ASUS ROG Strix G15",
        moni:"Монітор LG UltraGear 27GN950",
        rec:"Рекомендовані товари",
        clava:"Механічна клавіатура Razer BlackWidow V3 Pro",
       cart:"Додати до кошика",
       mouse:"Миша Logitech MX Master 3",
       proc:"Процесор Intel Core i9-13900K",
       videocard:"Відеокарта NVIDIA GeForce RTX 4080",
       ssd:"SSD Samsung 980 PRO 2TB",
       nau:"Навушники HyperX Cloud Alpha Wireless",
       get:"Зв'яжіться з нами",
       fill:"Заповніть",
       about:"Про нас",
       techno:"CubeTech — це ваш надійний партнер у світі сучасних технологій. Ми пропонуємо широкий вибір комп’ютерної техніки, гаджетів та аксесуарів від провідних виробників. Наші цінності — якість, доступність та клієнтоорієнтованість",
       pos:"Швидкі покликання",
       posu:"Покликання на соц-мережу",
       footer:"CubeTech © 2025. Усі права захищено",
        }
    };
