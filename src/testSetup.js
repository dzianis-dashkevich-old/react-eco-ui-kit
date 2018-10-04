const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

const adapter = new Adapter();

enzyme.configure({ adapter });