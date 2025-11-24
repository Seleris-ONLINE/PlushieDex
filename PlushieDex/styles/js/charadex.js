/* ==================================================================== */
/* Import Charadex
======================================================================= */
import { charadex } from './list.js';

/* ==================================================================== */
/* Initialize
/* ====================================================================  /

  This is where the real magic happens
    
======================================================================= */
charadex.initialize = {};


/* ==================================================================== */
/* Page
======================================================================= */
charadex.initialize.page = async (dataArr, config, dataCallback, listCallback, customPageUrl = false) => {

  if (!config) return console.error('No configuration added.');

  // Set up
  let selector = config.dexSelector;
  let pageUrl = customPageUrl || charadex.url.getPageUrl(config.sitePage);

  // Add folders, filters & search
  let folders = config.fauxFolder?.toggle ?? false ? charadex.listFeatures.fauxFolders(pageUrl, config.fauxFolder.parameters, selector) : false;
  let filters = config.filters?.toggle ?? false ? charadex.listFeatures.filters(config.filters.parameters, selector) : false;
  let search = config.search?.toggle ?? false ? charadex.listFeatures.search(config.search.parameters, config.search.filterToggle, selector) : false;

  // Get our data
  let charadexData = dataArr || await charadex.importSheet(config.sheetPage);

  // Add profile information
  for (let entry of charadexData) {
    charadex.tools.addProfileLinks(entry, pageUrl, config.profileProperty); // Go ahead and add profile keys just in case
    if (folders) folders(entry, config.fauxFolder.folderProperty); // If folders, add folder info
    if (entry.rarity) entry.raritybadge = `<span class="badge badge-${charadex.tools.scrub(entry.rarity)}">${entry.rarity}</span>`; // Adds a rarity badge
    if (entry.owner) {const inventoriesUrl = charadex.url.getPageUrl("inventories");entry.ownerlink = `${inventoriesUrl}?profile=${encodeURIComponent(entry.owner)}`;} // Link to owner inventory
    if (entry.designer) {entry.designerlink = `https://toyhou.se/${charadex.tools.scrub(entry.designer)}`;} // Link to designter toyhouse
    if (entry.artist) {entry.artistlink = `https://toyhou.se/${charadex.tools.scrub(entry.artist)}`;} // Link to artist toyhouse
  }

  // If there's related data, add it
  if (config.relatedData) {
    for (let page in config.relatedData) {
      await charadex.manageData.relateData(
        charadexData, 
        config.relatedData[page].primaryProperty, 
        page, 
        config.relatedData[page].relatedProperty
      );
    }
  }

  // Initialize the list
  let list = charadex.buildList(selector);

  // Let us manipulate the data before it gets to the list
  if (typeof dataCallback === 'function') {
    await dataCallback(charadexData);
  }

  /* Sort the Dex */
  if (config.sort?.toggle ?? false) {
    charadexData = charadex.manageData.sortArray(
      charadexData, 
      config.sort.sortProperty, 
      config.sort.order,
      config.sort.parametersKey,
      config.sort.parameters,
    );
  }

  // Create Profile
  const createProfile = async () => {

    // If they dont need to render a profile, don't
    if (config.profileToggle !== undefined && !config.profileToggle) return false;

    let profileArr = list.getProfile(charadexData);
    if (!profileArr) return false;

    if (config.prevNext?.toggle ?? false) {
      charadex.listFeatures.prevNextLink(pageUrl, charadexData, profileArr, selector);
    }
    
    /* Create Profile */
    let profileList = list.initializeProfile(profileArr);

    // Return those values on Callback
    if (typeof listCallback === 'function') {
      await listCallback({
        type: 'profile',
        pageUrl: pageUrl,
        array: charadexData,
        profileArray: profileArr,
        list: profileList
      })
    }

    return true;

  }

  // If there's a profile, nyoom
  if (await createProfile()) return;

  // Create Gallery
  const createGallery = async () => {

    // Add additional list junk
    let additionalListConfigs = {};

    // Filter by parameters
    charadexData = charadex.manageData.filterByPageParameters(charadexData);

    // Add Pagination
    if (config.pagination?.toggle ?? false) {
      let pagination = charadex.listFeatures.pagination(charadexData.length, config.pagination.amount, config.pagination.bottomToggle, selector);
      if (pagination) additionalListConfigs = { ...additionalListConfigs, ...pagination };
    }

    // Initialize Gallery
    let galleryList = list.initializeGallery(charadexData, additionalListConfigs);

    // Initialize filters and search
    if ((config.filters?.toggle ?? false) && filters) filters.initializeFilters(galleryList);
    if ((config.search?.toggle ?? false) && search) search.initializeSearch(galleryList);

    // Return those values on Callback
    if (typeof listCallback === 'function') {
      await listCallback({
        type: 'gallery',
        pageUrl: pageUrl,
        array: charadexData,
        list: galleryList,
      })
    }

    return true;

  }

  // Else the gallery nyooms instead
  return await createGallery();

}



/* ==================================================================== */
/* Grouped Gallery (Mostly for inventory items)
======================================================================= */
charadex.initialize.groupGallery = async function (config, dataArray, groupBy, customPageUrl = false) {

  /* Check the Configs */
  if (!config) return console.error(`No config added.`);
  
  /* Get some stuff we'll need */
  let selector = config.dexSelector;
  const pageUrl = customPageUrl || charadex.url.getPageUrl(config.sitePage);

  // Add filters & Search
  let filters = config.filters?.toggle ?? false ? charadex.listFeatures.filters(config.filters.parameters, selector) : false;
  let search = config.search?.toggle ?? false ? charadex.listFeatures.search(config.search.parameters, config.search.filterToggle, selector) : false;

  /* Attempt to Fetch the data */
  let charadexData = dataArray;

  // Add profile information
  for (let entry of charadexData) {
    charadex.tools.addProfileLinks(entry, pageUrl, config.profileProperty);
  }

  /* Sort the Dex */
  if (config.sort?.toggle ?? false) {
    charadexData = charadex.manageData.sortArray(
      charadexData, 
      config.sort.sortProperty, 
      config.sort.order,
      config.sort.parametersKey,
      config.sort.parameters,
    );
  }

  /* Attempt deal with gallery
  ======================================================================= */
  const handleGallery = () => {

    if (!charadex.tools.checkArray(charadexData)) return false;

    // Filter by parameters
    charadexData = charadex.manageData.filterByPageParameters(charadexData);

    // Group data
    let groupArray = Object.groupBy(charadexData, obj => obj[groupBy]);

    // Create base selectors
    let itemSelector =  { item: `${selector}-gallery-item` };
    let containerSelector =  `${selector}-gallery`;

    for (let group in groupArray) {

      //Create the list selector
      let groupListSelector = charadex.tools.scrub(group);
      
      // Create the DOM elements
      let groupElement = $(`#${selector}-group-list`).clone();
      groupElement.removeAttr('id');
      groupElement.find(`.${selector}-list`).addClass(`${groupListSelector}-list`);
      groupElement.find(`.${selector}-group-title`).text(group);
      $(`#${selector}-group`).append(groupElement);
      
      // Build list based on group
      let groupListManager = charadex.buildList(groupListSelector);
      let groupList = groupListManager.initializeGallery(groupArray[group], itemSelector, containerSelector);

      // Add filters & Search
      if ((config.filters?.toggle ?? false) && filters) filters.initializeFilters(groupList);
      if ((config.search?.toggle ?? false) && search) search.initializeSearch(groupList);

    }

    return true;

  };

  return handleGallery();

};

export { charadex };

// ==============================
// Robust palette toggle (drop at end of page / after charadex export)
// ==============================
(function () {
  const TAG = '[PaletteToggle]';

  document.addEventListener('DOMContentLoaded', () => {
    console.log(TAG, 'script loaded');

    const selectors = [
      '#paletteToggle',
      '#toggle',
      '.paletteToggle',
      '[data-palette-toggle]',
      '[data-toggle="palette"]'
    ];

    // gather all toggles that match any selector
    let toggles = [];
    selectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => toggles.push(el));
    });
    toggles = Array.from(new Set(toggles)); // unique

    if (!toggles.length) {
      console.warn(TAG, 'No toggle elements found. Expected selectors:', selectors.join(', '));
      return;
    }

    // helper: set icon inside a toggle (if it uses <i class="fa-...">)
    function setIcon(el, isAlt) {
      if (!el) return;
      const icon = el.querySelector('i');
      if (!icon) return;
      // prefer fa-moon / fa-sun swap (works with Font Awesome)
      icon.classList.toggle('fa-moon', !isAlt);
      icon.classList.toggle('fa-sun', isAlt);
    }

    function updateAllIcons(isAlt) {
      toggles.forEach(t => setIcon(t, isAlt));
    }

    // bind listeners
    toggles.forEach(t => {
      t.addEventListener('click', (ev) => {
        if (ev && typeof ev.preventDefault === 'function') ev.preventDefault(); // stop reloads
        try {
          const body = document.body || document.documentElement;
          const isAlt = body.classList.toggle('alt-palette');
          localStorage.setItem('palette', isAlt ? 'alt' : 'default');
          updateAllIcons(isAlt);
          console.log(TAG, 'toggled alt-palette =>', isAlt);
        } catch (err) {
          console.error(TAG, 'Error toggling palette:', err);
        }
      });
    });

    // restore saved preference
    try {
      const saved = localStorage.getItem('palette');
      const body = document.body || document.documentElement;
      const isAlt = saved === 'alt';
      if (isAlt) body.classList.add('alt-palette');
      else body.classList.remove('alt-palette');
      updateAllIcons(isAlt);
      console.log(TAG, 'restored palette from localStorage =>', saved);
    } catch (err) {
      console.warn(TAG, 'Could not access localStorage:', err);
    }
  });
})();