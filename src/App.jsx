import { useState } from "react"
import { Square } from "./Componenets/Square"
import { Modal } from "./Componenets/Modal"




export const App = () => {

  const [useClick, setUseClick] = useState(true)

  let imgSrc = "./assets/images/o.svg"
  let gameFinished = false
  const [playing2players, setPlaying2players] = useState(false)

  const modal = document.querySelector('#modal')
  const modalBg = document.querySelector('#modalBg')
  const modalText = document.querySelector('#modalText')


  const pos11 = document.querySelector('#pos0')
  const pos12 = document.querySelector('#pos1')
  const pos13 = document.querySelector('#pos2')
  const pos21 = document.querySelector('#pos3')
  const pos22 = document.querySelector('#pos4')
  const pos23 = document.querySelector('#pos5')
  const pos31 = document.querySelector('#pos6')
  const pos32 = document.querySelector('#pos7')
  const pos33 = document.querySelector('#pos8')


  const onGameMode = ({ target:{ value } }) => {
    if ( value === 'pvsc' ) setPlaying2players( false )
    if ( value === 'pvsp' ) setPlaying2players( true )
  } 

  const handleClick = ({ target }) => {  
    if (playing2players){
      if (gameFinished) return
      if(target.classList.contains('opacity-0')){
        target.classList.remove('opacity-0')
        useClick ? target.parentElement.setAttribute('data-id','o') : target.parentElement.setAttribute('data-id','x')
        useClick ? imgSrc = "./assets/images/x.svg" : imgSrc = "./assets/images/o.svg"
        const pendingImgs = [...document.querySelectorAll('.opacity-0')]
        pendingImgs.forEach( e => e.src = imgSrc)
        setUseClick(!useClick)
        try{checkStatusArr()}catch{}    
      }   
    }
    else{
      if (gameFinished) return
      if(target.classList.contains('opacity-0')){
        target.classList.remove('opacity-0')
        target.parentElement.setAttribute('data-id','o')
        try{checkStatusArr()}catch{}

        const pendingImgs = [...document.querySelectorAll('.opacity-0')]
        if ( pendingImgs.length > 0 ){
          const randomPos = Math.floor(Math.random()*pendingImgs.length)
          pendingImgs[randomPos].setAttribute('src', "./assets/images/x.svg")
          pendingImgs[randomPos].parentElement.setAttribute('data-id','x')        
          setTimeout(() => {
            pendingImgs[randomPos].classList.remove('opacity-0')
            try{checkStatusArr()}catch{} 
          }, 500); 
        }
        else{ checkStatusArr }
      }
        
    }
  }
    
  const checkStatusArr = () => {
    const data =[
      [pos11.getAttribute('data-id'), pos12.getAttribute('data-id'), pos13.getAttribute('data-id')],
      [pos21.getAttribute('data-id'), pos22.getAttribute('data-id'), pos23.getAttribute('data-id')],
      [pos31.getAttribute('data-id'), pos32.getAttribute('data-id'), pos33.getAttribute('data-id')],
      [pos11.getAttribute('data-id'), pos21.getAttribute('data-id'), pos31.getAttribute('data-id')],
      [pos12.getAttribute('data-id'), pos22.getAttribute('data-id'), pos32.getAttribute('data-id')],
      [pos13.getAttribute('data-id'), pos23.getAttribute('data-id'), pos33.getAttribute('data-id')],
      [pos11.getAttribute('data-id'), pos22.getAttribute('data-id'), pos33.getAttribute('data-id')],
      [pos31.getAttribute('data-id'), pos22.getAttribute('data-id'), pos13.getAttribute('data-id')]
    ]
    data.forEach( dataList => {
      let finished = false
      if (dataList.filter(XorO => XorO === 'x').length === 3 ){
        onWinner( 'X won the game!' )
        return finished = true
      } 
      else if (dataList.filter(XorO => XorO === 'o').length === 3 ){
        onWinner( 'O won the game!' )
        return finished = true
      }
    })

    if (!finished && document.querySelector('.opacity-0') === null ){
      onWinner( 'Draw' )
      return
    }
  }
    
  const onWinner = ( winner ) => {
    modal.classList.remove('hidden')
    modal.classList.add('flex')
    modalBg.classList.remove('hidden')
    modalText.innerHTML = `${ winner }`
    gameFinished = true
  
  }
    
  const handleReset = () => {
    const allImgs = [...document.querySelectorAll('img')]
    allImgs.forEach( e => e.classList.add('opacity-0'))
    imgSrc = "./assets/images/o.svg"
    allImgs.forEach( e => e.src = imgSrc)
  
    const allDivs = [...document.querySelectorAll('.bg-gray-400')]
    allDivs.forEach ( e => e.setAttribute( 'data-id', 'none' ))
    setUseClick(true)
    gameFinished = false
  }
    
  const onRematch = ()=> {
    onCloseModal()
    handleReset()
  }
    
  const onCloseModal = () => {
    modal.classList.add('hidden')
    modalBg.classList.add('hidden')
  
  }
  
  const arr = [0,1,2,3,4,5,6,7,8]

  return (
    <>
      <h1 className="text-6xl text-center mt-8">Tic Tac Toe</h1>
      <form onChange={ onGameMode } className="flex gap-4 justify-center mt-5">
        <div>
          <input type="radio" id="pvsc" name="gameMode" value="pvsc"/>
          <label htmlFor="pvsc">Play vs computer</label>
        </div>

        <div>
        <input type="radio" id="pvsp" name="gameMode" value="pvsp"/>
          <label htmlFor="pvsp">2 Players</label>
        </div>         
      </form> 

        <div onClick={ handleClick } className=" grid grid-cols-3 gameBox my-10 mx-auto">
          {
            arr.map(e => ( 
              <Square 
                key={ e } 
                e= { e } 
                handleClick={ handleClick } 
                imgSrc={ imgSrc }
              />
            )) 
          }   
      </div>
      <button 
        className="bg-blue-600 text-white px-4 py-2 rounded block mx-auto my-10" 
        onClick={ handleReset }
      >
        Restart
      </button>
      <Modal 
        onCloseModal = { onCloseModal }
        onRematch = { onRematch }
      />
    </>
     
  )
}
