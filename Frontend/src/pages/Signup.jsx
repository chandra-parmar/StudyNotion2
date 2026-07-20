
import Template from "../components/core/Auth/Template"

function Signup() {
  return (
      <div className="flex flex-row justify-center items-center">
         <Template
            title="Create your Account"
            description1="Enter your Information below to create account."
            
            formType="signup"
          />
      </div>
  )
}

export default Signup