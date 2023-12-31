import React from "react"
import errorSvg from "../../images/error.gif"


 function ErrorHandler(){
    return(
       <section className="flex justify-center items-center">
        <div className="error-parent ">
            <img src={errorSvg} alt="error-image" id="svg"/>
            <h2 className='error'>An Error Occured, Please try again.</h2>
        </div>
      </section>
    )
}

export default ErrorHandler 