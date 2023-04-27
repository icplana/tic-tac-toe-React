

export const Modal = ({ onCloseModal, onRematch }) => {
  return (
    <>
    <div id="modalBg" className=" hidden absolute top-0 w-screen h-screen bg-black opacity-40 z-10">
    </div>
    <div id="modal" className="hidden absolute top-20 left-2/4 -translate-x-2/4 w-2/3 h-fit bg-white rounded-md opacity-100 z-20 justify-center flex-col content-center text-center">
        <button 
            onClick={ onCloseModal } className=" place-self-end mr-2 font-bold text-lg">x</button>
        <p id="modalText" className=" text-6xl my-3"> 
            X won!!!!
        </p>
        
        <p className="text-3xl my-5">
            Click the button below to Rematch!
        </p>
        <button onClick={ onRematch } className="my-5 text-4xl text-white bg-blue-600 rounded-md w-fit mx-auto py-2 px-4">Rematch!</button>
        </div>
    l</>
  )
}
