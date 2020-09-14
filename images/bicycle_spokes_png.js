/* eslint-disable */
import simLauncher from '../../joist/js/simLauncher.js';

const image = new Image();
const unlock = simLauncher.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;