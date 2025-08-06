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

        // Make the tags pretty and actually work <3
        question.tags = question.tags ? question.tags.split(',') : [];
        let fancyTagArr = [];
        if (question.tags.length >= 1) {
          for (let tag of question.tags) {
            fancyTagArr.push(`<a href="${charadex.url.addUrlParameters(pageUrl, {tags: tag.trim()})}">#${tag.trim()}</a>`);
          }
        }
        question.fancytags = fancyTagArr.join(' ');

      }
    }
  );

  charadex.tools.loadPage('.softload', 500);

});
