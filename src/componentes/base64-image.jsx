
const Base64Image = ({ content, alt }) => <img src={`data:image/jpeg;base64,${content}`} alt={alt} />

export default Base64Image;
