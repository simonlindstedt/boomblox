import { StyledPanelWrapper } from "../SettingsPanel/styles";

const DrumPanel = ({box, setBox}) => {

  const close = () => {
    setBox(null);
  }
  return (
    <StyledPanelWrapper>
      <p>Volume</p>
      <input 
        type="range"
        min={0.0} 
        max={1.0} 
        step={0.001} 
        defaultValue={box.settings.volume} 
        onChange={(e) => {
          box.settings.volume = parseFloat(e.target.value);
          setBox({...box});
        }}
      />
      <p>{box.settings.volume}</p>
      {box.settings.sequences.map((sequence, key) => {
        switch(key) {
          case 0:
            return (
            <div>
              <select onChange={(e) => {
                let value = parseInt(e.target.value);
                let newSequence = [];
                for(let i = 0; i < sequence.length; i++) {
                  newSequence[i] = sequence[i];
                  newSequence[i].value = value;
                }
                box.settings.sequences[key] = newSequence;
                setBox({ ...box })
              }}>
                <option value={0}>Hihat1</option>
                <option value={3}>Hihat2</option>
              </select>
              {sequence.map((step, key) => {
                return <input type="checkbox" defaultChecked={step.play} onChange={(e) => {
                  sequence[key].play = e.target.checked;
                }}/>;
              })}
            </div>
            )
          break;
          case 1:
            return (
              <div>
                <select onChange={(e) => {
                  let value = parseInt(e.target.value);
                  let newSequence = [];
                  for(let i = 0; i < sequence.length; i++) {
                    newSequence[i] = sequence[i];
                    newSequence[i].value = value;
                  }
                  box.settings.sequences[key] = newSequence;
                  setBox({ ...box })
                  }}>
                  <option value={1}>Clap1</option>
                  <option value={4}>Clap2</option>
                </select>
                {sequence.map((step, key) => {
                  return <input type="checkbox" defaultChecked={step.play} onChange={(e) => {
                    sequence[key].play = e.target.checked;
                  }}/>;
                })}
              </div>
              )
          break;
          case 2:
            return (
              <div>
                <select onChange={(e) => {
                  let value = parseInt(e.target.value);
                  let newSequence = [];
                  for(let i = 0; i < sequence.length; i++) {
                    newSequence[i] = sequence[i];
                    newSequence[i].value = value;
                  }
                  box.settings.sequences[key] = newSequence;
                  setBox({ ...box })
                  }}
                >
                  <option value={3}>Bass1</option>
                  <option value={6}>Bass2</option>
                </select>
                {sequence.map((step, key) => {
                  return <input type="checkbox" defaultChecked={step.play} onChange={(e) => {
                    sequence[key].play = e.target.checked;
                  }}/>;
                })}
              </div>
            )
          break;
        }
      })}
      <button onClick={close}>X</button>
    </StyledPanelWrapper>
  )
}

export default DrumPanel;