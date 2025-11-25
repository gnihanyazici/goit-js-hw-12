import '../css/pix.css'; 
import axios from "axios";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const API_KEY = "53378626-1c7fc3c0eb24b69adb1804063";
const PER_PAGE = 20;
const DURATION_DELAY = 500; 

const form1 = document.getElementById("search-form-1");
const input1 = document.getElementById("search-input-1");
const gallery1 = document.getElementById("gallery-1"); 

const loadMoreBtn = document.getElementById("load-more");
const loadingText = document.getElementById("loading-text");
const endMessage = document.getElementById("end-message");

let query = "";
let page = 1;
let totalHits = 0;

const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

// --- EVENT LISTENERS ---
form1.addEventListener("submit", async (e) => {
  e.preventDefault();
  query = input1.value.trim();
  if (!query) return;

  resetUI();
  
  // Arama başladığında yükleme mesajını göster
  showLoading(true); 

  await fetchImages();
});

loadMoreBtn.addEventListener("click", async () => {
  page++;
  
  // Butona basıldığında butonu gizle ve yükleme mesajını göster
  loadMoreBtn.classList.add("hidden"); 
  showLoading(true); 

  await fetchImages();
});

// --- FETCH FUNCTION ---
async function fetchImages() {
  try {
    const params = {
      key: API_KEY,
      q: query,
      image_type: "photo",
      orientation: "horizontal",
      safesearch: true,
      page,
      per_page: PER_PAGE,
    };

    const { data } = await axios.get("https://pixabay.com/api/", { params });

    // Yükleme mesajının görünmesi için yapay gecikme ekle
    await delay(DURATION_DELAY);

    if (data.hits.length === 0 && page === 1) {
      iziToast.error({ 
          message: "Sorry, there are no images matching your search query. Please try again.", 
          position: 'topRight' 
      });
      endMessage.textContent = "No results found.";
      endMessage.classList.remove("hidden");
      return;
    }

    renderGallery(data.hits);

    totalHits = data.totalHits;
    
    // Load More button ve Bitiş Mesajı
    if (page < Math.ceil(totalHits / PER_PAGE)) {
      loadMoreBtn.classList.remove("hidden");
    } else {
      loadMoreBtn.classList.add("hidden");
      endMessage.classList.remove("hidden");
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'bottomCenter'
      });
    }

    // YENİ: Otomatik kaydırma (Smooth Scroll)
    if (page > 1) {
        smoothScroll();
    }
    
  } catch (error) {
    console.error("Fetch Error:", error);
    iziToast.error({ message: "Error fetching images!", position: 'topRight' });
  } finally {
    // Yükleme işlemi bittiğinde mesajı gizle
    showLoading(false); 
  }
}

// --- RENDER FUNCTION ---
function renderGallery(images) {
  // İstatistikleri içeren yapıyı oluşturma
  const markup = images
    .map(
      (img) => `
        <div class="photo-card">
          <a href="${img.largeImageURL}">
            <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy"/>
          </a>
          <div class="info">
            <div class="info-item">
              Likes <b>${img.likes}</b>
            </div>
            <div class="info-item">
              Views <b>${img.views}</b>
            </div>
            <div class="info-item">
              Comments <b>${img.comments}</b>
            </div>
            <div class="info-item">
              Downloads <b>${img.downloads}</b>
            </div>
          </div>
        </div>`
    )
    .join("");

  // Sadece ana galeriye ekle
  gallery1.insertAdjacentHTML("beforeend", markup);
  
  lightbox.refresh();
}

// --- HELPERS ---
function resetUI() {
  page = 1;
  gallery1.innerHTML = "";
  loadMoreBtn.classList.add("hidden");
  endMessage.classList.add("hidden");
  showLoading(false);
}

function showLoading(show) {
  if (show) loadingText.classList.remove("hidden");
  else loadingText.classList.add("hidden");
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function smoothScroll() {
    const { height: cardHeight } = gallery1.firstElementChild.getBoundingClientRect();

    window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
    });
}