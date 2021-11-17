import { exportModules } from '@/assets/js/__utils__/file';

let requireFiles = require.context('@/commonPages/layout', false, /\.vue$/);
const modules = exportModules(requireFiles)

export default modules;