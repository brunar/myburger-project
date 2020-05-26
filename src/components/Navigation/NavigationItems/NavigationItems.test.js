import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationsItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems />); //Important to pass jsx to the shallow Method
    });

    it('should render two <NavigationsItem/> elements if not authenticated', () => {
        expect(wrapper.find(NavigationsItem)).toHaveLength(2); //Inside find() is not a jsx element. It's a exported function from the import of the top
    })
    it('should render three <NavigationsItem/> elements if authenticated', () => {
        //wrapper = shallow(<NavigationItems isAuthenticatedPr />);
        wrapper.setProps({ isAuthenticatedPr: true });
        expect(wrapper.find(NavigationsItem)).toHaveLength(3);
    })
})