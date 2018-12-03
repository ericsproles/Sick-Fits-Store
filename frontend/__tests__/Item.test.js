import ItemComponent from '../components/Item';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

const fakeItem = {
  id: 'ABC123',
  title: 'A Cool Item',
  price: 4000,
  description: 'This item is really cool!',
  image: 'dog.jpg',
  largeImage: 'largedog.jpg',
};

describe('<Item/>', () => {
  it('renders and matches the snapshot', () => {});

  const wrapper = shallow(<ItemComponent item={fakeItem} />);
  expect(wrapper).toMatchSnapshot();

  // it('displays the image correctly', () => {
  //   const wrapper = shallow(<ItemComponent item={fakeItem} />);
  //   const img = wrapper.find('img');
  //   expect(img.props().src).toBe(fakeItem.image);
  //   expect(img.props().alt).toBe(fakeItem.title);
  // });
  // it('renders the pricetag and title properly', () => {
  //   const wrapper = shallow(<ItemComponent item={fakeItem} />);
  //   const PriceTag = wrapper.find('PriceTag');
  //   //console.log(PriceTag.children().text());
  //   //expect(PriceTag.children().text()).toBe('$40');
  //   expect(wrapper.find('Title a').text()).toBe(fakeItem.title);
  // });
  it('renders out the buttons properly', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    const buttonList = wrapper.find('.buttonList');
    expect(buttonList.children()).toHaveLength(3);
    // console.log(buttonList.debug());
  });

  //   expect(buttonList.find('Link')).toHaveLength(1);
  //   expect(buttonList.find('AddToCart').exists()).toBe(true);
  //   expect(buttonList.find('DeleteItem').exists()).toBe(true);

  //const DeleteItem = wrapper.find('DeleteItem');
  // console.log(wrapper.debug());
  //console.log(DeleteItem.text());
  // expect(wrapper.find(DeleteItem).text()).toBe('Delete This Item');
});
