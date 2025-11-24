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
    charadex.page.awardcase, 
    (arr) => {
      for (let entry of arr) {

        // We're gonna make some badges but you dont have to use them
        entry.designs = entry.designs.split(',');
        entry.designBadges = [];
        for (let design of entry.designs) {
          entry.designBadges.push(
            `<a class="badge badge-primary" href="${charadex.url.addUrlParameters(charadex.url.getPageUrl('masterlist'), {profile: design})}">${design.trim()}</a>`
          );
        }
        entry.designBadges = entry.designBadges.join(' ');

      }
    }
  );

  charadex.tools.loadPage('.softload', 500);

});