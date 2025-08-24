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
    null, 
    async (listData) => {

      if (listData.type == 'profile') {

        // Create the log dex
        if (charadex.tools.checkArray(listData.profileArray[0].awardcaseLog)) {
          let logs = await charadex.initialize.page(
            listData.profileArray[0].awardcaseLog,
            charadex.page.awardcase.relatedData['awardcase log']
          );
        }

      }

    }
  );
  
  charadex.tools.loadPage('.softload', 500);
  
});