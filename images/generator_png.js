/* eslint-disable */
import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;