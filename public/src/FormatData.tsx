const mapsApiKey = "AIzaSyCN7woQsDeorcNqAVGPccCb2F4X3GM7oso";

const formatData = () => {
  const fetchData = async () => {
    const url = `https://api.api-ninjas.com/v1/babynames?key=${mapsApiKey}`;

    const response: Response = await fetch(url);
    const names = response.json();
    return names;
  };

  fetchData().then((names) => {
    console.log(names);
    setNames(names);
  });
};
