/* ===================================
   LOADING SCREEN
=================================== */

window.addEventListener("load", () => {

    const loader =
    document.getElementById("loader");

    if(loader){

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.style.display = "none";

        },500);

    }

});

/* ===================================
   DARK MODE
=================================== */

const themeBtn =
document.getElementById("themeBtn");

const savedTheme =
localStorage.getItem("theme");

if(savedTheme === "dark"){

    document.body.classList.add("dark");

    themeBtn.innerHTML =
    '<i class="fa-solid fa-sun"></i>';

}

if(themeBtn){

    themeBtn.addEventListener("click",() => {

        document.body.classList.toggle("dark");

        if(document.body.classList.contains("dark")){

            localStorage.setItem(
                "theme",
                "dark"
            );

            themeBtn.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

            showToast(
                "Dark Mode Enabled 🌙"
            );

        }

        else{

            localStorage.setItem(
                "theme",
                "light"
            );

            themeBtn.innerHTML =
            '<i class="fa-solid fa-moon"></i>';

            showToast(
                "Light Mode Enabled ☀️"
            );

        }

    });

}

/* ===================================
   ANIMATED COUNTERS
=================================== */

const counters =
document.querySelectorAll(".counter");

const speed = 120;

counters.forEach(counter => {

    const animateCounter = () => {

        const target =
        +counter.dataset.target;

        const count =
        +counter.innerText;

        const increment =
        target / speed;

        if(count < target){

            counter.innerText =
            Math.ceil(
                count + increment
            );

            setTimeout(
                animateCounter,
                20
            );

        }

        else{

            counter.innerText =
            target.toLocaleString();

        }

    };

    animateCounter();

});

/* ===================================
   NEWSLETTER VALIDATION
=================================== */

const newsletterForm =
document.getElementById(
    "newsletterForm"
);

if(newsletterForm){

    newsletterForm.addEventListener(
    "submit",

    (e) => {

        e.preventDefault();

        const email =
        document
        .getElementById(
            "newsletterEmail"
        )
        .value
        .trim();

        const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailPattern.test(email)){

            showToast(
                "Enter a valid email address."
            );

            return;

        }

        showToast(
            "Successfully Subscribed 🎉"
        );

        newsletterForm.reset();

    });

}

/* ===================================
   TOAST NOTIFICATION
=================================== */

function showToast(message){

    const toast =
    document.createElement("div");

    toast.classList.add(
        "toast"
    );

    toast.innerText =
    message;

    document.body.appendChild(
        toast
    );

    setTimeout(() => {

        toast.classList.add(
            "show"
        );

    },100);

    setTimeout(() => {

        toast.classList.remove(
            "show"
        );

        setTimeout(() => {

            toast.remove();

        },300);

    },3000);

}

/* ===================================
   SCROLL REVEAL
=================================== */

const revealElements =
document.querySelectorAll(

".destination-card,\
.category-card,\
.stat-card,\
.testimonial"

);

const revealOnScroll = () => {

    revealElements.forEach(element => {

        const top =
        element
        .getBoundingClientRect()
        .top;

        const windowHeight =
        window.innerHeight;

        if(top < windowHeight - 100){

            element.classList.add(
                "active"
            );

        }

    });

};

window.addEventListener(
    "scroll",
    revealOnScroll
);

revealOnScroll();

/* ===================================
   DESTINATION DATABASE
=================================== */

const destinations = [

{
    name:"Maldives",
    category:"Beach",
    description:
    "Luxury tropical paradise with crystal-clear waters."
},

{
    name:"Bora Bora",
    category:"Beach",
    description:
    "Famous for turquoise lagoons and overwater villas."
},

{
    name:"Germany",
    category:"Country",
    description:
    "Engineering excellence and rich cultural heritage."
},

{
    name:"Japan",
    category:"Country",
    description:
    "Tradition blended with futuristic innovation."
},

{
    name:"Angkor Wat",
    category:"Temple",
    description:
    "World-famous architectural masterpiece."
},

{
    name:"Meenakshi Temple",
    category:"Temple",
    description:
    "Historic temple with incredible architecture."
}

];

/* ===================================
   SEARCH SUGGESTIONS
=================================== */

const searchBox =
document.getElementById(
    "searchBox"
);

if(searchBox){

    const suggestionBox =
    document.createElement("div");

    suggestionBox.classList.add(
        "suggestion-box"
    );

    searchBox.parentNode.appendChild(
        suggestionBox
    );

    searchBox.addEventListener(
        "input",

        () => {

            const value =
            searchBox.value
            .toLowerCase();

            suggestionBox.innerHTML = "";

            if(value.length === 0){

                return;

            }

            const results =
            destinations.filter(item =>

                item.name
                .toLowerCase()
                .includes(value)

            );

            results.forEach(result => {

                const div =
                document.createElement(
                    "div"
                );

                div.classList.add(
                    "suggestion-item"
                );

                div.innerText =
                result.name;

                div.addEventListener(
                    "click",

                    () => {

                        searchBox.value =
                        result.name;

                        suggestionBox.innerHTML =
                        "";

                        saveRecentSearch(
                            result.name
                        );

                    }

                );

                suggestionBox.appendChild(
                    div
                );

            });

        }

    );

}

/* ===================================
   RECENT SEARCHES
=================================== */

function saveRecentSearch(term){

    let history =

    JSON.parse(

    localStorage.getItem(
        "recentSearches"
    )

    ) || [];

    if(!history.includes(term)){

        history.unshift(term);

    }

    history =
    history.slice(0,5);

    localStorage.setItem(

        "recentSearches",

        JSON.stringify(history)

    );

}

/* ===================================
   FAVORITES
=================================== */

const favButtons =

document.querySelectorAll(

".fav-btn"

);

favButtons.forEach(button => {

    button.addEventListener(
        "click",

        () => {

            const place =

            button.dataset.name;

            let favourites =

            JSON.parse(

            localStorage.getItem(
                "favourites"
            )

            ) || [];

            if(

                favourites.includes(
                    place
                )

            ){

                showToast(
                    "Already Added ❤️"
                );

                return;

            }

            favourites.push(place);

            localStorage.setItem(

                "favourites",

                JSON.stringify(
                    favourites
                )

            );

            button.innerHTML =
            "❤️ Saved";

            showToast(
                place +
                " added to favourites."
            );

        }

    );

});

/* ===================================
   DESTINATION MODAL
=================================== */

const modal =
document.createElement("div");

modal.classList.add(
    "destination-modal"
);

modal.innerHTML = `

<div class="modal-content">

<span class="close-modal">

&times;

</span>

<h2 id="modalTitle">

</h2>

<p id="modalDescription">

</p>

</div>

`;

document.body.appendChild(
    modal
);

const detailButtons =

document.querySelectorAll(

".btn"

);

detailButtons.forEach(button => {

    button.addEventListener(
        "click",

        () => {

            const card =

            button.closest(
                ".destination-card"
            );

            if(!card) return;

            const title =
            card.querySelector(
                "h3"
            ).innerText;

            const destination =

            destinations.find(
                d =>
                d.name === title
            );

            if(destination){

                document
                .getElementById(
                    "modalTitle"
                )
                .innerText =
                destination.name;

                document
                .getElementById(
                    "modalDescription"
                )
                .innerText =
                destination.description;

                modal.classList.add(
                    "show-modal"
                );

            }

        }

    );

});

document
.querySelector(
    ".close-modal"
)
.addEventListener(

    "click",

    () => {

        modal.classList.remove(
            "show-modal"
        );

    }

);

window.addEventListener(

    "click",

    e => {

        if(e.target === modal){

            modal.classList.remove(
                "show-modal"
            );

        }

    }

);

/* ===================================
   TESTIMONIAL ROTATOR
=================================== */

const testimonials = [

{
name:"Sarah Williams",
text:
"TravelSphere helped me discover destinations I never knew existed."
},

{
name:"Michael Chen",
text:
"Beautiful design and excellent recommendations."
},

{
name:"Emma Johnson",
text:
"My favourite travel discovery platform."
}

];

let testimonialIndex = 0;

setInterval(() => {

    const testimonialText =

    document.querySelector(
        ".testimonial p"
    );

    const testimonialName =

    document.querySelector(
        ".testimonial h4"
    );

    if(
        testimonialText &&
        testimonialName
    ){

        testimonialIndex++;

        if(
            testimonialIndex >=
            testimonials.length
        ){

            testimonialIndex = 0;

        }

        testimonialText.innerText =

        testimonials[
            testimonialIndex
        ].text;

        testimonialName.innerText =

        "— " +

        testimonials[
            testimonialIndex
        ].name;

    }

},5000);
