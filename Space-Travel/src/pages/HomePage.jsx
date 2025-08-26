import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div id={styles['home-container']}>
      <h1>Space Travel: The Expansion of Humanity Beyond Earth</h1>
        <h2>Welcome to Space Travel</h2>
          <p>
            The year is 2437, and despite some improvement in planetary care, the Earth is on the brink of inhabitability. Space Travel has been in development for
            nearly two centuries and is proud to be up to the critical task of bring humanity to the reaches of our solar system, from the scorching hot surface of Mercury,
            to the distant blue planet Neptune. Here, you will be able to keep track of our interplanetary journey by keeping track of spacecraft information such as
            how many spacecraft are in operation, which spacecraft are on which planet, and how many people are aboard spacecraft as well as have populated planets.
            You will also have the power to create new spacecraft in order to achieve our mission. Welcome to Space Travel. See below for more information on Space Travel
            operations.
          </p>
        <h2 id={styles['home-container__nav-header']}>Navigation Space Travel</h2>
          <div id={styles['home-container__options-container']}>
            <h3>Home</h3>
              <p>
                You are currently viewing the Home Page. Here, you will be able to read a quick introduction on Space Travel and its mission. You will also gain insight into
                Space Travel operations and management in regards to various spacecraft and which planets they are travelling to, and with how many people. Let's save humanity
                and get everyone to the safety of the Final Frontier!
              </p>
            <h3>Spacecraft</h3>
              <p>
                Navigate to the Spacecraft Page to view a list of all functioning spacecraft and important details pertaining to our mission about each. You can click on any
                spacecraft to get more detailed information on it. From this page, you may destroy any spacecraft no longer required for operations, as well as create new spacecraft
                which will be added to the list.
              </p>
            <h3>Planets</h3>
              <p>
                Navigate to the Planets Page to view a list of all eligible planets for travel, as well as which spacecraft are on which planet. You may also find information about
                any planets population. From this page, you may reallocate people from one planet to another by selecting an available spacecraft and bring it and the
                people aboard to a new planet.
              </p>
            </div>
        <div id={styles['home-container__outro']}>Good luck, space adventurer, from all of us at Space Travel. The future begins here.</div>
    </div>
  );
}

export default HomePage