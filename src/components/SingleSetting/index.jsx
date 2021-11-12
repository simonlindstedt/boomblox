import { StyledSingleSetting } from './styles';

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
          step={0.001}
          onChange={handleOnChange}
        />
      </StyledSingleSetting>
    );
  }

  if (setting === 'freq') {
    return (
      <StyledSingleSetting>
        <p>{setting}</p>
        <input
          type="range"
          defaultValue={value}
          min={20}
          max={10000}
          step={0.01}
          onChange={handleOnChange}
        />
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
          min={1}
          max={20}
          step={0.5}
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
          step={0.001}
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
          step={0.001}
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
    console.log(value);
    return value.map((sequence, key) => {
      switch (key) {
        case 0:
          return (<div>
            <select>
              <option value={0}>Hihat1</option>
              <option value={3}>Hihat2</option>
            </select>
            {value[key].map(step => {
              return <input type="checkbox" defaultChecked={step.play} />
            })}
          </div>)
        break;
        case 1:
          return (<div>
            <select>
              <option value={1}>Clap1</option>
              <option value={4}>Clap2</option>
            </select>
            {value[key].map(step => {
              return <input type="checkbox" defaultChecked={step.play} />
            })}
          </div>)
        break;
        case 2: 
        return (<div>
          <select>
            <option value={3}>Bass1</option>
            <option value={6}>Bass2</option>
          </select>
          {value[key].map(step => {
            return <input type="checkbox" defaultChecked={step.play} />
            })}
          </div>)
        break;
      }
  })
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
          step={0.001}
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
          max={2.0}
          step={0.001}
          onChange={handleOnChange}
        />
      </StyledSingleSetting>
    );
  }
  return null;
};

export default SingleSetting;
