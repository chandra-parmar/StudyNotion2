import React from 'react'
import Button from './Button'
import { FaArrowRight } from 'react-icons/fa'
import { TypeAnimation }from 'react-type-animation'

const CodeBlockAnimation = ({
   heading,
   subHeading,
   button1
   ,button2,
   htmlCodeBlock,
   codeColor
}) => {

  return (

    <div className= {` w-[100%] flex flex-row  justify-between gap-10 ml-[40px]`}>

         <div className='flex flex-col w-[50%] gap-8 mt-[25px]'>
           {heading}

            <div className='text-richblack-300 font-bold'>
              {subHeading}
            </div>


               {/* buttons */}
            <div className='flex gap-7 flex-row'>

               <Button active={button1.active} linkto={button1.linkto} text="Try it yourself">
                  <div className='flex flex-row gap-2 items-center text-black'>
                     
                    <FaArrowRight></FaArrowRight>
                  </div>
               </Button>

               <Button active={button2.active} linkto={button2.linkto} text="Learn more">
                
               

               </Button>
            </div>

         </div>

         {/* type animation */}
         <div className='h-fit flex flex-row text-10[px] w-[50%] py-10'>

             {/* numbering */}
            <div className='flex flex-col text-center w-[10%] text-richblack-400 font-inter'>
               <p>1</p>
               <p>2</p>
               <p>3</p>
               <p>4</p>
               <p>5</p>
               <p>6</p>
               <p>7</p>
               <p>8</p>
               <p>9</p>
               <p>10</p>
               <p>11</p>
            </div>
              
              {/* html code */}
            <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2 lg:w-[500px]`}>
              
              <TypeAnimation
               sequence={[ htmlCodeBlock,2000," "]}
                repeat ={Infinity}
                cursor={true}
                omitDeletionAnimation ={true}
                style = {
                  {
                     whiteSpace:"pre-line",
                     display:"block"
                  }
                }
              
                >

              </TypeAnimation>
            </div>

         </div>

    </div>
  )
}

export default CodeBlockAnimation
