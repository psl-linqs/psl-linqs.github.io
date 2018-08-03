'use strict';

window.linqs = window.linqs || {};

function toggleTag(tag) {
   var activeTags = fetchHashTags();

   if (activeTags.indexOf(tag) != -1) {
      activeTags.splice(activeTags.indexOf(tag), 1);
   } else {
      activeTags.push(tag);
   }

   if (activeTags.length != 0) {
      location.hash = '#tags=' + activeTags.join(',');
   } else {
      location.hash = '';
   }
}

function ensurePostIndex() {
   if (window.linqs.postIndex) {
      return;
   }

   // [{'element': element, 'tags': [tag, ...]}, ...]
   window.linqs.postIndex = [];
   $('li.post-entry').each(function(index, element) {
      var tags = element.getAttribute('data-tags').split(',');
      window.linqs.postIndex.push({
         'element': element,
         'tags': tags
      });
   });

   window.linqs.allTags = [];
   $('button.tag-bubble').each(function(index, element) {
      window.linqs.allTags.push(element.getAttribute('data-tag'));
   });
}

// Get all tags from the hash.
function fetchHashTags() {
   var tagsString = location.hash.replace(/^#tags=/, '');

   if (tagsString === '') {
      return [];
   }

   return tagsString.split(',');
}

// Load all tags from the hash.
function applyPostFilters() {
   ensurePostIndex();

   var activeTags = fetchHashTags();

   window.linqs.postIndex.forEach(function(post) {
      // If there are no active tags, then everything is active.
      var hasAllTags = activeTags.every(function(tag) {
         return (post['tags'].indexOf(tag) != -1);
      });

      if (hasAllTags) {
         $(post['element']).show();
      } else {
         $(post['element']).hide();
      }
   });

   window.linqs.allTags.forEach(function(tag) {
      var button = $('button.tag-bubble[data-tag="' + tag + '"]');
      if (activeTags.indexOf(tag) != -1) {
         button.attr('data-value', true);
      } else {
         button.attr('data-value', false);
      }
   });
}
