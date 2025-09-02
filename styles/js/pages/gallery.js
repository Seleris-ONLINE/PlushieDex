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
    charadex.page.imageGallery, 
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

        // Make the tags clickable like #tag links
        entry.tags = entry.tags ? entry.tags.split(',') : [];
        const pageUrl = charadex.url.getPageUrl('gallery');
        let fancyTagArr = [];

        for (let tag of entry.tags) {
          let cleanTag = tag.trim();
          let tagLink = charadex.url.addUrlParameters(pageUrl, { tags: cleanTag });
          fancyTagArr.push(`<a href="${tagLink}">#${cleanTag}</a>`);
        }

        entry.fancytags = fancyTagArr.join(' ');

      }
    }
  );

  charadex.tools.loadPage('.softload', 500);

});