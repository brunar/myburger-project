import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationsItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {
    it('should render two <NavigationsItem/> elements if not authenticated', () => {
        //Important to pass jsx to the shallow Method
        const wrapper = shallow(<NavigationItems />);
        //Inside find() is not a jsx element. It's a exported function from the import of the top
        expect(wrapper.find(NavigationsItem)).toHaveLength(2);
    })
})