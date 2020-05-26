import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems />); //Important to pass jsx to the shallow Method
    });

    it('should render two <NavigationsItem/> elements if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2); //Inside find() is not a jsx element. It's a exported function from the import of the top
    });

    it('should render three <NavigationsItem/> elements if authenticated', () => {
        //wrapper = shallow(<NavigationItems isAuthenticatedPr />);
        wrapper.setProps({ isAuthenticatedPr: true });
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should an exact logout button', () => {
        wrapper.setProps({ isAuthenticatedPr: true });
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
        //.contains() - method from Enzyme enzyme to test for different things combined with a new method from jest .toEqual()
    })
})