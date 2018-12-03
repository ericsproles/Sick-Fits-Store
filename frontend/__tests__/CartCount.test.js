import { shallow, mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import CartCount from '../components/CartCount';

describe('<CartCount/>', () => {
  it('renders', () => {
    shallow(<CartCount count={12} />);
  });

  it('should match the snapshot', () => {
    const wrapper = shallow(<CartCount count={11} />);
    // expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should update via props', () => {
    const wrapper = shallow(<CartCount count={20} />);
    // console.log(wrapper.debug());
    expect(toJSON(wrapper)).toMatchSnapshot();
    wrapper.setProps({ count: 10 });
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
