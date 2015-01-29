//Handlebars helpers

module.exports.register = function (Handlebars, options) {
  'use strict';

  // insert link
  Handlebars.registerHelper('replaceStr', function (haystack, needle, replacement) {
    if (haystack && needle) {
      return haystack.replace(needle, replacement);
    } else {
      return '';
    }
  });

  
	Handlebars.registerHelper('link', function(text, url) {
	  text = Handlebars.Utils.escapeExpression(text);
	  url  = Handlebars.Utils.escapeExpression(url);

	  var result = '<a href="' + url + '">' + text + '</a>';

	  return new Handlebars.SafeString(result);
	});

};