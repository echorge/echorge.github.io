/**
 * URL Encoding and Decoding Utility
 * Provides functions to encode and decode URL strings
 */

const urlCodec = {
  /**
   * Encode a string to URL-encoded format
   * @param {string} str - The string to encode
   * @returns {string} The URL-encoded string
   */
  encode: function(str) {
    if (typeof str !== 'string') {
      throw new TypeError('Input must be a string');
    }
    return encodeURIComponent(str);
  },

  /**
   * Decode a URL-encoded string
   * @param {string} str - The URL-encoded string to decode
   * @returns {string} The decoded string
   */
  decode: function(str) {
    if (typeof str !== 'string') {
      throw new TypeError('Input must be a string');
    }
    try {
      return decodeURIComponent(str);
    } catch (e) {
      throw new Error('Invalid URL-encoded string: ' + e.message);
    }
  },

  /**
   * Encode an entire URL (preserves special URL characters)
   * @param {string} url - The URL to encode
   * @returns {string} The URL-encoded string
   */
  encodeURL: function(url) {
    if (typeof url !== 'string') {
      throw new TypeError('Input must be a string');
    }
    return encodeURI(url);
  },

  /**
   * Decode an entire URL
   * @param {string} url - The URL-encoded URL to decode
   * @returns {string} The decoded URL
   */
  decodeURL: function(url) {
    if (typeof url !== 'string') {
      throw new TypeError('Input must be a string');
    }
    try {
      return decodeURI(url);
    } catch (e) {
      throw new Error('Invalid URL: ' + e.message);
    }
  }
};

// Export for Node.js environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = urlCodec;
}
