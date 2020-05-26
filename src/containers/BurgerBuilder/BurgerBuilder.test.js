import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BurgerBuilder } from './BurgerBuilder'; //Export in the Component class at the top to separate from the connection to redux, just for the test and import with the curly braces {}
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({ adapter: new Adapter() });

describe('<BurgerBuilder />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => { }} />);
    });

    it('should render <BuildControls /> when receiving ingredients', () => {
        wrapper.setProps({ ings: { salad: 0 } });
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    })
});

