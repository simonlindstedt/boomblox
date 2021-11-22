import { StyledInstructions } from './styles';
import Button from '../Button';
import propTypes from 'prop-types';

const Instructions = ({ helpIsActive, setHelpIsActive }) => {
  const variants = {
    hidden: {
      x: '100%',
    },
    visible: {
      x: 0,
    },
  };
  return (
    <StyledInstructions
      initial="hidden"
      animate={helpIsActive ? 'visible' : 'hidden'}
      variants={variants}
    >
      <h3>Getting started</h3>
      <ul>
        <li>
          <span>Connect and disconnect</span> the boxes by clicking the green
          connection line.
        </li>
        <li>
          <span>Oscillators, drums and recordings</span> can connect to reverb,
          filter, delay and master.
        </li>
        <li>
          <span>When using the recording box</span>, you need to first record
          something in order to connect it to another object.
        </li>
        <li>
          <span>The sequencer</span> can only connect to oscillators.
        </li>
        <li>
          <span>The LFOS</span> can connect to oscillators and filter.
        </li>
        <li>
          <span>The last audio object</span> in your chain needs to be connected
          to the master box in order to get sound to your speakers.
        </li>
        <li>
          <span>Click on an audio object</span> to change the settings such as
          volume, frequency, rate, sequence and sound
        </li>
        <li>
          <span>To delete an object</span> drag it over the trash can in the
          bottom left corner.
        </li>
      </ul>
      <Button
        handleClick={() => {
          setHelpIsActive(false);
        }}
      >
        Got it!
      </Button>
    </StyledInstructions>
  );
};
Instructions.propTypes = {
  helpIsActive: propTypes.bool,
  setHelpIsActive: propTypes.func,
};
export default Instructions;
