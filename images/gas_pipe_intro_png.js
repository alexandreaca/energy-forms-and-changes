/* eslint-disable */
import simLauncher from '../../joist/js/simLauncher.js';
const image = new Image();
const unlock = simLauncher.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;