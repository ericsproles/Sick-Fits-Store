import { shallow, mount } from 'enzyme';
import Nav from '../components/Nav';
import { CURRENT_USER_QUERY } from '../components/User';
import { MockedProvider } from 'react-apollo/test-utils';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { fakeUser, fakeCartItem } from '../lib/testUtils';
import { signedInMocks, notSignedInMocks } from './PleaseSignIn.test';

const signedInMocksWithCartItems = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        me: {
          ...fakeUser(),
          cart: [fakeCartItem({ quantity: 1 }), fakeCartItem()],
        },
      },
    },
  },
];

describe('<Nav/>', () => {
  it('should render a minimal nav when signed out', async () => {
    const wrapper = mount(
      <MockedProvider mocks={notSignedInMocks}>
        <Nav />
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    // console.log(wrapper.debug());
    const nav = wrapper.find('ul[data-test="nav"]');
    // console.log(nav.debug());
    expect(toJSON(nav)).toMatchSnapshot();
  });

  it('should render full nav bar when signed in', async () => {
    const wrapper = mount(
      <MockedProvider mocks={signedInMocks}>
        <Nav />
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    const nav = wrapper.find('ul[data-test="nav"]');
    // console.log(nav.debug());
    expect(nav.children().length).toBe(6);
    expect(nav.text()).toContain('Sign out');
  });

  it('should render the amount of items in the cart', async () => {
    const wrapper = mount(
      <MockedProvider mocks={signedInMocksWithCartItems}>
        <Nav />
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    const nav = wrapper.find('[data-test="nav"]');
    const count = nav.find('div.count');
    // console.log(nav.debug());
    // console.log(count.debug());
    expect(toJSON(count)).toMatchSnapshot();
  });
});
