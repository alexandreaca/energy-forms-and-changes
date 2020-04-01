/* eslint-disable */
const img = new Image();
window.phetImages.push( img );
img.src = 'data:image/png;base64,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';
export default img;
