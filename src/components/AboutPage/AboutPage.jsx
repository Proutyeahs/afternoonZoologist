import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <p># Afternoon Zoologist</p>

        <p>This app is a functional prototype of my text heavy RPG game.</p>

        <p>
          I was inspired to create this game while I worked as an assistant teacher.  My students were often caught playing idle games such as CookieClicker or Idle BrickBreaker.  I wanted to create something educational that would work similarly to these popular idle games.
          I drew my inspiration from table top board games, as well as text adventures I played growing up.  These games helped me to develop my reading skills when I was younger and I wanted to create something similar for my students who were falling behind with their reading abilities.
        </p>
        In Afternoon Zoologist you are able to move around and explore the world I created with descriptions, events, quests, animals and more, all of which is completely text oriented.  The animals depicted are all extinct or endangered animals with depictions of what they used to look like and the environments they inhabited.  You will be able to Tame these animals and bring them along with you on your journey.  Leveling up can be done manually or you will be able to start an auto battle and let the game run while you get some real work done!
        <p>
          ### Updates
        </p>
        <p>
          This is still very much a work in progress.
          I have a lot of features planned as well as the story and map descriptions.
        </p>
        <p>
          I am currently prioritizing functionality and bug fixes over the text aspect of the game. Updates, images, gifs, and eventually hosting will come as I continue working on this project!
        </p>
        <p>
          ## Contact me:
          Eric.w.Prouty@gmail.com
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
