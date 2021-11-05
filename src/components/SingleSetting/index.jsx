const SingleSetting = ({ setting, value, handleOnChange }) => {
  if (setting === "volume") {
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

  if (setting === "freq") {
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

  if (setting === "rate") {
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

  if (setting === "maxValue") {
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

  return null;
};

export default SingleSetting;
