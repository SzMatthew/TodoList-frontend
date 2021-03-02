import {shallow} from 'enzyme';
import App from '../App.js';

describe('App', () => {
	it('renders', () => {
		const wrapper = shallow(<App />);
		expect(wrapper).toMatchSnapshot();
	});
});