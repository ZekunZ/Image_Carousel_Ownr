import "./App.css";
import Slider from "./components/Slider";
import Spinner from "./components/Spinner";
import { useState, useEffect } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [toggleCatsImages, setToggleCatsImages] = useState(true);
  const [toggleSharksImages, setToggleSharksImages] = useState(true);

  // Handle fetch with loading
  const handleFetch = () => {
    setIsLoading(true);
    fetch("http://localhost:5000/api/images")
      .then((response) => response.json())
      .then((response) => {
        // filter to get only the cat images or only the sharks images
        if (toggleCatsImages === true && toggleSharksImages === false) {
          response = response.filter((element) =>
            element.image.includes("cats")
          );
        } else if (toggleCatsImages === false && toggleSharksImages === true) {
          response = response.filter((element) =>
            element.image.includes("sharks")
          );
        } else if (toggleCatsImages === false && toggleSharksImages === false) {
          response = [{}]; // if both toggle button are turned off, send array with empty object
        } else {
          // send all photos but shuffled
          const shuffleArray = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
              let j = Math.floor(Math.random() * (i + 1));
              let temp = array[i];
              array[i] = array[j];
              array[j] = temp;
            }
          };
          shuffleArray(response);
        }
        // Optional code to simulate delay of 0.5s
        setTimeout(() => {
          setImages(response);
          setIsLoading(false);
        }, 500);
      });
  };

  // render the image slides
  useEffect(() => {
    handleFetch();
  }, [toggleCatsImages, toggleSharksImages]);

  return (
    <>
      <div className="container">
        <div className="btn-container">
          <button
            data-testid="cats-btn"
            className={toggleCatsImages ? "btn" : "btnToggled"}
            onClick={() => setToggleCatsImages(!toggleCatsImages)}
          >
            Cats
          </button>
          <button
            data-testid="sharks-btn"
            className={toggleSharksImages ? "btn" : "btnToggled"}
            onClick={() => setToggleSharksImages(!toggleSharksImages)}
          >
            Sharks
          </button>
        </div>
        {isLoading ? <Spinner /> : <Slider slides={images} />}
      </div>
    </>
  );
}

export default App;
