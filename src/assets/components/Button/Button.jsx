const Button = ({
  temperature,
  setTemperature,
  temperatureChanged,
  setTemperatureChanged,
}) => {
  const toggleTemp = () => {
    if (temperatureChanged) {
      const newTemp = (5 / 9) * (temperature - 32);
      setTemperature(newTemp);
      setTemperatureChanged(false);
    } else {
      const newTemp = temperature * (9 / 5) + 32;
      setTemperature(newTemp);
      setTemperatureChanged(true);
    }
  };
  return (
    <button onClick={toggleTemp} className="btn btn-primary bg-violet-500 my-5 mx-8">
      {temperatureChanged ? 'Change to °C' : 'Change to °F'}
    </button>
  );
};

export default Button;
