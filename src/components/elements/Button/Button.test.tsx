import * as React from "react";
import { shallow, mount } from "enzyme";
import "jest-styled-components";
import Button from "./Button";

describe("<Button/>", () => {
  // Render test
  it("should renders correctly", () => {
    const wrapper = shallow(<Button>Test</Button>);
    expect(wrapper).toMatchSnapshot();
  });

  it("render as a button element", () => {
    const wrapper = mount(<Button />);
    expect(wrapper.find("button").length).toBe(1);
  });

  it("render as a link element", () => {
    const wrapper = mount(<Button href="#" appearance="link" />);
    expect(wrapper.find("a").length).toBe(1);
  });

  it("should change to span tag if link with href button is disabled", () => {
    const wrapper = mount(<Button href="#" appearance="link" isDisabled />);
    expect(wrapper.find("span").length).toBe(1);
  });

  it("should render Child component", () => {
    const wrapper = mount(
      <Button>
        <div>Child</div>
      </Button>
    );
    expect(
      wrapper.contains(
        <Button>
          <div>Child</div>
        </Button>
      )
    ).toBeTruthy();
  });

  // Props test
  it("should add appearance props", () => {
    const wrapper = mount(<Button />);

    expect(Object.keys(wrapper.find("StyledComponent").props())).toEqual(
      expect.arrayContaining([
        "appearance",
        "className",
        "disabled",
        "isSelected",
        "fluid",
        "elementSize",
        "isLoading"
      ])
    );
  });

  it("should set tabIndex attribute when tabIndex prop is set", () => {
    let wrapper = mount(<Button tabIndex={0}>button</Button>);
    expect(wrapper.find("button").is("[tabIndex=0]")).toBe(true);
  });

  it("should set attributes", () => {
    expect(
      mount(<Button ariaHaspopup />).find("button[aria-haspopup=true]").length
    ).toBe(1);
    expect(
      mount(<Button ariaExpanded />).find("button[aria-expanded=true]").length
    ).toBe(1);
    expect(
      mount(<Button ariaControls="test" />).find('button[aria-controls="test"]')
        .length
    ).toBe(1);
    expect(
      mount(<Button ariaLabel="test" />).find('button[aria-label="test"]')
        .length
    ).toBe(1);
    expect(mount(<Button id="test" />).find('button[id="test"]').length).toBe(
      1
    );
  });

  it("should pass onClick from onClick props", () => {
    const onClick = () => {};
    const wrapper = mount(<Button onClick={onClick} />);
    expect(wrapper.find("StyledComponent").prop("onClick")).toEqual(
      expect.anything()
    );
  });

  it("should has autofocus", () => {
    const wrapper = mount(<Button id="test" autoFocus />);
    const id = document.activeElement ? document.activeElement.id : null;
    expect(wrapper.find("button").prop("id")).toEqual(id);
  });

  // Event test
  it("should trigger onClick when called", () => {
    const spy = jest.fn();
    const wrapper = shallow(<Button onClick={spy} />);
    wrapper.find("StyledButton").simulate("click");
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("shouldn't call onClick when button is disabled", () => {
    const spy = jest.fn();
    const wrapper = mount(<Button isDisabled onClick={spy} />);
    wrapper.find("StyledButton").simulate("click");
    expect(spy).not.toBeCalled();
  });

  it("should trigger onFocus handler on focus", () => {
    const spy = jest.fn();
    const wrapper = shallow(<Button onFocus={spy} />);
    wrapper.find("StyledButton").simulate("focus");
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should trigger onBlur handler on focus", () => {
    const spy = jest.fn();
    const wrapper = shallow(<Button onBlur={spy} />);
    wrapper.find("StyledButton").simulate("blur");
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should unmount button component", () => {
    const wrapper = shallow(<Button />);
    wrapper.unmount();
    expect(wrapper).not.toBe(true);
  });

  // getButtonStyle test
  // appearance
  it("should has right appearance style", () => {
    const defaultBtn = mount(<Button />);
    const primaryBtn = mount(<Button appearance="primary" />);
    const dangerBtn = mount(<Button appearance="danger" />);
    const warnBtn = mount(<Button appearance="warning" />);
    const successBtn = mount(<Button appearance="success" />);
    expect(defaultBtn).toHaveStyleRule("background", "#E2EAF2");
    expect(primaryBtn).toHaveStyleRule("background", "#008CC0");
    expect(dangerBtn).toHaveStyleRule("background", "#DC1F1F");
    expect(warnBtn).toHaveStyleRule("background", "#FA9B00");
    expect(successBtn).toHaveStyleRule("background", "#29A634");
  });
  // button size
  it("should has right size style", () => {
    const smBtn = mount(<Button elementSize="sm" />);
    const defaultBtn = mount(<Button />);
    const lgBtn = mount(<Button elementSize="lg" />);
    expect(smBtn).toHaveStyleRule("padding", "0.15rem 0.3rem");
    expect(smBtn).toHaveStyleRule("font-size", "0.7rem");
    expect(defaultBtn).toHaveStyleRule("padding", "0.35rem 0.4rem");
    expect(defaultBtn).toHaveStyleRule("font-size", "0.8rem");
    expect(lgBtn).toHaveStyleRule("padding", "0.45rem 0.6rem");
    expect(lgBtn).toHaveStyleRule("font-size", "0.9rem");
  });
  // loading style
  it("should render loading style", () => {
    const btn = mount(<Button isLoading />);
    expect(btn).toHaveStyleRule("animation", "loading 500ms infinite linear", {
      modifier: "::after"
    });

    const primaryBtn = mount(<Button isLoading appearance="primary" />);
    expect(primaryBtn).toHaveStyleRule("border-color", "#FFF", {
      modifier: "::after"
    });
  });
  // selected style
  it("should render selected style", () => {
    const btn = mount(<Button isSelected />);
    expect(btn).toHaveStyleRule("background", "#004660");

    const warnBtn = mount(<Button isSelected appearance="warning" />);
    expect(warnBtn).toHaveStyleRule("background", "#EF8100");

    const dangerBtn = mount(<Button isSelected appearance="danger" />);
    expect(dangerBtn).toHaveStyleRule("background", "#DC1F1F");
  });
});