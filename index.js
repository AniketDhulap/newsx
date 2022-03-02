fetchNews();

    let allNews = document.getElementById('all');
    let india = document.getElementById('india');
    let unitedState = document.getElementById('unitedState');
    let southKorea = document.getElementById('sk');
    let newZealand = document.getElementById('nz');
    let australia = document.getElementById('australia');
    let toi = document.getElementById('toi');
    let usaToday = document.getElementById('usatoday');
    let news24 = document.getElementById('news24');
    let bbc = document.getElementById('bbc');

india.addEventListener('click',()=>{
  localStorage.setItem('getSource','in');
  fetchNews()
});
unitedState.addEventListener('click',()=>{
  localStorage.setItem('getSource','us');
  fetchNews()
});
southKorea.addEventListener('click',()=>{
  localStorage.setItem('getSource','sk');
  fetchNews()
});
newZealand.addEventListener('click',()=>{
  localStorage.setItem('getSource','nz');
  fetchNews()
});
australia.addEventListener('click',()=>{
  localStorage.setItem('getSource','au');
  fetchNews()
});
toi.addEventListener('click',()=>{
  localStorage.setItem('getSource','toi');
  fetchNews()
});
usaToday.addEventListener('click',()=>{
  localStorage.setItem('getSource','usa');
  fetchNews()
});
news24.addEventListener('click',()=>{
  localStorage.setItem('getSource','news24');
  fetchNews()
});
bbc.addEventListener('click',()=>{
  localStorage.setItem('getSource','bbc');
  fetchNews()
});
allNews.addEventListener('click',()=>{
  localStorage.setItem('getSource','everything');
  fetchNews()
});

function fetchNews(){
  
  let key = `73c8ce32a78343f7933f98aa47977963`;
  let sourceCountry;
  let allNewsUrl;
  let getSource = localStorage.getItem('getSource');

  let currentDate = new Date();
  let month = currentDate.getMonth()+1
  let urlDate=currentDate.getFullYear()+"-"+month+"-"+currentDate.getDate();

  switch(getSource){
    case 'in':
      sourceCountry = `country=in`;
      document.getElementById("india").checked = true;
      break;
    case 'us':
      sourceCountry = `country=us`;
      document.getElementById("unitedState").checked = true;
      break;
    case 'sk':
      sourceCountry = `country=kr`;
      document.getElementById("sk").checked = true;
      break;
    case 'nz':
      sourceCountry = `country=nz`;
      document.getElementById("nz").checked = true;
      break;
    case 'au':
      sourceCountry = `country=au`;
      document.getElementById("australia").checked = true;
      break;
    case 'toi':
      sourceCountry = `sources=the-times-of-india`;
      document.getElementById("toi").checked = true;
      break;
    case 'usa':
      sourceCountry = `sources=usa-today`;
      document.getElementById("usatoday").checked = true;
      break;
    case 'news24':
      sourceCountry = `sources=news24`;
      document.getElementById("news24").checked = true;
      break;
    case 'bbc':
      sourceCountry = `sources=bbc-news`;
      document.getElementById("bbc").checked = true;
      break;
    case 'everything':
      allNewsUrl = `https://newsapi.org/v2/everything?q=Apple&from=${urlDate}&sortBy=popularity&apiKey=${key}`;
      document.getElementById("all").checked = true;
      break;
    default:
      allNewsUrl = `https://newsapi.org/v2/everything?q=Apple&from=${urlDate}&sortBy=popularity&apiKey=${key}`;
      document.getElementById("all").checked = true;
  }

  let topNews=`https://newsapi.org/v2/top-headlines?${sourceCountry}&apiKey=${key}`;
  // let mainUrl=getSource==null?`${allNewsUrl}`:`${topNews}`;
  if(getSource==null){
    mainUrl=`${allNewsUrl}`;
  }else if(getSource=='everything'){
    mainUrl=`${allNewsUrl}`;
  }else{
    mainUrl=`${topNews}`;
  }

  let errorHead = document.getElementById('errorHead');
  const xhr = new XMLHttpRequest();
  xhr.open('GET',`${mainUrl}`,true);
  xhr.onload = function(){
    if(this.status===200){
      const articlesBox = JSON.parse(this.responseText).articles;
      let str = "";
      let sldr = "";
      let sldrData = "";
      Array.from(articlesBox).forEach((news,index)=>{
        let imgUrl;
        if(news.urlToImage==null){
          imgUrl = `notFound.png`;
        }
        // else if(news.urlToImage=='logo.svg'){
        //   imgUrl = `notFound.png`;
        // }
        else{
          imgUrl = news.urlToImage;
        }
        // let imgUrl=news.urlToImage==null?'notFound.png':news.urlToImage;
        let authorName =news.author==null?'NewsX':news.author;
        str += `<div class="card">
        <a class="links" href="${news.url}" target="_blank">
        <div class="card__header">
          <img src="${imgUrl}" alt="card__image" class="card__image" width="600">
        </div>
        <div class="card__body">
          <span><b>${news.source.name}</b></span>
          <h3><b>${news.title}</b></h3>
          <h5>${news.content}</h5>
        </div>
        <div class="card__footer">
          <div class="user">
            <div class="user__info">
              <h5><b>${authorName}</b></h5>
              <p>${news.publishedAt}</p>
            </div>
          </div>
        </div><a/>
      </div>`;

      if(index<=3){
        sldr +=`        <div class="carousel-item" data-bs-interval="2500"><a class="links" href="${news.url}" target="_blank">
      <img src="${imgUrl}" class="d-block w-100 img-slider" alt="..."></a>
      <div class="carousel-caption d-none d-md-block sliderTitleBox">
        <h1 class="slider-title h2">${news.title}</h1>
      </div>
    </div>`;

    sldrData+=`<button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="${index}" class="active"
    aria-current="true" aria-label="Slide 1"></button>`;
      }

      })
      document.getElementById('newsBox').innerHTML = str;
      document.getElementById('slider').innerHTML=sldr;
      let firstElem = document.getElementById('slider');
      firstElem.firstElementChild.className='carousel-item active';
      document.getElementById('slider-data').innerHTML=sldrData;

      errorHead.innerHTML=``;

    }
    else{
      errorHead.innerHTML=`<span class="error404">4<span class="error0">0</span>4</span>`;
      let hideBtn = document.getElementById('preBtn');
      hideBtn.style.display="none";
      let nextBtn = document.getElementById('nextBtn');
      nextBtn.style.display="none";
      let tagLine =document.getElementById('tagLine');
      tagLine.style.height="40vh";
      tagLine.style.display="flex";
      tagLine.style.alignItems="center";
      tagLine.style.justifyContent="center";
    }
  }
  xhr.send();
}

