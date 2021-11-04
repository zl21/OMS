
import R3 from '@syman/burgeon-r3';
import globalstore from './customizeGlobal';

R3.store.registerModule('customize', globalstore);

export default R3.store;
