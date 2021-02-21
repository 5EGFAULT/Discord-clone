import { useRef, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Label = styled.div`
  text-transform: uppercase;
  text-align: left;
  margin-bottom: 8px;
  font-family: "Whitney Semibold Regular";
  font-size: 12px;
  line-height: 16px;
  cursor: default;
  color: #8e9297;
`;
const months = [
  { option: "January", isSelected: false },
  { option: "February", isSelected: false },
  { option: "March", isSelected: false },
  { option: "April", isSelected: false },
  { option: "May", isSelected: false },
  { option: "June", isSelected: false },
  { option: "July", isSelected: false },
  { option: "August", isSelected: false },
  { option: "September", isSelected: false },
  { option: "October", isSelected: false },
  { option: "November", isSelected: false },
  { option: "December", isSelected: false },
];
function DateSelector(props) {
  return (
    <div>
      <Label>{props.children}</Label>
      <Container>
        <Selector list={months} width="154">
          Month
        </Selector>
        {/* <Selector list={range(1, 31)} width="100"> */}
        <Selector list={months} width="100">
          Day
        </Selector>
        {/* <Selector list={range(1869, 2018).reverse()} width="120"> */}
        <Selector list={months} width="120">
          Year
        </Selector>
      </Container>
    </div>
  );
}
const Input = styled.input`
  flex-grow: 1;
  box-sizing: border-box;
  padding: 2px 10px;
  font-family: "Whitney Book Regular";
  font-size: 18px;
  line-height: normal;
  letter-spacing: normal;
  color: #dcddde;
  background-color: transparent;
  border: none;
  height: 40px;
  line-height: 18px;

  &:focus {
    outline: none;
    /* border: 1px solid #7289da; */
  }
`;
function range(start, end) {
  return Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx);
}
const Svg = styled.svg`
  /* fill: #dcddde; */
  fill: #b9bbbe;
  stroke-width: 0px;
  margin-right: 8px;
  cursor: pointer;
`;
const SelectorContainer = styled.div`
  position: relative;
  width: ${(props) => props.width + "px"};
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  background-color: #0000001a;
  border: 1px solid #0000004d;
  border-radius: 3px;
  transition: border-color 0.2s ease-in-out;
  &:hover {
    border-color: #040405;
  }
  & input {
    width: ${(props) => props.width - 28 + "px"};
  }
`;
const OptionList = styled.div`
  display: none;
  width: 100%;
  height: 225px;
  border: 1px solid #0000004d;
  border-radius: 3px;
  transition: border-color 0.2s ease-in-out;
  &:hover {
    border-color: #040405;
  }
  background-color: #313339;
  overflow-y: scroll;
  box-sizing: border-box;
  position: absolute;
  bottom: 40px;
  left: 0;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
`;
const Option = styled.div`
  height: 40px;
  text-align: left;
  font-family: "Whitney Book Regular";
  padding: 10px 8px;
  font-size: 18px;
  line-height: 18px;
  letter-spacing: normal;
  cursor: pointer;
  color: #dcddde;
  background-color: ${(props) =>
    props.isSelected ? "#202225" : "transparent"};
  &:hover {
    background-color: #292b2f;
  }
`;

function Selector(props) {
  let OptionListref = useRef(null);
  let Optionrefs = useRef([]);
  let Inputref = useRef(null);
  const [list, setlist] = useState(
    // false
    props.list
  );
  const [count, setCount] = useState(0);
  const select = (index) => {
    // isSelected = Array(props.list.length).fill(false, 0, props.list.length);
    list[index].isSelected = true;
    return list;
  };
  return (
    <SelectorContainer
      width={props.width}
      onFocus={(e) => {
        OptionListref.current.style.display = "block";
      }}
      onBlur={(e) => {
        // console.log(e.target);
        // OptionListref.current.style.display = "none";
      }}
    >
      <Input placeholder={props.children} ref={Inputref} />
      {/* <Input placeholder={count} ref={Inputref} /> */}
      <Svg
        onClick={(e) => Inputref.current.focus()}
        height="20"
        width="20"
        viewBox="0 0 20 20"
        focusable="false"
      >
        <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
      </Svg>
      <OptionList ref={OptionListref}>
        {/* <Option isSelected={true}></Option> */}
        {list.map(({ option, isSelected }) => (
          <Option
            key={option}
            ref={(ref) => Optionrefs.current.push(ref)}
            isSelected={
              // console.table(isSelected)
              isSelected
              // isSelected[props.list.findIndex((element) => element === option)]
            }
            onClick={(e) => {
              console.log(
                props.list.findIndex((element) => element.option === option)
              );
              setlist(
                select(
                  props.list.findIndex((element) => element.option === option)
                )
                // (isSelected[
                //   props.list.findIndex((element) => element === option)
                // ] = true)
                // true
              );
              console.table(list);
              OptionListref.current.style.display = "none";
            }}
          >
            {option}
          </Option>
        ))}
      </OptionList>
    </SelectorContainer>
  );
}
export default DateSelector;
