document.addEventListener('DOMContentLoaded',()=> {{
    fetchData()
}})

const fetchData = async () => {

    console.log('Obteniuendo datos')

    try {
        loadingDara(true);
        const res = await fetch("https://rickandmortyapi.com/api/character?page=2");
        const data = await res.json();
        //console.log('data', data.results)
        pintarCards(data);
    } catch (error) {
        console.log('error', error)
        
    } finally {
        loadingDara(false);
    }
};

const pintarCards = data => {
    const card = document.getElementById('carga-dinamica');
    const templateCard = document.getElementById('template-card').content;
    const fragment = document.createDocumentFragment();

    data.results.forEach(item => {
       const clone = templateCard.cloneNode(true);
        clone.querySelector("h5").textContent = item.name;
        clone.querySelector("p").textContent = item.species;
        clone.querySelector("img").setAttribute('src',item.image) ;

        //guardar en el fragment para evitar el reflow
        fragment.appendChild(clone);
    });

    card.appendChild(fragment);
}

const loadingDara = estado => {
    const loading = document.getElementById('loading');
    if (estado) {
        loading.classList.remove('d-none');
    } else {
        loading.classList.add('d-none');
    }

}