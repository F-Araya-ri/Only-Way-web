const PLACE_ID = "ChIJr3Yz8hTfoI8RroXSieDj_SM";

    function moveCarousel(direction) {
      const container = document.getElementById("google-reviews-container");
      if (!container) return;
      const scrollAmount = container.offsetWidth * 0.8;
      container.scrollBy({
        left: scrollAmount * direction,
        behavior: "smooth",
      });
    }
    async function initReviews() {
      const infoHeader = document.getElementById("header-info");

      try {
        const res = await fetch("/.netlify/functions/api");
        const data = await res.json();

        const place = data.result;


        const adaptedPlace = {
          rating: place.rating,
          userRatingCount: place.user_ratings_total,
          reviews: place.reviews || []
        };

        renderHeader(adaptedPlace);
        renderReviews(adaptedPlace.reviews);

      } catch (error) {
        console.error("Error al cargar las reseñas:", error);
        if (infoHeader) {
          infoHeader.innerHTML =
            '<p class="text-white/80">Error al conectar con el servidor</p>';
        }
      }
    }

    // 4. Renderizado del Header (Actualizado para las nuevas propiedades)
    function renderHeader(place) {
      const headerDiv = document.getElementById("header-info");
      if (!headerDiv) return;

      let starsHtml = "";
      const rating = place.rating || 0;

      for (let i = 0; i < 5; i++) {
        starsHtml += `<span class="material-symbols-outlined text-2xl ${i < Math.round(rating)
          ? "text-yellow-400 fill-current"
          : "text-gray-400"
          }"style="font-variation-settings: 'FILL' ${i < rating ? 1 : 0
          };">star</span>`;
      }

      headerDiv.innerHTML = `
            <div class="bg-white p-3 rounded-full shadow-lg mb-4 inline-flex items-center justify-center">
                <svg class="w-8 h-8" viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg">
                    <path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"/>
                    <path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"/>
                    <path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"/>
                    <path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"/>
                </svg>
            </div>
            <div class="flex items-baseline gap-3 mb-2">
                <span class="text-6xl font-black text-white drop-shadow-md">${rating}</span>
                <div class="flex flex-col items-start">
                    <div class="flex">${starsHtml}</div>
                </div>
            </div>
            <p class="text-white/90 font-medium text-lg drop-shadow-sm">Basado en ${place.userRatingCount || 0
        } reseñas</p>
            <h2 class="mt-6 text-2xl md:text-3xl font-black text-white leading-tight drop-shadow-md">Lo que dicen nuestros clientes</h2>
        `;
    }

    function renderReviews(reviews) {
      const container = document.getElementById("google-reviews-container");
      if (!container) return;

      container.innerHTML = "";

      if (!reviews || reviews.length === 0) {
        container.innerHTML =
          '<p class="text-white">No hay reseñas disponibles por ahora.</p>';
        return;
      }

      reviews.forEach((review) => {
        const card = document.createElement("div");
        card.className = card.className =
          "min-w-[380px] w-full md:w-[450px] bg-white text-[#181111] p-8 rounded-2xl shadow-xl flex flex-col gap-5 snap-center shrink-0 h-[320px] border border-gray-100";

        let stars = "";
        const reviewRating = review.rating || 0;
        for (let i = 0; i < 5; i++) {
          stars += `<span class="material-symbols-outlined text-2xl ${i < reviewRating ? "text-yellow-400" : "text-gray-300"
            }" style="font-variation-settings: 'FILL' ${i < reviewRating ? 1 : 0
            };">star</span>`;
        }

        let text = review.text || "";
        if (text.length > 150) {
          text = text.substring(0, 150) + "...";
        }
        const authorName = review.author_name || "Cliente de Google";
        const authorPhoto =
          review.profile_photo_url ||
          "https://ui-avatars.com/api/?name=User";
        const timeAgo = review.relative_time_description || "";

        card.innerHTML = `
                <div class="flex items-center gap-4">
                    <div class="relative w-12 h-12 rounded-full overflow-hidden shadow-sm shrink-0 bg-gray-100">
                        <img src="${authorPhoto}" alt="${authorName}" class="w-full h-full object-cover" onerror="this.src='https://ui-avatars.com/api/?name=User'">
                    </div>
                    <div class="flex flex-col">
                        <span class="font-bold text-sm text-[#181111] line-clamp-1">${authorName}</span>
                        <span class="text-xs text-gray-500">${timeAgo}</span>
                    </div>
                </div>
                <div class="flex">${stars}</div>
                <p class="text-gray-600 text-sm leading-relaxed italic h-20 overflow-hidden">"${text}"</p>
                <div class="mt-auto pt-4 border-t border-gray-100 flex items-center gap-2">
                    <svg class="w-4 h-4" viewBox="-3 0 262 262"><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"/><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"/><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"/><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"/></svg>
                    <span class="text-xs font-medium text-gray-500">Google Review</span>
                </div>
            `;
        container.appendChild(card);
      });
    }

    document.addEventListener("DOMContentLoaded", initReviews);