/* ==================================================================== */
/* Import Charadex
======================================================================= */
import { charadex } from '../charadex.js';


/* ==================================================================== */
/* Load
======================================================================= */
document.addEventListener("DOMContentLoaded", async () => {

  let dex = await charadex.initialize.page(
    null,
    charadex.page.masterlist,
    null, 
    async (listData) => {

      if (listData.type == 'profile') {

        console.log(listData.profileArray[0]);

        // Create the log dex
        if (charadex.tools.checkArray(listData.profileArray[0].masterlistlog)) {
          let logs = await charadex.initialize.page(
            listData.profileArray[0].masterlistlog,
            charadex.page.masterlist.relatedData['masterlist log']
          );
        }

        // Create the image gallery
        if (charadex.tools.checkArray(listData.profileArray[0].imagegallery)) {
          let gallery = await charadex.initialize.page(
            listData.profileArray[0].imagegallery,
            charadex.page.masterlist.relatedData['image gallery']
          );
        }

        // Create the companions section
        if (charadex.tools.checkArray(listData.profileArray[0].companions)) {
          let companions = await charadex.initialize.page(
            listData.profileArray[0].companions,
            charadex.page.masterlist.relatedData['bestiary']
          );

          // Render dynamic companion cards
          const container = document.querySelector(".companions-container");
          if (container) {
            container.innerHTML = ""; // clear existing
            companions.forEach(companion => {
              let card = document.createElement("div");
              card.className = "col-md-4 p-2";
              card.innerHTML = `
                <a class="card h-100 cardlink" href="bestiary.html?profile=${companion.id}">
                  <h5 class="card-header text-center">${companion.name}</h5>
                  <div class="card-body d-flex flex-fill">
                    <img class="image img-fluid m-auto" src="${companion.image}" oncontextmenu="return false">
                  </div>
                  <p class="text-center"><strong>Bond Level:</strong> ${companion.bondlevel || "Unknown"}</p>
                </a>
              `;
              container.appendChild(card);
            });
          }
        }

      }

    }
  );
  
  charadex.tools.loadPage('.softload', 500);
  
});
