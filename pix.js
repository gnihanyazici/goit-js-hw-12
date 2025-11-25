import"./assets/modulepreload-polyfill-B5Qt9EMX.js";import{S as g,a as u,i as r}from"./assets/vendor-CNqCr-V-.js";const y="53378626-1c7fc3c0eb24b69adb1804063",l=20,p=500,v=document.getElementById("search-form-1"),b=document.getElementById("search-input-1"),c=document.getElementById("gallery-1"),o=document.getElementById("load-more"),m=document.getElementById("loading-text"),i=document.getElementById("end-message");let d="",a=1,h=0;const L=new g(".gallery a",{captionsData:"alt",captionDelay:250});v.addEventListener("submit",async e=>{e.preventDefault(),d=b.value.trim(),d&&(w(),n(!0),await f())});o.addEventListener("click",async()=>{a++,o.classList.add("hidden"),n(!0),await f()});async function f(){try{const e={key:y,q:d,image_type:"photo",orientation:"horizontal",safesearch:!0,page:a,per_page:l},{data:t}=await u.get("https://pixabay.com/api/",{params:e});if(await I(p),t.hits.length===0&&a===1){r.error({message:"Sorry, there are no images matching your search query. Please try again.",position:"topRight"}),i.textContent="No results found.",i.classList.remove("hidden");return}E(t.hits),h=t.totalHits,a<Math.ceil(h/l)?o.classList.remove("hidden"):(o.classList.add("hidden"),i.classList.remove("hidden"),r.info({message:"We're sorry, but you've reached the end of search results.",position:"bottomCenter"})),a>1&&B()}catch(e){console.error("Fetch Error:",e),r.error({message:"Error fetching images!",position:"topRight"})}finally{n(!1)}}function E(e){const t=e.map(s=>`
        <div class="photo-card">
          <a href="${s.largeImageURL}">
            <img src="${s.webformatURL}" alt="${s.tags}" loading="lazy"/>
          </a>
          <div class="info">
            <div class="info-item">
              Likes <b>${s.likes}</b>
            </div>
            <div class="info-item">
              Views <b>${s.views}</b>
            </div>
            <div class="info-item">
              Comments <b>${s.comments}</b>
            </div>
            <div class="info-item">
              Downloads <b>${s.downloads}</b>
            </div>
          </div>
        </div>`).join("");c.insertAdjacentHTML("beforeend",t),L.refresh()}function w(){a=1,c.innerHTML="",o.classList.add("hidden"),i.classList.add("hidden"),n(!1)}function n(e){e?m.classList.remove("hidden"):m.classList.add("hidden")}function I(e){return new Promise(t=>setTimeout(t,e))}function B(){const{height:e}=c.firstElementChild.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}
//# sourceMappingURL=pix.js.map
