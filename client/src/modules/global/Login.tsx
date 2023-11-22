import { useState, useEffect} from 'react'

export default function Login() {
  const [data, setData] = useState('');
  const [selectedText, setSelectedText] = useState('');

  useEffect(() => {
    fetch('https://www.irctc.co.in/eticketing/trainList') // Replace '/api/textData' with the actual API endpoint URL
      .then((response) => response.text()) // Parse the response as text
      .then((textData) => setData(textData))
      .catch((error) => <div>{error}</div>);
  }, []);

 const regex = /"(.*?)"/g;
const textArray: string[] = data.match(regex) || [];

textArray.forEach((item, index, array) => {
  array[index] = item.replace(/"/g, '');
});

const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  setSelectedText(event.target.value);
};

  return (
    <div>
      <form>
  <label htmlFor="firstName">First Name:</label>
  <input type="text" id="firstName" name="firstName" placeholder="Enter your first name"/>

  <label htmlFor="colorChoice">Select your favorite color:</label>
  <select id="colorChoice" name="colorChoice">
    <option value="red">Red</option>
    <option value="green">Green</option>
    <option value="blue">Blue</option>
    <option value="purple">Purple</option>
  </select>

  <button type="submit">Submit</button>
</form>

      <select onChange={handleChange} value={selectedText}>
        {textArray.map((train, index) => {
          return <option key={index} value={train}>{train}</option>
          
        }) }
      </select>
      <p>{selectedText}</p>
    </div>
  );
}
