import propTypes from 'prop-types';
import { StyledTitle } from './styles';

const Title = ({ title }) => {
  return <StyledTitle>{title}</StyledTitle>;
};

Title.propTypes = {
  title: propTypes.string,
};
export default Title;
