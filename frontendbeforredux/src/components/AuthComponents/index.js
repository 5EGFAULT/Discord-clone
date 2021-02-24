import styled from "styled-components";
import { Link as LinkRouter } from "react-router-dom";
const AuthForm = styled.form`
  box-sizing: content-box;
  /* width: ${(props) => props.width}; */
  height: ${(props) => props.height};
  max-width: 100%;
  max-height: 100%;
  background-color: #36393f;
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  padding: 32px;
  border-radius: 5px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
  text-align: center;
  @media (max-width: 485px) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    padding: 70px 16px 40px;
    box-sizing: border-box;
  }
`;
const Headline = styled.div`
  font-weight: 600;
  margin-bottom: 8px;
  color: #fff;
  font-size: 24px;
  line-height: 30px;
  font-family: "Whitney Semibold Regular";
`;
const SubHeadline = styled.div`
  color: #b9bbbe;
  font-size: 16px;
  line-height: 20px;
  font-family: "Whitney Book Regular";
`;
const Link = styled(LinkRouter)`
  display: block;
  text-decoration: none;
  margin-bottom: 20px;
  margin-top: 2px;
  text-align: left;
  cursor: default;
  font-family: "Whitney Medium Regular";
  font-size: 14px;
  line-height: 16px;
  color: #7289da;
  &:hover {
    text-decoration: underline;
  }
`;
const Button = styled.div`
  box-sizing: border-box;
  padding: 2px 16px;
  width: 100%;
  height: 44px;
  min-height: 44px;
  min-width: 130px;
  margin-top: ${(props) => props.margintop};
  display: flex;
  align-items: center;
  background-color: #7289da;
  justify-content: center;
  transition: background-color 0.17s ease, color 0.17s ease;
  margin-bottom: ${(props) => props.marginbottom};
  color: #fff;
  font-family: "Whitney Medium Regular";
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    font-size: 16px;
    background-color: #677bc4;
  }
`;
const InfoSpan = styled.div`
  text-align: left;
  margin-top: 4px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: default;
  font-family: "Whitney Book Regular";
  font-size: 14px;
  color: #72767d;
  & a {
    margin-bottom: 0;
    margin-left: 5px;
  }
`;
export { AuthForm, Headline, SubHeadline, Link, Button, InfoSpan };
