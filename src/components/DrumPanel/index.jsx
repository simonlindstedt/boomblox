import { StyledPanelWrapper, StyledButton } from "./styles";


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
              <select
               onChange={(e) => {
                 box.settings.speeds[key] = e.target.value;
                 setBox({ ...box});
               }}
               defaultValue={box.settings.speeds[key]}>
                <option value={0.25}>0.25</option>
                <option value={0.5}>0.5</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={4}>4</option>
                <option value={8}>8</option>
                <option value={16}>16</option>
              </select>
              <button
                onClick={() => {
                box.settings.sequences[key].push({ play: false, value: box.settings.sequences[key][0].value });
                setBox({ ...box });
                }}
              >
              Add step
              </button>
              <button
                onClick={() => {
                box.settings.sequences[key].pop();
                setBox({ ...box });
                }}
              >
              Remove step
              </button>
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
                <select
               onChange={(e) => {
                 box.settings.speeds[key] = e.target.value;
                 setBox({ ...box});
               }}
               defaultValue={box.settings.speeds[key]}>
                <option value={0.25}>0.25</option>
                <option value={0.5}>0.5</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={4}>4</option>
                <option value={8}>8</option>
                <option value={16}>16</option>
              </select>
              <button
                onClick={() => {
                box.settings.sequences[key].push({ play: false, value: box.settings.sequences[key][0].value });
                setBox({ ...box });
                }}
              >
              Add step
              </button>
              <button
                onClick={() => {
                box.settings.sequences[key].pop();
                setBox({ ...box });
                }}
              >
              Remove step
              </button>
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
                <select
               onChange={(e) => {
                 box.settings.speeds[key] = e.target.value;
                 setBox({ ...box});
               }}
               defaultValue={box.settings.speeds[key]}>
                <option value={0.25}>0.25</option>
                <option value={0.5}>0.5</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={4}>4</option>
                <option value={8}>8</option>
                <option value={16}>16</option>
              </select>
              <button
                onClick={() => {
                box.settings.sequences[key].push({ play: false, value: box.settings.sequences[key][0].value });
                setBox({ ...box });
                }}
              >
              Add step
              </button>
              <button
                onClick={() => {
                box.settings.sequences[key].pop();
                setBox({ ...box });
                }}
              >
              Remove step
              </button>
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
                  <option value={2}>Bass1</option>
                  <option value={5}>Bass2</option>
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
      <StyledButton onClick={close}>X</StyledButton>
    </StyledPanelWrapper>
  )
}

export default DrumPanel;