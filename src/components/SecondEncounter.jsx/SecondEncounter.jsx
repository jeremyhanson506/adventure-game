import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Backpack from "../Backpack/Backpack";
import './SecondEncounter.css';


function SecondEncounter() {
  const dispatch = useDispatch();
  const history = useHistory();
  const selectedCharacter = useSelector((store) => store.selectedCharacter);
  const backpack = useSelector((store) => store.backpack);
  const energyPoints = useSelector((store) => store.energyPoints);
  const hitPoints = useSelector((store) => store.hitPoints);
  const [dinoKick, setDinoKick] = useState(false);
  const [isAttacking, setIsAttacking] = useState(false);
  const [winGame, setWinGame] = useState(false);
  const [isDown, setIsDown] = useState(false);

  useEffect(() => {
    dispatch({
      type: 'SAGA/FETCH_SELECTED_CHARACTER'
    })
    dispatch({
      type: 'SAGA/FETCH_BACKPACK'
    })
  }, [])

  const kick = () => {
    setDinoKick(true);
    setTimeout(enemyAttack, 600);
  }

  const deathKick = () => {
    setDinoKick(true);
    setTimeout(enemyDeath, 600);
  }

  const enemyDeath = () => {
    setIsAttacking(false);
    setDinoKick(false);
    setWinGame(true);
  }

  const enemyAttack = () => {
    if (hitPoints <= 0) {
      enemyDeath();
    } else {
      setDinoKick(false);
      setIsAttacking(true);

      dispatch({
        type: 'SUBTRACT_ENERGY_DAMAGE'
      })

      if (winGame) {
        setTimeout(guardianDown, 900);
      } else {
        setTimeout(returnToIdle, 900);
      }
    }
  }

  const guardianDown = () => {
    setWinGame(true);
    setIsDown(true);
  }

  const returnToIdle = () => {
    setDinoKick(false);
    setIsAttacking(false);
  }

  // handle item click
  const handleItemClick = (item) => {
    let energyToSubtract = item.energy_cost;
    let healthToSubtract = item.attack_damage;

    dispatch({
      type: 'SUBTRACT_ENERGY_COST',
      payload: energyToSubtract
    })
    dispatch({
      type: 'SUBTRACT_HIT_POINTS',
      payload: healthToSubtract
    })


    if (hitPoints <= 0) {
      deathKick();
    } else {
      kick();
    }
  }

  const goToFriendPage = () => {
    history.push('/friend');
  }

  // DEFAULT (IDLE)
  if (!dinoKick && !isAttacking && !winGame) {
    return (
      <>
        <div className="encounterDiv">
          <img id="backgroundImg" src="/images/battle-background-sunny-hills.png"/>
          {/* <div id="energyDiv">
            <label for="energyBar">Energy Points</label>
            <progress 
              id="energyBar" 
              value={energyPoints}
              max="200"
            >
            </progress>
            <p>{energyPoints}</p>
          </div> */}
          {/* use && operator to wait for the reducer to be populated */}
          <div className={selectedCharacter[0] && selectedCharacter[0].idle_class}></div>
          <div id="backpackDiv">
            {backpack.map((item) => {
              return (
                <button onClick={() => handleItemClick(item)}>
                  <Backpack key={item.id} item={item}/>
                </button>
              )
            })}
          </div>
          {/* <div id="healthDiv">
            <label for="healthBar">Hit Points</label>
            <progress 
              id="healthBar" 
              value={hitPoints}
              max="100"
            >
            </progress>
            <p>{hitPoints}</p>
          </div> */}
          <div className='golemIdle'></div>
          <div id="textBoxDiv">
            <p id="textBoxText">{selectedCharacter[0] && selectedCharacter[0].name}: "Oh my garsh! Another Baddy!? Oh no!" 
              <br/>Use the Dino Kick button to defeat them to continue on.
            </p>
          </div>
        </div>
      </>
    )

    // CHARACTER ACTION
  } else if (dinoKick) {
    return (
      <>
        <div className="encounterDiv">
          <img id="backgroundImg" src="/images/battle-background-sunny-hills.png"/>
          {/* <div id="energyDiv">
            <label for="energyBar">Energy Points</label>
            <progress 
              id="energyBar" 
              value={energyPoints}
              max="200"
            >
            </progress>
            <p>{energyPoints}</p>
          </div> */}
          {/* use && operator to wait for the reducer to be populated */}
          <div className={selectedCharacter[0] && selectedCharacter[0].kick_class}></div>
          {/* <div id="backpackDiv">
            {backpack.map((item) => {
              return (
                <button onClick={() => handleItemClick(item)}>
                  <Backpack key={item.id} item={item}/>
                </button>
              )
            })}
          </div> */}
          {/* <div id="healthDiv">
            <label for="healthBar">Hit Points</label>
            <progress 
              id="healthBar" 
              value={hitPoints}
              max="100"
            >
            </progress>
            <p>{hitPoints}</p>
          </div> */}
          <div className="golemHurt"></div>
          <div id="textBoxDiv">
            <p id="textBoxText">{selectedCharacter[0] && selectedCharacter[0].name}: "Take that you bully!"</p>
          </div>
        </div>
      </>
    )

    // ENEMY ACTION
  } else if (isAttacking) {
    return (
      <>
        <div className="encounterDiv">
          <img id="backgroundImg" src="/images/battle-background-sunny-hills.png"/>
          {/* <div id="energyDiv">
            <label for="energyBar">Energy Points</label>
            <progress 
              id="energyBar" 
              value={energyPoints}
              max="200"
            >
            </progress>
            <p>{energyPoints}</p>
          </div> */}
          {/* use && operator to wait for the reducer to be populated */}
          <div className={selectedCharacter[0] && selectedCharacter[0].hurt_class}></div>
          {/* <div id="backpackDiv">
            {backpack.map((item) => {
              return (
                <button onClick={() => handleItemClick(item)}>
                  <Backpack key={item.id} item={item}/>
                </button>
              )
            })}
          </div> */}
          {/* <div id="healthDiv">
            <label for="healthBar">Hit Points</label>
            <progress 
              id="healthBar" 
              value={hitPoints}
              max="100"
            >
            </progress>
            <p>{hitPoints}</p>
          </div> */}
          <div className="golemAttack"></div>
          <div id="textBoxDiv">
            <p id="textBoxText">{selectedCharacter[0] && selectedCharacter[0].name}: "Take that you bully!"</p>
          </div>
        </div>
      </>
    )

    // ENEMY DEATH
  } else if (winGame) {
    return (
      <>
        <div className="encounterDiv">
          <img id="backgroundImg" src="/images/battle-background-sunny-hills.png"/>
          {/* <div id="energyDiv">
            <label for="energyBar">Energy Points</label>
            <progress 
              id="energyBar" 
              value={energyPoints}
              max="200"
            >
            </progress>
            <p>{energyPoints}</p>
          </div> */}
          {/* use && operator to wait for the reducer to be populated */}
          <div className={selectedCharacter[0] && selectedCharacter[0].idle_class}></div>
          {/* <div id="backpackDiv">
            {backpack.map((item) => {
              return (
                <button onClick={() => handleItemClick(item)}>
                  <Backpack key={item.id} item={item}/>
                </button>
              )
            })}
          </div> */}
          {/* <div id="healthDiv">
            <label for="healthBar">Hit Points</label>
            <progress 
              id="healthBar" 
              value={hitPoints}
              max="100"
            >
            </progress>
            <p>{hitPoints}</p>
          </div> */}
          <div className="golemDeath"></div>
          <div id="textBoxDiv">
            <p id="textBoxText">{selectedCharacter[0] && selectedCharacter[0].name}: "Finally! I really hope that's the last of the baddies!"</p>
          </div>
          <button id="goToRunningPageButton" onClick={goToFriendPage}>Continue</button>
        </div>
      </>
    )
  }
}


export default SecondEncounter;