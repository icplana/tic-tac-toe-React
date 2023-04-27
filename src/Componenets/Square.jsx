

export const Square = ({ e, handleClick, imgSrc }) => {
  return (
    <div
        className="border-solid border-black border-2 bg-gray-400 w-full h-full" 
        id={ `pos${ e }` }>
        <img onClick ={ handleClick } src={ imgSrc } className="opacity-0" />
    </div> 
  )
}
