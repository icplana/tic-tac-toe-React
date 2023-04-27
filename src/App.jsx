import { useState } from "react"



export const App = () => {
const modal = document.querySelector('#modal')
const modalBg = document.querySelector('#modalBg')
const modalText = document.querySelector('#modalText')
const pos11 = document.querySelector('#pos11')
const pos12 = document.querySelector('#pos12')
const pos13 = document.querySelector('#pos13')
const pos21 = document.querySelector('#pos21')
const pos22 = document.querySelector('#pos22')
const pos23 = document.querySelector('#pos23')
const pos31 = document.querySelector('#pos31')
const pos32 = document.querySelector('#pos32')
const pos33 = document.querySelector('#pos33')



let gameFinished = false


const [useClick, setUseClick] = useState(true)
let imgSrc = "/src/assets/images/o.svg"

const handleClick = ({target}) => {  
  if (gameFinished) return
  if(target.classList.contains('opacity-0')){
    target.classList.remove('opacity-0')
    useClick ? target.parentElement.setAttribute('data-id','o') : target.parentElement.setAttribute('data-id','x')
    useClick ? imgSrc = "/src/assets/images/x.svg" : imgSrc = "/src/assets/images/o.svg"
    const pendingImgs = [...document.querySelectorAll('.opacity-0')]
    pendingImgs.forEach( e => e.src = imgSrc)
    setUseClick(!useClick)
    try{checkStatusArr()}catch{}
    
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

}

const handleReset = () => {
  const allImgs = [...document.querySelectorAll('img')]
  allImgs.forEach( e => e.classList.add('opacity-0'))
  imgSrc = "/src/assets/images/o.svg"
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
  gameFinished= true
}

  return (

    <>
      <h1 className="text-6xl text-center mt-8">Tic Tac Toe</h1>
        <div onClick={ handleClick } className="gameBox my-10 mx-auto">
        <div className="grid grid-cols-3 h-2/6 w-full">
          <div className="border-solid border-black border-2 bg-gray-400 w-full h-full" id="pos11"><img onClick ={ handleClick } src={ imgSrc } className="opacity-0" alt="" /></div>
          <div className="border-solid border-black border-2 bg-gray-400 w-full h-full" id="pos12"><img onClick ={ handleClick } src={ imgSrc } className="opacity-0" alt="" /></div>
          <div className="border-solid border-black border-2 bg-gray-400 w-full h-full" id="pos13"><img onClick ={ handleClick } src={ imgSrc } className="opacity-0" alt="" /></div>      
        </div>

        <div className="grid grid-cols-3 h-2/6">
          <div className="border-solid border-black border-2 bg-gray-400 w-full h-full" id="pos21"><img onClick ={ handleClick } src={ imgSrc } className="opacity-0" alt="" /></div>
          <div className="border-solid border-black border-2 bg-gray-400 w-full h-full" id="pos22"><img onClick ={ handleClick } src={ imgSrc } className="opacity-0" alt="" /></div>
          <div className="border-solid border-black border-2 bg-gray-400 w-full h-full" id="pos23"><img onClick ={ handleClick } src={ imgSrc } className="opacity-0" alt="" /></div>      
        </div>

        <div className="grid grid-cols-3 h-2/6">
          <div className="border-solid border-black border-2 bg-gray-400 w-full h-full" id="pos31"><img onClick ={ handleClick } src={ imgSrc } className="opacity-0" alt="" /></div>
          <div className="border-solid border-black border-2 bg-gray-400 w-full h-full" id="pos32"><img onClick ={ handleClick } src={ imgSrc } className="opacity-0" alt="" /></div>
          <div className="border-solid border-black border-2 bg-gray-400 w-full h-full" id="pos33"><img onClick ={ handleClick } src={ imgSrc } className="opacity-0" alt="" /></div>      
        </div>
      
      </div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded block mx-auto my-10" onClick={ handleReset }>Restart</button>
      <div id="modalBg" className=" hidden absolute top-0 w-screen h-screen bg-black opacity-40 z-10">

        </div>
        <div id="modal" className="hidden absolute top-20 left-2/4 -translate-x-2/4 w-2/3 h-fit bg-white rounded-md opacity-100 z-20 justify-center flex-col content-center text-center">
        <button onClick={ onCloseModal } className=" place-self-end mr-2 font-bold text-lg">x</button>
          <p id="modalText" className=" text-6xl my-3"> 
            X won!!!!
          </p>
          
          <p className="text-3xl my-5">
            Click the button below to Rematch!
          </p>
          <button onClick={ onRematch } className="my-5 text-4xl text-white bg-blue-600 rounded-md w-fit mx-auto py-2 px-4">Rematch!</button>
      </div>
    </> 
  )
}
