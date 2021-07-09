
import R3 from '../../../static/r3.publish/r3.min.js';
import globalstore from './customizeGlobal';

R3.store.registerModule('customize', globalstore);

export default R3.store;
