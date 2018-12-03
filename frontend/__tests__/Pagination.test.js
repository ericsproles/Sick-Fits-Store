import { shallow, mount } from 'enzyme';
import Pagination, { PAGINATION_QUERY } from '../components/Pagination';
import { MockedProvider } from 'react-apollo/test-utils';
import wait from 'waait';
import Router from 'next/router';
import toJSON from 'enzyme-to-json';
import { signedInMocks, notSignedInMocks } from './PleaseSignIn.test';
Router.router = {
  push() {},
  prefetch() {},
};

function makeMocksfor(length) {
  return [
    {
      request: { query: PAGINATION_QUERY },
      result: {
        data: {
          itemsConnection: {
            __typename: 'aggregate',
            aggregate: {
              count: length,
              __typename: 'count',
            },
          },
        },
      },
    },
  ];
}

describe('<Pagination />', () => {
  it('should display a loading message', () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMocksfor(1)}>
        <Pagination page={1} />
      </MockedProvider>
    );
    const pagination = wrapper.find('[data-test="pagination"]');
    // console.log(wrapper.debug());
    expect(wrapper.text()).toContain('Loading...');
  });

  it('should render pagination for 18 items', async () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMocksfor(18)}>
        <Pagination page={1} />
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    expect(wrapper.find('.totalPages').text()).toEqual('5');
    const pagination = wrapper.find('div[data-test="pagination"]');
    expect(toJSON(pagination)).toMatchSnapshot;
    // console.log(wrapper.debug());
  });

  it('should disable prev button on first page', async () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMocksfor(18)}>
        <Pagination page={1} />
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    expect(wrapper.find('a.prev').prop('aria-disabled')).toEqual(true);
    expect(wrapper.find('a.next').prop('aria-disabled')).toEqual(false);
  });

  it('should disable next button on last page', async () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMocksfor(18)}>
        <Pagination page={5} />
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    expect(wrapper.find('a.prev').prop('aria-disabled')).toEqual(false);
    expect(wrapper.find('a.next').prop('aria-disabled')).toEqual(true);
  });

  it('should enable all buttons on middle page', async () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMocksfor(18)}>
        <Pagination page={3} />
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    expect(wrapper.find('a.prev').prop('aria-disabled')).toEqual(false);
    expect(wrapper.find('a.next').prop('aria-disabled')).toEqual(false);
  });
});
