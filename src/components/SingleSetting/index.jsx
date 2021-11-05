const SingleSetting = ({ setting, boxType, value, handleOnChange }) => {
  if (setting === 'volume') {
    return (
      <div>
        <p>{setting}</p>
        <input
          type="range"
          defaultValue={value}
          min={0.0}
          max={1.0}
          step={0.001}
          onChange={handleOnChange}
        />
      </div>
    );
  }

  if (setting === 'freq') {
    return (
      <div>
        <p>{setting}</p>
        <input
          type="range"
          defaultValue={value}
          min={20}
          max={10000}
          step={0.01}
          onChange={handleOnChange}
        />
      </div>
    );
  }

  if (setting === 'rate') {
    return (
      <div>
        <p>{setting}</p>
        <input
          type="range"
          defaultValue={value}
          min={1}
          max={20}
          step={0.5}
          onChange={handleOnChange}
        />
      </div>
    );
  }

  if (setting === 'maxValue' && boxType === 'frequency-lfo') {
    return (
      <div>
        <p>{setting}</p>
        <input
          type="range"
          defaultValue={value}
          min={20}
          max={10000}
          step={0.001}
          onChange={handleOnChange}
        />
      </div>
    );
  }
  if (setting === 'maxValue' && boxType === 'amplitude-lfo') {
    return (
      <div>
        <p>{setting}</p>
        <input
          type="range"
          defaultValue={value}
          min={0.0}
          max={1.0}
          step={0.001}
          onChange={handleOnChange}
        />
      </div>
    );
  }
  if (setting == 'type') {
    return (
      <div>
        <p>{setting}</p>
        <select onChange={handleOnChange} defaultValue={value}>
          <option value="sine">Sine</option>
          <option value="sawtooth">Sawtooth</option>
          <option value="triangle">Triangle</option>
          <option value="square">Square</option>
        </select>
      </div>
    );
  }

  return null;
};

export default SingleSetting;
