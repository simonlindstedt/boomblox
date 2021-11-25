import { StyledSingleSetting } from './styles';
import notes from '../../Helpers/middleScale';
import propTypes from 'prop-types';

const SingleSetting = ({ setting, boxType, value, handleOnChange }) => {
  if (setting === 'volume') {
    return (
      <StyledSingleSetting>
        <p>{setting}</p>
        <input
          type="range"
          defaultValue={value}
          min={0.0}
          max={1.0}
          step={0.01}
          onChange={handleOnChange}
        />
      </StyledSingleSetting>
    );
  }

  if (setting === 'freq' && boxType === 'filter') {
    return (
      <StyledSingleSetting>
        <p>{setting}</p>
        <input
          type="range"
          defaultValue={value}
          min={20}
          max={10000}
          step={1}
          onChange={handleOnChange}
        />
      </StyledSingleSetting>
    );
  }

  if (setting === 'freq' && boxType === 'osc') {
    return (
      <>
        <StyledSingleSetting>
          <select defaultValue={value} onChange={handleOnChange}>
            {notes.map((note, key) => {
              return (
                <option key={key} value={note.freq}>
                  {note.name}
                </option>
              );
            })}
          </select>
        </StyledSingleSetting>
      </>
    );
  }

  if (setting === 'octave' && boxType === 'osc') {
    return (
      <StyledSingleSetting>
        <select defaultValue={value} onChange={handleOnChange}>
          <option value={1 / 32}>-5</option>
          <option value={1 / 16}>-4</option>
          <option value={1 / 8}>-3</option>
          <option value={1 / 4}>-2</option>
          <option value={1 / 2}>-1</option>
          <option value={1}>0</option>
          <option value={2}>+1</option>
          <option value={4}>+2</option>
          <option value={8}>+3</option>
          <option value={16}>+4</option>
          <option value={32}>+5</option>
        </select>
      </StyledSingleSetting>
    );
  }

  if (setting === 'detune' && boxType === 'osc') {
    return (
      <StyledSingleSetting>
        <p>{setting}</p>
        <input
          type="range"
          defaultValue={value}
          min={-50}
          max={50}
          step={0.5}
          onChange={handleOnChange}
        />
      </StyledSingleSetting>
    );
  }
  if (setting === 'glide' && boxType === 'osc') {
    return (
      <StyledSingleSetting>
        <select onChange={handleOnChange} defaultValue={value}>
          <option value={1}>glide</option>
          <option value={0}>no glide</option>
        </select>
      </StyledSingleSetting>
    );
  }

  if (setting === 'rate') {
    return (
      <StyledSingleSetting>
        <p>{setting}</p>
        <input
          type="range"
          defaultValue={value}
          min={0.001}
          max={20.0}
          step={0.1}
          onChange={handleOnChange}
        />
      </StyledSingleSetting>
    );
  }

  if (setting === 'maxValue' && boxType === 'frequency-lfo') {
    return (
      <StyledSingleSetting>
        <p>{setting}</p>
        <input
          type="range"
          defaultValue={value}
          min={20}
          max={10000}
          step={0.1}
          onChange={handleOnChange}
        />
      </StyledSingleSetting>
    );
  }
  if (setting === 'maxValue' && boxType === 'amplitude-lfo') {
    return (
      <StyledSingleSetting>
        <p>{setting}</p>
        <input
          type="range"
          defaultValue={value}
          min={0.0}
          max={1.0}
          step={0.01}
          onChange={handleOnChange}
        />
      </StyledSingleSetting>
    );
  }
  if (setting === 'type' && boxType === 'osc') {
    return (
      <StyledSingleSetting>
        <p>{setting}</p>
        <select onChange={handleOnChange} defaultValue={value}>
          <option value="sine">Sine</option>
          <option value="sawtooth">Sawtooth</option>
          <option value="triangle">Triangle</option>
          <option value="square">Square</option>
        </select>
      </StyledSingleSetting>
    );
  }
  if (setting === 'type' && boxType === 'frequency-lfo') {
    return (
      <StyledSingleSetting>
        <p>{setting}</p>
        <select onChange={handleOnChange} defaultValue={value}>
          <option value="sine">Sine</option>
          <option value="sawtooth">Sawtooth</option>
          <option value="triangle">Triangle</option>
          <option value="square">Square</option>
        </select>
      </StyledSingleSetting>
    );
  }
  if (setting === 'type' && boxType === 'amplitude-lfo') {
    return (
      <StyledSingleSetting>
        <p>{setting}</p>
        <select onChange={handleOnChange} defaultValue={value}>
          <option value="sine">Sine</option>
          <option value="sawtooth">Sawtooth</option>
          <option value="triangle">Triangle</option>
          <option value="square">Square</option>
        </select>
      </StyledSingleSetting>
    );
  }
  if (setting === 'type' && boxType === 'filter') {
    return (
      <StyledSingleSetting>
        <p>{setting}</p>
        <select onChange={handleOnChange} defaultValue={value}>
          <option value="lowpass">Lowpass</option>
          <option value="highpass">Highpass</option>
          <option value="bandpass">Bandpass</option>
          <option value="lowshelf">Lowshelf</option>
          <option value="highshelf">Highshelf</option>
          <option value="peaking">Peaking</option>
          <option value="notch">Notch</option>
          <option value="allpass">Allpass</option>
        </select>
      </StyledSingleSetting>
    );
  }

  if (setting === 'volume' && boxType === 'drum') {
    return (
      <div>
        <p>{setting}</p>
      </div>
    );
  }

  if (setting === 'sequences' && boxType === 'drum') {
    return value.map((sequence, key) => {
      switch (key) {
        case 0:
          return (
            <div>
              <select>
                <option value={0}>Hihat1</option>
                <option value={3}>Hihat2</option>
              </select>
              {value[key].map((step) => {
                return <input type="checkbox" defaultChecked={step.play} />;
              })}
            </div>
          );
          break;
        case 1:
          return (
            <div>
              <select>
                <option value={1}>Clap1</option>
                <option value={4}>Clap2</option>
              </select>
              {value[key].map((step) => {
                return <input type="checkbox" defaultChecked={step.play} />;
              })}
            </div>
          );
          break;
        case 2:
          return (
            <div>
              <select>
                <option value={3}>Bass1</option>
                <option value={6}>Bass2</option>
              </select>
              {value[key].map((step) => {
                return <input type="checkbox" defaultChecked={step.play} />;
              })}
            </div>
          );
          break;
      }
    });
  }

  if (setting === 'feedback' && boxType === 'delay') {
    return (
      <StyledSingleSetting>
        <p>{setting}</p>
        <input
          type="range"
          defaultValue={value}
          min={0.0}
          max={1.0}
          step={0.01}
          onChange={handleOnChange}
        />
      </StyledSingleSetting>
    );
  }

  if (setting === 'delayTime' && boxType === 'delay') {
    return (
      <StyledSingleSetting>
        <p>{setting}</p>
        <input
          type="range"
          defaultValue={value}
          min={0.0}
          max={1000.0}
          step={0.01}
          onChange={handleOnChange}
        />
      </StyledSingleSetting>
    );
  }
  return null;
};

SingleSetting.propTypes = {
  setting: propTypes.string,
  boxType: propTypes.string,
  value: propTypes.oneOfType([propTypes.number, propTypes.string]),
  handleOnChange: propTypes.func,
};

export default SingleSetting;
