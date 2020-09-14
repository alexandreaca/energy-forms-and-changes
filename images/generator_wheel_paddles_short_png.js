/* eslint-disable */
import simLauncher from '../../joist/js/simLauncher.js';

const image = new Image();
const unlock = simLauncher.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;